"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { queryClient } from "@/data/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Space_Grotesk as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ETHBerlin Schedule</title>
      </head>
      <body
        className={cn(
          "dark:dark min-h-screen bg-slate-100 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="mx-auto h-screen min-h-screen p-8 px-24">
              {children}
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
