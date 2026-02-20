import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { BookInfo } from '@/components/shared/book-info';
import { Section } from '@/components/shared/section';
import { useGetBook } from '@/hook/use-books';
import { useParams } from 'react-router-dom';

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
      <BookInfo key={data.data.id} book={data.data} />
    </Section>
  );
};
