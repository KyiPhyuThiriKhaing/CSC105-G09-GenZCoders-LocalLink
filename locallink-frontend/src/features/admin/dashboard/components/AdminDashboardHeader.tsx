import styles from "../AdminDashboardPage.module.css";

type AdminDashboardHeaderProps = {
  title: string;
  subtitle: string;
};

function AdminDashboardHeader({ title, subtitle }: AdminDashboardHeaderProps) {
  return (
    <section className={styles.headerWrap}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerSubtitle}>{subtitle}</p>
    </section>
  );
}

export default AdminDashboardHeader;
