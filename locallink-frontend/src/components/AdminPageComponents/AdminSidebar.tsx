import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  DashboardIcon,
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import AdminSidebarItem from "./AdminSidebarItem";
import type { AdminProfile } from "../../lib/adminApi";
import { getAdminTokenRemainingMs } from "../../lib/adminApi";

const NAV_ITEMS = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    Icon: DashboardIcon,
  },
  {
    to: "/admin/submissions",
    label: "Submissions",
    Icon: FileTextIcon,
  },
  {
    to: "/admin/users",
    label: "Users",
    Icon: PersonIcon,
  },
] as const;

type AdminSidebarProps = {
  className?: string;
  onNavigate?: () => void;
  admin?: AdminProfile | null;
  onLogout?: () => void;
};

function AdminSidebar({ className = "", onNavigate, admin, onLogout }: AdminSidebarProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [warnedLowTime, setWarnedLowTime] = useState(false);

  useEffect(() => {
    setRemainingMs(getAdminTokenRemainingMs());
    const timer = setInterval(() => {
      setRemainingMs(getAdminTokenRemainingMs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingMs === null) return;
    if (remainingMs <= 2 * 60 * 1000 && !warnedLowTime) {
      toast.dismiss("session-warning");
      toast.warning("Session expires in under 2 minutes.", {
        id: "session-warning",
      });
      setWarnedLowTime(true);
    }
    if (remainingMs > 2 * 60 * 1000 && warnedLowTime) {
      setWarnedLowTime(false);
    }
  }, [remainingMs, warnedLowTime]);

  const formatRemaining = (ms: number | null) => {
    if (ms === null) return "--:--";
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isActivePath = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const sidebarClassName = `flex h-full w-[240px] shrink-0 flex-col bg-(--color-brand-primary-700) px-4 py-5 ${className}`;

  return (
    <aside className={sidebarClassName}>
      <div className="pb-5">
        <h1 className="inline-flex items-center gap-2 text-lg font-semibold tracking-wide text-(--color-brand-soft)">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-(--color-brand-primary) text-white">
            <LockClosedIcon className="h-3.5 w-3.5" />
          </span>
          Admin Portal
        </h1>
        <p className="mt-1 text-xs text-(--color-brand-accent)">
          Account Validation
        </p>
      </div>

      <div
        className="mb-5 h-px w-full bg-(--color-ink-strong-70)"
        aria-hidden="true"
      />

      <nav
        className="flex flex-1 flex-col gap-2"
        aria-label="Admin sidebar navigation"
      >
        {NAV_ITEMS.map((item) => (
          <AdminSidebarItem
            key={item.to}
            to={item.to}
            label={item.label}
            Icon={item.Icon}
            isActive={isActivePath(item.to)}
            onClick={onNavigate}
          />
        ))}
      </nav>

      <div className="relative mt-4">
        <button
          type="button"
          className={`flex w-full items-center gap-3 rounded-xl border border-(--color-ink-border-soft) bg-white/10 p-3 text-left transition active:translate-y-px ${
            isMenuOpen
              ? "ring-2 ring-(--color-brand-focus-ring) shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
              : "hover:bg-white/20"
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
        >
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-sm font-semibold text-white">
            {admin?.fullName
              ? admin.fullName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase() ?? "")
                  .join("")
              : "AU"}
          </div>
          <div>
            <p className="text-sm font-medium text-(--color-brand-soft)">
              {admin?.fullName ?? "Admin User"}
            </p>
            <p className="text-xs text-(--color-brand-accent)">
              {admin?.email ?? "admin@locallink.com"}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-(--color-brand-accent)">
              Session {formatRemaining(remainingMs)}
            </p>
          </div>
        </button>

        {isMenuOpen ? (
          <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-(--color-ink-border-soft) bg-white p-2 shadow-[0_12px_24px_rgba(31,18,51,0.18)]">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onLogout?.();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

export default AdminSidebar;
