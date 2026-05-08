import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import type { Property } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  properties: readonly Property[];
  onSelectProperty?: (property: Property) => void;
}

const MAX_QUERY_LENGTH = 120;
const normalizeQuery = (value: string) => value.trim().replace(/\s+/g, ' ');

import { useFocusTrap } from '@/hooks/useFocusTrap';

export function SearchModal({ isOpen, onClose, onSearch, properties, onSelectProperty }: SearchModalProps) {
  const focusTrapRef = useFocusTrap(true);
  const [query, setQuery] = useState('');
  useBodyScrollLock(isOpen);
  const normalizedQuery = useMemo(() => normalizeQuery(query), [query]);
  const normalizedQueryLower = normalizedQuery.toLowerCase();

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

  // Filter properties based on query
  const filteredProperties = useMemo(() => {
    if (!normalizedQuery) return properties.slice(0, 6); // Show first 6 when no query
    const q = normalizedQueryLower;
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.propertyType && p.propertyType.toLowerCase().includes(q))
    );
  }, [normalizedQuery, normalizedQueryLower, properties]);

  // Derive unique locations for the locations tab
  const locations = useMemo(() => {
    const locSet = new Map<string, number>();
    properties.forEach((p) => {
      const city = p.location.split(',')[0].trim();
      locSet.set(city, (locSet.get(city) || 0) + 1);
    });
    if (!normalizedQuery) return Array.from(locSet.entries());
    const q = normalizedQueryLower;
    return Array.from(locSet.entries()).filter(([loc]) =>
      loc.toLowerCase().includes(q)
    );
  }, [normalizedQuery, normalizedQueryLower, properties]);

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch(normalizedQuery);
    onClose();
  };

  const handleSelectProperty = (property: Property) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
    onClose();
  };

  const handleLocationClick = (location: string) => {
    onSearch(normalizeQuery(location));
    onClose();
  };

  return (
    <div ref={focusTrapRef} className="fixed inset-0 bg-white" style={{ zIndex: 1200 }} role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div className="bg-white h-full flex flex-col">
        {/* Search Input */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2
              id="search-modal-title"
              className="text-sm font-semibold tracking-wide text-gray-500 uppercase"
             
            >
              Search Properties
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
              style={{ width: '44px', height: '44px' }}
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex items-center px-4 rounded-lg border border-gray-300 bg-white" style={{ height: '50px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.slice(0, MAX_QUERY_LENGTH))}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search location, name, or type..."
                className="flex-1 font-light text-[16px] text-ink placeholder:text-gray-400 outline-none bg-transparent"
                style={{ minHeight: '44px' }}
               
                autoFocus
                aria-label="Search properties"
                maxLength={MAX_QUERY_LENGTH}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
            <span>Press Enter to search or use the button below</span>
            <span>{query.length}/{MAX_QUERY_LENGTH}</span>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {/* Locations Section */}
          {locations.length > 0 && (
            <div className="px-6 py-4 border-b border-gray-100">
              <h3
                className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3"
               
              >
                Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                {locations.slice(0, 8).map(([loc, count]) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationClick(loc)}
                    className="max-w-full px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all"
                    style={{ minHeight: '44px' }}
                   
                  >
                    <span className="inline-block max-w-[170px] truncate align-middle">{loc}</span>
                    <span className="text-gray-400 ml-1">({count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Properties Section */}
          <div className="px-6 py-4">
            <h3
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3"
             
            >
              Properties {query && `(${filteredProperties.length})`}
            </h3>
            {filteredProperties.length > 0 ? (
              <div className="space-y-3">
                {filteredProperties.map((property) => (
                  <button
                    key={property.id}
                    type="button"
                    onClick={() => handleSelectProperty(property)}
                    className="w-full text-left bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-gray-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                  >
                    <div className="flex gap-3 items-start">
                      {/* Thumbnail */}
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {property.featured && (
                            <span
                              className="bg-[var(--brand)] text-white px-1.5 py-0.5 rounded text-[10px] font-medium uppercase"
                             
                            >
                              Featured
                            </span>
                          )}
                          {property.propertyType && (
                            <span
                              className="text-[11px] text-gray-400 uppercase tracking-wide line-clamp-1 max-w-[120px] truncate"
                             
                            >
                              {property.propertyType}
                            </span>
                          )}
                        </div>
                        <h4
                          className="font-semibold text-[15px] text-ink overflow-hidden text-ellipsis whitespace-nowrap"
                         
                        >
                          {property.title}
                        </h4>
                        <p
                          className="text-[13px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
                         
                        >
                          {property.location}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span
                        className="font-bold text-[15px] leading-tight text-[var(--brand)] max-w-[58%] overflow-hidden text-ellipsis whitespace-nowrap"
                       
                      >
                        {property.price}
                      </span>
                      <div className="text-[12px] text-gray-400 text-right shrink-0">
                        {property.beds} bd · {property.baths} ba
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="font-medium text-gray-500">No properties found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
           
          >
            Cancel
          </button>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition-colors font-medium"
           
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
