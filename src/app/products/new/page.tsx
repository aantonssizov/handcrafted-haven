import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import RoleGuard from "@/components/RoleGuard";
import { UserRole } from "@/lib/models/roles";

export default function NewProductPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.Seller]}>
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-4xl space-y-6">
          <Link href="/dashboard" className="text-sm font-semibold text-gold-soft">
            ← Back to dashboard
          </Link>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">Seller area</p>
            <h1 className="mt-2 text-4xl font-bold text-white">Create a new product</h1>
          </div>

          <ProductForm mode="create" />
        </div>
      </main>
    </RoleGuard>
  );
}
