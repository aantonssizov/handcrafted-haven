"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`Ready to login with ${email}. This is a frontend-only demo.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-soft">
          Member login
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Sign in to your account
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Use this frontend-only form to preview how login will feel on the landing page.
        </p>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-gold-soft hover:bg-slate-900"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
            G
          </span>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-200">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-gold-bold focus:ring-2 focus:ring-gold-soft/30"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-gold-bold focus:ring-2 focus:ring-gold-soft/30"
            placeholder="Enter password"
          />
        </label>

        <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-900 text-gold-bold focus:ring-gold-soft"
            />
            Remember me
          </label>
          <button type="button" className="text-gold-soft hover:text-gold-bold">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft"
        >
          Sign in
        </button>
      </form>

      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 text-center text-sm text-slate-300">
        <p>
          Don&apos;t have an account?{' '}
          <button type="button" className="font-semibold text-gold-soft hover:text-gold-bold">
            Create account
          </button>
        </p>
      </div>

      {message ? (
        <div className="rounded-3xl border border-green-soft/20 bg-green-soft/10 p-4 text-sm text-green-soft">
          {message}
        </div>
      ) : null}
    </div>
  );
}
