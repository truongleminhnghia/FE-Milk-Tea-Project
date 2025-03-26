import { create, getById, getAll, updateById, deleteById } from "../apis/recipe.api";

export const createRecipeService = async (reqBody) => {
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
};

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
};

// services/recipe.service.js
export const getAllRecipesService = async () => {
    try {
        const response = await fetch('/api/recipes'); 
        const data = await response.json();

     
        if (data && data.recipes) {
            return data.recipes;  
        }
        throw new Error('No recipes found');
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};



export const getByListSerivce = async (params) => {
    try {
        const res = await getAll(params);
        if (res.success || res.data) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log('Error: ', error);
    }
};

export const updateByIdService = async (id, req) => {
    try {
        const res = updateById(id, req);
        if (res.success || res.data) {
            return res;
        }
        return res.message;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const deleteByIdservice = async (id) => {
    try {
        const res = await deleteById(id);
        if (res.success || res.data) {
            return res;
        }
        return res.message
    } catch (error) {
        console.log("Error: ", error);
    }
};