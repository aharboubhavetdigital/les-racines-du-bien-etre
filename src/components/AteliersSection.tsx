import React from 'react';
import { Users, Calendar, Clock, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';

interface AteliersSectionProps {
  onOpenBooking?: (workshopTitle?: string) => void;
}

interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  duration: string;
  location: string;
  seatsLeft: number;
  description: string;
  image: string;
  highlights: string[];
}

const WORKSHOPS: Workshop[] = [
  {
    id: 'detox-printemps',
    title: 'Atelier Détox & Vitalité de Saison',
    subtitle: 'Rituels naturopathiques & jus de plantes fraîches',
    date: 'Samedi 28 Mars 2026',
    duration: '2h30 (10h00 - 12h30)',
    location: 'Le Chant des Oiseaux, Normandie',
    seatsLeft: 4,
    description: 'Apprenez à soutenir les émonctoires au changement de saison à travers la phytothérapie, l’alimentation vivante et des exercices simples d’autoréflexologie.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    highlights: ['Dégustation d’infusions & jus de saison', 'Livret pratique personnalisé offert', 'Groupe restreint de 8 personnes']
  },
  {
    id: 'gestion-stress',
    title: 'Cercle de Sommeil & Apaisement Nerveux',
    subtitle: 'Cohérence cardiaque, huiles essentielles & réflexologie faciale',
    date: 'Vendredi 17 Avril 2026',
    duration: '2h00 (18h30 - 20h30)',
    location: 'Institut Belle et Zen, Saint-Lô',
    seatsLeft: 3,
    description: 'Une soirée immersive d’apprentissage des gestes d’auto-massage du visage et des protocoles d’aromathérapie apaisante pour retrouver des nuits sereines.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85',
    highlights: ['Synergie d’huiles essentielles personnalisée', 'Atelier pratique de réflexologie faciale', 'Cadre intimiste et bienveillant']
  }
];

export const AteliersSection: React.FC<AteliersSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="ateliers" className="py-24 md:py-32 bg-[#131210] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Users className="w-4 h-4 text-[#AEB9A9]" />
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
                APPRENTISSAGE EN GROUPE
              </span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl font-light text-white leading-tight">
              Ateliers & Cercles Découverte.
            </h2>
          </div>

          <p className="font-sans text-sm text-white/70 font-light leading-relaxed max-w-md">
            Des moments d’échanges privilégiés en petits groupes pour expérimenter les rituels de santé naturelle et repartir avec des outils concrets au quotidien.
          </p>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {WORKSHOPS.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-[#1C1A17] rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-[#AEB9A9]/50 transition-all duration-300 shadow-xl group"
            >
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                />
                <div className="absolute top-4 left-4 bg-[#131210]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-[#AEB9A9] border border-white/10">
                  {workshop.seatsLeft} places restantes
                </div>
              </div>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#AEB9A9] uppercase tracking-widest block">
                    {workshop.subtitle}
                  </span>

                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-white">
                    {workshop.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {workshop.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#AEB9A9]" />
                      <span className="font-light">{workshop.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#AEB9A9]" />
                      <span className="font-light">{workshop.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-[#AEB9A9]" />
                      <span className="font-light">{workshop.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {workshop.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#AEB9A9] font-light">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onOpenBooking?.(workshop.title)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#617467] text-white hover:bg-[#728578] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Réserver sa place à l'atelier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
