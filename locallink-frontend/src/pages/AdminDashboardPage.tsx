import AdminLayout from "../components/AdminPageComponents/AdminLayout";
import AdminDashboardContent from "../features/admin/dashboard/AdminDashboardPage";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminDashboardContent />
    </AdminLayout>
  );
}