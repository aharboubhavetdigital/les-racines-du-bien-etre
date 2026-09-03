import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/brandData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-[#131210] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Serif Quotation Typography */}
        <div className="text-center space-y-8 relative">
          
          <span className="font-serif-editorial text-7xl sm:text-8xl md:text-9xl text-[#AEB9A9]/20 leading-none block -mb-12">
            “
          </span>

          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9] block">
            Témoignages & Expériences
          </span>

          {/* Testimonial Quote */}
          <blockquote className="min-h-[160px] flex items-center justify-center">
            <p className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl text-white font-light italic leading-relaxed max-w-3xl mx-auto">
              « {current.quote} »
            </p>
          </blockquote>

          {/* Client Info */}
          <div className="space-y-1">
            <cite className="not-italic font-serif-editorial text-xl font-medium text-white block">
              {current.author}
            </cite>
            <span className="font-sans text-xs tracking-wider uppercase text-white/70 block">
              {current.service} — {current.city}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/20 hover:border-white text-white transition-all bg-white/10 hover:bg-white/20 cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-8 bg-[#AEB9A9]' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Aller au témoignage ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-white/20 hover:border-white text-white transition-all bg-white/10 hover:bg-white/20 cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
