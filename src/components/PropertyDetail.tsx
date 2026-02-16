import { X, ChevronLeft, ChevronRight, Heart, Share2, MapPin, Bed, Bath, Maximize, Calendar, Check } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from './ContactModal';

interface PropertyDetailProps {
  property: {
    id: string;
    image: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    description?: string;
    yearBuilt?: number;
    propertyType?: string;
    gallery?: string[];
    amenities?: string[];
    virtualTour?: string;
  };
  onClose: () => void;
}

export function PropertyDetail({ property, onClose }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const gallery = property.gallery || [property.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const amenities = property.amenities || [
    'Swimming Pool',
    'Gym',
    'Garden',
    'Garage',
    'Smart Home',
    'Security System',
    'Ocean View',
    'Fireplace',
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#b10832] text-[#b10832]' : 'text-gray-600'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9]">
            <img
              src={gallery[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            {/* Gallery Navigation */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {gallery.length}
                </div>
              </>
            )}

            {/* Virtual Tour Button */}
            <button
              onClick={() => setShowVirtualTour(!showVirtualTour)}
              className="absolute bottom-4 left-4 bg-[#b10832] hover:bg-[#8e0628] text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              {showVirtualTour ? 'Close Virtual Tour' : 'View Virtual Tour'}
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 p-4 overflow-x-auto bg-gray-900">
            {gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${index === currentImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Virtual Tour Overlay */}
      {showVirtualTour && (
        <div className="bg-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#b10832] rounded-full flex items-center justify-center">
                  <Maximize className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">360° Virtual Tour</h3>
                <p className="text-gray-400">Interactive virtual tour experience</p>
                <div className="mt-6 flex gap-3 justify-center">
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">Living Room</div>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">Kitchen</div>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">Bedroom</div>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">Exterior</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Location */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
              <div className="flex items-center text-gray-600 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Bed className="w-5 h-5" />
                  <span className="text-sm">Bedrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.beds}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Bath className="w-5 h-5" />
                  <span className="text-sm">Bathrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.baths}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Maximize className="w-5 h-5" />
                  <span className="text-sm">Area</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.sqft}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Year Built</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.yearBuilt || 2020}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description ||
                  `Experience unparalleled luxury in this stunning ${property.title.toLowerCase()}. 
                  Featuring ${property.beds} spacious bedrooms and ${property.baths} elegant bathrooms, 
                  this ${property.sqft} residence offers the perfect blend of sophistication and comfort. 
                  Located in the prestigious ${property.location} area, this property showcases exceptional 
                  craftsmanship, premium finishes, and breathtaking views. The open-concept design seamlessly 
                  integrates indoor and outdoor living spaces, creating an ideal environment for both intimate 
                  gatherings and grand entertaining.`}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="border border-gray-400" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <MapPin className="w-12 h-12 text-[#b10832]" />
                  <div className="absolute inset-0 bg-[#b10832] rounded-full animate-ping opacity-20" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <p className="text-3xl font-bold text-[#b10832] mb-6">{property.price}</p>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full bg-[#b10832] hover:bg-[#8e0628] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Schedule Viewing
                  </button>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full border-2 border-[#b10832] text-[#b10832] hover:bg-[#b10832] hover:text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Contact Agent
                  </button>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors"
                  >
                    Request Info
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium">{property.propertyType || 'Luxury Villa'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium">{property.yearBuilt || 2020}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parking</span>
                    <span className="font-medium">3 Spaces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stories</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lot Size</span>
                    <span className="font-medium">10,000 sq ft</span>
                  </div>
                </div>
              </div>


              {/* Agent Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Your Agent</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-medium">Sarah Anderson</p>
                    <p className="text-sm text-gray-600">Luxury Properties Specialist</p>
                  </div>
                </div>
                <button className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyTitle={property.title}
      />
    </div >
  );
}
