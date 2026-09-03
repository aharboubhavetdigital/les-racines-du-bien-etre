import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/brandData';
import { Product } from '../types';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onAddToCart,
  onQuickView
}) => {
  const [activeTab, setActiveTab] = useState<string>('tous');
  const [addedId, setAddedId] = useState<string | null>(null);

  const tabs = [
    { id: 'tous', label: 'Tous les soins' },
    { id: 'huiles', label: 'Huiles Botaniques' },
    { id: 'infusions', label: 'Infusions' },
    { id: 'accessoires', label: 'Outils de Réflexologie' },
    { id: 'elixirs', label: 'Élixirs & Baumes' }
  ];

  const filteredProducts = activeTab === 'tous'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => {
        if (activeTab === 'elixirs') return p.category === 'elixirs' || p.category === 'baumes';
        return p.category === activeTab;
      });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="boutique" className="py-24 md:py-32 bg-[#181614] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-[#AEB9A9]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#AEB9A9]">
              L'Apothicairerie Botanique
            </span>
            <span className="h-[1px] w-8 bg-[#AEB9A9]" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-white">
            « Le bien-être, jusque dans les détails. »
          </h2>

          <p className="font-sans text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            Une sélection rigoureuse d’huiles végétales pures, d’infusions médicinales et d’accessoires artisanaux élaborés pour prolonger les bienfaits de vos séances.
          </p>
        </div>

        {/* E-Commerce Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Clean Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative aspect-square overflow-hidden bg-white/5 cursor-pointer" onClick={() => onQuickView(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.05]"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestseller && (
                      <span className="bg-[#AEB9A9] text-gray-900 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md">
                        Incontournable
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                        Nouveauté
                      </span>
                    )}
                  </div>

                  {/* Quick View Hover overlay button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 hover:bg-black backdrop-blur-md text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#AEB9A9]" />
                    <span>Aperçu Rapide</span>
                  </button>
                </div>

                {/* Product Meta */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#AEB9A9] block">
                        {product.volume}
                      </span>
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif-editorial text-2xl text-white group-hover:text-[#AEB9A9] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                    </div>

                    <span className="font-serif-editorial text-2xl font-medium text-[#AEB9A9] shrink-0">
                      {product.price} €
                    </span>
                  </div>

                  <p className="font-sans text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {product.subtitle} — {product.description}
                  </p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full py-3 px-4 rounded-full text-xs font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                    addedId === product.id
                      ? 'bg-[#AEB9A9] text-gray-900'
                      : 'bg-white text-gray-900 hover:bg-white/90 shadow-md'
                  }`}
                >
                  {addedId === product.id ? (
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
          ))}
        </div>

        {/* E-commerce shipping notice */}
        <div className="mt-14 p-6 liquid-glass border border-white/10 rounded-2xl text-center font-sans text-xs text-white/70 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#AEB9A9]" />
            Livraison offerte en France dès 60€ d'achat
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>Flacons en verre ambré recyclé & ingrédients issus de l'agriculture biologique française</span>
        </div>

      </div>
    </section>
  );
};
