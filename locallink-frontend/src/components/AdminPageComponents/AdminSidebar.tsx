import { useLocation } from "react-router-dom";
import {
  DashboardIcon,
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import AdminSidebarItem from "./AdminSidebarItem";

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

function AdminSidebar() {
  const location = useLocation();

  const isActivePath = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col bg-[var(--color-brand-primary-700)] px-4 py-5">
      <div className="pb-5">
        <h1 className="inline-flex items-center gap-2 text-lg font-semibold tracking-wide text-[var(--color-brand-soft)]">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--color-brand-primary)] text-white">
            <LockClosedIcon className="h-3.5 w-3.5" />
          </span>
          Admin Portal
        </h1>
        <p className="mt-1 text-xs text-[var(--color-brand-accent)]">Account Validation</p>
      </div>

      <div className="mb-5 h-px w-full bg-[var(--color-ink-strong-70)]" aria-hidden="true" />

      <nav className="flex flex-1 flex-col gap-2" aria-label="Admin sidebar navigation">
        {NAV_ITEMS.map((item) => (
          <AdminSidebarItem
            key={item.to}
            to={item.to}
            label={item.label}
            Icon={item.Icon}
            isActive={isActivePath(item.to)}
          />
        ))}
      </nav>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-[var(--color-ink-border-soft)] bg-white/10 p-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-sm font-semibold text-white">
          AU
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--color-brand-soft)]">Admin User</p>
          <p className="text-xs text-[var(--color-brand-accent)]">admin@locallink.com</p>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
