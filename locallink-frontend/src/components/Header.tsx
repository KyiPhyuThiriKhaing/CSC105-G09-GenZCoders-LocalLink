import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

type ProfileMenuItem = {
  label: string;
  to: string;
};

const profileMenuItems: ProfileMenuItem[] = [
  { label: "My Profile", to: "/profile/my-profile" },
  { label: "Verification", to: "/profile/verify" },
  { label: "History", to: "/profile/history" },
  { label: "Settings", to: "/profile/settings" },
  { label: "Chat", to: "/profile/chat" },
];

function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileMenuOpen]);

  const handleOpenLogoutModal = () => {
    setIsProfileMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogoutConfirm = () => {
    // Placeholder until logout API/auth flow is implemented.
    setIsLogoutModalOpen(false);
  };

  return (
    <header className="bg-[var(--color-brand-primary)] px-5 py-3.5 text-white sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <h1 className="flex items-center gap-2">
          <img src="/locallink.png" alt="" className="h-8 w-auto" aria-hidden="true" />
          <span className="text-lg font-extrabold tracking-tight">Local Link</span>
        </h1>

        <nav className="flex items-center gap-5">
          <NavLink to="/" className={linkClassName}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={linkClassName}>
            Jobs
          </NavLink>

          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              className={profileIconClassName({ isActive: isProfileMenuOpen })}
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-3.33 0-6 1.57-6 3.5V19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1.5C18 15.57 15.33 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {isProfileMenuOpen && (
              <div
                className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-slate-800 shadow-xl"
                role="menu"
              >
                {profileMenuItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition ${
                        isActive
                          ? "bg-brand-soft font-semibold text-brand-primary"
                          : "hover:bg-slate-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOpenLogoutModal}
                  className="block w-full px-4 py-2 text-left text-sm transition hover:bg-slate-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="header-logout-modal-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-(--color-ink-strong) shadow-xl">
            <h2 id="header-logout-modal-title" className="text-lg font-bold">
              Confirm Log Out
            </h2>
            <p className="mt-2 text-sm text-slate-600">Are you sure you want to log out?</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeLogoutModal}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;