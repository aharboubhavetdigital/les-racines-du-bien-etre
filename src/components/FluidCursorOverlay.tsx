import React, { useEffect } from 'react';
import { splashCursor } from '../lib/splashCursor';

interface FluidCursorOverlayProps {
  color?: string;
  intensity?: number;
  curl?: number;
}

export const FluidCursorOverlay: React.FC<FluidCursorOverlayProps> = ({
  color = '#aebbaa',
  intensity = 0.22,
  curl = 12
}) => {
  useEffect(() => {
    // Mount full-page GPU Navier-Stokes fluid simulation overlay
    const fluid = splashCursor({
      color,
      intensity,
      curl,
      rainbow: false,
      splatRadius: 0.2,
      splatForce: 5800,
      densityDissipation: 2.6,
      velocityDissipation: 1.8,
      shading: true,
      zIndex: 40,
      respectReducedMotion: true
    });

    return () => {
      fluid.destroy();
    };
  }, [color, intensity, curl]);

  return null;
};
