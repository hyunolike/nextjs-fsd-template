import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/core/styles/globals.css";
import { AppProviders } from "@/core/providers/app-providers";
import { Header } from "@/widgets/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js FSD Template",
  description: "A Next.js template using Feature-Sliced Design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-neutral-50">
        <AppProviders>
          <Header />
          <main className="flex flex-1 flex-col items-center px-6 py-12">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
