import ProfileHeroCard from "../components/ProfilePageComponents/ProfileHeroCard";
import ProfileInfoSection from "../components/ProfilePageComponents/ProfileInfoSection";
import BioSection from "../components/ProfilePageComponents/BioSection";
import SkillsSection from "../components/ProfilePageComponents/SkillsSection";

export default function MyProfilePage() {
  return (
    <div className="space-y-5">
      <ProfileHeroCard />
      <ProfileInfoSection />
      <BioSection />
      <SkillsSection />
    </div>
  );
}