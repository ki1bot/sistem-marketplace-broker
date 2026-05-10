import { getNestedValue } from "../utils/formatters";

function getColumnField(column) {
    return (
        column.field ||
        column.key ||
        column.accessor ||
        column.name ||
        column.dataIndex ||
        ""
    );
}

function getColumnLabel(column) {
    return column.label || column.header || column.title || column.name || "";
}

function getColumnKey(column, columnIndex) {
    const field = getColumnField(column);
    const label = getColumnLabel(column);
    const baseKey =
        column.id ||
        column.columnKey ||
        field ||
        label ||
        `column-${columnIndex}`;

    return `column-${columnIndex}-${String(baseKey)}`;
}

function getRowKey(row, rowIndex, entity) {
    const entityName = entity?.key || entity?.endpoint || "data";

    if (entity?.compositeKey) {
        const idTransaksi = row?.id_transaksi ?? "no-transaksi";
        const idKomisi = row?.id_komisi ?? "no-komisi";

        return `${entityName}-${idTransaksi}-${idKomisi}-${rowIndex}`;
    }

    const primaryValue = entity?.primaryKey ? row?.[entity.primaryKey] : null;
    const fallbackValue =
        primaryValue ?? row?.id ?? row?._id ?? row?._no ?? row?.no ?? rowIndex;

    return `${entityName}-${String(fallbackValue)}-${rowIndex}`;
}

function getAlignClass(align) {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
}

function formatCellValue(value) {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    if (typeof value === "boolean") {
        return value ? "Ya" : "Tidak";
    }

    if (typeof value === "object") {
        return value.nama || value.name || value.title || JSON.stringify(value);
    }

    return value;
}

function renderCell(column, row, rowIndex) {
    const field = getColumnField(column);

    if (typeof column.render === "function") {
        return column.render(row, rowIndex);
    }

    if (typeof column.cell === "function") {
        return column.cell(row, rowIndex);
    }

    const value = getNestedValue(row, field);
    return formatCellValue(value);
}

function ActionButtons({ row, onEdit, onDelete }) {
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (typeof onEdit === "function") {
                        onEdit(row);
                    }
                }}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-amber-500 px-3 py-2.5 text-xs font-black text-white shadow-sm shadow-amber-500/20 transition active:scale-95 sm:flex-none"
            >
                Edit
            </button>

            <button
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (typeof onDelete === "function") {
                        onDelete(row);
                    }
                }}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-rose-600 px-3 py-2.5 text-xs font-black text-white shadow-sm shadow-rose-500/20 transition active:scale-95 sm:flex-none"
            >
                Hapus
            </button>
        </div>
    );
}

function LoadingCards() {
    return (
        <div className="grid gap-3 md:hidden">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={`loading-card-${index}`}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="h-5 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-4 space-y-3">
                        <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                        <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                        <div className="h-4 w-3/5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function LoadingTableRows({ columnsLength }) {
    return Array.from({ length: 5 }).map((_, rowIndex) => (
        <tr
            key={`loading-row-${rowIndex}`}
            className="border-b border-slate-100 dark:border-slate-800"
        >
            {Array.from({ length: columnsLength }).map((__, columnIndex) => (
                <td
                    key={`loading-cell-${rowIndex}-${columnIndex}`}
                    className="px-5 py-4"
                >
                    <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </td>
            ))}

            <td className="px-5 py-4">
                <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </td>
        </tr>
    ));
}

function MobileCard({ row, rowIndex, columns, entity, onEdit, onDelete }) {
    const rowKey = getRowKey(row, rowIndex, entity);
    const visibleColumns = columns.filter(
        (column) => getColumnField(column) !== "_no",
    );
    const titleColumn = visibleColumns[0];
    const detailColumns = visibleColumns.slice(1);

    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                        {entity?.title || "Data"} #{row?._no ?? rowIndex + 1}
                    </p>

                    <h3 className="mt-1 break-words text-base font-black leading-6 text-slate-900 dark:text-white">
                        {titleColumn
                            ? renderCell(titleColumn, row, rowIndex)
                            : `Data ${rowIndex + 1}`}
                    </h3>
                </div>
            </div>

            <dl className="mt-4 space-y-3">
                {detailColumns.map((column, columnIndex) => {
                    const label = getColumnLabel(column);

                    return (
                        <div
                            key={`${rowKey}-mobile-${getColumnKey(column, columnIndex)}`}
                            className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/60"
                        >
                            <dt className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                                {label}
                            </dt>

                            <dd className="mt-1 break-words text-sm font-bold leading-6 text-slate-700 dark:text-slate-200">
                                {renderCell(column, row, rowIndex)}
                            </dd>
                        </div>
                    );
                })}
            </dl>

            <div className="mt-4">
                <ActionButtons row={row} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </article>
    );
}

export default function DataTable({
    columns = [],
    rows = [],
    entity = null,
    onEdit,
    onDelete,
    loading = false,
}) {
    if (loading) {
        return (
            <>
                <LoadingCards />

                <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <tbody>
                                <LoadingTableRows
                                    columnsLength={columns.length}
                                />
                            </tbody>
                        </table>
                    </div>
                </section>
            </>
        );
    }

    if (rows.length === 0) {
        return (
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="text-sm font-black text-slate-700 dark:text-slate-200">
                    Data belum tersedia.
                </p>

                <p className="mt-2 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                    Tambahkan data baru atau ubah kata kunci pencarian.
                </p>
            </section>
        );
    }

    return (
        <>
            <div className="grid gap-3 md:hidden">
                {rows.map((row, rowIndex) => (
                    <MobileCard
                        key={getRowKey(row, rowIndex, entity)}
                        row={row}
                        rowIndex={rowIndex}
                        columns={columns}
                        entity={entity}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
                                {columns.map((column, columnIndex) => {
                                    const label = getColumnLabel(column);
                                    const alignClass = getAlignClass(
                                        column.align,
                                    );

                                    return (
                                        <th
                                            key={getColumnKey(
                                                column,
                                                columnIndex,
                                            )}
                                            scope="col"
                                            style={{
                                                width: column.width || "auto",
                                            }}
                                            className={`px-5 py-4 align-middle text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 ${alignClass}`}
                                        >
                                            {label}
                                        </th>
                                    );
                                })}

                                <th
                                    scope="col"
                                    className="w-44 px-5 py-4 text-center align-middle text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row, rowIndex) => {
                                const rowKey = getRowKey(row, rowIndex, entity);

                                return (
                                    <tr
                                        key={rowKey}
                                        className="border-b border-slate-100 transition-colors duration-200 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                    >
                                        {columns.map((column, columnIndex) => {
                                            const label =
                                                getColumnLabel(column);
                                            const alignClass = getAlignClass(
                                                column.align,
                                            );

                                            return (
                                                <td
                                                    key={`${rowKey}-${getColumnKey(column, columnIndex)}`}
                                                    data-label={label}
                                                    className={`px-5 py-4 align-middle text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200 ${alignClass}`}
                                                >
                                                    <span className="block break-words">
                                                        {renderCell(
                                                            column,
                                                            row,
                                                            rowIndex,
                                                        )}
                                                    </span>
                                                </td>
                                            );
                                        })}

                                        <td className="px-5 py-4 text-center align-middle">
                                            <div className="flex items-center justify-center">
                                                <ActionButtons
                                                    row={row}
                                                    onEdit={onEdit}
                                                    onDelete={onDelete}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
