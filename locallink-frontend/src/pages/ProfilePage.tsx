import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileHeroCard from "../components/ProfilePageComponents/ProfileHeroCard";
import ProfileInfoSection from "../components/ProfilePageComponents/ProfileInfoSection";
import BioSection from "../components/ProfilePageComponents/BioSection";
import SkillsSection from "../components/ProfilePageComponents/SkillsSection";

export default function ProfilePage() {
  const { pathname } = useLocation();
  const isBaseProfile = pathname === "/profile" || pathname === "/profile/";

  if (!isBaseProfile) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-brand-soft text-(--color-ink-strong)">
      <div className="flex gap-6 px-6 pb-12 pt-6 lg:pt-8">
        <Sidebar activeKey="My Profile" />

        <div className="flex-1 space-y-5">
          <ProfileHeroCard />
          <ProfileInfoSection />
          <BioSection />
          <SkillsSection />
        </div>
      </div>
    </div>
  );
}