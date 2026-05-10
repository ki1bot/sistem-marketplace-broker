import { createElement } from "react";
import { formatCurrency, formatDate } from "../utils/formatters";

const STATUS_COLORS = {
    deal: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
    nego: { bg: "#dcfce7", text: "#166534", border: "#86efac" },
    pending: { bg: "#fff7ed", text: "#9a3412", border: "#fdba74" },
    batal: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
    dibayar: { bg: "#f3e8ff", text: "#6b21a8", border: "#c4b5fd" },
    selesai: { bg: "#ccfbf1", text: "#115e59", border: "#5eead4" },
};

function statusBadge(status) {
    if (!status) return "-";
    const key = String(status).toLowerCase();
    const color = STATUS_COLORS[key] || {
        bg: "#f1f5f9",
        text: "#475569",
        border: "#cbd5e1",
    };
    return createElement(
        "span",
        {
            style: {
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "capitalize",
                backgroundColor: color.bg,
                color: color.text,
                border: `1px solid ${color.border}`,
            },
        },
        status,
    );
}

export const ENTITIES = [
    {
        key: "broker",
        title: "Broker",
        path: "/broker",
        endpoint: "broker",
        primaryKey: "id_broker",
        description: "Kelola data broker senior dan junior.",
        searchFields: ["nama", "no_hp", "email", "tingkatan"],
        columns: [
            { key: "nama", label: "Nama" },
            { key: "no_hp", label: "No HP" },
            { key: "email", label: "Email" },
            { key: "tingkatan", label: "Tingkatan" },
            { key: "senior.nama", label: "Senior" },
        ],
        fields: [
            { name: "nama", label: "Nama", type: "text", required: true },
            { name: "no_hp", label: "No HP", type: "text" },
            { name: "email", label: "Email", type: "email" },
            {
                name: "tingkatan",
                label: "Tingkatan",
                type: "select",
                required: true,
                options: ["junior", "senior"],
            },
            {
                name: "id_broker_senior",
                label: "Broker Senior",
                type: "relation",
                relation: {
                    endpoint: "broker",
                    valueKey: "id_broker",
                    labelKey: "nama",
                },
            },
        ],
    },
    {
        key: "buyer",
        title: "Buyer",
        path: "/buyer",
        endpoint: "buyer",
        primaryKey: "id_buyer",
        description: "Kelola data pembeli.",
        searchFields: ["nama", "perusahaan", "kontak"],
        columns: [
            { key: "nama", label: "Nama" },
            { key: "perusahaan", label: "Perusahaan" },
            { key: "kontak", label: "Kontak" },
        ],
        fields: [
            { name: "nama", label: "Nama", type: "text", required: true },
            { name: "perusahaan", label: "Perusahaan", type: "text" },
            { name: "kontak", label: "Kontak", type: "text" },
        ],
    },
    {
        key: "seller",
        title: "Seller",
        path: "/seller",
        endpoint: "seller",
        primaryKey: "id_seller",
        description: "Kelola data penjual.",
        searchFields: ["nama", "perusahaan", "kontak"],
        columns: [
            { key: "nama", label: "Nama" },
            { key: "perusahaan", label: "Perusahaan" },
            { key: "kontak", label: "Kontak" },
        ],
        fields: [
            { name: "nama", label: "Nama", type: "text", required: true },
            { name: "perusahaan", label: "Perusahaan", type: "text" },
            { name: "kontak", label: "Kontak", type: "text" },
        ],
    },
    {
        key: "produk",
        title: "Produk",
        path: "/produk",
        endpoint: "produk",
        primaryKey: "id_produk",
        description: "Kelola produk tambang dan non-tambang.",
        searchFields: ["nama_produk", "jenis", "seller.nama"],
        columns: [
            { key: "nama_produk", label: "Nama Produk" },
            { key: "jenis", label: "Jenis" },
            {
                key: "harga_awal",
                label: "Harga Awal",
                render: (row) => formatCurrency(row.harga_awal),
            },
            { key: "seller.nama", label: "Seller" },
        ],
        fields: [
            {
                name: "nama_produk",
                label: "Nama Produk",
                type: "text",
                required: true,
            },
            {
                name: "jenis",
                label: "Jenis",
                type: "select",
                options: ["Tambang", "Non-Tambang"],
            },
            { name: "harga_awal", label: "Harga Awal", type: "number" },
            {
                name: "id_seller",
                label: "Seller",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "seller",
                    valueKey: "id_seller",
                    labelKey: "nama",
                },
            },
        ],
    },
    {
        key: "produk-tambang",
        title: "Produk Tambang",
        path: "/produk-tambang",
        endpoint: "produk-tambang",
        primaryKey: "id_produktambang",
        description: "Kelola detail produk tambang.",
        searchFields: ["jenis_material", "kadar", "produk.nama_produk"],
        columns: [
            { key: "produk.nama_produk", label: "Produk" },
            { key: "jenis_material", label: "Material" },
            { key: "kadar", label: "Kadar" },
        ],
        fields: [
            {
                name: "id_produktambang",
                label: "Produk",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "produk",
                    valueKey: "id_produk",
                    labelKey: "nama_produk",
                },
            },
            { name: "jenis_material", label: "Jenis Material", type: "text" },
            { name: "kadar", label: "Kadar", type: "text" },
        ],
    },
    {
        key: "produk-nontambang",
        title: "Produk Non Tambang",
        path: "/produk-nontambang",
        endpoint: "produk-nontambang",
        primaryKey: "id_produknontambang",
        description: "Kelola detail produk non-tambang.",
        searchFields: ["kategori", "produk.nama_produk"],
        columns: [
            { key: "produk.nama_produk", label: "Produk" },
            { key: "kategori", label: "Kategori" },
        ],
        fields: [
            {
                name: "id_produknontambang",
                label: "Produk",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "produk",
                    valueKey: "id_produk",
                    labelKey: "nama_produk",
                },
            },
            { name: "kategori", label: "Kategori", type: "text" },
        ],
    },
    {
        key: "transaksi",
        title: "Transaksi",
        path: "/transaksi",
        endpoint: "transaksi",
        primaryKey: "id_transaksi",
        description: "Kelola transaksi marketplace broker.",
        searchFields: [
            "status",
            "produk.nama_produk",
            "buyer.nama",
            "broker.nama",
        ],
        columns: [
            {
                key: "tanggal",
                label: "Tanggal",
                render: (row) => formatDate(row.tanggal),
            },
            { key: "produk.nama_produk", label: "Produk" },
            { key: "buyer.nama", label: "Buyer" },
            { key: "broker.nama", label: "Broker" },
            {
                key: "harga_deal",
                label: "Harga Deal",
                render: (row) => formatCurrency(row.harga_deal),
            },
            {
                key: "status",
                label: "Status",
                render: (row) => statusBadge(row.status),
            },
        ],
        fields: [
            { name: "tanggal", label: "Tanggal", type: "date" },
            { name: "harga_deal", label: "Harga Deal", type: "number" },
            {
                name: "status",
                label: "Status",
                type: "select",
                required: true,
                options: ["pending", "nego", "deal", "batal"],
            },
            {
                name: "id_produk",
                label: "Produk",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "produk",
                    valueKey: "id_produk",
                    labelKey: "nama_produk",
                },
            },
            {
                name: "id_buyer",
                label: "Buyer",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "buyer",
                    valueKey: "id_buyer",
                    labelKey: "nama",
                },
            },
            {
                name: "id_broker",
                label: "Broker",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "broker",
                    valueKey: "id_broker",
                    labelKey: "nama",
                },
            },
        ],
    },
    {
        key: "negosiasi",
        title: "Negosiasi",
        path: "/negosiasi",
        endpoint: "negosiasi",
        primaryKey: "id_negosiasi",
        description: "Kelola data negosiasi transaksi.",
        searchFields: ["catatan"],
        columns: [
            {
                key: "tanggal",
                label: "Tanggal",
                render: (row) => formatDate(row.tanggal),
            },
            {
                key: "penawaran_harga",
                label: "Penawaran",
                render: (row) => formatCurrency(row.penawaran_harga),
            },
            { key: "catatan", label: "Catatan" },
        ],
        fields: [
            {
                name: "id_transaksi",
                label: "Transaksi",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "transaksi",
                    valueKey: "id_transaksi",
                    labelKey: "id_transaksi",
                    labelFormat: (item) =>
                        `#${item.id_transaksi} - ${item.produk?.nama_produk || "Transaksi"} (${item.status})`,
                },
            },
            { name: "tanggal", label: "Tanggal", type: "datetime-local" },
            {
                name: "penawaran_harga",
                label: "Penawaran Harga",
                type: "number",
            },
            { name: "catatan", label: "Catatan", type: "textarea" },
        ],
    },
    {
        key: "komisi",
        title: "Komisi",
        path: "/komisi",
        endpoint: "komisi",
        compositeKey: true,
        primaryKey: "id_komisi",
        description: "Kelola komisi berdasarkan transaksi.",
        searchFields: ["status_transaksi"],
        columns: [
            { key: "status_transaksi", label: "Status Transaksi" },
            { key: "persentase", label: "Persentase" },
            {
                key: "jumlah",
                label: "Jumlah",
                render: (row) => formatCurrency(row.jumlah),
            },
        ],
        fields: [
            {
                name: "id_transaksi",
                label: "Transaksi",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "transaksi",
                    valueKey: "id_transaksi",
                    labelKey: "id_transaksi",
                    labelFormat: (item) =>
                        `#${item.id_transaksi} - ${item.produk?.nama_produk || "Transaksi"} (${item.status})`,
                },
            },
            {
                name: "id_komisi",
                label: "Nomor Komisi",
                type: "number",
                required: true,
            },
            { name: "persentase", label: "Persentase", type: "number" },
            { name: "jumlah", label: "Jumlah", type: "number" },
        ],
    },
    {
        key: "riwayat-transaksi",
        title: "Riwayat Transaksi",
        path: "/riwayat-transaksi",
        endpoint: "riwayat-transaksi",
        primaryKey: "id_riwayat",
        description: "Kelola riwayat perubahan status transaksi.",
        searchFields: [
            "status_riwayat",
            "keterangan",
            "buyer.nama",
            "seller.nama",
        ],
        columns: [
            { key: "buyer.nama", label: "Buyer" },
            { key: "seller.nama", label: "Seller" },
            {
                key: "tanggal_riwayat",
                label: "Tanggal",
                render: (row) => formatDate(row.tanggal_riwayat),
            },
            {
                key: "status_riwayat",
                label: "Status",
                render: (row) => statusBadge(row.status_riwayat),
            },
            { key: "keterangan", label: "Keterangan" },
        ],
        fields: [
            {
                name: "id_transaksi",
                label: "Transaksi",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "transaksi",
                    valueKey: "id_transaksi",
                    labelKey: "id_transaksi",
                    labelFormat: (item) =>
                        `#${item.id_transaksi} - ${item.produk?.nama_produk || "Transaksi"} (${item.status})`,
                },
            },
            {
                name: "id_buyer",
                label: "Buyer",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "buyer",
                    valueKey: "id_buyer",
                    labelKey: "nama",
                },
            },
            {
                name: "id_seller",
                label: "Seller",
                type: "relation",
                required: true,
                relation: {
                    endpoint: "seller",
                    valueKey: "id_seller",
                    labelKey: "nama",
                },
            },
            {
                name: "tanggal_riwayat",
                label: "Tanggal Riwayat",
                type: "datetime-local",
            },
            {
                name: "status_riwayat",
                label: "Status Riwayat",
                type: "select",
                required: true,
                options: [
                    "pending",
                    "nego",
                    "deal",
                    "batal",
                    "dibayar",
                    "selesai",
                ],
            },
            { name: "keterangan", label: "Keterangan", type: "textarea" },
        ],
    },
];

export const MENU_ITEMS = [
    { title: "Dashboard", path: "/" },
    ...ENTITIES.map((entity) => ({
        title: entity.title,
        path: entity.path,
    })),
];
