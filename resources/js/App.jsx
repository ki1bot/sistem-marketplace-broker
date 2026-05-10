import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import { ENTITIES } from "./data/entities.js";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const EntityPage = lazy(() => import("./pages/EntityPage.jsx"));

function LoadingScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900">
                Memuat halaman...
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    {ENTITIES.map((entity) => (
                        <Route
                            key={entity.key}
                            path={entity.path}
                            element={<EntityPage entity={entity} />}
                        />
                    ))}
                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </Suspense>
    );
}
