import AdminLayout from "../components/AdminPageComponents/AdminLayout";

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center rounded-2xl border border-[var(--color-ink-border-faint)] bg-brand-soft/80">
        <h1 className="text-5xl font-bold text-brand-primary">Users Page</h1>
      </div>
    </AdminLayout>
  );
}