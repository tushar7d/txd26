export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tushar Debnath",
    template: "%s — Tushar Debnath",
  },
  description: "Designer & developer crafting digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
