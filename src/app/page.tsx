import { amarna } from "./fonts";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(219,180,44,0.12),transparent_36%),linear-gradient(to_bottom,_#0f172a,_#020617)] text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-2xl space-y-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.32em] text-gold-soft">Handcrafted Haven</p>
            <h1 className={`mt-6 text-5xl font-black tracking-tight text-gold-bold sm:text-6xl ${amarna.className}`}>
              Crafted for artisans who want a welcoming home online.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Showcase your work, connect with your community, and sign in with a friendly frontend login experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Design-led landing</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A calm, crafted aesthetic built with Next.js and Tailwind v4.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-green-soft/20 bg-green-soft/10 p-6">
              <p className="text-sm font-semibold text-green-bold">Frontend-only demo</p>
              <p className="mt-3 text-sm leading-6 text-slate-950">
                The login form is interactive in the browser only, with no backend wired yet.
              </p>
            </div>
          </div>
        </section>

        <aside className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <LoginForm />
        </aside>
      </div>
    </main>
  );
}
