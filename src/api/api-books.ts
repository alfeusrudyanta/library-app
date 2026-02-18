import { AxiosInstance } from '@/service/axios';
import type {
  GetBooksParamsRequest,
  GetBooksResponse,
  PostBookParamsRequest,
  PostBookResponse,
  GetBooksRecommendedParamsRequest,
  GetBooksRecommendedResponse,
  GetBookResponse,
  PutBookRequest,
  PutBookRespone,
  DeleteBookResponse,
} from '@/types/api-books';

export const apiBooks = {
  getBooks: async (
    params: GetBooksParamsRequest
  ): Promise<GetBooksResponse> => {
    const response = await AxiosInstance.get<GetBooksResponse>('/api/books', {
      params,
    });

    return response.data;
  },

  postBook: async (data: PostBookParamsRequest): Promise<PostBookResponse> => {
    const fd = new FormData();

    fd.append('title', data.title);
    fd.append('isbn', data.isbn);
    fd.append('categoryId', data.categoryId);
    fd.append('description', data.description);
    fd.append('publishedYear', String(data.publishedYear));
    fd.append('totalCopies', String(data.totalCopies));
    fd.append('availableCopies', String(data.availableCopies));

    if (data.coverImage) {
      fd.append('coverImage', data.coverImage);
    }

    if ('authorId' in data) {
      fd.append('authorId', String(data.authorId));
    }

    if ('authorName' in data) {
      fd.append('authorName', data.authorName);
    }

    const response = await AxiosInstance.post<PostBookResponse>(
      '/api/books',
      fd,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  getBooksRecommended: async (
    params: GetBooksRecommendedParamsRequest
  ): Promise<GetBooksRecommendedResponse> => {
    const response = await AxiosInstance.get<GetBooksRecommendedResponse>(
      '/api/books/recommend',
      { params }
    );

    return response.data;
  },

  getBook: async (bookId: number): Promise<GetBookResponse> => {
    const response = await AxiosInstance.get<GetBookResponse>(
      `/api/books/${bookId}`
    );

    return response.data;
  },

  putBook: async (
    bookId: number,
    data: PutBookRequest
  ): Promise<PutBookRespone> => {
    const response = await AxiosInstance.put<PutBookRespone>(
      `/api/books/${bookId}`,
      data
    );

    return response.data;
  },

  deleteBook: async (bookId: number): Promise<DeleteBookResponse> => {
    const response = await AxiosInstance.delete<DeleteBookResponse>(
      `/api/books/${bookId}`
    );

    return response.data;
  },
};
