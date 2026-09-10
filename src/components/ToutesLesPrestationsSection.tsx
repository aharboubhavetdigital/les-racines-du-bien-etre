import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface PrestationCardData {
  number: string;
  category: string;
  title: string;
  id: string;
}

export const PRESTATIONS_LIST: PrestationCardData[] = [
  { number: '01', category: 'NATUROPATHIE & VITALITÉ', title: 'La naturopathie', id: 'la-naturopathie' },
  { number: '02', category: 'SOIN MANUEL & RELAXATION', title: 'Massage bien-être', id: 'massage-bien-etre' },
  { number: '03', category: 'SOIN MANUEL & RELAXATION', title: 'Réflexologie plantaire', id: 'reflexologie-plantaire' },
  { number: '04', category: 'SOIN MANUEL & RELAXATION', title: 'Réflexologie faciale', id: 'reflexologie-faciale' },
  { number: '05', category: 'NATUROPATHIE & VITALITÉ', title: 'Bilan de vitalité', id: 'bilan-de-vitalite' },
  { number: '06', category: 'NATUROPATHIE & VITALITÉ', title: 'Programme de vitalité', id: 'programme-de-vitalite' },
  { number: '07', category: 'NATUROPATHIE & VITALITÉ', title: 'Suivi personnalisé', id: 'suivi-personnalise' },
  { number: '08', category: 'NATUROPATHIE & VITALITÉ', title: 'Moyens naturels & hygiène de vie', id: 'moyens-naturels' },
  { number: '09', category: 'ESPACE SPA & RELAXATION', title: 'Location de jacuzzi – 5 places', id: 'location-jacuzzi-5-places' },
];

interface ToutesLesPrestationsSectionProps {
  onSelectPrestation?: (serviceId: string) => void;
}

export const ToutesLesPrestationsSection: React.FC<ToutesLesPrestationsSectionProps> = ({
  onSelectPrestation
}) => {
  return (
    <section className="relative w-full bg-[#1D3327] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 overflow-hidden">
      
      {/* Blurred Botanical Background Leaf Overlay Shadows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 opacity-25 pointer-events-none filter blur-3xl text-[#A8B7A7]">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
          <path d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.771 100 200C100 144.771 144.771 100 200 100C144.771 100 100 55.2285 100 0Z" />
        </svg>
      </div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 opacity-25 pointer-events-none filter blur-3xl text-[#A8B7A7]">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
          <path d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.771 100 200C100 144.771 144.771 100 200 100C144.771 100 100 55.2285 100 0Z" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* SECTION TITLE & BOTANICAL LEAF DIVIDER */}
        <div className="text-center mb-14 sm:mb-18 space-y-4">
          <h2 className="font-mono text-sm sm:text-base tracking-[0.4em] uppercase text-white/90 font-light">
            TOUTES LES PRESTATIONS
          </h2>

          {/* Thin line with centered small botanical leaf icon */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/30 to-white/45" />
            <div className="text-[#A8B7A7] transform -rotate-45">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 5 16.17 3 22C3 14 7 4 17 8Z" />
              </svg>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/30 to-white/45" />
          </div>
        </div>

        {/* 2-COLUMN GRID (LAST 9TH ITEM SPANS 2 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRESTATIONS_LIST.map((item, index) => {
            const isLastOdd = index === PRESTATIONS_LIST.length - 1 && PRESTATIONS_LIST.length % 2 !== 0;

            return (
              <div
                key={item.id}
                onClick={() => onSelectPrestation && onSelectPrestation(item.id)}
                className={`group relative bg-white/[0.08] backdrop-blur-md rounded-[20px] border border-white/20 hover:border-white/45 hover:bg-white/[0.13] hover:-translate-y-1 transition-all duration-350 ease-out p-6 sm:p-8 flex items-center justify-between min-h-[150px] sm:min-h-[170px] overflow-hidden cursor-pointer shadow-lg ${
                  isLastOdd ? 'md:col-span-2' : ''
                }`}
              >
                {/* Subtle Botanical Leaf Watermark inside Card */}
                <div className="absolute -bottom-8 -left-8 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
                  <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                    <path d="M50 0C50 27.614 27.614 50 0 50C27.614 50 50 72.386 50 100C50 72.386 72.386 50 100 50C72.386 50 50 27.614 50 0Z" />
                  </svg>
                </div>

                {/* Left Content */}
                <div className="space-y-3 relative z-10 pr-4">
                  {/* Category Header Row: Number | Category */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-white/80 shrink-0">
                      {item.number}
                    </span>
                    <span className="h-3.5 w-[1px] bg-white/30 shrink-0" />
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/70 font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-[#E8F0E6] transition-colors leading-snug tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Right Circular Arrow Button */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 shrink-0 relative z-10">
                  <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
