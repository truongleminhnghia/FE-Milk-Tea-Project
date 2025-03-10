import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callBackApi } from "../../services/authenticate.service";
import { useDispatch } from "react-redux";

const GoogleCallbackComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (code) {
            handleGoogleLogin(code);
        }
    }, []);

    const handleGoogleLogin = async (code) => {
        try {
            setIsLoading(true);

            if (code) {
                setIsLoading(false);
                if (window.opener) {
                    window.opener.postMessage({ success: true, code: code }, "*");
                }
                window.close();
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Google Login Error:", error.message);
            if (window.opener) {
                window.opener.postMessage({ success: false, message: error.message }, "*");
            }
            window.close();
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            {isLoading ? (
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    alt="Google Login"
                    width="50"
                    height="50"
                />
            ) : (
                <h2>Redirecting...</h2>
            )}
        </div>
    );
};

export default GoogleCallbackComponent;
