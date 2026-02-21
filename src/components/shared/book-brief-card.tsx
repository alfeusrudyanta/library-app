import { useGetBook } from '@/hook/use-books';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

type BookBriefCardProps = {
  id: number;
};

export const BookBriefCard: React.FC<BookBriefCardProps> = ({ id }) => {
  const { data, isPending, isError } = useGetBook(id);

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
    return;
  }

  const imgSrc = data?.data.coverImage || '/images/book-no-cover.jpg';

  return (
    <div className='group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_20px_0_#CBCACA40]'>
      {/* Images */}
      <Link to={`/book/${id}`}>
        <div className='relative flex aspect-224/336 items-center justify-between overflow-hidden'>
          <img
            src={imgSrc}
            alt={data?.data.title}
            onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
            loading='lazy'
            className='size-full object-cover object-center transition-all group-hover:scale-105'
          />

          <span className='text-xs-regular md:text-sm-regular bg-accent-green text-neutral-25 absolute top-4 right-0 rounded-l-full px-4'>
            Available copies: {data.data.availableCopies}
          </span>
        </div>
      </Link>

      {/* Details */}
      <div className='flex flex-col gap-0.5 p-3 md:gap-1 md:p-4'>
        <Link to={`/book/${id}`}>
          <span className='group-hover:text-primary-300 text-sm-bold md:text-lg-bold tracking-[-0.02em] text-neutral-900 md:tracking-[-0.03em]'>
            {data?.data.title}
          </span>
        </Link>

        <Link to={`/author/${data?.data.authorId}`}>
          <span className='text-sm-medium md:text-md-medium tracking-[-0.03em] text-neutral-700'>
            {data?.data.author.name}
          </span>
        </Link>

        <div className='flex items-center gap-0.5'>
          <Star className='size-6 fill-[#FFAB0D] stroke-0' />

          <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em] text-neutral-900'>
            {data?.data.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
