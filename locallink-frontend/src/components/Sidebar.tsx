import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PersonIcon, CheckCircledIcon, ClockIcon, GearIcon, ChatBubbleIcon, ExitIcon } from "@radix-ui/react-icons";

type NavItem = {
    label: string;
    href: string;
    icon: ReactNode;
};

const items: NavItem[] = [
    { label: "My Profile", href: "/profile/my-profile", icon: <PersonIcon className="h-5 w-5" /> },
    { label: "Verification", href: "/profile/verify", icon: <CheckCircledIcon className="h-5 w-5" /> },
    { label: "History", href: "/profile/history", icon: <ClockIcon className="h-5 w-5" /> },
    { label: "Settings", href: "/profile/settings", icon: <GearIcon className="h-5 w-5" /> },
    { label: "Chat", href: "/profile/chat", icon: <ChatBubbleIcon className="h-5 w-5" /> },
    { label: "Log Out", href: "/logout", icon: <ExitIcon className="h-5 w-5" /> },
];

type SidebarProps = {
    activeKey?: string;
};

function Sidebar({ activeKey }: SidebarProps) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);
    const handleLogoutConfirm = () => closeLogoutModal();

    return (
        <>
            <aside className="sticky top-32">
                <nav className="flex flex-col gap-1.5">
                    {items.map((item) => {
                        const sharedClassName = `group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-focus-ring)] ${
                            activeKey === item.label
                                ? "bg-[var(--color-brand-primary)] text-white shadow-md shadow-[var(--color-brand-primary)]/20"
                                : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                        }`;

                        const iconClassName = `transition-transform group-hover:scale-110 ${
                             activeKey === item.label ? "text-white" : "text-slate-400 group-hover:text-[var(--color-brand-primary)]"
                        }`;

                        if (item.label === "Log Out") {
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={openLogoutModal}
                                    className="group mt-4 flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-600 transition-all hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-100"
                                >
                                    <span className="text-red-400 transition-transform group-hover:scale-110 group-hover:text-red-600">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            );
                        }

                        return (
                            <Link key={item.label} to={item.href} className={sharedClassName}>
                                <span className={iconClassName}>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-2xl animate-in zoom-in-95">
                        <h2 className="text-xl font-bold text-slate-900">Sign out</h2>
                        <p className="mt-2.5 text-sm text-slate-500">Are you sure you want to log out of your account?</p>
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

export default Sidebar;
