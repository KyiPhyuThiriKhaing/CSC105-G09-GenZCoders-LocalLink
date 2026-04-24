import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, ClockIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { getJobs } from "../data/mockJobs";

export default function JobsPage() {
  const [jobs, setJobs] = useState(() => getJobs());
  useEffect(() => {
    setJobs(getJobs());
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-linear-to-b from-(--color-brand-soft)/50 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-4">
              Local{" "}
              <span className="text-(--color-brand-primary)">Mini Jobs</span>
            </h1>
            <p className="text-lg text-slate-600">
              Discover opportunities nearby. Help your neighbors and earn
              quickly on your own schedule.
            </p>
          </div>

          <div className="mx-auto max-w-3xl flex flex-col gap-4 sm:flex-row shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl sm:rounded-full bg-white p-2 border border-slate-100">
            <div className="relative flex-1 flex items-center bg-white rounded-full">
              <MagnifyingGlassIcon className="absolute left-5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-4 pl-14 pr-6 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <Link
              to="/jobs/post"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-brand-primary) px-8 py-4 text-sm font-bold text-white shadow-lg shadow-(--color-brand-primary)/25 transition-all hover:bg-(--color-brand-primary-hover) hover:scale-[1.02]"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Latest Opportunities
          </h2>
          <span className="text-sm font-medium text-slate-500">
            {filteredJobs.length} jobs available
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-white py-24 px-6 text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
            <p className="mt-2 text-slate-500 max-w-sm">
              We couldn't find anything matching "{searchQuery}". Try searching
              with different keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-white border border-slate-200 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(15,23,42,0.18)] focus-visible:ring-4 focus-visible:ring-(--color-brand-focus-ring)"
              >
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-100" />
                  <img
                    src={job.image}
                    alt={job.title}
                    className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 z-20 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
                    {job.postedAt}
                  </div>
                </div>

                <div className="flex grow flex-col p-4 sm:p-5">
                  <h3 className="mb-3 text-lg font-semibold leading-tight text-slate-900 line-clamp-2 group-hover:text-(--color-brand-primary) transition-colors">
                    {job.title}
                  </h3>

                  <div className="space-y-2 mb-5 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <DrawingPinIcon className="h-4 w-4 text-slate-400 group-hover:text-(--color-brand-primary) transition-colors" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-slate-400 group-hover:text-(--color-brand-primary) transition-colors" />
                      <span>{job.timeRange}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
                    <span className="font-bold text-slate-900">{job.feeRange}</span>
                    <span className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-3 py-1.5 font-semibold text-(--color-brand-primary) transition-colors group-hover:bg-(--color-brand-soft)">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
