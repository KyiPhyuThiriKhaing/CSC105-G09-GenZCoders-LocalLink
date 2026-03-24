import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-brand-soft">
      <h1 className="text-5xl font-bold text-brand-primary">Admin Form</h1>
      <Outlet />
    </div>
  );
}