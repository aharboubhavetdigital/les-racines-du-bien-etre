import React from 'react';
import logoV10Png from '../assets/images/logo v10.png';

export interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'original';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  showSubtitle?: boolean;
  showText?: boolean;
  useMobileV5?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'original',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
  showText = true,
  useMobileV5 = true,
  className = ''
}) => {
  // Height sizing for desktop & phone logo image
  const logoHeight = {
    sm: 'h-[40px] sm:h-16 md:h-[76px]',
    md: 'h-[52px] sm:h-20 md:h-[92px]',
    lg: 'h-[80px] sm:h-24 md:h-[110px]',
    xl: 'h-28 sm:h-36 md:h-[160px]'
  }[size];

  // Optional filter adjustments for dark vs light variants
  const getVariantFilter = () => {
    switch (variant) {
      case 'light':
        return 'brightness-[1.25] contrast-[1.1] drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]';
      case 'dark':
        return 'brightness-[0.9] contrast-[1.1]';
      case 'original':
      default:
        return 'brightness-[1.15] contrast-[1.05]';
    }
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoV10Png}
        alt="Les Racines du Bien-Être"
        className={`${logoHeight} w-auto object-contain ${getVariantFilter()}`}
      />
    </div>
  );
};


