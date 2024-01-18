/**
 * ************************************
 *
 * @module  MyBooks.js
 * @author
 * @date
 * @description display componenent that renders user library
 *
 * ************************************
 */


import React from 'react'

const MyBooks = props => {

    const myBooks = props.books.map(element => {
        element.previewUrl;
    })

  return (
    <div>
        <ul className='myBooks'>{myBooks}</ul>
    </div>
  )
}

export default MyBooks