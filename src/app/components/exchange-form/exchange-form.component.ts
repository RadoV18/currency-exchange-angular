import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeDto } from 'src/app/dto/exchange.dto';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.css']
})
export class ExchangeFormComponent {

  exchangeForm: FormGroup;
  response: ExchangeDto;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private currencyService: CurrencyService) {
    this.exchangeForm = this.formBuilder.group({
      from: '',
      to: '',
      amount: ''
    });
  }

  onOptionSelect(value: string) {
    this.exchangeForm.patchValue({
      serviceId: value
    });
  }

  submit(serviceId : number) {
    console.log(this.exchangeForm);
    this.currencyService.convertCurrency(
      serviceId,
      this.exchangeForm.value.from,
      this.exchangeForm.value.to,
      this.exchangeForm.value.amount
    ).subscribe({
      next: (response) => {
        this.response = response.data;
      },
      error: (error) => {
        this.errorMessage = "Ocurrió un error al realizar la conversión.";
      }
    });
  }
}
