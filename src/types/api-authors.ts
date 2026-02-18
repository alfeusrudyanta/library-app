import type {
  ApiResponse,
  Author,
  AuthorSummary,
  BookDetail,
  PaginatedAuthors,
  PaginatedBooks,
  PaginationParams,
} from '@/types/api';

export type GetAuthorsParamsRequest = {
  q?: string;
};

export type GetAuthorsResponse = ApiResponse<PaginatedAuthors<Author>>;

export type PostAuthorRequest = {
  name: string;
  bio: string;
};

export type PostAuthorResponse = ApiResponse<Author>;

export type GetAuthorsPopularParamsRequest = {
  limit: number;
};

export type GetAuthorsPopularResponse = ApiResponse<{
  authors: AuthorSummary[];
}>;

export type GetAuthorBooksParamsRequest = {
  id: number;
} & PaginationParams;

export type GetAuthorBooksResponse = ApiResponse<PaginatedBooks<BookDetail>>;

export type PutAuthorRequest = { name: string; bio: string };

export type PutAuthorResponse = ApiResponse<Author>;

export type DeleteAuthorResponse = ApiResponse<{ id: number }>;
