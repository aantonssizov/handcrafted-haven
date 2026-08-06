import Link from "next/link";
import { notFound } from "next/navigation";
import { getSellerProfileBySellerId } from "@/actions/seller-profile";
import { getAllBySeller } from "@/actions/product";

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ sellerId: string }>;
}) {
  const { sellerId } = await params;
  const profile = await getSellerProfileBySellerId(sellerId);

  if (!profile) {
    notFound();
  }

  const sellerName =
    typeof profile.seller === "object" && profile.seller?.name
      ? profile.seller.name
      : "Featured artist";

  const products = await getAllBySeller(sellerId);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/artists" className="text-sm font-semibold text-gold-soft">
          ← Back to artists
        </Link>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10 md:h-32 md:w-32">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatarUrl}
                  alt={sellerName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-slate-300">
                  {sellerName.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
                Seller profile
              </p>
              <h1 className="text-4xl font-bold text-white">{sellerName}</h1>
              <p className="max-w-2xl text-slate-300">
                {profile.bio || "This maker is still sharing their story."}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Location</p>
              <p className="mt-1 font-semibold text-white">
                {profile.location || "Not shared yet"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Experience</p>
              <p className="mt-1 font-semibold text-white">
                {profile.experienceYears ? `${profile.experienceYears} years` : "New to the platform"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Contact</p>
              <div className="mt-1 space-y-1 text-sm text-slate-300">
                {profile.website ? (
                  <a href={profile.website} target="_blank" rel="noreferrer" className="block text-gold-soft hover:text-gold-bold">
                    Website
                  </a>
                ) : null}
                {profile.instagram ? (
                  <p>{profile.instagram}</p>
                ) : (
                  <p>Social links will appear here once shared.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Products by {sellerName}</h2>
            <span className="text-sm text-slate-400">{products.length} item(s)</span>
          </div>

          {products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-10 text-center text-slate-400">
              <p>This seller has not added products yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article key={String(product._id)} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
                  <div className="h-48 bg-white/5">
                    {product.pictureUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.pictureUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        No image available
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 p-5">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-slate-400">{product.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gold-soft">${product.price.toLocaleString()}</span>
                      <span className="text-slate-400">{product.category}</span>
                    </div>
                    <Link href={`/products/${String(product._id)}`} className="inline-flex text-sm font-semibold text-gold-soft hover:text-gold-bold">
                      View details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
