import { useState } from 'react';
import svgPaths from '../imports/svg-lbcekml827';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  onSearchClick?: () => void;
  value?: string;
}

export function SearchBar({ onSearch, onFilterClick, onSearchClick, value }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(value || '');

  // Sync with parent value if provided
  if (value !== undefined && value !== localQuery && document.activeElement?.tagName !== 'INPUT') {
    setLocalQuery(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchClick) {
      onSearchClick();
    } else {
      onSearch?.(localQuery);
    }
  };

  return (
    <div className="bg-white border-b border-[var(--border-default)]">
      <div className="max-w-3xl mx-auto" style={{ padding: '8px 10px' }}>
        <form onSubmit={handleSubmit} className="flex items-center" style={{ gap: '10px' }}>
          {/* Filters Button */}
          <button
            type="button"
            onClick={onFilterClick}
            className="shrink-0 bg-white flex items-center border border-black border-solid hover:bg-gray-50 transition-colors"
            style={{ height: '44px', gap: '10px', padding: '0 14px', borderRadius: '50px' }}
            aria-label="Filters"
            title="Filters"
          >
            <span className="sr-only">Filters</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p39efcaf0} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-normal text-[16px] text-black whitespace-nowrap hidden sm:inline">
              Filters
            </span>
          </button>

          {/* Search Input */}
          <div
            className="flex-1 flex items-center border border-[var(--border-default)] border-solid cursor-pointer"
            style={{ height: '44px', padding: '7px 9px', borderRadius: '8px' }}
            onClick={onSearchClick}
          >
            <input
              type="text"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                if (!onSearchClick) onSearch?.(e.target.value);
              }}
              placeholder="Everywhere"
              className="flex-1 font-light text-[16px] text-black placeholder:text-[var(--text-secondary)] outline-none bg-transparent cursor-pointer"
             
              readOnly={!!onSearchClick}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="shrink-0 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
            style={{ width: '44px', height: '44px' }}
            aria-label="Open search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="0.75" />
              <path d="M16.5 16.5L21 21" stroke="white" strokeLinecap="round" strokeWidth="0.75" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
