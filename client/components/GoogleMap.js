import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import Book from '../assets/images/Book.png';

function GoogleMap({ selectedBook }) {
  const [position, setPosition] = useState({ lat: 34.0522, lng: -118.2437 });
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const apiKey = 'AIzaSyDOh5A62p9bxdJ0MnHwHhzKO3McjKdAqCA';

  useEffect(() => {
    if (selectedBook && selectedBook.fullAddress) {
      const address = selectedBook.fullAddress;
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
  }, [selectedBook, apiKey]);

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '50vh', width: '70%' }}>
        <Map zoom={9} center={position} mapId={'49e4b9ad955c530'}>
          {selectedBook && (
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
              <p>{selectedBook.title}</p>
              <p>{selectedBook.fullAddress}</p>
              <button>Request book</button>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
