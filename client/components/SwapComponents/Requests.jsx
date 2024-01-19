import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard.jsx';
import HomeNavBar from '../HomeNavBar.js';

const Requests = () => {

    const [user, setUser] = useState({
        username: '',
        outgoingRequests: [
            // { book: { title: 'Tom Sawyer', author: 'TBD' }, reqUsername: 'trang', resUsername: 'ross/russ' },
            // { title: 'Great Gatsby', reqUsername: 'trang', resUsername: 'ross/russ' },
            // { title: 'Siddhartha', reqUsername: 'trang', resUsername: 'ross/russ' }
        ],
        incomingRequests: [
            // { book: { title: 'Harry Potter', author: 'TBD' }, reqUsername: 'ross/russ', resUsername: 'trang' },
            // { title: 'Great Expectations', reqUsername: 'ross/russ', resUsername: 'trang' },
            // { title: 'Mary Poppins', reqUsername: 'ross/russ', resUsername: 'trang' }

        ]
    });

    useEffect(() => {
        fetch('/action/getUser')
        .then(data => data.json())
        .then(data => setUser(data))
        .catch(err => console.log('App error in getting user: ', user));    
    }, []);

    const handleAccept = (book, reqUsername, resUsername) => {
        fetch('/library/action/approveSwapRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ book, reqUsername, resUsername })
        })
            .then(data => data.json())
            .then(setUser(user))
            .catch(err => console.log('App error accepting swap request: ', err));
    }

    const handleDecline = (book, reqUsername, resUsername) => {
        fetch('/library/action/rejectSwapRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ book, reqUsername, resUsername })
        })
            .then(data => data.json())
            .then(setUser(user))
            .catch(err => console.log('App error accepting swap request: ', err));
    }

    const outgoingRequestElems = user.outgoingRequests.map((request, i) => (
        <div key={i} style={{ width: '300px' }}>
            <RequestCard
                book={request.book}
                reqUsername={request.resUsername}
                resUsername={request.resUsername}
            />
        </div>
    ))

    const incomingRequestElems = user.incomingRequests.map((request, i) => (
        <div key={i} style={{ width: '300px' }}>
            <RequestCard
                book={request.book}
                reqUsername={request.resUsername}
                resUsername={request.resUsername}
            />
            <button className="small" onClick={() => handleAccept(request.book, request.reqUsername, request.resUsername)}>Accept</button>
            <button className="small" onClick={() => handleDecline(request.book, request.reqUsername, request.resUsername)}>Decline</button>
        </div>
    ))

    return (
        <div>
            <HomeNavBar />
            <h4>Pending Requests by You</h4>
            <div className='request-container'>{outgoingRequestElems}</div>

            <h4>Incoming Requests for Your Books</h4>
            <div className='request-container'>{incomingRequestElems}</div>
        </div>
    )

}





export default Requests;
