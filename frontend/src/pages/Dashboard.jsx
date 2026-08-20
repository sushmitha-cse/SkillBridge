import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isMentor = user?.role === "MENTOR";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="text-2xl font-bold text-slate-900">
            Skill<span className="text-indigo-600">Bridge</span>
          </div>

          <div className="flex items-center gap-4">

            <span className="hidden text-sm font-semibold text-slate-600 md:block">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* Dashboard */}
      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Welcome */}
        <div className="rounded-3xl bg-indigo-600 p-8 text-white">

          <p className="text-indigo-100">
            Welcome back
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {user?.name || "User"} 👋
          </h1>

          {isMentor ? (
            <p className="mt-3 text-indigo-100">
              Ready to help students learn and grow?
            </p>
          ) : (
            <p className="mt-3 text-indigo-100">
              Ready to learn something new today?
            </p>
          )}

        </div>

        {/* MENTOR DASHBOARD */}
        {isMentor ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* Mentor Bookings */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Received Bookings
              </h2>

              <p className="mt-2 text-slate-500">
                View and manage bookings received from students.
              </p>

              <button
                onClick={() => navigate("/mentor-bookings")}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                View Bookings
              </button>

            </div>

            {/* Mentor Profile */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Mentor Profile
              </h2>

              <p className="mt-2 text-slate-500">
                Manage your bio, experience and session rate.
              </p>

              <button
                onClick={() => navigate("/mentor/profile")}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Manage Profile
              </button>

            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Availability
              </h2>

              <p className="mt-2 text-slate-500">
                Manage your available teaching slots.
              </p>

              <button
                onClick={() => navigate("/availability")}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Manage Availability
              </button>

            </div>

          </div>

        ) : (

          /* STUDENT DASHBOARD */
          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* Mentors */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Find Mentors
              </h2>

              <p className="mt-2 text-slate-500">
                Discover mentors and learn new skills.
              </p>

              <button
                onClick={() => navigate("/mentors")}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Find Mentors
              </button>

            </div>

            {/* Bookings */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-bold text-slate-900">
                My Bookings
              </h2>

              <p className="mt-2 text-slate-500">
                View your upcoming learning sessions.
              </p>

              <button
                onClick={() => navigate("/bookings")}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                View Bookings
              </button>

            </div>

            {/* Profile */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-bold text-slate-900">
                My Profile
              </h2>

              <p className="mt-2 text-slate-500">
                Manage your SkillBridge profile.
              </p>

              <button
                onClick={() => navigate("/profile")}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                View Profile
              </button>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}

export default Dashboard;
