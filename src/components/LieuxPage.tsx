import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Compass, Waves, Building2, CheckCircle2, Phone, Mail, ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { SplitColumnInfiniteHero } from './SplitColumnInfiniteHero';
import { InteractiveGoogleMapSection } from './InteractiveGoogleMapSection';

interface LieuxPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onOpenBooking: (serviceId?: string, location?: string) => void;
}

export const LieuxPage: React.FC<LieuxPageProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards3dRef = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Card Interactive Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const card = cards3dRef.current[cardIndex];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardIndex: number) => {
    const card = cards3dRef.current[cardIndex];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] font-sans antialiased selection:bg-[#556B5D]/20 selection:text-[#1C1A17]">

      {/* 1. HERO SPLIT SECTION — SPLIT COLUMN INFINITE SLIDER */}
      <SplitColumnInfiniteHero
        onNavigateHome={onNavigateHome}
        onOpenBooking={onOpenBooking}
      />

      {/* 2. SECTION 2 — INTERACTIVE GOOGLE MAPS WITH 3D GSAP ANIMATED LOCATION CARDS */}
      <InteractiveGoogleMapSection onOpenBooking={onOpenBooking} />

      {/* 3. SECTION 3 — 3D INTERACTIVE ATMOSPHERE CARDS (MODERN PARALLAX TILT) */}
      <section className="py-16 sm:py-24 bg-[#F2EDE4] border-t border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-20">
            <span className="font-mono text-xs tracking-[0.25em] text-[#736355] uppercase font-semibold block">
              EXPÉRIENCE IMMERSIVE
            </span>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1A17] font-normal tracking-tight">
              Deux cadres conçus pour votre recentrage.
            </h3>
            <p className="font-sans text-sm text-[#5C564E] font-light">
              Passez votre curseur sur chaque espace pour explorer les spécificités de chaque atmosphère.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* 3D Card 1: Institut Belle et Zen */}
            <div
              ref={(el) => {
                if (el) cards3dRef.current[0] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              className="relative min-h-[460px] sm:min-h-[500px] rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between text-white shadow-xl transition-shadow duration-500 bg-[#344439] cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => onOpenBooking('naturopathie', 'Institut Belle et Zen — Saint-Lô')}
            >
              {/* Background Ambient Image */}
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85"
                alt="Institut Belle et Zen Saint-Lô"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-[#344439]/60" />

              {/* Top Card Badge */}
              <div className="relative z-10 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
                <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase text-white border border-white/20">
                  Atmosphère 01
                </span>
                <span className="text-xs font-mono text-white/80">Saint-Lô</span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(40px)' }}>
                <h4 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal">
                  Institut Belle et Zen Saint-Lô
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/90 font-light leading-relaxed max-w-md">
                  Un cadre feutré et professionnel au cœur de Saint-Lô, idéal pour vos bilans de vitalité et rituels de réflexologie réguliers.
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-white/20">
                  <span className="text-xs font-mono text-[#D8CFBF] tracking-wider uppercase">
                    Consultations individuelles
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#D8CFBF] transition-colors">
                    <span>Réserver ce lieu</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Card 2: Le Chant des Oiseaux */}
            <div
              ref={(el) => {
                if (el) cards3dRef.current[1] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              className="relative min-h-[460px] sm:min-h-[500px] rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between text-white shadow-xl transition-shadow duration-500 bg-[#504135] cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => onOpenBooking('bilan-vitalite', 'Le Chant des Oiseaux — Normandie')}
            >
              {/* Background Ambient Image */}
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85"
                alt="Le Chant des Oiseaux au bord de l'eau"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-[#504135]/60" />

              {/* Top Card Badge */}
              <div className="relative z-10 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
                <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase text-white border border-white/20">
                  Atmosphère 02
                </span>
                <span className="text-xs font-mono text-white/80">Vallée de la Vire</span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(40px)' }}>
                <h4 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal">
                  Le Chant des Oiseaux Vallée de la Vire
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/90 font-light leading-relaxed max-w-md">
                  Une immersion apaisante en pleine nature et au bord de l'eau, conçue pour déconnecter du quotidien et approfondir votre ressourcement.
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-white/20">
                  <span className="text-xs font-mono text-[#D8CFBF] tracking-wider uppercase">
                    Nature & Futurs ateliers
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#D8CFBF] transition-colors">
                    <span>Réserver ce lieu</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION — BOOKING INVITATION */}
      <section className="py-20 sm:py-28 bg-[#20352B] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-8 relative z-10">
          <span className="font-mono text-xs tracking-[0.25em] text-[#AEB9A9] uppercase font-semibold block">
            VOTRE ACCOMPAGNEMENT
          </span>

          <h3 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-white tracking-tight">
            Choisir le lieu qui résonne avec votre besoin du moment.
          </h3>

          <p className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl mx-auto">
            Que vous préfériez la commodité de Saint-Lô ou le calme du bord de l'eau, chaque séance est adaptée avec écoute et bienveillance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking('bilan-vitalite')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#8BB28A] hover:bg-[#7AA179] text-white text-xs font-semibold tracking-wider uppercase shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre rendez-vous</span>
            </button>

            <button
              onClick={() => onNavigateHome('#hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase border border-white/20 transition-all duration-300 cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
