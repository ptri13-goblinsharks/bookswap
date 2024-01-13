import React, { useState, useEffect } from 'react';

const SignUp = () => {
    const [newUsername, setNewUsername] = useState('');
    const [availability, setAvailability] = useState(true);

    useEffect(() => {
        if (newUsername) {
            fetch(`/check/${newUsername}`)
            .then(res => res.json())
            .then(bool => setAvailability(bool))
            .catch(err => console.log('App: check username availability error:', err));
        } else {
            // if input is empty
            setAvailability(true);
        }
    }, [newUsername]);
    

    const handleUsernameChange = (e) => setNewUsername(e.target.value);

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
                <div><input
                    name="username"
                    type="text"
                    onChange={handleUsernameChange}
                    value={newUsername}
                /></div>
                <div>Password</div>
                <div><input name="password" type="password"></input></div>
                <button type="submit" disabled={!availability}>Create user</button>
            </form>
            { availability ? 
            <div style={{ color: "#85BAA1", fontSize: "0.8em" }}>Username is available </div> : 
            <div style={{ color: "#A41409", fontSize: "0.8em" }}>Username is not available</div>
            }
            <div>Already a user? <a href="/">Sign in</a></div>
        </div>
    )
}

export default SignUp;
