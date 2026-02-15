import { useState, useEffect } from 'react';

interface Property {
  id: string;
  title: string;
  reference: string;
  location: string;
  rooms: number;
  beds: number;
  sqm: number;
  price: string;
  tags: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  properties: Property[];
}

type TabType = 'locations' | 'properties' | 'zones' | 'tags';

const mockSearchResults: Property[] = [
  {
    id: '1',
    title: 'CASTELLO A CASTELFIORENTINO',
    reference: 'ref. 1620897',
    location: 'TOSCANA',
    rooms: 10,
    beds: 5,
    sqm: 300,
    price: '€5.7M',
    tags: ['TOP PROPERTIES', 'CASTLE'],
  },
  {
    id: '2',
    title: 'CASTELLO A CASTELFIORENTINO',
    reference: 'ref. 1620897',
    location: 'TOSCANA',
    rooms: 10,
    beds: 5,
    sqm: 300,
    price: '€5.7M',
    tags: ['TOP PROPERTIES', 'CASTLE'],
  },
  {
    id: '3',
    title: 'CASTELLO A CASTELFIORENTINO',
    reference: 'ref. 1620897',
    location: 'TOSCANA',
    rooms: 10,
    beds: 5,
    sqm: 300,
    price: '€5.7M',
    tags: ['TOP PROPERTIES', 'CASTLE'],
  },
];

export function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('properties');
  const [results] = useState<Property[]>(mockSearchResults);

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

  const handleSearch = () => {
    onSearch(query);
    onClose();
  };

  const tabCounts = {
    locations: 1,
    properties: 2,
    zones: 3,
    tags: 2,
  };

  return (
    <div className="fixed inset-0 bg-white z-50" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div className="bg-white h-full flex flex-col">
        {/* Search Input */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 id="search-modal-title" className="sr-only">Search Properties</h2>
          <div className="flex gap-3 items-center">
            <div className="flex-1 h-[50px] flex items-center px-4 rounded-lg border border-gray-300 bg-white">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Everywhere"
                className="flex-1 font-light text-[16px] text-black placeholder:text-gray-400 outline-none bg-transparent"
                style={{ fontFamily: 'Inter, sans-serif' }}
                autoFocus
                aria-label="Search location"
              />
            </div>
            <button
              onClick={handleSearch}
              className="shrink-0 size-[50px] bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1.5" />
                <path d="M16.5 16.5L21 21" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {(['locations', 'properties', 'zones', 'tags'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 capitalize font-medium text-[14px] border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#b10832] text-black'
                  : 'border-transparent text-gray-500'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
              <span className="text-gray-400">{tabCounts[tab]}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === 'properties' && (
            <div className="space-y-4">
              {results.map((property) => (
                <div
                  key={property.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Tags */}
                  <div className="flex gap-2 mb-2">
                    {property.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#b10832] text-white px-2 py-1 rounded text-xs font-medium uppercase"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-[16px] text-black mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {property.title}
                  </h3>

                  {/* Reference and Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{property.reference}</span>
                    <span>•</span>
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{property.location}</span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-[14px] font-medium">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>{property.rooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
                      </svg>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>{property.sqm}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="font-bold text-[#b10832]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {property.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'properties' && (
            <div className="text-center py-12 text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              No results in this category
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#2b2b2b] text-white rounded-lg hover:bg-black transition-colors font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}