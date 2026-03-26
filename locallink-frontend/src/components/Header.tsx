import { NavLink } from "react-router-dom";

function Header() {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "underline font-bold text-[var(--color-brand-soft)]"
      : "text-white/90 hover:text-[var(--color-brand-soft)]";

  const profileIconClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded-full p-1.5 transition ${
      isActive
        ? "bg-white/15 text-[var(--color-brand-soft)]"
        : "text-white/90 hover:bg-white/10 hover:text-[var(--color-brand-soft)]"
    }`;

  return (
    <header className="bg-brand-primary px-2 py-3 text-white sm:px-3">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Local Link</h1>

        <nav className="flex items-center gap-5">
        <NavLink to="/" className={linkClassName}>
          Home
        </NavLink>
        <NavLink to="/jobs" className={linkClassName}>
          Jobs
        </NavLink>
        <NavLink to="/profile" className={profileIconClassName} aria-label="Profile">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-3.33 0-6 1.57-6 3.5V19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1.5C18 15.57 15.33 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;