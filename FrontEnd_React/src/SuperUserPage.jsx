import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import './styles/GlobalStyles.css'


import "./components/PageFooterComponent.js"
import ErrorBoundary from "./components/ErrorBoundary";
import useFooterLogout from "./hooks/useFooterLogout.js";


function SuperUserPage() {
    const navigate = useNavigate();

//     useEffect( () => {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
// // {/**/}            window.location.href = 'Pages/LoginPage.html';
//             navigate("/login");
//         }

//         // Preventing back navigation after logout.
//         window.history.pushState(null, '', window.location.href);
//         window.onpopstate = function() {
//             window.history.go(1);
//         };

//     }, []);

    const pageFooterRef = useRef(null);
    const logout = useFooterLogout();

    useEffect(() => {
        const footerEl = pageFooterRef.current;

        const handleLogout = () => {
            logout(); // handles token removal, redirect, back-prevention
        };

        if (footerEl) {
            footerEl.addEventListener("logout", handleLogout);
        }

        return () => {
            if (footerEl) {
                footerEl.removeEventListener("logout", handleLogout);
            }
        };
    }, [logout]);

        // useEffect(() => {
        //     const footerElement = document.querySelector("page-footer-component");
    
        //     const handleLogout = () => {
        //         navigate("/login"); // React Router handles redirect
        //     };
    
        //     footerElement?.addEventListener("logout", handleLogout);
    
        //     return () => {
        //         footerElement?.removeEventListener("logout", handleLogout);
        //     };
        // }, [navigate]);

    const viewReports = () => {
        alert('Functionality under development...');
    };

    return (
        <>
            <div className="container">
                <h2>Super User Dashboard</h2>
                <div className="actions">
                    <Link to="/users/manage">
                        <button>Manage Users</button>
                    </Link>
                    <Link to="/products/manage">
                        <button>Manage Products</button>
                    </Link>
                    <button onClick={viewReports}>View Reports</button>
                </div>
            </div>

             {/* Footer Web Component with attached ref */}
            <page-footer-component 
                ref = {pageFooterRef}
                buttons={JSON.stringify(["logout"])} 
            />
        </>
    )
}

export default SuperUserPage;