import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { BookBriefCard } from '@/components/shared/book-brief-card';
import { Button } from '@/components/ui/button';
import { useGetBook, useGetBooksRecommended } from '@/hook/use-books';
import { useGetReviewsBook } from '@/hook/use-review';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ReviewCard } from './components/review-card';
import { BookInfo } from './components/book-info';
import { Section } from '@/components/shared/section';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

export const BookPage = () => {
  const { id } = useParams();

  const bookDetail = useGetBook(Number(id));
  const bookReview = useGetReviewsBook(Number(id));
  const bookRecommendation = useGetBooksRecommended({
    categoryId: bookDetail.data?.data.categoryId!,
    by: 'popular',
  });

  if (
    (!bookDetail.data && bookDetail.isPending) ||
    (!bookReview.data && bookReview.isPending) ||
    (!bookRecommendation.data && bookRecommendation.isPending)
  ) {
    return <LoadingPage />;
  }

  if (bookDetail.isError || bookRecommendation.isError || bookReview.isError) {
    return <ErrorPage />;
  }

  const handleLoadMore = () => {
    if (!bookReview.isFetchingNextPage && bookReview.hasNextPage) {
      bookReview.fetchNextPage();
    }
  };

  const bookReviewData =
    bookReview.data?.pages.flatMap((review) => review.data.reviews) ?? [];

  const relatedBooks =
    bookRecommendation.data?.pages
      .flatMap((page) => page.data.books)
      .filter((book) => book.id !== Number(id)) ?? [];

  return (
    <Section>
      <div className='flex flex-col gap-6 md:gap-16'>
        {/* Book Detail */}
        <BookInfo key={bookDetail.data.data.id} book={bookDetail.data.data} />

        {/* Line */}
        <div className='w-full border border-neutral-300' />

        {/* Review */}
        <div className='flex flex-col gap-4.5'>
          {/* Title */}
          <div className='flex flex-col gap-1 md:gap-3'>
            <span className='md:display-lg-bold display-xs-bold'>Review</span>

            <div className='flex items-center gap-1'>
              <Star className='size-6 fill-[#FFAB0D] stroke-0' />

              <span className='text-md-bold md:text-xl-bold tracking-[-0.02em] md:tracking-normal'>
                {bookDetail.data.data.rating.toFixed(1)} (
                {bookDetail.data.data.reviewCount} review
                {bookDetail.data.data.reviewCount > 1 && 's'})
              </span>
            </div>
          </div>

          {/* Review Card */}
          <div className='flex flex-col gap-4.5'>
            <div className='grid grid-cols-1 gap-x-5 gap-y-4.5 md:grid-cols-2'>
              {bookReviewData.map((review) => (
                <ReviewCard key={'review-' + review.id} review={review} />
              ))}
            </div>

            {bookReview.isFetchingNextPage && (
              <div className='col-span-1 flex items-center justify-center md:col-span-2'>
                <LoadingSpinner />
              </div>
            )}

            {bookReviewData.length === 0 && (
              <span className='text-md-semibold md:text-lg-semibold text-center text-neutral-600'>
                No reviews yet. Be the first to review this book.
              </span>
            )}
          </div>

          {/* Load More Button */}
          {bookReview.hasNextPage && (
            <Button
              onClick={handleLoadMore}
              variant='transparent'
              className='mx-auto h-10 max-w-50 md:h-12'
            >
              Load More
            </Button>
          )}
        </div>

        {/* Line */}
        <div className='w-full border border-neutral-300' />

        {/* Related Books */}
        <div className='flex flex-col gap-5 md:gap-10'>
          <span className='display-xs-bold md:display-lg-bold'>
            Related Books
          </span>

          <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5'>
            {relatedBooks.map((book) => (
              <BookBriefCard key={book.id} id={book.id} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
