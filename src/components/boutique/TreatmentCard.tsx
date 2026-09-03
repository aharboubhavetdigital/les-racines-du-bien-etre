import React, { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import gsap from 'gsap';
import { BoutiqueSoin } from '../../types';

interface TreatmentCardProps {
  soin: BoutiqueSoin;
  onSelect: (soin: BoutiqueSoin) => void;
  isTall?: boolean;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  soin,
  onSelect,
  isTall = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.035,
        y: -4,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: 3,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 6,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    if (categoryRef.current) {
      gsap.to(categoryRef.current, {
        opacity: 0.7,
        duration: 0.4,
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0.15,
        duration: 0.6,
      });
    }
  };

  const handleMouseLeave = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    if (categoryRef.current) {
      gsap.to(categoryRef.current, {
        opacity: 1,
        duration: 0.4,
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(soin)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#F7F5F0] rounded-2xl overflow-hidden border border-[#131210]/10 hover:border-[#3A4B3F]/30 transition-colors duration-500 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl"
    >
      {/* CARD IMAGE CONTAINER */}
      <div className={`relative w-full overflow-hidden bg-[#E8EDE7] ${isTall ? 'h-72 sm:h-96' : 'h-64 sm:h-72'}`}>
        <img
          ref={imageRef}
          src={soin.image}
          alt={soin.title}
          className="w-full h-full object-cover object-center transition-transform"
          loading="lazy"
        />
        {/* SUBTLE HOVER OVERLAY */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#181D1A] opacity-0 pointer-events-none transition-opacity"
        />

        {/* FEATURED BADGE IF APPLICABLE */}
        {soin.isFeatured && (
          <span className="absolute top-4 left-4 bg-[#181D1A]/90 text-white text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
            Soin Signature
          </span>
        )}
      </div>

      {/* CARD CONTENT */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
        <div>
          {/* CATEGORY TAG */}
          <span
            ref={categoryRef}
            className="inline-block text-[11px] font-mono tracking-[0.22em] uppercase text-[#3A4B3F] font-semibold mb-3"
          >
            {soin.categoryTag}
          </span>

          {/* TREATMENT NAME */}
          <h3
            ref={titleRef}
            className="font-serif text-xl sm:text-2xl font-light text-[#181D1A] leading-snug mb-3 group-hover:text-[#2A382E] transition-colors"
          >
            {soin.title}
          </h3>

          {/* SHORT DESCRIPTION */}
          <p className="font-sans text-xs sm:text-sm text-[#181D1A]/75 font-light leading-relaxed mb-6 line-clamp-3">
            {soin.description}
          </p>
        </div>

        {/* BOTTOM METRICS & CTA */}
        <div className="pt-4 border-t border-[#131210]/10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono text-[#181D1A]/80">
            <span className="flex items-center gap-1.5 bg-[#E8EDE7] px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-[#3A4B3F]" />
              {soin.duration}
            </span>
            {soin.price && (
              <span className="font-semibold text-sm text-[#181D1A]">
                {soin.price} €
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-[0.14em] uppercase text-[#3A4B3F] group-hover:text-[#181D1A] transition-colors">
            <span>Découvrir</span>
            <span ref={arrowRef} className="inline-block">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
