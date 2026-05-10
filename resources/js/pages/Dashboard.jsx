import { useEffect, useMemo, useState, useRef, memo, useCallback } from "react";
import { fetchEntity } from "../api/http.js";
import { ENTITIES } from "../data/entities.js";
import { formatCurrency } from "../utils/formatters.js";

const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
];

const FULL_MONTH_NAMES = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

function getEntity(key) {
    return ENTITIES.find((entity) => entity.key === key);
}

function clampNumber(value, min, max) {
    const safeMax = Math.max(min, max);
    return Math.min(Math.max(value, min), safeMax);
}

function getTooltipPosition(event, width = 210, height = 110) {
    const rect = event.currentTarget.getBoundingClientRect();

    return {
        x: clampNumber(
            event.clientX - rect.left + 14,
            10,
            rect.width - width - 10,
        ),
        y: clampNumber(
            event.clientY - rect.top + 14,
            10,
            rect.height - height - 10,
        ),
    };
}

function parseDate(value) {
    if (!value) {
        return null;
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed;
}

function getMonthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    return `${MONTH_NAMES[Number(month) - 1]} ${year}`;
}

function getMonthLabelFull(monthKey) {
    if (!monthKey) {
        return "";
    }

    const [year, month] = monthKey.split("-");
    return `${FULL_MONTH_NAMES[Number(month) - 1]} ${year}`;
}

function addMonths(date, amount) {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

const MiniTooltip = memo(function MiniTooltip({
    show,
    position,
    title,
    children,
}) {
    if (!show) {
        return null;
    }

    return (
        <div
            className="pointer-events-none absolute z-40 w-[210px] rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-left shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-slate-700 dark:bg-[#050b1b]/95 dark:shadow-[0_18px_45px_rgba(2,6,23,0.55)]"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                {title}
            </p>

            <div className="mt-3 space-y-2">{children}</div>
        </div>
    );
});

function TooltipRow({
    label,
    value,
    color = "text-slate-500 dark:text-slate-300",
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className={`text-xs font-bold ${color}`}>{label}</span>
            <span className="text-xs font-black text-slate-900 dark:text-white">
                {value}
            </span>
        </div>
    );
}

function DashboardIcon({ type }) {
    const icons = {
        activity: (
            <svg
                className="h-9 w-9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 12h4l3-8 4 16 3-8h4" />
            </svg>
        ),
        broker: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M7 21V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" />
                <path d="M5 21h14" />
                <path d="M10 9h4" />
                <path d="M10 13h4" />
                <path d="M10 17h4" />
            </svg>
        ),
        seller: (
            <svg
                className="h-5 w-5"
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
        buyer: (
            <svg
                className="h-5 w-5"
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
        produk: (
            <svg
                className="h-5 w-5"
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
        trend: (
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 17 9 11l4 4 8-8" />
                <path d="M14 7h7v7" />
            </svg>
        ),
        pie: (
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12a9 9 0 1 1-9-9v9h9Z" />
                <path d="M12 3a9 9 0 0 1 9 9" />
            </svg>
        ),
        shield: (
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
        chart: (
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M8 16v-5" />
                <path d="M12 16V8" />
                <path d="M16 16v-3" />
            </svg>
        ),
    };

    return icons[type] || null;
}

const Panel = memo(function Panel({ children, className = "" }) {
    return (
        <section
            className={`rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-slate-700/80 dark:bg-[#111a2d] dark:shadow-[0_20px_60px_rgba(2,6,23,0.30)] ${className}`}
        >
            {children}
        </section>
    );
});

function Badge({ children, icon = "trend", color = "blue" }) {
    const colors = {
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
        green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
        orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
    };

    return (
        <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em] ${colors[color]}`}
        >
            <DashboardIcon type={icon} />
            {children}
        </div>
    );
}

const StatCard = memo(function StatCard({
    title,
    value,
    description,
    icon,
    color,
}) {
    const colors = {
        blue: "bg-blue-600",
        green: "bg-emerald-600",
        purple: "bg-violet-600",
        orange: "bg-orange-600",
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg dark:border-slate-700/80 dark:bg-[#111a2d] dark:shadow-[0_18px_45px_rgba(2,6,23,0.20)] dark:hover:border-blue-500/70">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-black text-slate-500 dark:text-slate-400">
                        {title}
                    </p>
                    <p className="mt-3 text-3xl font-black leading-none text-slate-900 dark:text-white">
                        {value}
                    </p>
                    <p className="mt-3 text-sm font-bold text-slate-400 dark:text-slate-500">
                        {description}
                    </p>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${colors[color]}`}
                >
                    <DashboardIcon type={icon} />
                </div>
            </div>
        </div>
    );
});

const FloatingActivityCard = memo(function FloatingActivityCard({
    totalAktivitas,
    totalUangTransaksi,
}) {
    return (
        <div className="marketplace-activity-float rounded-3xl bg-blue-600 p-5 lg:min-w-72">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <DashboardIcon type="activity" />
                </div>

                <div>
                    <p className="text-sm font-black text-blue-100">
                        Total Aktivitas
                    </p>
                    <p className="mt-1 text-4xl font-black text-white">
                        {totalAktivitas}
                    </p>
                </div>
            </div>

            <div className="my-5 h-px bg-white/20" />

            <p className="text-sm font-black text-blue-100">
                Total Uang Transaksi
            </p>
            <p className="mt-2 text-2xl font-black text-white">
                {formatCurrency(totalUangTransaksi)}
            </p>
        </div>
    );
});

const ProductGauge = memo(function ProductGauge({
    totalProduk,
    tambangPercent,
    nonTambangPercent,
    tambangCount,
    nonTambangCount,
}) {
    const [tooltip, setTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
        hover: null,
    });

    function handleMouseMove(event) {
        const position = getTooltipPosition(event, 210, 120);

        let el = event.target;
        const circle =
            el && el.closest ? el.closest("circle[data-type]") : null;
        const type = circle ? circle.getAttribute("data-type") : null;

        if (type === "tambang" || type === "non") {
            setTooltip({
                show: true,
                ...position,
                hover: type,
            });
        } else {
            setTooltip((current) => ({
                ...current,
                show: false,
                hover: null,
            }));
        }
    }

    function handleMouseLeave() {
        setTooltip({
            show: false,
            x: 0,
            y: 0,
            hover: null,
        });
    }

    const centerTitle =
        tooltip.hover === "tambang"
            ? "TAMBANG"
            : tooltip.hover === "non"
              ? "NON TAMBANG"
              : "TOTAL PRODUK";

    const centerValue =
        tooltip.hover === "tambang"
            ? tambangCount
            : tooltip.hover === "non"
              ? nonTambangCount
              : totalProduk;

    const centerSub =
        tooltip.hover === "tambang"
            ? `Tambang ${tambangPercent}%`
            : tooltip.hover === "non"
              ? `Non Tambang ${nonTambangPercent}%`
              : "Semua Kategori";

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative flex h-[370px] items-center justify-center overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-[#040b1a]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.10),transparent_42%),radial-gradient(circle_at_50%_86%,rgba(16,185,129,0.10),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.20),transparent_42%),radial-gradient(circle_at_50%_86%,rgba(16,185,129,0.18),transparent_40%)]" />

            <div className="relative flex aspect-square w-full max-w-[345px] items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.035]">
                <svg
                    viewBox="0 0 360 360"
                    className="h-full w-full overflow-visible"
                    role="img"
                    aria-label="Grafik donat jenis produk: tambang dan non tambang"
                >
                    <defs>
                        <linearGradient
                            id="productBlueGradient"
                            x1="78"
                            y1="62"
                            x2="282"
                            y2="160"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#93C5FD" />
                            <stop offset="45%" stopColor="#4F8DF8" />
                            <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>

                        <linearGradient
                            id="productGreenGradient"
                            x1="78"
                            y1="210"
                            x2="282"
                            y2="292"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#99F6E4" />
                            <stop offset="50%" stopColor="#34D399" />
                            <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                    </defs>

                    <circle
                        cx={180}
                        cy={180}
                        r={118}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth={44}
                        className="dark:stroke-[#1d2c47]"
                    />

                    <circle
                        cx={180}
                        cy={180}
                        r={118}
                        fill="none"
                        stroke="#e5edf7"
                        strokeWidth={41}
                        strokeLinecap="round"
                        opacity={0.06}
                    />

                    {(() => {
                        const r = 118;
                        const circumference = 2 * Math.PI * r;

                        const pTambang = Number(tambangPercent) || 0;
                        const pNon = Number(nonTambangPercent) || 0;

                        const gap = circumference * 0.015;

                        const tambangLength = Math.max(
                            0,
                            (Math.max(0, Math.min(100, pTambang)) / 100) *
                                circumference -
                                gap,
                        );
                        const nonTambangLength = Math.max(
                            0,
                            (Math.max(0, Math.min(100, pNon)) / 100) *
                                circumference -
                                gap,
                        );

                        const blueRotation = -90 - pTambang * 1.8;
                        const greenRotation = 90 - pNon * 1.8;

                        return (
                            <>
                                <circle
                                    cx={180}
                                    cy={180}
                                    r={r}
                                    fill="none"
                                    stroke="url(#productGreenGradient)"
                                    strokeWidth={30}
                                    strokeLinecap="round"
                                    className="cursor-pointer transition-all duration-300"
                                    transform={`rotate(${greenRotation} 180 180)`}
                                    data-type="non"
                                    strokeDasharray={`${nonTambangLength} ${Math.max(
                                        0,
                                        circumference - nonTambangLength,
                                    )}`}
                                />

                                <circle
                                    cx={180}
                                    cy={180}
                                    r={r}
                                    fill="none"
                                    stroke="url(#productBlueGradient)"
                                    strokeWidth={30}
                                    strokeLinecap="round"
                                    className="cursor-pointer transition-all duration-300"
                                    transform={`rotate(${blueRotation} 180 180)`}
                                    data-type="tambang"
                                    strokeDasharray={`${tambangLength} ${Math.max(
                                        0,
                                        circumference - tambangLength,
                                    )}`}
                                />
                            </>
                        );
                    })()}

                    <circle
                        cx="180"
                        cy="180"
                        r="86"
                        className="fill-slate-100 stroke-slate-300 transition-colors duration-300 dark:fill-[#071020] dark:stroke-[#34445d]"
                        strokeWidth="2.8"
                    />

                    <circle
                        cx="180"
                        cy="180"
                        r="72"
                        className="fill-white stroke-slate-200 dark:fill-[#091224] dark:stroke-[#23314a]"
                        strokeWidth="1.8"
                    />

                    <circle
                        cx="180"
                        cy="180"
                        r="58"
                        fill="none"
                        className="stroke-slate-200 dark:stroke-[#17263c]"
                        strokeWidth="1"
                    />

                    <text
                        x="180"
                        y="154"
                        textAnchor="middle"
                        className="fill-slate-500 text-[11px] font-black uppercase tracking-[0.4em] dark:fill-slate-300"
                    >
                        {centerTitle}
                    </text>

                    <text
                        x="180"
                        y="199"
                        textAnchor="middle"
                        className="fill-slate-900 text-[50px] font-black dark:fill-white"
                    >
                        {centerValue}
                    </text>

                    <text
                        x="180"
                        y="229"
                        textAnchor="middle"
                        className="fill-slate-600 text-[13px] font-black dark:fill-slate-100"
                    >
                        {centerSub}
                    </text>
                </svg>
            </div>

            <MiniTooltip
                show={tooltip.show}
                position={tooltip}
                title={
                    tooltip.hover === "tambang"
                        ? "Detail Tambang"
                        : tooltip.hover === "non"
                          ? "Detail Non Tambang"
                          : "Detail Produk"
                }
            >
                <TooltipRow label="Total" value={`${totalProduk} data`} />
                <TooltipRow
                    label="Tambang"
                    value={`${tambangCount} · ${tambangPercent}%`}
                    color={
                        tooltip.hover === "tambang"
                            ? "text-blue-300"
                            : "text-slate-300"
                    }
                />
                <TooltipRow
                    label="Non Tambang"
                    value={`${nonTambangCount} · ${nonTambangPercent}%`}
                    color={
                        tooltip.hover === "non"
                            ? "text-emerald-300"
                            : "text-slate-300"
                    }
                />
            </MiniTooltip>
        </div>
    );
});

const ProductRow = memo(function ProductRow({
    title,
    description,
    value,
    percent,
    color,
}) {
    const colorMap = {
        blue: {
            border: "border-blue-200 dark:border-blue-500/60",
            bg: "bg-blue-50 dark:bg-blue-500/10",
            icon: "bg-blue-500",
            text: "text-blue-600 dark:text-blue-400",
            bar: "bg-blue-500",
        },
        green: {
            border: "border-emerald-200 dark:border-emerald-500/60",
            bg: "bg-emerald-50 dark:bg-emerald-500/10",
            icon: "bg-emerald-500",
            text: "text-emerald-600 dark:text-emerald-400",
            bar: "bg-emerald-500",
        },
    };

    const item = colorMap[color];

    return (
        <div
            className={`rounded-[24px] border ${item.border} ${item.bg} p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-[0_16px_36px_rgba(15,23,42,0.22)]`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${item.icon}`}
                    >
                        <DashboardIcon type="produk" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-base font-black text-slate-900 dark:text-white">
                            {title}
                        </p>
                        <p className="mt-1 truncate text-xs font-bold text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="shrink-0 text-right">
                    <p className="text-2xl font-black leading-none text-slate-900 dark:text-white">
                        {value}
                    </p>
                    <p className={`mt-1 text-xs font-black ${item.text}`}>
                        {percent}%
                    </p>
                </div>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800/90">
                <div
                    className={`h-full rounded-full ${item.bar}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
});

const ProductMiniCard = memo(function ProductMiniCard({
    title,
    value,
    subtitle,
}) {
    return (
        <div className="flex min-w-0 flex-col justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#0b1222]">
            <p className="truncate text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {title}
            </p>
            <p className="mt-3 truncate text-[24px] font-black leading-none text-slate-900 dark:text-white">
                {value}
            </p>
            <p className="mt-1 truncate text-xs font-bold text-slate-400 dark:text-slate-500">
                {subtitle}
            </p>
        </div>
    );
});

const ProductComposition = memo(function ProductComposition({
    productTypeChart,
    totalProduk,
}) {
    const tambang = productTypeChart.find(
        (item) =>
            item.name.toLowerCase().includes("tambang") &&
            !item.name.toLowerCase().includes("non"),
    );

    const nonTambang = productTypeChart.find((item) =>
        item.name.toLowerCase().includes("non"),
    );

    const tambangCount = tambang?.value || 0;
    const nonTambangCount = nonTambang?.value || 0;

    const tambangPercent = totalProduk
        ? Math.round((tambangCount / totalProduk) * 100)
        : 0;

    const nonTambangPercent = totalProduk
        ? Math.round((nonTambangCount / totalProduk) * 100)
        : 0;

    const dominantName =
        tambangCount >= nonTambangCount ? "Tambang" : "Non Tambang";

    const dominantCount = Math.max(tambangCount, nonTambangCount);
    const dominantPercent = Math.max(tambangPercent, nonTambangPercent);

    return (
        <Panel className="overflow-hidden p-5 xl:col-span-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                <div className="space-y-5">
                    <div>
                        <Badge color="green" icon="pie">
                            Grafik Jenis Produk
                        </Badge>

                        <h2 className="mt-4 text-[24px] font-black leading-tight text-slate-900 dark:text-white">
                            Komposisi Produk
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Perbandingan visual produk tambang, non tambang, dan
                            kategori lainnya.
                        </p>
                    </div>

                    <ProductGauge
                        totalProduk={totalProduk}
                        tambangCount={tambangCount}
                        nonTambangCount={nonTambangCount}
                        tambangPercent={tambangPercent}
                        nonTambangPercent={nonTambangPercent}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="w-full rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-[#0b1222]">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Jenis Dominan
                            </p>
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                                {dominantPercent}%
                            </span>
                        </div>

                        <p className="mt-5 text-[20px] font-black text-slate-900 dark:text-white">
                            {dominantName}
                        </p>

                        <div className="mt-2 flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
                            <span>Produk terbanyak</span>
                            <span>{dominantCount} data</span>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800/90">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${dominantPercent}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <ProductMiniCard
                            title="Jumlah Kategori"
                            value={productTypeChart.length}
                            subtitle="Kategori aktif"
                        />

                        <ProductMiniCard
                            title="Tertinggi"
                            value={`${dominantPercent}%`}
                            subtitle={dominantName}
                        />
                    </div>

                    <ProductRow
                        title="Produk Tambang"
                        description="Material hasil tambang"
                        value={tambangCount}
                        percent={tambangPercent}
                        color="blue"
                    />

                    <ProductRow
                        title="Produk Non Tambang"
                        description="Produk kategori umum"
                        value={nonTambangCount}
                        percent={nonTambangPercent}
                        color="green"
                    />
                </div>
            </div>
        </Panel>
    );
});

const StatusBars = memo(function StatusBars({ data }) {
    const [activeStatus, setActiveStatus] = useState(null);
    const [tooltip, setTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
    });

    const colorMap = {
        deal: "bg-blue-500",
        nego: "bg-emerald-500",
        pending: "bg-amber-500",
        batal: "bg-red-500",
    };

    const labelMap = {
        deal: "Deal",
        nego: "Nego",
        pending: "Pending",
        batal: "Batal",
    };

    const totalStatus = data.reduce(
        (sum, item) => sum + Number(item.jumlah || 0),
        0,
    );

    const maxValue = Math.max(12, ...data.map((item) => item.jumlah));

    function handleMouseMove(event) {
        if (!activeStatus) {
            return;
        }

        const position = getTooltipPosition(event, 210, 100);

        setTooltip({
            show: true,
            ...position,
        });
    }

    function handleMouseLeave() {
        setActiveStatus(null);
        setTooltip((current) => ({
            ...current,
            show: false,
        }));
    }

    return (
        <Panel className="p-6 xl:col-span-5">
            <Badge icon="shield">Status Transaksi</Badge>

            <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
                Sebaran Status
            </h2>

            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Membaca posisi transaksi berdasarkan status.
            </p>

            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative mt-8 h-[325px]"
            >
                <div className="absolute inset-x-0 bottom-10 top-0 flex flex-col justify-between">
                    {[12, 9, 6, 3, 0].map((item) => (
                        <div key={item} className="flex items-center gap-4">
                            <span className="w-7 text-right text-xs font-black text-slate-400 dark:text-slate-500">
                                {item}
                            </span>
                            <span className="h-px flex-1 border-t border-dashed border-slate-200 dark:border-slate-700" />
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-10 left-10 right-0 top-0 grid grid-cols-4 items-end gap-10 px-4">
                    {data.map((item) => {
                        const height = Math.max(
                            18,
                            (item.jumlah / maxValue) * 250,
                        );

                        const active = activeStatus?.status === item.status;

                        return (
                            <div
                                key={item.status}
                                onMouseEnter={() => {
                                    setActiveStatus(item);
                                    setTooltip((current) => ({
                                        ...current,
                                        show: true,
                                    }));
                                }}
                                className="flex h-full cursor-pointer flex-col items-center justify-end"
                            >
                                <div
                                    className={`w-12 rounded-b-xl rounded-t-2xl ${
                                        colorMap[item.status] || "bg-slate-500"
                                    } shadow-[0_12px_28px_rgba(37,99,235,0.20)] transition-all duration-300 ${
                                        active
                                            ? "scale-110 brightness-125"
                                            : "scale-100"
                                    }`}
                                    style={{ height: `${height}px` }}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="absolute bottom-0 left-10 right-0 grid grid-cols-4 gap-10 px-4">
                    {data.map((item) => (
                        <p
                            key={item.status}
                            className={`text-center text-xs font-black transition-colors duration-200 ${
                                activeStatus?.status === item.status
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-400 dark:text-slate-500"
                            }`}
                        >
                            {item.status}
                        </p>
                    ))}
                </div>

                <MiniTooltip
                    show={Boolean(tooltip.show && activeStatus)}
                    position={tooltip}
                    title="Detail Status"
                >
                    <TooltipRow
                        label={
                            labelMap[activeStatus?.status] ||
                            activeStatus?.status
                        }
                        value={`${activeStatus?.jumlah || 0} transaksi`}
                    />
                    <TooltipRow
                        label="Persentase"
                        value={`${
                            totalStatus
                                ? Math.round(
                                      ((activeStatus?.jumlah || 0) /
                                          totalStatus) *
                                          100,
                                  )
                                : 0
                        }%`}
                        color="text-blue-300"
                    />
                </MiniTooltip>
            </div>
        </Panel>
    );
});

const FiveMonthChartPanel = memo(function FiveMonthChartPanel({ data }) {
    const [activeMonth, setActiveMonth] = useState(null);
    const [tooltip, setTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
    });

    const chartRef = useRef(null);

    const totalTransaksi = data.reduce(
        (sum, item) => sum + Number(item.transaksi || 0),
        0,
    );

    const totalNilai = data.reduce(
        (sum, item) => sum + Number(item.nilai || 0),
        0,
    );

    const bestMonth = data.reduce((best, item) => {
        if (!best || Number(item.nilai || 0) > Number(best.nilai || 0)) {
            return item;
        }

        return best;
    }, null);

    const maxTransaksi = Math.max(
        1,
        ...data.map((item) => item.transaksi || 0),
    );
    const maxNilai = Math.max(1, ...data.map((item) => item.nilai || 0));

    function handleMouseMove(event) {
        if (!activeMonth) {
            return;
        }

        const position = getTooltipPosition(event, 210, 125);

        setTooltip({
            show: true,
            ...position,
        });
    }

    function handleMouseLeave() {
        setActiveMonth(null);
        setTooltip((current) => ({
            ...current,
            show: false,
        }));
    }

    return (
        <Panel className="overflow-hidden p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <Badge icon="chart" color="blue">
                        Grafik Bulanan
                    </Badge>

                    <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
                        Performa Bulanan
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-500 dark:text-slate-400">
                        Perbandingan jumlah transaksi dan nilai transaksi per
                        bulan.
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-[#0b1222]">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                            Transaksi
                        </p>
                        <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                            {totalTransaksi}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-[#0b1222]">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                            Terbaik
                        </p>
                        <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                            {totalNilai > 0
                                ? getMonthLabelFull(bestMonth?.key)
                                : "-"}
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={chartRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative mt-6 sm:mt-8 h-[380px] sm:h-[470px] overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-[#061021] dark:shadow-[inset_0_0_90px_rgba(5,15,40,0.55)]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.06),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.06),transparent_34%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.13),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.13),transparent_34%)]" />

                <div className="absolute inset-x-4 sm:inset-x-6 bottom-[85px] sm:bottom-24 top-6 sm:top-8 flex flex-col justify-between pointer-events-none">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <span
                            key={item}
                            className="h-px border-t border-dashed border-slate-200 dark:border-slate-700/90"
                        />
                    ))}
                </div>

                <div className="relative z-10 flex h-full items-end justify-between gap-3 sm:gap-5 pb-[65px] sm:pb-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {data.map((item) => {
                        const transaksiHeight = item.transaksi
                            ? Math.max(
                                  6,
                                  (Number(item.transaksi || 0) / maxTransaksi) *
                                      80,
                              )
                            : 4;

                        const nilaiHeight = item.nilai
                            ? Math.max(
                                  6,
                                  (Number(item.nilai || 0) / maxNilai) * 80,
                              )
                            : 4;

                        const active = activeMonth?.key === item.key;

                        return (
                            <div
                                key={item.key}
                                onMouseEnter={(e) => {
                                    setActiveMonth(item);

                                    const container = chartRef.current;

                                    if (container) {
                                        const containerRect =
                                            container.getBoundingClientRect();
                                        const groupRect =
                                            e.currentTarget.getBoundingClientRect();
                                        const tooltipWidth = 210;
                                        const tooltipHeight = 125;

                                        let x =
                                            groupRect.left -
                                            containerRect.left +
                                            groupRect.width / 2 -
                                            tooltipWidth / 2;
                                        let y =
                                            groupRect.top -
                                            containerRect.top -
                                            tooltipHeight -
                                            12;

                                        x = clampNumber(
                                            x,
                                            10,
                                            containerRect.width -
                                                tooltipWidth -
                                                10,
                                        );
                                        y = clampNumber(
                                            y,
                                            10,
                                            containerRect.height -
                                                tooltipHeight -
                                                10,
                                        );

                                        setTooltip({ show: true, x, y });
                                    } else {
                                        setTooltip((current) => ({
                                            ...current,
                                            show: true,
                                        }));
                                    }
                                }}
                                className={`flex min-w-[85px] sm:min-w-24 flex-1 cursor-pointer flex-col items-center justify-end gap-2 sm:gap-4 rounded-[16px] sm:rounded-[26px] px-1 sm:px-3 py-2 transition-all duration-300 ${
                                    active
                                        ? "bg-slate-200/50 dark:bg-white/[0.035]"
                                        : "bg-transparent"
                                }`}
                            >
                                <div className="flex h-[240px] sm:h-[330px] w-full items-end justify-center gap-1.5 sm:gap-3">
                                    <div className="w-6 sm:w-12 h-full flex items-end">
                                        <div
                                            className="mx-auto w-full rounded-b-md sm:rounded-b-xl rounded-t-[14px] sm:rounded-t-[28px] bg-gradient-to-t from-blue-700 via-blue-500 to-blue-300 shadow-[0_18px_40px_rgba(37,99,235,0.30)] transition-all duration-300"
                                            style={{
                                                height: `${transaksiHeight}%`,
                                                transform: active
                                                    ? "scaleY(1.055)"
                                                    : "scaleY(1)",
                                                transformOrigin: "bottom",
                                                filter: active
                                                    ? "brightness(1.24)"
                                                    : "brightness(1)",
                                            }}
                                        />
                                    </div>

                                    <div className="w-6 sm:w-12 h-full flex items-end">
                                        <div
                                            className="mx-auto w-full rounded-b-md sm:rounded-b-xl rounded-t-[14px] sm:rounded-t-[28px] bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-300 shadow-[0_18px_40px_rgba(16,185,129,0.30)] transition-all duration-300"
                                            style={{
                                                height: `${nilaiHeight}%`,
                                                transform: active
                                                    ? "scaleY(1.055)"
                                                    : "scaleY(1)",
                                                transformOrigin: "bottom",
                                                filter: active
                                                    ? "brightness(1.24)"
                                                    : "brightness(1)",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="text-center mt-1 sm:mt-0">
                                    <p
                                        className={`text-[10px] sm:text-sm font-black transition-colors duration-200 ${
                                            active
                                                ? "text-slate-900 dark:text-white"
                                                : "text-slate-500 dark:text-slate-300"
                                        }`}
                                    >
                                        {item.label}
                                    </p>
                                    <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs font-bold text-slate-400 dark:text-slate-500">
                                        {formatCurrency(item.nilai)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center gap-3 sm:gap-5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-500" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.18em] text-slate-500 dark:text-slate-400">
                            Jumlah Transaksi
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.18em] text-slate-500 dark:text-slate-400">
                            Nilai Transaksi
                        </span>
                    </div>
                </div>

                <MiniTooltip
                    show={Boolean(tooltip.show && activeMonth)}
                    position={tooltip}
                    title={`Detail ${activeMonth?.label || ""}`}
                >
                    <TooltipRow
                        label="Transaksi"
                        value={activeMonth?.transaksi || 0}
                        color="text-blue-300"
                    />
                    <TooltipRow
                        label="Nilai"
                        value={formatCurrency(activeMonth?.nilai || 0)}
                        color="text-emerald-300"
                    />
                    <TooltipRow
                        label="Rata-rata"
                        value={formatCurrency(
                            activeMonth?.transaksi
                                ? (activeMonth?.nilai || 0) /
                                      activeMonth.transaksi
                                : 0,
                        )}
                    />
                </MiniTooltip>
            </div>
        </Panel>
    );
});

export default function Dashboard() {
    const [data, setData] = useState({
        broker: [],
        buyer: [],
        seller: [],
        produk: [],
        transaksi: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadDashboard() {
            try {
                const [
                    brokerData,
                    buyerData,
                    sellerData,
                    produkData,
                    transaksiData,
                ] = await Promise.all([
                    fetchEntity(getEntity("broker")),
                    fetchEntity(getEntity("buyer")),
                    fetchEntity(getEntity("seller")),
                    fetchEntity(getEntity("produk")),
                    fetchEntity(getEntity("transaksi")),
                ]);

                if (mounted) {
                    setData({
                        broker: brokerData,
                        buyer: buyerData,
                        seller: sellerData,
                        produk: produkData,
                        transaksi: transaksiData,
                    });
                }
            } catch {
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadDashboard();

        return () => {
            mounted = false;
        };
    }, []);

    const totalAktivitas =
        data.broker.length +
        data.seller.length +
        data.buyer.length +
        data.produk.length;

    const totalUangTransaksi = useMemo(() => {
        return data.transaksi.reduce(
            (sum, item) => sum + Number(item.harga_deal || 0),
            0,
        );
    }, [data.transaksi]);

    const productTypeChart = useMemo(() => {
        const grouped = {};

        data.produk.forEach((item) => {
            const type = item.jenis || "Lainnya";
            grouped[type] = (grouped[type] || 0) + 1;
        });

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
        }));
    }, [data.produk]);

    const statusChart = useMemo(() => {
        const order = ["deal", "nego", "pending", "batal"];
        const grouped = {
            deal: 0,
            nego: 0,
            pending: 0,
            batal: 0,
        };

        data.transaksi.forEach((item) => {
            const status = item.status || "lainnya";
            grouped[status] = (grouped[status] || 0) + 1;
        });

        return order.map((status) => ({
            status,
            jumlah: grouped[status] || 0,
        }));
    }, [data.transaksi]);

    const fiveMonthChart = useMemo(() => {
        const validDates = data.transaksi
            .map((item) => parseDate(item.tanggal))
            .filter(Boolean);

        const anchorDate =
            validDates.length > 0
                ? new Date(
                      Math.max(...validDates.map((date) => date.getTime())),
                  )
                : new Date();

        const monthMap = {};

        for (let offset = -2; offset <= 2; offset += 1) {
            const date = addMonths(anchorDate, offset);
            const key = getMonthKey(date);

            monthMap[key] = {
                key,
                label: getMonthLabel(key),
                transaksi: 0,
                nilai: 0,
            };
        }

        data.transaksi.forEach((item) => {
            const date = parseDate(item.tanggal);

            if (!date) {
                return;
            }

            const key = getMonthKey(date);

            if (!monthMap[key]) {
                return;
            }

            monthMap[key].transaksi += 1;
            monthMap[key].nilai += Number(item.harga_deal || 0);
        });

        return Object.values(monthMap);
    }, [data.transaksi]);

    if (loading) {
        return (
            <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center text-sm font-black text-slate-600 dark:border-slate-700 dark:bg-[#111a2d] dark:text-slate-300">
                Memuat dashboard...
            </div>
        );
    }

    return (
        <div className="-m-4 min-h-screen space-y-6 rounded-2xl bg-slate-50 p-4 text-slate-900 transition-colors duration-300 lg:-m-6 lg:p-6 dark:bg-[#0b1222] dark:text-white">
            <div className="dash-fade-up">
                <Panel className="overflow-hidden p-6 lg:p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <Badge>Dashboard Utama</Badge>

                            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
                                Sistem Marketplace Broker
                            </h1>

                            <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-slate-500 dark:text-slate-300">
                                Ringkasan performa transaksi, produk, negosiasi,
                                dan komisi dalam satu tampilan yang lebih
                                bersih, modern, dan mudah dibaca.
                            </p>
                        </div>

                        <FloatingActivityCard
                            totalAktivitas={totalAktivitas}
                            totalUangTransaksi={totalUangTransaksi}
                        />
                    </div>
                </Panel>
            </div>

            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="dash-fade-up dash-delay-1">
                    <StatCard
                        title="Total Broker"
                        value={data.broker.length}
                        description="Perantara transaksi"
                        icon="broker"
                        color="blue"
                    />
                </div>
                <div className="dash-fade-up dash-delay-2">
                    <StatCard
                        title="Total Seller"
                        value={data.seller.length}
                        description="Pemilik produk"
                        icon="seller"
                        color="green"
                    />
                </div>
                <div className="dash-fade-up dash-delay-3">
                    <StatCard
                        title="Total Buyer"
                        value={data.buyer.length}
                        description="Pembeli terdaftar"
                        icon="buyer"
                        color="purple"
                    />
                </div>
                <div className="dash-fade-up dash-delay-4">
                    <StatCard
                        title="Total Produk"
                        value={data.produk.length}
                        description="Produk marketplace"
                        icon="produk"
                        color="orange"
                    />
                </div>
            </section>

            <section className="dash-fade-up dash-delay-5 grid gap-6 xl:grid-cols-12">
                <ProductComposition
                    productTypeChart={productTypeChart}
                    totalProduk={data.produk.length}
                />

                <StatusBars data={statusChart} />
            </section>

            <section className="dash-fade-up dash-delay-6">
                <FiveMonthChartPanel data={fiveMonthChart} />
            </section>
        </div>
    );
}
