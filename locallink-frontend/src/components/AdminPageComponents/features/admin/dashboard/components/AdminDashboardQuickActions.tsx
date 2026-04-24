import styles from "../AdminDashboardPage.module.css";
import AdminDashboardActionCard from "./AdminDashboardActionCard";

type ActionItem = {
  title: string;
  text: string;
  onClick?: () => void;
};

type AdminDashboardQuickActionsProps = {
  actions: ActionItem[];
};

function AdminDashboardQuickActions({
  actions,
}: AdminDashboardQuickActionsProps) {
  return (
    <section className={styles.actionsWrap}>
      <h2 className={styles.actionsTitle}>Quick Actions</h2>
      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <AdminDashboardActionCard
            key={action.title}
            title={action.title}
            text={action.text}
            onClick={action.onClick}
          />
        ))}
      </div>
    </section>
  );
}

export default AdminDashboardQuickActions;
