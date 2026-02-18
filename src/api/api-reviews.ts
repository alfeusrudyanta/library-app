import { AxiosInstance } from '@/service/axios';
import type {
  PostReviewRequest,
  PostReviewResponse,
  GetReviewsBookParamsRequest,
  GetReviewsBookResponse,
  DeleteReviewResponse,
} from '@/types/api-reviews';

export const apiReviews = {
  postReview: async (data: PostReviewRequest): Promise<PostReviewResponse> => {
    const response = await AxiosInstance.post<PostReviewResponse>(
      '/api/reviews',
      data
    );

    return response.data;
  },

  getReviewsBook: async (
    params: GetReviewsBookParamsRequest
  ): Promise<GetReviewsBookResponse> => {
    const { bookId, ...pagination } = params;

    const response = await AxiosInstance.get<GetReviewsBookResponse>(
      `/api/reviews/${bookId}`,
      { params: pagination }
    );

    return response.data;
  },

  deleteReview: async (reviewId: number): Promise<DeleteReviewResponse> => {
    const response = await AxiosInstance.delete<DeleteReviewResponse>(
      `/api/reviews/${reviewId}`
    );

    return response.data;
  },
};
