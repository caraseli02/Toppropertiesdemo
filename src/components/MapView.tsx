import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import React from 'react';

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
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    } else {
      map.setView(center, 13);
    }
  }, [properties, center, map]);

  return null;
}

function MapSizeInvalidator({ viewKey }: { viewKey: string }) {
  const map = useMap();

  useEffect(() => {
    const updateSize = () => map.invalidateSize();
    const rafId = requestAnimationFrame(updateSize);
    const timeoutId = window.setTimeout(updateSize, 180);
    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', updateSize);
    };
  }, [map, viewKey]);

  return null;
}

const formatMarkerPrice = (price: string): string => {
  const numeric = Number.parseFloat(price.replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(numeric)) return price;

  const prefixMatch = price.match(/^[^\d]+/);
  const prefix = prefixMatch ? prefixMatch[0].trim() : '';
  const compactPrice = numeric >= 1_000_000
    ? `${(numeric / 1_000_000).toFixed(1)}M`
    : numeric >= 1_000
      ? `${(numeric / 1_000).toFixed(1)}K`
      : numeric.toString();

  return prefix ? `${prefix} ${compactPrice}` : compactPrice;
};

export const MapView = React.memo<MapViewProps>(function MapView({ properties, onMarkerClick }: MapViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const defaultCenter: [number, number] = [34.0522, -118.2437]; // Default to LA

  // Calculate center based on properties if available
  const center: [number, number] = properties.length > 0
    ? [properties[0].lat, properties[0].lng]
    : defaultCenter;
  const mapViewKey = `${properties.length}:${center[0]}:${center[1]}`;

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0 relative"
      style={{ backgroundColor: 'var(--map-water)' }}
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%', backgroundColor: 'var(--map-water)' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <MapSizeInvalidator viewKey={mapViewKey} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapController center={center} properties={properties} />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
            eventHandlers={{
              click: () => {
                setActiveId(property.id);
                onMarkerClick?.(property.id);
              },
              mouseover: () => setActiveId(property.id),
              mouseout: () => setActiveId(null)
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              {formatMarkerPrice(property.price)}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Zoom Control Placeholder if needed, but we disabled default */}
    </div>
  );
});
