import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapboxMap = ({ trails }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ21hbmVybyIsImEiOiJjbHV1ZmowNGswOWExMmpwbzFwdWhwNXExIn0.qF-ZAnKy-ZFknJ2mADfFXA'; // Replace with your Mapbox access token

    const map = initializeMap();

    addNavigationControl(map);

    displayTrails(map, trails);

    // Cleanup
    return () => map.remove();
  }, [trails]);

  const initializeMap = () => {
    return new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Default center coordinates (New York)
      zoom: 9 // Default zoom level
    });
  };

  const addNavigationControl = (map) => {
    map.addControl(new mapboxgl.NavigationControl());
  };

  const displayTrails = (map, trails) => {
    trails.forEach(trail => {
      const popup = createPopup(trail);
      createMarker(trail, popup).addTo(map);
    });
  };

  const createPopup = (trail) => {
    return new mapboxgl.Popup().setHTML(`<h3>${trail.name}</h3><p>${trail.location}</p>`);
  };

  const createMarker = (trail, popup) => {
    return new mapboxgl.Marker()
      .setLngLat([trail.longitude, trail.latitude]) 
      .setPopup(popup);
  };

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default MapboxMap;
