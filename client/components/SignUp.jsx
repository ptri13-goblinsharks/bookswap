import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSwapLogo from '../assets/images/BookSwap.png';


const SignUp = () => {
    // const [newUsername, setNewUsername] = useState('');
    const navigate = useNavigate();
    const [availability, setAvailability] = useState(true);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        instructions: '',
        // zipcode: '',
    })

    useEffect(() => {
        fetch('/action/getMapsKey')
            .then(res => res.json())
            .then((key) => {
                const script = document.createElement('script');
                script.id = 'google'
                script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
                script.async = true;
                document.head.appendChild(script);
            })
            .catch(err => console.log('App: Error retrieving maps key ', err))

        return () => {
            const removedScript = document.getElementById('google');
            if (removedScript) document.head.removeChild(removedScript);
        }
    }, []);


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
        };

        const GooglePlacesSetUp = () => {
            if (window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(
                    document.getElementById('address-input'),
                    { types: ['address'] }
                );
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place.formatted_address) {
                        setUserData({
                            ...userData,
                            address: place.formatted_address
                        })
                    }
                })
            }
        }
        GooglePlacesSetUp();
    }, [userData]);


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
            username: userData.username,
            password: userData.password,
            instructions: userData.instructions
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
        <div className="form-container">
            <img src={BookSwapLogo} className='bookswap-logo' />

            <h3>Sign up</h3>
            <form onSubmit={handleSubmit}>
                <div>Name</div>
                <div><input
                    name="name"
                    type="text"
                    value={userData.name}
                    onChange={handleUserDataChange} /></div>

                <div>Address</div>
                <div><input
                    id="address-input"
                    name="address"
                    type="text"
                    value={userData.address}
                    onChange={handleUserDataChange} /></div>

                {/* <div>ZIP Code</div>
                <div><input
                    name="zipcode"
                    type="text"
                    value={userData.zipcode}
                    onChange={handleUserDataChange} /></div> */}

                <div>Pick up instructions (Optional)</div>
                <div><input
                    name="instructions"
                    type="text"
                    placeholder="e.g. pick up from doorman, or contact me at email / phone"
                    value={userData.instructions}
                    onChange={handleUserDataChange}
                /></div>

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
                        // !userData.zipcode ||
                        !userData.username ||
                        !userData.password
                    }>Create user</button>
            </form>
            {availability ?
                <div class="warning" style={{ color: "#85BAA1", fontSize: "0.8em" }}>Username is available </div> :
                <div class="warning" style={{ color: "#A41409", fontSize: "0.8em" }}>Username is not available</div>
            }
            <div>Already a user? <a href="/">Sign in</a></div>
        </div>
    )
}

export default SignUp;
