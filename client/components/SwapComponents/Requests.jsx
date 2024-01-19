import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard.jsx';
import HomeNavBar from '../HomeNavBar.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


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
    const [success, setSuccess] = useState(undefined);
    const [approved, setApproved] = useState('');

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
            .then(data => {
                if (data.status !== 200) setSuccess(false);
                return data.json();
            })
            .then(data => {
                setUser(data);
                setSuccess(true);
                setApproved('approved');
            })
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
            .then(data => {
                if (data.status !== 200) setSuccess(false);
                return data.json()
            })
            .then(data => {
                setUser(data);
                setSuccess(true);
                setApproved('declined')
            })
            .catch(err => console.log('App error accepting swap request: ', err));
    }

    const handleWithdraw = (book, reqUsername, resUsername) => {
        fetch('/library/action/withdrawRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ book, reqUsername, resUsername })
        })
            .then(data => data.json())
            .then(data => setUser(data))
            .catch(err => console.log('App error withdrawing request: ', err))
    }

    const outgoingRequestElems = user.outgoingRequests.map((request, i) => (
        <div key={i} style={{ width: '300px' }}>
            <RequestCard
                book={request.book}
                reqUsername={request.reqUsername}
                resUsername={request.resUsername}
            />
            <button className="transparent" onClick={() => handleWithdraw(request.book, request.reqUsername, request.resUsername)}>Withdraw</button>
        </div>
    ))

    const incomingRequestElems = user.incomingRequests.map((request, i) => (
        <div key={i} style={{ width: '300px' }}>
            <div>
                <b>{request.book.title}</b>
                <div>Author: {request.book.author}</div>
                <div>Requestor: {request.reqUsername} </div>
                <div>Owner: {request.resUsername} </div>
                <div><img src={request.book.previewUrl} style={{ height: '300px' }}></img></div>
            </div>
            {/* <RequestCard
                book={request.book}
                reqUsername={request.reqUsername}
                resUsername={request.resUsername}
            /> */}
            <button className="small" onClick={() => handleAccept(request.book, request.reqUsername, request.resUsername)}>Accept</button>
            <button className="transparent" onClick={() => handleDecline(request.book, request.reqUsername, request.resUsername)}>Decline</button>
        </div>
    ))

    const warning = () => {
        if (success) {
            return <div class="warning" style={{ color: "#85BAA1", fontSize: "0.8em" }}>You have successfully {approved} the request </div>;
        } else if (success === false) {
            return <div class="warning" style={{ color: "#A41409", fontSize: "0.8em" }}>Error: You have not succesfully {approved} the request.</div>
        };
    }
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div>
            <HomeNavBar />
            <h1>Pending requests by you</h1>
            <div className='request-container'>
                {outgoingRequestElems.length > 0 ?
                    // <Carousel responsive={responsive}>
                    outgoingRequestElems
                    // </Carousel>
                    : <div>No outgoing requests yet</div>}</div>

            <h1>Incoming requests for your books</h1>
            <div className='request-container'>
                {incomingRequestElems.length > 0 ?
                    // <Carousel responsive={responsive}>
                    incomingRequestElems
                    // </Carousel>
                    : <div>No incoming requests yet</div>
                }</div>
            {warning()}
        </div>
    )
}



export default Requests;
