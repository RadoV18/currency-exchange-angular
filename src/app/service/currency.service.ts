import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ExchangeDto } from '../dto/exchange.dto';
import { ResponseCurrencyDto } from '../dto/response.currency.dto';
import {PaginatedDto} from "../dto/paginated.dto";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  public convertCurrency(serviceId: number, from: String, to: String, amount: number): Observable<ResponseCurrencyDto<ExchangeDto>> {
    return this.http.get<ResponseCurrencyDto<ExchangeDto>>(
      `${environment.API_URL}/api/v1/conversions?serviceId=${serviceId}&from=${from}&to=${to}&amount=${amount}`
    );
  }

  public getPaginatedConversions(page: number | null, size: number | null, query?: Map<string, string>):
    Observable<ResponseCurrencyDto<PaginatedDto<ExchangeDto>>> {
      let url: string = `${environment.API_URL}/api/v1/conversions/all?page=${page || 0}&size=${size || 10}`;
      if (query) {
        query.forEach((value: string, key: string) => {
          if(value) {
            url += `&${key}=${value}`;
          }
        });
      }
      return this.http.get<ResponseCurrencyDto<PaginatedDto<ExchangeDto>>>(url);
  }
}
