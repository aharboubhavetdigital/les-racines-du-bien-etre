import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowUpRight, CheckCircle2, Sparkles, Compass, BookOpen, Heart, Activity, Moon, Utensils, Feather, Compass as CompassIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import CircularGallery, { CircularGalleryItem } from './ui/CircularGallery';

const CIRCULAR_GALLERY_ITEMS: CircularGalleryItem[] = [
  { image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', text: '' },
  { image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', text: '' },
  { image: 'https://images.unsplash.com/photo-1512290900676-26c2a7a795b1?auto=format&fit=crop&w=800&q=80', text: '' },
  { image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', text: '' },
  { image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', text: '' },
  { image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80', text: '' }
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
      
      {/* 1. HERO FULL-WIDTH SECTION — TEXT ON TOP & FULL SCREEN CIRCULAR GALLERY BELOW */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex flex-col justify-between bg-[#506456] text-white overflow-hidden pt-20 sm:pt-28 lg:pt-32 pb-6 sm:pb-10 lg:pb-12 px-0">
        
        {/* TOP: Responsive Editorial Text Block */}
        <div
          ref={heroLeftRef}
          className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6 lg:space-y-8 relative z-10 py-2 sm:py-6 px-6 sm:px-12"
        >
          {/* Top Tag */}
          <span className="gsap-hero-el block font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#D8CFBF] uppercase font-semibold">
            RESSOURCES
          </span>

          {/* Display Editorial Title */}
          <h1 className="gsap-hero-el font-serif-editorial text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.12] text-white tracking-tight max-w-3xl">
            Des repères pour mieux comprendre votre équilibre.
          </h1>

          {/* Bottom Action Button */}
          <div className="gsap-hero-el pt-1 sm:pt-3">
            <button
              onClick={() => onOpenBooking('bilan-vitalite')}
              className="group inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#8BB28A] hover:bg-[#7AA179] text-white active:scale-[0.98] text-xs sm:text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>

        {/* BOTTOM: Full Screen Width CircularGallery Carousel */}
        <div
          ref={heroRightRef}
          className="w-full h-[380px] sm:h-[500px] lg:h-[600px] relative flex items-center justify-center overflow-hidden my-auto"
        >
          <CircularGallery
            items={CIRCULAR_GALLERY_ITEMS}
            bend={2.5}
            textColor="#ffffff"
            borderRadius={0.06}
            scrollSpeed={2}
            scrollEase={0.04}
            autoPlay={true}
            autoSpeed={0.04}
          />
        </div>
      </section>

      {/* 2. MAIN PEDAGOGICAL CONTENT SECTION — 6 CARDS EDITORIAL GRID */}
      <section className="py-16 sm:py-24 bg-[#F8F7F3] border-t border-[#20352B]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs tracking-[0.25em] text-[#6F8275] uppercase font-bold block">
                EN QUELQUES MOTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#20352B] leading-tight">
                Des repères clairs & faciles à mettre en pratique.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#20352B]/75 font-light leading-relaxed">
                Une démarche globale, individualisée et toujours située dans les limites du champ d'accompagnement.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#506456]/10 text-[#506456] text-xs font-semibold border border-[#506456]/20">
                <CheckCircle2 className="w-4 h-4 text-[#506456]" />
                <span>Pédagogie & autonomie</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6F8275]/10 text-[#6F8275] text-xs font-semibold border border-[#6F8275]/20">
                <CheckCircle2 className="w-4 h-4 text-[#6F8275]" />
                <span>Respect de votre rythme</span>
              </div>
            </div>
          </div>

          {/* 6 Cards Grid: 3 columns x 2 rows on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 01: Observation */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[0] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={() => handleCardMouseLeave(0)}
              className="group relative bg-white rounded-[28px] p-7 sm:p-9 border border-[#20352B]/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.07)] transition-all duration-400 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#6F8275] font-bold">
                    01
                  </span>
                  <span className="font-mono text-[11px] tracking-wider px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#45584B] font-semibold border border-[#D5DDD3]">
                    Observation
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#20352B] leading-snug group-hover:text-[#506456] transition-colors">
                  Observer avant de vouloir corriger
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Pendant quelques jours, noter simplement ses horaires, ses repas, son niveau d’énergie perçu, ses pauses et ses temps de récupération peut aider à faire apparaître des régularités sans se surveiller.
                </p>
              </div>
            </div>

            {/* Card 02: Récupération */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[1] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              className="group relative bg-white rounded-[28px] p-7 sm:p-9 border border-[#20352B]/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.07)] transition-all duration-400 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#6F8275] font-bold">
                    02
                  </span>
                  <span className="font-mono text-[11px] tracking-wider px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#45584B] font-semibold border border-[#D5DDD3]">
                    Récupération
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#20352B] leading-snug group-hover:text-[#506456] transition-colors">
                  Sommeil et récupération
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#20352B]/80 font-light leading-relaxed">
                  La récupération ne dépend pas d'une seule astuce. Les horaires, la lumière, les écrans et l'environnement de la chambre peuvent être observés ensemble.
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-[#E8EDE6] text-xs text-[#20352B]/85 font-light">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#506456] shrink-0" />
                    <span>Transition activité / repos</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#506456] shrink-0" />
                    <span>Horaires réguliers & vraies pauses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 03: Équilibre */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[2] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              className="group relative bg-white rounded-[28px] p-7 sm:p-9 border border-[#20352B]/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.07)] transition-all duration-400 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#6F8275] font-bold">
                    03
                  </span>
                  <span className="font-mono text-[11px] tracking-wider px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#45584B] font-semibold border border-[#D5DDD3]">
                    Équilibre
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#20352B] leading-snug group-hover:text-[#506456] transition-colors">
                  Stress et équilibre émotionnel
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Identifier ce qui sollicite le plus, reconnaître les signaux d’alerte et mettre en place des pratiques courtes et répétables au quotidien.
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-[#E8EDE6] text-xs text-[#20352B]/85 font-light">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#506456] shrink-0" />
                    <span>Respiration et relaxation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#506456] shrink-0" />
                    <span>Pauses sans écran</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 04: Vitalité */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[3] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 3)}
              onMouseLeave={() => handleCardMouseLeave(3)}
              className="group relative bg-white rounded-[28px] p-7 sm:p-9 border border-[#20352B]/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.07)] transition-all duration-400 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#6F8275] font-bold">
                    04
                  </span>
                  <span className="font-mono text-[11px] tracking-wider px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#45584B] font-semibold border border-[#D5DDD3]">
                    Vitalité
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#20352B] leading-snug group-hover:text-[#506456] transition-colors">
                  Alimentation et hydratation
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Avant de chercher un régime idéal, observer la régularité, la variété, les sensations, le contexte des repas et l’hydratation régulière.
                </p>
              </div>
            </div>

            {/* Card 05: Mouvement */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[4] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 4)}
              onMouseLeave={() => handleCardMouseLeave(4)}
              className="group relative bg-white rounded-[28px] p-7 sm:p-9 border border-[#20352B]/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.07)] transition-all duration-400 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#6F8275] font-bold">
                    05
                  </span>
                  <span className="font-mono text-[11px] tracking-wider px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#45584B] font-semibold border border-[#D5DDD3]">
                    Mouvement
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#20352B] leading-snug group-hover:text-[#506456] transition-colors">
                  Mouvement et vie quotidienne
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Marche, mobilité douce et interruptions régulières de la sédentarité forment une base physique accessible et pérenne.
                </p>
              </div>
            </div>

            {/* Card 06: Durabilité (Highlight Dark Forest Green Card) */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[5] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, 5)}
              onMouseLeave={() => handleCardMouseLeave(5)}
              className="group relative bg-[#1D3027] text-white rounded-[28px] p-7 sm:p-9 border border-[#1D3027] shadow-[0_12px_35px_rgba(29,48,39,0.25)] hover:shadow-[0_20px_45px_rgba(29,48,39,0.35)] transition-all duration-400 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Botanical Leaf Corner Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none transition-opacity group-hover:opacity-15">
                <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                  <path d="M50 0C50 27.614 27.614 50 0 50C27.614 50 50 72.386 50 100C50 72.386 72.386 50 100 50C72.386 50 50 27.614 50 0Z" />
                </svg>
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#A8B7A7] font-bold">
                    06
                  </span>
                  <span className="font-mono text-[11px] tracking-wider px-3.5 py-1 rounded-full bg-white/10 text-white font-semibold border border-white/20">
                    Durabilité
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-white leading-snug">
                  Installer une habitude durable
                </h3>

                <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  Un changement durable est précis, simple à répéter et ancré dans un moment déjà présent dans votre journée.
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-white/15 text-xs text-white/90 font-light">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8B7A7] shrink-0" />
                    <span>Priorité unique & version minimale</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8B7A7] shrink-0" />
                    <span>Ajustements bienveillants sans perfectionnisme</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CONTINUER SECTION — ELEGANT EDITORIAL DESIGN SYSTEM CARDS */}
      <section className="py-16 sm:py-24 bg-[#E7ECE5] text-[#20352B] border-t border-[#20352B]/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
          
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-[#6F8275] uppercase font-semibold block">
                CONTINUER
              </span>
            </div>

            {/* Two Elegant Luxury Editorial Outlined Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
              
              {/* Card 1: Comprendre la naturopathie */}
              <div
                onClick={() => onNavigatePage('prestations')}
                className="group relative w-full p-7 sm:p-9 bg-[#F8F7F3] border border-[#20352B]/15 hover:border-[#20352B]/40 rounded-2xl sm:rounded-3xl text-left flex items-center justify-between transition-all duration-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="pr-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#20352B] group-hover:text-[#506456] transition-colors leading-snug">
                    Comprendre la naturopathie
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-full bg-[#20352B] text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#9EAC99] group-hover:text-[#181D1A] group-hover:scale-110 shadow-sm">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card 2: Parler de vos besoins */}
              <div
                onClick={() => onOpenBooking('bilan-vitalite')}
                className="group relative w-full p-7 sm:p-9 bg-[#F8F7F3] border border-[#20352B]/15 hover:border-[#20352B]/40 rounded-2xl sm:rounded-3xl text-left flex items-center justify-between transition-all duration-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="pr-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#20352B] group-hover:text-[#506456] transition-colors leading-snug">
                    Parler de vos besoins
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-full bg-[#20352B] text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#9EAC99] group-hover:text-[#181D1A] group-hover:scale-110 shadow-sm">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
