import AdminLayout from "../components/AdminPageComponents/AdminLayout";
import AdminSubmissionsPageContent from "../components/AdminPageComponents/features/admin/submissions/AdminSubmissionsPage";

export default function SubmissionsPage() {
  return (
    <AdminLayout>
      <AdminSubmissionsPageContent />
    </AdminLayout>
  );
}