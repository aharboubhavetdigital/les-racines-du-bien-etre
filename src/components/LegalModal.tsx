import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'mentions' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#343633]/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#D8CCBC] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#F5F1E8] border-b border-[#D8CCBC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#667467]" />
            <h3 className="font-serif-editorial text-2xl text-[#343633]">
              {type === 'mentions' ? 'Mentions Légales' : 'Politique de Confidentialité'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#343633]/60 hover:text-[#343633] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm text-[#343633]/85 font-light leading-relaxed">
          {type === 'mentions' ? (
            <>
              <h4 className="font-serif-editorial text-xl font-medium text-[#343633]">1. Édition du site</h4>
              <p>
                Le site internet <strong>Les Racines du Bien-Être</strong> est édité par la société ERL Les Racines du Bien-Être, cabinet de Naturopathie et Réflexologie immatriculé au RCS de Paris sous le numéro 892 410 119.
              </p>
              <p>
                Siège social : 14 Rue de la Grenelle, 75007 Paris, France.<br />
                Directrice de publication : Élise Vernier, Naturopathe agrégée FENA.<br />
                Contact : contact@lesracinesdubienetre.fr | +33 (0)1 42 68 90 12
              </p>

              <h4 className="font-serif-editorial text-xl font-medium text-[#343633] pt-2">2. Hébergement</h4>
              <p>
                Le site est hébergé sur des serveurs Cloud écologiques sécurisés situés au sein de l'Union Européenne.
              </p>

              <h4 className="font-serif-editorial text-xl font-medium text-[#343633] pt-2">3. Propriété intellectuelle</h4>
              <p>
                L'ensemble des textes, visuels éditoriaux, photographies, logos et éléments graphiques sont la propriété exclusive de la marque <strong>Les Racines du Bien-Être</strong>. Toute reproduction même partielle est strictement interdite sans accord écrit préalable.
              </p>

              <h4 className="font-serif-editorial text-xl font-medium text-[#343633] pt-2">4. Avertissement médical</h4>
              <p>
                La naturopathie et la réflexologie s'inscrivent dans une démarche de bien-être, de prévention et d'hygiène de vie. Elles ne constituent en aucun cas une médecine au sens légal et ne se substituent aucunement à un avis, un traitement ou une consultation médicale.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-serif-editorial text-xl font-medium text-[#343633]">1. Collecte des données personnelles</h4>
              <p>
                Dans le cadre de la prise de rendez-vous en ligne et des commandes sur notre apothicairerie, nous collectons des données de contact (Nom, Prénom, Email, Téléphone, Adresse) afin d'assurer l'exécution des prestations sollicitées.
              </p>

              <h4 className="font-serif-editorial text-xl font-medium text-[#343633] pt-2">2. Confidentialité & RGPD</h4>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vos données ne sont jamais vendues, cédées ni partagées à des tiers à des fins commerciales.
              </p>

              <h4 className="font-serif-editorial text-xl font-medium text-[#343633] pt-2">3. Vos droits</h4>
              <p>
                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande par courrier électronique à privacy@lesracinesdubienetre.fr.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-[#D8CCBC] text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#667467] text-[#FAF8F5] text-xs uppercase font-semibold rounded-xs"
            >
              J'ai compris
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
