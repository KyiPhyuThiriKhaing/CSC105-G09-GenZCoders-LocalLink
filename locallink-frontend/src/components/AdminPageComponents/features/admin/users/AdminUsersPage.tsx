import { useMemo, useState } from "react";
import AdminPagination from "../submissions/components/AdminPagination";
import AdminUserDetailsPanel from "./components/AdminUserDetailsPanel";
import AdminUserList from "./components/AdminUserList";
import type { AdminUser, UserStatus } from "../../../../../data/mockAdminData";
import { MOCK_ADMIN_USERS } from "../../../../../data/mockAdminData";

const ITEMS_PER_PAGE = 8;
type StatusFilter = "All" | UserStatus;
type SortOrder = "latest-to-oldest" | "oldest-to-latest";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest-to-oldest");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesStatus = statusFilter === "All" ? true : user.status === statusFilter;
      const matchesSearch =
        normalizedSearch.length === 0
          ? true
          : user.name.toLowerCase().includes(normalizedSearch) ||
          user.email.toLowerCase().includes(normalizedSearch) ||
          user.phone.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [users, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));

  const sortedUsers = useMemo(() => {
    const usersToSort = [...filteredUsers];

    usersToSort.sort((a, b) => {
      const aTime = new Date(a.joinedAt).getTime();
      const bTime = new Date(b.joinedAt).getTime();

      if (sortOrder === "oldest-to-latest") {
        return aTime - bTime;
      }

      return bTime - aTime;
    });

    return usersToSort;
  }, [filteredUsers, sortOrder]);

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedUsers]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const pendingUsers = users.filter((user) => user.status === "Pending").length;
  const suspendedUsers = users.filter((user) => user.status === "Suspended").length;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const handleViewDetails = (user: AdminUser) => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handleStatusChange = (userId: number, nextStatus: UserStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        }
        return { ...user, status: nextStatus };
      }),
    );

    setSelectedUser((prevSelected) => {
      if (!prevSelected || prevSelected.id !== userId) {
        return prevSelected;
      }
      return { ...prevSelected, status: nextStatus };
    });
  };

  const handleFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="relative w-full">
      <header>
        <h1 className="text-2xl font-extrabold text-[var(--color-ink-strong)] sm:text-3xl">Users Management</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)] sm:text-base">
          Manage user accounts and permissions
        </p>
      </header>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[var(--color-ink-border-faint)] bg-white p-3">
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">Total Users</p>
          <p className="mt-1 text-3xl font-extrabold text-[var(--color-ink-strong)]">{totalUsers}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-ink-border-faint)] bg-white p-3">
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">Active Users</p>
          <p className="mt-1 text-3xl font-extrabold text-green-600">{activeUsers}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-ink-border-faint)] bg-white p-3">
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">Verification Pending</p>
          <p className="mt-1 text-3xl font-extrabold text-yellow-600">{pendingUsers}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-ink-border-faint)] bg-white p-3">
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">Suspended Users</p>
          <p className="mt-1 text-3xl font-extrabold text-red-600">{suspendedUsers}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="admin-users-search">
          Search users
        </label>
        <input
          id="admin-users-search"
          type="text"
          value={searchTerm}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search users by name, email, or phone"
          className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)]"
        />

        <label className="sr-only" htmlFor="admin-users-status-filter">
          Filter users by status
        </label>
        <select
          id="admin-users-status-filter"
          value={statusFilter}
          onChange={(event) => handleFilterChange(event.target.value as StatusFilter)}
          className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm font-medium text-[var(--color-ink-strong)] outline-none transition focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)] sm:w-56"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Pending">Pending</option>
        </select>

        <label className="sr-only" htmlFor="admin-users-sort-order">
          Sort users by joined date
        </label>
        <select
          id="admin-users-sort-order"
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
        <AdminUserList users={pagedUsers} onSelectUser={handleViewDetails} />
        <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      <AdminUserDetailsPanel
        user={selectedUser}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onUpdateStatus={handleStatusChange}
      />
    </div>
  );
}
