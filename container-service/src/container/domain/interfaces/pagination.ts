export interface PaginationInput {
  page?: number;
  perPage?: number;
}

interface PaginationMeta {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationOutput<T> {
  data: T[];
  meta: PaginationMeta;
}
