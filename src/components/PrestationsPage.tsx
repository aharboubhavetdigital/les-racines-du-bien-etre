import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageStreamHero } from './ui/image-stream-hero';

gsap.registerPlugin(ScrollTrigger);

const STREAM_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    alt: 'Massage bien-être',
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    alt: 'Réflexologie plantaire',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    alt: 'Réflexologie faciale',
  },
  {
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    alt: 'Bilan de vitalité',
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    alt: 'Programme de vitalité',
  },
  {
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    alt: 'Suivi personnalisé',
  },
  {
    src: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80',
    alt: 'Moyens naturels & hygiène de vie',
  },
  {
    src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    alt: 'Soin holistique',
  },
  {
    src: 'https://images.unsplash.com/photo-1512290900673-700200411392?auto=format&fit=crop&w=800&q=80',
    alt: 'Plantes & huiles essentielles',
  },
];

export interface PrestationItem {
  id: string;
  number: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  image: string;
}

export const PRESTATIONS_DATA: PrestationItem[] = [
  {
    id: 'massage-bien-etre',
    number: '01',
    category: 'Soin manuel & relaxation',
    categoryLabel: '01 · Soin manuel & relaxation',
    title: 'Massage bien-être',
    description: 'Un moment de détente manuelle adapté à votre confort, dans un cadre non thérapeutique.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'reflexologie-plantaire',
    number: '02',
    category: 'Soin manuel & relaxation',
    categoryLabel: '02 · Soin manuel & relaxation',
    title: 'Réflexologie plantaire',
    description: 'Une technique manuelle douce intégrée à une démarche globale de bien-être.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'reflexologie-faciale',
    number: '03',
    category: 'Soin manuel & relaxation',
    categoryLabel: '03 · Soin manuel & relaxation',
    title: 'Réflexologie faciale',
    description: "Une pratique manuelle proposée selon vos besoins et le cadre de l'accompagnement.",
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bilan-de-vitalite',
    number: '04',
    category: 'Naturopathie & vitalité',
    categoryLabel: '04 · Naturopathie & vitalité',
    title: 'Bilan de vitalité',
    description: 'Le premier rendez-vous pour comprendre votre histoire, vos habitudes et vos priorités.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'programme-de-vitalite',
    number: '05',
    category: 'Naturopathie & vitalité',
    categoryLabel: '05 · Naturopathie & vitalité',
    title: 'Programme de vitalité',
    description: 'Un programme individualisé, réaliste et adapté à ce que vous pouvez mettre en place.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'suivi-personnalise',
    number: '06',
    category: 'Naturopathie & vitalité',
    categoryLabel: '06 · Naturopathie & vitalité',
    title: 'Suivi personnalisé',
    description: 'Une continuité entre les rendez-vous avec des points réguliers et des encouragements.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'moyens-naturels',
    number: '07',
    category: 'Naturopathie & vitalité',
    categoryLabel: '07 · Naturopathie & vitalité',
    title: 'Moyens naturels & hygiène de vie',
    description: 'Alimentation, activité, gestion du stress et moyens naturels en complément.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80'
  }
];

interface PrestationsPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectPrestation?: (item: PrestationItem) => void;
  onNavigateHome?: (section?: string) => void;
}

export const PrestationsPage: React.FC<PrestationsPageProps> = ({
  onOpenBooking,
  onSelectPrestation,
  onNavigateHome
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        '.hero-anim',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

      // List item reveal
      gsap.fromTo(
        '.list-item-anim',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3
        }
      );

      // Cards reveal
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleItemClick = (prestation: PrestationItem) => {
    if (onSelectPrestation) {
      onSelectPrestation(prestation);
    } else {
      onOpenBooking(prestation.id);
    }
  };

  const scrollToPrestation = (id: string) => {
    const el = document.getElementById(`card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F8F6F1] text-[#20352B]">
      
      {/* ==========================================
          SECTION 1 — HERO & QUICK LIST (DARK SAGE GREEN BACKGROUND WITH IMAGE STREAM EFFECT)
          ========================================== */}
      <ImageStreamHero
        images={STREAM_IMAGES}
        speed={22}
        cards={9}
        className="w-full bg-[#536859] text-white pt-28 pb-20 sm:pt-36 sm:pb-28 px-6 sm:px-12 lg:px-16"
      >
        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10">
          
          {/* BREADCRUMB */}
          <div className="hero-anim mb-10 flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-white/70">
            <button
              onClick={() => onNavigateHome?.()}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ACCUEIL
            </button>
            <span>—</span>
            <span className="text-white">PRESTATIONS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start backdrop-blur-md bg-[#536859]/75 p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/15 shadow-2xl">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-8">
              <span className="hero-anim inline-block font-mono text-xs tracking-[0.3em] uppercase text-[#C5D0C2] font-medium">
                LA CARTE DES PRESTATIONS
              </span>

              <h1 className="hero-anim font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight">
                Choisir<br />
                <span className="italic font-normal text-[#D6E0D3]">l'accompagnement</span><br />
                qui vous<br />
                correspond.
              </h1>

              <p className="hero-anim font-sans text-sm sm:text-base text-white/85 font-light leading-relaxed max-w-lg">
                Massage bien-être, réflexologie, bilan et suivi : découvrez les différentes façons d'être accompagné·e, selon vos besoins et votre rythme.
              </p>

              <div className="hero-anim pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-7 py-3.5 rounded-full bg-white text-[#536859] hover:bg-[#F8F6F1] font-mono text-xs font-semibold tracking-[0.18em] uppercase flex items-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#536859]" />
                  <span>Prendre rendez-vous</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN — QUICK LIST OF ALL 7 PRESTATIONS */}
            <div className="lg:col-span-6 space-y-4">
              <div className="hero-anim pb-4 border-b border-white/20">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/75 font-medium">
                  TOUTES LES PRESTATIONS
                </span>
              </div>

              <div className="divide-y divide-white/15">
                {PRESTATIONS_DATA.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="list-item-anim group py-4 sm:py-5 flex items-center justify-between cursor-pointer transition-all duration-300 hover:px-3 hover:bg-white/10 rounded-lg"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60 block">
                        {item.number} &nbsp; {item.category.toUpperCase()}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-white group-hover:text-[#D6E0D3] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#536859] transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </ImageStreamHero>

      {/* ==========================================
          SECTION 2 — "LA CARTE COMPLÈTE" GRID (OFF-WHITE BACKGROUND)
          ========================================== */}
      <section className="w-full bg-[#F8F6F1] text-[#20352B] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-[#20352B]/10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* HEADER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-[#20352B]/15">
            <div className="lg:col-span-3">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#6F8275] font-medium block">
                LA CARTE COMPLÈTE
              </span>
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20352B] leading-tight">
                Des soins manuels<br />
                à{' '}
                <span className="italic font-normal text-[#6F8275]">
                  l'accompagnement global.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-3 lg:text-right">
              <p className="font-sans text-xs sm:text-sm text-[#20352B]/75 font-light leading-relaxed">
                Cliquez sur une prestation pour découvrir son approche, son déroulement et les modalités disponibles.
              </p>
            </div>
          </div>

          {/* GRID OF CARDS (2-COLUMNS ON DESKTOP, CARD 7 IS FULL-WIDTH) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PRESTATIONS_DATA.map((item, index) => {
              const isFullWidth = index === 6; // Item 07 spans full row
              return (
                <div
                  key={item.id}
                  id={`card-${item.id}`}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  onClick={() => handleItemClick(item)}
                  className={`group relative p-8 sm:p-10 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isFullWidth
                      ? 'md:col-span-2 bg-[#E7ECE5] border-[#20352B]/20 hover:border-[#20352B]/40 hover:shadow-xl'
                      : 'bg-white border-[#20352B]/15 hover:border-[#20352B]/40 hover:shadow-xl'
                  }`}
                >
                  {/* IMAGE THUMBNAIL / BANNER */}
                  <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden mb-8">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#20352B]/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs font-mono text-[10px] tracking-[0.2em] uppercase text-[#20352B] font-medium">
                      {item.categoryLabel}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* TOP LINE */}
                    <div className="flex items-center justify-between font-mono text-xs tracking-[0.18em] text-[#6F8275] uppercase">
                      <span>{item.number} — PRESTATION</span>
                      <div className="w-9 h-9 rounded-full border border-[#20352B]/20 flex items-center justify-center text-[#20352B] group-hover:bg-[#20352B] group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#20352B] group-hover:text-[#6F8275] transition-colors">
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="font-sans text-sm text-[#20352B]/80 font-light leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-[#20352B]/10 flex items-center justify-between font-mono text-xs tracking-[0.16em] uppercase text-[#20352B] font-medium group-hover:text-[#6F8275]">
                    <span>Découvrir la prestation</span>
                    <span className="text-lg leading-none">↗</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 3 — "EN QUELQUES MOTS"
          ========================================== */}
      <section className="w-full bg-[#F4F2EC] text-[#20352B] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-[#20352B]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT SIDE */}
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#6F8275] font-medium block">
                EN QUELQUES MOTS
              </span>
              <p className="font-sans text-sm sm:text-base text-[#20352B]/80 font-light leading-relaxed">
                Une démarche claire, individualisée et toujours située dans les limites du champ d'accompagnement.
              </p>
            </div>

            {/* RIGHT SIDE STEPS */}
            <div className="lg:col-span-8 space-y-10 divide-y divide-[#20352B]/15">
              
              {/* STEP 01 */}
              <div className="space-y-3 pt-0">
                <span className="font-mono text-xs font-semibold text-[#6F8275] block">
                  01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#20352B]">
                  Commencer par comprendre
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#20352B]/75 font-light leading-relaxed max-w-2xl">
                  Le bilan de vitalité ouvre le parcours. Il permet d'explorer vos habitudes, votre rythme et les priorités que vous souhaitez travailler.
                </p>
              </div>

              {/* STEP 02 */}
              <div className="space-y-3 pt-8">
                <span className="font-mono text-xs font-semibold text-[#6F8275] block">
                  02
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#20352B]">
                  Construire un programme réaliste
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#20352B]/75 font-light leading-relaxed max-w-2xl">
                  Les pistes proposées sont individualisées. Elles concernent notamment l'alimentation, l'activité physique, le stress, le sommeil ou la récupération.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
