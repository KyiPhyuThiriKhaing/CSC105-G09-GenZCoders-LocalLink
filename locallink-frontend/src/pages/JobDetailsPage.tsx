import {
  ArrowLeftIcon,
  DrawingPinIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";
import { MOCK_JOBS } from "../data/mockJobs";

export default function JobDetailsPage() {
  const { id } = useParams();
  const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          to="/jobs"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-8 overflow-hidden rounded-4xl bg-slate-100">
              <div className="relative aspect-4/3 w-full lg:aspect-video">
                <img
                  src={job.image}
                  alt={job.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4 inline-flex h-8 items-center rounded-full bg-white/90 backdrop-blur-md px-3 text-xs font-bold tracking-wide text-slate-900 shadow-sm">
                  {job.postedAt}
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              {job.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-slate-200 py-6">
              <div className="flex items-center gap-3">
                <DrawingPinIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Location</p>
                  <span className="text-sm font-bold text-slate-900">{job.location}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</p>
                  <span className="text-sm font-bold text-slate-900">{job.timeRange}</span>
                </div>
              </div>
            </div>

            {/* Mobile Poster Snapshot */}
            <div className="mt-8 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-4">
                <img
                  src={job.poster.avatar}
                  alt={job.poster.name}
                  className="h-12 w-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="text-base font-bold text-slate-900">
                    Posted by {job.poster.name}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    Verified Local
                  </p>
                </div>
              </div>
              <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-200">
                Message
              </button>
            </div>

            <div className="mt-10 mb-8 border-t border-slate-200 pt-8 lg:mt-12 lg:border-t-0 lg:pt-0">
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                About the Job
              </h2>
              <div className="space-y-4">
                {job.description
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:col-span-5 xl:col-span-4 lg:block">
            <div className="sticky top-28 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Payout
                  </p>
                  <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
                    {job.feeRange}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full rounded-2xl bg-(--color-brand-primary) py-4 text-base font-bold text-white shadow-md shadow-(--color-brand-primary)/20 transition-transform active:scale-[0.98] hover:bg-(--color-brand-primary-hover)">
                  Apply Now
                </button>
                <button className="w-full rounded-2xl bg-slate-100 py-4 text-base font-bold text-slate-900 transition-colors hover:bg-slate-200">
                  Save for Later
                </button>
              </div>

              <div className="my-6 border-t border-slate-200"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={job.poster.avatar}
                    alt={job.poster.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {job.poster.name}
                    </p>
                    <p className="text-xs text-slate-500">Verified Local</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-(--color-brand-primary) hover:underline">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky Apply bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Payout
            </p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">
              {job.feeRange}
            </p>
          </div>
          <button className="flex-1 rounded-2xl bg-(--color-brand-primary) py-3.5 text-sm font-bold text-white shadow-lg shadow-(--color-brand-primary)/20 active:scale-95">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
