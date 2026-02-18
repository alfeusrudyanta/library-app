import { AxiosInstance } from '@/service/axios';
import type {
  PostLoanRequest,
  PostLoanResponse,
  PatchLoanReturnResponse,
  PostLoanFromCartRequest,
  PostLoanFromCartResponse,
  GetLoanMeParamsRequest,
  GetLoanMeResponse,
} from '@/types/api-loans';

export const apiLoans = {
  postLoan: async (data: PostLoanRequest): Promise<PostLoanResponse> => {
    const response = await AxiosInstance.post<PostLoanResponse>(
      '/api/loans',
      data
    );

    return response.data;
  },

  patchLoanReturn: async (loanId: number): Promise<PatchLoanReturnResponse> => {
    const response = await AxiosInstance.patch<PatchLoanReturnResponse>(
      `/api/loans/${loanId}/return`
    );

    return response.data;
  },

  postLoanFromCart: async (
    data: PostLoanFromCartRequest
  ): Promise<PostLoanFromCartResponse> => {
    const response = await AxiosInstance.post<PostLoanFromCartResponse>(
      '/api/loans/from-cart',
      data
    );

    return response.data;
  },

  getLoanMe: async (
    params: GetLoanMeParamsRequest
  ): Promise<GetLoanMeResponse> => {
    const response = await AxiosInstance.get<GetLoanMeResponse>(
      '/api/loans/my',
      { params }
    );

    return response.data;
  },
};
