import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack/vite
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  locations?: { locationName: string, description: string, latitude: number; longitude: number;  }[];
}

function Map({ center = [40.4168, -3.7038], zoom = 1.5, className = '', locations = [] }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`w-full h-full min-h-[400px] rounded-lg ${className}`}
      style={{ zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker 
          key={index} 
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <strong>{location.locationName}</strong>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
