import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Clock, Sparkles, ArrowUpRight, Compass, Waves, Building2, CheckCircle2, ChevronRight, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';

interface LieuxPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onOpenBooking: (serviceId?: string, location?: string) => void;
}

export const LieuxPage: React.FC<LieuxPageProps> = ({
  onNavigateHome,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cards3dRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState<'all' | 'saint-lo' | 'chant-oiseaux'>('all');
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
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.4 + index * 0.15,
              ease: 'power3.out',
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] font-sans antialiased selection:bg-[#556B5D]/20 selection:text-[#1C1A17]">
      
      {/* 1. HERO SPLIT SECTION — EXACT FIDELITY TO SCREENSHOT 1 WITH 3D DEPTH */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row bg-[#506456] text-white overflow-hidden pt-24 lg:pt-0">
        
        {/* Left Half: Sage Green Editorial Block */}
        <div
          ref={heroLeftRef}
          className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 relative z-10 my-auto"
        >
          {/* Top Breadcrumb & Tag */}
          <div className="space-y-6 pt-4 sm:pt-6">
            <div className="gsap-hero-el flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase">
              <button
                onClick={() => onNavigateHome('#hero')}
                className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/50 pb-0.5"
              >
                ACCUEIL
              </button>
              <span className="opacity-60">—</span>
              <span className="text-white font-medium">DEUX ATMOSPHÈRES</span>
            </div>

            <span className="gsap-hero-el block font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#D8CFBF] uppercase font-semibold">
              DEUX ATMOSPHÈRES
            </span>

            {/* Display Editorial Title */}
            <h1 className="gsap-hero-el font-serif-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-normal leading-[1.10] text-white tracking-tight">
              Deux lieux d’accueil, une même qualité de présence.
            </h1>

            {/* Subtitle */}
            <p className="gsap-hero-el font-sans text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-xl">
              Un espace pratique à Saint-Lô et un environnement plus ressourçant au bord de l'eau.
            </p>
          </div>

          {/* Bottom Action Button (White Pill with Calendar Icon) */}
          <div className="gsap-hero-el pt-8 sm:pt-12">
            <button
              onClick={() => onOpenBooking('bilan-vitalite')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white text-[#1C1A17] hover:bg-[#F3ECE4] active:scale-[0.98] text-xs sm:text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#506456] transition-transform group-hover:scale-110" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>

        {/* Right Half: Visual Photo & 3D Interactive Depth Container */}
        <div
          ref={heroRightRef}
          onMouseMove={handleHeroImageMove}
          onMouseLeave={handleHeroImageLeave}
          className="w-full lg:w-1/2 min-h-[420px] sm:min-h-[520px] lg:min-h-full relative flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {/* Interactive 3D Card Container */}
          <div
            ref={imageCardRef}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            className="relative w-full h-full min-h-[420px] sm:min-h-[520px] lg:h-[88%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-500 border border-white/15 bg-[#20352B]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Main Consultation Photo by the Water */}
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
              alt="Consultation de naturopathie au bord de l'eau avec Anne-Laure Jourdan"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out ${
                isHoveringImage ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Subtle Vignette & Natural Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating 3D Depth Badge: Bottom Left */}
            <div
              className="absolute bottom-6 left-6 right-6 sm:right-auto bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-white transition-transform duration-300 pointer-events-none"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center gap-2 text-[#D8CFBF] font-mono text-[10px] tracking-widest uppercase mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Saint-Lô & Vallée de la Vire</span>
              </div>
              <p className="font-serif-editorial text-sm sm:text-base font-normal text-white">
                Cabinet professionnel & sanctuaire au fil de l'eau
              </p>
            </div>

            {/* Floating 3D Badge: Top Right */}
            <div
              className="absolute top-6 right-6 bg-white/90 text-[#1C1A17] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide shadow-lg border border-white/40 flex items-center gap-1.5"
              style={{ transform: 'translateZ(25px)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#506456] animate-pulse" />
              <span>2 atmosphères au choix</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 2 — EXACT FIDELITY TO SCREENSHOT 2 WITH EDITORIAL TYPOGRAPHY & 3D REVEAL */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context / "EN QUELQUES MOTS" */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <span className="font-mono text-xs tracking-[0.25em] text-[#736355] uppercase font-semibold block">
              EN QUELQUES MOTS
            </span>

            <p className="font-sans text-base sm:text-lg text-[#403B35] font-light leading-relaxed max-w-sm">
              Une démarche claire, individualisée et toujours située dans les limites du champ d'accompagnement.
            </p>

            <div className="pt-6 border-t border-[#E8E3DA] space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-[#605A52]">
                <CheckCircle2 className="w-4 h-4 text-[#506456]" />
                <span>Prise de rendez-vous simple & personnalisée</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#605A52]">
                <CheckCircle2 className="w-4 h-4 text-[#506456]" />
                <span>Choix du lieu lors de la confirmation</span>
              </div>
            </div>
          </div>

          {/* Right Column: 01, 02, 03 Numbered Items with Clean Dividers */}
          <div className="lg:col-span-8 space-y-0">
            
            {/* Item 01: Institut Belle et Zen — Saint-Lô */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[0] = el;
              }}
              className="py-10 sm:py-12 border-b border-[#D8CFBF]/70 group transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                <span className="sm:col-span-2 font-mono text-xs sm:text-sm tracking-widest text-[#736355] font-medium">
                  01
                </span>
                
                <div className="sm:col-span-10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                      Institut Belle et Zen — Saint-Lô
                    </h2>
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-[#506456]/10 text-[#506456] font-medium">
                      Centre-Ville
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Un environnement professionnel, pratique et confortable, dans une ambiance cohérente avec l'univers du bien-être.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#736355]">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#506456]" />
                      Consultations & Soins manuels
                    </span>
                    <span>•</span>
                    <span>Accès rapide & stationnement à proximité</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 02: Le Chant des Oiseaux */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[1] = el;
              }}
              className="py-10 sm:py-12 border-b border-[#D8CFBF]/70 group transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                <span className="sm:col-span-2 font-mono text-xs sm:text-sm tracking-widest text-[#736355] font-medium">
                  02
                </span>
                
                <div className="sm:col-span-10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                      Le Chant des Oiseaux
                    </h2>
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-[#736355]/10 text-[#736355] font-medium">
                      Bord de l'eau
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Un lieu apaisant et ressourçant au bord de l'eau, qui pourra également accueillir des ateliers lorsque leur programmation sera validée.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#736355]">
                    <span className="flex items-center gap-1.5">
                      <Waves className="w-3.5 h-3.5 text-[#506456]" />
                      Immersion naturelle & Silence
                    </span>
                    <span>•</span>
                    <span>Futur accueil d'ateliers & masterclasses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 03: Informations pratiques */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[2] = el;
              }}
              className="py-10 sm:py-12 border-b border-[#D8CFBF]/70 group transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                <span className="sm:col-span-2 font-mono text-xs sm:text-sm tracking-widest text-[#736355] font-medium">
                  03
                </span>
                
                <div className="sm:col-span-10 space-y-3">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Informations pratiques
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Les adresses précises, horaires et modalités d'accès seront ajoutés après validation par la praticienne.
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-[#736355]">
                    <a href="tel:0612345678" className="inline-flex items-center gap-1.5 hover:text-[#506456] transition-colors">
                      <Phone className="w-3.5 h-3.5 text-[#506456]" />
                      06 12 34 56 78
                    </a>
                    <a href="mailto:contact@lesracinesdubienetre.fr" className="inline-flex items-center gap-1.5 hover:text-[#506456] transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#506456]" />
                      contact@lesracinesdubienetre.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

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
                  Institut Belle et Zen
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
                  Le Chant des Oiseaux
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#1C1A17] hover:bg-[#F3ECE4] text-xs font-semibold tracking-wider uppercase shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#506456]" />
              <span>Prendre rendez-vous</span>
            </button>

            <button
              onClick={() => onNavigateHome('#hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase border border-white/20 transition-all duration-300 cursor-pointer"
            >
              <span>Retour à l'accueil</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
