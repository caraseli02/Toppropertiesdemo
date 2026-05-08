import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--surface-dark)', color: 'white', marginTop: '64px' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3 tracking-wide">
              <span style={{ color: 'var(--brand)' }}>Top Properties</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A curated selection of the world's most exclusive real estate.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--brand)' }} />
                <span>Passeig de Gràcia, Barcelona 08007</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--brand)' }} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--brand)' }} />
                <span>hello@topproperties.demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Top Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
