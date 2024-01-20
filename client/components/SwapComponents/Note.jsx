import React, { useState, useEffect } from 'react';

const Note = (props) => {
    const dateTimeOptions = {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };

    const textStyle = {
        color: props.read ? 'grey' : 'black',
        fontWeight: props.read ? 'normal' : 'bold',
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid lightgrey"
    };

    return (
        <div onClick={props.readNote} style={textStyle} className="notification">
            <div>
                At: {new Date(props.createdAt).toLocaleString('en-US', dateTimeOptions)} ET.
            </div>
            <div>
                {props.message}
            </div>
            {/* <div>{props.id}</div> */}
        </div>
    )
}

export default Note;
