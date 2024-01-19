
import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import Book from '../assets/images/Book.png';

function GoogleMap({ books }) {
  const [positions, setPositions] = useState([]);
  const [openInfoWindows, setOpenInfoWindows] = useState({});
  const apiKey = 'AIzaSyDOh5A62p9bxdJ0MnHwHhzKO3McjKdAqCA';

  useEffect(() => {
    const newPositions = [];
    const newInfoWindows = {};

    books.forEach((book, index) => {
      if (book.address) {
        const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          book.address
        )}&key=${apiKey}`;

        fetch(geocodingApiUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.results && data.results.length > 0) {
              const location = data.results[0].geometry.location;
              newPositions.push({ lat: location.lat, lng: location.lng })
              newInfoWindows[index] = false;
              // setPosition({ lat: location.lat, lng: location.lng });
            }
            if (newPositions.length === books.length) {
              setPositions(newPositions);
              setOpenInfoWindows(newInfoWindows);
            }
          })
          .catch((error) =>
            console.error('Error fetching geocoding data', error)
          );
      }
    })
    // if (selectedBook && selectedBook.address) {
      
      // const address = selectedBook.address;
      // make API call to conver string adress to coordinates.
    // }
  }, [books, apiKey]);

  const handleMarkerClick = (index) => {
    setOpenInfoWindows({ ...openInfoWindows, [index]: true });
  };
  
  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '50vh', width: '50%' }}>
        <Map zoom={9} center={positions[0] || { lat: 34.0522, lng: -118.2437 }} mapId={'49e4b9ad955c530'}>
          {positions.map((position, index) => (
            <React.Fragment key={index}>
              <AdvancedMarker
                position={position}
                onClick={() => handleMarkerClick(index)}
              />
              {openInfoWindows[index] && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpenInfoWindows({ ...openInfoWindows, [index]: false })}
                >
                  <p>{books[index].title}</p>
                  <p>{books[index].address}</p>
                  <button>Request book</button>
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
