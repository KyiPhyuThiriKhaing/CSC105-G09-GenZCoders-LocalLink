import styles from "../AdminDashboardPage.module.css";

type AdminDashboardActionCardProps = {
  title: string;
  text: string;
  onClick?: () => void;
};

function AdminDashboardActionCard({ title, text, onClick }: AdminDashboardActionCardProps) {
  return (
    <button type="button" onClick={onClick} className={styles.actionCard}>
      <p className={styles.actionTitle}>{title}</p>
      <p className={styles.actionText}>{text}</p>
    </button>
  );
}

export default AdminDashboardActionCard;
