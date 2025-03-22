import ApiCustomer from "../apis/api.customer"

export const create = async (model) => {
    try {
        const res = await ApiCustomer.post('/admins/create-account', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/accounts/${id}`);
    if (res?.data) {
        return res;
    }
}

export const getAll = async (params) => {
    const res = await ApiCustomer.get('/accounts', {
        params
    });
    if (res?.data) {
        return res;
    }
};

export const updateById = async (id, model) => {
    const res = await ApiCustomer.put(`/accounts/${id}`, model);
    if (res?.data) {
        return res;
    }
};

export const deleteById = async (id) => {
    const res = await ApiCustomer.delete(`/accounts/${id}`);
    if (res) {
        return res;
    }
};

