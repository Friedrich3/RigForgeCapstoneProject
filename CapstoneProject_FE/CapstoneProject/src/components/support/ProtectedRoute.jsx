import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children , allowedRoles = [] }) => {
    const profile = useSelector((state) => state.profile.data)
    const isAuthenticated = !!profile.email;
    const isAuthorized = allowedRoles.length === 0 || allowedRoles.includes(profile.role);

    if (!isAuthenticated) return <Navigate to="/Account/login" replace />;
    if (!isAuthorized) return <Navigate to="/unauthorized" replace />;


    return children
}

export default ProtectedRoute;