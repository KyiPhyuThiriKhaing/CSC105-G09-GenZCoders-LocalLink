import { useState, type ReactNode } from "react";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import AdminSidebar from "./AdminSidebar";

type AdminLayoutProps = {
  children?: ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-soft md:flex md:h-screen md:overflow-hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-(--color-ink-border-soft) bg-(--color-brand-primary-700) px-4 py-3 md:hidden">
        <div>
          <p className="text-base font-semibold text-(--color-brand-soft)">
            Admin Portal
          </p>
          <p className="text-xs text-(--color-brand-accent)">
            Account Validation
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-(--color-ink-border-soft) bg-white/10 text-white"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <Cross2Icon className="h-4 w-4" />
          ) : (
            <HamburgerMenuIcon className="h-4 w-4" />
          )}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-(--color-ink-strong)/45 transition-opacity md:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[240px] transition-transform duration-200 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          className="h-dvh"
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="hidden md:block md:h-screen md:shrink-0">
        <AdminSidebar className="h-screen" />
      </div>

      <main className="flex-1 bg-(--color-brand-soft) p-4 md:h-full md:overflow-y-auto md:p-6">
        <div className="h-full min-h-0 rounded-2xl border border-(--color-ink-border-faint) bg-white/75 p-6 shadow-[0_8px_24px_rgba(31,18,51,0.08)]">
          {children ?? (
            <div className="h-full rounded-xl border border-dashed border-(--color-ink-border-soft)" />
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
