import type { User } from '@/types/api';

export type Options = 'borrowed-list' | 'user' | 'book-list';

export type UserCardProps = {
  user: User;
};
