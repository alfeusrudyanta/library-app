import type {
  ApiResponse,
  BookStats,
  PaginatedReviews,
  PaginationParams,
  Review,
} from '@/types/api';

export type PostReviewRequest = {
  bookId: number;
  star: number;
  comment: string;
};
export type PostReviewResponse = ApiResponse<{
  review: Omit<Review, 'user'>;
  bookStats: BookStats;
}>;

export type GetReviewsBookParamsRequest = {
  bookId: number;
} & PaginationParams;
export type GetReviewsBookResponse = ApiResponse<
  { bookId: number } & PaginatedReviews<Review>
>;

export type DeleteReviewResponse = ApiResponse<{ bookStats: BookStats }>;
