import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pencilSvg from './assets/pen.png'; // SVG for the pencil
import startMarkerSvg from './assets/start-marker.png'; // SVG for the start marker
import endMarkerSvg from './assets/end-marker.png'; // SVG for the end marker

const MapUpdater = ({ onZoomChange }) => {
  const map = useMap();
  useEffect(() => {
    const handleZoom = () => onZoomChange(map.getZoom());
    map.on('zoomend', handleZoom);
    map.invalidateSize();
    return () => map.off('zoomend', handleZoom);
  }, [map, onZoomChange]);

  return null;
};

const CustomMap = ({ startCoords, endCoords, speed, isPlaying, setIsPlaying, onMapReady }) => {
  const [pencilPosition, setPencilPosition] = useState(startCoords);
  const [intervalId, setIntervalId] = useState(null);

  let s= window.innerWidth <= 768 ? 10 : 11;

  const [zoomLevel, setZoomLevel] = useState(s); // Default zoom level
  const [rotation, setRotation] = useState(0); // Rotation angle in degrees

  useEffect(() => {
    if (isPlaying) {

      const distance = L.latLng(startCoords).distanceTo(endCoords); // in meters

      // Speed in meters per second
      const speedMetersPerSecond = (speed * 1000) / 3600;


      // Calculate interval duration based on speed and map scale
      const intervalDuration = Math.max(100,(distance / speedMetersPerSecond)) /30; // Ensure a minimum interval duration

      

      let currentPosition = L.latLng(startCoords);

            // Calculate the angle of rotation
            const angle = Math.atan2(endCoords[1] - startCoords[1], endCoords[0] - startCoords[0]) * (180 / Math.PI);
            setRotation(angle);
      
      

      const interval = setInterval(() => {
        const latStep = (endCoords[0] - startCoords[0]) * 0.01;
        const lngStep = (endCoords[1] - startCoords[1]) * 0.01;
        const newLat = currentPosition.lat + latStep;
        const newLng = currentPosition.lng + lngStep;
        setPencilPosition([newLat, newLng]);
        currentPosition = L.latLng(newLat, newLng);
        if (L.latLng(newLat, newLng).distanceTo(endCoords) < 0.01) { // Close enough to end position
          clearInterval(interval);
          setIntervalId(null);
        }
      }, intervalDuration);

      setIntervalId(interval);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isPlaying, speed, startCoords, endCoords, zoomLevel]);


  const rotatedIcon = L.divIcon({
    className: 'rotated-icon',
    html: `<img src="${pencilSvg}" style="transform: rotate(${rotation}deg); width: 10px; height: 50px;" />`,
    iconSize: [10, 50],
  });

  return (
    <MapContainer center={startCoords} zoom={zoomLevel} style={{ height: "100%", width: "100%" }} whenReady={onMapReady}>
      <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

      <MapUpdater onZoomChange={setZoomLevel} />
      <Marker position={startCoords} icon={L.icon({ iconUrl: startMarkerSvg, iconSize: [32, 32] })}>
        <Popup>Start Position</Popup>
      </Marker>
      <Marker position={endCoords} icon={L.icon({ iconUrl: endMarkerSvg, iconSize: [32, 32] })}>
        <Popup>End Position</Popup>
      </Marker>
      <Marker position={pencilPosition} icon={rotatedIcon}>
        <Popup>Pointer Position</Popup>
      </Marker>
    </MapContainer>
  );
};

const MapComponent = ({ startCoords, endCoords, speed, isPlaying, setIsPlaying }) => {
  const [mapReady, setMapReady] = useState(false);

  return (
    <CustomMap
      startCoords={startCoords}
      endCoords={endCoords}
      speed={speed}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      onMapReady={() => setMapReady(true)}
    />
  );
};

export default MapComponent;
