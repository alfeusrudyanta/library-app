import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { BookBriefCard } from '@/components/shared/book-brief-card';
import { useGetAuthorBooks } from '@/hook/use-author';
import { useParams } from 'react-router-dom';
import { AuthorData } from './components/author-data';
import { Section } from '@/components/shared/section';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { useEffect } from 'react';

export const AuthorPage = () => {
  const { id } = useParams();
  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetAuthorBooks(Number(id));
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const initialLoad = isPending && !data;

  if (initialLoad) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const authorBooksQuery = data.pages.flatMap((page) => page.data.books) ?? [];

  return (
    <Section>
      <div className='flex flex-col gap-4 md:gap-10'>
        <AuthorData id={Number(id)} />

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5'>
          {authorBooksQuery.map((book) => (
            <BookBriefCard key={book.id} id={book.id} />
          ))}

          <div ref={ref} />

          {isFetchingNextPage && (
            <div className='col-span-2 flex items-center justify-center sm:col-span-3 md:col-span-5'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
