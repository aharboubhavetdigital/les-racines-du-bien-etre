import React, { useState } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  service?: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Élodie M.',
    role: 'Patiente depuis 1 an',
    rating: 5,
    date: 'Il y a 3 jours',
    title: 'Une prise en charge d’une grande humanité et précision',
    content: 'Accompagnement exceptionnel en naturopathie et réflexologie. Après quelques semaines d’ajustements doux et personnalisés, j’ai retrouvé un sommeil profond et une vraie énergie au quotidien.',
    verified: true,
    service: 'Naturopathie & Réflexologie',
  },
  {
    id: '2',
    author: 'Alexandre P.',
    role: 'Patient suivi',
    rating: 5,
    date: 'Il y a 1 semaine',
    title: 'Une écoute bienveillante et des conseils très ciblés',
    content: 'Les séances de massage bien-être et le bilan de vitalité sont d’une qualité rare. Une approche globale et respectueuse du rythme de chacun. Je recommande les yeux fermés.',
    verified: true,
    service: 'Massage bien-être & Bilan',
  },
  {
    id: '3',
    author: 'Sophie L.',
    role: 'Patiente',
    rating: 5,
    date: 'Il y a 2 semaines',
    title: 'Soin holistique transformateur',
    content: 'Un lieu apaisant dès qu’on franchit la porte. Le suivi personnalisé m’a permis de mieux comprendre mon digestion et de réguler mon stress avec des plantes simples et efficaces.',
    verified: true,
    service: 'Suivi personnalisé',
  },
  {
    id: '4',
    author: 'Marc-Antoine G.',
    role: 'Patient',
    rating: 5,
    date: 'Il y a 3 semaines',
    title: 'Professionnalisme et bienveillance remarquable',
    content: 'Des explications très claires sur le fonctionnement de l’organisme. On se sent écouté sans jugement. Les résultats sur mes douleurs chroniques se font ressentir rapidement.',
    verified: true,
    service: 'Réflexologie faciale',
  },
];

export function TrustpilotSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-20 bg-[#171614] border-t border-b border-[#2A2824] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00b67a]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP HEADER / TRUSTPILOT SCORE BADGE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#2A2824] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00b67a]/10 border border-[#00b67a]/25 text-[#00b67a] text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00b67a] animate-pulse" />
              Avis Clients Vérifiés
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] tracking-tight">
              La confiance de nos patients
            </h2>
            <p className="text-sm text-[#AEB9A9]/80 mt-1 font-light max-w-lg">
              Découvrez les retours d’expérience de ceux qui ont suivi un accompagnement naturopathique ou un soin en cabinet.
            </p>
          </div>

          {/* TRUSTPILOT OVERALL SCORE */}
          <div className="flex items-center gap-4 bg-[#1C1A17] p-4 sm:p-5 rounded-2xl border border-[#2A2824] shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {/* TRUSTPILOT STAR LOGO ICON */}
                <div className="bg-[#00b67a] p-1.5 rounded-xs flex items-center justify-center">
                  <Star className="w-4 h-4 fill-white text-white" />
                </div>
                <span className="font-serif text-lg font-bold text-white tracking-wide">Trustpilot</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-[#00b67a] p-1 rounded-xs">
                      <Star className="w-3 h-3 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-white ml-1">4.9 / 5</span>
              </div>
              <span className="text-[11px] text-white/50 mt-1">Basé sur +120 avis vérifiés</span>
            </div>

            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/80 hover:text-white transition-colors border border-white/10"
            >
              <span>Voir la page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* REVIEWS GRID (DESKTOP) / CAROUSEL (MOBILE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className={`bg-[#1C1A17] p-6 rounded-2xl border border-[#2A2824] hover:border-[#00b67a]/40 transition-all duration-300 flex flex-col justify-between group ${
                idx === currentIndex ? 'block' : 'hidden md:flex'
              }`}
            >
              <div>
                {/* STAR RATING */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <div key={i} className="bg-[#00b67a] p-1 rounded-xs">
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] text-white/40 font-mono">{review.date}</span>
                </div>

                {/* TITLE & CONTENT */}
                <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#AEB9A9] transition-colors">
                  « {review.title} »
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-light mb-6">
                  {review.content}
                </p>
              </div>

              {/* AUTHOR INFO */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white">{review.author}</span>
                    {review.verified && (
                      <span title="Avis vérifié" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00b67a]" />
                      </span>
                    )}
                  </div>
                  {review.service && (
                    <span className="text-[10px] text-[#AEB9A9]/70 block font-light mt-0.5">
                      {review.service}
                    </span>
                  )}
                </div>
                <Quote className="w-4 h-4 text-white/10 group-hover:text-[#00b67a]/30 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE CAROUSEL CONTROLS */}
        <div className="flex md:hidden items-center justify-between mt-6 pt-4 border-t border-[#2A2824]">
          <span className="text-xs text-white/50">
            Avis {currentIndex + 1} sur {REVIEWS.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Avis suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
