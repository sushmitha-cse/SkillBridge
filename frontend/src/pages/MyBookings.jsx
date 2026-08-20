import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  XCircle,
  CreditCard,
} from "lucide-react";
import api from "../services/api";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/bookings/my");

      setBookings(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load your bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(bookingId);
      setError("");

      await api.patch(`/bookings/${bookingId}/cancel`);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "CANCELLED" }
            : booking
        )
      );

      alert("Booking cancelled successfully.");
    } catch (err) {
      console.error("Cancel booking failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to cancel booking."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const handlePayment = (booking) => {
    navigate("/payment", {
      state: {
        booking,
      },
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading your bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            My Bookings
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your mentoring sessions.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* No bookings */}
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <Calendar
              size={48}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-slate-500">
              Book a session with a mentor to get started.
            </p>

            <Link
              to="/mentors"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Find a Mentor
            </Link>

          </div>
        ) : (

          /* Bookings */
          <div className="space-y-5">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                {/* Mentor + Status */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <User size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {booking.mentor?.user?.name || "Mentor"}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {booking.mentor?.user?.email || ""}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>

                {/* Date + Time */}
                <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">

                  <div className="flex items-center gap-3">

                    <Calendar
                      size={20}
                      className="text-indigo-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Date
                      </p>

                      <p className="font-semibold text-slate-700">
                        {formatDate(booking.startTime)}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <Clock
                      size={20}
                      className="text-indigo-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Time
                      </p>

                      <p className="font-semibold text-slate-700">
                        {formatTime(booking.startTime)} -{" "}
                        {formatTime(booking.endTime)}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Notes */}
                {booking.notes && (
                  <div className="mt-5 rounded-xl bg-slate-50 p-4">

                    <p className="text-xs font-semibold text-slate-400">
                      Notes
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {booking.notes}
                    </p>

                  </div>
                )}

                {/* PAY NOW */}
                {booking.status === "ACCEPTED" && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <CreditCard size={19} />
                    Pay Now
                  </button>
                )}

                {/* CANCEL */}
                {(booking.status === "PENDING" ||
                  booking.status === "ACCEPTED") && (

                  <button
                    onClick={() =>
                      handleCancel(booking.id)
                    }
                    disabled={
                      cancellingId === booking.id
                    }
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={19} />

                    {cancellingId === booking.id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </button>

                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;

