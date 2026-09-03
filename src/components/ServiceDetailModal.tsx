import React from 'react';
import { Service } from '../types';
import { X, Clock, CheckCircle2, Calendar, Shield } from 'lucide-react';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onOpenBooking: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenBooking
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#181614] text-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#AEB9A9]">
            Fiche Prestation • {service.subtitle}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white">
                {service.title}
              </h2>
              <p className="font-sans text-xs text-white/60 mt-1 font-light">
                {service.subtitle}
              </p>
            </div>

            <div className="liquid-glass border border-white/10 px-4 py-3 rounded-xl text-right shrink-0">
              <span className="font-serif-editorial text-2xl font-semibold text-[#AEB9A9] block">
                {service.price} €
              </span>
              <span className="font-sans text-[11px] text-white/60 flex items-center justify-end gap-1">
                <Clock className="w-3 h-3 text-[#AEB9A9]" />
                {service.duration}
              </span>
            </div>
          </div>

          <div className="aspect-16/9 rounded-xl overflow-hidden border border-white/10">
            <img
              src={service.image}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
            />
          </div>

          {/* Quote */}
          <blockquote className="p-4 liquid-glass border-l-2 border-[#AEB9A9] font-serif-editorial italic text-base text-white/90">
            {service.quote}
          </blockquote>

          {/* Detailed Paragraph */}
          <div className="space-y-2 font-sans text-sm text-white/80 font-light leading-relaxed">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-[#AEB9A9]">
              Présentation du Soin
            </h4>
            <p>{service.fullDescription}</p>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#AEB9A9]">
              Bénéfices Attendus
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#AEB9A9] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocol Steps */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#AEB9A9]">
              Déroulement de la Séance
            </h4>
            <ol className="space-y-2">
              {service.protocolSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-white/90">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-[#AEB9A9] font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <span className="font-sans text-[11px] text-white/60 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#AEB9A9]" />
              Remboursement selon mutuelles
            </span>

            <button
              onClick={() => {
                onClose();
                onOpenBooking(service.id);
              }}
              className="px-6 py-3 bg-white hover:bg-white/90 text-gray-900 text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver cette séance</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
