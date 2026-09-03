import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowUpRight, CheckCircle2, Sparkles, Compass, BookOpen, Heart, Activity, Moon, Utensils, Feather, Compass as CompassIcon, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

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
              <span className="text-white font-medium">RESSOURCES</span>
            </div>

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
              className="group inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white text-[#1C1A17] hover:bg-[#F3ECE4] active:scale-[0.98] text-xs sm:text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#506456] transition-transform group-hover:scale-110" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>

        {/* Right Half: Visual Nature Photo & 3D Interactive Depth Container */}
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
            {/* Lush Sunlight Leaves Photography */}
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=85"
              alt="Feuillage vert baigné de lumière naturelle"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 ease-out ${
                isHoveringImage ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Subtle Vignette & Natural Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Floating 3D Depth Badge: Bottom Left */}
            <div
              className="absolute bottom-6 left-6 right-6 sm:right-auto bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-white transition-transform duration-300 pointer-events-none"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center gap-2 text-[#D8CFBF] font-mono text-[10px] tracking-widest uppercase mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bibliothèque Pédagogique</span>
              </div>
              <p className="font-serif-editorial text-sm sm:text-base font-normal text-white">
                Conseils & observations pour un quotidien équilibré
              </p>
            </div>

            {/* Floating 3D Badge: Top Right */}
            <div
              className="absolute top-6 right-6 bg-white/90 text-[#1C1A17] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide shadow-lg border border-white/40 flex items-center gap-1.5"
              style={{ transform: 'translateZ(25px)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#506456] animate-pulse" />
              <span>6 repères essentiels</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUMBERED SECTIONS (01 TO 06) — EXACT REPRODUCTION OF SCREENSHOTS 2, 3, 4 */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Column: Context / "EN QUELQUES MOTS" */}
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
                <span>Sans promesse thérapeutique infondée</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#605A52]">
                <CheckCircle2 className="w-4 h-4 text-[#506456]" />
                <span>Pédagogie et autonomisation continue</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#605A52]">
                <CheckCircle2 className="w-4 h-4 text-[#506456]" />
                <span>Respect de votre rythme individuel</span>
              </div>
            </div>
          </div>

          {/* Right Column: 01, 02, 03, 04, 05, 06 Numbered Articles */}
          <div className="lg:col-span-8 space-y-0">
            
            {/* Item 01: Observer avant de vouloir corriger */}
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
                
                <div className="sm:col-span-10 space-y-4">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Observer avant de vouloir corriger
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Pendant quelques jours, noter simplement ses horaires, ses repas, son niveau d'énergie perçu, ses pauses et ses temps de récupération peut aider à faire apparaître des régularités. Il ne s'agit pas de se surveiller, mais de mieux comprendre son propre rythme.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 02: Sommeil et récupération */}
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
                
                <div className="sm:col-span-10 space-y-4">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Sommeil et récupération
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    La récupération ne dépend pas d'une seule astuce. Les horaires, la lumière, les écrans, l'activité de la journée, l'environnement de la chambre et la transition vers le coucher peuvent être observés ensemble.
                  </p>

                  {/* Bullet points from screenshot 2 */}
                  <ul className="space-y-2 pt-2 text-sm text-[#555048] font-light">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Créer une transition entre activité et repos</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Repérer les horaires les plus réguliers</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Préserver de vrais temps de pause dans la journée</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Item 03: Stress et équilibre émotionnel */}
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
                
                <div className="sm:col-span-10 space-y-4">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Stress et équilibre émotionnel
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Le stress fait partie de la vie quotidienne. L'accompagnement peut aider à identifier ce qui sollicite le plus, les signes qui invitent à ralentir et les pratiques courtes que l'on peut réellement répéter.
                  </p>

                  {/* Bullet points from screenshot 3 */}
                  <ul className="space-y-2 pt-2 text-sm text-[#555048] font-light">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Respiration et relaxation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Moments sans sollicitation numérique</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Organisation de pauses réalistes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Soutien professionnel lorsque la situation le nécessite</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Item 04: Alimentation et hydratation */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[3] = el;
              }}
              className="py-10 sm:py-12 border-b border-[#D8CFBF]/70 group transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                <span className="sm:col-span-2 font-mono text-xs sm:text-sm tracking-widest text-[#736355] font-medium">
                  04
                </span>
                
                <div className="sm:col-span-10 space-y-4">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Alimentation et hydratation
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Avant de chercher un régime idéal, il peut être utile d'observer la régularité, la variété, les sensations, les conditions dans lesquelles on mange et l'hydratation au fil de la journée.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 05: Mouvement et vie quotidienne */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[4] = el;
              }}
              className="py-10 sm:py-12 border-b border-[#D8CFBF]/70 group transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                <span className="sm:col-span-2 font-mono text-xs sm:text-sm tracking-widest text-[#736355] font-medium">
                  05
                </span>
                
                <div className="sm:col-span-10 space-y-4">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Mouvement et vie quotidienne
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Bouger ne signifie pas forcément suivre un programme sportif exigeant. Marche, mobilité, activité choisie et interruptions régulières des longues périodes assises peuvent former une base plus accessible.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 06: Installer une habitude durable */}
            <div
              ref={(el) => {
                if (el) listItemsRef.current[5] = el;
              }}
              className="py-10 sm:py-12 border-b border-[#D8CFBF]/70 group transition-all duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                <span className="sm:col-span-2 font-mono text-xs sm:text-sm tracking-widest text-[#736355] font-medium">
                  06
                </span>
                
                <div className="sm:col-span-10 space-y-4">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1A17] font-normal tracking-tight group-hover:text-[#506456] transition-colors">
                    Installer une habitude durable
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#555048] font-light leading-relaxed">
                    Un changement a davantage de chances de s'installer lorsqu'il est précis, assez simple pour être répété et relié à un moment déjà présent dans la journée.
                  </p>

                  {/* Bullet points from screenshot 4 */}
                  <ul className="space-y-2 pt-2 text-sm text-[#555048] font-light">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Choisir une seule priorité</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Définir une version minimale</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Observer sans rechercher la perfection</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#506456] mt-2 flex-shrink-0" />
                      <span>Ajuster après quelques jours</span>
                    </li>
                  </ul>
                </div>
              </div>
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
