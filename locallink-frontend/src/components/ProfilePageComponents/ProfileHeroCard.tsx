function ProfileHeroCard() {
    return (
        <section className="rounded-2xl border border-(--color-ink-border-soft) bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div
                        className="grid h-28 w-28 place-items-center rounded-full bg-[var(--color-brand-primary)] text-3xl font-bold text-white shadow-md"
                    >
                        JD
                    </div>
                    <button
                        type="button"
                        className="absolute -right-1 bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-primary shadow-lg ring-1 ring-(--color-ink-border-soft) transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        aria-label="Edit photo"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M4 17v3h3l9-9-3-3-9 9Zm11.5-9.5 1.8-1.8a1.06 1.06 0 0 1 1.5 1.5l-1.8 1.8-1.5-1.5Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    className="rounded-full border border-brand-primary px-4 py-2 text-sm font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                    Upload Photo
                </button>
            </div>
        </section>
    );
}

export default ProfileHeroCard;
