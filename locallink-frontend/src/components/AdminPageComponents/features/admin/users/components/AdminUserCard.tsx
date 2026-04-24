import type { AdminUser, UserStatus } from "../../../../../../data/mockAdminData";

export interface AdminUserCardProps {
  user: AdminUser;
  onClick: () => void;
}

const STATUS_STYLES: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Suspended: "bg-red-100 text-red-800 border-red-200",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function AdminUserCard({ user, onClick }: AdminUserCardProps) {
  return (
    <article className="rounded-xl border border-[var(--color-ink-border-faint)] bg-white px-3 py-2.5 shadow-[0_8px_18px_rgba(31,18,51,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(152,16,250,0.14)]">
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--color-brand-primary)] text-xs font-bold text-white">
          {getInitials(user.name)}
        </div>

        <div className="min-w-0 shrink basis-full sm:basis-auto">
          <h3 className="truncate text-sm font-bold text-[var(--color-ink-strong)]">{user.name}</h3>
        </div>

        <p className="max-w-[16rem] truncate text-xs text-[var(--color-text-muted)]" title={user.email}>
          {user.email}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">Joined {user.joinedAt}</p>
        <span className="rounded-full border border-[var(--color-ink-border-faint)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
          {user.phone}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[user.status]}`}>
            {user.status}
          </span>

          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center rounded-lg bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            View details →
          </button>
        </div>
      </div>
    </article>
  );
}
