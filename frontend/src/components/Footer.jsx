import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-12 text-slate-300 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 md:grid-cols-4">

          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <GraduationCap size={22} />
              </div>

              <span className="text-xl font-bold text-white">
                Skill<span className="text-indigo-400">Bridge</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              A platform connecting learners with experienced mentors for
              personalized learning and professional growth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Platform
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                to="/mentors"
                className="block hover:text-white"
              >
                Find Mentors
              </Link>

              <Link
                to="/register"
                className="block hover:text-white"
              >
                Become a Mentor
              </Link>

              <a
                href="#how-it-works"
                className="block hover:text-white"
              >
                How It Works
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Company
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <a
                href="#about"
                className="block hover:text-white"
              >
                About
              </a>

              <a
                href="#"
                className="block hover:text-white"
              >
                Contact
              </a>

              <a
                href="#"
                className="block hover:text-white"
              >
                Privacy Policy
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
