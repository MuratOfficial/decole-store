import Cart from "components/cart";
import OpenCart from "components/cart/open-cart";
import LogoSquare from "components/logo-square";
import { Menu } from "lib/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search from "./search";

export default function Navbar() {
  const menu = [
    {
      id: "1",
      title: "Home",
      path: "/home",
      type: "link",
      children: [],
    },
    {
      id: "2",
      title: "Products",
      path: "/products",
      type: "dropdown",
      children: [
        {
          id: "2-1",
          title: "Electronics",
          path: "/products/electronics",
          type: "link",
          children: [],
        },
        {
          id: "2-2",
          title: "Clothing",
          path: "/products/clothing",
          type: "link",
          children: [],
        },
      ],
    },
    {
      id: "3",
      title: "About Us",
      path: "/about",
      type: "link",
      children: [],
    },
    {
      id: "4",
      title: "Contact",
      path: "/contact",
      type: "link",
      children: [],
    },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-4/6">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/6">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/6">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
