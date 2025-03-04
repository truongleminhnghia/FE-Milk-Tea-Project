import ApiCustomer from "../apis/api.customer"

export const createCategory = async (model) => {
    try {
        const res = await ApiCustomer.post('/categories', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/categories/${id}`);
    if (res?.data) {
        return res;
    }
}

export const getByList = async (params) => {
    const res = await ApiCustomer.get('/categories', {
        params
    });
    if (res?.data) {
        return res;
    }
};

export const updateById = async (id, model) => {
    const res = await ApiCustomer.put(`/categories/${id}`, model);
    if (res?.data) {
        return res;
    }
};

export const deleteById = async (id) => {
    const res = await ApiCustomer.delete(`/categories/${id}`);
    if (res) {
        return res;
    }
};

