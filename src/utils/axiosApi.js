import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_PRODUCTMANAGEURL
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

export const getOneUser = async (req) => {
    let token = localStorage.getItem('loggedIn')
    return await api.request({
        url: req.url,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const getUsers = async (req) => {
    let token = localStorage.getItem('loggedIn')
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

export const getProduct = async (req) => {
    let token = localStorage.getItem('loggedIn')
    return await api.request({
        url: req.url,
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const getOneProduct = async (req) => {
    return await api.request({
        url: req.url,
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const addtoCart = async (req, data) => {
    console.log(`data`, data)
    return await api.request({
        url: req.url,
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        data
    })
}

export const getOrderCart = async (req) => {
    return await api.request({
        url: req.url,
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const getOneOrderCart = async (req) => {
    return await api.request({
        url: req.url,
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export const updateCart = async (req, data) => {
    return await api.request({
        url: req.url,
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`,
        },
        data
    })
}

export const deleteCart = async (req) => {
    return await api.request({
        url: req.url,
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
}