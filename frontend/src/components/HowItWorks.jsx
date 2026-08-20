import { Search, CalendarCheck, GraduationCap, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Mentor",
    description:
      "Explore mentors based on their skills, experience, ratings, and hourly rates to find someone who matches your goals.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book a Session",
    description:
      "Check mentor availability and choose a convenient time for your personalized learning session.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Learn & Grow",
    description:
      "Connect with your mentor, gain practical knowledge, work on your skills, and take the next step toward your goals.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Simple process
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How SkillBridge works
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Getting the right guidance shouldn't be complicated. Find your
            mentor, book a session, and start learning.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">

                {/* Card */}
                <div className="group h-full rounded-3xl border border-slate-200 bg-slate-50 p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5">

                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                      <Icon size={27} />
                    </div>

                    <span className="text-5xl font-bold text-slate-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    Learn more
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden translate-x-1/2 md:block">
                    <ArrowRight
                      size={24}
                      className="text-slate-300"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
