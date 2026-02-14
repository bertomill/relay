"use client";

import { useState, useEffect, useCallback } from "react";
import { generateImage, type ImageSize } from "@/lib/fal";

interface Step6VisualsProps {
  onComplete: () => void;
  isComplete: boolean;
}

interface StylePreset {
  id: string;
  label: string;
  description: string;
  size: ImageSize;
  promptSuffix: string;
}

interface SavedVisual {
  id: string;
  url: string;
  name: string;
  preset: string;
  created_at: string;
}

const STYLE_PRESETS: StylePreset[] = [
  {
    id: "hero",
    label: "Hero Illustration",
    description: "Flowing, whimsical, full-width",
    size: "landscape_16_9",
    promptSuffix: "wide panoramic composition, expansive and flowing, suitable as a website hero image",
  },
  {
    id: "section",
    label: "Section Divider",
    description: "Horizontal decorative band",
    size: "landscape_16_9",
    promptSuffix: "horizontal decorative band, subtle and elegant, works as a section divider",
  },
  {
    id: "spot",
    label: "Spot Illustration",
    description: "Small standalone visual",
    size: "square_hd",
    promptSuffix: "small standalone spot illustration, centered composition, icon-like quality",
  },
  {
    id: "social",
    label: "Social Media",
    description: "Square format for posts",
    size: "square_hd",
    promptSuffix: "social media post format, bold and eye-catching, works at small sizes",
  },
];

const BASE_PROMPT = `Whimsical hand-drawn editorial illustration, flowing organic composition, soft muted green (#6B8F71) and warm cream (#FAFAF8) color palette with earth tones, clean white/transparent background, Fly.io website illustration style`;

export default function Step6Visuals({ onComplete, isComplete }: Step6VisualsProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("hero");
  const [subject, setSubject] = useState("");
  const [generating, setGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [gallery, setGallery] = useState<SavedVisual[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch("/api/visuals");
      if (!res.ok) throw new Error("Failed to fetch");
      const { data } = await res.json();
      setGallery(data || []);
    } catch {
      // Gallery fetch is non-critical
    } finally {
      setLoadingGallery(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const preset = STYLE_PRESETS.find((p) => p.id === selectedPreset)!;

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setGenerating(true);
    setError(null);
    setPreviewUrl(null);
    setSaved(false);

    try {
      const fullPrompt = `${BASE_PROMPT}, ${preset.promptSuffix}. Subject: ${subject.trim()}`;
      const result = await generateImage(fullPrompt, { size: preset.size });
      const imageUrl = result.data.images[0]?.url;
      if (imageUrl) {
        setPreviewUrl(imageUrl);
      } else {
        setError("No image was generated. Try again.");
      }
    } catch (err) {
      console.error("Image generation failed:", err);
      setError("Generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!previewUrl) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/visuals/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: previewUrl,
          name: subject.trim(),
          preset: selectedPreset,
        }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || "Save failed");
      }

      setSaved(true);
      fetchGallery();
    } catch (err) {
      console.error("Save failed:", err);
      setError(err instanceof Error ? err.message : "Failed to save image.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-sm text-[#666]">
        Generate a branded Fly.io-style illustration for your website. Pick a style, describe the subject, and generate.
      </p>

      {/* Style Presets */}
      <div>
        <label className="block text-xs font-semibold text-[#1C1C1C] uppercase tracking-[0.1em] mb-2">
          Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {STYLE_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`text-left px-3 py-2.5 rounded-xl border transition-all ${
                selectedPreset === p.id
                  ? "border-[#6B8F71] bg-[#6B8F71]/5"
                  : "border-[#E8E6E1] hover:border-[#6B8F71]/40"
              }`}
            >
              <span className="text-sm font-medium text-[#1C1C1C]">{p.label}</span>
              <span className="block text-xs text-[#999] mt-0.5">{p.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Input */}
      <div>
        <label className="block text-xs font-semibold text-[#1C1C1C] uppercase tracking-[0.1em] mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. AI agents collaborating, content flowing like a river"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E8E6E1] text-sm text-[#1C1C1C] placeholder:text-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !generating) handleGenerate();
          }}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={generating || !subject.trim()}
        className="w-full py-3 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-[#1C1C1C] text-white hover:bg-[#333]"
      >
        {generating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Generating...
          </span>
        ) : (
          "Generate"
        )}
      </button>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#1C1C1C] uppercase tracking-[0.1em]">
            Preview
          </label>
          <div className="rounded-2xl overflow-hidden border border-[#E8E6E1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt={subject} className="w-full" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
                saved
                  ? "bg-[#6B8F71] text-white"
                  : "bg-[#6B8F71] text-white hover:bg-[#5A7D60] disabled:opacity-50"
              }`}
            >
              {saving ? "Saving..." : saved ? "Saved" : "Save to Library"}
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-2.5 rounded-full text-sm font-semibold uppercase tracking-[0.1em] border border-[#E8E6E1] text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all disabled:opacity-50"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}

      {/* Gallery */}
      {!loadingGallery && gallery.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-[#1C1C1C] uppercase tracking-[0.1em] mb-3">
            Recent Visuals
          </label>
          <div className="grid grid-cols-3 gap-2">
            {gallery.map((v) => (
              <div key={v.id} className="group relative rounded-xl overflow-hidden border border-[#E8E6E1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.url} alt={v.name} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <span className="text-white text-xs px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity truncate w-full">
                    {v.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mark Complete */}
      <button
        onClick={onComplete}
        className={`w-full py-3 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
          isComplete
            ? "bg-[#6B8F71] text-white"
            : "border border-[#E8E6E1] text-[#666] hover:border-[#6B8F71] hover:text-[#6B8F71]"
        }`}
      >
        {isComplete ? "Completed" : "Mark Complete"}
      </button>
    </div>
  );
}
