import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/SuperUserStyles.css'

import PageFooterComponent from "./components/PageFooterComponent.js";

function NormalUserPage() {
    const navigate = useNavigate();
    useEffect( () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
// {/**/}            window.location.href = 'Pages/LoginPage.html';
            navigate("/login");
        }

        // Preventing back navigation after logout.
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function() {
            window.history.go(1);
        };

    }, []);

    const viewReports = () => {
        alert('Functionality under development...');
    };

    return (
        <>
            <div className="container">
                <h2>Super User Dashboard</h2>
                <div className="actions">
                    <a href="/Pages/ManageUsers.html">
                        <button>Manage Users</button>
                    </a>
                    <a href="/Pages/ManageProductsPage.html">
                        <button>Manage Products</button>
                    </a>
                    <button onClick={viewReports}>View Reports</button>
                </div>
            </div>

            {/* Stub for PageFooterComponent (until Reactification is done): */}
            <PageFooterComponent buttons={["dashboard", "logout"]} />

        </>
    )
}

export default NormalUserPage;