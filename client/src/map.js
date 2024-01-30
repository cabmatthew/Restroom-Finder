import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
            <Popup>Popup 1. <br /> asdf</Popup>
          </Marker> */}
          {listOfCoordinates.map((coordinate, index) => (
            <Marker key={index} position={[coordinate.latitude, coordinate.longitude]} icon={customIcon}>
              <Popup>Latitude: {coordinate.latitude} <br />Longitude: {coordinate.longitude}</Popup>
            </Marker>
          ))}
        </MapContainer>
      );
};