import Button from "./Button";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:flex-row">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Halaman {totalPages === 0 ? 0 : page} dari {totalPages}
            </p>

            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    onClick={onPrev}
                    disabled={page <= 1}
                >
                    Sebelumnya
                </Button>
                <Button
                    variant="secondary"
                    onClick={onNext}
                    disabled={page >= totalPages}
                >
                    Selanjutnya
                </Button>
            </div>
        </div>
    );
}
