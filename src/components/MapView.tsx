import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

// Fix for default marker icon issues in Leaflet with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMarker {
  id: string;
  lat: number;
  lng: number;
  price: string;
  title: string;
}

interface MapViewProps {
  properties: PropertyMarker[];
  onMarkerClick?: (id: string) => void;
}

function MapController({ properties, center }: { properties: PropertyMarker[], center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(center, 13);
    }
  }, [properties, center, map]);

  return null;
}

// Simple HTML escape to prevent XSS
const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

export function MapView({ properties, onMarkerClick }: MapViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const defaultCenter: [number, number] = [34.0522, -118.2437]; // Default to LA

  // Calculate center based on properties if available
  const center: [number, number] = properties.length > 0
    ? [properties[0].lat, properties[0].lng]
    : defaultCenter;

  const createCustomIcon = (price: string, isActive: boolean) => {
    return L.divIcon({
      className: 'custom-price-marker',
      html: `<div class="price-pill ${isActive ? 'active' : ''}">${escapeHtml(price)}</div>`,
      iconSize: [60, 30],
      iconAnchor: [30, 30] // Centered
    });
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0 relative">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapController center={center} properties={properties} />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
            icon={createCustomIcon(property.price, activeId === property.id)}
            eventHandlers={{
              click: () => {
                setActiveId(property.id);
                onMarkerClick?.(property.id);
              },
              mouseover: () => setActiveId(property.id),
              mouseout: () => setActiveId(null)
            }}
          />
        ))}
      </MapContainer>

      {/* Zoom Control Placeholder if needed, but we disabled default */}
    </div>
  );
}
