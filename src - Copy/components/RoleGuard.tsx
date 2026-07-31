import Link from "next/link";
import { UserRole } from "@/lib/models/roles";
import { verifySession } from "@/lib/dal";

type RoleGuardProps = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

export default async function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const session = await verifySession();

  const hasPermission =
    session.isAuth && session.userId && allowedRoles.includes(session.userRole);

  if (!hasPermission) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>

          <p className="mt-3 text-slate-300">
            You do not have permission to access this page.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-2xl bg-gold-bold px-5 py-3 font-semibold text-slate-950"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
