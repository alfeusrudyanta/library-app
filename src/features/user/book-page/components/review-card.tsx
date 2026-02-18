import type { Review } from '@/types/api';
import dayjs from 'dayjs';
import { Star } from 'lucide-react';

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40]'>
      {/* Profile */}
      <div className='flex items-center gap-3'>
        <img
          src='/images/author-profile.png'
          alt='Profile Picture'
          className='size-14.5 rounded-full md:size-16'
        />

        <div className='flex flex-col'>
          <span className='text-sm-bold md:text-lg-bold tracking-[-0.02em]'>
            {review.user.name}
          </span>

          <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
            {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className='flex flex-col gap-2'>
        {/* Star */}
        <div className='flex items-center'>
          {Array.from({ length: review.star }).map((_, index) => (
            <Star
              key={'star: ' + index}
              className='size-6 fill-[#FFAB0D] stroke-0'
            />
          ))}
        </div>

        {/* Comment */}
        <span className='font-semibold'>{review.comment}</span>
      </div>
    </div>
  );
};
