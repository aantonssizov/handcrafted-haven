import ProductCatalog from "@/components/ProductCatalog";
import { getByFilter } from "@/actions/product";
import { IProductFilter } from "@/lib/models/product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse handcrafted items from independent artisans. Filter by category, price, and keyword.",
};

function parseFilter(
  searchParams: Record<string, string | string[] | undefined>,
): IProductFilter {
  const { searchQuery, categories, minPrice, maxPrice } = searchParams;

  const filter: IProductFilter = {};

  if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
    filter.searchQuery = searchQuery;
  }

  if (categories) {
    filter.categories = Array.isArray(categories) ? categories : [categories];
  }

  if (typeof minPrice === "string" && minPrice !== "") {
    const parsed = Number(minPrice);
    if (!Number.isNaN(parsed)) {
      filter.minPrice = parsed;
    }
  }

  if (typeof maxPrice === "string" && maxPrice !== "") {
    const parsed = Number(maxPrice);
    if (!Number.isNaN(parsed)) {
      filter.maxPrice = parsed;
    }
  }

  return filter;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const filter = parseFilter(resolvedSearchParams);
  const products = await getByFilter(filter);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
          Products Area
        </p>

        <h1 className="mt-4 mb-8 text-4xl font-bold text-white">
          Handcrafted Products
        </h1>

        <ProductCatalog products={products} />
      </div>
    </main>
  );
}
