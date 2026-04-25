import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ComingSoonToastProps {
  message: string;
  onDismiss: () => void;
}

export function ComingSoonToast({ message, onDismiss }: ComingSoonToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onDismiss, 2400);
    return () => window.clearTimeout(timeoutId);
  }, [message, onDismiss]);

  return createPortal(
    <div className="fixed inset-x-0 bottom-6 z-[5000] flex justify-center px-4">
      <div
        className="w-full max-w-sm rounded-2xl border border-black/10 bg-white/95 shadow-xl backdrop-blur-md"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3 px-4 py-3">
          <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#b10832]" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Coming soon
            </p>
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b10832]/30"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

