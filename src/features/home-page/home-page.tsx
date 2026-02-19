import { Section } from '@/components/shared/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleDot } from 'lucide-react';
import { useState } from 'react';
import { ImageSrc, GenreMenu } from './constant';
import { Link } from 'react-router-dom';
import { useGetBooksRecommended } from '@/hook/use-books';
import { useGetAuthorsPopular } from '@/hook/use-author';
import { LoadingPage } from '@/components/page/loading-page';
import { ErrorPage } from '@/components/page/error-page';
import { BookBriefCard } from '@/components/shared/book-brief-card';
import { AuthorCard } from './components/author-card';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

export const HomePage = () => {
  const recommendedBooksQuery = useGetBooksRecommended({ by: 'popular' });
  const popularAuthors = useGetAuthorsPopular();

  const [imageIndex, setImageIndex] = useState<number>(0);

  const initialLoad =
    (recommendedBooksQuery.isPending && !recommendedBooksQuery.data) ||
    (popularAuthors.isPending && !popularAuthors.data);

  const isError = recommendedBooksQuery.isError || popularAuthors.isError;

  if (initialLoad) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const handleLoadMore = () => {
    if (
      !recommendedBooksQuery.isFetchingNextPage &&
      recommendedBooksQuery.hasNextPage
    ) {
      recommendedBooksQuery.fetchNextPage();
    }
  };

  const popularAuthorsData = popularAuthors.data?.data.authors ?? [];

  const recommendedBooksQueryData =
    recommendedBooksQuery.data?.pages.flatMap((page) => page.data.books) ?? [];

  return (
    <Section>
      <div className='flex flex-col gap-6 md:gap-12'>
        {/* Image */}
        <div className='flex flex-col items-center gap-2.5 md:gap-4'>
          <img
            src={ImageSrc[imageIndex]}
            alt='Welcome to Booky'
            className='w-full'
          />

          <div className='flex gap-1 md:gap-1.5'>
            {ImageSrc.map((_, index) => (
              <CircleDot
                key={'image ' + index}
                onClick={() => setImageIndex(index)}
                className={cn(
                  'size-1.5 cursor-pointer transition-all md:size-2.5',
                  index === imageIndex ? 'fill-primary-300' : 'text-neutral-300'
                )}
              />
            ))}
          </div>
        </div>

        {/* Genre List */}
        <div className='grid grid-cols-3 items-center gap-3 md:grid-cols-6 md:gap-4'>
          {GenreMenu.map((genre) => (
            <Link to='/category' key={genre.name} className='group h-full'>
              <div className='flex h-full flex-col gap-3 rounded-2xl bg-white p-2 shadow-[0_0_20px_0_#CBCACA40] transition-all md:p-3'>
                <div className='flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#E0ECFF] p-1.5'>
                  <img
                    src={genre.link}
                    alt={genre.name}
                    className='size-11 md:size-13'
                  />
                </div>

                <span className='text-xs-semibold md:text-md-semibold group-hover:text-primary-300 tracking-[-0.02em]'>
                  {genre.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Recommendation */}
        <div className='flex flex-col gap-5 md:gap-10'>
          <span className='display-xs-bold md:display-lg-bold'>
            Recommendation
          </span>

          <div className='grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5'>
            {recommendedBooksQueryData.map((book) => (
              <BookBriefCard key={'book-' + book.id} id={book.id} />
            ))}
          </div>

          {recommendedBooksQuery.isFetchingNextPage && (
            <div className='col-span-2 flex items-center justify-center sm:col-span-3 md:col-span-5'>
              <LoadingSpinner />
            </div>
          )}

          {/* Load More Button */}
          {recommendedBooksQuery.hasNextPage && (
            <div className='flex w-full items-center justify-center'>
              <Button
                onClick={handleLoadMore}
                disabled={recommendedBooksQuery.isFetchingNextPage}
                variant='transparent'
                className='mx-auto h-10 max-w-50 md:h-12'
              >
                Load More
              </Button>
            </div>
          )}
        </div>

        {/* Authors */}
        <div className='flex flex-col gap-6 md:gap-10'>
          <span className='display-xs-bold md:display-lg-bold'>Authors</span>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5'>
            {popularAuthorsData.map((author) => (
              <AuthorCard key={'author-' + author.id} author={author} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
