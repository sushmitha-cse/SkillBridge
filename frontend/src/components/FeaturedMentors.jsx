import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const mentors = [
  {
    name: "Alex Kumar",
    skill: "Full Stack Development",
    experience: "5 years",
    rating: "4.9",
    sessions: "120+",
    rate: "₹500/hr",
    initials: "AK",
  },
  {
    name: "Priya Sharma",
    skill: "Python & Data Science",
    experience: "4 years",
    rating: "4.8",
    sessions: "95+",
    rate: "₹600/hr",
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    skill: "Java Development",
    experience: "6 years",
    rating: "4.9",
    sessions: "150+",
    rate: "₹550/hr",
    initials: "RV",
  },
];

function FeaturedMentors() {
  return (
    <section id="mentors" className="bg-slate-50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Meet our mentors
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Learn from people who know the way
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Connect with experienced professionals and get guidance that
              matches your learning goals.
            </p>
          </div>

          <Link
            to="/mentors"
            className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all mentors
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
                  {mentor.initials}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {mentor.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {mentor.skill}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Star
                  size={17}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-bold text-slate-900">
                  {mentor.rating}
                </span>

                <span className="text-sm text-slate-400">
                  ({mentor.sessions} sessions)
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Experience</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {mentor.experience}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Rate</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {mentor.rate}
                  </p>
                </div>
              </div>

              <Link
                to="/mentors"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-indigo-600"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedMentors;
