import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

const profileSchema = z.object({
  name: z.string().min(3, { error: 'Name must be at least 3 characters' }),
  phone: z
    .string()
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^\+?\d+$/, 'Phone number must contain only digits'),
  profilePhoto: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Max image size is 5MB'
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPEG, PNG, GIF, or WebP images are allowed'
    ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export { profileSchema, type ProfileFormData };
