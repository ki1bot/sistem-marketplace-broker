import { useEffect, useState } from "react";
import { normalizePayload } from "../utils/formatters";
import { http } from "../api/http";

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

function CheckIcon() {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
            />
        </svg>
    );
}

function getInitialForm(fields, row) {
    return fields.reduce((form, field) => {
        const value = row?.[field.name];

        if (field.type === "datetime-local" && value) {
            const dateStr = String(value);
            form[field.name] = dateStr.includes("T")
                ? dateStr.substring(0, 16)
                : dateStr;

            return form;
        }

        if (field.type === "date" && value) {
            const dateStr = String(value);
            form[field.name] = dateStr.substring(0, 10);

            return form;
        }

        form[field.name] = value ?? "";

        return form;
    }, {});
}

function isFieldFilled(value) {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === "string") {
        return value.trim() !== "";
    }

    if (typeof value === "number") {
        return !Number.isNaN(value);
    }

    return true;
}

function isValidNumber(value) {
    if (!isFieldFilled(value)) {
        return false;
    }

    const text = String(value).trim();

    if (text.includes(",")) {
        return false;
    }

    return Number.isFinite(Number(text));
}

function getMaxLength(field) {
    const maxMap = {
        nama: 100,
        nama_produk: 100,
        perusahaan: 100,
        kontak: 100,
        email: 100,
        jenis: 50,
        jenis_material: 100,
        kadar: 50,
        kategori: 100,
        no_hp: 20,
        tingkatan: 20,
        status: 20,
        status_riwayat: 30,
    };

    return field.maxLength || maxMap[field.name] || null;
}

function isValidEmail(value) {
    const text = String(value).trim();

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
}

export default function EntityModal({
    open,
    entity,
    row,
    onClose,
    onSubmit,
    loading,
}) {
    const [form, setForm] = useState({});
    const [relationOptions, setRelationOptions] = useState({});
    const [relationLoading, setRelationLoading] = useState({});

    const isEdit = Boolean(row);

    useEffect(() => {
        if (open) {
            setForm(getInitialForm(entity.fields, row));
            loadRelationOptions();
        }
    }, [open, entity, row]);

    async function loadRelationOptions() {
        const relationFields = entity.fields.filter(
            (field) => field.type === "relation" && field.relation,
        );

        if (relationFields.length === 0) {
            return;
        }

        const loadingState = {};

        relationFields.forEach((field) => {
            loadingState[field.name] = true;
        });

        setRelationLoading(loadingState);

        const results = {};

        await Promise.all(
            relationFields.map(async (field) => {
                try {
                    const response = await http.get(
                        `/${field.relation.endpoint}`,
                    );

                    results[field.name] = Array.isArray(response.data)
                        ? response.data
                        : [];
                } catch (error) {
                    results[field.name] = [];
                } finally {
                    setRelationLoading((current) => ({
                        ...current,
                        [field.name]: false,
                    }));
                }
            }),
        );

        setRelationOptions(results);
    }

    if (!open) {
        return null;
    }

    const visibleFields = entity.fields.filter((field) => {
        if (!isEdit) {
            return true;
        }

        if (entity.compositeKey) {
            if (field.name === "id_transaksi" || field.name === "id_komisi") {
                return false;
            }
        }

        if (field.name === entity.primaryKey) {
            return false;
        }

        return true;
    });

    function handleChange(name, value) {
        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function validateAllFields() {
        const errors = [];

        visibleFields.forEach((field) => {
            const value = form[field.name];
            const label = field.label || field.name;

            if (relationLoading[field.name]) {
                errors.push(`- ${label} masih memuat data pilihan.`);
                return;
            }

            if (!isFieldFilled(value)) {
                errors.push(`- ${label} wajib diisi.`);
                return;
            }

            if (field.type === "number") {
                if (!isValidNumber(value)) {
                    errors.push(
                        `- ${label} harus berupa angka murni. Contoh benar: 1500000000, bukan Rp 1.500.000.000 atau 1,500,000.`,
                    );
                    return;
                }

                if (Number(value) < 0) {
                    errors.push(`- ${label} tidak boleh kurang dari 0.`);
                    return;
                }
            }

            if (field.type === "email" && !isValidEmail(value)) {
                errors.push(
                    `- ${label} harus menggunakan format email yang valid.`,
                );
                return;
            }

            if (field.type === "relation") {
                const options = relationOptions[field.name] || [];
                const selectedValue = Number(value);

                if (!Number.isFinite(selectedValue)) {
                    errors.push(
                        `- ${label} harus dipilih dari daftar yang tersedia.`,
                    );
                    return;
                }

                const exists = options.some((item) => {
                    return (
                        Number(item[field.relation.valueKey]) === selectedValue
                    );
                });

                if (!exists) {
                    errors.push(
                        `- ${label} yang dipilih tidak valid atau tidak ada di database.`,
                    );
                    return;
                }
            }

            const maxLength = getMaxLength(field);

            if (maxLength && String(value).trim().length > maxLength) {
                errors.push(`- ${label} maksimal ${maxLength} karakter.`);
            }
        });

        if (errors.length > 0) {
            window.alert(
                `Data belum valid.\n\nPerbaiki bagian berikut:\n${errors.join(
                    "\n",
                )}`,
            );

            return false;
        }

        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (loading) {
            return;
        }

        const isValid = validateAllFields();

        if (!isValid) {
            return;
        }

        if (typeof onSubmit === "function") {
            onSubmit(normalizePayload(entity.fields, form));
        }
    }

    function getOptionLabel(field, item) {
        if (field.relation.labelFormat) {
            return field.relation.labelFormat(item);
        }

        return (
            item[field.relation.labelKey] || `#${item[field.relation.valueKey]}`
        );
    }

    const inputClassName =
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/15 sm:text-sm";

    return (
        <div className="fixed inset-0 z-[999] flex items-end justify-center bg-slate-950/60 px-0 pt-10 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8">
            <div className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:max-w-2xl sm:rounded-3xl">
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-black text-slate-900 dark:text-white sm:text-xl">
                            {isEdit
                                ? `Edit ${entity.title}`
                                : `Tambah ${entity.title}`}
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                            Semua field wajib diisi dan format datanya harus
                            valid.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl leading-none text-slate-500 transition active:scale-95 dark:bg-slate-800 dark:text-slate-300"
                        aria-label="Tutup modal"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        {visibleFields.map((field) => (
                            <label
                                key={field.name}
                                className={
                                    field.type === "textarea"
                                        ? "sm:col-span-2"
                                        : ""
                                }
                            >
                                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                    {field.label}
                                    <span className="text-rose-500"> *</span>
                                </span>

                                {field.type === "relation" ? (
                                    <select
                                        required
                                        value={form[field.name] ?? ""}
                                        onChange={(event) =>
                                            handleChange(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                        disabled={relationLoading[field.name]}
                                        className={inputClassName}
                                    >
                                        <option value="">
                                            {relationLoading[field.name]
                                                ? "Memuat..."
                                                : `Pilih ${field.label}`}
                                        </option>

                                        {(
                                            relationOptions[field.name] || []
                                        ).map((item) => (
                                            <option
                                                key={
                                                    item[
                                                        field.relation.valueKey
                                                    ]
                                                }
                                                value={
                                                    item[
                                                        field.relation.valueKey
                                                    ]
                                                }
                                            >
                                                {getOptionLabel(field, item)}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "select" ? (
                                    <select
                                        required
                                        value={form[field.name] ?? ""}
                                        onChange={(event) =>
                                            handleChange(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                        className={inputClassName}
                                    >
                                        <option value="">
                                            Pilih {field.label}
                                        </option>

                                        {field.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "textarea" ? (
                                    <textarea
                                        rows="4"
                                        required
                                        value={form[field.name] ?? ""}
                                        onChange={(event) =>
                                            handleChange(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                        className={`${inputClassName} resize-none`}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        required
                                        value={form[field.name] ?? ""}
                                        onChange={(event) =>
                                            handleChange(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                        className={inputClassName}
                                    />
                                )}
                            </label>
                        ))}
                    </div>

                    <div className="sticky bottom-0 -mx-5 mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900 sm:-mx-6 sm:flex-row sm:justify-end sm:px-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition active:scale-95 disabled:pointer-events-none disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-auto"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition active:scale-95 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                        >
                            {loading ? (
                                <SpinnerIcon />
                            ) : isEdit ? (
                                <CheckIcon />
                            ) : (
                                <PlusIcon />
                            )}

                            {loading
                                ? "Menyimpan..."
                                : isEdit
                                  ? "Simpan Perubahan"
                                  : "Tambah Data"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
