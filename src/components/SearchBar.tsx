import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
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
    <div className="bg-white border-b border-[#e5e7eb]">
      <div className="px-[10px] py-[8px] max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-[10px] items-start">
          {/* Search Input */}
          <div
            className="flex-1 h-[42px] flex items-center px-[9px] py-[7px] rounded-[8px] border border-[#e5e7eb] border-solid cursor-pointer"
            onClick={onSearchClick}
          >
            <input
              type="text"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                if (!onSearchClick) onSearch?.(e.target.value); // Real-time search if not clicking modal
              }}
              placeholder="Everywhere"
              className="flex-1 font-light text-[16px] text-black placeholder:text-[#868686] outline-none bg-transparent cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
              readOnly={!!onSearchClick}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="shrink-0 size-[42px] bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="0.75" />
              <path d="M16.5 16.5L21 21" stroke="white" strokeLinecap="round" strokeWidth="0.75" />
            </svg>
          </button>
        </form>

        {/* Filters Button */}
        <button
          type="button"
          onClick={onFilterClick}
          className="mt-[8px] bg-white flex items-center gap-[10px] px-[17px] py-[10px] rounded-[50px] border border-black border-solid hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d={svgPaths.p39efcaf0} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-normal text-[16px] text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
            Filters
          </span>
        </button>
      </div>
    </div>
  );
}
