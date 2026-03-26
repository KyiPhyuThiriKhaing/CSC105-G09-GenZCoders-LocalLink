import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen place-items-center bg-[var(--color-ink-strong)] px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-[var(--color-ink-border-soft)] bg-white/[0.06] p-8 shadow-[0_12px_32px_rgba(31,18,51,0.3)]">
        <h1 className="text-center text-3xl font-bold text-[var(--color-brand-soft)]">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-[var(--color-brand-accent)]">Restricted area</p>

        <form
          className="mt-7 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/admin/dashboard");
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-brand-soft)]" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-[var(--color-brand-soft)] px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-brand-soft)]" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-[var(--color-brand-soft)] px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            Enter Admin Portal
          </button>
        </form>
      </section>
    </div>
  );
}