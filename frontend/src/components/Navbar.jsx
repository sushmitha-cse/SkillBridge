import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <GraduationCap size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Skill<span className="text-indigo-600">Bridge</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#mentors"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Find Mentors
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            About
          </a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">

            <a
              href="#mentors"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700"
            >
              Find Mentors
            </a>

            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700"
            >
              How It Works
            </a>

            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700"
            >
              About
            </a>

            <div className="flex gap-3 border-t border-slate-200 pt-4">
              <Link
                to="/login"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-center font-semibold"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-center font-semibold text-white"
              >
                Get Started
              </Link>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
