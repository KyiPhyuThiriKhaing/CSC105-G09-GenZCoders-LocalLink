import AdminSubmissionCard from "./AdminSubmissionCard";
import type { Submission } from "../types";

type AdminSubmissionListProps = {
  submissions: Submission[];
  onReview: (submission: Submission) => void;
};

export default function AdminSubmissionList({
  submissions,
  onReview,
}: AdminSubmissionListProps) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-(--color-ink-border-soft) bg-white/70 px-4 py-10 text-center text-sm text-(--color-text-muted)">
        No submissions on this page.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {submissions.map((submission) => (
        <AdminSubmissionCard
          key={submission.id}
          submission={submission}
          onReview={onReview}
        />
      ))}
    </div>
  );
}
