import { useEffect, useState } from 'react';
import { Menu, User, Heart, X } from 'lucide-react';

interface HeaderProps {
  onNavigateToMap?: () => void;
  onNavigateToProperties?: () => void;
  forceMenuOpen?: boolean;
  onComingSoon?: (feature: string) => void;
}

function MobileMenu({
  isOpen,
  onClose,
  onNavigateToMap,
  onNavigateToProperties,
  onComingSoon,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMap?: () => void;
  onNavigateToProperties?: () => void;
  onComingSoon?: (feature: string) => void;
}) {
  if (!isOpen) return null;

  const menuItems = [
    {
      label: 'Properties',
      action: () => onNavigateToProperties?.(),
    },
    {
      label: 'Map View',
      action: () => onNavigateToMap?.(),
    },
    {
      label: 'Favorites',
      action: () => onComingSoon?.('Favorites'),
      comingSoon: true,
    },
    {
      label: 'Contact Us',
      action: () => onComingSoon?.('Contact Us'),
      comingSoon: true,
    },
    {
      label: 'About',
      action: () => onComingSoon?.('About'),
      comingSoon: true,
    },
  ];

  return (
    <div className="fixed inset-0" style={{ zIndex: 1200 }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-slide-in-left flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <span className="font-semibold text-lg text-black" style={{ fontFamily: 'Inter, sans-serif' }}>Menu</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10832]/30"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.action?.();
                onClose();
              }}
              className={`w-full text-left px-6 py-3 text-[15px] transition-colors flex items-center justify-between gap-3 ${item.comingSoon
                ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-[#b10832]'
                }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>{item.label}</span>
              {item.comingSoon && (
                <span className="text-[11px] uppercase tracking-wider text-gray-400">
                  Demo
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 Top Properties
          </p>
        </div>
      </div>
    </div>
  );
}

export function Header({ onNavigateToMap, onNavigateToProperties, forceMenuOpen = false, onComingSoon }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (forceMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [forceMenuOpen]);

  return (
    <>
      <header className="bg-white border-b border-[#e5e7eb]">
        <div style={{ padding: '10px' }}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center" aria-label="Top Properties - Home">
              <div className="flex items-center gap-2.5">
                {/* Modern geometric logo */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {/* Outer circle */}
                  <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#B20933', opacity: 0.1 }}></div>
                  {/* Inner geometric shape - modern building/property icon */}
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Left building */}
                    <rect x="4" y="8" width="6" height="12" fill="#B20933" rx="0.5" />
                    {/* Right building - taller */}
                    <rect x="14" y="4" width="6" height="16" fill="#B20933" rx="0.5" />
                    {/* Windows left building */}
                    <rect x="5" y="9" width="1.5" height="1.5" fill="white" />
                    <rect x="5" y="12" width="1.5" height="1.5" fill="white" />
                    <rect x="5" y="15" width="1.5" height="1.5" fill="white" />
                    <rect x="8" y="9" width="1.5" height="1.5" fill="white" />
                    <rect x="8" y="12" width="1.5" height="1.5" fill="white" />
                    <rect x="8" y="15" width="1.5" height="1.5" fill="white" />
                    {/* Windows right building */}
                    <rect x="15" y="5" width="1.5" height="1.5" fill="white" />
                    <rect x="15" y="8" width="1.5" height="1.5" fill="white" />
                    <rect x="15" y="11" width="1.5" height="1.5" fill="white" />
                    <rect x="15" y="14" width="1.5" height="1.5" fill="white" />
                    <rect x="18" y="5" width="1.5" height="1.5" fill="white" />
                    <rect x="18" y="8" width="1.5" height="1.5" fill="white" />
                    <rect x="18" y="11" width="1.5" height="1.5" fill="white" />
                    <rect x="18" y="14" width="1.5" height="1.5" fill="white" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-black hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>Top Properties</span>
                  <span className="text-xs text-gray-500 hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif', marginTop: '-2px' }}>Luxury Real Estate</span>
                </div>
              </div>
            </a>

            {/* Navigation Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10832]/30"
                style={{ width: '44px', height: '44px' }}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-black" strokeWidth={1.875} />
              </button>
              <button
                title="Favorites (coming soon)"
                className="flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10832]/30"
                style={{ width: '44px', height: '44px' }}
                aria-label="Favorites"
                onClick={() => onComingSoon?.('Favorites')}
              >
                <Heart className="w-5 h-5 text-black fill-black" />
              </button>
              <button
                title="User profile (coming soon)"
                className="flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10832]/30"
                style={{ width: '44px', height: '44px' }}
                aria-label="User profile"
                onClick={() => onComingSoon?.('User profile')}
              >
                <User className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProperties={onNavigateToProperties}
        onComingSoon={onComingSoon}
      />
    </>
  );
}
