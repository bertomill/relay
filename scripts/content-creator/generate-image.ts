#!/usr/bin/env npx tsx
/**
 * Generate images via fal.ai FLUX.1
 *
 * Usage: npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--size landscape_16_9] [--save-as filename]
 * Output: JSON { url, localPath, publicUrl }
 */

import { fal } from "@fal-ai/client";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

function parseArgs(args: string[]) {
  const prompt = args[0];
  let size = "landscape_16_9";
  let saveAs = `image-${Date.now()}`;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--size" && args[i + 1]) {
      size = args[++i];
    } else if (args[i] === "--save-as" && args[i + 1]) {
      saveAs = args[++i];
    }
  }

  return { prompt, size, saveAs };
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--size landscape_16_9] [--save-as filename]');
    process.exit(1);
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    console.error("Error: FAL_KEY environment variable is required");
    process.exit(1);
  }

  fal.config({ credentials: falKey });

  const { prompt, size, saveAs } = parseArgs(args);

  const result = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt,
      image_size: size as "landscape_16_9" | "square_hd" | "square" | "portrait_4_3" | "portrait_16_9" | "landscape_4_3",
      num_images: 1,
    },
  });

  const data = result.data as { images?: { url: string }[] };
  const imageUrl = data.images?.[0]?.url;
  if (!imageUrl) {
    console.error("No image returned from fal.ai");
    process.exit(1);
  }

  // Download and save
  const outDir = path.join(process.cwd(), "public", "generated");
  mkdirSync(outDir, { recursive: true });

  const fileName = `${saveAs}.png`;
  const localPath = path.join(outDir, fileName);

  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(localPath, buffer);

  const output = {
    url: imageUrl,
    localPath,
    publicUrl: `/generated/${fileName}`,
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error("Image generation error:", err);
  process.exit(1);
});
