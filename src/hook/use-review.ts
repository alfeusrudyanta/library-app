import { apiReviews } from '@/api/api-reviews';
import { queryClient } from '@/lib/query-client';
import type { PostReviewRequest } from '@/types/api-reviews';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const reviewsKeys = {
  all: ['reviews'] as const,
  book: (bookId: number) => [...reviewsKeys.all, 'book', bookId] as const,
};

export const usePostReview = () => {
  return useMutation({
    mutationFn: (data: PostReviewRequest) => apiReviews.postReview(data),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.book(variables.bookId),
      });
      toast.success('Review submitted');
    },
    onError: () => {
      toast.error('Failed to submit review');
    },
  });
};

export const useGetReviewsBook = (bookId: number) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: reviewsKeys.book(bookId),

    queryFn: ({ pageParam }) => {
      const params = {
        bookId,
        page: pageParam,
        limit: 10,
      };

      return apiReviews.getReviewsBook(params);
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useDeleteReview = (bookId: number) => {
  return useMutation({
    mutationFn: (reviewId: number) => apiReviews.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.book(bookId),
      });
      toast.success('Review deleted');
    },
    onError: () => {
      toast.error('Failed to delete review');
    },
  });
};
