import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Loading from '../Loading/Loading'; // Import the Loading component
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const { isLogin, setIsLogin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading
        try {
            const response = await fetch(`${API_URL}/schools/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setIsLogin(true);
                setError('');
                localStorage.setItem('isLogin', 'true');
            } else {
                setIsLogin(false);
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    const handleLogout = () => {
        setIsLogin(false);
        localStorage.removeItem('isLogin');
    };

    return (
        <div className="login-container">
            {loading && <Loading />} {/* Display the loading animation */}
            <div className="login-card">
                <div style={{ margin: "15px" }}>
                    <div className="profile-image-container">
                        <img src="/user.jpg" alt="Profile" className="profile-image" />
                    </div>
                </div>
                {isLogin ? (
                    <button className="login-button" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <form onSubmit={handleLogin} method="post">
                        <input
                            name="username"
                            className="login-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            name="password"
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="login-error">{error}</p>}
                        <button className="login-button" type="submit" disabled={loading}>
                            Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
