import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetLoanMe } from '@/hook/use-loans';
import { cn } from '@/lib/utils';
import type { LoanStatusParams } from '@/types/api';
import dayjs from 'dayjs';
import { Dot, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LOAN_STATUS } from '../constant';
import type { LoanedBook } from '../types';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { usePostReview } from '@/hook/use-review';
import { BookCartCard } from '@/components/shared/book-cart-card';
import { SkeletonWithItems } from '@/components/shared/temporary-skeleton';

export const BorrowedList = () => {
  const { ref, inView } = useInView();
  const [loanStatus, setLoanStatus] = useState<LoanStatusParams>('all');
  const [temporaryQ, setTemporaryQ] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetLoanMe({
    status: loanStatus,
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

  const hanldeKeyDown = (e: React.KeyboardEvent) => {
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
          onKeyDown={hanldeKeyDown}
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
        {LOAN_STATUS.map((status) => (
          <Button
            variant='transparent'
            key={status}
            value={status}
            disabled={status === loanStatus}
            onClick={() => setLoanStatus(status)}
            className={cn(
              'text-sm-semibold md:text-md-semibold h-10 w-fit rounded-full border border-neutral-300 px-4 py-2 tracking-[-0.02em] hover:text-neutral-950/90',
              status === loanStatus &&
                'border-primary-300 hover:border-primary-300/90 text-primary-300! bg-[#F6F9FE]'
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
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

const FilteredBook: React.FC<LoanedBook> = (loans) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [star, setStar] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const { mutate, isPending } = usePostReview();

  const borrowed = dayjs(loans.borrowedAt);
  const due = dayjs(loans.dueAt);

  const durationDays = due.diff(borrowed, 'day');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { bookId: loans.book.id, comment, star },
      {
        onSuccess: () => {
          setIsOpen(false);
          setStar(5);
          setComment('');
        },
      }
    );
  };

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
              {loans.displayStatus}
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
        <BookCartCard bookId={loans.book.id}>
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

        {/* Second Column */}
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className='h-10 md:h-10 md:max-w-45.5'
        >
          Give Review
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='sr-only'>Give Review</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>
            Create your review including your star rating and comment.
          </DialogDescription>

          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <span className='text-lg-bold md:display-xs-bold tracking-[-0.03em] md:tracking-normal'>
              Give Review
            </span>

            {/* Rating */}
            <div className='flex flex-col'>
              <span className='text-sm-bold md:text-md-extrabold text-center tracking-[-0.02em] md:tracking-normal'>
                Give Rating
              </span>

              <div className='flex items-center justify-center gap-1'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    onClick={() => setStar(value)}
                    className={cn(
                      'size-7 cursor-pointer stroke-0 md:size-9',
                      value <= star ? 'fill-accent-yellow' : 'fill-neutral-400'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <textarea
              required
              disabled={isPending}
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              placeholder='Please share your thoughts about this book'
              className='h-58.75 w-full gap-2 rounded-xl border border-neutral-300 px-3 py-2'
            />

            <div className='flex items-center gap-4'>
              <Button disabled={isPending} className='h-10 md:h-12'>
                {isPending ? <LoadingSpinner /> : 'Send'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
