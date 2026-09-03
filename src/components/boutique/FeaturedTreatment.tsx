import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BoutiqueSoin } from '../../types';
import { BOUTIQUE_SOINS } from '../../data/boutiqueData';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedTreatmentProps {
  onSelectSoin: (soin: BoutiqueSoin) => void;
}

export const FeaturedTreatment: React.FC<FeaturedTreatmentProps> = ({ onSelectSoin }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const featuredSoin = BOUTIQUE_SOINS.find((s) => s.isFeatured) || BOUTIQUE_SOINS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // Image clip reveal
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Content staggered fade-up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#181D1A] text-white py-20 sm:py-32 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT: LARGE IMMERSIVE IMAGE */}
        <div ref={imageContainerRef} className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] shadow-2xl">
          <img
            src={featuredSoin.image}
            alt={featuredSoin.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181D1A]/60 via-transparent to-transparent" />
        </div>

        {/* RIGHT: ELEGANT SAGE/CREAM CONTENT */}
        <div className="relative p-8 sm:p-12 lg:p-16 bg-[#E8EDE7] text-[#181D1A] rounded-3xl shadow-xl flex flex-col justify-center">
          {/* SUBTLE BACKGROUND VERTICAL BOTANICAL LINE */}
          <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-[#3A4B3F]/15 pointer-events-none hidden sm:block" />

          <div ref={contentRef} className="relative z-10 max-w-lg">
            {/* SMALL LABEL */}
            <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-[#3A4B3F] font-semibold mb-4">
              SOIN SIGNATURE
            </span>

            {/* LARGE TITLE */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#181D1A] leading-[1.15] mb-6">
              Un moment rien <br />
              <span className="italic font-normal text-[#2A382E]">que pour vous.</span>
            </h2>

            {/* TEXT */}
            <p className="font-sans text-base sm:text-lg text-[#181D1A]/80 font-light leading-relaxed mb-8">
              Prendre soin de soi, c’est aussi s’accorder un temps pour écouter son corps,
              ralentir et retrouver un équilibre plus juste.
            </p>

            {/* CTA */}
            <button
              onClick={() => onSelectSoin(featuredSoin)}
              className="px-8 py-4 rounded-full bg-[#181D1A] text-white hover:bg-[#2A382E] transition-all duration-300 font-mono text-xs tracking-[0.18em] uppercase flex items-center gap-3 group cursor-pointer shadow-md"
            >
              <span>Découvrir ce soin</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
