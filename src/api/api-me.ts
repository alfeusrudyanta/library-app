import { AxiosInstance } from '@/service/axios';
import type {
  GetMeResponse,
  PatchMeParamsRequest,
  PatchMeResponse,
  GetMeLoansParamsRequest,
  GetMeLoansResponse,
  GetMeReviewsParamsRequest,
  GetMeReviewsResponse,
} from '@/types/api-me';

export const apiMe = {
  getMe: async (): Promise<GetMeResponse> => {
    const response = await AxiosInstance.get<GetMeResponse>('/api/me');

    return response.data;
  },

  patchMe: async (data: PatchMeParamsRequest): Promise<PatchMeResponse> => {
    const response = await AxiosInstance.patch<PatchMeResponse>(
      '/api/me',
      data
    );

    return response.data;
  },

  getMeLoans: async (
    params: GetMeLoansParamsRequest
  ): Promise<GetMeLoansResponse> => {
    const response = await AxiosInstance.get<GetMeLoansResponse>(
      '/api/me/loans',
      { params }
    );

    return response.data;
  },

  getMeReviews: async (
    params: GetMeReviewsParamsRequest
  ): Promise<GetMeReviewsResponse> => {
    const response = await AxiosInstance.get<GetMeReviewsResponse>(
      '/api/me/reviews',
      { params }
    );

    return response.data;
  },
};
