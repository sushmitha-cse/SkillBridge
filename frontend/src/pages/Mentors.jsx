import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Mentors() {
  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await api.get("/mentors");

        console.log("Mentors response:", response.data);

        setMentors(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch mentors:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load mentors."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">
          Loading mentors...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Find a Mentor
          </h1>

          <p className="mt-2 text-slate-500">
            Connect with mentors and learn new skills
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* No Mentors */}
        {mentors.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-slate-500">
              No mentors available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Avatar */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                  {mentor.user?.name?.charAt(0)?.toUpperCase() || "M"}
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-slate-900">
                  {mentor.user?.name ||
                    mentor.name ||
                    "Mentor"}
                </h2>

                {/* Bio */}
                <p className="mt-2 text-sm text-slate-500">
                  {mentor.bio ||
                    "SkillBridge Mentor"}
                </p>

                {/* Email */}
                {mentor.user?.email && (
                  <p className="mt-2 text-sm text-slate-400">
                    {mentor.user.email}
                  </p>
                )}

                {/* View Profile */}
                <button
                  onClick={() => {
                    console.log("Clicked mentor:", mentor);
                    console.log("Opening mentor ID:", mentor.id);

                    navigate(`/mentors/${mentor.id}`);
                  }}
                  className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  View Profile
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Mentors;
