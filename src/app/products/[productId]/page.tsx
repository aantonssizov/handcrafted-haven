import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProductAction, get } from "@/actions/product";
import { getByProduct } from "@/actions/product-review";
import ProductReviewForm from "@/components/ProductReviewForm";
import { getSession } from "@/lib/session";
import { UserRole } from "@/lib/models/roles";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await get(productId);

  if (!product) {
    notFound();
  }

  const reviews = await getByProduct(productId);
  const session = await getSession();
  const sellerName =
    typeof product.seller === "object" && product.seller?.name
      ? product.seller.name
      : "this seller";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/customer" className="text-sm font-semibold text-gold-soft">
          ← Back to catalog
        </Link>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {product.pictureUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.pictureUrl}
                alt={product.name}
                className="h-80 w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/70 text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">{product.category}</p>
              <h1 className="mt-2 text-4xl font-bold text-white">{product.name}</h1>
              <p className="mt-4 text-slate-300">{product.description || "A handcrafted piece made with care."}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gold-soft">₦{product.price.toLocaleString()}</span>
                <span className="text-sm text-slate-400">{product.amountSold || 0} sold</span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>Sold by {sellerName}</p>
                <Link href={`/seller/${String(product.seller?._id || product.seller)}`} className="inline-flex text-gold-soft hover:text-gold-bold">
                  View seller profile and other products
                </Link>
              </div>
            </div>

            {session.userRole === UserRole.Seller && String(product.seller?._id || product.seller) === String(session.userId) ? (
              <div className="flex flex-wrap gap-3">
                <Link href={`/products/${productId}/edit`} className="rounded-2xl border border-gold-soft/40 px-4 py-2 text-sm font-semibold text-gold-soft">
                  Edit product
                </Link>
                <form action={deleteProductAction.bind(null, productId)}>
                  <button type="submit" className="rounded-2xl border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-300">
                    Delete product
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Reviews</h2>
              <span className="text-sm text-slate-400">{reviews.length} review(s)</span>
            </div>

            {reviews.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center text-slate-400">
                No reviews yet. Be the first to share one.
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={String(review._id)} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{review.customer?.name || "Anonymous"}</p>
                      <p className="text-sm text-gold-soft">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                    </div>
                    {review.review ? <p className="mt-3 text-sm text-slate-300">{review.review}</p> : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {session.userRole === UserRole.Customer ? (
              <ProductReviewForm productId={productId} />
            ) : (
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-400">
                Log in as a customer to leave a review.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
