import {
  ClockIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboardPage.module.css";
import AdminDashboardHeader from "./components/AdminDashboardHeader";
import AdminDashboardStatsGrid from "./components/AdminDashboardStatsGrid";
import AdminDashboardQuickActions from "./components/AdminDashboardQuickActions";
import { getDashboardStats, getSubmissionCount } from "../../../../../lib/adminApi";

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    rejectedSubmissions: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      const [dashboard, approved, rejected] = await Promise.all([
        getDashboardStats(),
        getSubmissionCount("APPROVED"),
        getSubmissionCount("REJECTED"),
      ]);

      if (!isMounted) return;

      setStats({
        totalSubmissions: dashboard.totalSubmissions,
        pendingSubmissions: dashboard.pendingSubmissions,
        approvedSubmissions: approved,
        rejectedSubmissions: rejected,
      });
    };

    loadStats().catch(() => {
      if (isMounted) {
        setStats({
          totalSubmissions: 0,
          pendingSubmissions: 0,
          approvedSubmissions: 0,
          rejectedSubmissions: 0,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const dashboardStats = useMemo(
    () =>
      [
        {
          label: "Total Submissions",
          value: stats.totalSubmissions,
          Icon: FileTextIcon,
          color: "primary",
        },
        {
          label: "Pending Review",
          value: stats.pendingSubmissions,
          Icon: ClockIcon,
          color: "warning",
        },
        {
          label: "Approved",
          value: stats.approvedSubmissions,
          Icon: CheckCircledIcon,
          color: "success",
        },
        {
          label: "Rejected",
          value: stats.rejectedSubmissions,
          Icon: CrossCircledIcon,
          color: "danger",
        },
      ] as const,
    [stats],
  );

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
      <AdminDashboardStatsGrid stats={[...dashboardStats]} />
      <AdminDashboardQuickActions actions={[...quickActions]} />
    </div>
  );
}

export default AdminDashboardPage;
