import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { BookBriefCard } from '@/components/shared/book-brief-card';
import { Section } from '@/components/shared/section';
import { useGetBooks } from '@/hook/use-books';
import { useGetCategories } from '@/hook/use-categories';
import { cn } from '@/lib/utils';
import { ListFilter, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { useIsMobile } from '@/hook/use-is-mobile';

export const CategoryPage = () => {
  const bookCategories = useGetCategories();
  const isMobile = useIsMobile();

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const { ref, inView } = useInView();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') ?? '';
  const [q, setQ] = useState<string>('');

  const booksQuery = useGetBooks({
    q,
    categoryId,
    minRating,
  });

  useEffect(() => {
    setQ(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!isMobile) {
      setIsFilterOpen(true);
    } else {
      setIsFilterOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (inView && !booksQuery.isFetchingNextPage && booksQuery.hasNextPage) {
      booksQuery.fetchNextPage();
    }
  }, [
    inView,
    booksQuery.isFetchingNextPage,
    booksQuery.hasNextPage,
    booksQuery.fetchNextPage,
  ]);

  if (!bookCategories.data && bookCategories.isPending) {
    return <LoadingPage />;
  }

  if (bookCategories.isError || booksQuery.isError) {
    return <ErrorPage />;
  }

  const books = booksQuery.data?.pages.flatMap((page) => page.data.books) ?? [];

  return (
    <Section>
      <div className='flex flex-col gap-4 md:gap-8'>
        <span className='display-xs-bold md:display-lg-bold'>Book List</span>

        <div className='flex flex-col items-start gap-10 md:flex-row md:gap-6'>
          {/* Filter */}
          <div className='flex w-full flex-col rounded-xl p-3 shadow-[0_0_20px_0_#CBCACA40] md:max-w-67.5 md:flex-row md:gap-10 md:p-4'>
            {/* Mobile Filter */}
            <div className='flex h-13 items-center justify-between md:hidden'>
              <span className='text-sm-extrabold'>FILTER</span>

              <ListFilter
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className={cn(
                  'size-5 transition-all',
                  isFilterOpen && 'rotate-180'
                )}
              />
            </div>

            {isFilterOpen && (
              <div className='flex w-full flex-col gap-4 md:gap-6'>
                {/* Desktop Filter */}
                <span className='md:text-md-extrabold hidden md:block'>
                  FILTER
                </span>

                {/* Filter Content */}
                <div className='flex flex-col gap-2.5'>
                  <span className='text-md-extrabold md:text-lg-extrabold tracking-[-0.02em]'>
                    Category
                  </span>

                  <div className='flex flex-col gap-2.5'>
                    {bookCategories.data.data.categories.map((category) => (
                      <label
                        key={category.id}
                        htmlFor={category.name}
                        className='flex cursor-pointer items-center gap-2'
                      >
                        <input
                          id={category.name}
                          type='checkbox'
                          name='category'
                          value={category.id}
                          checked={categoryId === category.id}
                          onChange={() =>
                            setCategoryId(
                              categoryId === Number(category.id)
                                ? undefined
                                : Number(category.id)
                            )
                          }
                          className='accent-primary-300 h-5 w-5 cursor-pointer rounded-sm border border-neutral-400'
                        />

                        <span className='md:text-md-medium text-sm-medium tracking-[-0.03em]'>
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className='w-full border border-neutral-300' />

                <div className='flex flex-col gap-2.5'>
                  <span className='text-md-extrabold md:text-lg-extrabold tracking-[-0.02em]'>
                    Rating
                  </span>

                  <div className='flex flex-col gap-2'>
                    {[5, 4, 3, 2, 1].map((value) => (
                      <label
                        key={value}
                        htmlFor={String(value)}
                        className='flex cursor-pointer items-center gap-2'
                      >
                        <input
                          id={String(value)}
                          type='checkbox'
                          checked={minRating === value}
                          onChange={() =>
                            setMinRating(
                              minRating === value ? undefined : value
                            )
                          }
                          className='accent-primary-300 h-5 w-5 cursor-pointer rounded-sm border border-neutral-400'
                        />

                        <div className='flex items-center gap-0.5'>
                          <Star className='size-6 fill-[#FFAB0D] stroke-0' />

                          <span className='text-sm-regular md:text-md-regular tracking-[-0.02em]'>
                            {value}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Books */}
          <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
            {books?.map((book) => (
              <BookBriefCard key={book.id} id={book.id} />
            ))}

            {!booksQuery.isPending && books.length === 0 && (
              <div className='col-span-2 text-center md:col-span-4'>
                <span className='text-md-semibold md:text-lg-semibold text-center text-neutral-600'>
                  No books match your filters.
                </span>
              </div>
            )}

            <div ref={ref} />

            {booksQuery.isFetchingNextPage && (
              <div className='col-span-2 flex items-center justify-center md:col-span-4'>
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};
