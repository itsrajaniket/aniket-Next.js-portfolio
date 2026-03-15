"use client";

import { useEffect, useRef, useCallback } from "react";

class Particle {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  size: number;
  canvasW: number;
  canvasH: number;

  constructor(
    x: number, y: number,
    dx: number, dy: number,
    size: number,
    cw: number, ch: number
  ) {
    this.x = x; this.y = y;
    this.dirX = dx; this.dirY = dy;
    this.size = size;
    this.canvasW = cw; this.canvasH = ch;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(34,211,238,0.5)";
    ctx.fill();
  }

  update(ctx: CanvasRenderingContext2D, mouse: { x: number | null; y: number | null; radius: number }) {
    if (this.x > this.canvasW || this.x < 0) this.dirX = -this.dirX;
    if (this.y > this.canvasH || this.y < 0) this.dirY = -this.dirY;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < this.canvasW - this.size * 10) this.x += 3;
        if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
        if (mouse.y < this.y && this.y < this.canvasH - this.size * 10) this.y += 3;
        if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
      }
    }

    this.x += this.dirX;
    this.y += this.dirY;
    this.draw(ctx);
  }
}

export default function SpiderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null, y: null, radius: 100,
  });

  const init = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = [];
    const n = (canvas.width * canvas.height) / 6000;
    for (let i = 0; i < n; i++) {
      const size = Math.random() * 2.5 + 0.5;
      particlesRef.current.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() - 0.5,
          Math.random() - 0.5,
          size,
          canvas.width,
          canvas.height,
        )
      );
    }
  }, []);

  const connect = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const ps = particlesRef.current;
    for (let a = 0; a < ps.length; a++) {
      for (let b = a; b < ps.length; b++) {
        const dist =
          (ps[a].x - ps[b].x) ** 2 + (ps[a].y - ps[b].y) ** 2;
        if (dist < (canvas.width / 7) * (canvas.height / 7)) {
          const op = 1 - dist / 20000;
          ctx.strokeStyle = `rgba(34,211,238,${op * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(ps[a].x, ps[a].y);
          ctx.lineTo(ps[b].x, ps[b].y);
          ctx.stroke();
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize ──────────────────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.offsetWidth ?? window.innerWidth;
      canvas.height = parent?.offsetHeight ?? window.innerHeight;
      // Update existing particle bounds
      particlesRef.current.forEach((p) => {
        p.canvasW = canvas.width;
        p.canvasH = canvas.height;
      });
      init(canvas);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse/Touch ─────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      if (t.clientY >= rect.top && t.clientY <= rect.bottom) {
        mouseRef.current.x = t.clientX - rect.left;
        mouseRef.current.y = t.clientY - rect.top;
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // ── Animate ─────────────────────────────────────────────────────────
    const animate = () => {
      if (!isVisibleRef.current) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => p.update(ctx, mouseRef.current));
      connect(ctx, canvas);
    };

    // ── IntersectionObserver — pause off-screen ─────────────────────────
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          if (!rafRef.current) animate();
        } else {
          isVisibleRef.current = false;
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas.parentElement ?? canvas);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [init, connect]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
