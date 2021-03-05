export interface Pagedist <T> {
    currentPage: string;
    totalPages: string;
    pageSize: string;
    totalCount: string;
    hasPrevious: boolean;
    hasNext: boolean;
}
