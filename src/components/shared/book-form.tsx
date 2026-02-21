import { useGetCategories } from '@/hook/use-categories';
import { Button } from '../ui/button';
import { FormLabel } from './form-label';
import { cn } from '@/lib/utils';
import { useGetAuthors } from '@/hook/use-author';
import { LoadingSpinner } from './loading-spinner';

export type BookFormValues = {
  title: string;
  description: string;
  isbn: string;
  publishedYear: string;
  authorId: string;
  authorName: string;
  categoryId: string;
  totalCopies: string;
  availableCopies: string;
};

export type BookFormErrors = Partial<
  BookFormValues & { coverImageFile: string }
>;

type BookFormProps = {
  values: BookFormValues;
  isPending?: boolean;
  onChange: (value: BookFormValues) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: BookFormErrors;
  children: React.ReactNode;
};

export const BookForm: React.FC<BookFormProps> = ({
  values,
  isPending = false,
  onChange,
  onSubmit,
  errors,
  children,
}) => {
  const categoriesQuery = useGetCategories();
  const authorsQuery = useGetAuthors();

  const categories = categoriesQuery.data?.data.categories ?? [];
  const authors = authorsQuery.data?.data.authors ?? [];

  const handleFieldChange =
    <K extends keyof BookFormValues>(key: K) =>
    (value: string) => {
      onChange({
        ...values,
        [key]: value,
      });
    };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...values,
      categoryId: e.target.value,
    });
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const authorId = e.target.value;
    const author = authors.find((a) => a.id === Number(authorId));

    onChange({
      ...values,
      authorId,
      authorName: author?.name ?? '',
    });
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <FormLabel
        name='Title'
        id='title'
        type='text'
        placeholder='Enter book name'
        value={values.title}
        disabled={isPending}
        onChange={handleFieldChange('title')}
        error={errors.title}
      />

      <FormLabel
        name='Description'
        id='description'
        type='text'
        placeholder='Enter book description'
        value={values.description}
        disabled={isPending}
        onChange={handleFieldChange('description')}
        error={errors.description}
      />

      <FormLabel
        name='ISBN'
        id='isbn'
        type='text'
        placeholder='Enter ISBN number'
        value={values.isbn}
        disabled={isPending}
        onChange={handleFieldChange('isbn')}
        error={errors.isbn}
      />

      <label className='flex w-full flex-col gap-0.5'>
        <span className='text-sm-bold tracking-[-0.02em]'>Category</span>

        <select
          id='categoryId'
          value={values.categoryId}
          disabled={isPending || categoriesQuery.isLoading}
          onChange={handleCategoryChange}
          className={cn(
            'text-sm-bold md:text-md-semibold w-full rounded-xl border border-neutral-300 px-4 py-2.25',
            errors.categoryId && 'border-accent-red'
          )}
        >
          <option value=''>Select category</option>

          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <span className='text-xs-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
            {errors.categoryId}
          </span>
        )}
      </label>

      <label className='flex w-full flex-col gap-0.5'>
        <span className='text-sm-bold tracking-[-0.02em]'>Author</span>

        <select
          id='authorId'
          value={values.authorId}
          disabled={isPending || authorsQuery.isLoading}
          onChange={handleAuthorChange}
          className={cn(
            'text-sm-bold md:text-md-semibold w-full rounded-xl border border-neutral-300 px-4 py-2.25',
            errors.authorId && 'border-accent-red'
          )}
        >
          <option value=''>Select author</option>

          {authors.map((author) => (
            <option key={author.id} value={String(author.id)}>
              {author.name}
            </option>
          ))}
        </select>

        {errors.authorId && (
          <span className='text-xs-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
            {errors.authorId}
          </span>
        )}
      </label>

      <FormLabel
        name='Published Year'
        id='publishedYear'
        type='text'
        placeholder='Enter published year'
        value={values.publishedYear}
        disabled={isPending}
        onChange={handleFieldChange('publishedYear')}
        error={errors.publishedYear}
      />

      <FormLabel
        name='Total Copies'
        id='totalCopies'
        type='number'
        placeholder='Enter total copies'
        value={values.totalCopies}
        disabled={isPending}
        onChange={handleFieldChange('totalCopies')}
        error={errors.totalCopies}
      />

      <FormLabel
        name='Available Copies'
        id='availableCopies'
        type='number'
        placeholder='Enter available copies'
        value={values.availableCopies}
        disabled={isPending}
        onChange={handleFieldChange('availableCopies')}
        error={errors.availableCopies}
      />

      {/* Cover Image */}
      {children}

      <Button type='submit'>{isPending ? <LoadingSpinner /> : 'Save'}</Button>
    </form>
  );
};
