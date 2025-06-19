
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const useFooterLogout = () => {
    const navigate = useNavigate();

    /* New-Updation */
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        navigate("/login");
    }, [navigate]);

    // const logout = () => {
    //     localStorage.removeItem('authToken');
    //     navigate("/login");
    // };

    // Auto Logout on token expiry.
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        if(!token) {
            // If no token, redirect to login
            navigate("/login");
            return;
        }

        try {
            const { exp: expTokenValue } = jwtDecode(token); // Get the expiration time from the tokenexpTime}
            const expiryTime = expTokenValue * 1000 - Date.now();
            
            if( expiryTime <= 0 ) {
                // Token has expired, redirect to login
                logout();
                return;
            }

            const logoutTimer = setTimeout(() => logout(), expiryTime);

            return () => clearTimeout(logoutTimer);
        } catch (error) {
            // If decoding fails, treat as invalid token and redirect to login
            logout();
        }
    }, [logout]);

    // Prevent back navigation after logout.
    useEffect( () => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function() {
            window.history.go(1);
        };

        return () => {
            window.onpopstate = null;
        };
    }, []);
    
    return logout;  // return the funciton for manual use.
}

    // useEffect( () => {
    //     const footerElement = document.querySelector("page-footer-component");

    //     const handleLogout = () => {
    //         navigate("/login"); // React Router handles redirect
    //     };

    //     footerElement?.addEventListener("logout", handleLogout);

    //     return () => {
    //         footerElement?.removeEventListener("logout", handleLogout);
    //     };
    // }, [navigate]);
// };

export default useFooterLogout;