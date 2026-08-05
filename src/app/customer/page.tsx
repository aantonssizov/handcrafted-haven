import RoleGuard from "@/components/RoleGuard";
import ProductCatalog from "@/components/ProductCatalog";
import { UserRole } from "@/lib/models/roles";

export default function Page() {
  return (
    <RoleGuard allowedRoles={[UserRole.Customer]}>
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
            Customer Area
          </p>

          <ProductCatalog />
        </div>
      </main>
    </RoleGuard>
  );
}
