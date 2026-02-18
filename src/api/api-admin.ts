import { AxiosInstance } from '@/service/axios';
import type {
  GetAdminBooksParamsRequest,
  GetAdminBooksResponse,
  PostAdminLoansRequest,
  PostAdminLoansResponse,
  GetAdminLoansParamsRequest,
  GetAdminLoansResponse,
  PatchAdminLoansRequest,
  PatchAdminLoansResponse,
  GetAdminLoansOverdueRequest,
  GetAdminLoansOverdueResponse,
  GetAdminOverviewResponse,
  GetAdminUsersParamsRequest,
  GetAdminUsersResponse,
} from '@/types/api-admin';

export const apiAdmin = {
  getAdminBooks: async (
    params: GetAdminBooksParamsRequest
  ): Promise<GetAdminBooksResponse> => {
    const response = await AxiosInstance.get<GetAdminBooksResponse>(
      '/api/admin/books',
      { params }
    );

    return response.data;
  },

  postAdminLoans: async (
    data: PostAdminLoansRequest
  ): Promise<PostAdminLoansResponse> => {
    const response = await AxiosInstance.post<PostAdminLoansResponse>(
      '/api/admin/loans',
      data
    );

    return response.data;
  },

  getAdminLoans: async (
    params: GetAdminLoansParamsRequest
  ): Promise<GetAdminLoansResponse> => {
    const response = await AxiosInstance.get<GetAdminLoansResponse>(
      '/api/admin/loans',
      { params }
    );

    return response.data;
  },

  patchAdminLoans: async (
    loanId: number,
    data: PatchAdminLoansRequest
  ): Promise<PatchAdminLoansResponse> => {
    const response = await AxiosInstance.patch<PatchAdminLoansResponse>(
      `/api/admin/loans/${loanId}`,
      data
    );

    return response.data;
  },

  getAdminLoansOverdue: async (
    params: GetAdminLoansOverdueRequest
  ): Promise<GetAdminLoansOverdueResponse> => {
    const response = await AxiosInstance.get<GetAdminLoansOverdueResponse>(
      '/api/admin/loans/overdue',
      { params }
    );

    return response.data;
  },

  getAdminOverview: async (): Promise<GetAdminOverviewResponse> => {
    const response = await AxiosInstance.get<GetAdminOverviewResponse>(
      '/api/admin/overview'
    );

    return response.data;
  },

  getAdminUsers: async (
    params: GetAdminUsersParamsRequest
  ): Promise<GetAdminUsersResponse> => {
    const response = await AxiosInstance.get<GetAdminUsersResponse>(
      '/api/admin/users',
      { params }
    );

    return response.data;
  },
};
