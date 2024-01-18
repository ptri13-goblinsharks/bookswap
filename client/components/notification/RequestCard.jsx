import React, { useState, useEffect } from 'react';

const RequestCard = (props) => {
    const [book, setBook] = useState({
        title: props.title,
        author: '',
        previewUrl: '',
        olKey: ''
    })

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
            <div>
            {props.title}
            </div>
            <div>
                <img src="https://covers.openlibrary.org/a/olid/OL23919A-M.jpg"></img>
            </div>
        </div>
    )
}



export default RequestCard;
