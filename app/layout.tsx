import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/**
 * Root Layout — wraps EVERY page in the app.
 *
 * This is the top-level component in Next.js App Router. Whatever we
 * put here (Header, Footer) will appear on all pages automatically.
 * The {children} prop is where each page's content gets inserted.
 *
 * The @/ import alias maps to the project root (configured in tsconfig.json),
 * so @/components/Header means "components/Header.tsx at the project root".
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beyond Disability Club",
  description:
    "The Beyond Disability Club empowers students by connecting them with essential services, fostering skill development, and promoting active community engagement at Gulf Coast State College.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
