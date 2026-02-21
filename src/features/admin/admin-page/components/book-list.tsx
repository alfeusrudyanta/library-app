import { SkeletonWithItems } from '@/components/shared/temporary-skeleton';
import { Button } from '@/components/ui/button';
import { useGetAdminBooks } from '@/hook/use-admin';
import type { BookDetail, BookStatusParams } from '@/types/api';
import { Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BOOK_STATUS } from '../constants';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Link } from 'react-router-dom';
import { BookCartCard } from '@/components/shared/book-cart-card';
import { useIsMobile } from '@/hook/use-is-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteBook } from '@/hook/use-books';

export const BookList = () => {
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<BookStatusParams>('all');
  const [temporaryQ, setTemporaryQ] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetAdminBooks({
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

  const loanData = data?.pages.flatMap((page) => page.data.books) || [];

  return (
    <div className='flex flex-col gap-3.75 md:gap-6'>
      {/* Title */}
      <span className='display-xs-bold md:display-sm-bold md:tracking-[-0.03em]'>
        Book List
      </span>

      <Link to='/add-book'>
        <Button className='h-11 md:h-12 md:max-w-60'>Add Book</Button>
      </Link>

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
        {BOOK_STATUS.map((s) => (
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

const FilteredBook: React.FC<BookDetail> = ({ id, rating }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isPending, mutate } = useDeleteBook(id);

  const handleClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <div className='flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-5 md:p-5'>
      {/* First Column */}
      <BookCartCard bookId={id}>
        <div className='flex items-center gap-1'>
          <Star className='size-4 fill-[#FFAB0D] stroke-0' />

          <span className='md:text-md-bold text-sm-bold tracking-[-0.02em]'>
            {rating.toFixed(1)}
          </span>
        </div>
      </BookCartCard>

      {/* Second Column */}
      {!isMobile && (
        <div className='flex items-center gap-3.25'>
          <Link to={`/preview/${id}`} className='w-full'>
            <Button variant='transparent' className='w-23.75'>
              Preview
            </Button>
          </Link>

          <Link to={`/edit-book/${id}`} className='w-full'>
            <Button variant='transparent' className='w-23.75'>
              Edit
            </Button>
          </Link>

          <Button
            variant='transparent'
            onClick={() => setIsOpen((prev) => !prev)}
            className='w-23.75 text-[#EE1D52]'
          >
            Delete
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='sr-only'>Give Review</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>
            Create your review including your star rating and comment.
          </DialogDescription>

          <div className='flex flex-col gap-4 md:gap-8'>
            <div className='flex flex-col gap-3'>
              <span className='text-md-bold md:text-lg-bold tracking-[-0.02em] md:tracking-[-0.03em]'>
                Delete Data
              </span>
              <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
                Once deleted, you won’t be able to recover this data.
              </span>
            </div>

            <div className='flex items-center gap-4'>
              <Button
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                variant='transparent'
                className='h-10 flex-1 md:h-11'
              >
                Cancel
              </Button>

              <Button
                variant='transparent'
                disabled={isPending}
                onClick={handleClick}
                className='bg-accent-red hover:bg-accent-red/90 text-neutral-25 h-10 flex-1 border-0 md:h-11'
              >
                {isPending ? <LoadingSpinner /> : 'Confirm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
