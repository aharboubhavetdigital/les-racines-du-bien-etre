import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface PageItem {
  leftBgImage?: string | null;
  rightBgImage?: string | null;
  leftContent?: {
    tag?: string;
    heading: string;
    description: React.ReactNode;
  } | null;
  rightContent?: {
    tag?: string;
    heading: string;
    description: React.ReactNode;
  } | null;
}

const defaultPages: PageItem[] = [
  {
    leftBgImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: '01 — LE DÉPART',
      heading: 'Après 24 ans dans l’enseignement',
      description: 'J’ai ressenti le besoin de retrouver du sens, de l’énergie et l’envie d’exercer un métier qui me ressemble davantage.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://racines-v2.vercel.app/images/reflexologie-plantaire.jpeg',
    leftContent: {
      tag: '02 — ÉQUILIBRE & APPROCHE GLOBALE',
      heading: 'Comprendre l’origine des déséquilibres',
      description: 'Stress, sommeil, irritabilité… J’avais besoin de mieux comprendre mon corps et de découvrir des solutions naturelles pour retrouver un meilleur équilibre.',
    },
    rightContent: null,
  },
  {
    leftBgImage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: '03 — AIDER, ACCOMPAGNER, TRANSMETTRE',
      heading: 'Le même fil conducteur',
      description: 'Hier auprès des enfants, aujourd’hui auprès de celles et ceux qui souhaitent mieux comprendre leur corps, retrouver leur équilibre et devenir acteurs de leur bien-être.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85',
    leftContent: {
      tag: '04 — LES RACINES DU BIEN-ÊTRE',
      heading: 'Une approche humaine & sur-mesure',
      description: 'C’est ainsi que sont nées Les Racines du Bien-Être : une approche naturelle, humaine et personnalisée pour vous aider à retrouver votre équilibre, à votre rythme.',
    },
    rightContent: null,
  },
];

interface ScrollAdventureProps {
  customPages?: PageItem[];
  className?: string;
  autoPlayInterval?: number; // In milliseconds, default 4000
}

export default function ScrollAdventure({ customPages, className = '', autoPlayInterval = 4500 }: ScrollAdventureProps) {
  const pages = customPages || defaultPages;
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 800;
  const scrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const navigateUp = () => {
    setCurrentPage((p) => (p > 1 ? p - 1 : numOfPages));
    return true;
  };

  const navigateDown = () => {
    setCurrentPage((p) => (p < numOfPages ? p + 1 : 1));
    return true;
  };

  // Automatic autoplay effect
  useEffect(() => {
    if (isHovered || autoPlayInterval <= 0) return;

    const timer = setInterval(() => {
      if (!scrolling.current) {
        scrolling.current = true;
        setCurrentPage((p) => (p < numOfPages ? p + 1 : 1));
        setTimeout(() => {
          scrolling.current = false;
        }, animTime);
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovered, numOfPages, autoPlayInterval]);

  const handleWheel = (e: WheelEvent) => {
    // Only intercept wheel if the container is currently in viewport or hovered
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    
    if (!inView && !isHovered) return;

    if (scrolling.current) {
      e.preventDefault();
      return;
    }

    if (e.deltaY > 0) {
      if (currentPage < numOfPages) {
        e.preventDefault();
        scrolling.current = true;
        navigateDown();
        setTimeout(() => (scrolling.current = false), animTime);
      }
    } else if (e.deltaY < 0) {
      if (currentPage > 1) {
        e.preventDefault();
        scrolling.current = true;
        navigateUp();
        setTimeout(() => (scrolling.current = false), animTime);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;
    if (e.key === 'ArrowUp') {
      if (currentPage > 1) {
        scrolling.current = true;
        navigateUp();
        setTimeout(() => (scrolling.current = false), animTime);
      }
    } else if (e.key === 'ArrowDown') {
      if (currentPage < numOfPages) {
        scrolling.current = true;
        navigateDown();
        setTimeout(() => (scrolling.current = false), animTime);
      }
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => handleWheel(e);
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, isHovered, numOfPages]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden h-[85vh] min-h-[600px] bg-[#16161a] select-none ${className}`}
    >
      {pages.map((page, i) => {
        const idx = i + 1;
        const isActive = currentPage === idx;
        const isPast = idx < currentPage;

        // Calculate offsets:
        // When idx < currentPage (past): left goes up (-100%), right goes down (100%)
        // When idx > currentPage (future): left stays down (100%), right stays up (-100%)
        // When idx === currentPage (active): both translate to 0
        const leftTrans = isActive
          ? 'translateY(0)'
          : isPast
          ? 'translateY(-100%)'
          : 'translateY(100%)';

        const rightTrans = isActive
          ? 'translateY(0)'
          : isPast
          ? 'translateY(100%)'
          : 'translateY(-100%)';

        return (
          <div key={idx} className="absolute inset-0 z-10">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-full lg:w-1/2 h-1/2 lg:h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] z-10"
              style={{ transform: leftTrans }}
            >
              <div
                className={`w-full h-full bg-cover bg-center bg-no-repeat relative flex flex-col justify-center ${
                  !page.leftBgImage ? 'bg-[#1a1c1a] border-r border-white/10' : ''
                }`}
                style={{
                  backgroundImage: page.leftBgImage ? `url(${page.leftBgImage})` : undefined,
                }}
              >
                {/* Dark Overlay for Image background */}
                {page.leftBgImage && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                )}

                <div className="relative z-20 flex flex-col items-center justify-center h-full text-white p-8 sm:p-12 lg:p-16 text-center max-w-xl mx-auto">
                  {page.leftContent && (
                    <>
                      {page.leftContent.tag && (
                        <span className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-[#AEB9A9] mb-4 font-semibold">
                          {page.leftContent.tag}
                        </span>
                      )}
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                        {page.leftContent.heading}
                      </h2>
                      {typeof page.leftContent.description === 'string' ? (
                        <p className="font-sans text-base sm:text-lg text-white/85 font-light leading-relaxed">
                          {page.leftContent.description}
                        </p>
                      ) : (
                        <div className="font-sans text-base sm:text-lg text-white/85 font-light leading-relaxed">
                          {page.leftContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute bottom-0 lg:top-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] z-10"
              style={{ transform: rightTrans }}
            >
              <div
                className={`w-full h-full bg-cover bg-center bg-no-repeat relative flex flex-col justify-center ${
                  !page.rightBgImage ? 'bg-[#16161a] border-l border-white/10' : ''
                }`}
                style={{
                  backgroundImage: page.rightBgImage ? `url(${page.rightBgImage})` : undefined,
                }}
              >
                {/* Dark Overlay for Image background */}
                {page.rightBgImage && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                )}

                <div className="relative z-20 flex flex-col items-center justify-center h-full text-white p-8 sm:p-12 lg:p-16 text-center max-w-xl mx-auto">
                  {page.rightContent && (
                    <>
                      {page.rightContent.tag && (
                        <span className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-[#AEB9A9] mb-4 font-semibold">
                          {page.rightContent.tag}
                        </span>
                      )}
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === 'string' ? (
                        <p className="font-sans text-base sm:text-lg text-white/85 font-light leading-relaxed">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="font-sans text-base sm:text-lg text-white/85 font-light leading-relaxed">
                          {page.rightContent.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls Overlay */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
        <button
          onClick={navigateUp}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
            currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 hover:scale-110 cursor-pointer'
          }`}
          aria-label="Page précédente"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Page Dots */}
        <div className="flex flex-col gap-2.5 my-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrolling.current) return;
                scrolling.current = true;
                setCurrentPage(i + 1);
                setTimeout(() => (scrolling.current = false), animTime);
              }}
              className={`w-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentPage === i + 1 ? 'h-7 bg-[#AEB9A9]' : 'h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Aller à la page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={navigateDown}
          disabled={currentPage === numOfPages}
          className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
            currentPage === numOfPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 hover:scale-110 cursor-pointer'
          }`}
          aria-label="Page suivante"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Page Counter Badge */}
      <div className="absolute left-8 bottom-8 z-30 font-mono text-xs tracking-[0.2em] text-white/70 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
        <span className="text-[#AEB9A9] font-bold">0{currentPage}</span> / 0{numOfPages}
      </div>
    </div>
  );
}
