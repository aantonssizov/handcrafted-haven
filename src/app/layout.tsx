import type { Metadata } from "next";
import "./globals.css";
import { heading, inter } from "./fonts";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/session";

const siteDescription =
  "A marketplace connecting artisans and crafters with customers who value unique, handmade goods.";

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description: siteDescription,
  openGraph: {
    title: "Handcrafted Haven",
    description: siteDescription,
    siteName: "Handcrafted Haven",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isLoggedIn = session?.userId !== undefined;

  return (
    <html lang="en">
      <body
        className={`min-h-full flex flex-col ${inter.className} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-green-bold"
        >
          Skip to main content
        </a>

        <header className="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-between md:gap-6">
          <Link
            href="/"
            className="logo flex items-center gap-3 transition hover:opacity-80"
          >
            <Image
              className="h-auto"
              alt=""
              src="/images/logo.webp"
              width={64}
              height={64}
              loading="eager"
            />
            <span
              className={`title text-2xl font-black text-[#1B5E20] md:text-[32px] ${heading.className}`}
            >
              Handcrafted Haven
            </span>
          </Link>

          <nav className="rounded-[5px] border border-[#A5D6A7] bg-[#A5D6A7]/10 px-4 py-3">
            <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-950">
              <li>
                <Link
                  href="/artists"
                  className="font-sans font-semibold text-slate-950"
                >
                  Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="font-sans font-semibold text-slate-950"
                >
                  Product Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/seller"
                  className="font-sans font-semibold text-slate-950"
                >
                  Seller Profile
                </Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link
                    href="/dashboard"
                    className="font-sans font-semibold text-slate-950"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={isLoggedIn ? "/logout" : "/login"}
                  className="font-sans font-semibold text-slate-950"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div id="main-content" tabIndex={-1}>
          {children}
        </div>

        <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-sm text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; Handcrafted Haven. Supporting local artisans.</p>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-4">
                <li>
                  <Link href="/products" className="hover:text-gold-soft">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/artists" className="hover:text-gold-soft">
                    Artists
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-gold-soft">
                    Create account
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
