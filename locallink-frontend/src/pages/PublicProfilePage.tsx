import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";

export default function PublicProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient
      .get<{ data: any }>(`/users/${id}`)
      .then((res) => setUser(res.data.data))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load user."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading profile…</div>;
  if (error || !user) return <div className="p-6 text-red-600">{error ?? "User not found."}</div>;

  const joinedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleString("en-US", { month: "long", year: "numeric" })
    : "—";

  const aboutRows = [
    { icon: <PersonIcon className="h-5 w-5" />, label: "Name", value: user.fullName },
    { icon: <EnvelopeClosedIcon className="h-5 w-5" />, label: "Email", value: user.email ?? "Hidden" },
    { icon: <MobileIcon className="h-5 w-5" />, label: "Phone", value: user.phone ?? "Hidden" },
    { icon: <CalendarIcon className="h-5 w-5" />, label: "Joined", value: joinedDate },
  ];

  const reviews = Array.isArray(user.reviews) ? user.reviews : [];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8 space-y-12">
      <div className="group relative -mx-4 overflow-hidden rounded-b-[3rem] bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 pb-16 pt-32 sm:-mx-6 sm:rounded-[3rem] sm:pt-40 lg:-mx-8 lg:rounded-[4em]">
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <div className="relative mx-auto mb-6 h-32 w-32 shrink-0">
            <img
              src={user.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.fullName)}`}
              alt={user.fullName}
              className="h-full w-full rounded-4xl border-4 border-white/10 bg-white object-cover shadow-2xl"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{user.fullName}</h1>
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-3">
        <div className="sm:col-span-1 space-y-10">
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">About</h2>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <ul className="space-y-4">
                {aboutRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-0.5 text-slate-400">{row.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{row.label}</p>
                      <p className="truncate text-sm font-bold text-slate-900">{row.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Verifications</h2>
            <div className="space-y-3">
              {user.emailVerifiedAt ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100"><CheckCircledIcon/></span>
                  <span className="text-sm font-bold">Email verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-orange-500">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100"><ExclamationTriangleIcon/></span>
                  <span className="text-sm font-bold">Email not verified</span>
                </div>
              )}

              {user.idVerifiedAt ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100"><CheckCircledIcon/></span>
                  <span className="text-sm font-bold">Document verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100"><ExclamationTriangleIcon/></span>
                  <span className="text-sm font-bold">Document not verified</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="sm:col-span-2 space-y-12">
          <section>
            <h2 className="mb-6 text-xl font-bold text-slate-900">Bio</h2>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
              {user.bio ?? "No bio provided."}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-bold text-slate-900">Skills & Services</h2>
            <div className="flex flex-wrap gap-2">
              {(user.skills ?? []).length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500">No skills listed.</div>
              ) : (
                (user.skills ?? []).map((s: string) => (
                  <span key={s} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">{s}</span>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-bold text-slate-900">Recent Reviews</h2>
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500">
                No reviews yet.
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review: any) => (
                  <div key={review.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      {review.reviewer?.id ? (
                        <Link to={`/users/${review.reviewer.id}`} className="shrink-0">
                          <img
                            src={review.reviewer.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(review.reviewer.fullName)}`}
                            alt={review.reviewer.fullName}
                            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                          />
                        </Link>
                      ) : (
                        <img
                          src={review.reviewer.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(review.reviewer.fullName)}`}
                          alt={review.reviewer.fullName}
                          className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        {review.reviewer?.id ? (
                          <Link to={`/users/${review.reviewer.id}`} className="text-inherit">
                            <p className="truncate text-sm font-bold text-slate-900">{review.reviewer.fullName}</p>
                          </Link>
                        ) : (
                          <p className="truncate text-sm font-bold text-slate-900">{review.reviewer.fullName}</p>
                        )}
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {review.deletedAt ? (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                              Review Deleted
                            </span>
                          ) : (
                            <div className="flex items-center gap-1 text-amber-500">
                              {Array.from({ length: review.rating }).map((_, index) => (
                                <StarFilledIcon key={index} className="h-3.5 w-3.5" />
                              ))}
                            </div>
                          )}
                          {review.editedAt && !review.deletedAt ? (
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                              Edited
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-slate-500">for {review.job.title}</p>
                        {review.comment && !review.deletedAt ? (
                          <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
