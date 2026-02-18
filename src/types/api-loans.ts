import type {
  ApiResponse,
  BookDetail,
  LoanStatusParams,
  LoanSummary,
  PaginatedLoans,
  PaginationParams,
} from './api';

export type PostLoanRequest = {
  bookId: number;
  days: number;
};
export type PostLoanResponse = ApiResponse<{ loan: LoanSummary }>;

export type PatchLoanReturnResponse = ApiResponse<{ loan: LoanSummary }>;

export type PostLoanFromCartRequest = {
  itemIds: number[];
  days: number;
  borrowDate: string;
};
export type PostLoanFromCartResponse = ApiResponse<{
  loans: LoanSummary & { returnByMessage: string };
  failed: [];
  removedFromCart: number;
  message: string;
}>;

export type GetLoanMeParams = {
  status: LoanStatusParams;
  q?: string;
};
export type GetLoanMeParamsRequest = GetLoanMeParams & PaginationParams;
export type GetLoanMeResponse = ApiResponse<
  PaginatedLoans<{
    id: number;
    status: LoanStatusParams;
    displayStatus: string;
    borrowedAt: string;
    dueAt: string;
    returnedAt: string;
    durationDays: number;
    book: Omit<BookDetail, 'author' | 'category'> & {
      author: { id: number; name: string };
      category: { id: number; name: string };
    };
  }>
>;
