import type { Submission, SubmissionStatus } from "../types";

type AdminSubmissionCardProps = {
  submission: Submission;
  onReview: (submission: Submission) => void;
};

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function AdminSubmissionCard({
  submission,
  onReview,
}: AdminSubmissionCardProps) {
  return (
    <article className="rounded-2xl border border-(--color-ink-border-faint) bg-white p-4 shadow-[0_10px_24px_rgba(31,18,51,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(152,16,250,0.14)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-(--color-brand-primary) text-sm font-bold text-white">
            {getInitials(submission.name)}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-(--color-ink-strong) sm:text-lg">
              {submission.name}
            </h3>
            <p className="mt-1 text-sm text-(--color-text-muted) break-all">
              {submission.email}
            </p>
            <p className="mt-1 text-xs text-(--color-text-muted)">
              Submitted on {submission.date}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[submission.status]}`}
        >
          {submission.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-(--color-text-muted)">
        <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand-primary">
          {submission.documents.length} document
          {submission.documents.length === 1 ? "" : "s"}
        </span>
        {submission.documents.slice(0, 3).map((doc) => (
          <span
            key={doc}
            className="rounded-full border border-(--color-ink-border-faint) px-2.5 py-1"
          >
            {doc}
          </span>
        ))}
        {submission.documents.length > 3 ? (
          <span className="rounded-full border border-(--color-ink-border-faint) px-2.5 py-1">
            +{submission.documents.length - 3} more
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => onReview(submission)}
          className="inline-flex items-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
        >
          Click to review →
        </button>
      </div>
    </article>
  );
}
