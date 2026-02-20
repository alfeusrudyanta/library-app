import { dayjs } from '@/lib/dayjs';
import type { UserCardProps } from '../types';

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
