import { UserRole } from "@/lib/models/roles";
import { verifySession } from "@/lib/dal";
import { getUser } from "@/actions/user";
import { logout } from "@/actions/auth";
import Link from "next/link";

export default async function Page() {
  const session = await verifySession();
  const user = await getUser(session.userId);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
          Dashboard
        </p>
        <div className="flex items-baseline justify-between">
          <h1 className="mt-3 text-4xl font-bold">Welcome, {user.name}</h1>

          <div className="flex gap-4">
            <Link
              href={"/dashboard/edit"}
              className="rounded-2xl border border-gold-soft-500/30 px-5 py-3 text-gold-soft transition hover:bg-gold-soft/10"
            >
              Edit account
            </Link>

            <button
              onClick={logout}
              className="rounded-2xl border border-red-500/30 px-5 py-3 text-red-300 transition hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8">
          <p className="text-slate-300">Email</p>
          <p className="mt-2 text-lg">{user.email}</p>

          <p className="mt-6 text-slate-300">Role</p>
          <p className="mt-2 text-lg font-semibold text-gold-soft">
            {user.role}
          </p>
        </div>

        {user.role === UserRole.Customer && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Customer Area</h2>

            <p className="mt-3 text-slate-300">
              Browse handcrafted products and manage your purchases.
            </p>
          </div>
        )}

        {user.role === UserRole.Seller && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Seller Area</h2>

            <p className="mt-3 text-slate-300">
              Manage your products and seller profile.
            </p>
          </div>
        )}

        {user.role === UserRole.Admin && (
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
