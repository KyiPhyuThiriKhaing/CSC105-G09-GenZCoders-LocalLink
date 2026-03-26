function SkillsSection() {
    const skills = ["Cleaning", "Delivery", "Gardening", "Tech Support"];

    return (
        <section className="rounded-2xl border border-(--color-ink-border-soft) bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-(--color-ink-strong)">Skills</h2>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--color-ink-strong)">Add Your Skills</label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="text"
                            placeholder="e.g., Tutoring, Cleaning, Delivery"
                            className="h-11 w-full rounded-xl border border-(--color-ink-border-soft) bg-white px-3 text-sm text-(--color-ink-strong) outline-none focus:border-brand-primary focus:ring-4 focus:ring-(--color-brand-focus)"
                        />
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-primary"
                        >
                            {skill}
                            <span className="text-(--color-text-muted)">×</span>
                        </span>
                    ))}
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;
