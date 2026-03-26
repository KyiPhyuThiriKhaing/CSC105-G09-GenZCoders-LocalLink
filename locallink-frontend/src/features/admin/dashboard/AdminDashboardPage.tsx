import {
  ClockIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboardPage.module.css";
import AdminDashboardHeader from "./components/AdminDashboardHeader";
import AdminDashboardStatsGrid from "./components/AdminDashboardStatsGrid";
import AdminDashboardQuickActions from "./components/AdminDashboardQuickActions";

const DASHBOARD_STATS = [
  { label: "Total Submissions", value: 8, Icon: FileTextIcon },
  { label: "Pending Review", value: 4, Icon: ClockIcon },
  { label: "Approved", value: 2, Icon: CheckCircledIcon },
  { label: "Rejected", value: 2, Icon: CrossCircledIcon },
] as const;

function AdminDashboardPage() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Review Submissions",
      text: "Manage documents",
      onClick: () => navigate("/admin/submissions"),
    },
    {
      title: "View Users",
      text: "Manage users",
      onClick: () => navigate("/admin/users"),
    },
  ] as const;

  return (
    <div className={styles.page}>
      <AdminDashboardHeader
        title="Dashboard Overview"
        subtitle="Monitor and manage account validation submissions"
      />
      <AdminDashboardStatsGrid stats={[...DASHBOARD_STATS]} />
      <AdminDashboardQuickActions actions={[...quickActions]} />
    </div>
  );
}

export default AdminDashboardPage;
