import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminPagination from "./components/AdminPagination";
import AdminSubmissionDetailsPanel from "./components/AdminSubmissionDetailsPanel";
import AdminSubmissionList from "./components/AdminSubmissionList";
import type { Submission, SubmissionStatus } from "./types";
import {
  listAdminSubmissions,
  updateAdminSubmissionStatus,
  type AdminSubmission,
  type VerificationStatus,
} from "../../../../../lib/adminApi";

const ITEMS_PER_PAGE = 6;
type StatusFilter = "All" | SubmissionStatus;
type SortOrder = "latest-to-oldest" | "oldest-to-latest";

const statusToApi = (status: SubmissionStatus): VerificationStatus => {
  switch (status) {
    case "Approved":
      return "APPROVED";
    case "Rejected":
      return "REJECTED";
    default:
      return "PENDING";
  }
};

const statusFromApi = (status: VerificationStatus): SubmissionStatus => {
  switch (status) {
    case "APPROVED":
      return "Approved";
    case "REJECTED":
      return "Rejected";
    default:
      return "Pending";
  }
};

const mapSubmission = (submission: AdminSubmission): Submission => ({
  id: submission.id,
  name: submission.user.fullName,
  email: submission.user.email,
  phone: submission.user.phone,
  date: new Date(submission.submittedAt).toLocaleDateString(),
  status: statusFromApi(submission.status),
  documents: submission.documents.map((doc) => ({
    id: doc.id,
    fileName: doc.fileName,
    fileUrl: doc.fileUrl,
  })),
  notes: submission.notes ?? "No notes provided",
});

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest-to-oldest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredSubmissions = useMemo(() => {
    const tokens = searchTerm
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return submissions.filter((submission) => {
      const matchesStatus = statusFilter === "All" ? true : submission.status === statusFilter;
      if (!matchesStatus) return false;
      if (tokens.length === 0) return true;

      const docNames = submission.documents.map((doc) => doc.fileName);
      const haystack = [submission.name, submission.email, submission.phone ?? "", ...docNames]
        .map((value) => value.toLowerCase());

      return tokens.every((token) => haystack.some((value) => value.includes(token)));
    });
  }, [searchTerm, statusFilter, submissions]);

  const sortedSubmissions = useMemo(() => {
    const next = [...filteredSubmissions];
    next.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return sortOrder === "oldest-to-latest" ? aTime - bTime : bTime - aTime;
    });
    return next;
  }, [filteredSubmissions, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedSubmissions.length / ITEMS_PER_PAGE));
  const pagedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedSubmissions.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedSubmissions]);

  useEffect(() => {
    let isMounted = true;

    const loadSubmissions = async () => {
      const response = await listAdminSubmissions({
        page: 1,
        pageSize: 1000,
      });

      if (!isMounted) return;

      setSubmissions(response.data.map(mapSubmission));
      setTotalSubmissions(response.meta.total);
    };

    loadSubmissions().catch((error) => {
      const message = error instanceof Error ? error.message : "Failed to load submissions";
      toast.error(message);
    });

    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleUpdateStatus = async (
    submissionId: string,
    status: SubmissionStatus,
    adminComment: string,
  ) => {
    try {
      const result = await updateAdminSubmissionStatus(submissionId, {
        status: statusToApi(status),
        adminComment: adminComment || undefined,
      });

      const updated = mapSubmission(result.data);
      setSubmissions((prev) => prev.map((item) => (item.id === submissionId ? updated : item)));
      setSelectedSubmission(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update submission";
      toast.error(message);
    }
  };

  return (
    <div className="relative w-full">
      <header>
        <h1 className="text-2xl font-extrabold text-(--color-ink-strong) sm:text-3xl">
          Account Submissions
        </h1>
        <p className="mt-1 text-sm text-(--color-text-muted) sm:text-base">
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
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search submissions by name, email, or document"
          className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm text-(--color-ink-strong) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
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
          className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm font-medium text-(--color-ink-strong) outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring) sm:w-56"
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
          className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm font-medium text-(--color-ink-strong) outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring) sm:w-56"
        >
          <option value="latest-to-oldest">Latest to oldest</option>
          <option value="oldest-to-latest">Oldest to latest</option>
        </select>
      </div>

      <div className="mt-5">
        <AdminSubmissionList
          submissions={pagedSubmissions}
          onReview={handleReview}
        />
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <AdminSubmissionDetailsPanel
        submission={selectedSubmission}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
