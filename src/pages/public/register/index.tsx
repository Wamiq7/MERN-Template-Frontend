import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChromeIcon } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="mt-10 mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email and password to sign up.
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <Separator className="my-8" />
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
