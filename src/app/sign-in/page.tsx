"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback") ?? "";

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      if (callbackUrl) {
        router.push(`/${callbackUrl}`);
      } else {
        router.push("/dashboard");
      }
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-none pb-0 shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-1.5 pt-6 pb-4">
            <div className="flex flex-col items-center space-y-0.5">
              <h2 className="text-balance font-semibold text-2xl text-foreground">
                Sign in
              </h2>
              <p className="text-pretty text-muted-foreground">
                Welcome back! Sign in to your account.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    className="pr-10"
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox name="keepsignedin" />
                <label
                  className="text-muted-foreground text-sm"
                  htmlFor="terms"
                >
                  Keep me signed in.
                </label>
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground cursor-pointer"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4!">
            <p className="text-pretty text-center text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Link className="text-primary hover:underline" href={"/sign-up"}>
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
