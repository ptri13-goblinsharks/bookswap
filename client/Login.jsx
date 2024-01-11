import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Log in</h1>
            <form method="POST" action='/login'>
                <div>Username</div>
                <input name="username" type="text" placeholder="username"></input>
                <div>Password</div>
                <input name="password" type="password" placeholder="password"></input>
                <div><button type="submit">Log in</button></div>
            </form>
        </div>
    )
}

export default Login;
