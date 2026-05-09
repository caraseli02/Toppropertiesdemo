
import { X } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
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

import { useFocusTrap } from '@/hooks/useFocusTrap';

export function ContactModal({ isOpen, onClose, propertyTitle, mode = 'contact' }: ContactModalProps) {
  const focusTrapRef = useFocusTrap(true);
  const config = useMemo(() => getModalConfig(mode), [mode]);
  const submitTimeoutRef = useRef<number | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `${config.defaultMessage} ${propertyTitle}`
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ name: boolean; email: boolean }>({ name: false, email: false });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        window.clearTimeout(submitTimeoutRef.current);
        submitTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      if (submitTimeoutRef.current) {
        window.clearTimeout(submitTimeoutRef.current);
        submitTimeoutRef.current = null;
      }
      return;
    }
    if (submitTimeoutRef.current) {
      window.clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = null;
    }
    setIsSubmitted(false);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: `${config.defaultMessage} ${propertyTitle}` });
    setErrors({});
    setTouched({ name: false, email: false });
  }, [config.defaultMessage, isOpen, propertyTitle]);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    requestAnimationFrame(() => {
      nameInputRef.current?.focus();
    });
  }, [isOpen, isSubmitted]);

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

  const resetForm = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: `${config.defaultMessage} ${propertyTitle}` });
    setErrors({});
    setTouched({ name: false, email: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true });

    if (newErrors.name || newErrors.email) return;

    if (submitTimeoutRef.current) window.clearTimeout(submitTimeoutRef.current);
    setIsSubmitting(true);
    submitTimeoutRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      submitTimeoutRef.current = null;
    }, 600);
  };

  return (
    <div
      ref={focusTrapRef}
      className="fixed inset-0 bg-overlay-soft backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 1300 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--border-default)]">
          <h2 id="contact-modal-title" className="text-xl font-bold font-display">{config.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-success-soft rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Received!</h3>
              <p className="text-gray-600">Sarah Anderson will contact you within 24 hours to discuss your request.</p>
              <button
                type="button"
                className="mt-6 w-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white py-3 rounded-lg font-medium transition-colors"
               
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="John Doe"
                  ref={nameInputRef}
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-red-600 text-sm mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="john@example.com"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-red-600 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  id="contact-phone"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent outline-none h-32 resize-none"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  id="contact-message"
                  name="message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting ? 'true' : undefined}
                className="w-full bg-[var(--brand)] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-[var(--brand-dark)] hover:bg-[var(--brand-dark)] disabled:hover:bg-[var(--brand-dark)]"
               
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
