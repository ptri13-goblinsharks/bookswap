import React, { useState, useEffect } from 'react';

const RequestCard = (props) => {
    // const [book, setBook] = useState({
    //     title: props.title,
    //     author: '',
    //     previewUrl: '',
    //     olKey: ''
    // })

    // useEffect(() => {
    //     fetch('/library/action/findBook', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({title: props.title})
    //     })
    //     .then(data => data.json())
    //     .then(data => {
    //         console.log(data);
    //         setBook(data)
    //     })
    //     .catch(err => console.log('App error in getting book on request card: ', err));        
    // }, []);

    return (
        <div>
            <b>{props.book.title}</b>
            <div>{props.book.author}</div>
            <div>Requestor: {props.reqUsername} </div>
            <div>Owner: {props.resUsername} </div>
            <div>
                <img src={props.book.previewUrl} style={{height: '300px'}}></img>
            </div>
        </div>
    )
}



export default RequestCard;
