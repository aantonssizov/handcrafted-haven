"use client";

import {
  ProductCategory,
  formatCategoryLabel,
} from "@/lib/models/product-category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 200;

export default function ProductCatalogFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();
  const categoriesId = useId();
  const minPriceId = useId();
  const maxPriceId = useId();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || DEFAULT_MIN_PRICE,
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || DEFAULT_MAX_PRICE,
  );

  function handleMinPriceChange(value: number) {
    setMinPrice(value);
    if (value > maxPrice) {
      setMaxPrice(value);
    }
  }

  function handleMaxPriceChange(value: number) {
    setMaxPrice(value);
    if (value < minPrice) {
      setMinPrice(value);
    }
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const searchQuery = formData.get("searchQuery")?.toString().trim();
    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    }

    formData
      .getAll("categories")
      .forEach((category) => params.append("categories", category.toString()));

    const min = formData.get("minPrice")?.toString();
    if (min) {
      params.set("minPrice", min);
    }

    const price = formData.get("maxPrice")?.toString();
    if (price) {
      params.set("maxPrice", price);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.form?.reset();
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    router.push(pathname);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Search */}
      <div className="mb-5">
        <label
          htmlFor={searchId}
          className="block text-xs uppercase tracking-wider text-slate-400 mb-2"
        >
          Search
        </label>
        <input
          id={searchId}
          type="text"
          placeholder="Search products..."
          name="searchQuery"
          defaultValue={searchParams.get("searchQuery") ?? ""}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Category */}
      <div className="mb-5">
        <label
          htmlFor={categoriesId}
          className="block text-xs uppercase tracking-wider text-slate-400 mb-2"
        >
          Category
        </label>
        <select
          id={categoriesId}
          name="categories"
          multiple
          defaultValue={searchParams.getAll("categories")}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-sm text-slate-200 focus:outline-none focus:border-amber-400"
        >
          {Object.values(ProductCategory).map((category) => (
            <option value={category} key={category}>
              {formatCategoryLabel(category)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Price Range
          </span>
          <span className="text-sm font-semibold text-amber-400">
            ${minPrice} &ndash; ${maxPrice}
          </span>
        </div>

        <label
          htmlFor={minPriceId}
          className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1"
        >
          Min
        </label>
        <input
          id={minPriceId}
          type="range"
          min="0"
          max="200"
          step="5"
          name="minPrice"
          value={minPrice}
          onChange={(e) => handleMinPriceChange(+e.target.value)}
          className="w-full accent-amber-400 bg-slate-950 cursor-pointer mb-3"
        />

        <label
          htmlFor={maxPriceId}
          className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1"
        >
          Max
        </label>
        <input
          id={maxPriceId}
          type="range"
          min="0"
          max="200"
          step="5"
          name="maxPrice"
          value={maxPrice}
          onChange={(e) => handleMaxPriceChange(+e.target.value)}
          className="w-full accent-amber-400 bg-slate-950 cursor-pointer"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-amber-400 text-slate-950 text-xs uppercase tracking-wider font-bold rounded-md hover:bg-amber-300 transition"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full py-2 px-4 bg-slate-800 text-slate-200 text-xs uppercase tracking-wider font-semibold rounded-md hover:bg-slate-700 transition"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
}
