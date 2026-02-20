import { Skeleton } from '@/components/ui/skeleton';

type TemporarySkeletonProps = {
  children: React.ReactNode;
};

export const TemporarySkeleton: React.FC<TemporarySkeletonProps> = ({
  children,
}) => {
  return (
    <div className='flex flex-col gap-3.75 md:gap-6'>
      {/* Title */}
      <Skeleton className='h-7 w-40 md:h-8' />

      {/* Search Bar */}
      <Skeleton className='h-11 w-full rounded-full md:h-12 md:max-w-150' />

      {/* Status Tabs */}
      <div className='flex items-center gap-2 overflow-x-auto md:gap-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 rounded-full md:w-28' />
        ))}
      </div>

      {children}
    </div>
  );
};

export const SkeletonWithItems = () => {
  return (
    <TemporarySkeleton>
      {/* Book List */}
      <div className='flex flex-col gap-3.75 md:gap-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-4 rounded-xl border border-neutral-200 p-3 md:p-4'
          >
            {/* Book Cover */}
            <Skeleton className='h-20 w-14 rounded-md md:h-24 md:w-16' />

            {/* Book Info */}
            <div className='flex flex-1 flex-col gap-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-5 w-1/4' />
              <Skeleton className='h-4 w-1/5' />
            </div>
          </div>
        ))}
      </div>
    </TemporarySkeleton>
  );
};
