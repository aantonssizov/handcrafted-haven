"use client";

import { useActionState } from "react";
import { useEffect, useId, useState } from "react";
import { createOrUpdateSellerProfile } from "@/actions/seller-profile";

export default function SellerProfileForm() {
  const [state, action, pending] = useActionState(
    createOrUpdateSellerProfile,
    undefined,
  );
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputId = useId();

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  function selectAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <form
      action={action}
      className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Your business or full name" />
        <Field label="Location" name="location" placeholder="Cape Town, South Africa" />
        <Field label="Experience (years)" name="experienceYears" type="number" placeholder="5" />
        <Field label="Website (optional)" name="website" type="url" placeholder="https://yourshop.com" />
        <Field label="Instagram (optional)" name="instagram" placeholder="@yourhandle" />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-200">Profile photo</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs text-slate-400">
            {avatarPreview ? (
              // A browser object URL is needed for an instant local preview before upload.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="Selected profile photo" className="h-full w-full object-cover" />
            ) : (
              "No photo"
            )}
          </div>
          <div>
            <input id={avatarInputId} name="avatar" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={selectAvatar} />
            <label htmlFor={avatarInputId} className="inline-flex cursor-pointer rounded-3xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-gold-soft hover:text-gold-soft">
              Choose photo
            </label>
            <p className="mt-2 text-xs text-slate-400">PNG, JPG, or WebP. Maximum 2 MB.</p>
          </div>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-200">
        Bio
        <textarea name="bio" rows={4} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Tell buyers about your craft and story" />
      </label>
      <label className="block text-sm font-medium text-slate-200">
        Product list
        <textarea name="productList" rows={3} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Comma-separated products, e.g. Candles, Pottery, Leather bags" />
      </label>

      <button type="submit" disabled={pending} className="rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft">
        {pending ? "Saving..." : "Save profile"}
      </button>
      {state && <p className="text-sm text-slate-300">{state}</p>}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-200">
      {label}
      <input type={type} name={name} required={required} min={type === "number" ? "0" : undefined} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder={placeholder} />
    </label>
  );
}
