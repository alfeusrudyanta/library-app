import { AxiosInstance } from '@/service/axios';
import type {
  GetCategories,
  PostCategoryRequest,
  PostCategoryResponse,
  PutCategoryRequest,
  PutCategoryResponse,
  DeleteCategoryResponse,
} from '@/types/api-categories';

export const apiCategories = {
  getCategories: async (): Promise<GetCategories> => {
    const response = await AxiosInstance.get<GetCategories>('/api/categories');

    return response.data;
  },

  postCategory: async (
    data: PostCategoryRequest
  ): Promise<PostCategoryResponse> => {
    const response = await AxiosInstance.post<PostCategoryResponse>(
      '/api/categories',
      data
    );

    return response.data;
  },

  putCategory: async (
    categoryId: number,
    data: PutCategoryRequest
  ): Promise<PutCategoryResponse> => {
    const response = await AxiosInstance.put<PutCategoryResponse>(
      `/api/categories/${categoryId}`,
      data
    );

    return response.data;
  },

  deleteCategory: async (
    categoryId: number
  ): Promise<DeleteCategoryResponse> => {
    const response = await AxiosInstance.delete<DeleteCategoryResponse>(
      `/api/categories/${categoryId}`
    );

    return response.data;
  },
};
