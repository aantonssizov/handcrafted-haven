"use client";

export default function ReviewForm() {
  return (
    <form className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Leave a Review
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Rating
          </label>

          <select className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700">
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Comment
          </label>

          <textarea
            rows={5}
            placeholder="Write your review..."
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}
