type PromoCardProps = {
    title: string;
    description: string;
    buttonText: string;
    imageUrl?: string;
};

function PromoCard({ title, description, buttonText, imageUrl }: PromoCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-2xl border border-[var(--color-ink-border-soft)] bg-white p-6 sm:p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-[var(--color-brand-primary)]" aria-hidden="true" />

            <div className="pl-5 grid gap-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-primary)]">
                        <span className="text-lg font-extrabold">✦</span>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-[var(--color-ink-strong)]">{title}</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
                    </div>
                </div>

                {imageUrl ? (
                    <div className="overflow-hidden rounded-xl border border-[var(--color-ink-border-soft)]">
                        <img src={imageUrl} alt={title} className="h-36 w-full object-cover" />
                    </div>
                ) : (
                    <div className="rounded-xl bg-[var(--color-brand-soft)] p-4">
                        <p className="text-sm font-semibold text-[var(--color-ink-strong)]">Why it matters</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-text-muted)]">
                            {["Free to join — no subscription needed", "Verified profiles and community reviews", "Safe in-app messaging"].map((point) => (
                                <li key={point} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    type="button"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]"
                >
                    {buttonText}
                </button>
            </div>
        </article>
    );
}

export default PromoCard;
