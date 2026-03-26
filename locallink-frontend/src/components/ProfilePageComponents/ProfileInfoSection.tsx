function ProfileInfoSection() {
    return (
        <section className="rounded-2xl border border-(--color-ink-border-soft) bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-(--color-ink-strong)">Profile Information</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-(--color-ink-strong)">Full Name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm text-(--color-ink-strong) outline-none focus:border-brand-primary focus:ring-4 focus:ring-(--color-brand-focus)"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="m10 14.2-2.2-2.2-1.4 1.4L10 17l8-8-1.4-1.4L10 14.2Z"
                            fill="currentColor"
                        />
                    </svg>
                    Verified
                </div>
            </div>
            <div className="mt-4 space-y-1">
                <p className="text-sm font-semibold text-(--color-ink-strong)">Verification Status</p>
                <p className="text-sm text-(--color-text-muted)">Your account is verified.</p>
            </div>
        </section>
    );
}

export default ProfileInfoSection;
