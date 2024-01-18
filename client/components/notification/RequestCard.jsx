import React, { useState, useEffect } from 'react';

const RequestCard = (props) => {
    return (
        <div>
            Requested book is {props.title}, and book owner is {props.resUsername}

        </div>
    )
}



export default RequestCard;
