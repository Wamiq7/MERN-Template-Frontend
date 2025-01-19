import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { registerSchema, RegisterSchemaType } from "@/shared/schema/register";
import { authService } from "@/shared/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChromeIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const { mutateAsync: loginUser, isPending } = authService.useLogin();

  const onSubmit = (data: RegisterSchemaType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    loginUser({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-sm space-y-6 px-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in to your account.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-500 hover:text-gray-700"
              >
                {passwordVisible ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <Separator className="my-8" />
          <div className="space-y-4">
            <a href={`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`}>
              <Button variant="outline" className="w-full">
                <ChromeIcon className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </a>
          </div>
          <Separator className="my-8" />
          <div className="space-y-4">
            <Link to={"/register"}>
              <Button variant="link" className="w-full">
                Already have an account ? Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
