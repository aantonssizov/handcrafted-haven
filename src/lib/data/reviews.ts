import type { Review } from "../types/review";

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    customer: "John Doe",
    rating: 5,
    comment: "Excellent craftsmanship. The basket is sturdy and beautiful.",
    date: "2026-08-01",
  },
  {
    id: "2",
    productId: "1",
    customer: "Mary James",
    rating: 4,
    comment: "Very good quality and fast delivery.",
    date: "2026-08-03",
  },
  {
    id: "3",
    productId: "2",
    customer: "Sarah Williams",
    rating: 5,
    comment: "Absolutely love this necklace!",
    date: "2026-08-04",
  },
  {
    id: "4",
    productId: "3",
    customer: "David Brown",
    rating: 5,
    comment: "Amazing artwork. Worth every naira.",
    date: "2026-08-05",
  },
];
