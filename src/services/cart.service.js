import { addItem, create, getByAccount, getCartItemId, getListItem } from "../apis/cart.api";
import { toastConfig } from "../utils/utils";

export const createCategoryService = async (reqBody) => {
    try {
        const res = await create(reqBody);
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
        const res = await getByAccount(id);
        if (res?.success || res?.data || res.code === 200) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log("Error", error);
    }
}

export const getListItemByCart = async (id) => {
    try {
        const res = await getListItem(id);
        if (res?.success || res?.data || res.code === 200) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log("Error", error);
    }
}

export const createItem = async (reqBody) => {
    try {
        const res = await addItem(reqBody);
        if (res) {
            return res;
        }
        return res?.data?.message;
    } catch (error) {
        toastConfig("error", error.message)
        return error.message;
    }
}

export const getByIdItemService = async (id) => {
    try {
        const res = await getCartItemId(id);
        if (res?.success || res?.data || res?.code === 200) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error", error);
    }
}

