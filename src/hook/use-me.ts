import { apiMe } from '@/api/api-me';
import { queryClient } from '@/lib/query-client';
import type { BorrowStatus } from '@/types/api';
import type { PatchMeParamsRequest } from '@/types/api-me';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export const meKeys = {
  all: ['me'] as const,
  profile: () => [...meKeys.all, 'profile'] as const,
  loans: (status?: BorrowStatus) =>
    [...meKeys.all, 'loans', status || undefined] as const,
  reviews: (q?: string) => [...meKeys.all, 'reviews', q || undefined] as const,
};

export const useGetMe = () => {
  return useQuery({
    queryKey: meKeys.profile(),
    queryFn: () => apiMe.getMe(),
    enabled: !!Cookies.get('token'),
  });
};

export const usePatchMe = () => {
  return useMutation({
    mutationFn: (data: PatchMeParamsRequest) => apiMe.patchMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meKeys.profile() });
      toast.success('Profile updated');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
};

export const useGetMeLoans = (status?: BorrowStatus) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: meKeys.loans(status),

    queryFn: ({ pageParam }) => {
      const params = {
        status,
        page: pageParam,
        limit: 20,
      };

      return apiMe.getMeLoans(params);
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useGetMeReviews = (q?: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: meKeys.reviews(q),

    queryFn: ({ pageParam }) => {
      const params = {
        q,
        page: pageParam,
        limit: 20,
      };

      return apiMe.getMeReviews(params);
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
