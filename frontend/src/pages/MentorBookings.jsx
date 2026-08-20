import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Video,
} from "lucide-react";
import api from "../services/api";

function MentorBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [meetingLinks, setMeetingLinks] = useState({});
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/bookings/mentor");

      console.log("Mentor bookings:", response.data);

      setBookings(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch mentor bookings:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load mentor bookings."
      );
    } finally {
      setLoading(false);
    }
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
    if (status === "ACCEPTED") {
      return "bg-green-100 text-green-700";
    }

    if (status === "REJECTED") {
      return "bg-red-100 text-red-700";
    }

    if (status === "COMPLETED") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "CANCELLED") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const updateStatus = async (bookingId, status) => {
    try {
      setError("");

      const response = await api.patch(
        `/bookings/${bookingId}/status`,
        {
          status,
        }
      );

      console.log(
        "Booking status updated:",
        response.data
      );

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: response.data.data.status,
              }
            : booking
        )
      );
    } catch (err) {
      console.error(
        "Failed to update booking status:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update booking status."
      );
    }
  };

  const handleMeetingLinkChange = (bookingId, value) => {
    setMeetingLinks((current) => ({
      ...current,
      [bookingId]: value,
    }));
  };

  const addMeetingLink = async (bookingId) => {
    const meetingLink = meetingLinks[bookingId]?.trim();

    if (!meetingLink) {
      setError("Please enter a meeting link.");
      return;
    }

    try {
      setSavingId(bookingId);
      setError("");

      const response = await api.patch(
        `/bookings/${bookingId}/meeting-link`,
        {
          meetingLink,
        }
      );

      console.log(
        "Meeting link added:",
        response.data
      );

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                meetingLink:
                  response.data.data.meetingLink,
              }
            : booking
        )
      );

      alert("Meeting link added successfully!");

      setMeetingLinks((current) => ({
        ...current,
        [bookingId]: "",
      }));
    } catch (err) {
      console.error(
        "Failed to add meeting link:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to add meeting link."
      );
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading mentor bookings...
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
            Mentor Bookings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage students and your mentoring sessions.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
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
              Students have not booked a session with you yet.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                {/* Student + Status */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <User size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {booking.student?.user?.name ||
                          "Student"}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {booking.student?.user?.email ||
                          ""}
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

                {/* Date & Time */}
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
                        {formatDate(
                          booking.startTime
                        )}
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
                        {formatTime(
                          booking.startTime
                        )}{" "}
                        -{" "}
                        {formatTime(
                          booking.endTime
                        )}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Notes */}
                {booking.notes && (
                  <div className="mt-5 rounded-xl bg-slate-50 p-4">

                    <p className="text-xs font-semibold text-slate-400">
                      Student Notes
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {booking.notes}
                    </p>

                  </div>
                )}

                {/* Actions */}
                {booking.status === "PENDING" && (
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">

                    <button
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "ACCEPTED"
                        )
                      }
                      className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "REJECTED"
                        )
                      }
                      className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </div>
                )}

                {/* Complete */}
                {booking.status === "ACCEPTED" && (
                  <div className="mt-6 border-t border-slate-100 pt-5">

                    <button
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "COMPLETED"
                        )
                      }
                      className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                    >
                      Mark as Completed
                    </button>

                  </div>
                )}

                {/* Meeting Link */}
                {booking.status === "ACCEPTED" && (
                  <div className="mt-6 border-t border-slate-100 pt-5">

                    <div className="flex items-center gap-2">
                      <Video
                        size={20}
                        className="text-indigo-600"
                      />

                      <h3 className="font-bold text-slate-900">
                        Meeting Link
                      </h3>
                    </div>

                    {booking.meetingLink ? (
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">

                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-xl bg-green-50 px-4 py-3 font-semibold text-green-700 hover:bg-green-100"
                        >
                          {booking.meetingLink}
                        </a>

                        <span className="text-sm font-semibold text-green-600">
                          Link Added ✓
                        </span>

                      </div>
                    ) : (
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                        <input
                          type="url"
                          placeholder="https://meet.google.com/..."
                          value={
                            meetingLinks[booking.id] ||
                            ""
                          }
                          onChange={(e) =>
                            handleMeetingLinkChange(
                              booking.id,
                              e.target.value
                            )
                          }
                          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />

                        <button
                          onClick={() =>
                            addMeetingLink(
                              booking.id
                            )
                          }
                          disabled={
                            savingId === booking.id
                          }
                          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {savingId === booking.id
                            ? "Adding..."
                            : "Add Link"}
                        </button>

                      </div>
                    )}

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MentorBookings;

