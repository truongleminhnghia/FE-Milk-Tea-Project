import ApiCustomer from "../apis/api.customer"
import { EnumRoleName } from "../utils/enum.constant";
import { login, logout } from "../redux/features/authSlice";
import { store } from "../redux/store"; // Đường dẫn tùy vào cấu trúc dự án
import { persistStore } from "redux-persist";
import { LoginLocalApi, register, loginGoogle, callBack } from "../apis/authenticate.api";


export const Login = async (user, dispatch, navigate) => {
    try {
        const res = await LoginLocalApi(user);
        console.log("res", res)
        if (res?.data && res?.success) {
            localStorage.setItem("access_token", res.data.token);
            dispatch(login(res.data.accountResponse))
            switch (res.data.accountResponse.roleName) {
                case "ROLE_ADMIN":
                    navigate("/admin-page");
                    break;
                case "ROLE_MANAGER":
                    navigate("/admin-page");
                    break;
                case "ROLE_CUSTOMER":
                    navigate("/");
                    break;
                case "ROLE_STAFF":
                    navigate("/admin-page");
                    break;
                default:
                    break;
            }
            return res;
        } else {
            console.error("Login failed: ", res.message);
            return null;
        }
    } catch (error) {
        console.error("Login Error:", error);
        return null;
    }
};

export const checkRole = (user, navigate) => {
    if (user.roleName === EnumRoleName.ADMIN || user.roleName === EnumRoleName.MANAGER || user.roleName === EnumRoleName.STAFF) {
        navigate("/admin-page");
    } else if (user.roleName === EnumRoleName.CUSTOMER) {
        navigate("/");
    } else {
        navigate("/error");
    }
}

export const Register = async (newUser, navigate) => {
    try {
        const res = await register(newUser);
        if (res?.data) {
            if (res.success) {
                navigate("/login")
            }
            return res.data;
        }
        console.error("Unexpected response:", res);
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        throw error;
    }
};


export const logoutApi = () => async (dispatch) => {
    try {
        localStorage.removeItem("access_token"); // Xóa token khỏi localStorage
        dispatch(logout()); // Cập nhật Redux state
        persistStore(store).purge(); // Xóa Redux persist nếu cần
    } catch (error) {
        console.error("Error:", error.message);
    }
};

export const handlerLoginGoogle = async () => {
    try {
        const user = {
            emai: "",
            Password: "",
        }
        const res = await loginGoogle(user);
        if (res.data && res.success) {
            res.data;
            console.log("res: ", res.data);
            return res;
        }
        return null;
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

export const callBackApi = async (params, dispatch, navigate) => {
    try {
        const res = await callBack(params);
        if (res?.data && res?.success) {
            localStorage.setItem("access_token", res.data.token);
            dispatch(login(res.data.accountResponse))
            switch (res.data.accountResponse.roleName) {
                case "ROLE_ADMIN":
                    navigate("/admin-page");
                    break;
                case "ROLE_MANAGER":
                    navigate("/admin-page");
                    break;
                case "ROLE_CUSTOMER":
                    navigate("/");
                    break;
                case "ROLE_STAFF":
                    navigate("/admin-page");
                    break;
                default:
                    break;
            }
            return res;
        } else {
            console.error("Login failed: ", res.message);
            return null;
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
}
