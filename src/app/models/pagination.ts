
export interface Pagination
{
  //It should be same like in the headers of the response
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T>
{
    result?: T;
    pagination?: Pagination;
}
