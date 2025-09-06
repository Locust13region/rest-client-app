import z from 'zod';

export const formSchema = z.object({
  email: z.email({ error: 'Enter valid email' }),
  password: z
    .string()
    .min(8, { error: 'Must be at least 8 characters' })
    .refine((value) => /[a-z]/.test(value), {
      error: 'Add one lowercase',
    })
    .refine((value) => /[A-Z]/.test(value), {
      error: 'Add one uppercase',
    })
    .refine((value) => /\d/.test(value), {
      error: 'Add one number',
    })
    .refine((value) => /[!@#$%^&*+-]/.test(value), {
      error: 'Add one special character ',
    }),
});
export type FormData = z.infer<typeof formSchema>;
