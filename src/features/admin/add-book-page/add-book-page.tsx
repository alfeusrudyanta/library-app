import {
  BookForm,
  type BookFormErrors,
  type BookFormValues,
} from '@/components/shared/book-form';
import { Section } from '@/components/shared/section';
import { Button } from '@/components/ui/button';
import { usePostBook } from '@/hook/use-books';
import { ArrowLeft, ArrowUpToLine, CloudUpload, Trash } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postBookSchema } from './schema';

export const AddBookPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostBook();

  const [values, setValues] = useState<BookFormValues>({
    title: '',
    description: '',
    isbn: '',
    publishedYear: '',
    authorId: '',
    authorName: '',
    categoryId: '',
    totalCopies: '',
    availableCopies: '',
  });
  const [coverImageFile, setCoverImageFile] = useState<File | undefined>(
    undefined
  );
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<BookFormErrors>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { files: FileList | null } }
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = postBookSchema.safeParse({
      ...values,
      coverImageFile,
    });

    if (!result.success) {
      const fieldErrors: BookFormErrors = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof BookFormErrors;
        fieldErrors[key] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    const data = result.data;

    mutate(
      {
        title: data.title,
        isbn: data.isbn,
        description: data.description,
        categoryId: data.categoryId,
        publishedYear: Number(data.publishedYear),
        totalCopies: Number(data.totalCopies),
        availableCopies: Number(data.availableCopies),
        authorId: Number(data.authorId),
        coverImage: data.coverImageFile,
      },
      {
        onSuccess: () => {
          navigate('/admin');
        },
      }
    );
  };

  return (
    <Section>
      <div className='mx-auto w-full max-w-132.25'>
        <div className='flex flex-col gap-4'>
          <Link to='/admin'>
            <div className='flex items-center gap-1.5 md:gap-3'>
              <ArrowLeft className='size-6 cursor-pointer md:size-8' />
              <span className='md:display-xs-bold text-xl-bold tracking-[-0.02em] md:tracking-normal'>
                Add Book
              </span>
            </div>
          </Link>

          <BookForm
            values={values}
            onChange={setValues}
            isPending={isPending}
            errors={errors}
            onSubmit={handleSubmit}
          >
            {!image && (
              <div
                className='h-11xl relative flex flex-col items-center gap-4 rounded-xl border border-dotted border-neutral-300'
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleImageChange({
                    target: { files: e.dataTransfer.files },
                  });
                }}
              >
                <input
                  id='image'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-1 font-semibold'>
                  <div className='flex items-center justify-center rounded-md border border-neutral-300 p-2'>
                    <CloudUpload className='size-4' />
                  </div>

                  <span className='text-sm-semibold tracking-[-0.02em]'>
                    <span className='text-primary-300'>Click or drag</span> to
                    upload an image
                  </span>

                  <span className='text-sm-semibold tracking-[-0.02em]'>
                    PNG or JPG (max. 5mb)
                  </span>
                </div>
              </div>
            )}

            {image && (
              <div className='relative flex h-65 flex-col items-center gap-4 rounded-xl border border-dotted border-neutral-300 px-25 pt-4'>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  className='hidden'
                  onChange={handleImageChange}
                />

                <div className='absolute flex flex-col gap-3'>
                  <div className='h-11xl mx-auto w-25 overflow-hidden'>
                    <img
                      src={image ?? '/images/book-no-cover.jpg'}
                      alt='Image Preview'
                      onError={(e) =>
                        (e.currentTarget.src = '/images/book-no-cover.jpg')
                      }
                      className='size-full object-cover object-center'
                    />
                  </div>

                  <div className='flex flex-row justify-center gap-3'>
                    <Button
                      type='button'
                      variant='transparent'
                      onClick={handleTriggerFileInput}
                      className='bg-neutral-25 text-sm-medium h-10 flex-1 rounded-lg border border-neutral-300 px-3 hover:bg-neutral-50 md:h-10'
                    >
                      <ArrowUpToLine className='size-5' />
                      Change&nbsp;Image
                    </Button>

                    <Button
                      type='button'
                      onClick={handleRemoveImage}
                      className='bg-neutral-25 text-sm-medium h-10 flex-1 rounded-lg border border-neutral-300 px-3 text-[#D9206E]! hover:bg-red-50 md:h-10'
                    >
                      <Trash height={20} width={20} />
                      Delete&nbsp;Image
                    </Button>
                  </div>
                  <span className='text-center md:text-sm'>
                    PNG or JPG (max. 5mb)
                  </span>
                </div>
              </div>
            )}

            {errors.coverImageFile && (
              <span className='text-xs-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
                {errors.coverImageFile}
              </span>
            )}
          </BookForm>
        </div>
      </div>
    </Section>
  );
};
