import { Children, useContext } from "react";
import { useStateContext } from "../context/authencontext";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { user } = currentUser;

    if (!user) {
        return <Navigate to='/' />
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;