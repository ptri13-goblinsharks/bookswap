import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSwapLogo from '../assets/images/BookSwap.png';
import HomeNavBar from './HomeNavBar';


const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        address: '',
        instructions: '',
    })
    const [success, setSuccess] = useState(undefined);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

    useEffect(() => {
        fetch('/action/getMapsKey')
            .then(res => res.json())
            .then((key) => {
                const script = document.createElement('script');
                script.id = 'google';
                script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
                script.async = true;
                script.onload = () => setIsGoogleMapsLoaded(true);
                document.head.appendChild(script);
            })
            .catch(err => console.log('App: Error retrieving maps key ', err))

        fetch('/action/getUser')
            .then(data => data.json())
            .then(data => {
                setUserData(data);
            })
            .catch(err => console.log('App error getting user: ', err))

        return () => {
            const removedScript = document.getElementById('google');
            if (removedScript) document.head.removeChild(removedScript);
        }
    }, []);

    useEffect(() => {
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

        if (isGoogleMapsLoaded) GooglePlacesSetUp();
    }, [isGoogleMapsLoaded, userData]);

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
            instructions: userData.instructions
        };
        fetch('/action/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    setSuccess(true);
                    return res.json();
                } else {
                    setSuccess(false);
                }
            })
            .then(data => {
                setUserData(data);
            })
            .catch(err => console.log("App: update user error ", err));
    }

    const warning = () => {
        if (success) {
            return <div class="warning" style={{ color: "#85BAA1", fontSize: "0.8em" }}>Profile successfully updated </div>;
        } else if (success === false) {
            return <div class="warning" style={{ color: "#A41409", fontSize: "0.8em" }}>Error in updating profile </div>
        };
    }

    return (
        <div>
            <HomeNavBar />
            <div className="form-container">
                <h3>Update your profile</h3>
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

                    <div>Pick up instructions (Optional)</div>
                    <div><input
                        name="instructions"
                        type="text"
                        placeholder="e.g. pick up from doorman, or contact me at email / phone"
                        value={userData.instructions}
                        onChange={handleUserDataChange}
                    /></div>

                    <button type="submit"
                        disabled={
                            !userData.name ||
                            !userData.address
                        }>Update profile</button>
                </form>
                {warning()}
            </div>
        </div>
    )
}

export default Profile;
