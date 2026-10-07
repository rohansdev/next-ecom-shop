"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await signUp.email({
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      if (res.error) {
        setError(res.error.message || "Something went wrong.");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-none pb-0 shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-1.5 pt-6 pb-4">
            <div className="flex flex-col items-center space-y-0.5">
              <h2 className="text-balance font-semibold text-2xl text-foreground">
                Create an account
              </h2>
              <p className="text-pretty text-muted-foreground">
                Welcome! Create an account to get started.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input name="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input name="username" required />
              </div>

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
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox name="terms" />
                <label
                  className="text-muted-foreground text-sm"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <Link className="text-primary hover:underline" href="#">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link className="text-primary hover:underline" href="#">
                    Conditions
                  </Link>
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
                Create free account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-4!">
            <p className="text-pretty text-center text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link className="text-primary hover:underline" href={"/sign-in"}>
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
