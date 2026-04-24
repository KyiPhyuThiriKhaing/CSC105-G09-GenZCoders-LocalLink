import type { ComponentType } from "react";
import styles from "../AdminDashboardPage.module.css";
import AdminDashboardStatCard from "./AdminDashboardStatCard";

type StatItem = {
  label: string;
  value: number;
  Icon: ComponentType<{ className?: string }>;
  color?: "primary" | "warning" | "success" | "danger" | string;
};

type AdminDashboardStatsGridProps = {
  stats: StatItem[];
};

function AdminDashboardStatsGrid({ stats }: AdminDashboardStatsGridProps) {
  return (
    <section className={styles.statsGrid} aria-label="Dashboard statistics">
      {stats.map((stat) => (
        <AdminDashboardStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          Icon={stat.Icon}
          color={stat.color}
        />
      ))}
    </section>
  );
}

export default AdminDashboardStatsGrid;
