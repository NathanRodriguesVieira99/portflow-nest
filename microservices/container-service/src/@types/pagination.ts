export namespace Pagination {
  export interface Input {
    page?: number;
    perPage?: number;
  }

  export interface Output<T> {
    data: T[];
    meta: {
      page: number;
      perPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }
}
