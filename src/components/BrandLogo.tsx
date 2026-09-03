import React from 'react';
import logoV4Url from '../assets/images/logo v4 .svg';

export interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'original';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  showSubtitle?: boolean;
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'original',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
  showText = true,
  className = ''
}) => {
  // Height sizing for the SVG image logo
  const logoHeight = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14 md:h-16',
    lg: 'h-16 sm:h-20 md:h-24',
    xl: 'h-28 sm:h-36'
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
        src={logoV4Url}
        alt="Les Racines du Bien-Être"
        className={`${logoHeight} w-auto object-contain ${getVariantFilter()}`}
      />
    </div>
  );
};

