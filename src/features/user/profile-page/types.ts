import type { LoanStatusParams, BookDetail, Review } from '@/types/api';

export type Options = 'profile' | 'borrowed-list' | 'reviews';

export type ProfileFormErrors = {
  name?: string;
  phone?: string;
  profilePhoto?: string;
};

export type LoanedBook = {
  id: number;
  status: LoanStatusParams;
  displayStatus: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string;
  durationDays: number;
  book: Omit<BookDetail, 'author' | 'category'> & {
    author: { id: number; name: string };
    category: { id: number; name: string };
  };
};

export type ReviewCardProps = {
  review: Omit<Review, 'userId' | 'bookId' | 'user'> & {
    book: Omit<BookDetail, 'author' | 'category'> & {
      author: { id: number; name: string };
      category: { id: number; name: string };
    };
  };
};
