import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Star,
} from "lucide-react";
import api from "../services/api";

function MentorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const [mentorResponse, reviewResponse] = await Promise.all([
          api.get(`/mentors/${id}`),
          api.get(`/reviews/mentor/${id}`),
        ]);

        console.log("Mentor details:", mentorResponse.data);
        console.log("Mentor reviews:", reviewResponse.data);

        setMentor(mentorResponse.data.data);
        setReviews(reviewResponse.data.data || []);
      } catch (err) {
        console.error("Failed to fetch mentor:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load mentor profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading mentor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl bg-red-50 p-6 text-red-600">
            {error}
          </div>

          <Link
            to="/mentors"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Mentors
          </Link>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Mentor not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to="/mentors"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Mentors
        </Link>

        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          {/* Header */}
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-4xl font-bold text-indigo-600">
              {mentor.user?.name?.charAt(0)?.toUpperCase() || "M"}
            </div>

            {/* Name */}
            <div className="mt-5 sm:ml-6 sm:mt-0">
              <h1 className="text-3xl font-bold text-slate-900">
                {mentor.user?.name || "Mentor"}
              </h1>

              <p className="mt-2 text-slate-500">
                {mentor.bio ||
                  "Experienced SkillBridge mentor ready to help you learn."}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">

            {mentor.user?.email && (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <Mail className="text-indigo-600" size={20} />

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="font-medium text-slate-700">
                    {mentor.user.email}
                  </p>
                </div>
              </div>
            )}

            {mentor.user?.phone && (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <Phone className="text-indigo-600" size={20} />

                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="font-medium text-slate-700">
                    {mentor.user.phone}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold text-slate-900">
              Skills
            </h2>

            {mentor.skills?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {mentor.skills.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600"
                  >
                    {item.skill?.name || "Skill"}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-slate-500">
                No skills added yet.
              </p>
            )}
          </div>

          {/* Book Button */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <button
              onClick={() =>
                navigate(`/bookings/new?mentorId=${mentor.id}`)
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              <Calendar size={20} />
              Book a Session
            </button>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Student Reviews
              </h2>

              <p className="mt-1 text-slate-500">
                Feedback from students who learned with this mentor.
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-xl bg-yellow-50 px-4 py-2">
              <Star
                size={20}
                fill="currentColor"
                className="text-yellow-400"
              />

              <span className="font-bold text-slate-700">
                {reviews.length > 0
                  ? (
                      reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) / reviews.length
                    ).toFixed(1)
                  : "0.0"}
              </span>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">
              <Star
                size={42}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-500">
                No reviews yet.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {review.student?.user?.name ||
                          "Student"}
                      </h3>

                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={17}
                            fill={
                              star <= review.rating
                                ? "currentColor"
                                : "none"
                            }
                            className={
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-slate-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <span className="text-xs text-slate-400">
                      {review.createdAt
                        ? new Date(
                            review.createdAt
                          ).toLocaleDateString("en-IN")
                        : ""}
                    </span>

                  </div>

                  {review.comment && (
                    <p className="mt-4 text-slate-600">
                      {review.comment}
                    </p>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default MentorProfile;

