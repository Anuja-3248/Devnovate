"use client";

import React, { useEffect, useRef } from "react";

export function BlockchainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Chain link definition
    function drawLink(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      angle: number,
      phase: number,
      alpha: number
    ) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      const hue1 = (200 + phase * 60 + t * 30) % 360;
      const hue2 = (hue1 + 60) % 360;
      const hue3 = (hue1 + 120) % 360;

      // Outer glow
      const glowGrad = ctx.createRadialGradient(0, 0, ry * 0.5, 0, 0, rx * 1.5);
      glowGrad.addColorStop(0, `hsla(${hue1}, 80%, 60%, ${alpha * 0.15})`);
      glowGrad.addColorStop(1, `hsla(${hue2}, 80%, 40%, 0)`);
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 1.5, ry * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Border / outer ring
      ctx.lineWidth = rx * 0.22;
      const strokeGrad = ctx.createLinearGradient(-rx, -ry, rx, ry);
      strokeGrad.addColorStop(0, `hsla(${hue1}, 90%, 75%, ${alpha})`);
      strokeGrad.addColorStop(0.3, `hsla(${hue2}, 85%, 55%, ${alpha * 0.9})`);
      strokeGrad.addColorStop(0.6, `hsla(${hue3}, 90%, 70%, ${alpha})`);
      strokeGrad.addColorStop(1, `hsla(${hue1}, 85%, 60%, ${alpha * 0.8})`);
      ctx.strokeStyle = strokeGrad;
      ctx.shadowColor = `hsla(${hue1}, 100%, 70%, ${alpha * 0.7})`;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner sheen
      ctx.shadowBlur = 0;
      ctx.lineWidth = rx * 0.07;
      const sheenGrad = ctx.createLinearGradient(-rx, -ry * 0.3, rx * 0.5, ry * 0.5);
      sheenGrad.addColorStop(0, `hsla(${hue2}, 100%, 95%, ${alpha * 0.6})`);
      sheenGrad.addColorStop(0.5, `hsla(${hue3}, 80%, 70%, ${alpha * 0.2})`);
      sheenGrad.addColorStop(1, `hsla(${hue1}, 100%, 80%, ${alpha * 0.4})`);
      ctx.strokeStyle = sheenGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 0.72, ry * 0.72, Math.PI * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Highlight dot
      const hlGrad = ctx.createRadialGradient(-rx * 0.3, -ry * 0.5, 0, -rx * 0.3, -ry * 0.5, rx * 0.3);
      hlGrad.addColorStop(0, `hsla(${hue1}, 100%, 98%, ${alpha * 0.8})`);
      hlGrad.addColorStop(1, `hsla(${hue1}, 100%, 90%, 0)`);
      ctx.fillStyle = hlGrad;
      ctx.beginPath();
      ctx.ellipse(-rx * 0.3, -ry * 0.5, rx * 0.3, ry * 0.25, Math.PI * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function render() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Dark background radial
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
      bg.addColorStop(0, "rgba(15,5,30,0.0)");
      bg.addColorStop(1, "rgba(5,0,15,0.0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Chain parameters
      const linkRx = Math.min(W * 0.1, 130);
      const linkRy = linkRx * 0.42;
      const spacing = linkRx * 1.62;
      const numLinks = Math.ceil(W / spacing) + 3;
      const chainY = H * 0.5;
      const offsetX = -linkRx + ((t * 40) % spacing);

      // Draw chain links in alternating orientation (horizontal then vertical)
      for (let i = -1; i < numLinks; i++) {
        const x = i * spacing - offsetX;
        const isVertical = i % 2 !== 0;
        const angle = isVertical ? Math.PI / 2 : 0;
        // Depth oscillation
        const depthPhase = Math.sin(t * 0.7 + i * 0.9);
        const scale = 0.85 + depthPhase * 0.15;
        const yOff = depthPhase * linkRy * 0.18;
        const alpha = 0.75 + depthPhase * 0.25;

        drawLink(
          ctx,
          x,
          chainY + yOff,
          linkRx * scale,
          linkRy * scale,
          angle,
          i,
          alpha
        );
      }

      t += 0.008;
      animFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
