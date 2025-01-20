import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/shared/services/auth.service';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function VerifyOtpPage() {
  const { mail } = useParams();
  const { toast } = useToast();

  const [otpValue, setOtpValue] = useState<string>('');

  const { mutateAsync: verifyOtp, isPending } = authService.useVerifyOtp();

  const onSubmit = () => {
    if (!mail) {
      toast({
        variant: 'destructive',
        title: 'Email not found',
      });
      return;
    }

    if (otpValue.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid 6-digit OTP.',
      });
      return;
    }

    verifyOtp({
      email: mail,
      otp: otpValue,
    });
  };

  return (
    <PageWrapper>
      <div className="mx-auto w-full max-w-sm space-y-6 px-4">
        <h1 className="text-3xl font-bold">Verify OTP</h1>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="password">Enter your six digits OTP code.</Label>
              <InputOTP maxLength={6} value={otpValue} onChange={(value) => setOtpValue(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
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
