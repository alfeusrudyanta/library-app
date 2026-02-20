import type { LoanStatusParams } from '@/types/api';
import type { Options } from './types';

export const VALID_TABS: Options[] = ['profile', 'borrowed-list', 'reviews'];

export const LOAN_STATUS: LoanStatusParams[] = [
  'all',
  'active',
  'returned',
  'overdue',
];
