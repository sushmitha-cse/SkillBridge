import { ArrowRight, PlayCircle, Users, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">

        {/* Left side */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Learn from experienced mentors
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Your skills.
            <br />
            Your mentor.
            <br />
            <span className="text-indigo-600">Your future.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            SkillBridge connects students with experienced mentors who can
            guide them through real-world skills, projects, and career goals.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Start Learning
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <PlayCircle size={19} />
              How it works
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle size={17} className="text-green-500" />
              Personalized learning
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={17} className="text-green-500" />
              Flexible sessions
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-lg">

            {/* Main card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Recommended mentor
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Find your perfect match
                  </h2>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Users size={24} />
                </div>
              </div>

              {/* Mentor card */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                    AK
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      Alex Kumar
                    </h3>

                    <p className="text-sm text-slate-500">
                      Full Stack Developer
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-semibold text-slate-700">
                        4.9
                      </span>
                      <span className="text-slate-400">
                        · 120+ sessions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Experience</p>
                    <p className="mt-1 font-bold text-slate-900">5 yrs</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Sessions</p>
                    <p className="mt-1 font-bold text-slate-900">120+</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Rate</p>
                    <p className="mt-1 font-bold text-slate-900">₹500/hr</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  View Mentor
                </button>
              </div>
            </div>

            {/* Floating rating card */}
            <div className="absolute -left-8 top-20 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-2.5 text-green-600">
                  <Star size={20} className="fill-current" />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900">4.9/5</p>
                  <p className="text-xs text-slate-500">Mentor rating</p>
                </div>
              </div>
            </div>

            {/* Floating users card */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs font-medium text-slate-500">
                Growing community
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                1,000+ learners
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
