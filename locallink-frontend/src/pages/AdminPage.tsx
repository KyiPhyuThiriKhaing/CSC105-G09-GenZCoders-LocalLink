import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F3E8FF]">
      <h1 className="text-5xl font-bold text-[#9810FA]">Admin Form</h1>
      <Outlet />
    </div>
  );
}