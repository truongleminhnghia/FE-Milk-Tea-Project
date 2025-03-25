import ApiCustomer from "../apis/api.customer"

export const create = async (model) => {
    try {
        const res = await ApiCustomer.post('/payments', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/payments/${id}`);
    if (res?.data) {
        return res;
    }
}