import { notFound } from "next/navigation";
import { products } from "@/lib/data/products";
import { reviews } from "@/lib/data/reviews";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter(
    (review) => review.productId === product.id
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 md:grid-cols-2">

          <div className="relative h-96 w-full overflow-hidden rounded-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-5 text-gray-600">
              {product.description}
            </p>

            <p className="mt-6 text-3xl font-bold text-green-700">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="mt-3 text-yellow-600">
              ⭐ {product.rating} ({product.reviewCount} reviews)
            </p>

            <p className="mt-3 text-gray-500">
              Sold by {product.seller}
            </p>
          </div>

        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">
            Customer Reviews
          </h2>

          <ReviewList reviews={productReviews} />

          <ReviewForm />
        </section>

      </div>
    </main>
  );
}
 