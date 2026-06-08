import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Fix for default marker icon issues in Leaflet with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface PropertyMarker {
  id: string;
  lat: number;
  lng: number;
  price: string;
  title: string;
  location: string;
}

interface MapViewProps {
  properties: PropertyMarker[];
  onMarkerClick?: (id: string) => void;
}

function MapController({
  properties,
  center,
}: {
  properties: PropertyMarker[];
  center: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng]));
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
    window.addEventListener("resize", updateSize);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", updateSize);
    };
  }, [map, viewKey]);

  return null;
}

const propertyMarkerIcon = L.divIcon({
  className: "topproperties-map-marker",
  html: '<div style="width:44px;height:44px;border-radius:9999px;background:rgba(177,8,50,0.16);display:flex;align-items:center;justify-content:center;"><div style="width:18px;height:18px;border-radius:9999px;background:var(--brand);border:2px solid white;box-shadow:0 6px 18px rgba(0,0,0,0.24);"></div></div>',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const formatMarkerPrice = (price: string): string => {
  const numeric = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) return price;

  const prefixMatch = price.match(/^[^\d]+/);
  const prefix = prefixMatch ? prefixMatch[0].trim() : "";
  const compactPrice =
    numeric >= 1_000_000
      ? `${(numeric / 1_000_000).toFixed(1)}M`
      : numeric >= 1_000
        ? `${(numeric / 1_000).toFixed(1)}K`
        : numeric.toString();

  return prefix ? `${prefix} ${compactPrice}` : compactPrice;
};

export const MapView = React.memo<MapViewProps>(function MapView({
  properties,
  onMarkerClick,
}: MapViewProps) {
  const [activeId, setActiveId] = useState<string | null>(properties[0]?.id ?? null);
  const defaultCenter: [number, number] = [34.0522, -118.2437]; // Default to LA
  const activeProperty = properties.find((property) => property.id === activeId) ?? properties[0];

  // Calculate center based on properties if available
  const center: [number, number] =
    properties.length > 0 ? [properties[0].lat, properties[0].lng] : defaultCenter;
  const mapViewKey = `${properties.length}:${center[0]}:${center[1]}`;

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-[var(--border-default)] z-0 relative"
      style={{ backgroundColor: "var(--map-water)" }}
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%", backgroundColor: "var(--map-water)" }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
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
            icon={propertyMarkerIcon}
            title={`View ${property.title} on map`}
            alt={`View ${property.title} on map`}
            eventHandlers={{
              click: () => {
                setActiveId(property.id);
                onMarkerClick?.(property.id);
              },
              mouseover: () => setActiveId(property.id),
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              {formatMarkerPrice(property.price)}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {activeProperty && (
        <Card
          className="absolute bottom-4 left-4 right-4 z-[500] border-border/70 bg-background/95 p-0 shadow-2xl backdrop-blur-sm sm:left-5 sm:right-auto sm:w-[320px]"
        >
          <CardContent className="p-4">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Map selection
            </span>
            <h3 className="font-serif text-xl text-foreground">{activeProperty.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{activeProperty.location}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full bg-burgundy px-3 py-1 text-sm font-semibold text-white">
                {formatMarkerPrice(activeProperty.price)}
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onMarkerClick?.(activeProperty.id)}
                className="shrink-0"
              >
                View listing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
});
