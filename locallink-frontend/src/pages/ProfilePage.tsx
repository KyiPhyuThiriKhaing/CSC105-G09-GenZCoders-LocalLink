import { NavLink, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const PROFILE_NAV = [
  { label: "Profile", href: "/profile/my-profile", key: "My Profile" },
  { label: "Verify", href: "/profile/verify", key: "Verification" },
  { label: "History", href: "/profile/history", key: "History" },
  { label: "Settings", href: "/profile/settings", key: "Settings" },
  { label: "Chat", href: "/profile/chat", key: "Chat" },
];

function getActiveKey(pathname: string): string | undefined {
  if (pathname === "/profile" || pathname === "/profile/" || pathname.startsWith("/profile/my-profile")) return "My Profile";
  if (pathname.startsWith("/profile/verify")) return "Verification";
  if (pathname.startsWith("/profile/history")) return "History";
  if (pathname.startsWith("/profile/settings")) return "Settings";
  if (pathname.startsWith("/profile/chat")) return "Chat";
  return undefined;
}

export default function ProfilePage() {
  const { pathname } = useLocation();
  const activeKey = getActiveKey(pathname);

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft)]">
      {/* Mobile-only horizontal tab bar */}
      <nav
        className="sticky top-0 z-30 flex overflow-x-auto border-b border-[var(--color-ink-border-soft)] bg-white lg:hidden"
        aria-label="Profile navigation"
      >
        {PROFILE_NAV.map((item) => (
          <NavLink
            key={item.key}
            to={item.href}
            className={({ isActive }) =>
              `shrink-0 border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition ${
                isActive
                  ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                  : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-ink-strong)]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Layout: sidebar (desktop) + content */}
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6 lg:flex lg:gap-6 lg:px-8 lg:pt-8">
        {/* Sidebar — desktop only */}
        <div className="hidden lg:block">
          <Sidebar activeKey={activeKey} />
        </div>

        {/* Page content */}
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
