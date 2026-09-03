import React from 'react';
import logoV5Url from '../assets/images/logo v5 .svg';
import { Instagram, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'mentions' | 'privacy') => void;
  onOpenBooking: () => void;
  onNavigate?: (page: 'home' | 'apropos' | 'boutique' | 'prestations' | 'lieux' | 'ressources', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenBooking, onNavigate }) => {
  const instagramFeed = [
    {
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
      caption: 'Rituel d’huile essentielle de sauge'
    },
    {
      img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80',
      caption: 'Réflexologie et ancrage'
    },
    {
      img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
      caption: 'Infusion des plantes du jardin'
    },
    {
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
      caption: 'Gua Sha et éclat naturel'
    }
  ];

  return (
    <footer className="bg-[#0D0C0A] border-t border-white/10 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <img
                src={logoV5Url}
                alt="Les Racines du Bien-Être"
                className="h-16 sm:h-20 w-auto object-contain brightness-0 invert"
              />
            </div>

            <p className="font-serif-editorial italic text-base text-[#AEB9A9]">
              « Naturellement en équilibre. »
            </p>

            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-sm font-light">
              Naturopathie holistique, réflexologie plantaire & faciale. Un accompagnement doux et rigoureux pour réenraciner votre vitalité.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
                aria-label="Instagram Les Racines du Bien-Être"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-white text-gray-900 text-[10px] font-semibold tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors shadow-md cursor-pointer"
              >
                Prendre RDV
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#AEB9A9]">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-sans text-xs text-white/70 font-light">
              <li>
                <button
                  onClick={() => onNavigate?.('home', '#hero')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('apropos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  À propos (Anne-Laure)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('home', '#comprendre-naturopathie')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Notre Approche
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('home', '#soins-et-suivi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Soins & Suivi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('lieux')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Les Lieux
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('ressources')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Ressources & Repères
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('home', '#faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Questions Fréquentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cabinets & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#AEB9A9]">
              Cabinets & Contact
            </h3>
            
            <div className="space-y-3 font-sans text-xs text-white/80 font-light">
              <div>
                <strong className="font-medium text-white block">Institut Belle et Zen</strong>
                <span className="text-white/60">Centre-ville, 50000 Saint-Lô</span>
              </div>

              <div>
                <strong className="font-medium text-white block">Le Chant des Oiseaux</strong>
                <span className="text-white/60">Lieu-dit Le Chant des Oiseaux, Normandie</span>
              </div>

              <div className="pt-2 space-y-1 text-white/60">
                <p>Du Lundi au Samedi : 9h00 – 19h30</p>
                <p>Sur rendez-vous uniquement</p>
              </div>
            </div>
          </div>

          {/* Col 4: Instagram Journal Preview */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#AEB9A9]">
                Instagram @lesracines
              </h3>
              <Instagram className="w-3.5 h-3.5 text-white/60" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {instagramFeed.map((item, idx) => (
                <a
                  key={idx}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl bg-white/5 border border-white/10"
                  title={item.caption}
                >
                  <img
                    src={item.img}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] text-white font-light leading-tight">
                      {item.caption}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-white/60 font-light">
          <p>© 2026 Les Racines du Bien-Être. Tous droits réservés.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('mentions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
