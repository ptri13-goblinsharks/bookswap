import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard.jsx';

const Requests = () => {

    const [user, setUser] = useState({
        username: 'trang',
        outgoingRequests: [
            { title: 'Outgoing test book 1', reqUsername: 'trang', resUsername: 'ross/russ' },
            { title: 'Outgoing test book 2', reqUsername: 'trang', resUsername: 'ross/russ' },
            { title: 'Outgoing test book 3', reqUsername: 'trang', resUsername: 'ross/russ' }
        ],
        incomingRequests: [
            { title: 'Incoming test book 1', reqUsername: 'ross/russ', resUsername: 'trang' },
            { title: 'Incoming test book 2', reqUsername: 'ross/russ', resUsername: 'trang' },
            { title: 'Incoming test book 3', reqUsername: 'ross/russ', resUsername: 'trang' }

        ]
    });

    // useEffect(() => {
    //     fetch('/action/getUser')
    //     .then(data => data.json())
    //     .then(data => setUser(data))
    //     .catch(err => console.log('App error in getting user: ', user));    
    // }, []);

    const handleAccept = (title, reqUsername, resUsername) => {
        fetch('/library/action/approveSwapRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, reqUsername, resUsername })
        })
        .then(data => data.json())
        .then(setUser(user))
        .catch(err => console.log('App error accepting swap request: ', err));
    }

    const handleDecline = (title, reqUsername, resUsername) => {
        fetch('/library/action/rejectSwapRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, reqUsername, resUsername })
        })
        .then(data => data.json())
        .then(setUser(user))
        .catch(err => console.log('App error accepting swap request: ', err));
    }

    const outgoingRequestElems = user.outgoingRequests.map((request, i) => (
        <div key={i}>
            <RequestCard
                title={request.title}
                reqUsername={request.resUsername}
                resUsername={request.resUsername}
            />
        </div>
    ))

    const incomingRequestElems = user.incomingRequests.map((request, i) => (
        <div key={i}>
            <RequestCard
                title={request.title}
                reqUsername={request.resUsername}
                resUsername={request.resUsername}
            />
            <button className="small" onClick={() => handleAccept(request.title, request.reqUsername, request.resUsername)}>Accept</button>
            <button className="small" onClick={() => handleDecline(request.title, request.reqUsername, request.resUsername)}>Decline</button>
        </div>
    ))

    return (
        <div>
            <h4>Pending Requests by You</h4>
            <div>{outgoingRequestElems}</div>

            <h4>Incoming Requests for Your Books</h4>
            <div>{incomingRequestElems}</div>
        </div>
    )

}





export default Requests;
