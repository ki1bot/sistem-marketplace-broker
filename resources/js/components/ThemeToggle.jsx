export default function ThemeToggle({ theme, onToggle }) {
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={isDark ? "Ubah ke tema terang" : "Ubah ke tema gelap"}
            title={isDark ? "Tema gelap aktif" : "Tema terang aktif"}
            aria-pressed={isDark}
            className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 border-2 ${
                isDark
                    ? "bg-slate-800 border-slate-700 focus:ring-slate-500 focus:ring-offset-slate-900"
                    : "bg-white border-slate-800 focus:ring-slate-400 focus:ring-offset-white"
            }`}
        >
            <span className="sr-only">Toggle theme</span>

            <span className="absolute inset-0 flex items-center justify-between px-[9px] pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-[18px] text-slate-400 dark:text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m4.93 19.07 1.41-1.41" />
                    <path d="m17.66 6.34 1.41-1.41" />
                </svg>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-[18px] text-slate-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M21.64 13.02a1 1 0 0 0-1.05-.24A8 8 0 0 1 11.22 3.4a1 1 0 0 0-1.29-1.29A10 10 0 1 0 21.9 14.31a1 1 0 0 0-.26-1.29Z" />
                </svg>
            </span>

            <span
                className={`absolute left-[2px] top-[2px] flex h-8 w-8 transform items-center justify-center rounded-full transition-transform duration-300 ${
                    isDark
                        ? "translate-x-10 bg-slate-700 text-blue-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-inset ring-white/10"
                        : "translate-x-0 bg-[#FFB800] text-slate-900 shadow-sm"
                }`}
            >
                {isDark ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[18px] w-[18px]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M21.64 13.02a1 1 0 0 0-1.05-.24A8 8 0 0 1 11.22 3.4a1 1 0 0 0-1.29-1.29A10 10 0 1 0 21.9 14.31a1 1 0 0 0-.26-1.29Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[18px] w-[18px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m4.93 19.07 1.41-1.41" />
                        <path d="m17.66 6.34 1.41-1.41" />
                    </svg>
                )}
            </span>
        </button>
    );
}
