"use client";

import { signup } from "@/actions/auth";
import { UserRole } from "@/lib/models/roles";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-bold">
          Join Handcrafted Haven
        </p>

        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Create an account as a customer or seller.
        </p>
      </div>

      <form className="space-y-5" action={action}>
        {state && (
          <div
            role="alert"
            className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-700"
          >
            {state}
          </div>
        )}

        <label className="block text-sm font-medium text-slate-900">
          Full name
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="Your full name"
          />
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Account type
          <select
            name="role"
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
          >
            <option value={UserRole.Customer}>Customer</option>
            <option value={UserRole.Seller}>Seller</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Password
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="Create a password"
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
