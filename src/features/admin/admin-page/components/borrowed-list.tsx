import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { SkeletonWithItems } from '@/components/shared/temporary-skeleton';
import { Button } from '@/components/ui/button';
import { useGetAdminLoans } from '@/hook/use-admin';
import { cn } from '@/lib/utils';
import type { BorrowDetail, LoanStatusParams } from '@/types/api';
import { Dot, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { LOAN_STATUS } from '../constants';
import dayjs from 'dayjs';
import { BookCartCard } from '@/components/shared/book-cart-card';

export const BorrowedList = () => {
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<LoanStatusParams>('all');
  const [temporaryQ, setTemporaryQ] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetAdminLoans({
    status,
    q: q || undefined,
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleClick = () => {
    setQ(temporaryQ);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  if (!data && isPending) {
    return <SkeletonWithItems />;
  }

  if (isError) return;

  const loanData = data?.pages.flatMap((page) => page.data.loans) || [];

  return (
    <div className='flex flex-col gap-3.75 md:gap-6'>
      {/* Title */}
      <span className='display-xs-bold md:display-sm-bold md:tracking-[-0.03em]'>
        Borrowed List
      </span>

      {/* Search Bar */}
      <label htmlFor='q' className='relative'>
        <input
          id='q'
          type='text'
          value={temporaryQ}
          onChange={(e) => setTemporaryQ(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder='Search book'
          className='h-11 w-full rounded-full border border-neutral-300 p-4 pl-10.5 md:h-12 md:max-w-150'
        />

        <Search
          onClick={handleClick}
          className='absolute top-1/2 left-4 size-5 -translate-y-1/2 cursor-pointer'
        />
      </label>

      {/* Book List */}
      <div className='flex items-center gap-2 overflow-x-auto md:gap-3'>
        {LOAN_STATUS.map((s) => (
          <Button
            variant='transparent'
            key={s}
            value={s}
            disabled={s === status}
            onClick={() => setStatus(s)}
            className={cn(
              'text-sm-semibold! md:text-md-semibold! h-10 w-fit rounded-full border border-neutral-300 px-4 py-2 tracking-[-0.02em] hover:text-neutral-950/90',
              s === status &&
                'border-primary-300 hover:border-primary-300/90 text-primary-300! bg-[#F6F9FE]'
            )}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>

      {/* Books */}
      <div className='flex flex-col gap-3.75 md:gap-4'>
        {loanData.length === 0 && (
          <span className='text-md-semibold md:text-lg-semibold text-neutral-600'>
            No books found for this filter.
          </span>
        )}

        {loanData.map((book) => (
          <FilteredBook key={book.id} {...book} />
        ))}

        <div ref={ref} />

        {isFetchingNextPage && (
          <div className='flex items-center justify-center'>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

const FilteredBook: React.FC<BorrowDetail> = (book) => {
  const borrowed = dayjs(book.borrowedAt);
  const due = dayjs(book.dueAt);

  const durationDays = due.diff(borrowed, 'day');

  return (
    <div className='group flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-5 md:p-5'>
      {/* Status */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
            Status
          </span>

          <div className='rounded-xs bg-[#24A5000D] px-2'>
            <span className='text-sm-bold tracking-[-0.02em] text-[#24A500]'>
              {book.displayStatus}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
            Due Date
          </span>

          <div className='rounded-xs bg-[#EE1D521A] px-2'>
            <span className='text-sm-bold tracking-[-0.02em] text-[#EE1D52]'>
              {due.format('DD MMMM YYYY')}
            </span>
          </div>
        </div>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4'>
        {/* First Column */}
        <BookCartCard bookId={book.book.id}>
          <div className='flex items-center gap-1'>
            <span className='md:text-md-bold text-sm-bold tracking-[-0.02em]'>
              {borrowed.format('DD MMM YYYY')}
            </span>

            <Dot className='size-4' />

            <span className='md:text-md-bold text-sm-bold tracking-[-0.02em]'>
              Duration {durationDays} Day{durationDays > 1 && 's'}
            </span>
          </div>
        </BookCartCard>

        {/* Line */}
        <div className='w-full border border-neutral-300 md:hidden' />

        {/* Second Column */}
        <div className='flex flex-col'>
          <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
            Borrower's name
          </span>
          <span className='md:text-xl-bold text-md-bold tracking-[-0.02em]'>
            {book.borrower.name}
          </span>
        </div>
      </div>
    </div>
  );
};
