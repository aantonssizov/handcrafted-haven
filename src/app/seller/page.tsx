import RoleGuard from "../../../components/RoleGuard";
import SellerProfileForm from "../../../components/SellerProfileForm";
import { UserRole } from "@/lib/models/roles";

export default function SellerPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.Seller]}>
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
            Seller Area
          </p>

          <h1 className="mt-4 text-4xl font-bold">Create your seller profile</h1>

          <p className="mt-4 text-slate-300">
            Add your name, bio, location, avatar, social links, and product list.
          </p>

          <SellerProfileForm />
        </div>
      </main>
    </RoleGuard>
  );
}
