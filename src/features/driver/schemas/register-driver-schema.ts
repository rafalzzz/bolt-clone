import { z } from 'zod';

export const registerDriverSchema = z.object({
  avatar: z
    .string()
    .url()
    .startsWith('https://sessionize.com', 'Avatar URL must be from sessionize.com')
    .or(z.literal(''))
    .nullable(),
  first: z.string().nullable(),
  last: z.string().nullable(),
  notes: z.string().nullable(),
  twitter: z
    .string()
    .startsWith('@', 'Twitter handle must start with @')
    .or(z.literal(''))
    .nullable(),
});
