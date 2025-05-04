import type { Metadata } from "next";
import { Inter } from 'next/font/google'; import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' }); // Use Inter font


export const metadata: Metadata = {
  title: "WordPlay - Guess the Word Game",
  description: "A classic hangman-style word guessing game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
