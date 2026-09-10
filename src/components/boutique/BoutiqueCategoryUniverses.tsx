import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Droplet, Home, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CategoryUniverse {
  id: string;
  number: string;
  title: string;
  categoryFilter: 'Compléments alimentaires' | 'Huiles' | 'Maison & rituel';
  description: string;
  image: string;
  icon: React.ElementType;
  buttonBg: string;
}

const UNIVERSES: CategoryUniverse[] = [
  {
    id: 'complements',
    number: '01',
    title: 'Compléments alimentaires',
    categoryFilter: 'Compléments alimentaires',
    description: 'Des gélules et compléments naturels présentés avec clarté, précautions et transparence.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=85',
    icon: Leaf,
    buttonBg: 'bg-[#3D5245] hover:bg-[#20352B]'
  },
  {
    id: 'huiles',
    number: '02',
    title: 'Huiles',
    categoryFilter: 'Huiles',
    description: 'Des textures sensorielles et huiles essentielles pour accompagner les gestes de bien-être.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85',
    icon: Droplet,
    buttonBg: 'bg-[#8C7355] hover:bg-[#735D43]'
  },
  {
    id: 'maison-rituel',
    number: '03',
    title: 'Maison & rituel',
    categoryFilter: 'Maison & rituel',
    description: 'Des objets simples pour créer des temps de pause dans le quotidien.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    icon: Home,
    buttonBg: 'bg-[#3D5245] hover:bg-[#20352B]'
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

        {/* 3 PREMIUM BOTANICAL EDITORIAL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {UNIVERSES.map((universe, index) => {
            const Icon = universe.icon;
            return (
              <div
                key={universe.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                onClick={() => handleUniverseClick(universe.categoryFilter)}
                className="group relative rounded-[20px] overflow-hidden cursor-pointer bg-[#F8F7F3] border border-[#E3DEC3]/60 shadow-xs hover:shadow-xl flex flex-col justify-between transition-all duration-450 ease-out hover:-translate-y-1.5"
              >
                {/* TOP 60% IMAGE CONTAINER */}
                <div className="relative h-[250px] sm:h-[270px] lg:h-[290px] w-full overflow-hidden rounded-t-[20px]">
                  <img
                    src={universe.image}
                    alt={universe.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter brightness-[0.96] contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {/* TOP-LEFT NUMBER BADGE */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs text-[#20352B] font-mono text-xs font-semibold flex items-center justify-center shadow-xs border border-black/5">
                    {universe.number}
                  </div>
                </div>

                {/* BOTTOM 40% CONTENT CONTAINER */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4 bg-[#F8F7F3]">
                  <div className="space-y-2.5">
                    {/* TITLE & BOTANICAL ICON */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#20352B] font-normal leading-snug">
                        {universe.title}
                      </h3>
                      <Icon className="w-6 h-6 text-[#20352B]/60 stroke-[1.25] shrink-0 mt-1" />
                    </div>

                    {/* DESCRIPTION */}
                    <p className="font-sans text-xs sm:text-sm text-[#20352B]/75 font-light leading-relaxed">
                      {universe.description}
                    </p>
                  </div>

                  {/* PILL CTA BUTTON */}
                  <div className="pt-2">
                    <button
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-mono text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-xs cursor-pointer ${universe.buttonBg}`}
                    >
                      <span>DÉCOUVRIR</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
