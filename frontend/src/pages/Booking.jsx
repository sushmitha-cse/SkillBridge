import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import api from "../services/api";

function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mentorId = searchParams.get("mentorId");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!mentorId) {
        setError("Mentor ID is missing.");
        setLoading(false);
        return;
      }

      const startDateTime = new Date(
        `${date}T${startTime}`
      ).toISOString();

      const endDateTime = new Date(
        `${date}T${endTime}`
      ).toISOString();

      if (new Date(endDateTime) <= new Date(startDateTime)) {
        setError("End time must be after start time.");
        setLoading(false);
        return;
      }

      const response = await api.post("/bookings", {
        mentorId: Number(mentorId),
        startTime: startDateTime,
        endTime: endDateTime,
        notes: notes || undefined,
      });

      console.log("Booking successful:", response.data);

      alert("Booking created successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error("Booking failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Calendar size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Book a Session
            </h1>

            <p className="mt-2 text-slate-500">
              Choose a date and time for your mentoring session.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleBooking}
            className="mt-8 space-y-5"
          >

            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Date
              </label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Start Time
              </label>

              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                End Time
              </label>

              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Notes
              </label>

              <textarea
                id="notes"
                rows="4"
                placeholder="What would you like to learn?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Booking..."
                : "Confirm Booking"}
            </button>

          </form>

          <p className="mt-5 text-center text-xs text-slate-400">
            Mentor ID: {mentorId}
          </p>

        </div>
      </div>
    </div>
  );
}

export default Booking;

