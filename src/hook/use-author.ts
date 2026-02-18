import { apiAuthors } from '@/api/api-authors';
import { queryClient } from '@/lib/query-client';
import type { PostAuthorRequest, PutAuthorRequest } from '@/types/api-authors';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const authorsKeys = {
  all: ['authors'] as const,
  popular: () => [...authorsKeys.all, 'popular'] as const,
  detail: (authorId: number) => [...authorsKeys.all, authorId] as const,
  search: (q: string) => [...authorsKeys.all, q || undefined] as const,
};

export const useGetAuthors = (q: string) => {
  return useQuery({
    queryKey: authorsKeys.search(q),
    queryFn: () => {
      return apiAuthors.getAuthors({ q });
    },
  });
};

export const usePostAuthor = () => {
  return useMutation({
    mutationFn: (data: PostAuthorRequest) => {
      return apiAuthors.postAuthor(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authorsKeys.all });
      toast.success('New author created');
    },
    onError: () => {
      toast.error('Failed to create author');
    },
  });
};

export const useGetAuthorsPopular = () => {
  return useQuery({
    queryKey: authorsKeys.popular(),
    queryFn: () => {
      const params = {
        limit: 10,
      };
      return apiAuthors.getAuthorsPopular(params);
    },
  });
};

export const useGetAuthorBooks = (authorId: number) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: authorsKeys.detail(authorId),

    queryFn: ({ pageParam }) => {
      const params = {
        id: authorId,
        page: pageParam,
        limit: 12,
      };

      return apiAuthors.getAuthorBooks(params);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const usePutAuthor = (authorId: number) => {
  return useMutation({
    mutationFn: (data: PutAuthorRequest) => {
      return apiAuthors.putAuthor(authorId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authorsKeys.all });
      queryClient.invalidateQueries({ queryKey: authorsKeys.detail(authorId) });
      toast.success('Author updated');
    },
    onError: () => {
      toast.error('Failed to update author');
    },
  });
};

export const useDeleteAuthor = (authorId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiAuthors.deleteAuthor(authorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authorsKeys.all });
      queryClient.invalidateQueries({ queryKey: authorsKeys.detail(authorId) });
      toast.success('Author deleted');
    },
    onError: () => {
      toast.error('Failed to delete author');
    },
  });
};
