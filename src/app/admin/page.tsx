"use client";

import RoleGuard from "../../components/RoleGuard";
import { UserRole } from "../../lib/auth/roles";

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
            Admin Area
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Welcome to the admin area
          </h1>

          <p className="mt-4 text-slate-300">
            Manage users, products, sellers, and the Handcrafted Haven
            platform.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-bold">Users</h2>

              <p className="mt-2 text-sm text-slate-300">
                Manage customer and seller accounts.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-bold">Products</h2>

              <p className="mt-2 text-sm text-slate-300">
                Manage products and listings.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-bold">Platform</h2>

              <p className="mt-2 text-sm text-slate-300">
                Manage the Handcrafted Haven marketplace.
              </p>
            </div>
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
