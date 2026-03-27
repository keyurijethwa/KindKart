import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const AuthRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // Prevent access to auth pages if already logged in (redirect to dashboard)
    if (token && user) {
        if (user.role === "DONOR") return <Navigate to="/donor/dashboard" replace />;
        if (user.role === "NGO") return <Navigate to="/ngo/dashboard" replace />;
        if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};
