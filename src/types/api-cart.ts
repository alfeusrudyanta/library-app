import type { ApiResponse, BookCart, BookDetail } from '@/types/api';

export type GetCartResponse = ApiResponse<BookCart>;

export type DeleteCartResponse = ApiResponse<{ cartId: number }>;

export type GetCartCheckoutResponse = ApiResponse<{
  user: {
    name: string;
    email: string;
    nomorHandphone: null | string;
  };
  items: {
    id: number;
    bookId: number;
    book: Omit<BookDetail, 'author' | 'category'> & {
      author: { id: number; name: string };
      category: { id: number; name: string };
    };
  }[];
  itemCount: number;
}>;

export type PostCartItemRequest = { bookId: number };
export type PostCartItemResponse = ApiResponse<{
  item: {
    id: number;
    cartId: number;
    bookId: number;
    createdAt: string;
    book: Omit<BookDetail, 'author' | 'category'> & {
      author: { id: number; name: string };
      category: { id: number; name: string };
    };
  };
}>;

export type DeleteCartItemResponse = ApiResponse<{ id: number }>;
