import { AxiosInstance } from '@/service/axios';
import type {
  GetCartResponse,
  DeleteCartResponse,
  GetCartCheckoutResponse,
  PostCartItemRequest,
  PostCartItemResponse,
  DeleteCartItemResponse,
} from '@/types/api-cart';

export const apiCart = {
  getCart: async (): Promise<GetCartResponse> => {
    const response = await AxiosInstance.get<GetCartResponse>('/api/cart');

    return response.data;
  },

  deleteCart: async (): Promise<DeleteCartResponse> => {
    const response =
      await AxiosInstance.delete<DeleteCartResponse>('/api/cart');

    return response.data;
  },

  getCartCheckout: async (): Promise<GetCartCheckoutResponse> => {
    const response =
      await AxiosInstance.get<GetCartCheckoutResponse>('/api/cart/checkout');

    return response.data;
  },

  postCartItem: async (
    data: PostCartItemRequest
  ): Promise<PostCartItemResponse> => {
    const response = await AxiosInstance.post<PostCartItemResponse>(
      '/api/cart/items',
      data
    );

    return response.data;
  },

  deleteCartItem: async (itemId: number): Promise<DeleteCartItemResponse> => {
    const response = await AxiosInstance.delete<DeleteCartItemResponse>(
      `/api/cart/items/${itemId}`
    );

    return response.data;
  },
};
