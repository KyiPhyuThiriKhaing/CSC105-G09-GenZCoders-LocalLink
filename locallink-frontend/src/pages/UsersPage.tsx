import AdminLayout from "../components/AdminPageComponents/AdminLayout";

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center rounded-2xl border border-[var(--color-ink-border-faint)] bg-brand-soft/80 px-4 py-10 md:min-h-[calc(100vh-11rem)]">
        <h1 className="text-center text-3xl font-bold text-brand-primary sm:text-4xl md:text-5xl">Users Page</h1>
      </div>
    </AdminLayout>
  );
}