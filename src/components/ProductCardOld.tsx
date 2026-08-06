import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative h-56 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <p className="mb-1 text-sm text-gray-500">{product.category}</p>

        <h2 className="text-xl font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#1B5E20]">
            ₦{product.price.toLocaleString()}
          </span>

          <span className="text-sm text-yellow-600">
            ⭐ {product.rating} ({product.reviewCount})
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Sold by {product.seller}
        </p>
      </div>
    </Link>
  );
}
