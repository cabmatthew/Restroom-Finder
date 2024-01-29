import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import iconPath from './Images/marker.png';

const position = [51.505, -0.09]

const customIcon = new L.Icon({
    iconUrl: iconPath,
    iconSize: [32, 32], // Adjust the size according to your icon
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

export default function MyMap() {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Popup 1. <br /> asdf
                </Popup>
            </Marker>
        </MapContainer>
    )
};