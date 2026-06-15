import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { LightboxProvider } from "./components/Lightbox";
import { NavLinks } from "./components/NavLinks";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Film35",
  description: "A film photography memoir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-[#ededed]">
        <LightboxProvider>
          <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-10 py-5 bg-black">
            <Link
              href="/"
              className="font-[family-name:var(--font-cormorant)] text-xl text-white"
            >
              Film35
            </Link>
            <NavLinks />
          </header>
          <main className="flex-1 pt-[69px]">{children}</main>
          <footer className="py-8 text-center text-zinc-600 text-xs tracking-wider">
            &copy; Arjun Acharya 2026
          </footer>
        </LightboxProvider>
      </body>
    </html>
  );
}
