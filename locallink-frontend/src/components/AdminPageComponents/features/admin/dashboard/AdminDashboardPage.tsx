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
import { MOCK_DASHBOARD_STATS } from "../../../../../data/mockAdminData";

const DASHBOARD_STATS = [
  { ...MOCK_DASHBOARD_STATS[0], Icon: FileTextIcon },
  { ...MOCK_DASHBOARD_STATS[1], Icon: ClockIcon },
  { ...MOCK_DASHBOARD_STATS[2], Icon: CheckCircledIcon },
  { ...MOCK_DASHBOARD_STATS[3], Icon: CrossCircledIcon },
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
