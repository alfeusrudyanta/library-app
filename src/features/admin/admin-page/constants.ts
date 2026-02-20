import type { BookStatusParams } from '@/types/api';
import type { Options } from './types';

export const VALID_TABS: Options[] = ['borrowed-list', 'user', 'book-list'];

export const STATUS: BookStatusParams[] = [
  'all',
  'available',
  'borrowed',
  'returned',
];
