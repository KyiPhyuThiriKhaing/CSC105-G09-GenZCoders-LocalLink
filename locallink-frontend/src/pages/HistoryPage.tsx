import {
  ClockIcon,
  CheckCircledIcon,
  ReloadIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchHistory,
  type HistoryApplicant,
  type HistoryApplication,
  type HistoryPostedJob,
} from "../lib/authApi";
import {
  updateApplicationStatus,
  updateJobStatus,
  type JobStatus,
  type ReviewStatus,
} from "../lib/jobsApi";

const IN_PROGRESS_STATUSES: HistoryApplication["status"][] = [
  "APPLIED",
  "CONTACTED",
  "OFFERED",
];

const DONE_STATUSES: HistoryApplication["status"][] = [
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
  "COMPLETED",
];

const STATUS_LABEL: Record<HistoryApplication["status"], string> = {
  APPLIED: "Applied",
  CONTACTED: "Contacted",
  OFFERED: "Offered",
  ACCEPTED: "Completed",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
  COMPLETED: "Completed",
};

const formatPostedAt = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

export default function HistoryPage() {
  const [applications, setApplications] = useState<HistoryApplication[]>([]);
  const [postedJobs, setPostedJobs] = useState<HistoryPostedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewJobId, setReviewJobId] = useState<string | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchHistory()
      .then((data) => {
        if (cancelled) return;
        setApplications(data.applications);
        setPostedJobs(data.postedJobs);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load history.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reviewJob = postedJobs.find((j) => j.id === reviewJobId) ?? null;

  const handleReviewAction = async (
    applicant: HistoryApplicant,
    next: ReviewStatus,
  ) => {
    if (!reviewJob) return;
    setUpdatingAppId(applicant.id);
    setReviewError(null);
    try {
      await updateApplicationStatus(reviewJob.id, applicant.id, next);
      setPostedJobs((prev) =>
        prev.map((job) =>
          job.id !== reviewJob.id
            ? job
            : {
                ...job,
                applications: job.applications.map((a) =>
                  a.id === applicant.id ? { ...a, status: next } : a,
                ),
              },
        ),
      );
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Unable to update.");
    } finally {
      setUpdatingAppId(null);
    }
  };

  const handleJobStatusAction = async (jobId: string, next: JobStatus) => {
    setUpdatingJobId(jobId);
    setReviewError(null);
    try {
      const updated = await updateJobStatus(jobId, next);
      setPostedJobs((prev) =>
        prev.map((job) => (job.id === jobId ? { ...job, status: updated.status } : job)),
      );
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Unable to update job.");
    } finally {
      setUpdatingJobId(null);
    }
  };

  const jobsApplied = applications.filter((a) =>
    IN_PROGRESS_STATUSES.includes(a.status),
  );
  const jobsAccepted = applications.filter((a) => DONE_STATUSES.includes(a.status));

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500">
          Loading activity…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Activity History
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Track and manage your applied jobs, tasks offered, and accepted
          engagements.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <ReloadIcon className="h-5 w-5" />
              </span>
              Jobs Applied For
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
              {jobsApplied.length} active
            </span>
          </div>

          {jobsApplied.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
              You haven't applied to any jobs yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobsApplied.map((app) => (
                <div
                  key={app.id}
                  className="group rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:border-(--color-brand-primary)/50"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${app.status === "CONTACTED" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}
                    >
                      {STATUS_LABEL[app.status]}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {app.job.payoutText ?? "—"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-(--color-brand-primary) transition-colors">
                    {app.job.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <ClockIcon className="text-slate-400" /> {app.job.location}
                  </p>
                  <div className="mt-6">
                    <Link
                      to={`/jobs/${app.job.id}`}
                      className="block w-full rounded-xl bg-slate-50 py-2.5 text-center text-sm font-bold text-slate-900 transition-all hover:bg-slate-100"
                    >
                      View Status
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CheckCircledIcon className="h-5 w-5" />
              </span>
              Tasks I'm Offering
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
              {postedJobs.length} live
            </span>
          </div>

          {postedJobs.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
              You haven't posted any jobs yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {postedJobs.map((job) => (
                <div
                  key={job.id}
                  className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:border-blue-400/50"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-3xl" />
                  <div className="pl-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        {job._count.applications} Applicants
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {job.payoutText ?? "—"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                      <ClockIcon className="text-slate-400" /> Posted{" "}
                      {formatPostedAt(job.postedAt)}
                    </p>
                    <div className="mt-6 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReviewJobId(job.id);
                          setReviewError(null);
                        }}
                        disabled={job._count.applications === 0}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                          job._count.applications === 0
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {job._count.applications === 0 ? "No Applicants" : "Review"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircledIcon className="h-5 w-5" />
              </span>
              Completed & Active
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
              {jobsAccepted.length} items
            </span>
          </div>

          {jobsAccepted.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
              No active or completed jobs yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobsAccepted.map((app) => {
                const isActive = app.status === "ACCEPTED";
                return (
                  <div
                    key={app.id}
                    className={`rounded-3xl bg-white p-6 shadow-sm border transition-all hover:shadow-lg ${isActive ? "border-emerald-200" : "border-slate-200"}`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${isActive ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}
                      >
                        {STATUS_LABEL[app.status]}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {app.job.payoutText ?? "—"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {app.job.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      With {app.job.poster.fullName}
                    </p>
                    <div className="mt-6">
                      {isActive ? (
                        <Link
                          to={`/jobs/${app.job.id}`}
                          className="block w-full rounded-xl bg-emerald-600 py-2.5 text-center text-sm font-bold text-white transition-all hover:bg-emerald-700"
                        >
                          View job page
                        </Link>
                      ) : app.status === "COMPLETED" ? (
                        <Link
                          to={`/jobs/${app.job.id}`}
                          className="block w-full rounded-xl bg-slate-50 py-2.5 text-center text-sm font-bold text-slate-900 transition-all hover:bg-slate-100"
                        >
                          View job page
                        </Link>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {reviewJob ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Review applicants
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-900">
                  {reviewJob.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleJobStatusAction(reviewJob.id, "CANCELLED")}
                  disabled={reviewJob.status === "CANCELLED" || updatingJobId === reviewJob.id}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${reviewJob.status === "CANCELLED" ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`}
                >
                  Close Applications
                </button>
                <button
                  type="button"
                  onClick={() => handleJobStatusAction(reviewJob.id, "OPEN")}
                  disabled={reviewJob.status === "OPEN" || updatingJobId === reviewJob.id}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${reviewJob.status === "OPEN" ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
                >
                  Reopen Job
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReviewJobId(null);
                    setReviewError(null);
                  }}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close"
                >
                  <Cross2Icon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {reviewError ? (
              <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                {reviewError}
              </p>
            ) : null}

            {reviewJob.applications.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-sm font-semibold text-slate-500">
                No applicants yet.
              </div>
            ) : (
              <ul className="max-h-96 space-y-3 overflow-y-auto pr-1">
                {reviewJob.applications.map((app) => (
                  <li
                    key={app.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Link
                        to={`/users/${app.applicant.id}`}
                        className="shrink-0"
                        aria-label={`View ${app.applicant.fullName} profile`}
                      >
                        <img
                          src={
                            app.applicant.avatarUrl ??
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(app.applicant.fullName)}&backgroundColor=f8fafc`
                          }
                          alt={app.applicant.fullName}
                          className="h-10 w-10 rounded-full border border-slate-200 bg-white object-cover transition hover:scale-105"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {app.applicant.fullName}
                          </p>
                          <span className="inline-flex shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 border border-slate-200">
                            {STATUS_LABEL[app.status]}
                          </span>
                        </div>
                        {app.message ? (
                          <p className="mt-1 text-sm text-slate-600">
                            "{app.message}"
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["CONTACTED", "OFFERED", "ACCEPTED", "REJECTED"] as ReviewStatus[]).map(
                        (next) => {
                          const isCurrent = app.status === next;
                          const isBusy = updatingAppId === app.id;
                          return (
                            <button
                              key={next}
                              type="button"
                              onClick={() => handleReviewAction(app, next)}
                              disabled={isBusy || isCurrent}
                              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                                isCurrent
                                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                  : next === "ACCEPTED"
                                    ? "bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                                    : next === "REJECTED"
                                      ? "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                                      : "bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
                              }`}
                            >
                              {STATUS_LABEL[next]}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
