import type { ApiResponse, Category, PaginatedCategories } from '@/types/api';

export type GetCategories = ApiResponse<PaginatedCategories<Category>>;

export type PostCategoryRequest = { name: string };
export type PostCategoryResponse = ApiResponse<{
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}>;

export type PutCategoryRequest = { name: string };
export type PutCategoryResponse = ApiResponse<{
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}>;

export type DeleteCategoryResponse = ApiResponse<{ id: number }>;
