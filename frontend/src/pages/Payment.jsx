import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import api from "../services/api";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const amount =
    booking?.amount ||
    booking?.mentor?.hourlyRate ||
    0;

  const handlePayment = async () => {
    setError("");

    if (!booking?.id) {
      setError("Booking information not found.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/payments", {
        bookingId: booking.id,
        amount: Number(amount),
      });

      console.log("Payment response:", response.data);

      setSuccess(true);

    } catch (err) {
      console.error("Payment failed:", err);

      setError(
        err.response?.data?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            No Booking Selected
          </h1>

          <p className="mt-2 text-slate-500">
            Please select a booking before making a payment.
          </p>

          <button
            onClick={() => navigate("/bookings")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Go to Bookings
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle
              size={45}
              className="text-green-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Payment Successful!
          </h1>

          <p className="mt-3 text-slate-500">
            Your payment has been recorded successfully.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            This is a demo payment for SkillBridge.
          </p>

          <button
            onClick={() => navigate("/bookings")}
            className="mt-8 w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700"
          >
            View My Bookings
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-2xl">

        <button
          onClick={() => navigate("/bookings")}
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Bookings
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <CreditCard
                size={28}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Payment
              </h1>

              <p className="text-slate-500">
                Complete your SkillBridge booking payment.
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-6">

            <h2 className="font-bold text-slate-900">
              Booking Summary
            </h2>

            <div className="mt-4 space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Booking ID
                </span>

                <span className="font-semibold text-slate-900">
                  #{booking.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Amount
                </span>

                <span className="text-xl font-bold text-indigo-600">
                  ₹{Number(amount).toFixed(2)}
                </span>
              </div>

            </div>

          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
              {error}
            </div>
          )}

          {/* Dummy Payment */}
          <div className="mt-8">

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="font-semibold text-indigo-900">
                Demo Payment
              </p>

              <p className="mt-1 text-sm text-indigo-700">
                This project uses a dummy payment flow.
                No real money will be charged.
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Processing Payment..."
                : `Pay ₹${Number(amount).toFixed(2)}`}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;

