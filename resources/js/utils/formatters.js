export function formatCurrency(value) {
    if (value === null || value === undefined || value === "") return "-";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value));
}

export function formatDate(value) {
    if (!value) return "-";

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}

export function getNestedValue(object, path) {
    if (!object || !path) return "-";

    return (
        path.split(".").reduce((current, key) => {
            if (
                current &&
                current[key] !== undefined &&
                current[key] !== null
            ) {
                return current[key];
            }

            return null;
        }, object) ?? "-"
    );
}

export function normalizePayload(fields, form) {
    return fields.reduce((payload, field) => {
        let value = form[field.name];

        if (value === "") {
            value = null;
        }

        if ((field.type === "number" || field.type === "relation") && value !== null) {
            value = Number(value);
        }

        payload[field.name] = value;
        return payload;
    }, {});
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
