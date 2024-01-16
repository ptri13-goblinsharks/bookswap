import React, { useState, useEffect } from 'react';

const Login = () => {
    const [ correctCredential, setCorrectCredential ] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                window.location.href = '/home';
            }
        })
        .catch(err => console.log('App: log in error:', err));
    }
    
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div>Username</div>
                <input 
                name="username" 
                type="text" 
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}/>
                
                <div>Password</div>
                <input 
                name="password" 
                type="password" 
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
                
                <div><button type="submit">Log in</button></div>
            </form>
            {!correctCredential && <div>Incorrect username or password.</div>}
            <div>Not a user yet? <a href="signup">Sign up</a></div>
        </div>
    )
}

export default Login;
