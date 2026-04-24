import PromoCard from "./PromoCard";

function FeatureCardsSection() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-14">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-[var(--color-ink-strong)] sm:text-xl">Why choose LocalLink?</h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Everything you need to find work or get help locally.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <PromoCard
                    title="Find Work Near You"
                    description="Browse local tasks that match your skills and earn in your spare time — completely free"
                    buttonText="Browse Jobs"
                />
                <PromoCard
                    title="Post a Task for Free"
                    description="Need a hand? Post any task and connect with trusted helpers in your community today"
                    buttonText="Post a Task"
                />
            </div>
        </section>
    );
}

export default FeatureCardsSection;
