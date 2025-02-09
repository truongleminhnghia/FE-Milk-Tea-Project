
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const { user } = currentUser;

    if (!currentUser) {
        return <Navigate to='/' />
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.roleName)) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;