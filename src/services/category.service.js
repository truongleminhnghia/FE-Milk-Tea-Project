import { createCategory, getById, getByList, updateById, deleteById } from "../apis/categories.api";

export const createCategoryService = async (reqBody) => {
    try {
        const res = await createCategory(reqBody);
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
        if (res.success && res.data) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log("Error", error);
    }
}

export const getByListSerivce = async (params) => {
    try {
        const res = await getByList(params);
        if (res.success || res.data) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const updateByIdService = async (id, req) => {
    try {
        const res = await updateById(id, req);
        console.log("res", res);
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
        if (res.success || res.data) {
            return res;
        } 
        return res.message;
    } catch (error) {
        console.log("Error: ", error);
        return { success: false, message: error.message || "Lỗi khi xóa danh mục" };
    }
}