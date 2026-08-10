import Image from "next/image";
import { IProduct } from "@/lib/models/product";
import { formatCategoryLabel } from "@/lib/models/product-category";
import { IUser } from "@/lib/models/user";
import Link from "next/link";
import StarRating from "./StarRating";

export default function ProductCard({
  product,
  showSeller = true,
}: {
  product: IProduct;
  showSeller?: boolean;
}) {
  const seller = product.seller as IUser | undefined;
  const sellerName = typeof seller === "object" ? seller?.name : undefined;

  return (
    <article className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/80 hover:border-slate-700 transition group">
      <div className="h-48 bg-slate-950 relative overflow-hidden">
        {product.pictureUrl ? (
          <Image
            src={product.pictureUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
          {formatCategoryLabel(product.category)}
        </span>
        <h3 className="text-lg font-semibold text-white mt-1">
          {product.name}
        </h3>
        {showSeller && sellerName ? (
          <p className="text-xs text-slate-400 mt-0.5">By {sellerName}</p>
        ) : null}

        <div className="mt-2">
          {product.ratingCount > 0 ? (
            <StarRating
              value={product.ratingAverage}
              count={product.ratingCount}
            />
          ) : (
            <span className="text-xs text-slate-400">No reviews yet</span>
          )}
        </div>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-xl font-bold text-white">
            ${product.price.toLocaleString()}
          </span>
          <Link
            href={`/products/${product._id}`}
            className="px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-amber-300 transition"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
