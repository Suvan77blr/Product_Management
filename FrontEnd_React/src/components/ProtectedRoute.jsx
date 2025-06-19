// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
/* New-Updation */
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // If not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();


        if (isExpired) {
            // Token has expired, redirect to login
            return <Navigate to="/login" replace />;
        }
        
    } catch (error) {
        // If decoding fails, treat as invalid token and redirect to login
        localStorage.removeItem("authToken")
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
