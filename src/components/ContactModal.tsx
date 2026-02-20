
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

type ContactMode = 'contact' | 'viewing' | 'info';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  mode?: ContactMode;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const getModalConfig = (mode: ContactMode) => {
  switch (mode) {
    case 'viewing':
      return {
        title: 'Schedule a Viewing',
        defaultMessage: 'I would like to schedule a viewing',
      };
    case 'info':
      return {
        title: 'Request Information',
        defaultMessage: 'I would like more information',
      };
    default:
      return {
        title: 'Contact Agent',
        defaultMessage: 'I am interested in',
      };
  }
};

export function ContactModal({ isOpen, onClose, propertyTitle, mode = 'contact' }: ContactModalProps) {
  const config = getModalConfig(mode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `${config.defaultMessage} ${propertyTitle}`
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ name: boolean; email: boolean }>({ name: false, email: false });
  const [isSubmitted, setIsSubmitted] = useState(false);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'name') {
      if (!value.trim()) return 'Please enter your name';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Please enter your email';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    }
    return undefined;
  };

  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true });

    if (newErrors.name || newErrors.email) return;

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: `${config.defaultMessage} ${propertyTitle}` });
      setErrors({});
      setTouched({ name: false, email: false });
      alert("Message sent successfully! An agent will contact you shortly.");
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 1300 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold font-display">{config.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Received!</h3>
              <p className="text-gray-600">Sarah Anderson will contact you within 24 hours to discuss your request.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b10832] focus:border-transparent outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b10832] focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b10832] focus:border-transparent outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b10832] focus:border-transparent outline-none h-32 resize-none"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#b10832] hover:bg-[#8e0628] text-white py-3 rounded-lg font-medium transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
