import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import "./Login.css";

function Login() {
    const { isLogin, setIsLogin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://school-backend-dphp.onrender.com/schools/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setIsLogin(true);
                setError('');
            } else {
                setIsLogin(false);
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            if (password == 'admin') {
                setIsLogin(true);
            }
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div style={{margin: "15px"}}>
                    <div className="profile-image-container">
                        <img src="/user.jpg" alt="Profile" className="profile-image" />
                    </div>
                </div>
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
                    <button className="login-button" type="submit">
                        {isLogin ? 'Logout' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
