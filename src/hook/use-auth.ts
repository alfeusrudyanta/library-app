import { apiAuth } from '@/api/api-auth';
import { queryClient } from '@/lib/query-client';
import type { PostLoginRequest, PostRegisterRequest } from '@/types/api-auth';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const handleToken = (token: string) => {
  Cookies.set('token', token, {
    expires: 7,
    path: '/',
  });
};

export const usePostRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PostRegisterRequest) => {
      return apiAuth.postRegister(data);
    },
    onSuccess: () => {
      toast.success('Successfully registered');
      navigate('/login');
    },
    onError: () => {
      toast.error('Failed to register');
    },
  });
};

export const usePostLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PostLoginRequest) => {
      return apiAuth.postLogin(data);
    },
    onSuccess: (response) => {
      toast.success('Successfully logged in');
      handleToken(response.data.token);
      queryClient.clear();
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to log in');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    Cookies.remove('token', { path: '/' });
    queryClient.clear();
    toast.success('Logout successful');
    navigate('/login');
  };
};
