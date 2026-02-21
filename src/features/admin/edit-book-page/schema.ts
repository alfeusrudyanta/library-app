import { z } from 'zod';

export const editBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Category is required'),

  publishedYear: z
    .string()
    .regex(/^\d{4}$/, 'Published year must be a valid year'),

  totalCopies: z.string().regex(/^\d+$/, 'Total copies must be a number'),
  availableCopies: z
    .string()
    .regex(/^\d+$/, 'Available copies must be a number'),

  authorName: z.string().min(1, 'Author name is required'),
  authorId: z.string(),
  coverImage: z.string().min(1, 'Cover image is required'),

  coverImageFile: z.instanceof(File).optional(),
});
