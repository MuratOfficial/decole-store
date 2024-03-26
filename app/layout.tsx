import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import { Toaster } from "react-hot-toast";

const baseUrl = "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "FURNITURA LUX KAMNI",
    template: `%s | FURNITURA LUX KAMNI`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Toaster />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
