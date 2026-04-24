import type { ComponentType } from "react";
import styles from "../AdminDashboardPage.module.css";

type AdminDashboardStatCardProps = {
  label: string;
  value: number;
  Icon: ComponentType<{ className?: string }>;
  color?: "primary" | "warning" | "success" | "danger" | string;
};

function AdminDashboardStatCard({
  label,
  value,
  Icon,
  color = "primary",
}: AdminDashboardStatCardProps) {
  const colorClass = styles[`statCard--${color}`] || styles["statCard--primary"];

  return (
    <article className={`${styles.statCard} ${colorClass}`}>
      <div className={styles.statTop}>
        <p className={styles.statLabel}>{label}</p>
        <span className={styles.statIconWrap} aria-hidden="true">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className={styles.statValue}>{value}</p>
    </article>
  );
}

export default AdminDashboardStatCard;
