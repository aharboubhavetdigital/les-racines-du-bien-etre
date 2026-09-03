import React from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Check, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

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

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#181614] text-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#AEB9A9]">
            Fiche Produit • Apothicairerie
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            
            {/* Image */}
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#AEB9A9] block">
                  {product.volume}
                </span>
                <h2 className="font-serif-editorial text-3xl text-white font-medium">
                  {product.name}
                </h2>
                <p className="font-sans text-xs text-white/60 mt-0.5">
                  {product.subtitle}
                </p>
              </div>

              <span className="font-serif-editorial text-3xl font-semibold text-[#AEB9A9] block">
                {product.price} €
              </span>

              <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                {product.description}
              </p>

              <button
                onClick={handleAdd}
                className={`w-full py-3 px-4 rounded-full text-xs font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added
                    ? 'bg-[#AEB9A9] text-gray-900'
                    : 'bg-white hover:bg-white/90 text-gray-900 shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
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

          {/* Ingredients */}
          <div className="p-4 liquid-glass border border-white/10 rounded-xl space-y-2">
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#AEB9A9] flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              Ingrédients & Composition Bio
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {product.ingredients.map((ing, i) => (
                <span key={i} className="px-2.5 py-1 bg-white/10 border border-white/10 rounded-full font-sans text-[11px] text-white">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Usage advice */}
          <div className="space-y-1">
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#AEB9A9] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Conseil d'Application du Cabinet
            </h4>
            <p className="font-sans text-xs text-white/70 italic font-light">
              « {product.usage} »
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
