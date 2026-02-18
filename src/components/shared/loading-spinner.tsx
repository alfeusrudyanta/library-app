import { cn } from '../../lib/utils';

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'size-4 animate-spin rounded-full border-2 border-neutral-700 border-t-transparent',
        className
      )}
    />
  );
};

export { LoadingSpinner };
