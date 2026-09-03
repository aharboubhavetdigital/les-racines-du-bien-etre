import React from 'react';
import { SERVICES_DATA } from '../data/brandData';
import { Service } from '../types';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBooking
}) => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#181614] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-[#AEB9A9]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
              Nos Prestations
            </span>
            <span className="h-[1px] w-8 bg-[#AEB9A9]" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-white">
            « Un accompagnement global »
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Chaque soin ou consultation s’inscrit dans une écoute approfondie, alliant rigueur naturopathique et toucher réflexologique d’exception.
          </p>
        </div>

        {/* 4 Service Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Service Image banner */}
                <div className="relative aspect-16/9 overflow-hidden bg-white/5">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                    <span className="font-serif-editorial text-sm font-semibold text-[#AEB9A9]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Duration & Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-3">
                    <span className="font-sans text-xs font-medium text-white/80 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#AEB9A9]" />
                      {service.duration}
                    </span>
                    <span className="h-3 w-[1px] bg-white/20" />
                    <span className="font-serif-editorial text-base font-semibold text-white">
                      {service.price} €
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <div>
                    <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AEB9A9] block mb-1">
                      {service.subtitle}
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white group-hover:text-[#AEB9A9] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                    « {service.description} »
                  </p>

                  {/* Benefits highlights */}
                  <ul className="space-y-1.5 pt-2 border-t border-white/10">
                    {service.benefits.slice(0, 2).map((benefit, i) => (
                      <li key={i} className="font-sans text-xs text-white/70 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AEB9A9] mt-1 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 md:px-8 pb-6 pt-3 flex items-center justify-between border-t border-white/10 bg-white/[0.02]">
                <button
                  onClick={() => onSelectService(service)}
                  className="font-sans text-xs font-semibold tracking-wider uppercase text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Détails & protocole</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-4 py-2 bg-white text-gray-900 hover:bg-white/90 text-[11px] font-semibold tracking-widest uppercase rounded-full transition-colors shadow-md"
                >
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
