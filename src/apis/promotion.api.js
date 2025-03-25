import ApiCustomer from "../apis/api.customer"

export const create = async (model) => {
    try {
        const res = await ApiCustomer.post('/promotions', model);
        if (res) {
            return res;
        }
        return null;
    } catch (error) {
        return error.message;
    }
}

export const getById = async (id) => {
    const res = await ApiCustomer.get(`/promotions/${id}`);
    if (res?.data) {
        return res;
    }
}

// export const getListItem = async (id) => {
//     const res = await ApiCustomer.get(`promotions/cart/${id}`);
//     if (res?.data) {
//         return res;
//     }
// }

// export const addItem= async (model) => {
//     const res = await ApiCustomer.post('cart-items', model);
//     if (res?.data) {
//         return res;
//     }
// }

// export const getCartItemId= async (id) => {
//     const res = await ApiCustomer.get(`cart-items/${id}`);
//     if (res?.data) {
//         return res;
//     }
// }



