import { create, getByAccount} from "../apis/cart.api";

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
        if (res.success && res.data) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log("Error", error);
    }
}

