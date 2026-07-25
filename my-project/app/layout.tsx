import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A landing page for artisans",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
            <div className="font-heading text-3xl font-black tracking-tight text-bold-green sm:text-4xl">
              Handcrafted Haven
            </div>

            <nav>
              <ul className="flex flex-wrap items-center gap-3">
                <li>
                  <a href="#artists" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Artists
                  </a>
                </li>
                <li>
                  <a href="#products" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Product Listings
                  </a>
                </li>
                <li>
                  <a href="/login" className="rounded-full bg-bold-green px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-bold-green-dark">
                    Login
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}