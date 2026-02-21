import type {
  ApiResponse,
  Author,
  AuthorSummary,
  BookDetail,
  PaginatedBooks,
  PaginationParams,
} from '@/types/api';

export type GetAuthorsParamsRequest = {
  q?: string;
};

export type GetAuthorsResponse = ApiResponse<{ authors: Author[] }>;

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

export type GetAuthorBooksResponse = ApiResponse<
  {
    author: Omit<Author, 'createdAt' | 'updatedAt'>;
    bookCount: number;
  } & PaginatedBooks<BookDetail>
>;

export type PutAuthorRequest = { name: string; bio: string };

export type PutAuthorResponse = ApiResponse<Author>;

export type DeleteAuthorResponse = ApiResponse<{ id: number }>;
