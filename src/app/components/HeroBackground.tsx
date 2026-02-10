"use client";

import { useEffect, useState } from "react";

export function HeroBackground() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setVisible(false);
    const handler = (e: MediaQueryListEvent) => setVisible(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Central green orb — soft pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6B8F71] opacity-[0.07] blur-[120px] animate-light-pulse" />

      {/* Secondary warm orb — gentle drift */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#D4C5A9] opacity-[0.05] blur-[100px] animate-light-drift" />

      {/* Tertiary accent orb — offset drift */}
      <div
        className="absolute top-2/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#6B8F71] opacity-[0.04] blur-[100px] animate-light-drift"
        style={{ animationDelay: "-6s" }}
      />

      {/* Light ray sweep */}
      <div className="absolute inset-0 animate-light-sweep">
        <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12" />
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#FAFAF8_100%)]" />
    </div>
  );
}
