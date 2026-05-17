import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageModalProps {
  images: readonly string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ images, initialIndex, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, images.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-overlay-strong flex items-center justify-center p-4"
      style={{ zIndex: 1300 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Property image gallery"
    >
      <div
        className="relative max-w-6xl bg-ink rounded-xl overflow-hidden"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-overlay-soft hover:bg-ink rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1} of ${images.length}`}
          className="max-w-full object-contain"
          style={{ maxHeight: "80vh" }}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1080&h=720&fit=crop&q=80";
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-[var(--overlay-soft)] to-transparent">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7 7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
