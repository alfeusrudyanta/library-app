import type { ApiResponse, User } from '@/types/api';

export type PostRegisterRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
export type PostRegisterResponse = ApiResponse<Omit<User, 'createdAt'>>;

export type PostLoginRequest = {
  email: string;
  password: string;
};
export type PostLoginResponse = ApiResponse<{
  token: string;
  user: Omit<User, 'createdAt'>;
}>;
