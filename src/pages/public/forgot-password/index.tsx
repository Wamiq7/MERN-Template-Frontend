import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { forgotPwdSchema, ForgotPwdSchemaType } from '@/shared/schema/register';
import { authService } from '@/shared/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPwdSchemaType>({
    resolver: zodResolver(forgotPwdSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutateAsync: forgotPassword, isPending } = authService.useForgotPassword();

  const onSubmit = (data: ForgotPwdSchemaType) => {
    const formData = new FormData();
    formData.append('email', data.email);

    forgotPassword(formData.get('email') as string);
    reset();
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-sm space-y-6 px-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email so we can send you a reset password link.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required {...register('email')} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
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
