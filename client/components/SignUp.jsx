import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    // const [newUsername, setNewUsername] = useState('');
    const navigate = useNavigate();
    const [availability, setAvailability] = useState(true);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        zipcode: '',
    })

    useEffect(() => {
        if (userData.username) {
            fetch(`/action/check/${userData.username}`)
                .then(res => res.json())
                .then(bool => {
                    setAvailability(bool)
                })
                .catch(err => console.log('App: check username availability error:', err));
        } else {
            // if input is empty
            setAvailability(true);
        }
    }, [userData.username]);


    // const handleUsernameChange = (e) => setNewUsername(e.target.value);
    const handleUserDataChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: userData.name,
            address: userData.address,
            zipcode: userData.zipcode,
            username: userData.username,
            password: userData.password,
        };
        fetch('/action/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(bool => {
                if (bool) {
                    navigate('/home');
                }
            })
            .catch(err => console.log("App: create user error ", err));
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div>Name</div>
                <div><input
                    name="name"
                    type="text"
                    value={userData.name}
                    onChange={handleUserDataChange} /></div>

                <div>Address</div>
                <div><input
                    name="address"
                    type="text"
                    value={userData.address}
                    onChange={handleUserDataChange} /></div>

                <div>ZIP Code</div>
                <div><input
                    name="zipcode"
                    type="text"
                    value={userData.zipcode}
                    onChange={handleUserDataChange} /></div>

                <div>Username</div>
                <div><input
                    name="username"
                    type="text"
                    value={userData.username}
                    onChange={handleUserDataChange}
                /></div>

                <div>Password</div>
                <div><input
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={handleUserDataChange} /></div>

                <button type="submit" 
                disabled={
                    !availability || 
                    !userData.name || 
                    !userData.address || 
                    !userData.zipcode ||
                    !userData.username ||
                    !userData.password 
                    }>Create user</button>
            </form>
            {availability ?
                <div style={{ color: "#85BAA1", fontSize: "0.8em" }}>Username is available </div> :
                <div style={{ color: "#A41409", fontSize: "0.8em" }}>Username is not available</div>
            }
            <div>Already a user? <a href="/">Sign in</a></div>
        </div>
    )
}

export default SignUp;
