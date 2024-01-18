import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavBar from './HomeNavBar';


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch('/action/getNotifications')
            .then(data => data.json())
            .then((data) => {
                console.log('notifications received: ', data);
                setNotifications(data);
            })
            .catch(err => console.log('APP error in getting notifications: ', err));
    }, []);

    const notificationElems = notifications.map((notification, i) => {
        return (
            <div key={notification._id}>
                <div>
                    Created at: {notification.createdAt}
                </div>
                <div>
                    {notification.message}
                </div>
            </div>
        )
    })

    return (
        <div>
            <HomeNavBar />
            <div className="notifications-container">
            {notificationElems.length > 0 ? notification.Elems : <div>No notifications yet</div>}
            </div>
        </div>
    )
}

export default Notifications;
