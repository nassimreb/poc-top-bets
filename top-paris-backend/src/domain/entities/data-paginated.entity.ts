export interface DataPaginatedEntity<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLastPage: boolean;
  data: T[];
}
