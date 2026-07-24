"use client";

import Link from "next/link";
import { useAuth } from "../../lib/auth/auth-context";
import { UserRole } from "../../lib/auth/roles";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>

          <p className="mt-3 text-slate-300">
            You must be logged in to access this page.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl bg-gold-bold px-5 py-3 font-semibold text-slate-950"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
              Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Welcome, {user.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl border border-red-500/30 px-5 py-3 text-red-300 transition hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8">
          <p className="text-slate-300">Email</p>
          <p className="mt-2 text-lg">{user.email}</p>

          <p className="mt-6 text-slate-300">Role</p>
          <p className="mt-2 text-lg font-semibold text-gold-soft">
            {user.role}
          </p>
        </div>

        {user.role === UserRole.CUSTOMER && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Customer Area</h2>

            <p className="mt-3 text-slate-300">
              Browse handcrafted products and manage your purchases.
            </p>
          </div>
        )}

        {user.role === UserRole.SELLER && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Seller Area</h2>

            <p className="mt-3 text-slate-300">
              Manage your products and seller profile.
            </p>
          </div>
        )}

        {user.role === UserRole.ADMIN && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Admin Area</h2>

            <p className="mt-3 text-slate-300">
              Manage users, products, and the entire marketplace.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
