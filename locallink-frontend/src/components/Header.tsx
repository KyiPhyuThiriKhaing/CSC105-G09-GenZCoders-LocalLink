import { NavLink } from "react-router-dom";

function Header() {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "underline font-bold text-[var(--color-brand-soft)]"
      : "text-white/90 hover:text-[var(--color-brand-soft)]";

  return (
    <header className="bg-brand-primary text-white p-4">
      <h1 className="text-2xl font-bold">Local Link</h1>
      <nav className="mt-2 flex gap-4">
        <NavLink to="/" className={linkClassName}>
          Home
        </NavLink>
        <NavLink to="jobs" className={linkClassName}>
          Jobs
        </NavLink>
        <NavLink to="/profile" className={linkClassName}>
          Profile
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;