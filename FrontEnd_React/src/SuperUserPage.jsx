import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import './styles/SuperUserStyles.css'
import './styles/GlobalStyles.css'

// import PageFooterComponent from "./components/PageFooterComponent";
import "./components/PageFooterComponent.js"
import ErrorBoundary from "./components/ErrorBoundary";


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

        useEffect(() => {
            const footerElement = document.querySelector("page-footer-component");
    
            const handleLogout = () => {
                localStorage.removeItem("authToken");
                navigate("/login"); // React Router handles redirect
            };
    
            footerElement?.addEventListener("logout", handleLogout);
    
            return () => {
                footerElement?.removeEventListener("logout", handleLogout);
            };
        }, [navigate]);

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

            {/* Stub for PageFooterComponent (until Reactification is done): */}
            <page-footer-component buttons={JSON.stringify(["logout"])} />
        </>
    )
}

export default SuperUserPage;