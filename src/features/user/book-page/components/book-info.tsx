import { Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { BookDetail, Review } from '@/types/api';
import {
  useDeleteCartItem,
  useGetCart,
  usePostCartItem,
} from '@/hook/use-cart';
import { useGetMeLoans } from '@/hook/use-me';
import { useDispatch } from 'react-redux';
import { setCheckout } from '@/store/slices/checkout-slice';

type BookCardProps = {
  book: BookDetail & {
    reviews: Review[];
  };
};

export const BookInfo: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const bookLoansQuery = useGetMeLoans();
  const addToCart = usePostCartItem();
  const removeFromCart = useDeleteCartItem();
  const cartItem = useGetCart();
  const dispatch = useDispatch();

  const inCart = cartItem.data?.data.items.some((i) => i.bookId === book.id);
  const cartItemId =
    cartItem.data?.data.items.find((i) => i.bookId === book.id)?.id ?? 0;

  const handleCart = () => {
    if (addToCart.isPending || removeFromCart.isPending) return;

    if (inCart && cartItemId) {
      removeFromCart.mutate(cartItemId);
      return;
    }

    addToCart.mutate({ bookId: book.id });
  };

  const handleBorrow = () => {
    dispatch(setCheckout({ bookIds: [book.id] }));
    navigate('/checkout');
  };

  const imgSrc = book.coverImage || '/images/book-no-cover.jpg';
  const inLoan =
    bookLoansQuery.data?.pages.some((page) =>
      page.data.loans.some(
        (loan) => loan.bookId === book.id && loan.status === 'BORROWED'
      )
    ) ?? false;

  return (
    <div className='flex flex-col justify-center gap-9 md:flex-row md:justify-start'>
      {/* Image */}
      <div className='mx-auto w-full max-w-62.5 md:max-w-82.5'>
        <img
          src={imgSrc}
          alt={book.title}
          loading='lazy'
          onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
          className='mx-auto size-full md:mx-0'
        />
      </div>

      {/* Details */}
      <div className='flex flex-1 flex-col gap-3 md:gap-5'>
        <div className='flex flex-col items-start gap-0.5 md:gap-1'>
          <span className='text-sm-bold rounded-sm border border-neutral-300 px-2 tracking-[-0.02em]'>
            {book.category.name}
          </span>

          <span className='display-xs-bold md:display-sm-bold md:text-display-sm md:tracking-[-0.02em]'>
            {book.title}
          </span>

          <Link to={`/author/${book.authorId}`}>
            <span className='text-neutral-700'>{book.author.name}</span>
          </Link>

          <div className='flex items-center gap-0.5'>
            <Star fill='#FFAB0D' stroke='none' className='size-6' />

            <span className='text-md-bold tracking-[-0.02em] text-neutral-900'>
              {book.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Rating Details */}
        <div className='flex items-center gap-5'>
          <div className='flex w-full flex-col md:w-25.5'>
            <span className='text-lg-bold md:display-xs-bold tracking-[-0.03em] md:tracking-normal'>
              320
            </span>

            <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
              Page
            </span>
          </div>

          <div className='h-full border border-neutral-300' />

          <div className='flex w-full flex-col md:w-25.5'>
            <span className='text-lg-bold md:display-xs-bold tracking-[-0.03em] md:tracking-normal'>
              {book.rating.toFixed(1)}
            </span>
            <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
              Rating
            </span>
          </div>

          <div className='h-full border border-neutral-300' />

          <div className='flex w-full flex-col md:w-25.5'>
            <span className='text-lg-bold md:display-xs-bold tracking-[-0.03em] md:tracking-normal'>
              {book.reviewCount}
            </span>
            <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
              Reviews
            </span>
          </div>
        </div>

        {/* Line */}
        <div className='w-full max-w-140 border border-neutral-300' />

        <div className='flex flex-col gap-1'>
          <span className='text-xl-bold tracking-[-0.02em]'>Description</span>

          <span className='text-sm-medium md:text-md-medium tracking-[-0.03em]'>
            {book.description}
          </span>
        </div>

        {/* Cart */}
        <div className='fixed bottom-0 left-0 flex w-full items-center justify-center gap-3 border-none bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:static md:justify-start md:p-0 md:shadow-none'>
          <Button
            onClick={handleCart}
            disabled={
              addToCart.isPending ||
              removeFromCart.isPending ||
              book.availableCopies === 0 ||
              inLoan
            }
            variant='transparent'
            className='h-10 max-w-50 flex-1 md:h-12'
          >
            {inCart ? 'Remove Book' : 'Add to Cart'}
          </Button>

          <Button
            onClick={handleBorrow}
            disabled={book.availableCopies === 0 || inLoan}
            className='h-10 max-w-50 flex-1 md:h-12'
          >
            Borrow&nbsp;Book
          </Button>
        </div>
      </div>
    </div>
  );
};
