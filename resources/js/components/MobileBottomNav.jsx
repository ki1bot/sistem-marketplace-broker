import { NavLink } from "react-router-dom";

function Icon({ type }) {
    const common = "h-5 w-5";

    const icons = {
        dashboard: (
            <svg
                className={common}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 13h8V3H3v10Z" />
                <path d="M13 21h8V11h-8v10Z" />
                <path d="M13 3v6h8V3h-8Z" />
                <path d="M3 21h8v-6H3v6Z" />
            </svg>
        ),
        produk: (
            <svg
                className={common}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
                <path d="M4 12.5 12 17l8-4.5" />
                <path d="M4 17.5 12 22l8-4.5" />
            </svg>
        ),
        transaksi: (
            <svg
                className={common}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h6" />
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
            </svg>
        ),
        broker: (
            <svg
                className={common}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9.5" cy="7" r="4" />
                <path d="M19 8v6" />
                <path d="M16 11h6" />
            </svg>
        ),
        menu: (
            <svg
                className={common}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
            </svg>
        ),
    };

    return icons[type] || null;
}

function BottomLink({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-black transition ${
                    isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                        : "text-slate-500 active:bg-slate-100 dark:text-slate-400 dark:active:bg-slate-800"
                }`
            }
        >
            <Icon type={icon} />
            <span className="truncate">{label}</span>
        </NavLink>
    );
}

export default function MobileBottomNav({ onOpenMenu }) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 lg:hidden">
            <div className="mx-auto flex max-w-md items-center gap-1">
                <BottomLink to="/" icon="dashboard" label="Home" />
                <BottomLink to="/produk" icon="produk" label="Produk" />
                <BottomLink
                    to="/transaksi"
                    icon="transaksi"
                    label="Transaksi"
                />
                <BottomLink to="/broker" icon="broker" label="Broker" />

                <button
                    type="button"
                    onClick={onOpenMenu}
                    className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-black text-slate-500 transition active:bg-slate-100 dark:text-slate-400 dark:active:bg-slate-800"
                    aria-label="Buka semua menu"
                >
                    <Icon type="menu" />
                    <span className="truncate">Menu</span>
                </button>
            </div>
        </nav>
    );
}
