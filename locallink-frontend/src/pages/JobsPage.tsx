import React, { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon, ClockIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const MOCK_JOBS = [
  {
    id: "1",
    title: "Help move small furniture",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Downtown / 1.2 miles away",
    feeRange: "฿200 - ฿350",
    timeRange: "1–2 hours",
    postedAt: "2h ago",
  },
  {
    id: "2",
    title: "Dog walking (2 dogs)",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Westside Park / 0.5 miles away",
    feeRange: "฿150 - ฿200",
    timeRange: "45 mins",
    postedAt: "4h ago",
  },
  {
    id: "3",
    title: "High-school Math Tutoring",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Local Library / 3.0 miles away",
    feeRange: "฿300 - ฿400 / hr",
    timeRange: "1.5 hours",
    postedAt: "5h ago",
  },
  {
    id: "4",
    title: "Grocery Pickup & Delivery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Whole Foods / 2.1 miles away",
    feeRange: "฿150 + tips",
    timeRange: "1 hour",
    postedAt: "1d ago",
  },
  {
    id: "5",
    title: "Assemble IKEA desk",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "North Suburbs / 4.5 miles away",
    feeRange: "฿400 - ฿550",
    timeRange: "2–3 hours",
    postedAt: "1d ago",
  },
  {
    id: "6",
    title: "Yard work & Leaf raking",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    location: "Eastside / 2.8 miles away",
    feeRange: "฿250 - ฿400",
    timeRange: "3 hours",
    postedAt: "2d ago",
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = MOCK_JOBS.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pb-16">
      <div className="border-b border-[var(--color-ink-border-soft)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--color-ink-strong)] sm:text-2xl">
                Mini Jobs
              </h1>
              <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                Find local chores and earn quickly
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-4 w-4 text-[var(--color-text-muted)]" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white py-2.5 pl-9 pr-3 text-sm text-[var(--color-ink-strong)] placeholder:text-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
                />
              </div>
              <button className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none sm:shrink-0">
                <PlusIcon className="h-4 w-4" />
                Post Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {filteredJobs.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[var(--color-text-muted)]">No jobs found matching &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-ink-border-soft)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 right-3 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-[var(--color-ink-strong)] shadow-sm">
                    {job.postedAt}
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-5">
                  <h3 className="mb-3 text-base font-bold leading-snug text-[var(--color-ink-strong)] line-clamp-2">
                    {job.title}
                  </h3>

                  <div className="mt-auto mb-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                      <DrawingPinIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-primary)]" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                      <ClockIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-primary)]" />
                      <span>{job.timeRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--color-ink-border-faint)] pt-4">
                    <span className="text-base font-bold text-[var(--color-ink-strong)]">
                      {job.feeRange}
                    </span>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="rounded-lg bg-[var(--color-brand-soft)] px-4 py-1.5 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:bg-[var(--color-brand-primary)] hover:text-white focus-visible:outline-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
