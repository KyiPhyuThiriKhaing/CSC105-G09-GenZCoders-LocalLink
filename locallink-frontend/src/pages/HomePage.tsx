import { Link } from "react-router-dom";
import HeroSection from "../components/HomePageComponents/HeroSection";
import FeatureCardsSection from "../components/HomePageComponents/FeatureCardsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1">
        <HeroSection />
        
        <div className="relative">
          {/* Subtle background gradient for the feature section */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm pointer-events-none" />
          <div className="relative">
            <FeatureCardsSection />
            
            <div className="pb-24 pt-4 flex justify-center">
              <Link
                to="/jobs"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl border border-slate-100"
              >
                Browse All Jobs 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-brand-primary)] transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
