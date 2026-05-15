import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminPagination from "../submissions/components/AdminPagination";
import AdminUserDetailsPanel from "./components/AdminUserDetailsPanel";
import AdminUserList from "./components/AdminUserList";
import type { AdminStatus, AdminUser } from "../../../../../lib/adminApi";
import {
  deleteAdminUser,
  listAdminUsers,
  updateAdminUserStatus,
  verifyAdminUserEmail,
} from "../../../../../lib/adminApi";

const ITEMS_PER_PAGE = 8;
type StatusFilter = "All" | AdminStatus;
type SortOrder = "latest-to-oldest" | "oldest-to-latest";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest-to-oldest");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    ACTIVE: 0,
    PENDING: 0,
    SUSPENDED: 0,
  });

  const updateStatusCounts = (list: AdminUser[]) => {
    const active = list.filter((user) => user.status === "ACTIVE").length;
    const pending = list.filter((user) => user.status === "PENDING").length;
    const suspended = list.filter((user) => user.status === "SUSPENDED").length;

    setStatusCounts({
      ACTIVE: active,
      PENDING: pending,
      SUSPENDED: suspended,
    });
  };

  const filteredUsers = useMemo(() => {
    const tokens = searchTerm
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return users.filter((user) => {
      const matchesStatus = statusFilter === "All" ? true : user.status === statusFilter;
      if (!matchesStatus) return false;
      if (tokens.length === 0) return true;

      const haystack = [user.fullName, user.email, user.phone ?? ""].map((value) =>
        value.toLowerCase(),
      );

      return tokens.every((token) => haystack.some((value) => value.includes(token)));
    });
  }, [searchTerm, statusFilter, users]);

  const sortedUsers = useMemo(() => {
    const next = [...filteredUsers];
    next.sort((a, b) => {
      const aTime = new Date(a.joinedAt).getTime();
      const bTime = new Date(b.joinedAt).getTime();
      return sortOrder === "oldest-to-latest" ? aTime - bTime : bTime - aTime;
    });
    return next;
  }, [filteredUsers, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / ITEMS_PER_PAGE));
  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedUsers]);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      const response = await listAdminUsers({
        page: 1,
        pageSize: 1000,
      });

      if (!isMounted) return;

      setUsers(response.data);
      setTotalUsers(response.meta.total);
      updateStatusCounts(response.data);
    };

    loadUsers().catch((error) => {
      const message = error instanceof Error ? error.message : "Failed to load users";
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

  const handleViewDetails = (user: AdminUser) => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handleStatusChange = async (userId: string, nextStatus: AdminStatus) => {
    try {
      const result = await updateAdminUserStatus(userId, nextStatus);
      setUsers((prevUsers) => {
        const nextUsers = prevUsers.map((user) =>
          user.id === userId ? { ...user, ...result.data } : user,
        );
        updateStatusCounts(nextUsers);
        return nextUsers;
      });
      setSelectedUser((prevSelected) =>
        prevSelected && prevSelected.id === userId
          ? { ...prevSelected, ...result.data }
          : prevSelected,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update status";
      toast.error(message);
    }
  };

  const handleVerifyEmail = async (userId: string) => {
    try {
      const result = await verifyAdminUserEmail(userId);
      setUsers((prevUsers) => {
        const nextUsers = prevUsers.map((user) =>
          user.id === userId ? { ...user, ...result.data } : user,
        );
        updateStatusCounts(nextUsers);
        return nextUsers;
      });
      setSelectedUser((prevSelected) =>
        prevSelected && prevSelected.id === userId
          ? { ...prevSelected, ...result.data }
          : prevSelected,
      );
      toast.success("Email verified successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to verify email";
      toast.error(message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteAdminUser(userId);
      setUsers((prevUsers) => {
        const nextUsers = prevUsers.filter((user) => user.id !== userId);
        updateStatusCounts(nextUsers);
        return nextUsers;
      });
      setSelectedUser((prevSelected) =>
        prevSelected && prevSelected.id === userId ? null : prevSelected,
      );
      setTotalUsers((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete user";
      toast.error(message);
    }
  };

  const handleFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const activeUsers = statusCounts.ACTIVE;
  const pendingUsers = statusCounts.PENDING;
  const suspendedUsers = statusCounts.SUSPENDED;

  return (
    <div className="relative w-full">
      <header>
        <h1 className="text-2xl font-extrabold text-(--color-ink-strong) sm:text-3xl">
          Users Management
        </h1>
        <p className="mt-1 text-sm text-(--color-text-muted) sm:text-base">
          Manage user accounts and permissions
        </p>
      </header>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-(--color-ink-border-faint) bg-white p-3">
          <p className="text-sm font-semibold text-(--color-text-muted)">
            Total Users
          </p>
          <p className="mt-1 text-3xl font-extrabold text-(--color-ink-strong)">
            {totalUsers}
          </p>
        </div>
        <div className="rounded-xl border border-(--color-ink-border-faint) bg-white p-3">
          <p className="text-sm font-semibold text-(--color-text-muted)">
            Active Users
          </p>
          <p className="mt-1 text-3xl font-extrabold text-green-600">
            {activeUsers}
          </p>
        </div>
        <div className="rounded-xl border border-(--color-ink-border-faint) bg-white p-3">
          <p className="text-sm font-semibold text-(--color-text-muted)">
            Verification Pending
          </p>
          <p className="mt-1 text-3xl font-extrabold text-yellow-600">
            {pendingUsers}
          </p>
        </div>
        <div className="rounded-xl border border-(--color-ink-border-faint) bg-white p-3">
          <p className="text-sm font-semibold text-(--color-text-muted)">
            Suspended Users
          </p>
          <p className="mt-1 text-3xl font-extrabold text-red-600">
            {suspendedUsers}
          </p>
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
          className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm text-(--color-ink-strong) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
        />

        <label className="sr-only" htmlFor="admin-users-status-filter">
          Filter users by status
        </label>
        <select
          id="admin-users-status-filter"
          value={statusFilter}
          onChange={(event) =>
            handleFilterChange(event.target.value as StatusFilter)
          }
          className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm font-medium text-(--color-ink-strong) outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring) sm:w-56"
        >
          <option value="All">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="PENDING">Pending</option>
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
          className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm font-medium text-(--color-ink-strong) outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring) sm:w-56"
        >
          <option value="latest-to-oldest">Latest to oldest</option>
          <option value="oldest-to-latest">Oldest to latest</option>
        </select>
      </div>

      <div className="mt-5">
        <AdminUserList users={pagedUsers} onSelectUser={handleViewDetails} />
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <AdminUserDetailsPanel
        user={selectedUser}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onUpdateStatus={handleStatusChange}
        onDeleteUser={handleDeleteUser}
        onVerifyEmail={handleVerifyEmail}
      />
    </div>
  );
}
