import { useGetBook } from '@/hook/use-books';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCheckout, setCheckout } from '@/store/slices/checkout-slice';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';

type BookCartCardProps = {
  bookId: number;
  children?: React.ReactNode;
};

export const BookCartCard: React.FC<BookCartCardProps> = ({
  bookId,
  children,
}) => {
  const dispatch = useDispatch();
  const checkoutIds = useSelector(selectCheckout).bookIds;

  const { data, isPending, isError, error } = useGetBook(bookId);

  const imgSrc = data?.data.coverImage || '/images/book-no-cover.jpg';

  useEffect(() => {
    if (!isError) return;

    const axiosError = error as AxiosError;

    if (axiosError?.response?.status === 400) {
      dispatch(
        setCheckout({
          bookIds: checkoutIds.filter((id) => id !== bookId),
          returnDate: '',
        })
      );
    }
  }, [isError, error, bookId, checkoutIds, dispatch]);

  if (!data && isPending) {
    return (
      <div className='flex flex-col gap-2'>
        {/* Category */}
        <Skeleton className='h-5 w-20' />

        {/* Title */}
        <Skeleton className='h-5 w-40 md:w-52' />

        {/* Author */}
        <Skeleton className='h-4 w-28 md:w-36' />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className='group flex items-center gap-3 md:gap-4'>
      <Link to={`/book/${bookId}`}>
        <div className='flex max-w-17.5 items-center justify-between overflow-hidden md:max-w-23'>
          <img
            src={imgSrc}
            onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
            alt={data?.data.title}
            loading='lazy'
            className='w-full object-cover object-center transition-all group-hover:scale-105'
          />
        </div>
      </Link>

      {/* Details */}
      <div className='flex flex-col items-start gap-1'>
        <span className='text-sm-bold rounded-sm border border-neutral-300 px-2 tracking-[-0.02em]'>
          {data?.data.category.name}
        </span>

        <Link to={`/book/${bookId}`}>
          <span className='group-hover:text-primary-300 text-md-bold md:text-lg-bold tracking-[-0.02em] md:tracking-[-0.03em]'>
            {data?.data.title}
          </span>
        </Link>

        <Link to={`/author/${data?.data.authorId}`}>
          <span className='text-sm-medium md:text-md-medium tracking-[-0.03em] text-neutral-700'>
            {data?.data.author.name}
          </span>
        </Link>

        {children}
      </div>
    </div>
  );
};
