import Link from "next/link";
import { notFound } from "next/navigation";
import { get } from "@/actions/product";
import ProductForm from "@/components/ProductForm";
import RoleGuard from "@/components/RoleGuard";
import { verifySession } from "@/lib/dal";
import { UserRole } from "@/lib/models/roles";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const session = await verifySession();
  const product = await get(productId);

  if (!product) {
    notFound();
  }

  if (String(product.seller?._id || product.seller) !== String(session.userId)) {
    return (
      <RoleGuard allowedRoles={[UserRole.Seller]}>
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
          <div className="mx-auto max-w-4xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <h1 className="text-2xl font-bold">You can only edit your own products.</h1>
          </div>
        </main>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={[UserRole.Seller]}>
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-4xl space-y-6">
          <Link href={`/products/${productId}`} className="text-sm font-semibold text-gold-soft">
            ← Back to product
          </Link>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">Seller area</p>
            <h1 className="mt-2 text-4xl font-bold text-white">Edit product</h1>
          </div>

          <ProductForm
            mode="edit"
            productId={productId}
            initialValues={{
              name: product.name,
              description: product.description,
              price: product.price,
              category: product.category,
              amountSold: product.amountSold,
              pictureUrl: product.pictureUrl,
            }}
          />
        </div>
      </main>
    </RoleGuard>
  );
}
