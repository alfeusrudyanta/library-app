import { z } from 'zod';

export const postBookSchema = z.object({
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

  authorId: z.string().min(1, 'Author is required'),

  coverImageFile: z.instanceof(File).optional(),
});
