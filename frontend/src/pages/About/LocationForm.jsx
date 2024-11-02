// LocationForm.js
import React, { useState } from 'react';
import MapSelector from './MapSelector';

const LocationForm = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleLocationSelect = (position) => {
    setLatitude(position.lat);
    setLongitude(position.lng);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Select Location</h1>
      <MapSelector onLocationSelect={handleLocationSelect} />
      <div>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            readOnly
          />
        </label>
      </div>
      <div>
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            readOnly
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocationForm;
