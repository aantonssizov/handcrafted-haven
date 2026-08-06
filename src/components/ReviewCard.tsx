import type { Review } from "@/lib/types/review";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          {review.customer}
        </h3>

        <span className="text-yellow-500">
          {"⭐".repeat(review.rating)}
        </span>
      </div>

      <p className="mt-3 text-gray-600">
        {review.comment}
      </p>

      <p className="mt-4 text-sm text-gray-400">
        {review.date}
      </p>
    </div>
  );
}
