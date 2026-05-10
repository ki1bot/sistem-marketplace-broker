export default function StatCard({ title, value, description }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {title}
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {value}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}
