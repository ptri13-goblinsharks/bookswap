import React, { useState, useEffect } from 'react';
import HomeNavBar from '../HomeNavBar';
import Note from './Note.jsx';
import Requests from './Requests.jsx';

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

    const readNote = (id) => {
        console.log('app readNote running')
        fetch(`/action/markAsRead/${id}`)
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.log('App error marking as read: ', err));
    }

    const clearNotifications = () => {
        fetch(`/action/clearNotifications`)
        .then(res => {
            if (res.status === 200) setNotifications([])
        })
        .catch(err => console.log('App error in clearning notifications: ', err));
    }

    const notificationElems = notifications.slice().reverse().map((notice, i) => (
        <div key={notice._id}>
            <Note
                id={notice._id}
                createdAt={notice.createdAt}
                message={notice.message}
                read={notice.read}
                readNote={() => readNote(notice._id)}
            />
        </div>
    ))

    return (
        <div>
            <HomeNavBar />
            <div className="notifications-container">
                <button className="transparent" onClick={clearNotifications}>Clear all</button>
                {notificationElems.length > 0 ? notificationElems : <div>No notifications yet</div>}
            </div>
        </div>
    )
}

export default Notifications;
