import { apiAdmin } from '@/api/api-admin';
import { queryClient } from '@/lib/query-client';
import type {
  GetAdminBooksParams,
  GetAdminLoansParams,
  GetAdminUsersParamsRequest,
  PatchAdminLoansRequest,
  PostAdminLoansRequest,
} from '@/types/api-admin';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export const adminBooksKeys = {
  all: ['admin-books'] as const,
  list: (params: GetAdminBooksParams) =>
    [...adminBooksKeys.all, params] as const,
};

export const adminUsersKeys = {
  all: ['admin-users'] as const,
  list: (params: GetAdminUsersParamsRequest) =>
    [...adminUsersKeys.all, params || params] as const,
};

export const adminLoansKeys = {
  all: ['admin-loans'] as const,
  list: (params: GetAdminLoansParams) =>
    [...adminLoansKeys.all, params] as const,
  overview: () => [...adminLoansKeys.all, 'overview'] as const,
  overdue: () => [...adminLoansKeys.all, 'overdue'] as const,
};

export const useGetAdminBooks = (data: GetAdminBooksParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: adminBooksKeys.list(data),

    queryFn: ({ pageParam }) => {
      const params = {
        ...data,
        page: pageParam,
        limit: 20,
      };

      return apiAdmin.getAdminBooks(params);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const usePostAdminLoans = () => {
  return useMutation({
    mutationFn: (data: PostAdminLoansRequest) => apiAdmin.postAdminLoans(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminLoansKeys.all });
      toast.success('Loan created');
    },
    onError: () => {
      toast.error('Failed to create loan');
    },
  });
};

export const useGetAdminLoans = (data: GetAdminLoansParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: adminLoansKeys.list(data),

    queryFn: ({ pageParam }) => {
      const params = {
        ...data,
        page: pageParam,
        limit: 10,
      };

      return apiAdmin.getAdminLoans(params);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const usePatchAdminLoans = (loanId: number) => {
  return useMutation({
    mutationFn: (data: PatchAdminLoansRequest) =>
      apiAdmin.patchAdminLoans(loanId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminLoansKeys.all });
      queryClient.invalidateQueries({ queryKey: adminLoansKeys.overdue() });
      toast.success('Loan updated');
    },
    onError: () => {
      toast.error('Failed to update loan');
    },
  });
};

export const useGetAdminLoansOverdue = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: adminLoansKeys.overdue(),

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 10,
      };

      return apiAdmin.getAdminLoansOverdue(params);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useGetAdminOverview = () => {
  return useQuery({
    queryKey: adminLoansKeys.overview(),
    queryFn: () => {
      return apiAdmin.getAdminOverview();
    },
  });
};

export const useGetAdminUsers = (params: GetAdminUsersParamsRequest) => {
  const { q, page, limit = 10 } = params;

  return useQuery({
    queryKey: adminUsersKeys.list({ q, page, limit }),
    queryFn: () =>
      apiAdmin.getAdminUsers({
        q,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
};
