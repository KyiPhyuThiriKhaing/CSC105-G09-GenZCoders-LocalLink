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
    <div className="min-h-screen bg-brand-soft text-(--color-ink-strong)">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-8">

        <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-3">
          <HistoryColumn title="Jobs Applied" items={jobsApplied} />
          <HistoryColumn title="Jobs Offered" items={jobsOffered} />
          <HistoryColumn title="Jobs Accepted" items={jobsAccepted} />
        </div>
      </div>
    </div>
  );
}