"use client";

import { signup } from "@/actions/auth";
import { UserRole } from "@/lib/models/roles";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-soft">
          Join Handcrafted Haven
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Create your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Create an account as a customer or seller.
        </p>
      </div>

      <form className="space-y-5" action={action}>
        {state && (
          <p className="mt-3 text-sm leading-6 text-slate-300">{state}</p>
        )}

        <label className="block text-sm font-medium text-slate-200">
          Full name
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Your full name"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Account type
          <select
            name="role"
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
          >
            <option value={UserRole.Customer}>Customer</option>
            <option value={UserRole.Seller}>Seller</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Password
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
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
