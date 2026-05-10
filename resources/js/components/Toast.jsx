export default function Toast({ toast, onClose }) {
    if (!toast) return null;

    const styles = {
        success:
            "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
        error: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200",
    };

    return (
        <div className="fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-md animate-[slideIn_.2s_ease-out]">
            <div
                className={`rounded-2xl border px-4 py-3 shadow-xl ${styles[toast.type]}`}
            >
                <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold">{toast.message}</p>
                    <button onClick={onClose} className="text-lg leading-none">
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}
