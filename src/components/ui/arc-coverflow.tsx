import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SLIDE_WIDTH = 200;
const SLIDE_HEIGHT = 275;
const SLIDE_GAP = 100;
const SLIDE_COUNT = 9;
const ARC_DEPTH = 200;
const CENTER_LIFT = 100;
const SCROLL_LERP = 0.05;

export const slideData = [
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=85",
    alt: "Massage relaxant aux huiles essentielles et fleurs fraîches",
    title: "Massage relaxant & drainant"
  },
  {
    src: "https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=800&q=85",
    alt: "Plantes médicinales, flacons de sérum naturel et herboristerie",
    title: "Phytothérapie & Plantes médicinales"
  },
  {
    src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85",
    alt: "Flacons d'huiles essentielles biologiques et fleurs de lavande",
    title: "Aromathérapie biologique"
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85",
    alt: "Séance de méditation et bilan de vitalité holistique",
    title: "Bilan de vitalité & Conseils"
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85",
    alt: "Massage holistique aux pierres chaudes de volcan",
    title: "Massages aux pierres chaudes"
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85",
    alt: "Infusion de plantes bien-être et nutrition naturelle",
    title: "Nutrition & Rééquilibrage"
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85",
    alt: "Bougies de relaxation, serviettes chaudes et huiles de soin",
    title: "Gestion du stress & Sommeil"
  },
  {
    src: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=85",
    alt: "Herbes séchées, mortier et préparation de remèdes naturels",
    title: "Soin personnalisé du corps"
  },
  {
    src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=85",
    alt: "Pierres de galet zen, bambou et harmonie naturelle",
    title: "Énergie & Harmonie naturelle"
  }
];

export const ArcCoverflowSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTitle, setActiveTitle] = useState(slideData[0].title);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slideElements = slidesRef.current.filter((el): el is HTMLDivElement => el !== null);
    if (slideElements.length !== SLIDE_COUNT) return;

    let alive = true;
    let rafId: number;
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let touchStartX = 0;
    let activeSlideIndex = -1;

    let isHovered = false;
    const AUTO_SPEED = 0.5; // pixels per frame

    const trackWidth = SLIDE_COUNT * SLIDE_GAP; // 900

    let containerWidth = container.clientWidth || window.innerWidth;
    let containerHeight = container.clientHeight || window.innerHeight;
    let containerCenterX = containerWidth / 2;
    let arcBaselineY = containerHeight * 0.38;

    const computeSlideTransform = (slideIndex: number, scrollOffset: number) => {
      let wrappedOffsetX =
        (((slideIndex * SLIDE_GAP - scrollOffset) % trackWidth) + trackWidth) % trackWidth;
      if (wrappedOffsetX > trackWidth / 2) wrappedOffsetX -= trackWidth;

      const slideCenterX = containerCenterX + wrappedOffsetX;
      const normalizedDist = (slideCenterX - containerCenterX) / (containerWidth * 0.5);
      const absDist = Math.min(Math.abs(normalizedDist), 1.3);

      const scaleFactor = Math.max(1 - absDist * 0.8, 0.25);
      const scaledWidth = SLIDE_WIDTH * scaleFactor;
      const scaledHeight = SLIDE_HEIGHT * scaleFactor;

      const clampedDist = Math.min(absDist, 1);
      const arcDropY = (1 - Math.cos(clampedDist * Math.PI)) * 0.5 * ARC_DEPTH;
      const centerLiftY = Math.max(1 - absDist * 2, 0) * CENTER_LIFT;

      return {
        x: slideCenterX - scaledWidth / 2,
        y: arcBaselineY - scaledHeight / 2 + arcDropY - centerLiftY,
        width: scaledWidth,
        height: scaledHeight,
        zIndex: Math.round((1 - absDist) * 100),
        distanceFromCenter: Math.abs(wrappedOffsetX),
      };
    };

    const layoutSlides = (scrollOffset: number) => {
      slideElements.forEach((slideEl, i) => {
        const { x, y, width, height, zIndex } = computeSlideTransform(i, scrollOffset);
        gsap.set(slideEl, { x, y, width, height, zIndex });
      });
    };

    const syncActiveTitle = (scrollOffset: number) => {
      let closestIndex = 0;
      let closestDist = Infinity;
      slideElements.forEach((_, i) => {
        const { distanceFromCenter } = computeSlideTransform(i, scrollOffset);
        if (distanceFromCenter < closestDist) {
          closestDist = distanceFromCenter;
          closestIndex = i;
        }
      });
      if (closestIndex !== activeSlideIndex) {
        activeSlideIndex = closestIndex;
        setActiveTitle(slideData[closestIndex].title);
      }
    };

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      isHovered = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      scrollTarget += (touchStartX - e.touches[0].clientX) * 1.2;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      isHovered = false;
    };

    const handleResize = () => {
      if (!container) return;
      containerWidth = container.clientWidth || window.innerWidth;
      containerHeight = container.clientHeight || window.innerHeight;
      containerCenterX = containerWidth / 2;
      arcBaselineY = containerHeight * 0.38;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Initial positioning
    layoutSlides(0);
    syncActiveTitle(0);

    const animate = () => {
      if (!alive) return;

      if (!isHovered) {
        scrollTarget += AUTO_SPEED;
      }

      scrollCurrent += (scrollTarget - scrollCurrent) * SCROLL_LERP;
      layoutSlides(scrollCurrent);
      syncActiveTitle(scrollCurrent);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(slideElements);
      gsap.set(slideElements, { clearProps: "all" });
    };
  }, []);

  return (
    <div className="w-full bg-[#181614] text-white relative py-12 overflow-hidden border-y border-white/10 select-none">
      
      {/* Masthead */}
      <header className="px-6 sm:px-12 pt-4 pb-2 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 z-20 relative pointer-events-none">
        <span className="font-serif-editorial text-xl sm:text-2xl font-semibold tracking-wide text-white">
          Univers du Soin & Massages
        </span>
        <p className="font-mono text-xs text-[#AEB9A9] tracking-[0.2em] uppercase">
          Naturopathie • Massages • Rituels Végétaux
        </p>
      </header>

      {/* Interactive Arc Slider Surface */}
      <section
        ref={containerRef}
        className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        aria-label="Galerie interactive naturopathie et massages"
      >
        {slideData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              slidesRef.current[index] = el;
            }}
            className="absolute overflow-hidden rounded-xl shadow-2xl shadow-black/70 border border-white/10 transition-shadow duration-300 group will-change-transform"
            style={{ top: 0, left: 0 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
          </div>
        ))}

        {/* Live Caption pinned near bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-center w-[90%] max-w-lg pointer-events-none">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#AEB9A9] font-mono">
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span>Rituel Selectionné</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
          </div>
          
          <p className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl text-white font-medium drop-shadow-md tracking-tight">
            {activeTitle}
          </p>
          
          <span className="text-[11px] font-mono text-white/50 tracking-wider">
            Défilement automatique • Survolez pour interrompre
          </span>
        </div>
      </section>

    </div>
  );
};
