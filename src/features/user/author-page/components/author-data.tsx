import { useGetAuthorBooks } from '@/hook/use-author';
import React from 'react';

type AuthorDataProps = {
  id: number;
};

export const AuthorData: React.FC<AuthorDataProps> = ({ id }) => {
  const { data } = useGetAuthorBooks(id);

  const authorDetail = data?.pages[0].data.author;
  const bookCount = data?.pages[0].data.bookCount;

  return (
    <div className='flex h-21 w-full items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_0_20px_0_#CBCACA40] md:h-28.25 md:gap-4 md:p-4'>
      {/* Image */}
      <img
        src='/images/author-profile.png'
        alt='Author profile picture'
        className='size-15 rounded-full md:size-20'
      />

      {/* Details */}
      <div className='flex flex-col gap-0.5'>
        <span className='text-md-bold md:text-lg-bold tracking-[-0.02em] md:tracking-[-0.03em]'>
          {authorDetail!.name}
        </span>

        <div className='flex items-center gap-1.5'>
          <img src='/icons/home-book.svg' alt='Book icons' className='size-6' />

          <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
            {bookCount} book{bookCount! > 1 && 's'}
          </span>
        </div>
      </div>
    </div>
  );
};
