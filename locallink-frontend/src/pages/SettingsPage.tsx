export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[var(--color-ink-strong)]">Account Settings</h1>
        <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">Manage your email and password.</p>
      </div>

      <section className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-bold text-[var(--color-ink-strong)]">Change Email</h2>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--color-ink-strong)]" htmlFor="current-email">
              Current Email
            </label>
            <input
              id="current-email"
              type="email"
              placeholder="you@example.com"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--color-ink-strong)]" htmlFor="new-email">
              New Email
            </label>
            <input
              id="new-email"
              type="email"
              placeholder="new-email@example.com"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>
          <div className="pt-1">
            <button
              type="button"
              className="rounded-xl bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]"
            >
              Update Email
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-bold text-[var(--color-ink-strong)]">Change Password</h2>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--color-ink-strong)]" htmlFor="current-password">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--color-ink-strong)]" htmlFor="new-password">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--color-ink-strong)]" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              className="h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>
          <div className="pt-1">
            <button
              type="button"
              className="rounded-xl bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]"
            >
              Update Password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
