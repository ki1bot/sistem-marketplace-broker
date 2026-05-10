import { useState } from "react";
import { NavLink } from "react-router-dom";

function Icon({ type }) {
    const base = "h-5 w-5";

    const icons = {
        dashboard: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
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
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
                <path d="M4 12.5 12 17l8-4.5" />
                <path d="M4 17.5 12 22l8-4.5" />
            </svg>
        ),

        customers: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9.5" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),

        seller: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 21V9l8-6 8 6v12" />
                <path d="M9 21v-8h6v8" />
                <path d="M9 10h6" />
            </svg>
        ),

        transaksi: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h6" />
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
            </svg>
        ),

        negosiasi: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                <path d="M5 11h14v10H5z" />
                <path d="M9 15h6" />
            </svg>
        ),

        komisi: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="9" />
                <path d="M15 9.5c-.6-.9-1.7-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.4-.6-3-1.5" />
                <path d="M12 6v12" />
            </svg>
        ),

        broker: (
            <svg
                className={base}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 11h-6" />
                <path d="M19 8v6" />
            </svg>
        ),

        chevron: (
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        ),
    };

    return icons[type] || null;
}

function SidebarToggleButton({ open, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={open ? "Perkecil sidebar" : "Perbesar sidebar"}
            className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 lg:flex"
        >
            <span className="relative block h-4 w-4">
                <span
                    className={`absolute left-0 top-[3px] h-[2px] w-4 rounded-full bg-current transition ${
                        open ? "translate-y-[5px] rotate-45" : ""
                    }`}
                />

                <span
                    className={`absolute left-0 top-[8px] h-[2px] w-4 rounded-full bg-current transition ${
                        open ? "scale-x-0 opacity-0" : ""
                    }`}
                />

                <span
                    className={`absolute left-0 top-[13px] h-[2px] w-4 rounded-full bg-current transition ${
                        open ? "-translate-y-[5px] -rotate-45" : ""
                    }`}
                />
            </span>
        </button>
    );
}

function SidebarLink({ to, icon, label, open, onNavigate }) {
    return (
        <NavLink
            to={to}
            title={!open ? label : undefined}
            onClick={onNavigate}
            className={({ isActive }) =>
                `group relative flex min-h-12 items-center rounded-2xl text-sm font-bold transition-all duration-300 ${
                    open ? "w-full gap-3 px-4" : "w-12 justify-center"
                } ${
                    isActive
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
                }`
            }
        >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Icon type={icon} />
            </span>

            {open && <span className="truncate">{label}</span>}
        </NavLink>
    );
}

function SidebarGroup({ title, icon, open, expanded, onToggle, children }) {
    return (
        <div className="space-y-2">
            {open ? (
                <button
                    type="button"
                    onClick={onToggle}
                    className="group flex h-11 w-full items-center justify-between rounded-2xl px-4 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                >
                    <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 dark:text-slate-400">
                            <Icon type={icon} />
                        </span>

                        <span className="truncate text-[12px] font-black uppercase tracking-[0.18em] text-slate-800 dark:text-slate-100">
                            {title}
                        </span>
                    </span>

                    <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition ${
                            expanded
                                ? "rotate-180 bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400"
                        }`}
                    >
                        <Icon type="chevron" />
                    </span>
                </button>
            ) : (
                <div className="flex justify-center pt-3">
                    <span className="h-px w-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
            )}

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    open
                        ? expanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        : "max-h-[500px] opacity-100"
                }`}
            >
                <div className="flex flex-col gap-2">{children}</div>
            </div>
        </div>
    );
}

export default function Sidebar({ open, setOpen }) {
    const [dataOpen, setDataOpen] = useState(true);
    const [customersOpen, setCustomersOpen] = useState(true);
    const [transaksiOpen, setTransaksiOpen] = useState(true);

    function closeOnMobile() {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setOpen(false);
        }
    }

    return (
        <>
            {open && (
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
                    aria-label="Tutup menu"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-dvh flex-col border-r border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-800 dark:bg-[#0b1220] lg:shadow-none ${
                    open
                        ? "w-[86vw] max-w-80 translate-x-0 lg:w-72 lg:max-w-none"
                        : "-translate-x-full lg:w-20 lg:translate-x-0"
                }`}
            >
                <div
                    className={`flex items-center gap-3 border-b border-slate-200 py-4 dark:border-slate-800 ${
                        open ? "justify-between px-4" : "justify-center px-0"
                    }`}
                >
                    {open && (
                        <div className="min-w-0 pl-3">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
                                Sistem Basis Data 2
                            </p>

                            <h2 className="mt-1 truncate text-base font-black text-slate-900 dark:text-white">
                                Kelompok 8
                            </h2>
                        </div>
                    )}

                    <SidebarToggleButton
                        open={open}
                        onClick={() => setOpen((current) => !current)}
                    />

                    {open && (
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-2xl leading-none text-slate-600 active:scale-95 dark:bg-slate-900 dark:text-slate-300 lg:hidden"
                            aria-label="Tutup menu"
                        >
                            ×
                        </button>
                    )}
                </div>

                <nav className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                    <SidebarLink
                        to="/"
                        icon="dashboard"
                        label="Dashboard"
                        open={open}
                        onNavigate={closeOnMobile}
                    />

                    <SidebarGroup
                        title="Master Data"
                        icon="produk"
                        open={open}
                        expanded={dataOpen}
                        onToggle={() => setDataOpen((current) => !current)}
                    >
                        <SidebarLink
                            to="/produk"
                            icon="produk"
                            label="Produk"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/produk-tambang"
                            icon="produk"
                            label="Produk Tambang"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/produk-nontambang"
                            icon="produk"
                            label="Produk Non Tambang"
                            open={open}
                            onNavigate={closeOnMobile}
                        />
                    </SidebarGroup>

                    <SidebarGroup
                        title="Pihak"
                        icon="customers"
                        open={open}
                        expanded={customersOpen}
                        onToggle={() => setCustomersOpen((current) => !current)}
                    >
                        <SidebarLink
                            to="/broker"
                            icon="broker"
                            label="Broker"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/buyer"
                            icon="customers"
                            label="Buyer"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/seller"
                            icon="seller"
                            label="Seller"
                            open={open}
                            onNavigate={closeOnMobile}
                        />
                    </SidebarGroup>

                    <SidebarGroup
                        title="Transaksi"
                        icon="transaksi"
                        open={open}
                        expanded={transaksiOpen}
                        onToggle={() => setTransaksiOpen((current) => !current)}
                    >
                        <SidebarLink
                            to="/transaksi"
                            icon="transaksi"
                            label="Transaksi"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/negosiasi"
                            icon="negosiasi"
                            label="Negosiasi"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/riwayat-transaksi"
                            icon="transaksi"
                            label="Riwayat Transaksi"
                            open={open}
                            onNavigate={closeOnMobile}
                        />

                        <SidebarLink
                            to="/komisi"
                            icon="komisi"
                            label="Komisi"
                            open={open}
                            onNavigate={closeOnMobile}
                        />
                    </SidebarGroup>
                </nav>
            </aside>
        </>
    );
}
