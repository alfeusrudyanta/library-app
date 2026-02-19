import { useGetBook } from '@/hook/use-books';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

type BookCartCardProps = {
  bookId: number;
};

export const BookCartCard: React.FC<BookCartCardProps> = ({ bookId }) => {
  const { data, isPending } = useGetBook(bookId);

  const imgSrc = data?.data.coverImage || '/images/book-no-cover.jpg';

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
      </div>
    </div>
  );
};
