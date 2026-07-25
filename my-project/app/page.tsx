import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-10">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            Handcrafted Haven
          </p>
          <h1 className="font-heading text-[32px] font-black leading-tight text-green-soft sm:text-5xl">
            Crafted for artisans who want a welcoming home online.
          </h1>
          <p className="font-body text-base leading-8 text-slate-600 max-w-2xl">
            Showcase your work, connect with your community, and build a beautiful handmade storefront with a calm, crafted marketing landing page.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-bold-green px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-bold-green-dark"
            >
              Login
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-bold-green hover:text-bold-green"
            >
              Learn more
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
