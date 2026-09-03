import React, { useState } from 'react';
import { ARTICLES_DATA } from '../data/brandData';
import { JournalArticle } from '../types';
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react';

interface JournalSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectArticle }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const categories = [
    'Tous',
    'Alimentation',
    'Équilibre',
    'Sommeil',
    'Gestion du stress',
    'Réflexologie',
    'Hygiène de vie'
  ];

  const filteredArticles = activeCategory === 'Tous'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((art) => art.category === activeCategory);

  return (
    <section id="ressources" className="py-24 md:py-32 bg-[#131210] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-[#AEB9A9]" />
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
                Le Journal d'Équilibre
              </span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-white">
              Conseils & inspirations
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed">
            Articles de fond, rituels botaniques et recommandations de notre cabinet pour nourrir votre autonomie de santé au quotidien.
          </p>
        </div>

        {/* Magazine Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => {
            const isFeatured = idx === 0 && activeCategory === 'Tous';

            return (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/25 transition-all duration-500 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 md:flex-row' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden bg-white/5 ${
                  isFeatured ? 'md:w-1/2 aspect-4/3 md:aspect-auto' : 'aspect-16/10'
                }`}>
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.05]"
                  />
                  
                  {/* Category tag */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#AEB9A9]">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 md:p-8 flex flex-col justify-between ${
                  isFeatured ? 'md:w-1/2' : ''
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 font-sans text-[11px] text-white/60">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#AEB9A9]" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className={`font-serif-editorial text-white group-hover:text-[#AEB9A9] transition-colors ${
                      isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                    }`}>
                      {article.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-white/75 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read More Footer */}
                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#AEB9A9]">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      Lire l'article
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
