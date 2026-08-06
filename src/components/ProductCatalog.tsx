import ProductCard from "./ProductCard";
import { IProduct } from "@/lib/models/product";
import ProductCatalogFilter from "./ProductCatalogFilter";

export default function ProductCatalog({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter Controls */}
      <aside className="w-full md:w-64 p-5 border border-slate-800 rounded-xl bg-slate-900/60 h-fit">
        <h2 className="font-semibold text-lg mb-4 text-white">
          Filter Catalog
        </h2>
        <ProductCatalogFilter />
      </aside>

      {/* Product Display Grid */}
      <section className="flex-1">
        <div className="mb-4 text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-amber-400">
            {products.length}
          </span>{" "}
          handcrafted items
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
            <p className="text-slate-400">
              No handcrafted items match your filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
