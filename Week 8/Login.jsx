'use client';
import { useState } from 'react';
import axios from 'axios'; // Import axios
import './Login.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });

            // If successful, res.data will contain the response
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = '/';
        } catch (err) {
            // Handle error from server or request
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred during login');
            }
        }
    };

    return (
        <div className="loginWrapper">
            <button className="pageTitle">Login</button>
            <form onSubmit={handleLogin} className="loginForm">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="inputField"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="inputField"
                />
                <button type="submit" className="submitButton">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}