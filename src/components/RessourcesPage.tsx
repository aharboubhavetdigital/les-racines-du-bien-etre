import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowUpRight, CheckCircle2, Sparkles, Compass, BookOpen, Heart, Activity, Moon, Utensils, Feather, Compass as CompassIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { HaloReel, type HaloReelItem } from './ui/halo-reel';

const HALO_REEL_ITEMS: HaloReelItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    alt: 'Séance de relaxation et méditation',
    title: 'ÉQUILIBRE',
    subtitle: 'Hygiène de vie'
  },
  {
    src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    alt: 'Soins naturels et huiles essentielles',
    title: 'HUILES',
    subtitle: 'Plantes & Énergies'
  },
  {
    src: 'https://images.unsplash.com/photo-1512290900676-26c2a7a795b1?auto=format&fit=crop&w=800&q=80',
    alt: 'Tisanes et phytothérapie',
    title: 'PHYTOTHÉRAPIE',
    subtitle: 'Herboristerie'
  },
  {
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    alt: 'Gestion du stress et respiration',
    title: 'SOMMEIL',
    subtitle: 'Rythmes naturels'
  },
  {
    src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    alt: 'Micronutrition et compléments',
    title: 'VITALITÉ',
    subtitle: 'Micronutrition'
  },
  {
    src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    alt: 'Feuillage vert et nature',
    title: 'HARMONIE',
    subtitle: 'Nature & Santé'
  }
];

interface RessourcesPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onNavigatePage: (page: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources', sectionId?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const RessourcesPage: React.FC<RessourcesPageProps> = ({
  onNavigateHome,
  onNavigatePage,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cards3dRef = useRef<(HTMLElement | null)[]>([]);

  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Left Content Stagger
      if (heroLeftRef.current) {
        const leftElements = heroLeftRef.current.querySelectorAll('.gsap-hero-el');
        gsap.fromTo(
          leftElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }

      // Hero Right Image Card 3D Entrance
      if (heroRightRef.current) {
        gsap.fromTo(
          heroRightRef.current,
          { opacity: 0, scale: 0.94, rotateY: -8 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.1,
            ease: 'power2.out',
            delay: 0.25,
          }
        );
      }

      // List Items Stagger
      listItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.35 + index * 0.1,
              ease: 'power3.out',
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hero Image 3D Tilt Effect
  const handleHeroImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(imageCardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1200,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleHeroImageLeave = () => {
    if (!imageCardRef.current) return;
    gsap.to(imageCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  };

  // 3D Card Interactive Tilt Effect on Mouse Move
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, cardIndex: number) => {
    const card = cards3dRef.current[cardIndex];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (cardIndex: number) => {
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
    <div ref={containerRef} className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] font-sans antialiased selection:bg-[#506456]/20 selection:text-[#1C1A17]">
      
      {/* 1. HERO SPLIT SECTION — EXACT FIDELITY TO SCREENSHOT 1 WITH 3D DEPTH */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row bg-[#506456] text-white overflow-hidden pt-24 lg:pt-0">
        
        {/* Left Half: Sage Green Editorial Block */}
        <div
          ref={heroLeftRef}
          className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 relative z-10 my-auto"
        >
          {/* Top Tag */}
          <div className="space-y-6 pt-4 sm:pt-6">
            <span className="gsap-hero-el block font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#D8CFBF] uppercase font-semibold">
              RESSOURCES
            </span>

            {/* Display Editorial Title */}
            <h1 className="gsap-hero-el font-serif-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-normal leading-[1.10] text-white tracking-tight">
              Des repères pour mieux comprendre votre équilibre.
            </h1>

            {/* Subtitle */}
            <p className="gsap-hero-el font-sans text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-xl">
              Une bibliothèque pédagogique pour observer vos habitudes, préparer vos questions et avancer par ajustements, sans diagnostic ni promesse thérapeutique.
            </p>
          </div>

          {/* Bottom Action Button (White Pill with Calendar Icon) */}
          <div className="gsap-hero-el pt-8 sm:pt-12">
            <button
              onClick={() => onOpenBooking('bilan-vitalite')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#8BB28A] hover:bg-[#7AA179] text-white active:scale-[0.98] text-xs sm:text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>

        {/* Right Half: HaloReel Orbit Auto-Animation Carousel */}
        <div
          ref={heroRightRef}
          className="w-full lg:w-1/2 min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] relative flex items-center justify-center overflow-hidden p-2 sm:p-6"
        >
          <HaloReel
            items={HALO_REEL_ITEMS}
            aria-label="Ressources et thématiques du bien-être"
            centerLabel={
              <div className="flex flex-col items-center justify-center text-center space-y-1.5 z-0 pointer-events-none px-4">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#D8CFBF] uppercase font-semibold">
                  LES RACINES
                </span>
                <span className="font-serif-editorial text-2xl sm:text-4xl font-light text-white tracking-tight leading-none drop-shadow-md">
                  Du Bien-Être
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-white/70 tracking-widest uppercase">
                  Bibliothèque Vitalité
                </span>
              </div>
            }
            cardWidth={140}
            cardHeight={190}
            minScale={0.42}
            radiusXRatio={0.38}
            radiusYRatio={0.32}
            autoPlay={true}
            holdDuration={800}
            stepDuration={900}
            pauseOnHover={false}
            draggable={false}
            showCenterLabel={true}
            className="w-full h-[450px] sm:h-[520px] lg:h-[580px]"
          />
        </div>
      </section>

      {/* 2. NUMBERED SECTIONS (01 TO 06) — EXACT REPRODUCTION OF SCREENSHOTS 2, 3, 4 */}
      {/* 2. NUMBERED SECTIONS (01 TO 06) — MODERN CARD GRID FOR HIGH READABILITY */}
      <section className="py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#D8CFBF]/60">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#506456] uppercase font-bold block">
              EN QUELQUES MOTS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1C1A17] font-normal tracking-tight">
              Des repères clairs & faciles à mettre en pratique.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#555048] font-light leading-relaxed">
              Une démarche globale, individualisée et toujours située dans les limites du champ d'accompagnement.
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#506456]/10 text-[#506456] text-xs font-medium border border-[#506456]/20">
              <CheckCircle2 className="w-4 h-4 text-[#506456]" />
              <span>Pédagogie & autonomie</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#736355]/10 text-[#736355] text-xs font-medium border border-[#736355]/20">
              <CheckCircle2 className="w-4 h-4 text-[#736355]" />
              <span>Respect de votre rythme</span>
            </div>
          </div>
        </div>

        {/* 6 Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 01: Observer */}
          <div
            ref={(el) => {
              if (el) listItemsRef.current[0] = el;
            }}
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DFD5] hover:border-[#506456] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#736355] font-bold">
                  01
                </span>
                <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-[#506456]/10 text-[#506456] font-semibold border border-[#506456]/20">
                  Observation
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors">
                Observer avant de vouloir corriger
              </h3>

              <p className="font-sans text-sm text-[#555048] font-light leading-relaxed">
                Pendant quelques jours, noter simplement ses horaires, ses repas, son niveau d'énergie perçu, ses pauses et ses temps de récupération peut aider à faire apparaître des régularités sans se surveiller.
              </p>
            </div>
          </div>

          {/* Card 02: Sommeil */}
          <div
            ref={(el) => {
              if (el) listItemsRef.current[1] = el;
            }}
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DFD5] hover:border-[#506456] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#736355] font-bold">
                  02
                </span>
                <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-[#506456]/10 text-[#506456] font-semibold border border-[#506456]/20">
                  Récupération
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors">
                Sommeil et récupération
              </h3>

              <p className="font-sans text-sm text-[#555048] font-light leading-relaxed">
                La récupération ne dépend pas d'une seule astuce. Les horaires, la lumière, les écrans et l'environnement de la chambre peuvent être observés ensemble.
              </p>

              <ul className="space-y-2 pt-3 border-t border-[#F0EBE1] text-xs text-[#555048] font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#506456] flex-shrink-0" />
                  <span>Transition activité / repos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#506456] flex-shrink-0" />
                  <span>Horaires réguliers & vraies pauses</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 03: Stress */}
          <div
            ref={(el) => {
              if (el) listItemsRef.current[2] = el;
            }}
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DFD5] hover:border-[#506456] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#736355] font-bold">
                  03
                </span>
                <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-[#506456]/10 text-[#506456] font-semibold border border-[#506456]/20">
                  Équilibre
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors">
                Stress et équilibre émotionnel
              </h3>

              <p className="font-sans text-sm text-[#555048] font-light leading-relaxed">
                Identifier ce qui sollicite le plus, reconnaître les signes d'alerte et mettre en place des pratiques courtes répétables au quotidien.
              </p>

              <ul className="space-y-2 pt-3 border-t border-[#F0EBE1] text-xs text-[#555048] font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#506456] flex-shrink-0" />
                  <span>Respiration et relaxation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#506456] flex-shrink-0" />
                  <span>Pauses sans écran</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 04: Alimentation */}
          <div
            ref={(el) => {
              if (el) listItemsRef.current[3] = el;
            }}
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DFD5] hover:border-[#506456] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#736355] font-bold">
                  04
                </span>
                <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-[#506456]/10 text-[#506456] font-semibold border border-[#506456]/20">
                  Vitalité
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors">
                Alimentation et hydratation
              </h3>

              <p className="font-sans text-sm text-[#555048] font-light leading-relaxed">
                Avant de chercher un régime idéal, observer la régularité, la variété, les sensations, le contexte des repas et l'hydratation régulière.
              </p>
            </div>
          </div>

          {/* Card 05: Mouvement */}
          <div
            ref={(el) => {
              if (el) listItemsRef.current[4] = el;
            }}
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DFD5] hover:border-[#506456] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#736355] font-bold">
                  05
                </span>
                <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-[#506456]/10 text-[#506456] font-semibold border border-[#506456]/20">
                  Mouvement
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors">
                Mouvement et vie quotidienne
              </h3>

              <p className="font-sans text-sm text-[#555048] font-light leading-relaxed">
                Marche, mobilité douce et interruptions régulières de la sédentarité forment une base physique accessible et pérenne.
              </p>
            </div>
          </div>

          {/* Card 06: Habitude durable */}
          <div
            ref={(el) => {
              if (el) listItemsRef.current[5] = el;
            }}
            className="group relative bg-[#20352B] text-white rounded-3xl p-8 sm:p-10 border border-[#20352B] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#AEB9A9] font-bold">
                  06
                </span>
                <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-white/10 text-white font-semibold border border-white/20">
                  Durabilité
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl text-white font-normal">
                Installer une habitude durable
              </h3>

              <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                Un changement durable est précis, simple à répéter et ancré dans un moment déjà présent dans votre journée.
              </p>

              <ul className="space-y-2 pt-3 border-t border-white/15 text-xs text-white/90 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB9A9] flex-shrink-0" />
                  <span>Priorité unique & version minimale</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB9A9] flex-shrink-0" />
                  <span>Ajustements bienveillants sans perfectionnisme</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION 3 — SCREENSHOT 5: "CONTINUER" CARDS WITH 3D HOVER EFFECT */}
      <section className="py-20 sm:py-28 bg-[#E3ECE5] border-t border-[#D0DDD3] text-[#1C1A17]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
          
          <div className="space-y-6">
            <span className="font-mono text-xs tracking-[0.25em] text-[#506456] uppercase font-semibold block">
              CONTINUER
            </span>

            {/* Two Rectangular Interactive Outlined Cards matching screenshot 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              
              {/* Card 1: Comprendre la naturopathie */}
              <button
                ref={(el) => {
                  if (el) cards3dRef.current[0] = el;
                }}
                onMouseMove={(e) => handleCardMouseMove(e, 0)}
                onMouseLeave={() => handleCardMouseLeave(0)}
                onClick={() => onNavigatePage('prestations')}
                className="group relative w-full p-8 sm:p-10 bg-white border border-[#2E3C32]/30 hover:border-[#2E3C32] rounded-none text-left flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="font-sans text-base sm:text-lg text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors" style={{ transform: 'translateZ(20px)' }}>
                  Comprendre la naturopathie
                </span>

                <ArrowUpRight className="w-6 h-6 text-[#1C1A17] group-hover:text-[#506456] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" style={{ transform: 'translateZ(25px)' }} />
              </button>

              {/* Card 2: Parler de vos besoins */}
              <button
                ref={(el) => {
                  if (el) cards3dRef.current[1] = el;
                }}
                onMouseMove={(e) => handleCardMouseMove(e, 1)}
                onMouseLeave={() => handleCardMouseLeave(1)}
                onClick={() => onOpenBooking('bilan-vitalite')}
                className="group relative w-full p-8 sm:p-10 bg-white border border-[#2E3C32]/30 hover:border-[#2E3C32] rounded-none text-left flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="font-sans text-base sm:text-lg text-[#1C1A17] font-normal group-hover:text-[#506456] transition-colors" style={{ transform: 'translateZ(20px)' }}>
                  Parler de vos besoins
                </span>

                <ArrowUpRight className="w-6 h-6 text-[#1C1A17] group-hover:text-[#506456] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" style={{ transform: 'translateZ(25px)' }} />
              </button>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
