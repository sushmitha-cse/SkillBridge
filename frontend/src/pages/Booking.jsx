import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import api from "../services/api";

function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mentorId = searchParams.get("mentorId");
  const slotId = searchParams.get("slotId");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const [mentor, setMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [loadingSlot, setLoadingSlot] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // FETCH MENTOR + SELECTED AVAILABILITY SLOT
  // ==========================================

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setError("");

        if (!mentorId) {
          setError("Mentor ID is missing.");
          setLoadingSlot(false);
          return;
        }

        // Fetch mentor
        const mentorResponse = await api.get(
          `/mentors/${mentorId}`
        );

        setMentor(
          mentorResponse.data.data
        );

        // Fetch mentor availability
        const availabilityResponse =
          await api.get(
            `/availability/mentor/${mentorId}`
          );

        const slots =
          availabilityResponse.data.data || [];

        // If slotId exists, find selected slot
        if (slotId) {
          const slot = slots.find(
            (item) =>
              String(item.id) === String(slotId)
          );

          if (!slot) {
            setError(
              "Selected availability slot was not found."
            );
            setLoadingSlot(false);
            return;
          }

          setSelectedSlot(slot);

          // Convert database UTC date to browser local date/time
          const start = new Date(
            slot.startTime
          );

          const end = new Date(
            slot.endTime
          );

          // YYYY-MM-DD
          const localDate =
            start.getFullYear() +
            "-" +
            String(
              start.getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(
              start.getDate()
            ).padStart(2, "0");

          // HH:mm
          const localStartTime =
            String(
              start.getHours()
            ).padStart(2, "0") +
            ":" +
            String(
              start.getMinutes()
            ).padStart(2, "0");

          const localEndTime =
            String(
              end.getHours()
            ).padStart(2, "0") +
            ":" +
            String(
              end.getMinutes()
            ).padStart(2, "0");

          setDate(localDate);
          setStartTime(localStartTime);
          setEndTime(localEndTime);
        }

      } catch (err) {
        console.error(
          "Failed to load booking details:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load booking details."
        );
      } finally {
        setLoadingSlot(false);
      }
    };

    fetchBookingDetails();
  }, [mentorId, slotId]);

  // ==========================================
  // CREATE BOOKING
  // ==========================================

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

      if (!date || !startTime || !endTime) {
        setError(
          "Please select a valid date and time."
        );
        setLoading(false);
        return;
      }

      // Create local datetime
      const startDateTime = new Date(
        `${date}T${startTime}`
      );

      const endDateTime = new Date(
        `${date}T${endTime}`
      );

      // Validate time
      if (endDateTime <= startDateTime) {
        setError(
          "End time must be after start time."
        );
        setLoading(false);
        return;
      }

      // Convert to ISO for backend
      const startISO =
        startDateTime.toISOString();

      const endISO =
        endDateTime.toISOString();

      const response = await api.post(
        "/bookings",
        {
          mentorId: Number(mentorId),
          startTime: startISO,
          endTime: endISO,
          notes: notes || undefined,
        }
      );

      console.log(
        "Booking successful:",
        response.data
      );

      alert(
        "Booking created successfully!"
      );

      navigate("/dashboard");

    } catch (err) {
      console.error(
        "Booking failed:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to create booking."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loadingSlot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>

          <p className="mt-4 font-semibold text-slate-600">
            Loading session details...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-2xl">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* MAIN CARD */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          {/* HEADER */}

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Calendar size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Book a Session
            </h1>

            <p className="mt-2 text-slate-500">
              Confirm your mentoring session with your selected mentor.
            </p>

          </div>

          {/* MENTOR INFO */}

          {mentor && (
            <div className="mt-8 rounded-2xl bg-indigo-50 p-5">

              <p className="text-sm text-slate-500">
                Mentor
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {mentor.user?.name || "Mentor"}
              </h2>

              {mentor.bio && (
                <p className="mt-2 text-sm text-slate-600">
                  {mentor.bio}
                </p>
              )}

            </div>
          )}

          {/* SELECTED SLOT */}

          {selectedSlot && (
            <div className="mt-5 rounded-2xl border border-indigo-100 bg-white p-5">

              <div className="flex items-center gap-3">

                <Calendar
                  size={20}
                  className="text-indigo-600"
                />

                <div>

                  <p className="text-xs text-slate-400">
                    Selected Date
                  </p>

                  <p className="font-bold text-slate-900">
                    {new Date(
                      selectedSlot.startTime
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

              </div>

              <div className="mt-4 flex items-center gap-3">

                <Clock
                  size={20}
                  className="text-indigo-600"
                />

                <div>

                  <p className="text-xs text-slate-400">
                    Selected Time
                  </p>

                  <p className="font-bold text-slate-900">

                    {new Date(
                      selectedSlot.startTime
                    ).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}

                    {" - "}

                    {new Date(
                      selectedSlot.endTime
                    ).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}

                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleBooking}
            className="mt-8 space-y-5"
          >

            {/* DATE */}

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
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
                readOnly={Boolean(slotId)}
                className={`w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                  slotId
                    ? "cursor-not-allowed bg-slate-100"
                    : ""
                }`}
              />

            </div>

            {/* START TIME */}

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
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                required
                readOnly={Boolean(slotId)}
                className={`w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                  slotId
                    ? "cursor-not-allowed bg-slate-100"
                    : ""
                }`}
              />

            </div>

            {/* END TIME */}

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
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                required
                readOnly={Boolean(slotId)}
                className={`w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                  slotId
                    ? "cursor-not-allowed bg-slate-100"
                    : ""
                }`}
              />

            </div>

            {/* NOTES */}

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
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />

            </div>

            {/* CONFIRM */}

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

          {/* IDs */}

          <div className="mt-5 text-center text-xs text-slate-400">

            <p>
              Mentor ID: {mentorId}
            </p>

            {slotId && (
              <p>
                Slot ID: {slotId}
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Booking;

