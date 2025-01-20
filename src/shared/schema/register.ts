import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const forgotPwdSchema = z.object({
  email: z.string().trim().email(),
});

export type ForgotPwdSchemaType = z.infer<typeof forgotPwdSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
