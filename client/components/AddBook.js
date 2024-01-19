/**
 * ************************************
 *
 * @module  AddBook.js
 * @author
 * @date
 * @description search bar that takes input and adds book to personal library
 *
 * ************************************
 */

import React from 'react'
import { useState, useEffect } from 'react';
import MyBooks from './MyBooks';
import Modal from './modal';


const AddBook = ({ updateBooks }) => {
    const [books, setBooks] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [selectedBook, setSelectedBook] = useState('null');

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    //make POST request for book data: /library/addBook
    //checks global library first before making API call, for performance

    const handleBookSelect = (book) => {
        console.log(`book: ${book}`)
        fetch('/library/action/findBook', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: book }),
        })
            .then(data => data.json())
            .then(data => {
                setSelectedBook(data);
                setSearchBook('');
            })

    };
    // throw handler here for adding book
    // POST to library/action/addBook

    const handleAddBook = (book) => {
        fetch('/library/action/addBook', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        })
            .then(data => data.json())
            .then(data => updateBooks(data))
            .catch(err => console.log('APP error adding book: ', err))
    }

    const addButtonOnClick = () => {
        handleAddBook(selectedBook);
        // onUpdate(selectedBook);
    }

    const buttonOnClick = () => {
        openModal();
        handleBookSelect(searchBook);
    }

    return (
        <><div> <input
            className='add-search-bar'
            type='text'
            placeholder='Search a book title to add to your library'
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)} /></div><div>
                <button onClick={buttonOnClick}>
                    Search Book
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {selectedBook && (
                        <ul>
                            <img src={selectedBook.previewUrl} className="resized-image"></img>
                            <p>Title: {selectedBook.title}</p>
                            <p>Author: {selectedBook.author}</p>
                            <button onClick={() => {
                                addButtonOnClick();
                                closeModal();
                            }} >
                                Add Book
                            </button>
                        </ul>
                    )}
                </Modal>
            </div></>
    )
}

export default AddBook
