import RoleGuard from "@/components/RoleGuard";
import ProductCatalog from "@/components/ProductCatalog";
import { UserRole } from "@/lib/models/roles";

export default function CustomerPage() {
  return (
          <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-400">
              Customer Area
            </p>
            <h1 className="mt-2 text-4xl font-bold text-white">
              Browse Handcrafted Items
            </h1>
            <p className="mt-2 text-slate-300">
              Discover unique creations, filter by category or price, and support artisans.
            </p>
          </header>

          <ProductCatalog />
        </div>
      </main>
  );
}