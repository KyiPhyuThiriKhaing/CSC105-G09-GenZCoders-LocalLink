export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">


        <div className="space-y-6">
          <section className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-brand-soft/40 p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink-strong)]">Change Email</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-muted)]" htmlFor="current-email">
                  Current Email
                </label>
                <input
                  id="current-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-4 py-3 text-[var(--color-ink-strong)] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-muted)]" htmlFor="new-email">
                  New Email
                </label>
                <input
                  id="new-email"
                  type="email"
                  placeholder="new-email@example.com"
                  className="w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-4 py-3 text-[var(--color-ink-strong)] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>

              <button
                type="button"
                className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
              >
                Update Email
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-brand-soft/40 p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--color-ink-strong)]">Change Password</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-muted)]" htmlFor="current-password">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-4 py-3 text-[var(--color-ink-strong)] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-muted)]" htmlFor="new-password">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-4 py-3 text-[var(--color-ink-strong)] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-muted)]" htmlFor="confirm-password">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-4 py-3 text-[var(--color-ink-strong)] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>

              <button
                type="button"
                className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
              >
                Update Password
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}   