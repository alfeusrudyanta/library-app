import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { selectCheckout } from '@/store/slices/checkout-slice';

export const SuccessPage = () => {
  const checkout = useSelector(selectCheckout);

  if (!checkout.returnDate) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='mt-50 flex flex-col items-center justify-center gap-6 px-6 md:gap-8'>
      {/* Image */}
      <img
        src='/icons/success-logo.svg'
        alt='Success Icon'
        className='size-11xl'
      />

      {/* Text */}
      <div className='flex flex-col gap-2 text-center'>
        <span className='text-xl-bold md:display-sm-bold tracking-[-0.02em]'>
          Borrowing Successful!
        </span>

        <span className='text-md-semibold md:text-lg-semibold tracking-[-0.02em]'>
          Your book has been successfully borrowed. Please return it by{' '}
          <span className='text-[#EE1D52]'>{checkout.returnDate}</span>
        </span>
      </div>

      {/* Button */}
      <Link to='/profile?tab=borrowed-list' className='w-full max-w-71.5'>
        <Button>See Borrowed List</Button>
      </Link>
    </div>
  );
};
