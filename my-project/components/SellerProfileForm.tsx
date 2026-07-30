"use client";

import { useActionState } from "react";
import { createOrUpdateSellerProfile } from "@/actions/seller-profile";

export default function SellerProfileForm() {
  const [state, action, pending] = useActionState(
    createOrUpdateSellerProfile,
    undefined,
  );

  return (
    <form action={action} className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-200">
          Name
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Your business or full name"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Location
          <input
            type="text"
            name="location"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Cape Town, South Africa"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Avatar URL
          <input
            type="url"
            name="avatarUrl"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="https://example.com/avatar.jpg"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Experience (years)
          <input
            type="number"
            name="experienceYears"
            min="0"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="5"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Website (optional)
          <input
            type="url"
            name="website"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="https://yourshop.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Instagram (optional)
          <input
            type="text"
            name="instagram"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="@yourhandle"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-200">
        Bio
        <textarea
          name="bio"
          rows={4}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          placeholder="Tell buyers about your craft and story"
        />
      </label>

      <label className="block text-sm font-medium text-slate-200">
        Product list
        <textarea
          name="productList"
          rows={3}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          placeholder="Comma-separated products, e.g. Candles, Pottery, Leather bags"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft"
      >
        {pending ? "Saving..." : "Save profile"}
      </button>

      {state && <p className="text-sm text-slate-300">{state}</p>}
    </form>
  );
}
