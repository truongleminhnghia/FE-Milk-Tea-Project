import ApiCustomer from "../apis/api.customer"

export const create = async (model) => {
    try {
        const res = await ApiCustomer.post('/recipes', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/recipes/${id}`);
    if (res?.data) {
        return res;
    }
}

export const getAll = async (params) => {
    const res = await ApiCustomer.get('/recipes', {
        params
    });
    if (res?.data) {
        return res;
    }
};

export const updateById = async (id, model) => {
    const res = await ApiCustomer.put(`/recipes/${id}`, model);
    if (res?.data) {
        return res;
    }
};

export const deleteById = async (id) => {
    const res = await ApiCustomer.delete(`/recipes/${id}`);
    if (res) {
        return res;
    }
};

