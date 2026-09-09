import React, { useEffect, useRef } from 'react';

interface FractalBloomCanvasProps {
  bgColor?: string;
  branchColorRgb?: string; // e.g. "232, 237, 231"
  leafColorRgb?: string;   // e.g. "174, 198, 168"
}

export const FractalBloomCanvas: React.FC<FractalBloomCanvasProps> = ({
  bgColor = 'rgba(30, 41, 34, 0.25)',
  branchColorRgb = '232, 237, 231',
  leafColorRgb = '174, 198, 168'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    let currentDepth = 0;
    const maxDepth = 9;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect ? rect.width : window.innerWidth;
      canvas.height = rect ? rect.height : window.innerHeight;
    };

    // Draw a single organic leaf with smooth bezier curves
    const drawLeaf = (
      x: number,
      y: number,
      baseAngle: number,
      leafOffsetAngle: number,
      size: number,
      opacity: number,
      time: number
    ) => {
      if (!ctx || opacity <= 0) return;

      // Wind oscillation specific to this leaf location & time
      const windFlutter = Math.sin(time * 0.0025 + x * 0.02 + y * 0.02) * 0.28;
      const breezeSway = Math.cos(time * 0.0018 + x * 0.01) * 0.15;
      const finalAngle = baseAngle + leafOffsetAngle + windFlutter + breezeSway;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(finalAngle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Soft organic leaf contour
      ctx.quadraticCurveTo(size * 0.45, -size * 0.55, size * 1.15, 0);
      ctx.quadraticCurveTo(size * 0.45, size * 0.55, 0, 0);

      // Leaf fill with soft botanical translucent green
      ctx.fillStyle = `rgba(${leafColorRgb}, ${opacity * 0.65})`;
      ctx.fill();

      // Subtle delicate leaf vein highlight
      ctx.strokeStyle = `rgba(${branchColorRgb}, ${opacity * 0.35})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    const drawBranch = (
      x: number,
      y: number,
      angle: number,
      length: number,
      depth: number,
      time: number
    ) => {
      if (!ctx || depth > currentDepth) return;

      // Natural wind sway calculation per branch depth
      const windFrequency = 0.0015;
      const depthWindFactor = (depth / maxDepth) * 0.04;
      const naturalSway = Math.sin(time * windFrequency + depth * 0.6 + x * 0.005) * depthWindFactor;

      // Interactive mouse breeze influence
      const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
      const mouseEffect = Math.max(0, 1 - distToMouse / (canvas.height * 0.45));
      const mouseAngleOffset = (Math.PI / 12) * mouseEffect * (depth / maxDepth);

      const effectiveAngle = angle + naturalSway + mouseAngleOffset;

      const endX = x + Math.cos(effectiveAngle) * length;
      const endY = y + Math.sin(effectiveAngle) * length;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);

      const branchProgress = Math.min(1, Math.max(0, currentDepth - depth));
      const opacity = (1 - depth / (maxDepth + 1)) * branchProgress;

      ctx.strokeStyle = `rgba(${branchColorRgb}, ${opacity * 0.75})`;
      ctx.lineWidth = Math.max(0.5, (1 - (depth / maxDepth) * 0.55) * 1.4);
      ctx.stroke();

      // Render organic leaves on outer canopy branches (depth >= 5)
      if (depth >= 5) {
        const leafBloom = Math.min(1, Math.max(0, (currentDepth - depth) * 0.75));
        if (leafBloom > 0) {
          const leafOpacity = opacity * leafBloom;
          const leafSize = (4 + (depth - 5) * 1.8) * leafBloom;

          // Pair of leaves at branch ends
          drawLeaf(endX, endY, effectiveAngle, -Math.PI / 4, leafSize, leafOpacity, time);
          drawLeaf(endX, endY, effectiveAngle, Math.PI / 4, leafSize * 0.9, leafOpacity * 0.9, time);

          // Additional leaf at tip for higher depth
          if (depth >= 7) {
            drawLeaf(endX, endY, effectiveAngle, 0, leafSize * 1.1, leafOpacity * 0.95, time);
          }
        }
      }

      // Continue recursive branching
      const nextLength = length * 0.8;
      const spreadAngle = Math.PI / 9.5;

      drawBranch(endX, endY, effectiveAngle - spreadAngle, nextLength, depth + 1, time);
      drawBranch(endX, endY, effectiveAngle + spreadAngle, nextLength, depth + 1, time);
    };

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = canvas.width / 2;
      const startY = canvas.height;
      const startLength = canvas.height / 4.8;

      // Draw tree with animated leaves & wind
      drawBranch(startX, startY, -Math.PI / 2, startLength, 0, timestamp);

      // Progressive tree growth / bloom opening
      if (currentDepth < maxDepth) {
        currentDepth += 0.025;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [bgColor, branchColorRgb, leafColorRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};

