import AdminLayout from "../components/AdminPageComponents/AdminLayout";
import AdminUsersPageContent from "../components/AdminPageComponents/features/admin/users/AdminUsersPage";

export default function UsersPage() {
  return (
    <AdminLayout>
      <AdminUsersPageContent />
    </AdminLayout>
  );
}