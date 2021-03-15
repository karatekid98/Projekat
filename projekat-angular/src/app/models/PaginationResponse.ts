
export interface PaginationResponse <T> {
  pagedist: T;
  metadata: {
    currentPage: string;
    totalPages: string;
    pageSize: string;
    totalCount: string;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}
