import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold mb-3 tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span style={{ color: '#b10832' }}>SANT'ANDREA</span>
            </h3>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Luxury Houses & Top Properties — a curated selection of the world's most exclusive real estate.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
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
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link}
                  </a>
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
                <span>Via Montenapoleone 8, 20121 Milano, Italy</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#b10832' }} />
                <span>+39 02 7600 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#b10832' }} />
                <span>info@santandrea.it</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} Sant'Andrea Luxury Houses. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
