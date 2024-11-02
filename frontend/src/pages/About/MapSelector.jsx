// MapSelector.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MapSelector = ({ onLocationSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setSelectedPosition({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 37.7749, lng: -122.4194 }} // Default center (San Francisco)
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedPosition && (
          <Marker position={selectedPosition} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapSelector;
