import {QueryDto} from "./query.dto";
import {InfoDto} from "./info.dto";

export interface ExchangeDto {
  query: QueryDto,
  info: InfoDto,
  result: number
}

export class ExchangeDto {
  query: QueryDto;
  info: InfoDto;
  result: number;
}
