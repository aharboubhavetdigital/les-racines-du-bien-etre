import React, { useState } from 'react';
import { BoutiqueSoin, BoutiqueFilterCategory } from '../../types';
import { TreatmentCard } from './TreatmentCard';
import { BOUTIQUE_SOINS } from '../../data/boutiqueData';

interface TreatmentGridProps {
  activeCategory: BoutiqueFilterCategory;
  onSelectSoin: (soin: BoutiqueSoin) => void;
}

export const TreatmentGrid: React.FC<TreatmentGridProps> = ({
  activeCategory,
  onSelectSoin,
}) => {
  const filteredSoins = BOUTIQUE_SOINS.filter((soin) => {
    if (activeCategory === 'TOUS') return true;
    return soin.filterCategories.includes(activeCategory);
  });

  return (
    <section className="bg-[#F7F5F0] text-[#131210] py-12 sm:py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {filteredSoins.length === 0 ? (
          <div className="text-center py-16 text-[#181D1A]/60 font-sans text-base">
            Aucun soin ne correspond actuellement à ce critère.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
            {filteredSoins.map((soin, idx) => {
              // Stagger heights for editorial magazine feel
              const isTall = idx % 3 === 1;
              return (
                <TreatmentCard
                  key={soin.id}
                  soin={soin}
                  onSelect={onSelectSoin}
                  isTall={isTall}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
