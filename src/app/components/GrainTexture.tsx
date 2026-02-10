"use client";

import { useEffect, useRef } from "react";

function generateNoise(width: number, height: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

export function GrainTexture({
  opacity = 0.12,
  blendMode = "overlay",
}: {
  opacity?: number;
  blendMode?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const noiseUrl = generateNoise(256, 256);
    el.style.backgroundImage = `url(${noiseUrl})`;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] bg-repeat"
      style={{
        opacity,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        backgroundSize: "256px 256px",
      }}
    />
  );
}
