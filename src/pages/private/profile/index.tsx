import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangePasswordFormValues, changePasswordSchema } from '@/shared/schema/register';
import { authService } from '@/shared/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Profile() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const { mutateAsync: resetPassword, isPending } = authService.useChangePassword();

  const onSubmit = (data: ChangePasswordFormValues) => {
    resetPassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              id="oldPassword"
              type={passwordVisible ? 'text' : 'password'}
              {...register('oldPassword')}
              required
            />
            {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-500 hover:text-gray-700">
              {passwordVisible ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={passwordVisible ? 'text' : 'password'}
              {...register('newPassword')}
              required
            />
            {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Change Password'}
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
}
