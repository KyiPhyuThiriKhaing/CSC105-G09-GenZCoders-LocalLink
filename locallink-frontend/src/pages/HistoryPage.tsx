import { ClockIcon, CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
  fetchHistory,
  type HistoryApplication,
  type HistoryPostedJob,
} from "../lib/authApi";

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
  ACCEPTED: "Active",
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
                    <button className="w-full rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100">
                      View Status
                    </button>
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
                      <button className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700">
                        Review
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
                        <button className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700">
                          Message
                        </button>
                      ) : app.status === "COMPLETED" ? (
                        <button className="w-full rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100">
                          Leave Review
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
