import RoleGuard from "../../components/RoleGuard";
import { UserRole } from "@/lib/models/roles";

export default function CustomerPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.Customer]}>
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
            Customer Area
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Welcome to your customer area
          </h1>

          <p className="mt-4 text-slate-300">
            Browse handcrafted products and manage your purchases.
          </p>
        </div>
      </main>
    </RoleGuard>
  );
}
