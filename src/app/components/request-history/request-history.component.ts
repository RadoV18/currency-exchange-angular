import { Component } from '@angular/core';
import {CurrencyService} from "../../service/currency.service";
import {PaginatedDto} from "../../dto/paginated.dto";
import {ExchangeDto} from "../../dto/exchange.dto";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent {

  response: PaginatedDto<ExchangeDto>;
  pages: number;
  currentPage: number = 0;
  size: number;
  filterForm: FormGroup;
  query: Map<string, string>;

  constructor(private formBuilder: FormBuilder, private currencyService: CurrencyService) {
    this.filterForm = this.formBuilder.group({
      from: '',
      to: '',
      sortBy: '',
      sortDirection: ''
    });
  }

  ngOnInit(): void {
    this.getPaginatedConversions(0, 10);
  }

  filterData(): void {
    const query = new Map<string, string>();
    // loop through the form controls and add them to the query map
    Object.keys(this.filterForm.controls).forEach((key) => {
      const value: string = this.filterForm.controls[key].value;
      if(value && value.length > 0) {
        query.set(key, value);
      }
    });
    this.query = query;
    this.currentPage = 0;
    this.getPaginatedConversions(this.currentPage, this.size);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getPaginatedConversions(this.currentPage, this.size);
  }

  getPaginatedConversions(page: number, size: number) {
    this.currencyService.getPaginatedConversions(page, size, this.query).subscribe({
      next: (response) => {
        console.log(response.data);
        this.response = response.data;
        // add empty rows to the table if the number of rows is less than the limit
        if(this.response.content.length < this.response.size) {
          for(let i = this.response.content.length; i < this.response.size; i++) {
            this.response.content.push({} as ExchangeDto);
          }
        }
        this.pages = this.response.totalPages;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
