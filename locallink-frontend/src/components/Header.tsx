import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { currentUser } from "../data/mockUsers";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isProfileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) setIsProfileMenuOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProfileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const handleOpenLogoutModal = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const handleLogoutConfirm = () => setIsLogoutModalOpen(false);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-bold transition-all duration-200 ${isActive
      ? "text-[var(--color-brand-primary)] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-full after:bg-[var(--color-brand-primary)] after:rounded-t-full"
      : "text-slate-500 hover:text-slate-900"
    }`;

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `block py-3 text-2xl font-bold transition-colors ${isActive ? "text-[var(--color-brand-primary)]" : "text-slate-900 hover:text-[var(--color-brand-primary)]"
    }`;

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border-b border-white/20" : "bg-white border-b border-transparent"}`}>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-6">

          <div className="flex items-center gap-4">
            <NavLink to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <img src="/locallink.png" alt="" className="h-8 w-auto" aria-hidden="true" />
              <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">Local Link</span>
            </NavLink>
          </div>

          <nav className="flex items-center gap-3 sm:gap-8">
            <div className="hidden items-center gap-8 md:flex mr-2">
              <NavLink to="/" className={linkClassName}>Home</NavLink>
              <NavLink to="/jobs" className={linkClassName}>Jobs</NavLink>
            </div>

            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${isProfileMenuOpen ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-soft)] shadow-sm scale-105' : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100'}`}
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=f8fafc`} alt="Profile" className="h-full w-full rounded-full object-cover" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-[4.25rem] z-50 w-60 overflow-hidden rounded-[1.5rem] border border-white/50 bg-white/95 p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 mb-1 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.name.split(' ').join('.').toLowerCase()}@example.com</p>
                  </div>
                  {profileMenuItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={({ isActive }) => `block rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${isActive ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-primary)]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="my-1 h-px bg-slate-100" />
                  <button
                    type="button"
                    onClick={handleOpenLogoutModal}
                    className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-700 transition hover:bg-slate-100 md:hidden border border-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90 hidden" : "block"}`}>
                <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isMobileMenuOpen ? "block" : "hidden"}`}>
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl md:hidden animate-in fade-in pt-24 px-6 flex flex-col">
          <nav className="flex flex-col space-y-4">
            <NavLink to="/" className={mobileLinkClassName}>Home</NavLink>
            <NavLink to="/jobs" className={mobileLinkClassName}>Jobs</NavLink>
            <div className="h-px w-full bg-slate-100 my-4" />
            {profileMenuItems.map((item) => (
              <NavLink key={item.label} to={item.to} className={({ isActive }) => `block py-3 text-lg font-bold transition-colors ${isActive ? "text-[var(--color-brand-primary)]" : "text-slate-600"}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pb-10">
            <button
              onClick={handleOpenLogoutModal}
              className="w-full rounded-2xl bg-red-50 py-4 text-base font-bold text-red-600 transition hover:bg-red-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm scale-100 rounded-[2rem] bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-xl font-bold text-slate-900">Sign out</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">Are you sure you want to sign out of your account?</p>
            <div className="mt-8 flex gap-3">
              <button onClick={closeLogoutModal} className="w-full rounded-2xl border border-slate-200 p-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Cancel</button>
              <button onClick={handleLogoutConfirm} className="w-full rounded-2xl bg-red-600 p-3 text-sm font-bold text-white transition hover:bg-red-700 shadow-lg shadow-red-600/20">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
