import {PageableDto} from "./pageable.dto";
import {SortDto} from "./sort.dto";

export interface PaginatedDto<T> {
  content: Array<T>;
  pageable: PageableDto;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  sort: SortDto;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
