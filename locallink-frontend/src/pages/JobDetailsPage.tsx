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
  description: `I need an extra pair of hands to help move a small couch, a coffee table, and a few boxes from my living room downstairs to a moving truck.\n\nThere is an elevator in the building, so no heavy lifting down the stairs is required. The items are not overly heavy, but definitely require two people to carry safely without scratching the walls.\n\nI'll be there to help lift, I just need one extra person. Should take about an hour, maybe a bit more depending on how fast we move.`,
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
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <Link to="/jobs" className="group inline-flex items-center gap-2 mb-8 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white transition-transform group-hover:-translate-x-1">
            <ArrowLeftIcon className="h-4 w-4" />
          </div>
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <img src={job.image} alt={job.title} className="h-full w-full object-cover" />
                <div className="absolute top-6 right-6 inline-flex h-8 items-center rounded-full bg-white/90 backdrop-blur-md px-4 text-xs font-bold tracking-wide text-slate-900 shadow-sm">
                  {job.postedAt}
                </div>
              </div>

              <div className="px-6 py-10 sm:px-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                  {job.title}
                </h1>

                <div className="mt-8 flex flex-wrap gap-4 border-y border-slate-100 py-6">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100">
                      <DrawingPinIcon className="h-5 w-5 text-[var(--color-brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Location</p>
                      <span className="text-sm font-bold text-slate-900">{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100">
                      <ClockIcon className="h-5 w-5 text-[var(--color-brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</p>
                      <span className="text-sm font-bold text-slate-900">{job.timeRange}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="mb-6 text-xl font-bold text-slate-900">About the Job</h2>
                  <div className="space-y-4">
                    {job.description.split('\n').filter(Boolean).map((paragraph, idx) => (
                      <p key={idx} className="text-base leading-relaxed text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[2rem] bg-white p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100 text-center">
                <span className="inline-block rounded-full bg-[var(--color-brand-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">Payout</span>
                <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{job.feeRange}</p>
                <div className="mt-8 flex flex-col gap-3">
                  <button className="w-full rounded-2xl bg-[var(--color-brand-primary)] py-4 text-sm font-bold text-white shadow-lg shadow-[var(--color-brand-primary)]/25 transition-all hover:scale-[1.02] hover:bg-[var(--color-brand-primary-hover)]">
                    Apply Now
                  </button>
                  <button className="w-full rounded-2xl border-2 border-slate-100 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                    Save for Later
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Posted By</h3>
                <div className="flex items-center gap-4">
                  <img src={job.poster.avatar} alt={job.poster.name} className="h-14 w-14 rounded-full border-2 border-white shadow-md object-cover" />
                  <div>
                    <p className="text-base font-bold text-slate-900">{job.poster.name}</p>
                    <p className="text-sm text-slate-500">Verified Local</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-xl bg-slate-50 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100">
                  Message Poster
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky Apply bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl lg:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Payout</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{job.feeRange}</p>
          </div>
          <button className="flex-1 rounded-2xl bg-[var(--color-brand-primary)] py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--color-brand-primary)]/20 active:scale-95">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
