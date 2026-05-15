import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error | undefined;

  return (
    <div className="grid min-h-screen place-items-center bg-(--color-brand-soft) px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-(--color-ink-border-faint) bg-white p-6 shadow-[0_12px_28px_rgba(31,18,51,0.14)]">
        <h1 className="text-2xl font-extrabold text-(--color-ink-strong)">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-(--color-text-muted)">
          The page hit an unexpected error. You can return home or refresh.
        </p>
        {error?.message ? (
          <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-(--color-ink-border-faint) bg-(--color-brand-soft) p-3 text-xs text-(--color-ink-strong)">
            {error.message}
          </pre>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-xl border border-(--color-ink-border-soft) px-4 py-2 text-sm font-semibold text-(--color-ink-strong) transition hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)"
          >
            Refresh
          </button>
        </div>
      </section>
    </div>
  );
}
