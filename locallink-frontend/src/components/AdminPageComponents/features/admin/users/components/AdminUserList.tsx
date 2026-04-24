import AdminUserCard from "./AdminUserCard";
import type { AdminUser } from "../../../../../../data/mockAdminData";

export interface AdminUserListProps {
  users: AdminUser[];
  onSelectUser: (user: AdminUser) => void;
}

export default function AdminUserList({ users, onSelectUser }: AdminUserListProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-ink-border-soft)] bg-white/70 px-4 py-10 text-center text-sm text-[var(--color-text-muted)]">
        No users found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {users.map((user) => (
        <AdminUserCard key={user.id} user={user} onClick={() => onSelectUser(user)} />
      ))}
    </div>
  );
}
