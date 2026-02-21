import type {
  ApiResponse,
  BookDetail,
  BookUpdateDetail,
  PaginatedBooks,
  Pagination,
  PaginationParams,
  Review,
} from '@/types/api';

export type GetBooksParams = {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
};
export type GetBooksParamsRequest = GetBooksParams & PaginationParams;
export type GetBooksResponse = ApiResponse<PaginatedBooks<BookDetail>>;

export type PostBookParamsRequest = {
  title: string;
  isbn: string;
  categoryId: string;
  coverImage?: File;
  description: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  authorId: number;
};
export type PostBookResponse = ApiResponse<
  Omit<BookDetail, 'author' | 'category'>
>;

export type GetBooksRecommendedParams = {
  by: 'rating' | 'popular';
  categoryId?: number;
};
export type GetBooksRecommendedParamsRequest = GetBooksRecommendedParams &
  PaginationParams;
export type GetBooksRecommendedResponse = ApiResponse<{
  mode: string;
  books: (Omit<BookDetail, 'author' | 'category'> & {
    author: { id: number; name: string };
    category: { id: number; name: string };
  })[];
  pagination: Pagination;
}>;

export type GetBookResponse = ApiResponse<BookDetail & { reviews: Review[] }>;

export type PutBookRequest = BookUpdateDetail;
export type PutBookRespone = ApiResponse<{
  Book: Omit<BookDetail, 'author' | 'category'>;
}>;

export type DeleteBookResponse = ApiResponse<{ id: number }>;
