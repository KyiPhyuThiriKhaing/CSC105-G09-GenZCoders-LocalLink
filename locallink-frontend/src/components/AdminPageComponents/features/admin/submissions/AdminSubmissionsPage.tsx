import { useMemo, useState } from "react";
import AdminPagination from "./components/AdminPagination";
import AdminSubmissionDetailsPanel from "./components/AdminSubmissionDetailsPanel";
import AdminSubmissionList from "./components/AdminSubmissionList";
import { MOCK_ADMIN_SUBMISSIONS } from "../../../../../data/mockAdminData";
import type { Submission } from "../../../../../data/mockAdminData";

const ITEMS_PER_PAGE = 6;
type StatusFilter = "All" | Submission["status"];
type SortOrder = "latest-to-oldest" | "oldest-to-latest";

export default function AdminSubmissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest-to-oldest");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredSubmissions = useMemo(() => {
    if (statusFilter === "All") {
      return MOCK_ADMIN_SUBMISSIONS;
    }
    return MOCK_ADMIN_SUBMISSIONS.filter((submission) => submission.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE));

  const sortedSubmissions = useMemo(() => {
    const submissionsToSort = [...filteredSubmissions];

    submissionsToSort.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();

      if (sortOrder === "oldest-to-latest") {
        return aTime - bTime;
      }

      return bTime - aTime;
    });

    return submissionsToSort;
  }, [filteredSubmissions, sortOrder]);

  const pagedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedSubmissions.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedSubmissions]);

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

        <label className="sr-only" htmlFor="admin-submissions-sort-order">
          Sort submissions by date
        </label>
        <select
          id="admin-submissions-sort-order"
          value={sortOrder}
          onChange={(event) => {
            setSortOrder(event.target.value as SortOrder);
            setCurrentPage(1);
          }}
          className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm font-medium text-[var(--color-ink-strong)] outline-none transition focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)] sm:w-56"
        >
          <option value="latest-to-oldest">Latest to oldest</option>
          <option value="oldest-to-latest">Oldest to latest</option>
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
