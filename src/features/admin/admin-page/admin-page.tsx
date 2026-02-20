import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { useGetAdminLoans } from '@/hook/use-admin';
import { useSearchParams } from 'react-router-dom';
import type { Options } from './types';
import { VALID_TABS } from './constants';
import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import { Section } from '@/components/shared/section';
import { BorrowedList } from './components/borrowed-list';
import { UserList } from './components/user-list';
import { BookList } from './components/book-list';

export const AdminPage = () => {
  const { data, isPending, isError } = useGetAdminLoans({ status: 'all' });
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') as Options | null;
  const tab: Options = VALID_TABS.includes(tabParam!)
    ? tabParam!
    : 'borrowed-list';

  if (!data || isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <Section>
      <div className='flex flex-col gap-3.75 md:gap-7.5'>
        <Tabs defaultValue={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value='borrowed-list'>Borrowed List</TabsTrigger>
            <TabsTrigger value='user'>User</TabsTrigger>
            <TabsTrigger value='book-list'>Book List</TabsTrigger>
          </TabsList>

          <TabsContent value='borrowed-list'>
            <BorrowedList />
          </TabsContent>

          <TabsContent value='user'>
            <UserList />
          </TabsContent>

          <TabsContent value='book-list'>
            <BookList />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};
