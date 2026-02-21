import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { BookInfo } from '@/components/shared/book-info';
import { Section } from '@/components/shared/section';
import { useGetBook } from '@/hook/use-books';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const PreviewPage = () => {
  const { id } = useParams();
  const { data, isPending, isError } = useGetBook(Number(id));

  if (isPending && !data) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Section>
      <div className='flex flex-col gap-4 md:gap-8'>
        <Link to='/admin'>
          <div className='flex items-center gap-1.5 md:gap-3'>
            <ArrowLeft className='size-6 cursor-pointer md:size-8' />
            <span className='md:display-xs-bold text-xl-bold tracking-[-0.02em] md:tracking-normal'>
              Add Book
            </span>
          </div>
        </Link>

        <BookInfo key={data.data.id} book={data.data} />
      </div>
    </Section>
  );
};
