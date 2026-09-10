import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';

export interface LieuxProject {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  leftImg: string;
  rightImg: string;
  bookingServiceId?: string;
  locationName?: string;
}

const PROJECTS: LieuxProject[] = [
  {
    id: 'saint-lo',
    title: 'Saint-Lô',
    subtitle: 'Cabinet professionnel & atmosphère feutrée au cœur de Saint-Lô',
    tags: ['SAINT-LÔ', 'CENTRE-VILLE', 'CABINET'],
    leftImg: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1600&q=85',
    rightImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    bookingServiceId: 'naturopathie',
    locationName: 'Institut Belle et Zen — Saint-Lô'
  },
  {
    id: 'chant-oiseaux',
    title: 'Le Chant des Oiseaux',
    subtitle: 'Immersion apaisante en pleine nature et au bord de l’eau dans la Vallée de la Vire',
    tags: ['VALLÉE DE LA VIRE', 'BORD DE L’EAU', 'SANCTUAIRE'],
    leftImg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    rightImg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=85',
    bookingServiceId: 'bilan-vitalite',
    locationName: 'Le Chant des Oiseaux — Normandie'
  },
  {
    id: 'bilan-vitalite',
    title: 'Bilan de Vitalité',
    subtitle: 'Analyse globale des 4 piliers de santé & accompagnement sur-mesure',
    tags: ['NATUROPATHIE', 'BILAN GLOBAL', 'INDIVIDUALISÉ'],
    leftImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=85',
    rightImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=85',
    bookingServiceId: 'bilan-vitalite',
    locationName: 'Consultation Globale'
  },
  {
    id: 'reflexologie',
    title: 'Réflexologie Plantaire',
    subtitle: 'Toucher thérapeutique, libération des tensions & rééquilibrage nerveux',
    tags: ['RÉFLEXOLOGIE', 'DÉTENTE', 'SOINS MANUELS'],
    leftImg: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=85',
    rightImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    bookingServiceId: 'reflexologie-plantaire',
    locationName: 'Soin Réflexologique'
  },
  {
    id: 'jacuzzi-ateliers',
    title: 'Jacuzzi & Ateliers',
    subtitle: 'Espace privatif 5 places, rituels détox & événements thématiques',
    tags: ['JACUZZI 5 PLACES', 'ATELIERS', 'DETOX'],
    leftImg: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85',
    rightImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    bookingServiceId: 'location-jacuzzi-5-places',
    locationName: 'Espace Détente'
  }
];

interface SplitColumnInfiniteHeroProps {
  onNavigateHome: (targetSection?: string) => void;
  onOpenBooking: (serviceId?: string, location?: string) => void;
}

export const SplitColumnInfiniteHero: React.FC<SplitColumnInfiniteHeroProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  // Start at position = 1 as per specification
  const [pos, setPos] = useState<number>(1);
  const targetRef = useRef<number>(1);
  const posRef = useRef<number>(1);
  const isInteractingRef = useRef<boolean>(false);
  const lastTouchYRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);

  // Smoothstep title transition formula: t*t*(3-2t)
  const getTitlePos = (progress: number, titleHold = 0.1): number => {
    const from = progress - 1;
    const past = Math.abs(from) - titleHold;
    if (past <= 0) return 1;
    const t = past / (1 - titleHold);
    return 1 + Math.sign(from) * t * t * (3 - 2 * t);
  };

  // Clip polygon arithmetic: opposite reveals (left rises from bottom, right descends from top)
  const getClipPath = (side: 'left' | 'right', reveal: number, revealOverlap = 0.5): string => {
    const d = Math.max(0, Math.min(1, reveal)) * (100 + revealOverlap);
    if (side === 'left') {
      const bottomCut = Math.max(0, 100 - d);
      return `polygon(0% ${bottomCut}%, 100% ${bottomCut}%, 100% 100%, 0% 100%)`;
    } else {
      const topCut = Math.min(100, d);
      return `polygon(0% 0%, 100% 0%, 100% ${topCut}%, 0% ${topCut}%)`;
    }
  };

  // Auto-advance loop (rAF)
  useEffect(() => {
    let animFrameId: number;

    const loop = () => {
      if (!isInteractingRef.current) {
        targetRef.current += 0.0022;
      }
      posRef.current += (targetRef.current - posRef.current) * 0.05;
      setPos(posRef.current);
      animFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    isInteractingRef.current = true;
    lastTouchYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInteractingRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = lastTouchYRef.current - currentY;
    lastTouchYRef.current = currentY;
    targetRef.current += (deltaY * 5) / 1200;
  };

  const handleTouchEnd = () => {
    isInteractingRef.current = false;
  };

  const handlePrev = () => {
    targetRef.current = Math.max(1, Math.floor(posRef.current) - 1);
  };

  const handleNext = () => {
    targetRef.current = Math.floor(posRef.current) + 1;
  };

  const currentProjectIndex = ((Math.floor(pos - 1) % 5) + 5) % 5;
  const currentProject = PROJECTS[currentProjectIndex];

  const currentIntPos = Math.floor(pos);
  const slideIndices: number[] = [];
  for (let i = currentIntPos - 2; i <= currentIntPos + 2; i++) {
    if (i >= 1) slideIndices.push(i);
  }

  const progressFraction = (((pos - 1) % 5) + 5) % 5 / 5;

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="sc-slider relative w-full h-screen min-h-[700px] bg-[#0a0b0d] text-[#f6f5f2] overflow-hidden select-none"
    >
      {/* FIXED LIEUX PAGE OVERLAY HEADER (Navbar Offset, Centered Title, Paragraph & Main CTA) */}
      <div className="absolute inset-0 z-[2000] pt-20 px-6 sm:px-12 lg:px-16 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="max-w-3xl space-y-6 flex flex-col items-center">
          <h1 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-white tracking-tight drop-shadow-2xl text-center">
            Deux lieux d’accueil, une même qualité de présence.
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-md text-center">
            Un espace pratique à Saint-Lô et un environnement plus ressourçant au bord de l'eau.
          </p>

          <div className="pt-2 pointer-events-auto">
            <button
              onClick={() => onOpenBooking('bilan-vitalite')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#8BB28A] hover:bg-[#7AA179] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2-COLUMN SPLIT CONTAINER WITH OPPOSITE CLIP-PATH REVEALS & 100VW SPLIT TITLES */}
      <div className="relative w-full h-full flex overflow-hidden">

        {/* LEFT COLUMN (sc-column sc-column--left) */}
        <div className="sc-column sc-column--left flex-1 relative h-full overflow-hidden border-r border-white/10">
          {slideIndices.map((idx) => {
            const projectN = PROJECTS[((idx - 1) % 5 + 5) % 5];
            const reveal = pos - (idx - 1);
            const progress = Math.max(0, Math.min(2, reveal));
            const clipPath = getClipPath('left', reveal);
            const imgShift = (1 - progress) * 25; // 25% drift vertically
            const copyShiftVal = (1 - getTitlePos(progress)) * 15;

            return (
              <div
                key={`left-${idx}`}
                className="sc-slide absolute inset-0 overflow-hidden"
                style={{
                  zIndex: idx + 1000,
                  clipPath: clipPath,
                }}
              >
                {/* Background Image with vertical drift + 1.25 scale */}
                <img
                  src={projectN.leftImg}
                  alt={projectN.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover will-change-transform filter brightness-[0.65] contrast-[1.08]"
                  style={{
                    transform: `translateY(${imgShift}%) scale(1.25)`,
                    transition: 'transform 0.05s linear',
                  }}
                />

                {/* Dark Vignette Gradient Overlay */}
                <div className="sc-slide__shade absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN (sc-column sc-column--right) */}
        <div className="sc-column sc-column--right flex-1 relative h-full overflow-hidden">
          {slideIndices.map((idx) => {
            const projectN = PROJECTS[((idx - 1) % 5 + 5) % 5];
            const reveal = pos - (idx - 1);
            const progress = Math.max(0, Math.min(2, reveal));
            const clipPath = getClipPath('right', reveal);
            const imgShift = (1 - progress) * 25 * -1; // -25% drift vertically (opposite)
            const copyShiftVal = (1 - getTitlePos(progress)) * 15 * -1;

            return (
              <div
                key={`right-${idx}`}
                className="sc-slide absolute inset-0 overflow-hidden"
                style={{
                  zIndex: idx + 1000,
                  clipPath: clipPath,
                }}
              >
                {/* Background Image with opposite vertical drift + 1.25 scale */}
                <img
                  src={projectN.rightImg}
                  alt={projectN.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover will-change-transform filter brightness-[0.65] contrast-[1.08]"
                  style={{
                    transform: `translateY(${imgShift}%) scale(1.25)`,
                    transition: 'transform 0.05s linear',
                  }}
                />

                {/* Dark Vignette Gradient Overlay */}
                <div className="sc-slide__shade absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 pointer-events-none" />
              </div>
            );
          })}
        </div>

      </div>

      {/* FLOATING LIGHT PROGRESS BAR ON RIGHT EDGE (sc-progress) */}
      <div className="sc-progress absolute right-5 top-1/2 -translate-y-1/2 w-[2px] h-[120px] bg-white/20 rounded-full overflow-hidden z-[2000] pointer-events-none">
        <div
          className="sc-progress__bar w-full bg-gradient-to-b from-white via-[#8BB28A] to-[#D8CFBF] rounded-full transition-transform duration-75 origin-top"
          style={{
            height: '100%',
            transform: `scaleY(${progressFraction})`,
          }}
        />
      </div>


    </section>
  );
};
