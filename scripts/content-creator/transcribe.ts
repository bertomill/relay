#!/usr/bin/env npx tsx
/**
 * Transcribe audio/video via fal.ai Whisper
 *
 * Usage: npx tsx scripts/content-creator/transcribe.ts <file-path>
 * Output: JSON { text, segments }
 */

import { fal } from "@fal-ai/client";
import { readFileSync } from "fs";
import path from "path";

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npx tsx scripts/content-creator/transcribe.ts <file-path>");
    process.exit(1);
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    console.error("Error: FAL_KEY environment variable is required");
    process.exit(1);
  }

  fal.config({ credentials: falKey });

  const absolutePath = path.resolve(filePath);
  const fileBuffer = readFileSync(absolutePath);
  const ext = path.extname(absolutePath).slice(1) || "mp3";

  const mimeMap: Record<string, string> = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    m4a: "audio/mp4",
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "audio/ogg",
  };

  const contentType = mimeMap[ext] || "audio/mpeg";
  const file = new File([fileBuffer], path.basename(absolutePath), { type: contentType });
  const audioUrl = await fal.storage.upload(file);

  const result = await fal.subscribe("fal-ai/whisper", {
    input: { audio_url: audioUrl },
  });

  const output = {
    text: (result.data as { text?: string }).text || "",
    segments: (result.data as { chunks?: unknown[] }).chunks || [],
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error("Transcription error:", err);
  process.exit(1);
});
