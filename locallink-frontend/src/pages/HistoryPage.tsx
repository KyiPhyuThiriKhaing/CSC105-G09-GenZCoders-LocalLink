import { ClockIcon, CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  MOCK_HISTORY_APPLIED,
  MOCK_HISTORY_OFFERED,
  MOCK_HISTORY_ACCEPTED,
} from "../data/mockJobs";

export default function HistoryPage() {
  const jobsApplied = MOCK_HISTORY_APPLIED;
  const jobsOffered = MOCK_HISTORY_OFFERED;
  const jobsAccepted = MOCK_HISTORY_ACCEPTED;

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobsApplied.map((job) => (
              <div
                key={job.title}
                className="group rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:border-(--color-brand-primary)/50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${job.status === "Contacted" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}
                  >
                    {job.status}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {job.price}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-(--color-brand-primary) transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                  <ClockIcon className="text-slate-400" /> {job.location}
                </p>
                <div className="mt-6">
                  <button className="w-full rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100">
                    View Status
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              {jobsOffered.length} live
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobsOffered.map((job) => (
              <div
                key={job.title}
                className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:border-blue-400/50"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-3xl" />
                <div className="pl-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      {job.applicants} Applicants
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {job.price}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <ClockIcon className="text-slate-400" /> Posted {job.date}
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobsAccepted.map((job) => (
              <div
                key={job.title}
                className={`rounded-3xl bg-white p-6 shadow-sm border transition-all hover:shadow-lg ${job.active ? "border-emerald-200" : "border-slate-200"}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${job.active ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}
                  >
                    {job.active ? "Active" : "Completed"}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {job.price}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  With {job.user}
                </p>
                <div className="mt-6">
                  {job.active ? (
                    <button className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700">
                      Message
                    </button>
                  ) : (
                    <button className="w-full rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
