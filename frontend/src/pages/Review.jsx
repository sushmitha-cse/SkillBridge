import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, User } from "lucide-react";
import api from "../services/api";

function Review() {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingResponse, reviewResponse] = await Promise.all([
        api.get("/bookings/my"),
        api.get("/reviews/my"),
      ]);

      setBookings(bookingResponse.data.data || []);
      setReviews(reviewResponse.data.data || []);
    } catch (err) {
      console.error("Failed to load review data:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load review data."
      );
    } finally {
      setLoading(false);
    }
  };

  const hasReview = (bookingId) => {
    return reviews.some(
      (review) => review.bookingId === bookingId
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBooking) {
      setError("Please select a booking.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await api.post("/reviews", {
        bookingId: selectedBooking.id,
        rating: Number(rating),
        comment: comment.trim() || undefined,
      });

      setSuccess("Review submitted successfully!");

      setSelectedBooking(null);
      setRating(5);
      setComment("");

      await fetchData();
    } catch (err) {
      console.error("Failed to submit review:", err);

      setError(
        err.response?.data?.message ||
          "Failed to submit review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading reviews...
        </p>
      </div>
    );
  }

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "COMPLETED" &&
      !hasReview(booking.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Reviews
          </h1>

          <p className="mt-2 text-slate-500">
            Review your completed mentoring sessions.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl bg-green-50 p-4 text-center text-green-600">
            {success}
          </div>
        )}

        {completedBookings.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              Completed Sessions
            </h2>

            <div className="space-y-4">
              {completedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <User size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {booking.mentor?.user?.name || "Mentor"}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Booking #{booking.id}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setError("");
                        setSuccess("");
                      }}
                      className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                      Write Review
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedBooking && (
          <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Review {selectedBooking.mentor?.user?.name || "Mentor"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-6"
            >

              <div>
                <label className="mb-3 block font-semibold text-slate-700">
                  Rating
                </label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setRating(value)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        size={32}
                        fill={
                          value <= rating
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          value <= rating
                            ? "text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {rating} out of 5
                </p>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Comment
                </label>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows={5}
                  maxLength={1000}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {comment.length}/1000
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Review"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        <div>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            My Reviews
          </h2>

          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <Star
                size={45}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-slate-500">
                You haven't submitted any reviews yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">

                    <h3 className="font-bold text-slate-900">
                      {review.booking?.mentor?.user?.name ||
                        "Mentor"}
                    </h3>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star
                        size={18}
                        fill="currentColor"
                      />

                      <span className="font-semibold">
                        {review.rating}/5
                      </span>
                    </div>

                  </div>

                  {review.comment && (
                    <p className="mt-3 text-slate-600">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Review;
