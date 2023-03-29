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
  currentPage: number = 1;
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private currencyService: CurrencyService) {
    this.filterForm = this.formBuilder.group({
      from: '',
      to: '',
      sortBy: '',
      sortDirection: ''
    });
  }

  ngOnInit(): void {
    this.getPaginatedConversions(10, 0);
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
    this.getPaginatedConversions(this.response.limit, (this.currentPage - 1) * this.response.limit, query);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getPaginatedConversions(this.response.limit, (this.currentPage - 1) * this.response.limit);
  }

  getPaginatedConversions(limit: number, offset: number, query?: Map<string, string>) {
    this.currencyService.getPaginatedConversions(limit, offset, query).subscribe({
      next: (response) => {
        console.log(response.data);
        this.response = response.data;
        // add empty rows to the table if the number of rows is less than the limit
        if(this.response.data.length < this.response.limit) {
          for(let i = this.response.data.length; i < this.response.limit; i++) {
            this.response.data.push({} as ExchangeDto);
          }
        }
        this.pages = Math.ceil(this.response.total / this.response.limit);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
