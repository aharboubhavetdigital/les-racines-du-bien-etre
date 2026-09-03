import React from 'react';
import { CurvedVideoWall } from '../ui/3d-curved-video-wall';

interface BoutiqueHeroProps {
  onDiscoverClick: () => void;
  onOpenBooking?: () => void;
}

export const BoutiqueHero: React.FC<BoutiqueHeroProps> = ({
  onDiscoverClick,
}) => {
  return (
    <section className="relative w-full bg-[#181D1A]">
      <CurvedVideoWall
        title="Boutique & Rituels"
        onDiscoverClick={onDiscoverClick}
      />
    </section>
  );
};
