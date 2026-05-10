import axios from "axios";

export const http = axios.create({
    baseURL: "/api",
    headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    timeout: 15000,
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    },
);

export function getEntityUrl(entity, row = null) {
    if (!row) {
        return `/${entity.endpoint}`;
    }

    if (entity.compositeKey) {
        return `/${entity.endpoint}/${row.id_transaksi}/${row.id_komisi}`;
    }

    return `/${entity.endpoint}/${row[entity.primaryKey]}`;
}

export async function fetchEntity(entity) {
    const response = await http.get(`/${entity.endpoint}`);
    return Array.isArray(response.data) ? response.data : [];
}

export async function createEntity(entity, payload) {
    const response = await http.post(`/${entity.endpoint}`, payload);
    return response.data;
}

export async function updateEntity(entity, row, payload) {
    const response = await http.put(getEntityUrl(entity, row), payload);
    return response.data;
}

export async function deleteEntity(entity, row) {
    const response = await http.delete(getEntityUrl(entity, row));
    return response.data;
}
