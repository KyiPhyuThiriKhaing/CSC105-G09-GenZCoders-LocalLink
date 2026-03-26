import PromoCard from "./PromoCard";

function FeatureCardsSection() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-2">
                <PromoCard
                    title="Build Your Career Path"
                    description="Get personalized job recommendations based on your skills"
                    buttonText="Get Started"
                />
                <PromoCard
                    title="Premium Employer Access"
                    description="Stand out to recruiters with a premium profile"
                    buttonText="Upgrade Now"
                />
            </div>
        </section>
    );
}

export default FeatureCardsSection;
