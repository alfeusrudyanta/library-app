import { useGetMeReviews } from '@/hook/use-me';
import dayjs from 'dayjs';
import { Search, Star } from 'lucide-react';
import { useState } from 'react';
import { SkeletonWithItems } from '@/components/shared/temporary-skeleton';
import type { ReviewCardProps } from '../types';
import { BookCartCard } from '@/components/shared/book-cart-card';

export const Reviews = () => {
  const [temporaryQ, setTemporaryQ] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const { data, isPending, isError } = useGetMeReviews(q);

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

  if (isError) {
    return (
      <span className='text-md-semibold md:text-lg-semibold text-neutral-600'>
        Failed to load reviews.
      </span>
    );
  }

  const meReviewData = data?.pages.flatMap((page) => page.data.reviews) || [];

  return (
    <div className='flex flex-col gap-3.75 md:gap-6'>
      {/* Title */}
      <span className='text-display-xs md:text-display-sm font-bold'>
        Book List
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

      <div className='flex flex-col gap-4 md:gap-6'>
        {meReviewData.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-5 md:p-5'>
      {/* Date */}
      <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
        {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
      </span>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Book */}
      <BookCartCard bookId={review.book.id} />

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      <div className='flex flex-col gap-2'>
        {/* Star */}
        <div className='flex items-center gap-0.5'>
          {Array.from({ length: review.star }).map((_, index) => (
            <Star key={index} className='size-6 fill-[#FFAB0D] stroke-0' />
          ))}
        </div>

        {/* Comment */}
        <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
          {review.comment}
        </span>
      </div>
    </div>
  );
};
