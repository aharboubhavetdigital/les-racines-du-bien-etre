import React from 'react';
import { Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import ScrollAdventure, { PageItem } from './ui/animated-scroll';

const customParcoursPages: PageItem[] = [
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
      description: (
        <div className="space-y-4">
          <p>
            La naturopathie s’est d’abord imposed à moi pour des raisons personnelles. Stress, sommeil, irritabilité… j’avais besoin de mieux comprendre mon corps et de découvrir des solutions naturelles pour retrouver un meilleur équilibre.
          </p>
          <blockquote className="border-l-2 border-[#AEB9A9] pl-4 py-1 italic font-serif text-white">
            « Cette formation a profondément changé ma manière de prendre soin de moi. »
          </blockquote>
        </div>
      ),
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
      description: 'Hier auprès des enfants, aujourd’hui auprès de celles et ceux qui souhaitent mieux comprendre leur corps, retrouver leur équilibre et devenir davantage acteurs de leur bien-être.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85',
    leftContent: {
      tag: '04 — LES RACINES DU BIEN-ÊTRE',
      heading: 'Une approche humaine & sur-mesure',
      description: (
        <blockquote className="font-serif italic text-xl sm:text-2xl text-white leading-relaxed">
          « C’est ainsi que sont nées Les Racines du Bien-Être : une approche naturelle, humaine et personnalisée pour vous aider à retrouver votre équilibre, à votre rythme. »
        </blockquote>
      ),
    },
    rightContent: null,
  },
];

export const PourquoiNaturopatheSection: React.FC = () => {
  return (
    <div className="w-full bg-[#16161a] text-[#f2f2f2] font-sans selection:bg-white/20 selection:text-white overflow-hidden">
      
      {/* HEADER TITLE */}
      <section className="relative w-full py-16 px-8 sm:px-16 text-center border-b border-white/10 bg-[#121215]">
        <span className="inline-block font-mono text-xs tracking-[0.3em] uppercase text-[#AEB9A9] mb-4">
          PARCOURS & VOCATION
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
          Pourquoi je suis devenue <span className="italic text-[#AEB9A9]">naturopathe ?</span>
        </h2>
      </section>

      {/* ANIMATED SCROLL ADVENTURE SPLIT-SCREEN EFFECT */}
      <section className="relative w-full">
        <ScrollAdventure customPages={customParcoursPages} />
      </section>

      {/* PILLARS SECTION */}
      <section className="relative w-full py-20 px-8 sm:px-16 bg-[#16161a] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: 'ÉCOUTE', desc: 'Prendre le temps de vous écouter vraiment.' },
            { icon: Sparkles, title: 'NATUREL', desc: 'S’appuyer sur le pouvoir du vivant et du naturel.' },
            { icon: Heart, title: 'PERSONNALISÉ', desc: 'Un accompagnement adapté à votre histoire et vos besoins.' },
            { icon: ShieldCheck, title: 'AUTONOMIE', desc: 'Vous transmettre des clés pour devenir acteur de votre bien-être.' },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#AEB9A9]/20 text-[#AEB9A9] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-[#AEB9A9] font-semibold mb-3">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

