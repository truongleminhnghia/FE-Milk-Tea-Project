
import { message } from "antd";
import ApiCustomer from "../apis/api.customer"

export const LoginLocalApi = async (model) => {
    const res = await ApiCustomer.post('/auths/login?_typeLogin=LOGIN_LOCAL', model);
    if (res?.data && res?.message) {
        return res;
    }
}

export const register = async (model) => {
    const res = await ApiCustomer.post('/auths/register?_typeLogin=LOGIN_LOCAL', model);
    if (res?.data && res?.message) {
        return res;
    }
}