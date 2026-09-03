import React from 'react';
import { PRACTITIONER_INFO } from '../data/brandData';
import { Award, CheckCircle2, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#181614] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Natural Editorial Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85"
                  alt="Élise Vernier — Naturopathe et Réflexologue"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                />
                
                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                  <span className="font-serif-editorial text-lg font-semibold text-white block">
                    {PRACTITIONER_INFO.name}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#AEB9A9]">
                    {PRACTITIONER_INFO.title}
                  </span>
                </div>
              </div>

              {/* Decorative Mineral Background Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-white/10 rounded-2xl -z-10 hidden sm:block pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Practitioner Story & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-[#AEB9A9]" />
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
                À Propos Du Cabinet
              </span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
              « Une approche profondément humaine. »
            </h2>

            <p className="font-sans text-base text-white/80 font-light leading-relaxed">
              {PRACTITIONER_INFO.bio}
            </p>

            {/* Practitioner Quote Box */}
            <div className="p-6 liquid-glass border-l-2 border-[#AEB9A9] rounded-r-xl">
              <p className="font-serif-editorial text-lg italic text-white/90">
                {PRACTITIONER_INFO.quote}
              </p>
            </div>

            {/* Diplomas & Certifications List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#AEB9A9] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#AEB9A9]" />
                Formations & Agrégations Certifiées
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRACTITIONER_INFO.diplomas.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#AEB9A9] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust elements */}
            <div className="pt-4 flex items-center gap-6 text-white/70 text-xs font-medium">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#AEB9A9]" />
                <span>Consultations Confidentielles</span>
              </div>
              <span className="h-4 w-[1px] bg-white/20" />
              <div>
                <span>Agréé Mutuelles Santé</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
