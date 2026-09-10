import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  MapPin,
  Phone,
  Calendar,
  Navigation,
  Waves,
  Building2,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Map as MapIcon
} from 'lucide-react';

export interface LocationData {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  number: string;
  badgeType: 'saint-lo' | 'chant-oiseaux' | 'contact';
  address: string;
  googleMapsUrl: string;
  zoom: number;
  phone: string;
  email: string;
  description: string;
  features: string[];
  imageUrl: string;
  bookingServiceId: string;
  hours?: string;
}

export const LOCATIONS: LocationData[] = [
  {
    id: 'saint-lo',
    name: 'Institut Belle et Zen Saint-Lô',
    subtitle: 'Centre-Ville de Saint-Lô',
    tag: 'Centre-Ville',
    number: '01',
    badgeType: 'saint-lo',
    address: '12 Rue Maréchal Leclerc, 50000 Saint-Lô, France',
    googleMapsUrl: 'https://maps.google.com/?q=12+Rue+Marechal+Leclerc+50000+Saint-Lo+France',
    zoom: 16,
    phone: '06 12 34 56 78',
    email: 'contact@lesracinesdubienetre.fr',
    description: 'Un environnement professionnel, pratique et confortable, dans une ambiance feutrée en parfaite cohérence avec l’univers du bien-être.',
    features: [
      'Consultations & Soins manuels',
      'Accès rapide & stationnement proche',
      'Atmosphère calme & feutrée',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85',
    bookingServiceId: 'naturopathie',
    hours: 'Lun - Sam : 09h00 - 19h00',
  },
  {
    id: 'chant-oiseaux',
    name: 'Le Chant des Oiseaux',
    subtitle: 'Vallée de la Vire — Bord de l’eau & Nature',
    tag: 'Bord de l’eau',
    number: '02',
    badgeType: 'chant-oiseaux',
    address: 'Vallée de la Vire, 50000 Condé-sur-Vire / Saint-Lô, France',
    googleMapsUrl: 'https://maps.google.com/?q=Vallee+de+la+Vire+Normandie+France',
    zoom: 14,
    phone: '06 12 34 56 78',
    email: 'contact@lesracinesdubienetre.fr',
    description: 'Un lieu apaisant et ressourçant au bord de l’eau, conçu pour la déconnexion et l’accueil de futurs ateliers et masterclasses.',
    features: [
      'Immersion naturelle & silence',
      'Futur accueil d’ateliers thématiques',
      'Bord de l’eau & havre de paix',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
    bookingServiceId: 'bilan-vitalite',
    hours: 'Sur rendez-vous préalable',
  },
  {
    id: 'contact',
    name: 'Informations pratiques',
    subtitle: 'Saint-Lô & environs — Contact & Accès',
    tag: 'Accès & Info',
    number: '03',
    badgeType: 'contact',
    address: 'Saint-Lô & Environs (Adresse exacte communiquée dès la réservation)',
    googleMapsUrl: 'https://maps.google.com/?q=Saint-Lo+France',
    zoom: 13,
    phone: '06 12 34 56 78',
    email: 'contact@lesracinesdubienetre.fr',
    description: 'Adresses précises et accès fournis dès la confirmation de votre rendez-vous. Pour toute question, contactez directement le cabinet.',
    features: [
      'Confirmation immédiate avec plan d’accès',
      'Suivi personnalisé & réponse rapide',
      'Option de consultation en Visio sécurisée',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
    bookingServiceId: 'bilan-vitalite',
    hours: 'Secrétariat joignable de 08h à 20h',
  },
];

interface InteractiveGoogleMapSectionProps {
  onOpenBooking?: (serviceId?: string, locationName?: string) => void;
}

export const InteractiveGoogleMapSection: React.FC<InteractiveGoogleMapSectionProps> = ({ onOpenBooking }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(LOCATIONS[0]);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const card3dRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // GSAP 3D Entrance Animation sequence on location change
  useEffect(() => {
    if (!card3dRef.current) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf(card3dRef.current);

      // Card 3D Flip entrance
      gsap.fromTo(
        card3dRef.current,
        {
          opacity: 0,
          scale: 0.88,
          rotateY: -25,
          rotateX: 15,
          y: 35,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 0.75,
          ease: 'back.out(1.3)',
        }
      );

      // Inner elements stagger
      if (cardContentRef.current) {
        const children = cardContentRef.current.querySelectorAll('.gsap-3d-child');
        gsap.fromTo(
          children,
          { opacity: 0, y: 18, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            delay: 0.1,
            ease: 'power3.out',
          }
        );
      }

      // Map container pulse
      if (mapContainerRef.current) {
        gsap.fromTo(
          mapContainerRef.current,
          { opacity: 0.6, scale: 0.99 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
    }, card3dRef);

    return () => ctx.revert();
  }, [selectedLocation]);

  // Dynamic 3D Mouse Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card3dRef.current) return;
    const rect = card3dRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card3dRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1200,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!card3dRef.current) return;
    gsap.to(card3dRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const mapEmbedUrl =
    mapType === 'satellite'
      ? `https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation.address)}&t=k&z=${selectedLocation.zoom}&ie=UTF8&iwloc=&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation.address)}&z=${selectedLocation.zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto font-sans">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#D8CFBF]/60">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1C1A17] font-normal tracking-tight leading-tight">
            Explorez nos 3 adresses d’accueil.
          </h2>
        </div>

        {/* Map Type Switcher Buttons */}
        <div className="inline-flex items-center gap-1.5 bg-[#FAF6F0] p-1.5 rounded-2xl border border-[#D8CFBF] shadow-xs">
          <button
            onClick={() => setMapType('roadmap')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              mapType === 'roadmap'
                ? 'bg-[#506456] text-white shadow-md'
                : 'text-[#60564C] hover:text-[#1C1A17] hover:bg-white/60'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Vue Plan</span>
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              mapType === 'satellite'
                ? 'bg-[#506456] text-white shadow-md'
                : 'text-[#60564C] hover:text-[#1C1A17] hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vue Satellite</span>
          </button>
        </div>
      </div>

      {/* 3 ADDRESS SELECTOR BUTTONS (HORIZONTAL 3-COLUMN ROW ABOVE THE MAP) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4 mb-6">
        {LOCATIONS.map((loc) => {
          const isSelected = selectedLocation.id === loc.id;
          return (
            <div
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={`group relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#9EAC99] border-[#9EAC99] text-[#181D1A] shadow-md -translate-y-0.5'
                  : 'bg-white border-[#E5DFD5] hover:border-[#506456]/50 hover:bg-[#FAF8F5] text-[#1C1A17] shadow-xs'
              }`}
            >
              {/* Subtle Ambient Glow for selected card */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full blur-xl pointer-events-none" />
              )}

              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  {/* Number Badge */}
                  <span className={`font-mono text-[10px] font-bold ${
                    isSelected ? 'text-[#181D1A]' : 'text-[#A39A8E]'
                  }`}>
                    {loc.number}
                  </span>

                  {/* Icon */}
                  <div className={`p-1 sm:p-1.5 rounded-md shrink-0 transition-colors duration-300 ${
                    isSelected ? 'bg-[#181D1A]/10 text-[#181D1A]' : 'bg-[#F0EBE1] text-[#60564C]'
                  }`}>
                    {loc.badgeType === 'saint-lo' ? (
                      <Building2 className="w-3 h-3" />
                    ) : loc.badgeType === 'chant-oiseaux' ? (
                      <Waves className="w-3 h-3" />
                    ) : (
                      <Phone className="w-3 h-3" />
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <div className="flex items-center gap-1">
                  <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${
                    isSelected ? 'translate-x-0.5 text-[#181D1A]' : 'text-[#C5BEB3] group-hover:text-[#506456]'
                  }`} />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-0.5">
                <h3 className={`font-serif-editorial text-xs sm:text-sm font-semibold leading-tight ${
                  isSelected ? 'text-[#181D1A]' : 'text-[#1C1A17]'
                }`}>
                  {loc.name}
                </h3>
                <p className={`font-sans text-[10px] sm:text-[11px] line-clamp-1 ${
                  isSelected ? 'text-[#181D1A]/80' : 'text-[#7A7267]'
                }`}>
                  {loc.subtitle}
                </p>
              </div>

              {/* Bottom Address preview */}
              <div className={`mt-2 pt-1.5 border-t text-[9px] sm:text-[10px] font-mono flex items-center gap-1.5 truncate ${
                isSelected ? 'border-[#181D1A]/20 text-[#181D1A]' : 'border-[#E5DFD5] text-[#8C8275]'
              }`}>
                <MapPin className={`w-2.5 h-2.5 shrink-0 ${isSelected ? 'text-[#181D1A]' : 'text-[#506456]'}`} />
                <span className="truncate">{loc.address.split(',')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* HUGE HERO MAP & 3D GSAP INFO CARD CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[580px] lg:min-h-[640px]">
        
        {/* HUGE GOOGLE MAP IFRAME CONTAINER (7 COLS ON DESKTOP) */}
        <div
          ref={mapContainerRef}
          className="lg:col-span-7 relative min-h-[450px] sm:min-h-[520px] lg:min-h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-[#D8CFBF] bg-[#EBE5DA] flex flex-col"
        >
          <iframe
            key={`${selectedLocation.id}-${mapType}`}
            title={`Google Maps - ${selectedLocation.name}`}
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '100%', flex: 1 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full flex-1 filter contrast-[1.04] brightness-[0.99]"
          />

          {/* Top Button Overlay */}
          <div className="absolute top-4 right-4 flex items-center justify-end pointer-events-none z-10">
            <a
              href={selectedLocation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto bg-white/95 hover:bg-white text-[#1C1A17] backdrop-blur-md px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-lg border border-white/60 flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <span>Ouvrir Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#506456]" />
            </a>
          </div>
        </div>

        {/* 3D GSAP ANIMATED DETAIL CARD (5 COLS ON DESKTOP) */}
        <div style={{ perspective: '1200px' }} className="lg:col-span-5 flex flex-col justify-between">
          <div
            ref={card3dRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full min-h-[450px] sm:min-h-[520px] lg:min-h-[640px] rounded-3xl p-7 sm:p-9 flex flex-col justify-between bg-[#9EAC99] text-[#181D1A] shadow-2xl border border-[#9EAC99] overflow-hidden transition-shadow duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Background Ambient Image Overlay */}
            <img
              src={selectedLocation.imageUrl}
              alt={selectedLocation.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover filter opacity-15 mix-blend-multiply pointer-events-none transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9EAC99] via-[#9EAC99]/95 to-[#9EAC99]/85 pointer-events-none" />

            {/* Inner Card Content */}
            <div ref={cardContentRef} className="relative z-10 space-y-6">

              {/* Title & Address */}
              <div className="gsap-3d-child space-y-2 pt-2">
                <h3 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#181D1A] font-medium leading-tight">
                  {selectedLocation.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#181D1A]/85 font-medium flex items-center gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-[#181D1A] shrink-0" />
                  <span>{selectedLocation.address}</span>
                </p>
              </div>

              {/* Description */}
              <p className="gsap-3d-child font-sans text-xs sm:text-sm text-[#181D1A]/90 font-light leading-relaxed">
                {selectedLocation.description}
              </p>

              {/* Hours */}
              {selectedLocation.hours && (
                <div className="gsap-3d-child flex items-center gap-2 text-xs font-mono text-[#181D1A] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#181D1A]" />
                  <span>{selectedLocation.hours}</span>
                </div>
              )}

              {/* Features List */}
              <div className="gsap-3d-child space-y-2.5 pt-3 border-t border-[#181D1A]/15 text-xs text-[#181D1A]">
                {selectedLocation.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-[#181D1A]/8 border border-[#181D1A]/12 p-2.5 rounded-xl backdrop-blur-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#181D1A] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 pt-6 mt-6 border-t border-[#181D1A]/15 space-y-3">
              <button
                onClick={() => onOpenBooking?.(selectedLocation.bookingServiceId, selectedLocation.name)}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#181D1A] hover:bg-[#2A3F34] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Prendre rendez-vous</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedLocation.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#181D1A]/10 hover:bg-[#181D1A]/20 text-[#181D1A] text-xs font-medium transition-all duration-200 border border-[#181D1A]/20 truncate"
                >
                  <Phone className="w-3.5 h-3.5 text-[#181D1A] shrink-0" />
                  <span className="truncate">{selectedLocation.phone}</span>
                </a>

                <a
                  href={selectedLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#181D1A]/10 hover:bg-[#181D1A]/20 text-[#181D1A] text-xs font-medium transition-all duration-200 border border-[#181D1A]/20 truncate"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#181D1A] shrink-0" />
                  <span className="truncate">Itinéraire</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
