import { X, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FilterState {
  rentType: 'short' | 'long' | 'sale';
  priceRange: [number, number];
  showTrattativa: boolean;
  propertyTypes: string[];
  rooms: number;
  beds: number;
  sqm: [number, number];
  tags: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const propertyTypesList = ['Loft', 'Villa', 'Attico', 'Rustico'];
const tagsList = ['Luxury Houses', 'Top Properties', 'Castle', 'Sea View'];

export function FilterModal({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      rentType: 'long',
      priceRange: [0, 10000],
      showTrattativa: false,
      propertyTypes: [],
      rooms: 0,
      beds: 0,
      sqm: [0, 500],
      tags: [],
    }
  );

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      rentType: 'long',
      priceRange: [0, 10000],
      showTrattativa: false,
      propertyTypes: [],
      rooms: 0,
      beds: 0,
      sqm: [0, 500],
      tags: [],
    });
  };

  const togglePropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
    >
      <div className="bg-[#f5f5f5] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 z-10">
          <h2 id="filter-modal-title" className="text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Rent Type Tabs */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilters(prev => ({ ...prev, rentType: 'short' }))}
              className={`flex-1 px-6 py-3 rounded-full border-2 transition-all font-medium ${
                filters.rentType === 'short'
                  ? 'bg-[#b10832] text-white border-[#b10832]'
                  : 'bg-white text-black border-black'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Short Rent
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, rentType: 'long' }))}
              className={`flex-1 px-6 py-3 rounded-full border-2 transition-all font-medium ${
                filters.rentType === 'long'
                  ? 'bg-[#b10832] text-white border-[#b10832]'
                  : 'bg-white text-black border-black'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Long Rent
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, rentType: 'sale' }))}
              className={`flex-1 px-6 py-3 rounded-full border-2 transition-all font-medium ${
                filters.rentType === 'sale'
                  ? 'bg-[#b10832] text-white border-[#b10832]'
                  : 'bg-white text-black border-black'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sale
            </button>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Price range
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                  }))
                }
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#b10832]"
                style={{
                  background: `linear-gradient(to right, #b10832 0%, #b10832 ${(filters.priceRange[1] / 10000) * 100}%, #d1d5db ${(filters.priceRange[1] / 10000) * 100}%, #d1d5db 100%)`
                }}
              />
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white rounded-lg border border-gray-300 p-3">
                  <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Min price
                  </div>
                  <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ${filters.priceRange[0]}
                  </div>
                </div>
                <span className="text-gray-400">—</span>
                <div className="flex-1 bg-white rounded-lg border border-gray-300 p-3">
                  <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Max price
                  </div>
                  <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ${filters.priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Show Trattativa */}
          <div className="flex items-center justify-between bg-white rounded-lg p-4">
            <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Show Trattativa Riservata
            </span>
            <button
              onClick={() => setFilters(prev => ({ ...prev, showTrattativa: !prev.showTrattativa }))}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                filters.showTrattativa ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  filters.showTrattativa ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Property type
            </h3>
            <div className="flex flex-wrap gap-3">
              {propertyTypesList.map((type) => (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    filters.propertyTypes.includes(type)
                      ? 'bg-[#b10832] text-white'
                      : 'bg-white text-black border border-gray-300'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms and Beds */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Rooms and Beds
            </h3>
            <div className="space-y-4 bg-white rounded-lg p-4">
              {/* Rooms */}
              <div className="flex items-center justify-between">
                <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Rooms</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, rooms: Math.max(0, prev.rooms - 1) }))}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold w-8 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {filters.rooms}
                  </span>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* mq (Square meters) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>mq</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={filters.sqm[1]}
                  onChange={(e) =>
                    setFilters(prev => ({
                      ...prev,
                      sqm: [prev.sqm[0], parseInt(e.target.value)],
                    }))
                  }
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#b10832]"
                  style={{
                    background: `linear-gradient(to right, #b10832 0%, #b10832 ${(filters.sqm[1] / 500) * 100}%, #d1d5db ${(filters.sqm[1] / 500) * 100}%, #d1d5db 100%)`
                  }}
                />
              </div>

              {/* Beds */}
              <div className="flex items-center justify-between">
                <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Beds</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, beds: Math.max(0, prev.beds - 1) }))}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold w-8 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {filters.beds}
                  </span>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, beds: prev.beds + 1 }))}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Tags
            </h3>
            <div className="space-y-3 bg-white rounded-lg p-4">
              {tagsList.map((tag) => (
                <label key={tag} className="flex items-center justify-between cursor-pointer group">
                  <span className="font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {tag}
                  </span>
                  <button
                    onClick={() => toggleTag(tag)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      filters.tags.includes(tag) ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                        filters.tags.includes(tag) ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 flex items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Cancel Filters
          </button>
          <button
            onClick={handleApply}
            className="px-8 py-3 bg-[#2b2b2b] text-white rounded-lg hover:bg-black transition-colors font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Results
          </button>
        </div>
      </div>
    </div>
  );
}