import { apiLoans } from '@/api/api-loans';
import { queryClient } from '@/lib/query-client';
import type {
  GetLoanMeParams,
  PostLoanRequest,
  PostLoanFromCartRequest,
} from '@/types/api-loans';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const loansKeys = {
  all: ['loans'] as const,
  me: (params: GetLoanMeParams) => [...loansKeys.all, 'me', params] as const,
};

export const usePostLoan = () => {
  return useMutation({
    mutationFn: (data: PostLoanRequest) => apiLoans.postLoan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loansKeys.all });
      toast.success('Loan created');
    },
    onError: () => {
      toast.error('Failed to create loan');
    },
  });
};

export const usePatchLoanReturn = (loanId: number) => {
  return useMutation({
    mutationFn: () => apiLoans.patchLoanReturn(loanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loansKeys.all });
      toast.success('Book returned');
    },
    onError: () => {
      toast.error('Failed to return book');
    },
  });
};

export const usePostLoanFromCart = () => {
  return useMutation({
    mutationFn: (data: PostLoanFromCartRequest) =>
      apiLoans.postLoanFromCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loansKeys.all });
      toast.success('Loans created');
    },
    onError: () => {
      toast.error('Failed to create loans');
    },
  });
};

export const useGetLoanMe = (data: GetLoanMeParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: loansKeys.me(data),

    queryFn: ({ pageParam }) => {
      const params = {
        ...data,
        page: pageParam,
        limit: 10,
      };

      return apiLoans.getLoanMe(params);
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
