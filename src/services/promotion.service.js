import { create, getById, getAll, updateById } from "../apis/promotion.api";

export const createPromotionService = async (reqBody) => {
    try {
        const res = await create(reqBody);
        if (res?.data) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error: ", error);
        return error.message;
    }
};

export const getByIdPromotionService = async (id) => {
    try {
        const res = await getById(id);
        if (res?.data) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error", error);
    }
};

export const getAllPromotionService = async (params) => {
    try {
        const res = await getAll(params);
        if (res?.data) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const updatePromotionService = async (id, reqBody) => {
    try {
        const res = await updateById(id, reqBody);
        if (res?.data || res?.code === 200) {
            return res;
        }
        return res?.message;
    } catch (error) {
        console.log("Error: ", error);
        return error.message;
    }
};
