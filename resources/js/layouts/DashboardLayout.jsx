import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        return window.innerWidth >= 1024;
    });

    const [pageSearch, setPageSearch] = useState("");

    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "dark";
        }

        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        let timer;

        function handleResize() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                }
            }, 100);
        }

        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
            root.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            root.style.colorScheme = "light";
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggleTheme = useCallback(() => {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
        );
    }, []);

    const handleOpenSidebar = useCallback(() => setSidebarOpen(true), []);
    const handleOpenMenu = useCallback(() => setSidebarOpen(true), []);

    return (
        <div className="min-h-dvh overflow-x-hidden bg-slate-100 text-slate-950 transition-colors duration-300 dark:bg-[#08101f] dark:text-white">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <main
                className={`min-h-dvh transition-[padding] duration-300 ${
                    sidebarOpen ? "lg:pl-72" : "lg:pl-20"
                }`}
            >
                <Navbar
                    theme={theme}
                    onToggleTheme={handleToggleTheme}
                    pageSearch={pageSearch}
                    setPageSearch={setPageSearch}
                    onOpenSidebar={handleOpenSidebar}
                />

                <div className="px-3 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4 sm:px-4 lg:px-6 lg:pb-6 lg:pt-5">
                    <Outlet />
                </div>
            </main>

            <MobileBottomNav onOpenMenu={handleOpenMenu} />
        </div>
    );
}
