import React from "react";
import { useNavigate } from "react-router-dom";
// import "./styles/PageFooterStyles.css"; // Optional: if you had specific styles
import './styles/PageFooterStyles.css';

function PageFooterComponent({ buttons = [] }) {
    const navigate = useNavigate();

    const goToDashboard = () => {
        // Navigate to dashboard (you can change to React-Router later)
        // window.location.href = "/Pages/SuperUserPage.html";
        navigate('/superuser');
    };

    const goBack = () => {
        window.history.back();
    };

    const userLogout = () => {
        localStorage.removeItem("authToken"); // fixed key
        // window.location.href = "/Pages/LoginPage.html";
        navigate('/login');
    };

    const handleClick = (type) => {
        switch (type) {
            case "dashboard":
                goToDashboard();
                break;
            case "back":
                goBack();
                break;
            case "logout":
                userLogout();
                break;
            default:
                console.warn(`Unknown button type: ${type}`);
        }
    };

    return (
        <footer className="page-footer">
            <div className="page-footer-button-container">
                {buttons.map((type) => (
                    <button
                        key={type}
                        className="page-footer-btn"
                        onClick={() => handleClick(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
        </footer>
    );
}

export default PageFooterComponent;
