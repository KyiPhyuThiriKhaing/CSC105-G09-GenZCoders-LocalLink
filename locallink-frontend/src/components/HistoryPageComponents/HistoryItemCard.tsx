type HistoryItemCardProps = {
    title: string;
    lines: string[];
    badgeText?: string;
};

function HistoryItemCard({ title, lines, badgeText }: HistoryItemCardProps) {
    return (
        <article className="rounded-xl border border-(--color-ink-border-soft) bg-white px-4 py-3 shadow-[0_6px_16px_rgba(31,18,51,0.04)]">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <h3 className="text-sm font-bold text-(--color-ink-strong)">{title}</h3>
                    {lines.map((line) => (
                        <p key={line} className="text-xs text-(--color-text-muted)">
                            {line}
                        </p>
                    ))}
                </div>
                {badgeText ? (
                    <span className="whitespace-nowrap rounded-full bg-brand-soft px-2.5 py-1 text-[0.7rem] font-semibold text-brand-primary">
                        {badgeText}
                    </span>
                ) : null}
            </div>
        </article>
    );
}

export default HistoryItemCard;
