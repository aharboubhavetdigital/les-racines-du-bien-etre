import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BoutiqueQuote: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rootSvgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      if (rootSvgRef.current) {
        const pathLength = rootSvgRef.current.getTotalLength();
        gsap.set(rootSvgRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0.15,
        });

        gsap.to(rootSvgRef.current, {
          strokeDashoffset: 0,
          opacity: 0.25,
          duration: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#181D1A] text-white py-28 sm:py-36 px-6 sm:px-12 overflow-hidden flex items-center justify-center text-center"
    >
      {/* SUBTLE ROOT ILLUSTRATION BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <svg
          className="w-[700px] h-[700px] max-w-full max-h-full text-[#AEB9A9]"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={rootSvgRef}
            d="M250 20 C250 120, 180 160, 180 250 C180 340, 320 370, 250 480 M250 150 C310 180, 380 150, 420 220 M180 250 C130 280, 90 310, 60 380 M250 340 C200 380, 150 420, 100 460 M250 340 C300 380, 370 410, 430 470"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-light leading-[1.3] text-white/95 italic mb-8">
          « Prendre soin de soi, <br className="hidden sm:inline" />
          ce n’est pas s’éloigner du quotidien. <br />
          C’est apprendre à mieux l’habiter. »
        </blockquote>

        <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-[#AEB9A9]">
          LES RACINES DU BIEN-ÊTRE
        </span>
      </div>
    </section>
  );
};
