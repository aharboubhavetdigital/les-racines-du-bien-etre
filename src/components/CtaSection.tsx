import React from 'react';
import { Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { LampContainer } from './ui/lamp';

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#181614] text-white relative overflow-hidden border-t border-white/10">
      <LampContainer>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
            className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#AEB9A9] block"
          >
            Cabinet & Consultations
          </motion.span>

          <motion.h2
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] text-white bg-gradient-to-b from-white via-white/95 to-[#AEB9A9] bg-clip-text text-transparent"
          >
            prendre le temps <br className="hidden sm:inline" /> de vous comprendre.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeInOut" }}
            className="font-sans text-base sm:text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Le premier rendez-vous permet de poser le cadre, d'explorer vos habits et de définir la suite adaptée.
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-[#F2F6F3] text-gray-900 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03]"
            >
              <Calendar className="w-4 h-4 text-[#55695B]" />
              <span>Prendre rendez-vous</span>
            </button>
          </motion.div>

          {/* Contact Info Quick Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
            className="pt-12 mt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/70 font-light"
          >
            <div className="flex items-center justify-center gap-2 group hover:text-white transition-colors">
              <MapPin className="w-4 h-4 text-[#AEB9A9] shrink-0" />
              <span>Saint-Lô • Le Chant des Oiseaux • Visio</span>
            </div>

            <div className="flex items-center justify-center gap-2 group hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-[#AEB9A9] shrink-0" />
              <span>+33 (0)1 42 68 90 12</span>
            </div>

            <div className="flex items-center justify-center gap-2 group hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-[#AEB9A9] shrink-0" />
              <span>contact@lesracinesdubienetre.fr</span>
            </div>
          </motion.div>

        </div>
      </LampContainer>
    </section>
  );
};

