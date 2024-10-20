import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { QueryProvider } from "@/providers/query-provider";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Recipify",
    template: `Recipify | %s`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased bg-zinc-900 text-white`}
      >
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
