import { AxiosInstance } from '@/service/axios';
import type {
  GetAuthorsParamsRequest,
  GetAuthorsResponse,
  PostAuthorRequest,
  PostAuthorResponse,
  GetAuthorsPopularParamsRequest,
  GetAuthorsPopularResponse,
  GetAuthorBooksParamsRequest,
  GetAuthorBooksResponse,
  PutAuthorRequest,
  PutAuthorResponse,
  DeleteAuthorResponse,
} from '@/types/api-authors';

export const apiAuthors = {
  getAuthors: async (
    params: GetAuthorsParamsRequest
  ): Promise<GetAuthorsResponse> => {
    const response = await AxiosInstance.get<GetAuthorsResponse>(
      '/api/authors',
      { params }
    );

    return response.data;
  },

  postAuthor: async (data: PostAuthorRequest): Promise<PostAuthorResponse> => {
    const response = await AxiosInstance.post<PostAuthorResponse>(
      '/api/authors',
      data
    );

    return response.data;
  },

  getAuthorsPopular: async (
    params: GetAuthorsPopularParamsRequest
  ): Promise<GetAuthorsPopularResponse> => {
    const response = await AxiosInstance.get<GetAuthorsPopularResponse>(
      '/api/authors/popular',
      { params }
    );

    return response.data;
  },

  getAuthorBooks: async (
    params: GetAuthorBooksParamsRequest
  ): Promise<GetAuthorBooksResponse> => {
    const { id, ...rest } = params;

    const response = await AxiosInstance.get<GetAuthorBooksResponse>(
      `/api/authors/${id}/books`,
      { params: rest }
    );

    return response.data;
  },

  putAuthor: async (
    authorId: number,
    data: PutAuthorRequest
  ): Promise<PutAuthorResponse> => {
    const response = await AxiosInstance.put<PutAuthorResponse>(
      `/api/authors/${authorId}`,
      data
    );

    return response.data;
  },

  deleteAuthor: async (authorId: number): Promise<DeleteAuthorResponse> => {
    const response = await AxiosInstance.delete<DeleteAuthorResponse>(
      `/api/authors/${authorId}`
    );

    return response.data;
  },
};
