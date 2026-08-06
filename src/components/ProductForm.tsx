"use client";

import { useActionState, useRef, useState } from "react";
import { createProductAction, updateProductAction } from "@/actions/product";
import {
  ProductCategory,
  formatCategoryLabel,
} from "@/lib/models/product-category";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initialValues?: {
    name?: string;
    description?: string;
    price?: number;
    category?: ProductCategory;
    amountSold?: number;
    pictureUrl?: string;
  };
}

const categoryOptions = Object.values(ProductCategory);

export default function ProductForm({
  mode,
  productId,
  initialValues,
}: ProductFormProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(initialValues?.pictureUrl || null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      const url = json.url as string;
      setPreview(url);

      // set hidden input so server action receives pictureUrl instead of file
      const hidden = document.querySelector<HTMLInputElement>('input[name="pictureUrl"]');
      if (hidden) hidden.value = url;
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Try a smaller file.");
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit() {
    // disable file input so it's not sent to the server action (avoids body size limit)
    if (fileRef.current) {
      fileRef.current.disabled = true;
    }
  }
  const action = mode === "edit" && productId
    ? updateProductAction.bind(null, productId)
    : createProductAction;

  const [state, formAction] = useActionState(action, undefined);

  return (
    <form onSubmit={handleSubmit} action={formAction} className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium">Product name</span>
          <input
            name="name"
            defaultValue={initialValues?.name || ""}
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium">Price ($)</span>
          <input
            name="price"
            type="number"
            min="0"
            defaultValue={initialValues?.price ?? 0}
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
      </div>

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block font-medium">Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialValues?.description || ""}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium">Category</span>
          <select
            name="category"
            defaultValue={initialValues?.category || ProductCategory.Other}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {formatCategoryLabel(category)}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium">Amount sold</span>
          <input
            name="amountSold"
            type="number"
            min="0"
            defaultValue={initialValues?.amountSold ?? 0}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
      </div>

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block font-medium">Upload image</span>
        <input
          ref={fileRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
        />
        <p className="mt-2 text-xs text-slate-400">Choose a new image for this product. Leave it empty to keep the current one.</p>
        <input type="hidden" name="pictureUrl" defaultValue={initialValues?.pictureUrl || ""} />

        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="preview" className="mt-3 h-36 w-full object-cover rounded-lg" />
        ) : null}

        {uploading ? <p className="mt-2 text-sm text-amber-400">Uploading...</p> : null}
      </label>

      {state ? <p className="text-sm text-amber-400">{state}</p> : null}

      <button
        type="submit"
        className="rounded-2xl bg-gold-bold px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90"
      >
        {mode === "edit" ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
