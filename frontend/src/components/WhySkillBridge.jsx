import {
  Target,
  ShieldCheck,
  Clock3,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Personalized Guidance",
    description:
      "Find mentors based on your skills, interests, and learning goals.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Mentors",
    description:
      "Learn from mentors with experience, ratings, and real-world knowledge.",
  },
  {
    icon: Clock3,
    title: "Flexible Scheduling",
    description:
      "Choose available time slots that fit your schedule.",
  },
  {
    icon: MessageCircle,
    title: "One-on-One Sessions",
    description:
      "Get focused guidance and ask questions directly from your mentor.",
  },
];

function WhySkillBridge() {
  return (
    <section id="about" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Why SkillBridge
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              More than learning.
              <br />
              <span className="text-indigo-600">
                It's about growing.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              SkillBridge makes it easier for students to connect with the
              right people, get practical guidance, and turn their learning
              into real progress.
            </p>

            <div className="mt-8 rounded-2xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-600/20">
              <p className="text-3xl font-bold">1,000+</p>
              <p className="mt-1 text-indigo-100">
                learners building their skills
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhySkillBridge;
