import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSwapLogo from '../assets/images/BookSwap.png';


const Login = () => {
    const [correctCredential, setCorrectCredential] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/action/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(bool => {
                setCorrectCredential(bool);
                if (bool) {
                    navigate('/home');
                }
            })
            .catch(err => console.log('App: log in error:', err));
    }

    return (
        <div className="form-container">
            <img src={BookSwapLogo} className='bookswap-logo' />

            <h3>Sign in to your account</h3>
            <form onSubmit={handleSubmit}>
                <div>Username</div>
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />

                <div>Password</div>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />

                <div><button type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Sign in</button></div>
            </form>
            {!correctCredential && <div className="warning">Incorrect username or password.</div>}
            <div>Not a user yet? <a href="signup">Sign up</a></div>
        </div>
    )
}

export default Login;
