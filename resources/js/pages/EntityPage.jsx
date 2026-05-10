import { useEffect, useMemo, useState } from "react";
import {
    createEntity,
    deleteEntity,
    fetchEntity,
    updateEntity,
} from "../api/http";
import ConfirmDialog from "../components/ConfirmDialog";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";
import Toast from "../components/Toast";
import { getNestedValue } from "../utils/formatters";

const PER_PAGE = 10;

function PlusIcon() {
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
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}

function getLaravelValidationMessage(error) {
    const responseData = error?.response?.data;

    if (!responseData) {
        return "Terjadi kesalahan. Periksa koneksi API Laravel.";
    }

    if (responseData.errors && typeof responseData.errors === "object") {
        const messages = Object.entries(responseData.errors)
            .flatMap(([field, errors]) => {
                if (Array.isArray(errors)) {
                    return errors.map((message) => `- ${field}: ${message}`);
                }

                return [`- ${field}: ${String(errors)}`];
            })
            .join("\n");

        return `Validasi Laravel gagal:\n\n${messages}`;
    }

    if (responseData.message) {
        return responseData.message;
    }

    return "Data ditolak oleh server Laravel.";
}

export default function EntityPage({ entity }) {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState(null);

    async function loadRows() {
        setLoading(true);

        try {
            const response = await fetchEntity(entity);
            setRows(Array.isArray(response) ? response : []);
        } catch (error) {
            showToast(
                "error",
                "Gagal memuat data. Periksa API Laravel dan database.",
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setRows([]);
        setSearch("");
        setPage(1);
        setSelectedRow(null);
        setDeleteTarget(null);
        setModalOpen(false);
        loadRows();
    }, [entity.key]);

    function showToast(type, message) {
        setToast({ type, message });

        window.setTimeout(() => {
            setToast(null);
        }, 2800);
    }

    const displayColumns = useMemo(() => {
        const noColumn = {
            key: "_no",
            field: "_no",
            label: "No",
            align: "center",
            width: "80px",
        };

        const entityColumns = (entity.columns || []).map((column) => ({
            ...column,
            align: column.align || "left",
        }));

        return [noColumn, ...entityColumns];
    }, [entity.columns]);

    const filteredRows = useMemo(() => {
        if (!search.trim()) {
            return rows;
        }

        const keyword = search.toLowerCase();

        return rows.filter((row) => {
            const fields = entity.searchFields?.length
                ? entity.searchFields
                : Object.keys(row);

            return fields.some((field) => {
                const value = getNestedValue(row, field);

                return String(value ?? "")
                    .toLowerCase()
                    .includes(keyword);
            });
        });
    }, [rows, search, entity]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / PER_PAGE));

    const paginatedRows = useMemo(() => {
        const start = (page - 1) * PER_PAGE;

        return filteredRows
            .slice(start, start + PER_PAGE)
            .map((row, index) => ({
                ...row,
                _no: start + index + 1,
            }));
    }, [filteredRows, page]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    function openCreateModal() {
        setSelectedRow(null);
        setModalOpen(true);
    }

    function openEditModal(row) {
        setSelectedRow(row);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setSelectedRow(null);
    }

    async function handleSubmit(payload) {
        setSaving(true);

        try {
            if (selectedRow) {
                await updateEntity(entity, selectedRow, payload);
                showToast("success", `Data ${entity.title} berhasil diedit.`);
            } else {
                await createEntity(entity, payload);
                showToast("success", `Data ${entity.title} berhasil dibuat.`);
            }

            closeModal();
            await loadRows();
        } catch (error) {
            const message = getLaravelValidationMessage(error);

            window.alert(message);
            showToast("error", message.split("\n")[0]);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!deleteTarget) return;

        setDeleting(true);

        try {
            await deleteEntity(entity, deleteTarget);
            showToast("success", `Data ${entity.title} berhasil dihapus.`);
            setDeleteTarget(null);
            await loadRows();
        } catch (error) {
            const message =
                error.response?.data?.message ||
                `Gagal menghapus data ${entity.title}. Periksa relasi foreign key.`;

            window.alert(message);
            showToast("error", message);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="space-y-5 sm:space-y-6">
            <Toast toast={toast} onClose={() => setToast(null)} />

            <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 lg:flex-row lg:items-end">
                <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.20em] text-indigo-600 dark:text-indigo-300">
                        Master Data
                    </p>

                    <h1 className="mt-2 truncate text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        {entity.title}
                    </h1>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {entity.description}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition active:scale-95 sm:w-auto"
                >
                    <PlusIcon />
                    Tambah Data
                </button>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4">
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder={`Cari data ${entity.title.toLowerCase()}...`}
                />
            </section>

            <DataTable
                columns={displayColumns}
                rows={paginatedRows}
                entity={entity}
                onEdit={openEditModal}
                onDelete={setDeleteTarget}
                loading={loading}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage((current) => Math.max(1, current - 1))}
                onNext={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                }
            />

            <EntityModal
                open={modalOpen}
                entity={entity}
                row={selectedRow}
                onClose={closeModal}
                onSubmit={handleSubmit}
                loading={saving}
            />

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title={`Hapus Data ${entity.title}`}
                message={`Apakah kamu yakin ingin menghapus data ${entity.title} ini? Tindakan ini tidak bisa dibatalkan dari halaman ini.`}
                loading={deleting}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
