import type { BookStatusParams, LoanStatusParams } from '@/types/api';
import type { Options } from './types';

export const VALID_TABS: Options[] = ['borrowed-list', 'user', 'book-list'];

export const BOOK_STATUS: BookStatusParams[] = [
  'all',
  'available',
  'borrowed',
  'returned',
];

export const LOAN_STATUS: LoanStatusParams[] = [
  'all',
  'active',
  'returned',
  'overdue',
];
