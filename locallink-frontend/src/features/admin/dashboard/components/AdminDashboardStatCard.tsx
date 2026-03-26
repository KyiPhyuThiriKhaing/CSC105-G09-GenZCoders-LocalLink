import type { ComponentType } from "react";
import styles from "../AdminDashboardPage.module.css";

type AdminDashboardStatCardProps = {
  label: string;
  value: number;
  Icon: ComponentType<{ className?: string }>;
};

function AdminDashboardStatCard({ label, value, Icon }: AdminDashboardStatCardProps) {
  return (
    <article className={styles.statCard}>
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
