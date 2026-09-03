import React, { useEffect, useRef } from 'react';

interface FractalBloomCanvasProps {
  bgColor?: string;
  branchColorRgb?: string; // e.g. "232, 237, 231" or "174, 185, 169"
}

export const FractalBloomCanvas: React.FC<FractalBloomCanvasProps> = ({
  bgColor = 'rgba(30, 41, 34, 0.25)',
  branchColorRgb = '232, 237, 231'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight };
    let currentDepth = 0;
    const maxDepth = 9;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect ? rect.width : window.innerWidth;
      canvas.height = rect ? rect.height : window.innerHeight;
    };

    const drawBranch = (
      x: number,
      y: number,
      angle: number,
      length: number,
      depth: number
    ) => {
      if (!ctx || depth > currentDepth) return;

      ctx.beginPath();
      ctx.moveTo(x, y);

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      ctx.lineTo(endX, endY);

      const opacity = 1 - depth / maxDepth;
      ctx.strokeStyle = `rgba(${branchColorRgb}, ${opacity * 0.75})`;
      ctx.lineWidth = Math.max(0.5, 1 - (depth / maxDepth) * 0.5);
      ctx.stroke();

      // Mouse influence on branching angle
      const distToMouse = Math.hypot(endX - mouse.x, endY - mouse.y);
      const mouseEffect = Math.max(0, 1 - distToMouse / (canvas.height / 2));
      const angleOffset = (Math.PI / 8) * mouseEffect;

      drawBranch(
        endX,
        endY,
        angle - Math.PI / 10 - angleOffset,
        length * 0.8,
        depth + 1
      );
      drawBranch(
        endX,
        endY,
        angle + Math.PI / 10 + angleOffset,
        length * 0.8,
        depth + 1
      );
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = bgColor; // Fading effect for organic trailing lines
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = canvas.width / 2;
      const startY = canvas.height;
      const startLength = canvas.height / 5;

      drawBranch(startX, startY, -Math.PI / 2, startLength, 0);

      if (currentDepth < maxDepth) {
        currentDepth += 0.03;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [bgColor, branchColorRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};
