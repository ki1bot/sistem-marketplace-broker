import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../data/entities.js";
import SearchInput from "./SearchInput.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function MenuIcon() {
    return (
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
        </svg>
    );
}

export default function Navbar({
    theme,
    onToggleTheme,
    pageSearch,
    setPageSearch,
    onOpenSidebar,
}) {
    const navigate = useNavigate();

    const filteredPages = useMemo(() => {
        const keyword = pageSearch.trim().toLowerCase();

        if (!keyword) {
            return [];
        }

        return MENU_ITEMS.filter((item) => {
            const title = item.title.toLowerCase();
            const path = item.path.toLowerCase();

            return title.includes(keyword) || path.includes(keyword);
        });
    }, [pageSearch]);

    function goToPage(path) {
        navigate(path);
        setPageSearch("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (filteredPages.length > 0) {
            goToPage(filteredPages[0].path);
        }
    }

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-100 transition-colors duration-300 dark:border-slate-800/80 dark:bg-[#08101f]">
            <div className="flex flex-col gap-3 px-3 py-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                        <button
                            type="button"
                            onClick={onOpenSidebar}
                            className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
                            aria-label="Buka menu"
                        >
                            <MenuIcon />
                        </button>

                        <div className="min-w-0">
                            <h1 className="truncate text-base font-black tracking-tight text-slate-900 dark:text-white sm:text-lg">
                                Sistem Marketplace Broker
                            </h1>

                            <p className="mt-1 line-clamp-2 max-w-2xl text-xs font-medium leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                                Kelola broker, buyer, seller, produk, transaksi,
                                negosiasi, komisi, dan riwayat transaksi.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 lg:hidden">
                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="relative w-full lg:w-96"
                    >
                        <SearchInput
                            value={pageSearch}
                            onChange={setPageSearch}
                            onClear={() => setPageSearch("")}
                            placeholder="Cari halaman..."
                        />

                        {pageSearch.trim() && (
                            <div className="absolute left-0 right-0 top-14 z-40 max-h-[65dvh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                                {filteredPages.length > 0 ? (
                                    filteredPages.slice(0, 8).map((item) => (
                                        <button
                                            key={item.path}
                                            type="button"
                                            onClick={() => goToPage(item.path)}
                                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            <span className="min-w-0">
                                                <span className="block truncate text-sm font-bold text-slate-800 dark:text-white">
                                                    {item.title}
                                                </span>
                                                <span className="block truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    {item.path}
                                                </span>
                                            </span>

                                            <span className="shrink-0 text-xs font-black text-slate-400">
                                                ↵
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-4">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                            Halaman tidak ditemukan.
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                            Coba cari dashboard, broker, buyer,
                                            seller, produk, transaksi, komisi,
                                            atau riwayat.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>

                    <div className="hidden lg:block">
                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                    </div>
                </div>
            </div>
        </header>
    );
}
