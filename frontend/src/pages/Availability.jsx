import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Availability() {
  const navigate = useNavigate();

  const [availabilities, setAvailabilities] = useState([]);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch mentor availability
  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/availability/my");

      setAvailabilities(response.data.data || []);
    } catch (err) {
      console.error(
        "Failed to fetch availability:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load availability."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Create availability
  const handleCreate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!date || !startTime || !endTime) {
      setError("Please fill all fields.");
      return;
    }

    if (startTime >= endTime) {
      setError("End time must be after start time.");
      return;
    }

    try {
      setSaving(true);

      const startDateTime = new Date(
        `${date}T${startTime}:00`
      );

      const endDateTime = new Date(
        `${date}T${endTime}:00`
      );

      await api.post("/availability", {
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });

      setMessage(
        "Availability added successfully!"
      );

      setDate("");
      setStartTime("");
      setEndTime("");

      await fetchAvailability();

    } catch (err) {
      console.error(
        "Create availability error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to create availability."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete availability
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this availability?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      await api.delete(`/availability/${id}`);

      setMessage(
        "Availability deleted successfully!"
      );

      await fetchAvailability();

    } catch (err) {
      console.error(
        "Delete availability error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete availability."
      );
    }
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (value) => {
    return new Date(value).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading availability...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            My Availability
          </h1>

          <p className="mt-2 text-slate-500">
            Add the time slots when students can book sessions with you.
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 rounded-xl bg-green-50 p-4 text-center text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Add Availability */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            Add Availability
          </h2>

          <p className="mt-2 text-slate-500">
            Choose a date and the time range you are available.
          </p>

          <form
            onSubmit={handleCreate}
            className="mt-6 grid gap-5 md:grid-cols-3"
          >

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Date
              </label>

              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Start */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Start Time
              </label>

              <div className="relative">
                <Clock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  value={startTime}
                  onChange={(e) =>
                    setStartTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* End */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                End Time
              </label>

              <div className="relative">
                <Clock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  value={endTime}
                  onChange={(e) =>
                    setEndTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Adding..."
                  : "Add Availability"}
              </button>
            </div>

          </form>
        </div>

        {/* Existing Availability */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold text-slate-900">
            Your Available Slots
          </h2>

          {availabilities.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-slate-500">
                No availability slots added yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">

              {availabilities.map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center"
                >

                  <div>

                    <div className="flex items-center gap-3">
                      <Calendar
                        size={20}
                        className="text-indigo-600"
                      />

                      <p className="font-bold text-slate-900">
                        {formatDate(slot.startTime)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Clock
                        size={20}
                        className="text-indigo-600"
                      />

                      <p className="font-medium text-slate-600">
                        {formatTime(slot.startTime)}
                        {" - "}
                        {formatTime(slot.endTime)}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(slot.id)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Availability;

