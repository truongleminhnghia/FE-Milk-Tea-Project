import { getById, getAll, updateById, deleteById, createOrder, createCarrt } from "../apis/ingredientProduct.api";

export const createServiceOrder = async (reqBody) => {
    try {
        const res = await createOrder(reqBody);
        if (res) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error: ", error);
        return error.message;
    }
}
export const createServiceCart = async (reqBody) => {
    try {
        const res = await createCarrt(reqBody);
        if (res) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error: ", error);
        return error.message;
    }
}

export const getByIdService = async (id) => {
    try {
        const res = await getById(id);
        if (res?.success && res?.data) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error", error);
    }
}

export const getByListSerivce = async (params) => {
    try {
        const res = await getAll(params);
        if (res?.success || res?.data) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const updateByIdService = async (id, req) => {
    try {
        const res = updateById(id, req);
        if (res?.success || res?.data) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const deleteByIdservice = async (id) => {
    try {
        const res = await deleteById(id);
        if (res?.success || res?.data) {
            return res;
        }
        return res?.message
    } catch (error) {
        console.log("Error: ", error);
    }
}