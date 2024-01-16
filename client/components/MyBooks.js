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

const MyBooks = ({ books }) => {ß
  return (
    <div>{books.map(element => {
        element.preview;
    })};
    </div>
  )
}

export default MyBooks