import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 60;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 4.90;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'RACINES10' || promoCode.toUpperCase() === 'EQUILIBRE') {
      setDiscount(subtotal * 0.1);
    } else {
      alert('Code promo invalide. Essayez : RACINES10');
    }
  };

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#181614] text-white h-full shadow-2xl flex flex-col justify-between border-l border-white/15">
        
        {/* Header */}
        <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#AEB9A9]" />
            <h3 className="font-serif-editorial text-2xl text-white">
              Votre Panier
            </h3>
            <span className="font-sans text-xs font-semibold text-[#AEB9A9] bg-white/10 px-2 py-0.5 rounded-full">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shipping Progress Bar */}
        {items.length > 0 && !isOrdered && (
          <div className="px-6 py-3 bg-white/5 border-b border-white/10 space-y-1">
            <div className="flex justify-between text-[11px] font-sans text-white/70">
              {missingForFreeShipping > 0 ? (
                <span>Plus que <strong className="text-white">{missingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte</span>
              ) : (
                <span className="text-[#AEB9A9] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Livraison offerte atteinte !
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#AEB9A9] transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isOrdered ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#AEB9A9] mx-auto" />
              <h4 className="font-serif-editorial text-2xl text-white">
                Commande Validée !
              </h4>
              <p className="font-sans text-xs text-white/70 max-w-xs mx-auto">
                Merci pour votre confiance. Vos soins botaniques sont en cours de préparation dans notre apothicairerie.
              </p>
              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-white text-gray-900 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-white/90 cursor-pointer"
              >
                Poursuivre la visite
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-white/30 mx-auto stroke-[1]" />
              <p className="font-serif-editorial text-xl text-white">
                Votre panier est vide.
              </p>
              <p className="font-sans text-xs text-white/60 max-w-xs mx-auto">
                Découvrez nos huiles botaniques, infusions et outils de soins naturels.
              </p>
              <a
                href="#boutique"
                onClick={onClose}
                className="inline-block mt-2 px-6 py-2.5 bg-white text-gray-900 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-white/90 cursor-pointer"
              >
                Explorer la boutique
              </a>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-lg border border-white/10"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif-editorial text-base text-white truncate font-medium">
                    {item.product.name}
                  </h4>
                  <p className="font-sans text-[11px] text-white/60">
                    {item.product.volume} • {item.product.price} €
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center border border-white/20 bg-white/5 rounded-full">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 text-white hover:bg-white/10 rounded-full"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-sans text-xs font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 text-white hover:bg-white/10 rounded-full"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <span className="font-serif-editorial text-lg font-semibold text-[#AEB9A9]">
                  {item.product.price * item.quantity} €
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && !isOrdered && (
          <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Code promo (ex: RACINES10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 p-2 bg-white/10 border border-white/10 rounded-lg text-xs uppercase text-white placeholder-white/40 focus:outline-none focus:border-[#AEB9A9]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-xs uppercase font-semibold rounded-lg cursor-pointer transition-colors"
              >
                Appliquer
              </button>
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 font-sans text-xs text-white/70 border-t border-white/10 pt-3">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#AEB9A9] font-semibold">
                  <span>Remise (10%)</span>
                  <span>- {discount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{shippingCost === 0 ? 'Offerte' : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-serif-editorial font-bold text-white">
                <span>Total TTC</span>
                <span className="text-[#AEB9A9]">{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-white hover:bg-white/90 text-gray-900 text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Valider la commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#AEB9A9]" />
              <span>Paiement sécurisé SSL & expédition soignée sous 24h</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
