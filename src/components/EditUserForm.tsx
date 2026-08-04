"use client";

import { edit } from "@/actions/user";
import { UserRole } from "@/lib/models/roles";
import { IUserClient } from "@/lib/models/user";
import { useActionState } from "react";

export default function EditUserForm({ user }: { user: IUserClient }) {
  const editWithId = edit.bind(null, user._id);
  const [state, action, pending] = useActionState(editWithId, undefined);

  return (
    <div className="space-y-6">
      <h2 className="mt-4 text-3xl font-semibold text-slate-900">
        Edit your account
      </h2>

      <form className="space-y-5" action={action}>
        {state && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-700">
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
            defaultValue={user.name}
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
            defaultValue={user.email}
          />
        </label>

        <label className="block text-sm font-medium text-slate-900">
          Account type
          <select
            name="role"
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-bold focus:ring-2 focus:ring-green-soft/30"
            disabled
            defaultValue={user.role}
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
            disabled
            defaultValue={user.password}
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft"
        >
          Edit account
        </button>
      </form>
    </div>
  );
}
