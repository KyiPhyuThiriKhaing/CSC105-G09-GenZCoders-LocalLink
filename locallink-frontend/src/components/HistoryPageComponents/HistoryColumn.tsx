import HistoryItemCard from "./HistoryItemCard";

type HistoryItem = {
    title: string;
    lines: string[];
    badgeText?: string;
};

type HistoryColumnProps = {
    title: string;
    items: HistoryItem[];
};

function HistoryColumn({ title, items }: HistoryColumnProps) {
    return (
        <section className="rounded-2xl border border-(--color-ink-border-soft) bg-white p-5 shadow-sm sm:p-6">
            <header className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-(--color-ink-strong)">{title}</h2>
            </header>
            <div className="space-y-3">
                {items.map((item) => (
                    <HistoryItemCard key={item.title} title={item.title} lines={item.lines} badgeText={item.badgeText} />
                ))}
            </div>
        </section>
    );
}

export default HistoryColumn;
