import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function getActiveKey(pathname: string): string | undefined {
  if (pathname === "/profile" || pathname === "/profile/" || pathname.startsWith("/profile/my-profile")) {
    return "My Profile";
  }

  if (pathname.startsWith("/profile/verify")) return "Verification";
  if (pathname.startsWith("/profile/history")) return "History";
  if (pathname.startsWith("/profile/settings")) return "Settings";
  if (pathname.startsWith("/profile/chat")) return "Chat";

  return undefined;
}

export default function ProfilePage() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-brand-soft text-(--color-ink-strong)">
      <div className="flex gap-6 px-6 pb-12 pt-6 lg:pt-8">
        <Sidebar activeKey={getActiveKey(pathname)} />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}