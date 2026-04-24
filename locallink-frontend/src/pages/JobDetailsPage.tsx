import { ArrowLeftIcon, DrawingPinIcon, ClockIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";

const MOCK_JOB_DETAIL = {
  id: "1",
  title: "Help move small furniture",
  image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  location: "Downtown / 1.2 miles away",
  feeRange: "฿200 - ฿350",
  timeRange: "1–2 hours",
  postedAt: "2h ago",
  description: `I need an extra pair of hands to help move a small couch, a coffee table, and a few boxes from my living room downstairs to a moving truck.

There is an elevator in the building, so no heavy lifting down the stairs is required. The items are not overly heavy, but definitely require two people to carry safely without scratching the walls.

I'll be there to help lift, I just need one extra person. Should take about an hour, maybe a bit more depending on how fast we move.`,
  poster: {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
};

export default function JobDetailsPage() {
  const { id } = useParams();
  void id;
  const job = MOCK_JOB_DETAIL;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 lg:pb-16">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-5">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-brand-primary)]"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Main Content */}
          <div className="space-y-5 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-border-soft)] bg-white shadow-sm">
              <div className="relative h-52 w-full bg-[var(--color-brand-soft)] sm:h-72 md:h-80">
                <img
                  src={job.image}
                  alt={job.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-[var(--color-ink-strong)] shadow-sm">
                  {job.postedAt}
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <h1 className="mb-4 text-xl font-bold tracking-tight text-[var(--color-ink-strong)] sm:text-2xl md:text-3xl">
                  {job.title}
                </h1>

                <div className="mb-6 flex flex-wrap gap-3 border-b border-[var(--color-ink-border-faint)] pb-5 sm:gap-6">
                  <div className="flex items-center gap-2 text-[var(--color-ink-strong)]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-soft)]">
                      <DrawingPinIcon className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    </div>
                    <span className="text-sm font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-ink-strong)]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-soft)]">
                      <ClockIcon className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    </div>
                    <span className="text-sm font-medium">{job.timeRange}</span>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3 text-base font-bold text-[var(--color-ink-strong)]">Job Description</h2>
                  <div className="space-y-3">
                    {job.description.split('\n').filter(Boolean).map((paragraph, idx) => (
                      <p key={idx} className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-white p-6 shadow-sm">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Estimated Payout</p>
                <p className="mb-5 text-2xl font-bold text-[var(--color-ink-strong)]">{job.feeRange}</p>
                <div className="space-y-2.5">
                  <button className="w-full rounded-xl bg-[var(--color-brand-primary)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]">
                    Apply for Job
                  </button>
                  <button className="w-full rounded-xl border border-[var(--color-ink-border-soft)] py-3 text-sm font-semibold text-[var(--color-ink-strong)] transition hover:bg-[var(--color-brand-soft)] focus-visible:outline-none">
                    Save for Later
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-white p-6 shadow-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">About the Poster</p>
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={job.poster.avatar}
                    alt={job.poster.name}
                    className="h-12 w-12 rounded-full border border-[var(--color-ink-border-soft)] object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-[var(--color-ink-strong)]">{job.poster.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Local Resident</p>
                  </div>
                </div>
                <button className="w-full rounded-xl bg-[var(--color-brand-soft)] py-2.5 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:bg-[var(--color-brand-primary)] hover:text-white focus-visible:outline-none">
                  Contact Poster
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile sticky Apply bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--color-ink-border-soft)] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-[var(--color-text-muted)]">Estimated payout</p>
            <p className="text-base font-bold text-[var(--color-ink-strong)]">{job.feeRange}</p>
          </div>
          <button className="rounded-xl bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]">
            Apply for Job
          </button>
        </div>
      </div>
    </div>
  );
}
