function BioSection() {
    return (
        <section className="rounded-2xl border border-(--color-ink-border-soft) bg-white p-6 shadow-sm sm:p-7">
            <div className="space-y-3">
                <h2 className="text-lg font-bold text-(--color-ink-strong)">Bio</h2>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--color-ink-strong)">About You</label>
                    <textarea
                        rows={5}
                        defaultValue="Tell others about yourself and your experience..."
                        className="w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 py-3 text-sm text-(--color-ink-strong) outline-none focus:border-brand-primary focus:ring-4 focus:ring-(--color-brand-focus)"
                    />
                    <p className="text-right text-xs font-semibold text-(--color-text-muted)">94 / 500 characters</p>
                </div>
            </div>
        </section>
    );
}

export default BioSection;
