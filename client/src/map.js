import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import iconPath from './Images/marker.png';

import { useState, useEffect } from "react";
import Axios from "axios";

// const position = [51.505, -0.09]

const customIcon = new L.Icon({
    iconUrl: iconPath,
    iconSize: [32, 32], // Adjust the size according to your icon
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      // Create a custom icon
      const customIcon = new L.Icon({
        iconUrl: iconPath, // replace with the path to your custom icon image
        iconSize: [32, 32], // set the size of the icon
        iconAnchor: [16, 32], // set the anchor point of the icon
        popupAnchor: [0, -32], // set the anchor point for the popup
      });

      // Set marker on the map where clicked with the custom icon and text "test"
      const marker = new L.marker(e.latlng, { icon: customIcon }).addTo(map);
      marker.bindPopup("Test").openPopup();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
  

export default function MyMap() {

    const [listOfCoordinates, setListOfCoordinates] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getCoordinates").then((response) => {
            setListOfCoordinates(response.data);
        });
    }, []);

    // const createCoordinate = () => {}

    // Wait for coordinates to be fetched before rendering the map
    if (listOfCoordinates.length === 0) {
        return null; // or loading indicator
    }

    return (
        <div>
          <MapContainer center={[41.99464925894135, -87.6575116876069]} zoom={13} style={{ height: "65vh", width: "80vw" }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
              <Popup>Popup 1. <br /> asdf</Popup>
            </Marker> */}
            {listOfCoordinates.map((coordinate, index) => (
              <Marker key={index} position={[coordinate.latitude, coordinate.longitude]} icon={customIcon}>
                <Popup>
                  {/* Latitude: {coordinate.latitude} <br />
                  Longitude: {coordinate.longitude} <br /> */}
                  <strong>{coordinate.info}</strong> <br />
                  {coordinate.access}
                </Popup>
              </Marker>
            ))}
            <LocationMarker />
          </MapContainer>
        </div>
      );
};