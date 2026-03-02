import { useEffect, useState } from 'react';
import { Menu, User, Heart, X } from 'lucide-react';

interface HeaderProps {
  onNavigateToMap?: () => void;
  onNavigateToProperties?: () => void;
  forceMenuOpen?: boolean;
}

function MobileMenu({
  isOpen,
  onClose,
  onNavigateToMap,
  onNavigateToProperties,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMap?: () => void;
  onNavigateToProperties?: () => void;
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
      disabled: true,
    },
    {
      label: 'Contact Us',
      disabled: true,
    },
    {
      label: 'About',
      disabled: true,
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
              disabled={item.disabled}
              aria-disabled={item.disabled ? 'true' : undefined}
              onClick={() => {
                if (item.disabled) return;
                item.action?.();
                onClose();
              }}
              className={`w-full text-left px-6 py-3 text-[15px] transition-colors flex items-center justify-between gap-3 ${item.disabled
                ? 'text-gray-400 cursor-not-allowed opacity-60 grayscale'
                : 'text-gray-700 hover:bg-gray-50 hover:text-[#b10832]'
                }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>{item.label}</span>
              {item.disabled && (
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

export function Header({ onNavigateToMap, onNavigateToProperties, forceMenuOpen = false }: HeaderProps) {
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
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B20933' }}>
                  <span className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>TP</span>
                </div>
                <span className="font-bold text-lg text-black hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif' }}>Top Properties</span>
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
                type="button"
                disabled
                aria-disabled="true"
                title="Favorites (coming soon)"
                className="flex items-center justify-center rounded-full opacity-45 cursor-not-allowed"
                style={{ width: '44px', height: '44px' }}
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 text-black fill-black" />
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="User profile (coming soon)"
                className="flex items-center justify-center rounded-full opacity-45 cursor-not-allowed"
                style={{ width: '44px', height: '44px' }}
                aria-label="User profile"
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
      />
    </>
  );
}
