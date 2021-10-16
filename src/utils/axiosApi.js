import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3002/"
});

let token = localStorage.getItem('loggedIn')

export const registerApi = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'POST',
        data
    })
}


export const loginApi = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'POST',
        data
    })
}

export const adminLoginApi = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'POST',
        data
    })
}

export const getOneUser = async (req) => {
    return await api.request({
        url: req.url,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const validateUser = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'POST',
        data
    })
}

export const getUsers = async (req) => {
    return await api.request({
        url: req.url,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}

export const createApi = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
        },
        data
    })
}

export const updateApi = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${token}`,
        },
        data
    })
}

export const deleteApi = async (req, id) => {
    return await api.request({
        url: req.url,
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const videoMergeApi = async (req, data) => {
    return await api.request({
        url: req.url,
        method: 'POST',
        data
    })
}