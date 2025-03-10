
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/features/authSlice";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const currentUser = useSelector(selectUser);
    if (!currentUser) {
        return <Navigate to='/' />
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.roleName)) {
        return <Navigate to="/login" />;
    }
    return <>{element}</>;
}

export default ProtectedRoute;