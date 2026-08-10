import Link from "next/link";
import { getAllSellerProfiles } from "@/actions/seller-profile";
import { getSellerRatings } from "@/actions/product";
import StarRating from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Meet the makers behind the work. Browse seller profiles and discover their handcrafted products.",
};

export default async function ArtistsPage() {
  const profiles = await getAllSellerProfiles();
  const ratings = await getSellerRatings(
    profiles.map((profile) =>
      typeof profile.seller === "object" && profile.seller?._id
        ? String(profile.seller._id)
        : String(profile.seller),
    ),
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
            Meet the Artists
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white">
            Discover talented makers behind every handcrafted piece
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Browse seller profiles, learn their story, and connect with the people
            creating your favorite work.
          </p>
        </header>

        {profiles.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center text-slate-300">
            <p>No seller profiles have been created yet.</p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => {
              const sellerName =
                typeof profile.seller === "object" && profile.seller?.name
                  ? profile.seller.name
                  : "Featured artist";
              const sellerId =
                typeof profile.seller === "object" && profile.seller?._id
                  ? String(profile.seller._id)
                  : String(profile.seller);
              const rating = ratings[sellerId];

              return (
                <article
                  key={String(profile._id)}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70"
                >
                  <div className="flex items-center gap-4 border-b border-white/10 p-6">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10">
                      {profile.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.avatarUrl}
                          alt={sellerName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-slate-300">
                          {sellerName.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{sellerName}</h2>
                      <p className="text-sm text-slate-400">
                        {profile.location || "Location shared soon"}
                      </p>
                      <div className="mt-1">
                        {rating && rating.count > 0 ? (
                          <StarRating
                            value={rating.average}
                            count={rating.count}
                          />
                        ) : (
                          <span className="text-xs text-slate-400">
                            No reviews yet
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-6 text-sm text-slate-300">
                    <p className="line-clamp-4">
                      {profile.bio || "This maker is still sharing their story."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-gold-bold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                        {profile.experienceYears ? `${profile.experienceYears}+ years` : "New to the platform"}
                      </span>
                      <Link
                        href={`/seller/${sellerId}`}
                        className="font-semibold text-gold-soft transition hover:text-gold-bold"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
