import type {
  ApiResponse,
  BookStatusParams,
  LoanStatusParams,
  PaginationParams,
  BorrowDetail,
  PaginatedLoans,
  PaginatedBooks,
  BookDetail,
  LoanSummary,
  PaginatedOverdue,
  BorrowRecord,
  DashboardStats,
  User,
  PaginatedUsers,
} from '@/types/api';

export type GetAdminBooksParams = {
  status: BookStatusParams;
  q?: string;
  categoryId?: number;
  authorId?: number;
};
export type GetAdminBooksParamsRequest = GetAdminBooksParams & PaginationParams;
export type GetAdminBooksResponse = ApiResponse<PaginatedBooks<BookDetail>>;

export type PostAdminLoansRequest = {
  userId: number;
  bookId: number;
  dueAt: string;
};
export type PostAdminLoansResponse = ApiResponse<{ loan: LoanSummary }>;

export type GetAdminLoansParams = { status: LoanStatusParams; q?: string };
export type GetAdminLoansParamsRequest = GetAdminLoansParams & PaginationParams;
export type GetAdminLoansResponse = ApiResponse<PaginatedLoans<BorrowDetail>>;

export type PatchAdminLoansRequest = {
  dueAt: string;
  status: string;
};
export type PatchAdminLoansResponse = ApiResponse<{ loan: LoanSummary }>;

export type GetAdminLoansOverdueRequest = PaginationParams;
export type GetAdminLoansOverdueResponse = ApiResponse<
  PaginatedOverdue<BorrowRecord>
>;

export type GetAdminOverviewResponse = ApiResponse<DashboardStats>;

export type GetAdminUsersParamsRequest = { q?: string } & PaginationParams;
export type GetAdminUsersResponse = ApiResponse<PaginatedUsers<User>>;
