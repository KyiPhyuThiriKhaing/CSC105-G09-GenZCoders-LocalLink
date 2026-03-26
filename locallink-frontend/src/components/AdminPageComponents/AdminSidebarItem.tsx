import { NavLink } from "react-router-dom";
import type { ComponentType } from "react";

type AdminSidebarItemProps = {
  to: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick?: () => void;
};

function AdminSidebarItem({ to, label, Icon, isActive, onClick }: AdminSidebarItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors " +
        (isActive
          ? "bg-[var(--color-brand-primary)] text-white"
          : "text-[var(--color-brand-soft)]/90 hover:bg-white/15 hover:text-white")
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

export default AdminSidebarItem;
