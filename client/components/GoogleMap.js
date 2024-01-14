import React from 'react';
import {
  APIProvider,
  Map,
  AdvanceMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

function GoogleMap({ selectedBook }) {
  const position = { lat: 53.54, lng: 10 };
  return (
    <APIProvider apiKey={'AIzaSyDOh5A62p9bxdJ0MnHwHhzKO3McjKdAqCA'}>
      <div style={{ height: '50vh', width: '70%' }}>
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
