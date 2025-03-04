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

export const formatISODate = (isoString, format = "DD/MM/YYYY") => {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    switch (format) {
        case "DD/MM/YYYY":
            return `${day}-${month}-${year}`;
        case "MM/DD/YYYY":
            return `${month}-${day}-${year}`;
        case "YYYY-MM-DD":
            return `${year}-${month}-${day}`;
        default:
            return "Invalid Format";
    }
};