export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Account Settings
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Manage your email address, password, and security preferences.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Email Address</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-bold text-slate-700"
                htmlFor="current-email"
              >
                Current Email
              </label>
              <input
                id="current-email"
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-bold text-slate-700"
                htmlFor="new-email"
              >
                New Email
              </label>
              <input
                id="new-email"
                type="email"
                placeholder="new-email@example.com"
                className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
              Update Email
            </button>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Phone Number</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-bold text-slate-700"
                htmlFor="current-phone"
              >
                Current Phone Number
              </label>
              <input
                id="current-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-bold text-slate-700"
                htmlFor="new-phone"
              >
                New Phone Number
              </label>
              <input
                id="new-phone"
                type="tel"
                placeholder="+1 (555) 890-1234"
                className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
              Update Phone Number
            </button>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Change Password
            </h2>
          </div>

          <div className="space-y-6">
            <div className="max-w-md">
              <label
                className="mb-2 block text-sm font-bold text-slate-700"
                htmlFor="current-password"
              >
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-slate-700"
                  htmlFor="new-password"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-slate-700"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
              Update Password
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
