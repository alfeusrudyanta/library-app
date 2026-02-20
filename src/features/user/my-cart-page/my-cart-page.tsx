import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { Section } from '@/components/shared/section';
import { Button } from '@/components/ui/button';
import { useGetCart } from '@/hook/use-cart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCheckout,
  setCheckout,
  clearCheckout,
} from '@/store/slices/checkout-slice';
import { BookCartCard } from '@/components/shared/book-cart-card';

export const MyCartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isPending, isError } = useGetCart();

  const checkoutList = useSelector(selectCheckout);
  const cartData = data?.data.items ?? [];

  if (!data && isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const isAllSelected =
    cartData.length > 0 &&
    cartData.every((item) => checkoutList.bookIds.includes(item.bookId));

  const handleSelectAll = () => {
    if (isAllSelected) {
      dispatch(clearCheckout());
    } else {
      dispatch(
        setCheckout({
          bookIds: cartData.map((item) => item.bookId),
          returnDate: '',
        })
      );
    }
  };

  const handleSelectItem = (id: number) => {
    if (checkoutList.bookIds.includes(id)) {
      const tempCheckout = checkoutList.bookIds.filter((i) => i !== id);
      dispatch(setCheckout({ bookIds: tempCheckout, returnDate: '' }));
    } else {
      dispatch(
        setCheckout({ bookIds: [...checkoutList.bookIds, id], returnDate: '' })
      );
    }
  };

  const handleSubmit = () => {
    navigate('/checkout');
  };

  return (
    <Section>
      <div className='flex flex-col gap-4 md:gap-8'>
        <span className='display-xs-bold md:display-lg-bold'>My Cart</span>

        <div className='flex gap-10'>
          {/* Cart List */}
          <div className='flex w-full flex-col gap-4 md:gap-6'>
            {/* Select All */}
            <label htmlFor='selectAll' className='flex items-center gap-4'>
              <input
                id='selectAll'
                checked={isAllSelected}
                onChange={handleSelectAll}
                type='checkbox'
                className='accent-primary-300 size-5 cursor-pointer rounded-sm border border-neutral-400'
              />

              <span className='text-md-semibold tracking-[-0.02em]'>
                Select All
              </span>
            </label>

            {/* Cart Items */}
            <div className='flex flex-col gap-4 md:gap-6'>
              {cartData.map((item, index) => (
                <div key={item.bookId} className='flex flex-col gap-4 md:gap-6'>
                  <div className='flex items-start gap-4'>
                    <input
                      type='checkbox'
                      checked={checkoutList.bookIds.includes(item.bookId)}
                      onChange={() => handleSelectItem(item.bookId)}
                      className='accent-primary-300 size-5 cursor-pointer rounded-sm border border-neutral-400'
                    />

                    <BookCartCard bookId={item.bookId} />
                  </div>

                  {index < cartData.length - 1 && (
                    <div className='w-full border border-neutral-300' />
                  )}
                </div>
              ))}

              {cartData.length === 0 && (
                <span className='text-md-semibold md:text-lg-semibold text-neutral-600'>
                  Your cart is empty. Start adding books to borrow.
                </span>
              )}
            </div>
          </div>

          {/* Desktop Summary */}
          <div className='fixed bottom-0 left-0 flex w-full items-center justify-between bg-white px-4 shadow-[0_0_20px_0_#CBCACA40] md:static md:max-w-79.5 md:flex-col md:items-stretch md:justify-start md:gap-6 md:p-5'>
            <span className='text-xl-bold hidden tracking-[-0.02em] md:block'>
              Loan Summary
            </span>

            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
                Total Book
              </span>

              <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
                {checkoutList.bookIds.length} item
                {checkoutList.bookIds.length > 1 && 's'}
              </span>
            </div>

            <Button
              disabled={checkoutList.bookIds.length <= 0}
              onClick={handleSubmit}
              className='h-10 max-w-37.5 md:h-12 md:max-w-69.5'
            >
              Borrow Book
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};
