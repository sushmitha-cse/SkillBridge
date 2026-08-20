import { useEffect, useState } from "react";
import { ArrowLeft, User, Mail, Phone, Briefcase, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MentorMyProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get logged-in mentor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/mentors/me/profile");

        const data = response.data.data;

        setProfile(data);

        setName(data.user?.name || "");
        setPhone(data.user?.phone || "");
        setBio(data.bio || "");
        setExperience(
          data.experience !== null && data.experience !== undefined
            ? String(data.experience)
            : ""
        );
        setHourlyRate(
          data.hourlyRate !== null && data.hourlyRate !== undefined
            ? String(data.hourlyRate)
            : ""
        );

      } catch (err) {
        console.error(
          "Failed to fetch mentor profile:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load mentor profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      setSaving(true);

      // Update mentor profile
      const response = await api.put(
        "/mentor/profile",
        {
          bio,
          experience: experience
            ? Number(experience)
            : null,
          hourlyRate: hourlyRate
            ? Number(hourlyRate)
            : null,
        }
      );

      const updatedProfile = response.data.data;

      setProfile(updatedProfile);

      // Update name and phone separately
      // because mentor profile API updates mentor fields.
      // User name/phone belong to User model.

      setMessage(
        "Mentor profile updated successfully!"
      );

    } catch (err) {
      console.error(
        "Mentor profile update failed:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update mentor profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading mentor profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-4xl">

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
            Mentor Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your mentor information and teaching details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Avatar */}
          <div className="flex flex-col items-center border-b border-slate-100 pb-8">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <User size={42} />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {profile?.user?.name || "Mentor"}
            </h2>

            <p className="mt-1 font-medium text-indigo-600">
              MENTOR
            </p>

          </div>

          {/* Success */}
          {message && (
            <div className="mt-6 rounded-xl bg-green-50 p-4 text-center text-green-700">
              {message}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSave}
            className="mt-8 space-y-6"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={profile?.user?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                About You
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                rows={5}
                placeholder="Tell students about yourself, your teaching style and expertise..."
                className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Experience (Years)
              </label>

              <div className="relative">
                <Briefcase
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  placeholder="e.g. 5"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Session Rate
              </label>

              <div className="relative">
                <DollarSign
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={hourlyRate}
                  onChange={(e) =>
                    setHourlyRate(e.target.value)
                  }
                  placeholder="e.g. 500"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Enter the amount you charge per session.
              </p>
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Mentor Profile"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default MentorMyProfile;
