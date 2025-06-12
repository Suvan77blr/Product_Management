import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GlobalStyles.css';
// import PageFooterComponent from "./components/PageFooterComponent";
// import ErrorBoundary from "./components/ErrorBoundary";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
     

    const handleLogin = async (e) => {

        e.preventDefault();
        setErrorMessage('');    // Resetting error msg.

        const API_ROUTE = "/login";
        const IS_DEVELOPMENT = import.meta.env.MODE === 'development';
        const baseURL = IS_DEVELOPMENT ? API_ROUTE : (import.meta.env.VITE_API_BASE_URL + API_ROUTE);
        console.log('Using API URL:', baseURL); 
        try {
            

            const response = await fetch(`${baseURL}`, {
            // const response = await fetch(`/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
            });

            const values = await response.json();

            if(values.success) {
                const token = values.token;
                const user = values.user;

                localStorage.setItem('authToken', token);

                if(user.role === 'superuser') {
                    // window.location.href = '../../FrontEnd/Pages/SuperUserPage.html';
                    navigate('/superuser');
                }
                else if(user.role === 'user') {
                    navigate('/user');
                }
                else {
                    // window.location.href = '../../FrontEnd/Pages/NormalUserPage.html';
                    alert('Error...');
                    // navigate('normaluser');
                }
            }
            else {
                setErrorMessage(values.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container container">
            <h2>Login</h2>
            <form id="userLoginForm" onSubmit={handleLogin}>
                <div className="input-container">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label htmlFor="email">Email</label>
                </div>

                {/* <!-- <label htmlFor="password">Password</label> --> */}
                <div className="input-container">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <button type="submit">Login</button>
            </form>
            { errorMessage && (
                <p id="errorMessage" style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
            )}
            
            {/* <button 
                className='super-user-popup-button'
                // onClick={() => (window.location.href = '../../FrontEnd/Pages/NormalUserPage.html')}
                onClick={() => ( navigate('/superuser') )}
                type = "button"
            >
            Super-User
            </button> */}

            {/* <ErrorBoundary >
                    <PageFooterComponent buttons={["dashboard", "logout"]} />
            </ErrorBoundary > */}
        </div>
    );
}

export default LoginPage;
