type PromoCardProps = {
    title: string;
    description: string;
    buttonText: string;
    imageUrl?: string;
};

function PromoCard({ title, description, buttonText, imageUrl }: PromoCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-2xl bg-brand-soft shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    background:
                        "linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-primary-600) 50%, var(--color-brand-pink-500) 100%)",
                }}
                aria-hidden="true"
            />
            <div className="relative grid gap-4 p-6 sm:p-7">
                <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/75 text-brand-primary shadow-md ring-1 ring-white/50">
                        <span className="text-lg font-extrabold">✦</span>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white drop-shadow-sm">{title}</h3>
                        <p className="text-sm text-white/90">{description}</p>
                    </div>
                </div>

                {imageUrl ? (
                    <div className="relative overflow-hidden rounded-xl border border-(--color-ink-border-soft) bg-white/95">
                        <img src={imageUrl} alt={title} className="h-36 w-full object-cover" />
                    </div>
                ) : (
                    <div className="rounded-xl border border-(--color-ink-border-soft) bg-white/90 p-4 text-(--color-ink-strong)">
                        <p className="text-sm font-semibold">Why it matters</p>
                        <ul className="mt-2 space-y-1 text-sm text-(--color-text-muted)">
                            <li>• Faster matches with local pros</li>
                            <li>• Verified profiles and reviews</li>
                            <li>• Secure messaging and payments</li>
                        </ul>
                    </div>
                )}

                <button
                    type="button"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                    {buttonText}
                </button>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" aria-hidden="true" />
        </article>
    );
}

export default PromoCard;
