import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, CornerDownRight } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  response?: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Lucienne Joly',
    rating: 5,
    content: 'Entretien très positif et approfondi sans être intrusif pour aller au bout de sa recherche pour notre bien-être. J’ai été très en confiance et très à l’aise avec Laura. Elle a su faire ressortir en moi des choses très enfouies…',
    response: 'Merci beaucoup pour votre confiance et ce beau retour. C\'est un plaisir de vous accompagner.',
  },
  {
    id: '2',
    author: 'Claudine Montegut',
    rating: 5,
    content: 'Un grand merci à Laura pour son accompagnement et sa bienveillance. Je souffrais de constipation depuis des années. Et les laxatifs étaient mon seul recours. Après seulement 3 séances, j’ai retrouvé un transit naturel. À ce jour…',
  }
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
      {/* Background ambient glow - Google Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4285F4]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP HEADER / SCORE BADGE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#2A2824] gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] tracking-tight">
              La confiance de nos clients
            </h2>
            <p className="text-sm text-[#AEB9A9]/80 mt-1 font-light max-w-lg">
              Découvrez les retours d’expérience de ceux qui ont suivi un accompagnement naturopathique.
            </p>
          </div>

          {/* GOOGLE OVERALL SCORE */}
          <div className="flex items-center gap-4 bg-[#1C1A17] p-4 sm:p-5 rounded-2xl border border-[#2A2824] shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {/* GOOGLE LOGO ICON */}
                <div className="bg-white p-1 rounded-full flex items-center justify-center w-6 h-6">
                  <span className="font-bold text-sm text-[#4285F4]">G</span>
                </div>
                <span className="font-serif text-lg font-bold text-white tracking-wide">Avis Google</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-[#FBBC05] p-1 rounded-xs">
                      <Star className="w-3 h-3 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-white ml-1">4.7 / 5</span>
              </div>
              <span className="text-[11px] text-white/50 mt-1">Basé sur 3 avis</span>
            </div>

            <a
              href="https://www.google.com/search?q=les+racines+du+bien+etre#lrd=0xd56a1539bebb53d:0x86d678131c620bd3,1"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-xs text-[#4285F4] hover:text-[#4285F4] transition-colors border border-[#4285F4]/20"
            >
              <span>Voir sur Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* REVIEWS GRID (DESKTOP) / CAROUSEL (MOBILE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className={`bg-[#1C1A17] p-6 rounded-2xl border border-[#2A2824] hover:border-[#4285F4]/40 transition-all duration-300 flex flex-col justify-between group ${
                idx === currentIndex ? 'block' : 'hidden md:flex'
              }`}
            >
              <div>
                {/* AUTHOR & STAR RATING */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white/90">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">{review.author}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <div key={i} className="bg-[#FBBC05] p-0.5 rounded-xs">
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CONTENT */}
                <p className="text-sm text-white/80 leading-relaxed font-light mb-6">
                  « {review.content} »
                </p>

                {/* OPTIONAL RESPONSE */}
                {review.response && (
                  <div className="mt-4 pt-4 border-t border-dashed border-[#2A2824] relative">
                    <div className="flex items-center gap-2 mb-2 text-[#4285F4]/90">
                      <CornerDownRight className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Réponse de l'établissement</span>
                    </div>
                    <p className="text-xs text-white/60 pl-6 italic leading-relaxed">
                      {review.response}
                    </p>
                  </div>
                )}
              </div>

              {/* QUOTE ICON */}
              <div className="pt-4 flex justify-end">
                <Quote className="w-4 h-4 text-white/10 group-hover:text-[#4285F4]/30 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE CAROUSEL CONTROLS */}
        {REVIEWS.length > 1 && (
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
        )}

        <div className="mt-8 flex justify-center md:hidden">
            <a
              href="https://www.google.com/search?q=les+racines+du+bien+etre#lrd=0xd56a1539bebb53d:0x86d678131c620bd3,1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4285F4] text-white text-sm font-medium transition-colors w-full"
            >
              <span>Voir tous les avis Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>
        </div>

      </div>
    </section>
  );
}
