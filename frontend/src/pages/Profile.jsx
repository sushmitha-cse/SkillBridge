import { useEffect, useState } from "react";
import { ArrowLeft, User, Mail, Phone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch latest profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me");

        const profile = response.data.data;

        setUser(profile);
        setName(profile.name || "");
        setPhone(profile.phone || "");

        // Keep localStorage updated
        localStorage.setItem(
          "user",
          JSON.stringify(profile)
        );
      } catch (err) {
        console.error("Failed to fetch profile:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load profile."
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

      const response = await api.put(
        "/auth/profile",
        {
          name,
          phone,
        }
      );

      const updatedUser = response.data.data;

      setUser(updatedUser);

      setName(updatedUser.name || "");
      setPhone(updatedUser.phone || "");

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMessage("Profile updated successfully!");

    } catch (err) {
      console.error("Profile update failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-3xl">

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
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your SkillBridge profile.
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
              {user?.name || "User"}
            </h2>

            <p className="mt-1 text-slate-500">
              {user?.role || "STUDENT"}
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

          {/* Form */}
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
                  required
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
                  value={user?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-500"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Email cannot be changed.
              </p>
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
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Role
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Shield
                  size={19}
                  className="text-indigo-600"
                />

                <span className="font-semibold text-slate-700">
                  {user?.role || "STUDENT"}
                </span>
              </div>
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;
