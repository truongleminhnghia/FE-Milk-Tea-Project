import React, { useEffect, useState } from 'react'

const UserHook = () => {
    const [auth, setAuth] = useState(() => {
        return JSON.parse(localStorage.getItem("auth")) || null;
    });

    const [currentUser, setCurrentUser] = useState(auth?.accountResponse || "");

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedAuth = JSON.parse(localStorage.getItem("auth"));
            setAuth(updatedAuth);
        };

        // Lắng nghe thay đổi trong `localStorage`
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (auth?.accountResponse) {
            setCurrentUser(auth.accountResponse);
        } else {
            setCurrentUser("");
        }
    }, [auth]); // Chỉ chạy khi `auth` thay đổi

    return { currentUser, setCurrentUser };
};

export default UserHook;