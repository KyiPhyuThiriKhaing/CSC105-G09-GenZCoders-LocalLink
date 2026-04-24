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
  if (
    pathname === "/profile" ||
    pathname === "/profile/" ||
    pathname.startsWith("/profile/my-profile")
  )
    return "My Profile";
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
    <div className="min-h-screen bg-slate-50">
      {/* Mobile-only horizontal tab bar */}
      <nav
        className="sticky top-16 z-30 flex overflow-x-auto border-b border-slate-200 bg-white/90 backdrop-blur-md lg:hidden"
        aria-label="Profile navigation"
      >
        {PROFILE_NAV.map((item) => (
          <NavLink
            key={item.key}
            to={item.href}
            className={({ isActive }) =>
              `shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition-colors ${
                isActive
                  ? "border-(--color-brand-primary) text-(--color-brand-primary)"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Layout: sidebar (desktop) + content */}
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-20 sm:px-6 lg:flex lg:gap-10 lg:px-8 lg:pt-14 lg:pb-24">
        {/* Sidebar — desktop only */}
        <div className="hidden lg:block w-64 shrink-0">
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
