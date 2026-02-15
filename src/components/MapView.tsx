import { MapPin, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

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

export function MapView({ properties, onMarkerClick }: MapViewProps) {
  const [zoom, setZoom] = useState(1);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
      {/* Decorative map grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-400" />
          ))}
        </div>
      </div>

      {/* Map decorative elements */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="map-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 Q25 25 50 50 T100 50" stroke="#93c5fd" strokeWidth="1" fill="none" />
            <circle cx="20" cy="30" r="2" fill="#3b82f6" />
            <circle cx="80" cy="70" r="2" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-pattern)" />
      </svg>

      {/* Map regions */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 bg-blue-100/30 rounded-full blur-3xl w-64 h-64" />
        <div className="absolute bottom-10 right-10 bg-purple-100/30 rounded-full blur-3xl w-48 h-48" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-100/20 rounded-full blur-2xl w-80 h-80" />
      </div>

      {/* Map labels */}
      <div className="absolute inset-0">
        <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
            Luxury Properties Map
          </p>
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            {properties.length} locations
          </p>
        </div>

        {/* Legend */}
        <div className="absolute top-6 right-6 bg-white px-4 py-3 rounded-lg shadow-md space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#b10832] rounded-full" />
            <span className="text-xs text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              Featured
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full" />
            <span className="text-xs text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              Standard
            </span>
          </div>
        </div>
        
        {/* Property markers */}
        {properties.map((property, index) => {
          const isFeatured = index % 3 === 0;
          const markerColor = isFeatured ? '#b10832' : '#4b5563';
          
          return (
            <button
              key={property.id}
              onClick={() => onMarkerClick?.(property.id)}
              onMouseEnter={() => setHoveredMarker(property.id)}
              onMouseLeave={() => setHoveredMarker(null)}
              className="absolute group"
              style={{
                top: `${15 + (index * 12) % 65}%`,
                left: `${10 + (index * 18) % 75}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              {/* Marker pin */}
              <div className="relative">
                <div
                  className="p-3 rounded-full shadow-xl hover:scale-125 transition-all duration-300 relative z-10"
                  style={{ backgroundColor: markerColor }}
                >
                  <MapPin className="w-5 h-5 text-white" fill="white" />
                </div>
                
                {/* Pulse animation */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: markerColor }}
                />
                
                {/* Ripple effect */}
                <div 
                  className="absolute inset-[-4px] rounded-full border-2 opacity-50"
                  style={{ borderColor: markerColor }}
                />

                {/* Price tooltip - always visible */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap transition-all duration-200 ${
                    hoveredMarker === property.id ? 'opacity-100 -translate-y-2' : 'opacity-0'
                  }`}
                >
                  <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-gray-200">
                    <p className="text-xs font-semibold text-[#b10832] mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {property.price}
                    </p>
                    <p className="text-xs text-gray-600 max-w-[150px] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {property.title}
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white" />
                </div>

                {/* Price badge - simplified always visible version */}
                {hoveredMarker !== property.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-10">
                    <div className="bg-white px-2 py-1 rounded shadow-md border border-gray-200">
                      <p className="text-xs font-bold text-[#b10832] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {property.price}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Connection line to ground */}
              <div 
                className="absolute left-1/2 top-full w-0.5 h-8 -translate-x-1/2 opacity-20"
                style={{ backgroundColor: markerColor }}
              />
            </button>
          );
        })}
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 shadow-lg">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
          className="bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-md"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          className="bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-md"
        >
          <Minus className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Map info footer */}
      <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-lg shadow-md">
        <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span className="font-semibold text-gray-800">{properties.length}</span> properties available
        </p>
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
          Zoom: {zoom.toFixed(1)}x
        </p>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
        Interactive Property Map
      </div>
    </div>
  );
}
