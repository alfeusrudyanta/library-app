/* Status / Params */

export type BookStatusParams = 'all' | 'available' | 'borrowed' | 'returned';

export type LoanStatusParams = 'all' | 'active' | 'returned' | 'overdue';

export type BorrowStatus = 'BORROWED' | 'RETURNED' | 'LATE';

/* Core API  */

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/* Paginated Wrappers  */

export type PaginatedBooks<T> = {
  books: T[];
  pagination: Pagination;
};

export type PaginatedLoans<T> = {
  loans: T[];
  pagination: Pagination;
};

export type PaginatedOverdue<T> = {
  overdue: T[];
  pagination: Pagination;
};

export type PaginatedUsers<T> = {
  users: T[];
  pagination: Pagination;
};

export type PaginatedAuthors<T> = {
  authors: T[];
  pagination: Pagination;
};

export type PaginatedCategories<T> = {
  categories: T[];
  pagination: Pagination;
};

export type PaginatedReviews<T> = {
  reviews: T[];
  pagination: Pagination;
};

/* Book Domain  */

export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthorSummary = {
  id: number;
  name: string;
  bio: string;
  bookCount: number;
  accumulatedScore: number;
};

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type BookUpdateDetail = {
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  authorId: number;
  authorName: string;
  categoryId: number;
  totalCopies: number;
  availableCopies: number;
};

export type BookDetail = {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
};

/* Review */

export type ReviewUserSummary = {
  id: number;
  name: string;
};

export type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: ReviewUserSummary;
};

export type BookStats = { rating: number; reviewCount: number };

/* Loan / Borrow */

export type LoanSummary = {
  id: number;
  userId: number;
  bookId: number;
  status: BorrowStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
};

export type Borrower = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type BorrowBookSummary = {
  id: number;
  title: string;
  coverImage: string;
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
};

export type BorrowDetail = {
  id: number;
  status: BorrowStatus;
  displayStatus: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  durationDays: number;
  book: BorrowBookSummary;
  borrower: Borrower;
};

export type BorrowUserSummary = {
  id: number;
  name: string;
  email: string;
};

export type BorrowBookMini = {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
};

export type BorrowRecord = {
  id: number;
  userId: number;
  bookId: number;
  status: BorrowStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  user: BorrowUserSummary;
  book: BorrowBookMini;
};

export type DashboardTotals = {
  users: number;
  books: number;
};

export type DashboardLoanStats = {
  active: number;
  overdue: number;
};

export type TopBorrowedBook = {
  id: number;
  title: string;
  borrowCount: number;
  rating: number;
  availableCopies: number;
  totalCopies: number;
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
};

export type DashboardStats = {
  totals: DashboardTotals;
  loans: DashboardLoanStats;
  topBorrowed: TopBorrowedBook[];
  generatedAt: string;
};

/* User */

export type User = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  profilePhoto: null | string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
};

export type LoanStats = {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
};

/* Cart */

export type BookCart = {
  id: number;
  bookId: number;
  addedAt: string;
  book: (Omit<BookDetail, 'author' | 'category'> & {
    author: { id: number; name: string };
    category: { id: number; name: string };
  })[];
  itemCount: number;
};
