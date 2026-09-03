import React from 'react';
import { Calendar, HelpCircle } from 'lucide-react';

interface TreatmentStepsProps {
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
}

export const TreatmentSteps: React.FC<TreatmentStepsProps> = ({
  onOpenQuiz,
  onOpenBooking,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Écouter votre besoin',
      text: 'Fatigue, stress, tensions, besoin de prendre soin de vous… commencez par identifier ce que vous ressentez aujourd’hui.',
    },
    {
      num: '02',
      title: 'Découvrir les soins',
      text: 'Chaque approche possède sa propre intention et s’adapte à votre situation.',
    },
    {
      num: '03',
      title: 'Choisir ou demander conseil',
      text: 'Vous pouvez sélectionner directement votre soin ou me contacter pour être orienté(e).',
    },
  ];

  return (
    <section className="bg-[#F7F5F0] text-[#131210] py-20 sm:py-28 px-6 sm:px-12 border-t border-b border-[#131210]/10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-[#3A4B3F] font-semibold mb-4">
            VOUS HÉSITEZ ?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#181D1A]">
            Quel soin est fait <span className="italic font-normal">pour moi ?</span>
          </h2>
        </div>

        {/* THREE MINIMAL STEPS SEPARATED BY THIN HORIZONTAL LINES */}
        <div className="divide-y divide-[#131210]/15 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start hover:bg-[#131210]/[0.02] transition-colors px-4 rounded-xl"
            >
              <div className="md:col-span-2 text-2xl sm:text-3xl font-serif text-[#3A4B3F]/70 font-light">
                {step.num}
              </div>
              <div className="md:col-span-4 font-serif text-xl sm:text-2xl font-light text-[#181D1A]">
                {step.title}
              </div>
              <div className="md:col-span-6 font-sans text-sm sm:text-base text-[#181D1A]/75 font-light leading-relaxed">
                {step.text}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181D1A] text-white hover:bg-[#2A382E] transition-all duration-300 font-mono text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <HelpCircle className="w-4 h-4 text-[#AEB9A9]" />
            M’aider à choisir
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#181D1A]/30 text-[#181D1A] hover:bg-[#181D1A] hover:text-white transition-all duration-300 font-mono text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </section>
  );
};
