import {
  CalendarIcon,
  Cross2Icon,
  EnvelopeClosedIcon,
  FileTextIcon,
  MobileIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useEffect } from "react";
import type { Submission, SubmissionStatus } from "../types";

type AdminSubmissionDetailsPanelProps = {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
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

export default function AdminSubmissionDetailsPanel({ submission, isOpen, onClose }: AdminSubmissionDetailsPanelProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button
        type="button"
        aria-label="Close details panel"
        onClick={onClose}
        className={`absolute inset-0 z-0 bg-[rgba(31,18,51,0.45)] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        className={`absolute right-0 top-0 z-10 h-dvh w-full max-w-full overflow-y-auto overscroll-y-contain border-l border-[var(--color-ink-border-faint)] bg-white shadow-[-14px_0_38px_rgba(31,18,51,0.24)] transition-transform duration-300 ease-out sm:w-[30rem] md:w-[34rem] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Submission details"
      >
        {submission ? (
          <div className="flex min-h-full flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-ink-border-faint)] bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-ink-strong)]">Submission Details</h2>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">Review user account documents</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-ink-border-soft)] text-[var(--color-text-muted)] transition hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white"
              >
                <Cross2Icon />
              </button>
            </div>

            <div className="flex-1 space-y-5 px-4 py-5 sm:px-6">
              <section className="rounded-xl border border-[var(--color-ink-border-faint)] bg-white p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[var(--color-brand-primary)] text-3xl font-extrabold text-white">
                    {getInitials(submission.name)}
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold text-[var(--color-ink-strong)]">{submission.name}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">{submission.email}</p>
                </div>
              </section>

              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[submission.status]}`}>
                {submission.status}
              </span>

              <section className="rounded-xl border border-[var(--color-ink-border-faint)] bg-brand-soft/45 p-4">
                <h3 className="text-sm font-bold text-[var(--color-ink-strong)]">User Information</h3>
                <dl className="mt-3 grid grid-cols-1 gap-2 text-sm text-[var(--color-text-muted)] sm:grid-cols-2">
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <PersonIcon className="mt-0.5 text-[var(--color-brand-primary)]" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">Full Name</dt>
                      <dd className="mt-0.5 font-medium text-[var(--color-ink-strong)]">{submission.name}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <EnvelopeClosedIcon className="mt-0.5 text-[var(--color-brand-primary)]" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">Email</dt>
                      <dd className="mt-0.5 font-medium text-[var(--color-ink-strong)] break-all">{submission.email}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <MobileIcon className="mt-0.5 text-[var(--color-brand-primary)]" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">Phone</dt>
                      <dd className="mt-0.5 font-medium text-[var(--color-ink-strong)]">{submission.phone}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <CalendarIcon className="mt-0.5 text-[var(--color-brand-primary)]" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">Submitted</dt>
                      <dd className="mt-0.5 font-medium text-[var(--color-ink-strong)]">{submission.date}</dd>
                    </div>
                  </div>
                </dl>
              </section>

              <section>
                <h3 className="text-sm font-bold text-[var(--color-ink-strong)]">User Notes</h3>
                <p className="mt-2 rounded-xl border border-[var(--color-ink-border-faint)] bg-white p-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {submission.notes}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-[var(--color-ink-strong)]">Uploaded Documents</h3>
                <ul className="mt-2 space-y-2">
                  {submission.documents.map((documentName) => (
                    <li
                      key={documentName}
                      className="flex items-center gap-2 rounded-xl border border-[var(--color-ink-border-faint)] bg-white px-3 py-2 text-sm text-[var(--color-ink-strong)]"
                    >
                      <FileTextIcon className="text-brand-primary" />
                      <span className="break-all">{documentName}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="sticky bottom-0 border-t border-[var(--color-ink-border-faint)] bg-white px-4 py-4 sm:px-6">
              <h3 className="text-sm font-bold text-[var(--color-ink-strong)]">Admin Actions</h3>
              <textarea
                placeholder="Add optional admin comment..."
                rows={3}
                className="mt-3 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 py-2 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)]"
              />
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    const shouldApprove = window.confirm(
                      "Are you sure you want to approve this submission?",
                    );

                    if (!shouldApprove) {
                      return;
                    }

                    window.alert("Submission approved (UI placeholder).");
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const shouldReject = window.confirm(
                      "Are you sure you want to reject this submission?",
                    );

                    if (!shouldReject) {
                      return;
                    }

                    window.alert("Submission rejected (UI placeholder).");
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
