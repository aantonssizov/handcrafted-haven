import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@/lib/types/review";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
        <p className="text-gray-500">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
}
