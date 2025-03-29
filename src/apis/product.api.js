import ApiCustomer from "../apis/api.customer"

export const create = async (model) => {
    try {
        const res = await ApiCustomer.post('/ingredients', model);
        if (res?.data || res?.code === 200) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/ingredients?id=${id}`);
    if (res?.data || res?.code === 200) {
        return res;
    }
}

export const getAll = async (params) => {
    const res = await ApiCustomer.get('/ingredients/search', {
        params
    });
    if (res?.data || res?.code === 200) {
        return res;
    }
};

export const updateById = async (id, model) => {
    const res = await ApiCustomer.put(`/ingredients/${id}`, model);
    if (res?.data || res?.code === 200) {
        return res;
    }
};

export const deleteById = async (id) => {
    const res = await ApiCustomer.delete(`/ingredients/${id}`);
    if (res?.data || res?.code === 200) {
        return res;
    }
};

