import { Link } from "react-router-dom";

const AUTH_SUSPENDED_KEY = "auth_suspended_message";

export default function SuspendedPage() {
  const message = localStorage.getItem(AUTH_SUSPENDED_KEY) ?? "Account suspended";

  return (
    <div className="grid min-h-screen place-items-center bg-(--color-brand-soft) px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-(--color-ink-border-faint) bg-white p-6 shadow-[0_12px_28px_rgba(31,18,51,0.14)]">
        <h1 className="text-2xl font-extrabold text-(--color-ink-strong)">
          Account suspended
        </h1>
        <p className="mt-2 text-sm text-(--color-text-muted)">
          Your account is currently suspended. Please contact support or wait
          for an admin to reactivate your access.
        </p>
        <div className="mt-4 rounded-xl border border-(--color-ink-border-faint) bg-(--color-brand-soft) p-3 text-xs text-(--color-ink-strong)">
          {message}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            Go to login
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-(--color-ink-border-soft) px-4 py-2 text-sm font-semibold text-(--color-ink-strong) transition hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)"
          >
            Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
