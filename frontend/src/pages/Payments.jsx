import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Calendar, User } from "lucide-react";
import api from "../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("/payments/my");

        setPayments(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch payments:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load payments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading payments...
        </p>
      </div>
    );
  }

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
            My Payments
          </h1>

          <p className="mt-2 text-slate-500">
            View your completed payments and transactions.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <CreditCard
              size={48}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No payments yet
            </h2>

            <p className="mt-2 text-slate-500">
              Your successful payments will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CreditCard size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Payment #{payment.id}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {payment.transactionId}
                      </p>
                    </div>

                  </div>

                  <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {payment.status}
                  </span>

                </div>

                <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-slate-400">
                      Amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₹{payment.amount}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar
                      size={20}
                      className="text-indigo-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Paid On
                      </p>

                      <p className="font-semibold text-slate-700">
                        {new Date(
                          payment.createdAt
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User
                      size={20}
                      className="text-indigo-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Mentor
                      </p>

                      <p className="font-semibold text-slate-700">
                        {payment.booking?.mentor?.user?.name ||
                          "Mentor"}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Payments;
