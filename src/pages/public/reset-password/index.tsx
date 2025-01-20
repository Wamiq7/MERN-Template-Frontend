import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ResetPasswordFormValues, resetPasswordSchema } from '@/shared/schema/register';
import { authService } from '@/shared/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { token } = useParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const { mutateAsync: resetPassword, isPending } = authService.useResetPassword();

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Token not found',
      });
      return;
    }

    resetPassword({
      token,
      newPassword: data.password,
    });
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-sm space-y-6 px-4">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type={passwordVisible ? 'text' : 'password'} {...register('password')} required />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <button type="button" onClick={togglePasswordVisibility} className="text-gray-500 hover:text-gray-700">
                {passwordVisible ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={passwordVisible ? 'text' : 'password'}
                {...register('confirmPassword')}
                required
              />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Reset Password'}
            </Button>
          </form>
          <Separator className="my-8" />
          <Link to={'/'}>
            <Button variant="link" className="w-full">
              Go back to Sign in
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
