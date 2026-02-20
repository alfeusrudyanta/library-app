import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { BookCartCard } from '@/components/shared/book-cart-card';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Section } from '@/components/shared/section';
import { Button } from '@/components/ui/button';
import { useDeleteCartItem, useGetCart } from '@/hook/use-cart';
import { usePostLoan } from '@/hook/use-loans';
import { useGetMe } from '@/hook/use-me';
import { selectCheckout, setCheckout } from '@/store/slices/checkout-slice';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const meQuery = useGetMe();
  const myCartQuery = useGetCart();
  const postLoan = usePostLoan();
  const deleteCart = useDeleteCartItem();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [agreeReturnBook, setAgreeReturnBook] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const checkoutList = useSelector(selectCheckout);
  const cartItems = myCartQuery.data?.data.items ?? [];

  useEffect(() => {
    if (error) setError('');
  }, [selectedDay, agreeReturnBook, agreePolicy]);

  if (!meQuery.data || meQuery.isPending) {
    return <LoadingPage />;
  }

  if (meQuery.isError) {
    return <ErrorPage />;
  }

  const profileData = meQuery.data.data.profile;
  const returnDate = dayjs().add(selectedDay, 'days').format('DD MMMM YYYY');

  const handleSubmit = async () => {
    const results = await Promise.allSettled(
      checkoutList.bookIds.map((bookId) =>
        postLoan.mutateAsync({ bookId, days: selectedDay })
      )
    );

    const failedBooks = results
      .map((result, index) =>
        result.status === 'rejected' ? checkoutList.bookIds[index] : null
      )
      .filter((id) => id !== null);

    const succeededBooks = checkoutList.bookIds.filter(
      (id) => !failedBooks.includes(id)
    );

    dispatch(setCheckout({ bookIds: failedBooks, returnDate }));

    const deletedItemIds = cartItems.filter((item) =>
      succeededBooks.includes(item.bookId)
    );

    await Promise.all(
      deletedItemIds.map((item) => deleteCart.mutateAsync(item.id))
    );

    if (succeededBooks.length > 0) {
      navigate('/success');
    } else {
      setError(
        failedBooks.length === checkoutList.bookIds.length
          ? 'Failed to borrow selected books. Please try again.'
          : 'Some books could not be borrowed and were kept in your checkout list.'
      );
    }
  };

  return (
    <Section>
      <div className='flex flex-col gap-4 md:gap-8'>
        <span className='display-xs-bold md:display-lg-bold'>Checkout</span>

        <div className='flex flex-col gap-6 md:flex-row md:justify-between md:gap-14.5'>
          {/* Personal information */}
          <div className='flex w-full flex-col gap-2 md:gap-4'>
            <span className='text-lg-bold md:display-xs-bold tracking-[-0.03em] md:tracking-normal'>
              User Information
            </span>

            <div className='flex flex-col gap-2.25 md:gap-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
                  Name
                </span>
                <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
                  {profileData.name}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
                  Email
                </span>
                <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
                  {profileData.email}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
                  Phone Number
                </span>
                <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
                  {profileData.phone || '-'}
                </span>
              </div>
            </div>

            <div className='w-full border border-neutral-300' />

            <div className='flex flex-col gap-2 md:gap-4'>
              <span className='md:text-display-xs text-lg font-bold'>
                Book List
              </span>

              {checkoutList.bookIds.map((id) => (
                <BookCartCard key={id} bookId={id} />
              ))}

              {checkoutList.bookIds.length === 0 && (
                <span className='text-md-semibold md:text-lg-semibold text-neutral-600'>
                  No books found in your checkout list.
                </span>
              )}
            </div>
          </div>

          {/* Returned date */}
          <div className='flex w-full flex-col gap-4 rounded-3xl bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-6 md:p-5'>
            <span className='text-xl-bold md:display-sm-bold tracking-[-0.02em]'>
              Complete Your Borrow Request
            </span>

            {/* Borrow Date */}
            <div className='flex flex-col gap-0.5'>
              <span className='text-sm-bold tracking-[-0.02em]'>
                Borrow Date
              </span>

              <div className='flex h-12 items-center justify-between gap-2 rounded-xl border border-neutral-300 bg-neutral-100 px-4'>
                <span className='text-md-semibold tracking-[-0.02em]'>
                  {dayjs().format('DD MMM YYYY')}
                </span>
                <Calendar className='size-5' />
              </div>
            </div>

            {/* Borrow Duration */}
            <div className='flex flex-col gap-0.5'>
              <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
                Borrow Duration
              </span>

              <div className='flex flex-col gap-3'>
                {[3, 5, 10].map((value) => (
                  <label
                    key={value}
                    htmlFor={String(value)}
                    className='flex cursor-pointer items-center gap-3'
                  >
                    <input
                      id={String(value)}
                      type='radio'
                      checked={selectedDay === value}
                      disabled={postLoan.isPending || deleteCart.isPending}
                      onChange={() => setSelectedDay(value)}
                      className='accent-primary-300 h-4 w-4 cursor-pointer'
                    />

                    <div className='flex items-center gap-2'>
                      <span className='font-semibold'>{value} Days</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className='bg-primary-100 flex flex-col rounded-xl p-3 md:p-4'>
              <span className='text-sm-bold md:text-md-bold tracking-[-0.02em]'>
                Return Date
              </span>

              <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
                Please return the book no later than{' '}
                <br className='md:hidden' />
                <span className='text-sm-bold md:text-md-bold text-[#EE1D52]'>
                  {returnDate}
                </span>
              </span>
            </div>

            {/* Checklist */}
            <div className='flex flex-col'>
              <label
                htmlFor='agreeReturnBook'
                className='flex cursor-pointer items-center gap-2 md:gap-3'
              >
                <input
                  id='agreeReturnBook'
                  type='checkbox'
                  disabled={postLoan.isPending || deleteCart.isPending}
                  onChange={() => setAgreeReturnBook((prev) => !prev)}
                  className='accent-primary-300 h-4 w-4 cursor-pointer'
                />
                <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
                  I agree to return the book(s) before the due date.
                </span>
              </label>

              <label
                htmlFor='agreePolicy'
                className='flex cursor-pointer items-center gap-2 md:gap-3'
              >
                <input
                  id='agreePolicy'
                  type='checkbox'
                  disabled={postLoan.isPending || deleteCart.isPending}
                  onChange={() => setAgreePolicy((prev) => !prev)}
                  className='accent-primary-300 h-4 w-4 cursor-pointer'
                />
                <span className='text-sm-semibold md:text-md-semibold tracking-[-0.02em]'>
                  I accept the library borrowing policy.
                </span>
              </label>
            </div>

            {error && (
              <span className='text-md-semibold md:text-lg-semibold text-red-600'>
                {error}
              </span>
            )}

            <Button
              disabled={
                checkoutList.bookIds.length === 0 ||
                postLoan.isPending ||
                deleteCart.isPending ||
                !agreePolicy ||
                !agreeReturnBook
              }
              onClick={handleSubmit}
            >
              {postLoan.isPending || deleteCart.isPending ? (
                <LoadingSpinner />
              ) : (
                'Confirm & Borrow'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};
