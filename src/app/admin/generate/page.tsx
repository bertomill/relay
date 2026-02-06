"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_EMAIL } from "@/lib/constants";
import {
  generateImage,
  generateVideo,
  animateLogo,
  uploadFile,
  type FalImageResult,
  type FalVideoResult,
  type ImageSize,
  type LogMessage,
} from "@/lib/fal";

type GenerationMode = "image" | "video" | "logo";
type GenerationStatus = "idle" | "generating" | "completed" | "error";

interface GenerationResult {
  type: "image" | "video";
  url: string;
  prompt: string;
  timestamp: Date;
  duration?: number;
  saved?: boolean;
  savedPath?: string;
}

export default function GenerateAssetsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mode, setMode] = useState<GenerationMode>("image");
  const [prompt, setPrompt] = useState("");
  const [imageSize, setImageSize] = useState<ImageSize>("square_hd");
  const [seed, setSeed] = useState<string>("");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<GenerationResult[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/login?redirectTo=/admin/generate");
        return;
      }

      setUserEmail(user.email);
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/login?redirectTo=/admin/generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogMessage = useCallback((log: LogMessage) => {
    setLogs((prev) => [...prev, log.message]);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() && mode !== "logo") {
      setError("Please enter a prompt");
      return;
    }

    if (mode === "logo" && !uploadedFile && !uploadedImageUrl) {
      setError("Please upload an image or provide an image URL");
      return;
    }

    setStatus("generating");
    setLogs([]);
    setError(null);
    setResult(null);
    setStartTime(Date.now());

    try {
      const seedValue = seed ? parseInt(seed, 10) : undefined;

      if (mode === "image") {
        setLogs((prev) => [...prev, "Starting image generation with FLUX.1 [dev]..."]);
        const response = await generateImage(prompt, {
          size: imageSize,
          seed: seedValue,
        }, handleLogMessage);

        const data = response.data as FalImageResult;
        const duration = startTime ? (Date.now() - startTime) / 1000 : 0;

        const newResult: GenerationResult = {
          type: "image",
          url: data.images[0].url,
          prompt,
          timestamp: new Date(),
          duration,
        };

        setResult(newResult);
        setRecentGenerations((prev) => [newResult, ...prev].slice(0, 10));
        setLogs((prev) => [...prev, `Completed in ${duration.toFixed(1)}s`]);
        setStatus("completed");
      } else if (mode === "video") {
        setLogs((prev) => [...prev, "Starting video generation with WAN 2.1..."]);

        let imageUrl = uploadedImageUrl;
        if (uploadedFile && !uploadedImageUrl) {
          setLogs((prev) => [...prev, "Uploading image..."]);
          imageUrl = await uploadFile(uploadedFile);
          setLogs((prev) => [...prev, "Image uploaded successfully"]);
        }

        const response = await generateVideo({
          prompt,
          imageUrl: imageUrl || undefined,
          seed: seedValue,
        }, handleLogMessage);

        const data = response.data as FalVideoResult;
        const duration = startTime ? (Date.now() - startTime) / 1000 : 0;

        const newResult: GenerationResult = {
          type: "video",
          url: data.video.url,
          prompt,
          timestamp: new Date(),
          duration,
        };

        setResult(newResult);
        setRecentGenerations((prev) => [newResult, ...prev].slice(0, 10));
        setLogs((prev) => [...prev, `Completed in ${duration.toFixed(1)}s`]);
        setStatus("completed");
      } else if (mode === "logo") {
        setLogs((prev) => [...prev, "Starting logo animation..."]);

        let imageUrl = uploadedImageUrl;
        if (uploadedFile && !uploadedImageUrl) {
          setLogs((prev) => [...prev, "Uploading logo..."]);
          imageUrl = await uploadFile(uploadedFile);
          setLogs((prev) => [...prev, "Logo uploaded successfully"]);
        }

        const animationPrompt = prompt.trim() ||
          "Subtle animation, logo gently breathing and pulsing, professional motion graphics, seamless loop";

        const response = await animateLogo(imageUrl, animationPrompt, handleLogMessage);

        const data = response.data as FalVideoResult;
        const duration = startTime ? (Date.now() - startTime) / 1000 : 0;

        const newResult: GenerationResult = {
          type: "video",
          url: data.video.url,
          prompt: animationPrompt,
          timestamp: new Date(),
          duration,
        };

        setResult(newResult);
        setRecentGenerations((prev) => [newResult, ...prev].slice(0, 10));
        setLogs((prev) => [...prev, `Completed in ${duration.toFixed(1)}s`]);
        setStatus("completed");
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError(err instanceof Error ? err.message : "Generation failed");
      setStatus("error");
      setLogs((prev) => [...prev, `Error: ${err instanceof Error ? err.message : "Unknown error"}`]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadedImageUrl("");
    }
  };

  const handleSaveAsset = async () => {
    if (!result) return;

    try {
      const filename = `${result.type}-${Date.now()}`;
      const response = await fetch("/api/fal/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: result.url,
          filename,
          type: result.type,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ ...result, saved: true, savedPath: data.publicUrl });
        setLogs((prev) => [...prev, `Saved to ${data.publicUrl}`]);
      } else {
        setError(data.error || "Failed to save asset");
      }
    } catch (err) {
      setError("Failed to save asset");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#141414"/>
                <circle cx="10.5" cy="11" r="3.5" fill="#d4a574"/>
                <circle cx="21.5" cy="21" r="3.5" fill="#d4a574"/>
                <path d="M13 13.5L19 18.5" stroke="#d4a574" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="21.5" cy="11" r="2" fill="#d4a574" fillOpacity="0.4"/>
                <circle cx="10.5" cy="21" r="2" fill="#d4a574" fillOpacity="0.4"/>
              </svg>
              <span className="text-xl font-semibold tracking-tight">HeadRoom AI</span>
            </Link>
            <span className="text-[#525252] mx-2">/</span>
            <Link href="/admin" className="text-[#737373] hover:text-[#a1a1a1] transition-colors">Admin</Link>
            <span className="text-[#525252] mx-2">/</span>
            <span className="text-[#737373]">Generate</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#737373]">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-[#a1a1a1] hover:text-[#d4a574] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Generate Assets</h1>

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-6">
          {(["image", "video", "logo"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setResult(null);
                setError(null);
                setLogs([]);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-[#d4a574] text-[#0a0a0a]"
                  : "bg-[#1f1f1f] text-[#a1a1a1] hover:bg-[#2a2a2a]"
              }`}
            >
              {m === "image" ? "Image" : m === "video" ? "Video" : "Animate Logo"}
            </button>
          ))}
        </div>

        {/* Generation Form */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 mb-6">
          {/* Prompt */}
          <div className="mb-4">
            <label className="block text-sm text-[#737373] mb-2">
              {mode === "logo" ? "Animation Prompt (optional)" : "Prompt"}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === "logo"
                  ? "Subtle animation, logo gently breathing and pulsing, professional motion graphics, seamless loop"
                  : "Abstract flowing shapes in sage green #6B8F71, soft gradients, minimal, professional..."
              }
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors resize-none"
              rows={3}
            />
          </div>

          {/* Image Upload (for video and logo modes) */}
          {(mode === "video" || mode === "logo") && (
            <div className="mb-4">
              <label className="block text-sm text-[#737373] mb-2">
                {mode === "logo" ? "Upload Logo" : "Upload Image (optional)"}
              </label>
              <div className="flex gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#fafafa] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#1f1f1f] file:text-[#a1a1a1] hover:file:bg-[#2a2a2a] cursor-pointer"
                />
                <span className="text-[#525252] self-center">or</span>
                <input
                  type="text"
                  value={uploadedImageUrl}
                  onChange={(e) => {
                    setUploadedImageUrl(e.target.value);
                    setUploadedFile(null);
                  }}
                  placeholder="Paste image URL..."
                  className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors"
                />
              </div>
              {uploadedFile && (
                <p className="text-sm text-[#737373] mt-2">
                  Selected: {uploadedFile.name}
                </p>
              )}
            </div>
          )}

          {/* Options Row */}
          <div className="flex gap-4 mb-4">
            {mode === "image" && (
              <div className="flex-1">
                <label className="block text-sm text-[#737373] mb-2">Size</label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value as ImageSize)}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#fafafa] focus:outline-none focus:border-[#d4a574] transition-colors"
                >
                  <option value="square_hd">Square HD (1024x1024)</option>
                  <option value="square">Square (512x512)</option>
                  <option value="landscape_16_9">Landscape 16:9</option>
                  <option value="landscape_4_3">Landscape 4:3</option>
                  <option value="portrait_16_9">Portrait 16:9</option>
                  <option value="portrait_4_3">Portrait 4:3</option>
                </select>
              </div>
            )}
            <div className={mode === "image" ? "flex-1" : "w-48"}>
              <label className="block text-sm text-[#737373] mb-2">Seed (optional)</label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Random"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-900/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={status === "generating"}
            className="w-full bg-[#d4a574] text-[#0a0a0a] font-medium py-3 px-6 rounded-xl hover:bg-[#c49464] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "generating" ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              `Generate ${mode === "image" ? "Image" : mode === "video" ? "Video" : "Animation"}`
            )}
          </button>
        </div>

        {/* Logs */}
        {logs.length > 0 && (
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 mb-6">
            <h3 className="text-sm font-medium text-[#737373] mb-2">Logs</h3>
            <div className="font-mono text-xs text-[#525252] space-y-1 max-h-32 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* Preview */}
        {result && (
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="flex justify-center mb-4">
              {result.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.url}
                  alt="Generated image"
                  className="max-w-full max-h-[500px] rounded-xl"
                />
              ) : (
                <video
                  src={result.url}
                  controls
                  autoPlay
                  loop
                  muted
                  className="max-w-full max-h-[500px] rounded-xl"
                />
              )}
            </div>
            <p className="text-sm text-[#737373] mb-4">
              Status: Completed in {result.duration?.toFixed(1)}s
              {result.saved && (
                <span className="text-green-500 ml-2">
                  • Saved to {result.savedPath}
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSaveAsset}
                disabled={result.saved}
                className="px-4 py-2 bg-[#1f1f1f] text-[#fafafa] rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {result.saved ? "Saved" : "Save to /public"}
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(result.url)}
                className="px-4 py-2 bg-[#1f1f1f] text-[#fafafa] rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                Copy URL
              </button>
              <a
                href={result.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1f1f1f] text-[#fafafa] rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                Download
              </a>
            </div>
          </div>
        )}

        {/* Recent Generations */}
        {recentGenerations.length > 0 && (
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1f1f1f]">
              <h2 className="text-lg font-semibold">Recent Generations</h2>
            </div>
            <div className="divide-y divide-[#1f1f1f]">
              {recentGenerations.map((gen, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      gen.type === "image"
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-purple-900/30 text-purple-400"
                    }`}>
                      {gen.type}
                    </span>
                    <span className="text-sm text-[#a1a1a1] truncate max-w-md">
                      {gen.prompt.slice(0, 60)}{gen.prompt.length > 60 ? "..." : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {gen.duration && (
                      <span className="text-xs text-[#525252]">
                        {gen.duration.toFixed(1)}s
                      </span>
                    )}
                    <span className="text-xs text-[#525252]">
                      ~${gen.type === "image" ? "0.025" : "0.25"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
