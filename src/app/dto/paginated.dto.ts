export interface PaginatedDto<T> {
  data: Array<T>,
  limit: number,
  offset: number,
  total: number
}
