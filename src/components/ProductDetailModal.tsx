import React from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Check, ShieldCheck, Leaf, Sparkles, ChevronDown, FileText, Award, PackageCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [added, setAdded] = React.useState(false);
  const [showTechSpecs, setShowTechSpecs] = React.useState(false);

  React.useEffect(() => {
    setShowTechSpecs(false);
  }, [product?.id]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = product.technicalSpecs || {
    origin: 'Laboratoire Français (Normandie)',
    certification: '100% Bio & Éco-certifié',
    packaging: 'Flacon / Contenant éco-conçu recyclable',
    conservation: 'Conserver dans un endroit sec, frais (15-25°C) et à l’abri de la lumière directe.',
    precautions: 'Tenir hors de portée des enfants. Respecter les conseils d’utilisation. Ne remplace pas une hygiène de vie équilibrée.',
    commitments: [
      'Formulation 100% pure sans additifs de synthèse ni conservateurs chimiques',
      'Testé et approuvé en cabinet holistique par nos naturopathes certifiés',
      'Ingrédients issus de l’agriculture biologique et du commerce équitable'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white text-[#344E41] rounded-2xl shadow-2xl border border-[#344E41]/20 overflow-hidden my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#344E41]/5 border-b border-[#344E41]/10 flex items-center justify-between shrink-0 gap-2">
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#344E41] truncate min-w-0">
            Fiche Produit • Apothicairerie
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#344E41]/60 hover:text-[#344E41] transition-colors cursor-pointer rounded-full hover:bg-[#344E41]/10 shrink-0"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-center">

            {/* Image */}
            <div className="aspect-square w-full max-w-[200px] sm:max-w-none mx-auto rounded-xl overflow-hidden border border-[#344E41]/15 bg-[#344E41]/5 shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.02]"
              />
            </div>

            {/* Info */}
            <div className="space-y-3.5 sm:space-y-4">
              <div>
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-[#344E41]/70 block font-semibold">
                  {product.volume}
                </span>
                <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#344E41] font-medium leading-tight">
                  {product.name}
                </h2>
                <p className="font-sans text-xs text-[#344E41]/80 mt-0.5">
                  {product.subtitle}
                </p>
              </div>

              <span className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#344E41] block">
                {product.price} €
              </span>

              <p className="font-sans text-xs text-[#344E41]/90 font-light leading-relaxed">
                {product.description}
              </p>

              <button
                onClick={handleAdd}
                className={`w-full py-3 px-4 rounded-full text-xs font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  added
                    ? 'bg-[#AEB9A9] text-[#344E41]'
                    : 'bg-[#344E41] hover:bg-[#283d33] text-white hover:shadow-lg active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#344E41]" />
                    <span>Ajouté au panier</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Ingredients & Fiche Technique Container */}
          <div className="p-3.5 sm:p-4 bg-[#344E41]/5 border border-[#344E41]/15 rounded-xl space-y-3 transition-all duration-300">
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#344E41] flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#344E41] shrink-0" />
              Ingrédients & Composition Bio
            </h4>

            {/* Ingredients Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
              {product.ingredients.map((ing, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#344E41]/10 border border-[#344E41]/20 rounded-full font-sans text-[10px] sm:text-[11px] text-[#344E41] font-medium transition-colors hover:bg-[#344E41]/20">
                  {ing}
                </span>
              ))}
            </div>

            {/* Button "Voir plus (Fiche technique)" placed cleanly below ingredients */}
            <div className="pt-1 flex justify-start sm:justify-end">
              <button
                type="button"
                onClick={() => setShowTechSpecs(!showTechSpecs)}
                className={`w-full sm:w-auto justify-center font-sans text-[11px] font-semibold tracking-wide flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-300 ease-out cursor-pointer shadow-xs group transform hover:scale-[1.02] active:scale-95 ${
                  showTechSpecs
                    ? 'bg-[#344E41]/15 hover:bg-[#344E41]/25 text-[#344E41] border border-[#344E41]/20'
                    : 'bg-[#344E41] hover:bg-[#283d33] text-white hover:shadow-md'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 transition-colors duration-300 ${showTechSpecs ? 'text-[#344E41]' : 'text-white'}`} />
                <span>{showTechSpecs ? 'Masquer la fiche' : 'Voir plus (Fiche technique)'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ease-in-out ${showTechSpecs ? 'rotate-180 text-[#344E41]' : 'text-white'}`} />
              </button>
            </div>

            {/* Fiche Technique Totale du Produit (Smooth Accordion Slide & Fade) */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                showTechSpecs
                  ? 'grid-rows-[1fr] opacity-100 mt-3.5 pt-3.5 border-t border-[#344E41]/15'
                  : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden space-y-3.5 sm:space-y-4 text-xs">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-[#344E41] font-medium">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#344E41]">
                    <FileText className="w-4 h-4 text-[#344E41] shrink-0" />
                    Fiche Technique Totale & Spécifications
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#344E41]/70 bg-[#344E41]/10 px-2 py-0.5 rounded border border-[#344E41]/15 font-mono">
                    REF-{product.id.toUpperCase().slice(0, 12)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px]">
                  <div className="p-2.5 rounded-lg bg-white border border-[#344E41]/15 space-y-0.5 transition-colors hover:bg-[#344E41]/5 shadow-xs">
                    <span className="text-[#344E41]/60 block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold">Origine & Sourcing</span>
                    <span className="text-[#344E41] font-medium">{specs.origin || 'Laboratoire Français (Normandie)'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#344E41]/15 space-y-0.5 transition-colors hover:bg-[#344E41]/5 shadow-xs">
                    <span className="text-[#344E41]/60 block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold">Certification Bio</span>
                    <span className="text-[#344E41] font-medium">{specs.certification || '100% Bio & Éco-certifié'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#344E41]/15 space-y-0.5 transition-colors hover:bg-[#344E41]/5 shadow-xs">
                    <span className="text-[#344E41]/60 block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold">Conditionnement</span>
                    <span className="text-[#344E41] font-medium">{specs.packaging || 'Verre recyclable & Encre végétale'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#344E41]/15 space-y-0.5 transition-colors hover:bg-[#344E41]/5 shadow-xs">
                    <span className="text-[#344E41]/60 block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold">Format / Contenance</span>
                    <span className="text-[#344E41] font-medium">{product.volume}</span>
                  </div>
                </div>

                <div className="space-y-1.5 p-2.5 sm:p-3 rounded-lg bg-white border border-[#344E41]/15 transition-colors hover:bg-[#344E41]/5 shadow-xs">
                  <span className="text-[#344E41] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#344E41] shrink-0" />
                    Conservation & Précautions d'emploi
                  </span>
                  <p className="text-[#344E41]/90 text-[10px] sm:text-[11px] leading-relaxed">
                    {specs.conservation || 'Conserver dans un endroit sec, frais (15-25°C) et à l’abri de la lumière directe.'} {specs.precautions || 'Tenir hors de portée des enfants. Ne pas dépasser la dose recommandée.'}
                  </p>
                </div>

                <div className="space-y-1.5 p-2.5 sm:p-3 rounded-lg bg-white border border-[#344E41]/15 transition-colors hover:bg-[#344E41]/5 shadow-xs">
                  <span className="text-[#344E41] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#344E41] shrink-0" />
                    Engagements Qualité & Traçabilité
                  </span>
                  <ul className="text-[#344E41]/90 text-[10px] sm:text-[11px] space-y-1.5 pt-0.5">
                    {(specs.commitments || [
                      'Formulation 100% pure sans additifs de synthèse ni conservateurs chimiques',
                      'Testé et approuvé en cabinet holistique par nos naturopathes certifiés',
                      'Ingrédients issus de l’agriculture biologique et du commerce équitable'
                    ]).map((comm, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <PackageCheck className="w-3.5 h-3.5 text-[#344E41] shrink-0 mt-0.5" />
                        <span>{comm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Usage advice */}
          <div className="space-y-1">
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#344E41] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#344E41] shrink-0" />
              Conseil d'Application du Cabinet
            </h4>
            <p className="font-sans text-xs text-[#344E41]/85 italic font-light">
              « {product.usage} »
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
