import Footer from "@/components/layouts/footer";
import Collections from "@/components/collections";
import FilterList from "@/components/filter";
import { Suspense } from "react";
import AdminList from "../components/admin-list";
import { signOut } from "next-auth/react";
import LogOut from "../components/log-out";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      id: "/admin/products",
      name: "Продукты",
    },
    {
      id: "/admin/collections",
      name: "Коллекции",
    },
    {
      id: "/admin/users",
      name: "Пользователи",
    },
  ];

  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <AdminList list={links} title="Панель управления" />
          <LogOut />
        </div>
        <div className="order-last min-h-screen w-full md:order-none rounded-md w-full border bg-white">
          {children}
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]"></div>
      </div>
      <Footer />
    </Suspense>
  );
}
