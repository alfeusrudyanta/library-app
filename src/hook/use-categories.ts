import { apiCategories } from '@/api/api-categories';
import { queryClient } from '@/lib/query-client';
import type {
  PostCategoryRequest,
  PutCategoryRequest,
} from '@/types/api-categories';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const categoriesKeys = {
  all: ['categories'] as const,
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoriesKeys.all,
    queryFn: () => apiCategories.getCategories(),
  });
};

export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: PostCategoryRequest) => apiCategories.postCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success('Category created');
    },
    onError: () => {
      toast.error('Failed to create category');
    },
  });
};

export const usePutCategory = (categoryId: number) => {
  return useMutation({
    mutationFn: (data: PutCategoryRequest) =>
      apiCategories.putCategory(categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success('Category updated');
    },
    onError: () => {
      toast.error('Failed to update category');
    },
  });
};

export const useDeleteCategory = (categoryId: number) => {
  return useMutation({
    mutationFn: () => apiCategories.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success('Category deleted');
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });
};
