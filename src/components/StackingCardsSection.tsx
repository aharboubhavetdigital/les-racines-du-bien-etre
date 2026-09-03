import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  image: string;
}

const CARDS: CardData[] = [
  {
    id: '1',
    sku: 'X01-842',
    name: 'SÉRUM BOTANIQUE №01',
    subtitle: 'Élixir de Jeunesse & Nutrition Céleste',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZVldMP_sAygEX7SeD1vqxHJQlmfnCYRVRdNVwAnnSA&s=10',
  },
  {
    id: '2',
    sku: 'V9-372K',
    name: 'ELIXIR DE SÉRÉNITÉ №02',
    subtitle: 'Synergie d’Huiles Essentielles Apaisantes',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '3',
    sku: 'Z84-Q17',
    name: 'RÉFLEXOLOGIE FLORALE №03',
    subtitle: 'Soin Rituel des Points d’Ancrage Vital',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '4',
    sku: 'L56-904',
    name: 'INFUSION DE SAGE №04',
    subtitle: 'Plantes Sauvages & Détoxification Profonde',
    image: 'https://teatower.com/cdn/shop/articles/femme_bien-etre_yoga_infusion_drainante.png?v=1726831152',
  },
  {
    id: '5',
    sku: 'A23-7P1',
    name: 'BAUME NOURRISSANT №05',
    subtitle: 'Onction Organique aux Macérats Floraux',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '6',
    sku: 'T98-462',
    name: 'RITUEL SIGNATURE №06',
    subtitle: 'Harmonie Holistique Corps & Esprit',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85',
  },
];

export const StackingCardsSection: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Smooth Lenis Scroll setup
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const driveLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(driveLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.card', rootRef.current);
      const rotations = [-12, 10, -5, 5, -5, -2];

      // Initial position: park all cards below viewport
      cards.forEach((card, index) => {
        gsap.set(card, {
          y: window.innerHeight,
          rotate: rotations[index],
        });
      });

      // Pinned ScrollTrigger spanning 8 viewport-heights
      ScrollTrigger.create({
        trigger: '.sticky-cards',
        start: 'top top',
        end: () => `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = cards.length;
          const progressPerCard = 1 / totalCards;

          cards.forEach((card, index) => {
            const cardStart = index * progressPerCard;
            let cardProgress = (progress - cardStart) / progressPerCard;
            cardProgress = Math.min(Math.max(cardProgress, 0), 1);

            let yPos = window.innerHeight * (1 - cardProgress);
            let xPos = 0;

            if (cardProgress === 1 && index < totalCards - 1) {
              const remainingProgress =
                (progress - (cardStart + progressPerCard)) /
                (1 - (cardStart + progressPerCard));
              if (remainingProgress > 0) {
                const distanceMultiplier = 1 - index * 0.15;
                xPos = -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
                yPos = -window.innerHeight * 0.3 * distanceMultiplier * remainingProgress;
              }
            }

            gsap.to(card, { y: yPos, x: xPos, duration: 0, ease: 'none' });
          });
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(driveLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className="w-full relative overflow-hidden bg-[#131210]">
      {/* Dark Hero Bookend Section */}
      <section className="hero relative w-full h-screen flex flex-col justify-center items-center text-center p-6 bg-[#131210] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-4xl space-y-6 z-10 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.25em] text-[#AEB9A9] font-medium">
            Collection de Soins & Rituels
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-light leading-tight tracking-wide text-white">
            L'Élixir des Sens & la Sagesse Botanique.
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Faites défiler pour révéler les 6 formules rares et rituels botaniques élaborés au cœur de notre apothicairerie.
          </p>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-radial from-[#AEB9A9]/10 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Pinned Stage with Stacking Cards */}
      <section className="sticky-cards relative w-full h-screen overflow-hidden bg-[#e5e2dc] text-[#1c1a17]">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform w-[75%] md:w-[28%] h-[55%] md:h-[62%] p-2 md:p-3 flex flex-col gap-2 bg-[#181614] text-white rounded-2xl shadow-2xl border border-white/15"
          >
            {/* Image Container */}
            <div className="card-img flex-1 min-h-0 w-full overflow-hidden rounded-xl relative group">
              <img
                src={card.image}
                alt={card.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest text-[#AEB9A9] border border-white/10">
                {card.sku}
              </div>
            </div>

            {/* Label Bar */}
            <div className="card-content flex-none h-auto py-1 px-1 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-white font-semibold truncate">
                  {card.sku} • {card.name}
                </p>
              </div>
              <span className="font-sans text-[10px] text-white/60 truncate font-light">
                {card.subtitle}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Dark Outro Bookend Section */}
      <section className="outro relative w-full h-screen flex flex-col justify-center items-center text-center p-6 bg-[#131210] text-white overflow-hidden border-t border-white/10">
        <div className="max-w-4xl space-y-6 z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.25em] text-[#AEB9A9] font-medium">
            L'Équilibre Retrouvé
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-light leading-tight tracking-wide text-white">
            Demain, Votre Sérénité Sur Mesure.
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Prenez rendez-vous en cabinet pour une consultation naturopathique et réflexologique personnalisée.
          </p>
        </div>
      </section>
    </div>
  );
};
