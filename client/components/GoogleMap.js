import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import Book from '../assets/images/Book.png';

function GoogleMap({bookAddress, handleRequestBook, reqUsername }) {
  const [position, setPosition] = useState({ lat: 34.0522, lng: -118.2437 });
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const apiKey = 'AIzaSyDOh5A62p9bxdJ0MnHwHhzKO3McjKdAqCA';

  useEffect(() => {
    if (bookAddress && bookAddress.address) {
      const address = bookAddress.address;
      console.log(address);
      // make API call to conver string adress to coordinates.
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;
      fetch(geocodingApiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setPosition({ lat: location.lat, lng: location.lng });
          }
        })
        .catch((error) =>
          console.error('Error fetching geocoding data', error)
        );
    }
  }, [bookAddress, apiKey]);

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '70vh', width: '70%' }}>
        <Map zoom={9} center={position} mapId={'49e4b9ad955c530'}>
          {bookAddress && (
            <AdvancedMarker
              position={position}
              onClick={() => setOpenInfoWindow(true)}
            ></AdvancedMarker>
          )}
          {openInfoWindow && (
            <InfoWindow
              position={position}
              onCloseClick={() => setOpenInfoWindow(false)}
            >
              {
                <React.Fragment key={bookAddress._id}>
                  <p>{bookAddress.books.book.title}</p>
                  <p>{bookAddress.address}</p>
                  <button
                    className='request-book-button'
                    onClick={() => {
                      handleRequestBook(bookAddress.books.book, reqUsername, bookAddress.username);
                      window.confirm(
                        'Your request has been submitted. Go to the Requests page to check the status.'
                      );
                    }}
                    // onClick={() => handleRequestBook(null, 'testusername1', 'testusername2')}
                  >
                    Request book
                  </button>
                </React.Fragment>
              }
              {/* {bookAddress.map((bookEntry) => {
                if (bookEntry.books.book.title === selectedBook.title) {
                  return (
                    <React.Fragment key={bookEntry._id}>
                      <p>{bookEntry.books.book.title}</p>
                      <p>{bookEntry.address}</p>
                      <button className='request-book-button'>
                        Request book
                      </button>
                    </React.Fragment>
                  );
                }
                return null; // If the titles don't match, return null
              })} */}
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
