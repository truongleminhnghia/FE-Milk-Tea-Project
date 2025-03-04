
import { message } from "antd";
import ApiCustomer from "../apis/api.customer"

export const LoginLocalApi = async (model) => {
    const res = await ApiCustomer.post('/auths/login?typeLogin=LOGIN_LOCAL', model);
    if (res?.data && res?.message) {
        return res;
    }
}

export const register = async (model) => {
    const res = await ApiCustomer.post('/auths/register', model);
    console.log("res", res)
    if (res?.data && res?.message) {
        return res;
    }
}

export const loginGoogle = async (model) => {
    const res = await ApiCustomer.post('/auths/login?typeLogin=LOGIN_GOOGLE', model);
    if (res?.data && res?.message) {
        return res;
    }
}

export const callBack = async (params) => {
    const res = await ApiCustomer.get('/auths/callback', { params });
    if (res?.data && res?.message) {
        return res;
    }
}