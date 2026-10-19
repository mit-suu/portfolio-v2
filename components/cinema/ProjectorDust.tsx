"use client";

import { useEffect, useRef } from "react";
import { GRADE_EVENT } from "@/lib/grade";

type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; twinkle: number };

/** Specks of dust drifting through a projector beam. Pauses when off screen. */
export function ProjectorDust({ count = 90 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Dust picks up the current colour grade's light.
    let color = "#cdf6ff";
    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue("--glow").trim() || color;
    };
    readColor();

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * 0.5 + 0.15,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.twinkle += 0.03;
        if (m.y < -4) m.y = height + 4;
        if (m.x < -4) m.x = width + 4;
        if (m.x > width + 4) m.x = -4;
        // Brighter toward the centre of the beam.
        const beam = 1 - Math.min(1, Math.abs(m.x - width / 2) / (width * 0.55));
        ctx.globalAlpha = m.a * (0.55 + 0.45 * Math.sin(m.twinkle)) * (0.35 + beam);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    };
    draw();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener(GRADE_EVENT, readColor);

    return () => {
      window.removeEventListener(GRADE_EVENT, readColor);
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="dust" aria-hidden="true" />;
}
