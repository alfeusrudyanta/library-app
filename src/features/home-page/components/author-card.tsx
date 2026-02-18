import type { AuthorSummary } from '@/types/api';
import React from 'react';
import { Link } from 'react-router-dom';

type AuthorCardProps = {
  author: AuthorSummary;
};

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <Link to={`/author/${author.id}`} className='group h-full'>
      <div className='flex h-full w-full items-center gap-3 rounded-xl bg-white p-3 shadow-[0_0_20px_0_#CBCACA40] md:gap-4 md:p-4'>
        {/* Image */}
        <img
          src='/images/author-profile.png'
          alt='Author profile picture'
          className='size-15 rounded-full md:size-20.25'
        />

        {/* Details */}
        <div className='flex flex-col gap-0.5'>
          <span className='text-md-bold md:text-lg-bold group-hover:text-primary-300 line-clamp-1 tracking-[-0.02em] text-neutral-900 md:tracking-[-0.03em]'>
            {author.name}
          </span>

          <div className='flex items-center gap-1.5'>
            <img
              src='/icons/home-book.svg'
              alt='Book icons'
              className='size-6'
            />
            <span>
              {author.bookCount} book
              {author.bookCount > 1 && 's'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
