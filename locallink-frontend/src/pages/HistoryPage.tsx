import HistoryColumn from "../components/HistoryPageComponents/HistoryColumn";

const jobsApplied = [
  { title: "Lawn Mowing Service", lines: ["Downtown, Springfield", "$35"], badgeText: "Contacted" },
  { title: "Dog Walking", lines: ["Riverside Park", "$20"], badgeText: "Pending" },
  { title: "Grocery Delivery", lines: ["Oak Street", "$25"], badgeText: "Pending" },
];

const jobsOffered = [
  { title: "House Cleaning", lines: ["$75", "Mar 20, 2026", "8 applicants"] },
  { title: "Furniture Assembly", lines: ["$50", "Mar 18, 2026", "5 applicants"] },
  { title: "Plant Watering", lines: ["$15", "Mar 16, 2026", "12 applicants"] },
];

const jobsAccepted = [
  { title: "Pet Sitting", lines: ["Sarah Johnson", "$60"], badgeText: "Active" },
  { title: "Snow Shoveling", lines: ["Mike Davis", "$40"], badgeText: "Completed" },
];

export default function HistoryPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[var(--color-ink-strong)]">Activity History</h1>
        <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">Track your applied, offered, and accepted jobs.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HistoryColumn title="Jobs Applied" items={jobsApplied} />
        <HistoryColumn title="Jobs Offered" items={jobsOffered} />
        <HistoryColumn title="Jobs Accepted" items={jobsAccepted} />
      </div>
    </div>
  );
}
