import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/header/header.component";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Crypty",
  description: "Cryptocurrency tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.className} flex flex-col items-center h-full w-full justify-center antialiased`}
      >
        <Header />
        <div className="max-width px-4 lg:pt-10 pt-4">{children}</div>
      </body>
    </html>
  );
}
