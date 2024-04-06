"use client";
import * as React from "react";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setIsLoading(true);

    try {
      // Call your API to handle authentication
      await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/admin",
      });
      router.push("/admin");
    } catch (error) {
      // Handle error, show error message, or update UI as needed
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="furnitura@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Пароль
            </Label>
            <Input
              id="password"
              placeholder="Введите пароль"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading} className="bg-slate-900">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Авторизоваться через Email
          </Button>
        </div>
      </form>
    </div>
  );
}
