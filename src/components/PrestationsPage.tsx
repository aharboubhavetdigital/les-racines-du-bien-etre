import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowUpRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageStreamHero } from './ui/image-stream-hero';
import { StatementStripSection } from './StatementStripSection';
import reflexologiePlantaireNewImg from '../assets/images/reflexologie_plantaire_new.png';
import whatsAppImg from '../assets/images/WhatsApp Image 2026-08-22 .jpeg';
import firefly1Img from '../assets/images/Firefly (1).jpg';

gsap.registerPlugin(ScrollTrigger);

const PRESTATIONS_STRIP_ITEMS = [
  "Massage bien-être & Réflexologie",
  "Bilan de vitalité & Suivi sur-mesure",
  "Soins holistiques & Équilibre naturel",
  "Retrouver vitalité et sérénité",
];

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
    src: 'https://viskanspa.fr/media/cache/adv_content_block_boxed/2020/07/2502-spa-jade-5-places-pas-cher-qualite-europe-detente-massage-expedition-france.jpg',
    alt: 'Location de jacuzzi – 5 places',
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
    id: 'la-naturopathie',
    number: '01',
    category: 'Naturopathie & vitalité',
    categoryLabel: '01 · Naturopathie & vitalité',
    title: 'La naturopathie',
    description: 'Une approche holistique et naturelle pour comprendre votre terrain, restaurer votre énergie vitale et vivre en pleine santé.',
    image: 'https://www.sante-sur-le-net.com/wp-content/uploads/2018/10/naturopathie.jpg'
  },
  {
    id: 'massage-bien-etre',
    number: '02',
    category: 'Soin manuel & relaxation',
    categoryLabel: '02 · Soin manuel & relaxation',
    title: 'Massage bien-être',
    description: 'Un moment de détente manuelle adapté à votre confort, dans un cadre non thérapeutique.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'reflexologie-plantaire',
    number: '03',
    category: 'Soin manuel & relaxation',
    categoryLabel: '03 · Soin manuel & relaxation',
    title: 'Réflexologie plantaire',
    description: 'Une technique manuelle douce intégrée à une démarche globale de bien-être.',
    image: 'https://www.centre-europeen-formation.fr/wp-content/uploads/2023/12/reflexologie-plantaire.jpeg'
  },
  {
    id: 'reflexologie-faciale',
    number: '04',
    category: 'Soin manuel & relaxation',
    categoryLabel: '04 · Soin manuel & relaxation',
    title: 'Réflexologie faciale',
    description: "Une pratique manuelle proposée selon vos besoins et le cadre de l'accompagnement.",
    image: whatsAppImg
  },
  {
    id: 'bilan-de-vitalite',
    number: '05',
    category: 'Naturopathie & vitalité',
    categoryLabel: '05 · Naturopathie & vitalité',
    title: 'Bilan de vitalité',
    description: 'Le premier rendez-vous pour comprendre votre histoire, vos habitudes et vos priorités.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'programme-de-vitalite',
    number: '06',
    category: 'Naturopathie & vitalité',
    categoryLabel: '06 · Naturopathie & vitalité',
    title: 'Programme de vitalité',
    description: 'Un programme individualisé, réaliste et adapté à ce que vous pouvez mettre en place.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'suivi-personnalise',
    number: '07',
    category: 'Naturopathie & vitalité',
    categoryLabel: '07 · Naturopathie & vitalité',
    title: 'Suivi personnalisé',
    description: 'Une continuité entre les rendez-vous avec des points réguliers et des encouragements.',
    image: firefly1Img
  },
  {
    id: 'moyens-naturels',
    number: '08',
    category: 'Naturopathie & vitalité',
    categoryLabel: '08 · Naturopathie & vitalité',
    title: 'Moyens naturels & hygiène de vie',
    description: 'Alimentation, activité, gestion du stress et moyens naturels en complément.',
    image: 'https://www.katerijouveaux.com/wp-content/uploads/2022/11/naturopathie-kateri-jouveaux-antioxidants-scaled.jpg'
  },
  {
    id: 'location-jacuzzi-5-places',
    number: '09',
    category: 'Espace spa & relaxation',
    categoryLabel: '09 · Espace spa & relaxation',
    title: 'Location de jacuzzi – 5 places',
    description: 'Privatisez notre jacuzzi d’hydrothérapie 5 places pour une séance d’hydromassage, de détente et de bien-être en toute intimité.',
    image: 'https://viskanspa.fr/media/cache/adv_content_block_boxed/2020/07/2502-spa-jade-5-places-pas-cher-qualite-europe-detente-massage-expedition-france.jpg'
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
                  className="px-7 py-3.5 rounded-full bg-[#8BB28A] hover:bg-[#7AA179] text-white font-mono text-xs font-semibold tracking-[0.18em] uppercase flex items-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
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

      {/* STATEMENT STRIP — PRESTATIONS */}
      <StatementStripSection items={PRESTATIONS_STRIP_ITEMS} />

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
              const isFullWidth = index === PRESTATIONS_DATA.length - 1 && PRESTATIONS_DATA.length % 2 !== 0;
              return (
                <div
                  key={item.id}
                  id={`card-${item.id}`}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  onClick={() => handleItemClick(item)}
                  className={`group relative p-8 sm:p-10 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${isFullWidth
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
          SECTION 3 — "EN QUELQUES MOTS" (REDESIGNED FOR EASY READING & ELEGANCE)
          ========================================== */}
      <section className="w-full bg-[#F4F2EC] text-[#20352B] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-[#20352B]/10">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* HEADER */}
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#55695B] font-semibold block">
              EN QUELQUES MOTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20352B] leading-tight">
              Une démarche <span className="italic text-[#55695B] font-normal">claire</span>, progressive &amp; bienveillante.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#20352B]/80 font-light leading-relaxed max-w-2xl">
              Chaque accompagnement est conçu pour vous offrir des clés concrètes et adaptées à votre quotidien, dans un cadre sécurisant et transparent.
            </p>
          </div>

          {/* 3-CARD PROCESS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* CARD 01 */}
            <div className="bg-[#FAF8F5] border border-[#20352B]/12 p-8 sm:p-10 rounded-2xl space-y-5 shadow-xs hover:shadow-md hover:border-[#55695B]/30 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#55695B]/10 text-[#55695B] font-mono text-sm font-bold flex items-center justify-center">
                    01
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6F8275]">
                    ÉTAPE INITIALE
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#20352B]">
                  Commencer par comprendre
                </h3>
                <p className="font-sans text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Le bilan de vitalité ouvre le parcours. Il permet d'explorer en profondeur vos habitudes, votre hygiène de vie, votre rythme et les priorités que vous souhaitez soutenir.
                </p>
              </div>
              <div className="pt-4 border-t border-[#20352B]/10 font-mono text-[11px] uppercase tracking-wider text-[#55695B] font-medium">
                Écoute &amp; Analyse Globale
              </div>
            </div>

            {/* CARD 02 */}
            <div className="bg-[#FAF8F5] border border-[#20352B]/12 p-8 sm:p-10 rounded-2xl space-y-5 shadow-xs hover:shadow-md hover:border-[#55695B]/30 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#55695B]/10 text-[#55695B] font-mono text-sm font-bold flex items-center justify-center">
                    02
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6F8275]">
                    ACTION SUR-MESURE
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#20352B]">
                  Construire un programme
                </h3>
                <p className="font-sans text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Les conseils proposés sont 100% individualisés : nutrition bienveillante, gestion du stress, hygiène de sommeil, réflexologie et rituels botaniques simples.
                </p>
              </div>
              <div className="pt-4 border-t border-[#20352B]/10 font-mono text-[11px] uppercase tracking-wider text-[#55695B] font-medium">
                Recommandations Pratiques
              </div>
            </div>

            {/* CARD 03 */}
            <div className="bg-[#FAF8F5] border border-[#20352B]/12 p-8 sm:p-10 rounded-2xl space-y-5 shadow-xs hover:shadow-md hover:border-[#55695B]/30 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#55695B]/10 text-[#55695B] font-mono text-sm font-bold flex items-center justify-center">
                    03
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6F8275]">
                    SUIVI &amp; CONTINUITÉ
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#20352B]">
                  Ajuster &amp; Ancrer le bien-être
                </h3>
                <p className="font-sans text-sm text-[#20352B]/80 font-light leading-relaxed">
                  Chaque démarche s'inscrit dans la durée. Nous ajustons les conseils selon vos ressentis pour pérenniser vos habitudes en autonomie et sérénité.
                </p>
              </div>
              <div className="pt-4 border-t border-[#20352B]/10 font-mono text-[11px] uppercase tracking-wider text-[#55695B] font-medium">
                Autonomie &amp; Équilibre Durable
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 4 — FEATURE HIGHLIGHT CASE: LOCATION DE JACUZZI – 5 PLACES
          ========================================== */}
      <section id="location-jacuzzi-5-places-section" className="w-full bg-[#181D1A] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        {/* Decorative blur glow background */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#536859]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8BB28A]/15 rounded-full blur-3xl pointer-events-none translate-y-1/3 translate-x-1/3" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT IMAGE / BANNER WITH BADGE */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="https://viskanspa.fr/media/cache/adv_content_block_boxed/2020/07/2502-spa-jade-5-places-pas-cher-qualite-europe-detente-massage-expedition-france.jpg"
                  alt="Location de jacuzzi – 5 places"
                  className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181D1A]/80 via-transparent to-transparent" />
                
                {/* Floating pill badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-[#20352B]/90 backdrop-blur-md border border-white/20 rounded-full font-mono text-xs tracking-[0.2em] text-[#D6E0D3] uppercase font-semibold">
                  ✨ ESPACE SPA PRIVATIF · 5 PLACES
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D6E0D3] block mb-1">EAU CHAUFFÉE À 37,5°C &amp; HYDROTHÉRAPIE</span>
                  <p className="font-sans text-xs sm:text-sm text-white/90 font-light">Une immersion sensorielle unique pour décompresser en solo, duo ou petit groupe.</p>
                </div>
              </div>
            </div>

            {/* RIGHT DETAILS COLUMN */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#AEB9A9] font-semibold block mb-3">
                  EXPÉRIENCE SPA &amp; BIEN-ÊTRE
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight mb-4">
                  Location de jacuzzi <br />
                  <span className="italic font-normal text-[#D6E0D3]">— 5 places privatisées.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  Profitez d’un moment d’hydromassage et de relaxation absolue en toute intimité. Notre jacuzzi haut de gamme 5 places combine chromothérapie, buses de massage ciblées et eau à température idéale pour évacuer la fatigue et relâcher les tensions musculaires.
                </p>
              </div>

              {/* HIGHLIGHT POINTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#D6E0D3]">
                    <span>💧</span>
                    <span>5 Assises Ergonomiques</span>
                  </div>
                  <p className="font-sans text-xs text-white/70 font-light">Buses orientables et massages lombaires &amp; cervicales.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#D6E0D3]">
                    <span>🌿</span>
                    <span>Ambiance &amp; Aromathérapie</span>
                  </div>
                  <p className="font-sans text-xs text-white/70 font-light">Lumière d’ambiance apaisante et tisanes naturelles incluses.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#D6E0D3]">
                    <span>🔒</span>
                    <span>100% Privatif &amp; Intime</span>
                  </div>
                  <p className="font-sans text-xs text-white/70 font-light">Espace totalement dédié à votre groupe pendant le créneau.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#D6E0D3]">
                    <span>⏱️</span>
                    <span>Formules Flexibles</span>
                  </div>
                  <p className="font-sans text-xs text-white/70 font-light">Séances de 1h, 1h30 ou formules combinées avec soin.</p>
                </div>
              </div>

              {/* BOOKING BUTTON */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onOpenBooking('location-jacuzzi-5-places')}
                  className="px-8 py-4 bg-white text-[#181D1A] hover:bg-[#F2F6F3] text-xs font-semibold tracking-widest uppercase rounded-full shadow-lg transition-all cursor-pointer hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <Calendar className="w-4 h-4 text-[#506456]" />
                  <span>Réserver le jacuzzi (5 places)</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
