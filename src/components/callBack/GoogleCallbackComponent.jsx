import React, { useEffect } from 'react'

const GoogleCallbackComponent = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            window.opener.postMessage({ code }, "http://localhost:5173");

            window.close();
        }
    }, []);

    return <h2>Logging in...</h2>;
}

export default GoogleCallbackComponent