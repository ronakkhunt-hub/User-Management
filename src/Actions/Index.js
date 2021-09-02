export const addEmployee = (data) => {
    return {
        type: "ADD_EMP",
        payload: {
            data: data
        }
    }
}

export const deleteEmployee = (id) => {
    return {
        type: "DELETE_EMP",
        payload: {
            data: id
        }
    }
}

export const updateEmployee = (data, id) => {
    return {
        type: "UPDATE_EMP",
        payload: {
            id: id,
            data: data
        }
    }
}