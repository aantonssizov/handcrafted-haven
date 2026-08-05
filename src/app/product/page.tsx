import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/data/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Product Listings
          </h1>

          <p className="mt-3 text-slate-600">
            Discover handcrafted products made by talented local artisans.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-lg text-slate-600">
              No products are available yet.
            </p>
          </div>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}