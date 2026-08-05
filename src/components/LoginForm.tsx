"use client";

import { login } from "../actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-bold">
          Member login
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-slate-900">
          Sign in to your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to your Handcrafted Haven account.
        </p>
      </div>

      <form className="space-y-5" action={action}>
        <label className="block text-sm font-medium text-slate-900">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Password
          <input
            type="password"
            name="password"
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="Enter password"
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft"
        >
          Sign in
        </button>
      </form>

      {state && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {state}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-700">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-bold hover:text-green-soft"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
