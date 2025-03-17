import ApiCustomer from "../apis/api.customer"

export const createCarrt = async (model) => {
    try {
        const res = await ApiCustomer.post('/ingredient-products?isCart=true', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const createOrder = async (model) => {
    try {
        const res = await ApiCustomer.post('/ingredient-products?isCart=false', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/ingredient-products/${id}`);
    if (res?.data) {
        return res;
    }
}

export const getAll = async (params) => {
    const res = await ApiCustomer.get('/ingredient-products', {
        params
    });
    if (res?.data) {
        return res;
    }
};

export const updateById = async (id, model) => {
    const res = await ApiCustomer.put(`/ingredient-products/${id}`, model);
    if (res?.data) {
        return res;
    }
};

export const deleteById = async (id) => {
    const res = await ApiCustomer.delete(`/ingredient-products/${id}`);
    if (res) {
        return res;
    }
};

