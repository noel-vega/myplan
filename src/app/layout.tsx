"use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { RoutineListProvider } from "./providers/routine-list";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { PropsWithChildren } from "react";
import { HomeIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "My Plan",
//   description: "Productivity app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased h-dvh flex flex-col`}>
        <nav className="border-b hidden sm:block">
          <ul className="flex text-lg max-w-3xl mx-auto w-full">
            <NavLink href="/" className="py-2">
              Home
            </NavLink>
          </ul>
        </nav>

        <QueryClientProvider client={queryClient}>
          <RoutineListProvider>
            <div className="flex-1">{children}</div>
          </RoutineListProvider>
        </QueryClientProvider>

        <nav className="border-t sm:hidden">
          <ul className="flex text-lg max-w-3xl mx-auto w-full">
            <NavLink
              href="/"
              className="flex items-center justify-center w-full py-4"
            >
              <HomeIcon size={20} />
            </NavLink>
            {/* <NavLink name="Notes" href="/notes" /> */}
          </ul>
        </nav>
      </body>
    </html>
  );
}

function NavLink({
  children,
  href,
  className,
}: { href: string; className?: string } & PropsWithChildren) {
  return (
    <li className="w-full">
      <Link href={href} className={cn("px-3  block", className)}>
        {children}
      </Link>
    </li>
  );
}
