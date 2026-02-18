import { apiCart } from '@/api/api-cart';
import { queryClient } from '@/lib/query-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const cartKeys = {
  all: ['cart'] as const,
  checkout: () => [...cartKeys.all, 'checkout'] as const,
};

export const useGetCart = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: () => apiCart.getCart(),
  });
};

export const useGetCartCheckout = () => {
  return useQuery({
    queryKey: cartKeys.checkout(),
    queryFn: () => apiCart.getCartCheckout(),
  });
};

export const usePostCartItem = () => {
  return useMutation({
    mutationFn: (data: { bookId: number }) => apiCart.postCartItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Item added to cart');
    },
    onError: () => {
      toast.error('Failed to add item to cart');
    },
  });
};

export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: (itemId: number) => apiCart.deleteCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Item removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove item from cart');
    },
  });
};

export const useDeleteCart = () => {
  return useMutation({
    mutationFn: () => apiCart.deleteCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Cart cleared');
    },
    onError: () => {
      toast.error('Failed to clear cart');
    },
  });
};
