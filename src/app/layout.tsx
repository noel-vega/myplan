"use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { RoutineListProvider } from "./providers/routine-list";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

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
        <nav className="border-b">
          <ul className="flex text-lg max-w-3xl mx-auto w-full">
            <NavLink name="Lists" href="/lists" />
            <NavLink name="Notes" href="/notes" />
          </ul>
        </nav>

        <QueryClientProvider client={queryClient}>
          <RoutineListProvider>
            <div className="flex-1">{children}</div>
          </RoutineListProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

function NavLink({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <Link href={href} className="py-4 px-3  block">
        {name}
      </Link>
    </li>
  );
}
