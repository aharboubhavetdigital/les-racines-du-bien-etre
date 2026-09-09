import React from 'react';
import { Leaf } from 'lucide-react';

interface StatementStripSectionProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "Naturellement en équilibre",
  "Comprendre son corps",
  "Avancer à son rythme",
];

export const StatementStripSection: React.FC<StatementStripSectionProps> = ({
  items = DEFAULT_ITEMS,
  className = "",
}) => {
  const phraseGroup = (
    <>
      {items.map((text, index) => (
        <React.Fragment key={index}>
          <span className="font-serif text-lg sm:text-xl tracking-[0.15em] uppercase text-white font-light">
            {text}
          </span>
          <Leaf className="w-5 h-5 text-[#D6DFD3] shrink-0 opacity-85" aria-hidden="true" />
        </React.Fragment>
      ))}
    </>
  );

  return (
    <section className={`statement-strip bg-[#5B6C5F] py-5 overflow-hidden relative border-y border-white/10 ${className}`} aria-label="Promesse">
      <div className="statement-track flex items-center gap-8 sm:gap-12 whitespace-nowrap w-max">
        {phraseGroup}
        {phraseGroup}
        {phraseGroup}
        {phraseGroup}
      </div>
    </section>
  );
};
