import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

type AdminLayoutProps = {
  children?: ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-brand-soft">
      <AdminSidebar />
      <main className="flex-1 bg-[var(--color-brand-soft)] p-8">
        <div className="h-full min-h-[calc(100vh-4rem)] rounded-2xl border border-[var(--color-ink-border-faint)] bg-white/75 p-6 shadow-[0_8px_24px_rgba(31,18,51,0.08)]">
          {children ?? <div className="h-full rounded-xl border border-dashed border-[var(--color-ink-border-soft)]" />}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
