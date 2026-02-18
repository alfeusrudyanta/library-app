import { apiBooks } from '@/api/api-books';
import { queryClient } from '@/lib/query-client';
import type {
  GetBooksParams,
  GetBooksRecommendedParams,
  PostBookParamsRequest,
  PutBookRequest,
} from '@/types/api-books';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const booksKeys = {
  all: ['books'] as const,
  list: (params: GetBooksParams) => [...booksKeys.all, params] as const,
  detail: (bookId: number) => [...booksKeys.all, bookId] as const,
  recommended: (params: GetBooksRecommendedParams) =>
    [...booksKeys.all, 'recommended', params] as const,
};

export const useGetBooks = (data: GetBooksParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: booksKeys.list(data),

    queryFn: ({ pageParam }) => {
      const params = {
        ...data,
        page: pageParam,
        limit: 12,
      };

      return apiBooks.getBooks(params);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useGetBook = (bookId: number) => {
  return useQuery({
    queryKey: booksKeys.detail(bookId),
    queryFn: () => apiBooks.getBook(bookId),
    enabled: !!bookId,
  });
};

export const useGetBooksRecommended = (data: GetBooksRecommendedParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: booksKeys.recommended(data),

    queryFn: ({ pageParam }) => {
      const params = {
        ...data,
        page: pageParam,
        limit: 5,
      };

      return apiBooks.getBooksRecommended(params);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const usePostBook = () => {
  return useMutation({
    mutationFn: (data: PostBookParamsRequest) => apiBooks.postBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.all });
      toast.success('Book created');
    },
    onError: () => {
      toast.error('Failed to create book');
    },
  });
};

export const usePutBook = (bookId: number) => {
  return useMutation({
    mutationFn: (data: PutBookRequest) => apiBooks.putBook(bookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.all });
      queryClient.invalidateQueries({
        queryKey: booksKeys.detail(bookId),
      });
      toast.success('Book updated');
    },
    onError: () => {
      toast.error('Failed to update book');
    },
  });
};

export const useDeleteBook = (bookId: number) => {
  return useMutation({
    mutationFn: () => apiBooks.deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.all });
      queryClient.invalidateQueries({
        queryKey: booksKeys.detail(bookId),
      });
      toast.success('Book deleted');
    },
    onError: () => {
      toast.error('Failed to delete book');
    },
  });
};
