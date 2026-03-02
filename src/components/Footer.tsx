import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

function DisabledFooterButton({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={className}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {label}
    </button>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold mb-3 tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span style={{ color: '#b10832' }}>Top Properties</span>
            </h3>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              A curated selection of the world's most exclusive real estate.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled
                aria-label="Instagram (coming soon)"
                aria-disabled="true"
                className="w-11 h-11 rounded-full flex items-center justify-center opacity-60 cursor-not-allowed"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled
                aria-label="Facebook (coming soon)"
                aria-disabled="true"
                className="w-11 h-11 rounded-full flex items-center justify-center opacity-60 cursor-not-allowed"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled
                aria-label="LinkedIn (coming soon)"
                aria-disabled="true"
                className="w-11 h-11 rounded-full flex items-center justify-center opacity-60 cursor-not-allowed"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Explore
            </h4>
            <ul className="space-y-2">
              {['All Properties', 'Featured Listings', 'Map View', 'Newest Arrivals'].map((link) => (
                <li key={link}>
                  <DisabledFooterButton
                    label={`${link} (Coming soon)`}
                    className="text-gray-400 text-sm min-h-11 text-left opacity-70 cursor-not-allowed"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contact
            </h4>
            <div className="space-y-3 text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#b10832' }} />
                <span>Contact us for more information</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#b10832' }} />
                <span>Available upon request</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#b10832' }} />
                <span>Contact form coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} Top Properties. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            <DisabledFooterButton label="Privacy" className="min-h-11 px-1 opacity-70 cursor-not-allowed" />
            <DisabledFooterButton label="Terms" className="min-h-11 px-1 opacity-70 cursor-not-allowed" />
            <DisabledFooterButton label="Cookies" className="min-h-11 px-1 opacity-70 cursor-not-allowed" />
          </div>
        </div>
      </div>
    </footer>
  );
}
