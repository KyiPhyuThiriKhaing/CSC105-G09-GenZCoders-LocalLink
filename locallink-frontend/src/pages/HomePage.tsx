import { Link } from "react-router-dom";
import HeroSection from "../components/HomePageComponents/HeroSection";
import FeatureCardsSection from "../components/HomePageComponents/FeatureCardsSection";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-soft text-(--color-ink-strong)">
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <HeroSection />
        <FeatureCardsSection />

        <div className="mt-6 flex justify-center">
          <Link
            to="/jobs"
            className="text-base font-semibold text-brand-primary transition hover:text-brand-primary hover:underline"
          >
            Browse All Jobs →
          </Link>
        </div>
      </main>
    </div>
  );
}