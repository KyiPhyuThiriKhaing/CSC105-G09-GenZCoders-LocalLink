type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function AdminPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AdminPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-(--color-ink-border-faint) bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center rounded-lg border border-(--color-ink-border-soft) px-3 py-1.5 text-sm font-medium text-(--color-ink-strong) transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <p className="text-sm font-medium text-(--color-text-muted)">
        Page {currentPage} of {totalPages}
      </p>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center rounded-lg border border-(--color-ink-border-soft) px-3 py-1.5 text-sm font-medium text-(--color-ink-strong) transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
