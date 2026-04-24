import {
  CalendarIcon,
  Cross2Icon,
  EnvelopeClosedIcon,
  MobileIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "../../../../../ConfirmDialog";
import AdminUserDangerZone from "./AdminUserDangerZone";
import type {
  AdminUser,
  UserStatus,
} from "../../../../../../data/mockAdminData";

export interface AdminUserDetailsPanelProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (userId: number, status: AdminUser["status"]) => void;
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

export default function AdminUserDetailsPanel({
  user,
  isOpen,
  onClose,
  onUpdateStatus,
}: AdminUserDetailsPanelProps) {
  const [confirmAction, setConfirmAction] = useState<"suspend" | "activate" | null>(null);

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
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close user details panel"
        onClick={onClose}
        className={`absolute inset-0 z-0 bg-[rgba(31,18,51,0.45)] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        className={`absolute right-0 top-0 z-10 h-dvh w-full max-w-full overflow-y-auto overscroll-y-contain border-l border-(--color-ink-border-faint) bg-white shadow-[-14px_0_38px_rgba(31,18,51,0.24)] transition-transform duration-300 ease-out sm:w-120 md:w-136 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="User details"
      >
        {user ? (
          <div className="flex min-h-full flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-(--color-ink-border-faint) bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-(--color-ink-strong)">
                  User Details
                </h2>
                <p className="mt-1 text-xs text-(--color-text-muted)">
                  Review and manage account status
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--color-ink-border-soft) text-(--color-text-muted) transition hover:border-(--color-brand-primary) hover:bg-(--color-brand-primary) hover:text-white"
              >
                <Cross2Icon />
              </button>
            </div>

            <div className="flex-1 space-y-5 px-4 py-5 sm:px-6">
              <section className="rounded-xl border border-(--color-ink-border-faint) bg-white p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-(--color-brand-primary) text-3xl font-extrabold text-white">
                    {getInitials(user.name)}
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold text-(--color-ink-strong)">
                    {user.name}
                  </h3>
                  <p className="mt-1 text-sm text-(--color-text-muted)">
                    {user.email}
                  </p>
                </div>
              </section>

              <section className="rounded-xl border border-(--color-ink-border-faint) bg-brand-soft/45 p-4">
                <h3 className="text-sm font-bold text-(--color-ink-strong)">
                  User Information
                </h3>
                <dl className="mt-3 grid grid-cols-1 gap-2 text-sm text-(--color-text-muted) sm:grid-cols-2">
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <PersonIcon className="mt-0.5 text-(--color-brand-primary)" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">
                        Full Name
                      </dt>
                      <dd className="mt-0.5 font-medium text-(--color-ink-strong)">
                        {user.name}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <EnvelopeClosedIcon className="mt-0.5 text-(--color-brand-primary)" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">Email</dt>
                      <dd className="mt-0.5 break-all font-medium text-(--color-ink-strong)">
                        {user.email}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <MobileIcon className="mt-0.5 text-(--color-brand-primary)" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">Phone</dt>
                      <dd className="mt-0.5 font-medium text-(--color-ink-strong)">
                        {user.phone}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/70 p-2">
                    <CalendarIcon className="mt-0.5 text-(--color-brand-primary)" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide">
                        Joined
                      </dt>
                      <dd className="mt-0.5 font-medium text-(--color-ink-strong)">
                        {user.joinedAt}
                      </dd>
                    </div>
                  </div>
                </dl>
              </section>

              <section className="rounded-xl border border-(--color-ink-border-faint) bg-white p-4">
                <h3 className="text-sm font-bold text-(--color-ink-strong)">
                  Account Status
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[user.status]}`}
                  >
                    {user.status}
                  </span>

                  {user.status === "Active" ? (
                    <button
                      type="button"
                      onClick={() => setConfirmAction("suspend")}
                      className="inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Suspend User
                    </button>
                  ) : null}

                  {user.status === "Suspended" ? (
                    <button
                      type="button"
                      onClick={() => setConfirmAction("activate")}
                      className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Activate User
                    </button>
                  ) : null}

                  {user.status === "Pending" ? (
                    <span className="inline-flex items-center rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs font-semibold text-yellow-700">
                      Pending verification
                    </span>
                  ) : null}
                </div>
              </section>

              <AdminUserDangerZone userName={user.name} />
            </div>
          </div>
        ) : null}
      </aside>

      <ConfirmDialog
        isOpen={confirmAction === "suspend"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Suspend User"
        description={`Are you sure you want to suspend ${user?.name}? They will lose access to their account until reactivated.`}
        confirmText="Suspend"
        variant="danger"
        onConfirm={() => {
          if (user) {
            onUpdateStatus(user.id, "Suspended");
            toast.success(`${user.name}'s account has been suspended.`);
          }
          setConfirmAction(null);
        }}
      />
      <ConfirmDialog
        isOpen={confirmAction === "activate"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Activate User"
        description={`Are you sure you want to reactivate ${user?.name}'s account?`}
        confirmText="Activate"
        variant="success"
        onConfirm={() => {
          if (user) {
            onUpdateStatus(user.id, "Active");
            toast.success(`${user.name}'s account has been successfully reactivated.`);
          }
          setConfirmAction(null);
        }}
      />
    </div>
  );
}
