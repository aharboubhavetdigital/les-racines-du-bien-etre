import React from 'react';
import { BoutiqueFilterCategory } from '../../types';

interface TreatmentFiltersProps {
  activeCategory: BoutiqueFilterCategory;
  onSelectCategory: (category: BoutiqueFilterCategory) => void;
}

export const CATEGORIES: BoutiqueFilterCategory[] = [
  'TOUS',
  'ÉQUILIBRE',
  'DÉTENTE',
  'ÉNERGIE',
  'VISAGE',
  'CORPS',
  'ACCOMPAGNEMENT',
];

export const TreatmentFilters: React.FC<TreatmentFiltersProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section id="soins-grid" className="bg-[#F7F5F0] text-[#131210] py-16 sm:py-24 px-6 sm:px-12 border-b border-[#131210]/10">
      <div className="max-w-4xl mx-auto text-center">
        {/* SMALL LABEL */}
        <span className="inline-block text-xs font-mono font-medium tracking-[0.25em] uppercase text-[#3A4B3F] mb-4">
          PRENDRE SOIN DE SOI
        </span>

        {/* EDITORIAL HEADING */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#181D1A] leading-[1.18] mb-6">
          De quoi avez-vous <br />
          <span className="italic font-normal">besoin aujourd’hui ?</span>
        </h2>

        {/* SHORT PARAGRAPH */}
        <p className="font-sans text-base sm:text-lg text-[#181D1A]/75 font-light max-w-xl mx-auto leading-relaxed mb-12">
          Chaque période de vie est différente. Découvrez les soins qui peuvent vous accompagner
          selon vos besoins du moment.
        </p>

        {/* ELEGANT MINIMAL FILTER BUTTONS */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-3xl mx-auto">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-[#181D1A] text-white border-[#181D1A] shadow-md'
                    : 'bg-transparent text-[#181D1A]/70 border-[#181D1A]/20 hover:border-[#181D1A]/60 hover:text-[#181D1A]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
