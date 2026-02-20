import { SkeletonWithItems } from '@/components/shared/temporary-skeleton';
import { useGetAdminUsers } from '@/hook/use-admin';
import { useIsMobile } from '@/hook/use-is-mobile';
import { Search } from 'lucide-react';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import type { UserCardProps } from '../types';

export const UserList = () => {
  const [temporaryQ, setTemporaryQ] = useState('');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const isMobile = useIsMobile();

  const { data, isPending, isError } = useGetAdminUsers({
    q,
    page,
    limit: 10,
  });

  const handleSearch = () => {
    setPage(1);
    setQ(temporaryQ);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handlePreviousPage = () => {
    if (currentPage === 1 || isPending) return;

    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages || isPending) return;
    setPage((p) => p + 1);
  };

  if (isPending && !data) {
    return <SkeletonWithItems />;
  }

  if (isError) return null;

  const users = data?.data.users ?? [];
  const { page: currentPage, totalPages } = data!.data.pagination;

  return (
    <div className='flex flex-col gap-3.75 md:gap-6'>
      {/* Title */}
      <span className='display-xs-bold md:display-sm-bold md:tracking-[-0.02em]'>
        User
      </span>

      {/* Search Bar */}
      <label htmlFor='q' className='relative'>
        <input
          id='q'
          type='text'
          value={temporaryQ}
          onChange={(e) => setTemporaryQ(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder='Search user'
          className='h-11 w-full rounded-full border border-neutral-300 p-4 pl-10.5 md:h-12 md:max-w-150'
        />

        <Search
          onClick={handleSearch}
          className='absolute top-1/2 left-4 size-5 -translate-y-1/2 cursor-pointer'
        />
      </label>

      {/* Mobile */}
      {isMobile && (
        <div className='flex flex-col gap-3.75'>
          {users
            .slice()
            .reverse()
            .map((user) => (
              <UserMobileCard key={user.id} user={user} />
            ))}

          {users.length === 0 && (
            <span className='text-md-semibold md:text-lg-semibold text-neutral-600'>
              No user found.
            </span>
          )}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  className={cn(
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  )}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  className={cn(
                    currentPage >= totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Desktop */}
      {!isMobile && (
        <div className='grid grid-cols-[max-content_1fr_1fr_1fr_1fr] rounded-xl border border-neutral-300 bg-white p-4 shadow-[0_0_20px_0_#CBCACA33]'>
          <div className='flex h-16 w-13 items-center bg-neutral-50 px-4 py-2'>
            <span className='text-sm-bold tracking-[-0.02em]'>No</span>
          </div>
          <div className='flex h-16 flex-1 items-center bg-neutral-50 px-4 py-2'>
            <span className='text-sm-bold tracking-[-0.02em]'>Name</span>
          </div>
          <div className='flex h-16 flex-1 items-center bg-neutral-50 px-4 py-2'>
            <span className='text-sm-bold tracking-[-0.02em]'>
              Phone Number
            </span>
          </div>
          <div className='flex h-16 flex-1 items-center bg-neutral-50 px-4 py-2'>
            <span className='text-sm-bold tracking-[-0.02em]'>Email</span>
          </div>
          <div className='flex h-16 flex-1 items-center bg-neutral-50 px-4 py-2'>
            <span className='text-sm-bold tracking-[-0.02em]'>Created at</span>
          </div>

          {users
            .slice()
            .reverse()
            .map((user) => (
              <UserDesktopCard key={user.id} user={user} />
            ))}

          {/* Pagination */}

          <div className='col-span-5 flex h-16 items-center justify-between'>
            <span className='text-md-medium w-full tracking-[-0.03em]'>
              Showing {data.data.pagination.page} to{' '}
              {data.data.pagination.totalPages} of {data.data.pagination.total}{' '}
              entries
            </span>

            <Pagination className='w-fit'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousPage}
                    className={cn(
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    )}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    className={cn(
                      currentPage >= totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export const UserMobileCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className='flex flex-col gap-1 rounded-xl bg-white p-3 shadow-[0_0_20px_0_#CBCACA40]'>
      <div className='flex items-center justify-between'>
        <span className='text-sm-semibold tracking-[-0.02em]'>No</span>
        <span className='text-sm-bold tracking-[-0.02em]'>{user.id}</span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-sm-semibold tracking-[-0.02em]'>Name</span>
        <span className='text-sm-bold tracking-[-0.02em]'>{user.name}</span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-sm-semibold tracking-[-0.02em]'>Email</span>
        <span className='text-sm-bold tracking-[-0.02em]'>{user.email}</span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-sm-semibold tracking-[-0.02em]'>
          Phone Number
        </span>
        <span className='text-sm-bold tracking-[-0.02em]'>
          {user.phone ?? '-'}
        </span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-sm-semibold tracking-[-0.02em]'>Created at</span>
        <span className='text-sm-bold tracking-[-0.02em]'>
          {dayjs(user.createdAt).format('DD MMM YYYY, HH:mm')}
        </span>
      </div>
    </div>
  );
};

export const UserDesktopCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <>
      <span className='text-md-semibold flex h-16 items-center border-b border-neutral-300 pl-4 tracking-[-0.02em]'>
        {user.id}
      </span>

      <span className='text-md-semibold flex h-16 items-center border-b border-neutral-300 pl-4 tracking-[-0.02em]'>
        {user.name}
      </span>

      <span className='text-md-semibold flex h-16 items-center border-b border-neutral-300 pl-4 tracking-[-0.02em]'>
        {user.email}
      </span>

      <span className='text-md-semibold flex h-16 items-center border-b border-neutral-300 pl-4 tracking-[-0.02em]'>
        {user.phone ?? '-'}
      </span>

      <span className='text-md-semibold flex h-16 items-center border-b border-neutral-300 pl-4 tracking-[-0.02em]'>
        {dayjs(user.createdAt).format('DD MMM YYYY, HH:mm')}
      </span>
    </>
  );
};
