import type {
  ApiResponse,
  BookDetail,
  BorrowStatus,
  LoanStats,
  LoanSummary,
  PaginatedLoans,
  PaginatedReviews,
  PaginationParams,
  Review,
  User,
} from '@/types/api';

export type GetMeResponse = ApiResponse<{
  profile: User;
  loanStats: LoanStats;
  reviewsCount: number;
}>;

export type PatchMeParamsRequest = {
  name: string;
  phone: string;
  profilePhoto?: File;
};

export type PatchMeResponse = ApiResponse<{ profile: User }>;

export type GetMeLoansParams = { status: undefined | BorrowStatus };
export type GetMeLoansParamsRequest = GetMeLoansParams & PaginationParams;

export type GetMeLoansResponse = ApiResponse<
  PaginatedLoans<
    LoanSummary & {
      book: {
        id: number;
        title: string;
        coverImage: string;
      };
    }
  >
>;

export type GetMeReviewsParamsRequest = {
  q?: string;
} & PaginationParams;

export type GetMeReviewsResponse = ApiResponse<
  PaginatedReviews<
    Omit<Review, 'userId' | 'bookId' | 'user'> & {
      book: Omit<BookDetail, 'author' | 'category'> & {
        author: { id: number; name: string };
        category: { id: number; name: string };
      };
    }
  >
>;
