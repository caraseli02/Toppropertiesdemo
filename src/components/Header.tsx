import { useState } from 'react';
import { Menu, User, Heart, X } from 'lucide-react';
import svgPaths from '../imports/svg-lbcekml827';

interface HeaderProps {
  onNavigateToMap?: () => void;
  onNavigateToProperties?: () => void;
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
                ? 'text-gray-400 cursor-not-allowed'
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

export function Header({ onNavigateToMap, onNavigateToProperties }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-[#e5e7eb]">
        <div style={{ padding: '10px' }}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div data-name="logoSA 1" style={{ height: '49.091px', width: '193.766px' }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193.766 49.0909">
                  <g id="logoSA 1">
                    <path d={svgPaths.p389b9f00} fill="var(--fill-0, #B20933)" id="path22" />
                    <g id="g44">
                      <path d={svgPaths.p2e44d080} fill="var(--fill-0, #B20933)" id="path24" />
                      <path d={svgPaths.p1ab49a80} fill="var(--fill-0, #B20933)" id="path26" />
                      <path d={svgPaths.p37944180} fill="var(--fill-0, #B20933)" id="path28" />
                      <path d={svgPaths.p9d20e00} fill="var(--fill-0, #B20933)" id="path30" />
                      <path d={svgPaths.p3a2fa180} fill="var(--fill-0, #B20933)" id="path32" />
                      <path d={svgPaths.p16a78d00} fill="var(--fill-0, #B20933)" id="path34" />
                      <path d={svgPaths.p2b1c5000} fill="var(--fill-0, #B20933)" id="path36" />
                      <path d={svgPaths.p38c37000} fill="var(--fill-0, #B20933)" id="path38" />
                      <path d={svgPaths.p34a991f0} fill="var(--fill-0, #B20933)" id="path40" />
                      <path d={svgPaths.p2bb04800} fill="var(--fill-0, #B20933)" id="path42" />
                    </g>
                    <path d={svgPaths.p20b84580} fill="var(--fill-0, #B20933)" id="path46" />
                    <path d={svgPaths.p31acb680} fill="var(--fill-0, #B20933)" id="path48" />
                    <g id="g74">
                      <path d={svgPaths.p2289de80} fill="var(--fill-0, #3C3C3B)" id="path50" />
                      <path d={svgPaths.p1a42c9c0} fill="var(--fill-0, #3C3C3B)" id="path52" />
                      <path d={svgPaths.p30ba1d80} fill="var(--fill-0, #3C3C3B)" id="path54" />
                      <path d={svgPaths.p5719200} fill="var(--fill-0, #3C3C3B)" id="path56" />
                      <path d={svgPaths.p3eb0dc0} fill="var(--fill-0, #3C3C3B)" id="path58" />
                      <path d={svgPaths.p242aa9f0} fill="var(--fill-0, #3C3C3B)" id="path60" />
                      <path d={svgPaths.p24129400} fill="var(--fill-0, #3C3C3B)" id="path62" />
                      <path d={svgPaths.p20f17600} fill="var(--fill-0, #3C3C3B)" id="path64" />
                      <path d={svgPaths.p2c8cb600} fill="var(--fill-0, #3C3C3B)" id="path66" />
                      <path d={svgPaths.p1a6a1ac0} fill="var(--fill-0, #3C3C3B)" id="path68" />
                      <path d={svgPaths.pa5ddc40} fill="var(--fill-0, #3C3C3B)" id="path70" />
                      <path d={svgPaths.p2793eb80} fill="var(--fill-0, #3C3C3B)" id="path72" />
                    </g>
                    <g id="g102">
                      <path d={svgPaths.p2010cc00} fill="var(--fill-0, #3C3C3B)" id="path76" />
                      <path d={svgPaths.p15812700} fill="var(--fill-0, #3C3C3B)" id="path78" />
                      <path d={svgPaths.pd414c20} fill="var(--fill-0, #3C3C3B)" id="path80" />
                      <path d={svgPaths.pee78a00} fill="var(--fill-0, #3C3C3B)" id="path82" />
                      <path d={svgPaths.p322202c0} fill="var(--fill-0, #3C3C3B)" id="path84" />
                      <path d={svgPaths.p2b237000} fill="var(--fill-0, #3C3C3B)" id="path86" />
                      <path d={svgPaths.p37a37f80} fill="var(--fill-0, #3C3C3B)" id="path88" />
                      <path d={svgPaths.pac4b080} fill="var(--fill-0, #3C3C3B)" id="path90" />
                      <path d={svgPaths.p23c4a200} fill="var(--fill-0, #3C3C3B)" id="path92" />
                      <path d={svgPaths.p1997f00} fill="var(--fill-0, #3C3C3B)" id="path94" />
                      <path d={svgPaths.p2c694d00} fill="var(--fill-0, #3C3C3B)" id="path96" />
                      <path d={svgPaths.p70e1cf0} fill="var(--fill-0, #3C3C3B)" id="path98" />
                      <path d={svgPaths.p22b61570} fill="var(--fill-0, #3C3C3B)" id="path100" />
                    </g>
                    <g id="g128">
                      <path d={svgPaths.p16b4e200} fill="var(--fill-0, #B20933)" id="path104" />
                      <path d={svgPaths.p28d52b00} fill="var(--fill-0, #B20933)" id="path106" />
                      <path d={svgPaths.p1c862a00} fill="var(--fill-0, #B20933)" id="path108" />
                      <path d={svgPaths.p19be9c00} fill="var(--fill-0, #B20933)" id="path110" />
                      <path d={svgPaths.p16fb900} fill="var(--fill-0, #B20933)" id="path112" />
                      <path d={svgPaths.p12a02d00} fill="var(--fill-0, #B20933)" id="path114" />
                      <path d={svgPaths.p2b53ad00} fill="var(--fill-0, #B20933)" id="path116" />
                      <path d={svgPaths.p9643980} fill="var(--fill-0, #B20933)" id="path118" />
                      <path d={svgPaths.p2a435f40} fill="var(--fill-0, #B20933)" id="path120" />
                      <path d={svgPaths.p22861d00} fill="var(--fill-0, #B20933)" id="path122" />
                      <path d={svgPaths.p24bad700} fill="var(--fill-0, #B20933)" id="path124" />
                      <path d={svgPaths.p3f2a4800} fill="var(--fill-0, #B20933)" id="path126" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

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
