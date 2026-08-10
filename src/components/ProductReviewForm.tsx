"use client";

import { useActionState } from "react";
import { createReviewAction } from "@/actions/product-review";

interface ProductReviewFormProps {
  productId: string;
}

export default function ProductReviewForm({ productId }: ProductReviewFormProps) {
  const [state, formAction] = useActionState(createReviewAction, undefined);

  return (
    <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
      <input type="hidden" name="productId" value={productId} />

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block font-medium">Rating</span>
        <select
          name="rating"
          defaultValue="5"
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} star{value > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block font-medium">Review</span>
        <textarea
          name="review"
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
          placeholder="Share what you loved about this item..."
        />
      </label>

      {state ? (
        <p role="alert" className="text-sm text-amber-400">
          {state}
        </p>
      ) : null}

      <button
        type="submit"
        className="rounded-2xl bg-gold-bold px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90"
      >
        Submit review
      </button>
    </form>
  );
}
