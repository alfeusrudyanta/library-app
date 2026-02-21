import type { Options } from './types';
import { useSearchParams } from 'react-router-dom';
import { Section } from '@/components/shared/section';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Profile } from './components/profile';
import { BorrowedList } from './components/borrowed-list';
import { Reviews } from './components/reviews';
import { VALID_TABS } from './constant';
import { useGetMe } from '@/hook/use-me';
import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';

export const ProfilePage = () => {
  const { data, isPending, isError } = useGetMe();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') as Options | null;

  const tab: Options = VALID_TABS.includes(tabParam!) ? tabParam! : 'profile';

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
      <div className='flex flex-col gap-3.75 md:gap-6'>
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='borrowed-list'>Borrowed List</TabsTrigger>
            <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value='profile'>
            <Profile />
          </TabsContent>

          <TabsContent value='borrowed-list'>
            <BorrowedList />
          </TabsContent>

          <TabsContent value='reviews'>
            <Reviews />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};
