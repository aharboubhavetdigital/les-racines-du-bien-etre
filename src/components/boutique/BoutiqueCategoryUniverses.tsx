import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CategoryUniverse {
  id: string;
  number: string;
  title: string;
  categoryFilter: 'Compléments alimentaires' | 'Huiles' | 'Maison & rituel';
  description: string;
  image: string;
  ctaText: string;
}

const UNIVERSES: CategoryUniverse[] = [
  {
    id: 'complements',
    number: '01',
    title: 'Compléments alimentaires',
    categoryFilter: 'Compléments alimentaires',
    description: 'Des gélules et compléments naturels présentés avec clarté, précautions et transparence.',
    image: 'https://emballagemaroc.com/wp-content/uploads/2026/02/Gelules-vides-halal-pour-complements-alimentaires-Emballage-Maroc-votre-fournisseur-de-confiance.webp',
    ctaText: 'EXPLORER'
  },
  {
    id: 'huiles',
    number: '02',
    title: 'Huiles',
    categoryFilter: 'Huiles',
    description: 'Des textures sensorielles et huiles essentielles pour accompagner les gestes de bien-être.',
    image: 'https://touhafinegoce.com/wp-content/uploads/2026/07/les-meilleures-huiles-essentielles-huile-essentielle-top-10.jpg',
    ctaText: 'EXPLORER'
  },
  {
    id: 'maison-rituel',
    number: '03',
    title: 'Maison & rituel',
    categoryFilter: 'Maison & rituel',
    description: 'Des objets simples pour créer des temps de pause dans le quotidien.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'EXPLORER'
  }
];

interface BoutiqueCategoryUniversesProps {
  onSelectCategoryFilter: (category: string) => void;
}

export const BoutiqueCategoryUniverses: React.FC<BoutiqueCategoryUniversesProps> = ({
  onSelectCategoryFilter
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate heading reveal
      gsap.fromTo(
        '.universe-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Stagger entrance for category cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleUniverseClick = (categoryFilter: string) => {
    onSelectCategoryFilter(categoryFilter);
    const catalogueEl = document.getElementById('catalogue-section');
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#E7ECE5] text-[#20352B] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-[#20352B]/15"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* TOP EDITORIAL HEADING */}
        <div className="universe-heading grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-4">
          </div>

          <div className="md:col-span-8 md:text-right">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#20352B] leading-[1.15] tracking-tight">
              Choisir un produit{' '}
              <span className="italic font-normal text-[#6F8275]">
                selon votre rituel.
              </span>
            </h2>
          </div>
        </div>

        {/* 3 LARGE IMAGE CARDS IN ONE ROW WITH RESPONSIVE AUTO LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {UNIVERSES.map((universe, index) => (
            <div
              key={universe.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => handleUniverseClick(universe.categoryFilter)}
              className="group relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] rounded-2xl overflow-hidden cursor-pointer bg-[#181D1A] border border-[#20352B]/15 shadow-md flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* PARALLAX BACKGROUND IMAGE */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={universe.image}
                  alt={universe.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              </div>

              {/* TOP: CIRCULAR OUTLINE NUMBER BADGE */}
              <div className="relative z-10 flex justify-between items-center">
                <div className="w-11 h-11 rounded-full border border-white/40 backdrop-blur-xs bg-black/20 flex items-center justify-center font-mono text-xs font-semibold text-white tracking-wider">
                  {universe.number}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* BOTTOM: TITLE, DESCRIPTION, CTA */}
              <div className="relative z-10 space-y-3 sm:space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                  {universe.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-white/85 font-light leading-relaxed max-w-sm">
                  {universe.description}
                </p>

                <div className="pt-2 flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-white font-medium group-hover:text-[#AEB9A9] transition-colors">
                  <span>{universe.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
