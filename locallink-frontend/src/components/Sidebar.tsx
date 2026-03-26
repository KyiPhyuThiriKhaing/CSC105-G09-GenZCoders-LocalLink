import { useState, type ReactNode } from "react";

type NavItem = {
    label: string;
    href: string;
    icon: ReactNode;
};

const items: NavItem[] = [
    {
        label: "My Profile",
        href: "/profile/my-profile",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-3.33 0-6 1.57-6 3.5V19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1.5C18 15.57 15.33 14 12 14Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "Verification",
        href: "/profile/verify",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="m10.2 15.2-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z"
                    fill="currentColor"
                />
                <path
                    d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                />
            </svg>
        ),
    },
    {
        label: "History",
        href: "/profile/history",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 6v6l4 2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21 12a9 9 0 1 1-3.08-6.74"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19 5v3h-3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: "Settings",
        href: "/profile/settings",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94L14.5 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5l-.3 2.42c-.6.24-1.16.56-1.68.94l-2.38-.96a.5.5 0 0 0-.62.22L2.6 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.05.64-.05.94 0 .31.01.63.05.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .62.22l2.38-.96c.52.38 1.08.7 1.68.94l.3 2.42a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.3-2.42c.6-.24 1.16-.56 1.68-.94l2.39.96a.5.5 0 0 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "Chat",
        href: "/profile/chat",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M4 5h16v9a2 2 0 0 1-2 2H7l-3 3V5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7 9h10M7 12h6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        label: "Log Out",
        href: "/logout",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M15 17v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 12h10m0 0-3-3m3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

type SidebarProps = {
    activeKey?: string;
};

function Sidebar({ activeKey }: SidebarProps) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const handleLogoutConfirm = () => {
        // Placeholder until logout API/auth flow is implemented.
        closeLogoutModal();
    };

    return (
        <>
            <aside className="self-stretch min-h-[calc(100vh-3rem)] w-60 shrink-0 rounded-3xl bg-white/95 p-4 sm:p-5">
                <nav className="space-y-1">
                    {items.map((item) => {
                        const sharedClassName = `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white ${activeKey === item.label
                            ? "bg-brand-soft text-brand-primary"
                            : "text-(--color-ink-strong) hover:bg-brand-soft hover:text-brand-primary"
                            }`;

                        if (item.label === "Log Out") {
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={openLogoutModal}
                                    className={sharedClassName}
                                >
                                    <span className="text-brand-primary">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            );
                        }

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className={sharedClassName}
                            >
                                <span className="text-brand-primary">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </nav>
            </aside>

            {isLogoutModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="logout-modal-title"
                >
                    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
                        <h2 id="logout-modal-title" className="text-lg font-bold text-(--color-ink-strong)">
                            Confirm Log Out
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Are you sure you want to log out?
                        </p>
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
        </>
    );
}

export default Sidebar;
