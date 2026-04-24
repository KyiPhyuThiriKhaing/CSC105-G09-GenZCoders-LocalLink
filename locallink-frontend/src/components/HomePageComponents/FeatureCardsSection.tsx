import PromoCard from "./PromoCard";

function FeatureCardsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">
          Why choose <span className="text-[var(--color-brand-primary)]">Local Link?</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Everything you need to find flexible work or get an extra hand from neighbors you can trust.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        <PromoCard
          title="Find Work Near You"
          description="Browse local tasks that match your skills and earn in your spare time — completely free to join and work."
          buttonText="Browse Jobs"
        />
        <PromoCard
          title="Post a Task for Free"
          description="Need a hand with moving, cleaning, or tutoring? Post any task and connect with trusted helpers today."
          buttonText="Post a Task"
        />
      </div>
    </section>
  );
}

export default FeatureCardsSection;
