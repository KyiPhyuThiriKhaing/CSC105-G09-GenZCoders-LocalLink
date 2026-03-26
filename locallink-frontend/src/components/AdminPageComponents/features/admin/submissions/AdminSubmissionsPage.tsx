import { useMemo, useState } from "react";
import AdminPagination from "./components/AdminPagination";
import AdminSubmissionDetailsPanel from "./components/AdminSubmissionDetailsPanel";
import AdminSubmissionList from "./components/AdminSubmissionList";
import type { Submission } from "./types";

const SUBMISSIONS: Submission[] = [
  {
    id: 1,
    name: "Liam Carter",
    email: "liam.carter@example.com",
    phone: "+1 202-555-0101",
    date: "2026-03-10",
    status: "Pending",
    documents: ["National ID.pdf", "Utility Bill.pdf", "Selfie Verification.jpg"],
    notes: "Recently moved to a new address and uploaded the latest utility bill for verification.",
  },
  {
    id: 2,
    name: "Ava Martinez",
    email: "ava.martinez@example.com",
    phone: "+1 202-555-0102",
    date: "2026-03-10",
    status: "Approved",
    documents: ["Passport.pdf", "Proof of Address.pdf"],
    notes: "Documents are clear and match submitted profile details.",
  },
  {
    id: 3,
    name: "Noah Kim",
    email: "noah.kim@example.com",
    phone: "+1 202-555-0103",
    date: "2026-03-11",
    status: "Rejected",
    documents: ["Student ID.png", "Phone Bill.pdf"],
    notes: "Identity document is expired. User should upload a valid government ID.",
  },
  {
    id: 4,
    name: "Sophia Ahmed",
    email: "sophia.ahmed@example.com",
    phone: "+1 202-555-0104",
    date: "2026-03-12",
    status: "Pending",
    documents: ["Driver License.pdf", "Bank Statement.pdf", "Residence Permit.pdf"],
    notes: "Name spelling differs slightly between bank statement and profile.",
  },
  {
    id: 5,
    name: "Ethan Rivera",
    email: "ethan.rivera@example.com",
    phone: "+1 202-555-0105",
    date: "2026-03-12",
    status: "Approved",
    documents: ["Passport.pdf", "Credit Card Statement.pdf"],
    notes: "All details aligned; verification checks complete.",
  },
  {
    id: 6,
    name: "Mia Thompson",
    email: "mia.thompson@example.com",
    phone: "+1 202-555-0106",
    date: "2026-03-13",
    status: "Pending",
    documents: ["National ID.pdf", "Rent Agreement.pdf", "Profile Photo.jpg"],
    notes: "Address proof is valid but profile photo has glare; may request re-upload.",
  },
  {
    id: 7,
    name: "Lucas Brooks",
    email: "lucas.brooks@example.com",
    phone: "+1 202-555-0107",
    date: "2026-03-14",
    status: "Rejected",
    documents: ["Temporary ID.pdf", "Utility Bill.png"],
    notes: "Temporary ID type is not accepted for account verification.",
  },
  {
    id: 8,
    name: "Isabella Young",
    email: "isabella.young@example.com",
    phone: "+1 202-555-0108",
    date: "2026-03-15",
    status: "Pending",
    documents: ["Passport.pdf", "Tax Document.pdf", "Proof of Residency.pdf"],
    notes: "Documents complete, pending final manual review by admin.",
  },
  {
    id: 9,
    name: "James Patel",
    email: "james.patel@example.com",
    phone: "+1 202-555-0109",
    date: "2026-03-15",
    status: "Approved",
    documents: ["Driver License.pdf", "Insurance Statement.pdf"],
    notes: "Identity and address details verified successfully.",
  },
  {
    id: 10,
    name: "Emily Chen",
    email: "emily.chen@example.com",
    phone: "+1 202-555-0110",
    date: "2026-03-16",
    status: "Pending",
    documents: ["National ID.pdf", "Bank Statement.pdf", "Residency Card.pdf"],
    notes: "Awaiting confirmation for one supporting document that appears cropped.",
  },
];

const ITEMS_PER_PAGE = 6;
type StatusFilter = "All" | Submission["status"];

export default function AdminSubmissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredSubmissions = useMemo(() => {
    if (statusFilter === "All") {
      return SUBMISSIONS;
    }
    return SUBMISSIONS.filter((submission) => submission.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE));

  const pagedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSubmissions.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredSubmissions]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const handleReview = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="relative w-full">
      <header>
        <h1 className="text-2xl font-extrabold text-[var(--color-ink-strong)] sm:text-3xl">Account Submissions</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)] sm:text-base">
          Review and validate user account submissions
        </p>
      </header>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="admin-submissions-search">
          Search submissions
        </label>
        <input
          id="admin-submissions-search"
          type="text"
          placeholder="Search submissions by name, email, or document"
          className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)]"
        />

        <label className="sr-only" htmlFor="admin-submissions-filter-status">
          Filter by status
        </label>
        <select
          id="admin-submissions-filter-status"
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value as StatusFilter);
            setCurrentPage(1);
          }}
          className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm font-medium text-[var(--color-ink-strong)] outline-none transition focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)] sm:w-56"
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="mt-5">
        <AdminSubmissionList submissions={pagedSubmissions} onReview={handleReview} />
        <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      <AdminSubmissionDetailsPanel
        submission={selectedSubmission}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
