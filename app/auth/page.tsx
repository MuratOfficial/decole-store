import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/user-auth-form";

export const metadata: Metadata = {
  title: "Aвторизация",
  description: "Форма авторизации",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative h-screen  items-center justify-center md:flex lg:max-w-none  lg:px-0">
        <div className="lg:p-8 lg:col-span-1 bg-no-repeat bg-bottom bg-contain h-full py-24 px-12">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Войти в систему
              </h1>
              <p className="text-sm text-muted-foreground">
                Введите свою почту чтобы войти в систему
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
