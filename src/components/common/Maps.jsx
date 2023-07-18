import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Maps = ({ latitude, longitude }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      mapContainerClassName='mt-4'
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Maps;
