import { message } from "antd";
import { toast } from "react-toastify";

export const formatCurrencyVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

export const toastConfig = (type, message, options = {}) => {
    const defaultOptions = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    if (type === "success") {
        toast.success(message, defaultOptions);
    } else if (type === "error") {
        toast.error(message, defaultOptions);
    } else if (type === "info") {
        toast.info(message, defaultOptions);
    } else if (type === "warn") {
        toast.warn(message, defaultOptions);
    } else {
        toast(message, defaultOptions);
    }
}

// export const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//         console.log("User pressed Enter!");
//     }
// }

export const handleKeyDown = (event, callback) => {
    if (event.key === "Enter") {
        console.log("User pressed Enter!");
        if (callback) {
            callback(); // Gọi callback nếu có
        }
    }
};