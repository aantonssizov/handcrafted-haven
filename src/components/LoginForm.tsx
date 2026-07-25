"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/auth/auth-context";
import { UserRole } from "../lib/auth/roles";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage(null);
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const user = {
      id: "demo-user-1",
      name: "Demo User",
      email,
      role,
    };

    const demoAccessToken = "demo-access-token";

    login(user, demoAccessToken, remember);

    setMessage(`You have been logged in as ${role}.`);
  };

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

      <div className="space-y-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-green-bold hover:bg-slate-100"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-900">
            G
          </span>

          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-900">
          Email

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Password

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            placeholder="Enter password"
          />
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Test Role

          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as UserRole)
            }
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
          >
            <option value={UserRole.CUSTOMER}>Customer</option>
            <option value={UserRole.SELLER}>Seller</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </select>
        </label>

        <div className="flex items-center justify-between gap-4 text-sm text-slate-700">
          <label className="inline-flex items-center gap-2 text-slate-900">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 bg-white text-green-bold focus:ring-green-soft"
            />

            Remember me
          </label>

          <button
            type="button"
            className="text-green-bold hover:text-green-soft"
          >
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

      {error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-3xl border border-green-soft/20 bg-green-soft/10 p-4 text-sm text-green-soft">
          {message}
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
