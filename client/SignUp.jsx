import React from 'react';

const SignUp = () => {
    return (
        <div>
            <h1>Sign up</h1>
            <form method='POST' action='/signup'>
                <div>Name</div>
                <div><input name="name" type="text" /></div>
                <div>Address</div>
                <div><input name="address" type="text" /></div>
                <div>ZIP Code</div>
                <div><input name="zip" type="text" /></div>
                <div>Username</div>
                <div><input name="username" type="text"></input></div>
                <div>Password</div>
                <div><input name="password" type="password"></input></div>
                <button type="submit" id="submit-button">Create user</button>
            </form>
            <div>Already a user? <a href="/">Sign in</a></div>
        </div>
    )
}

export default SignUp;
