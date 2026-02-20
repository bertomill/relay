#!/usr/bin/env npx tsx
/**
 * Generate images via fal.ai FLUX.1
 *
 * Text-to-image:
 *   npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--size landscape_16_9] [--save-as filename]
 *
 * Image-to-image (edit a reference photo):
 *   npx tsx scripts/content-creator/generate-image.ts "<prompt>" --image-url <url> [--strength 0.75] [--size landscape_16_9] [--save-as filename]
 *
 * Output: JSON { url, localPath?, publicUrl? }
 */

import { fal } from "@fal-ai/client";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

function parseArgs(args: string[]) {
  const prompt = args[0];
  let size = "landscape_16_9";
  let saveAs = `image-${Date.now()}`;
  let imageUrl: string | undefined;
  let strength = 0.75;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--size" && args[i + 1]) {
      size = args[++i];
    } else if (args[i] === "--save-as" && args[i + 1]) {
      saveAs = args[++i];
    } else if (args[i] === "--image-url" && args[i + 1]) {
      imageUrl = args[++i];
    } else if (args[i] === "--strength" && args[i + 1]) {
      strength = parseFloat(args[++i]);
    }
  }

  return { prompt, size, saveAs, imageUrl, strength };
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error(
      'Usage: npx tsx scripts/content-creator/generate-image.ts "<prompt>" [--image-url <url>] [--strength 0.75] [--size landscape_16_9] [--save-as filename]'
    );
    process.exit(1);
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    console.error("Error: FAL_KEY environment variable is required");
    process.exit(1);
  }

  fal.config({ credentials: falKey });

  const { prompt, size, saveAs, imageUrl, strength } = parseArgs(args);

  // Append style direction to every prompt to avoid generic AI-slop aesthetics
  const styleSuffix =
    ", editorial design aesthetic, muted earth tone palette, paper texture, clean composition with negative space, no glowing neon, no 3D renders, no holographic elements";
  const styledPrompt = prompt + styleSuffix;

  let resultData: { images?: { url: string }[] };

  if (imageUrl) {
    // Image-to-image mode (no image_size param — output matches input dimensions)
    const result = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
      input: {
        prompt: styledPrompt,
        image_url: imageUrl,
        strength,
        num_inference_steps: 40,
      },
    });
    resultData = result.data as { images?: { url: string }[] };
  } else {
    // Text-to-image mode
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: styledPrompt,
        image_size: size as
          | "landscape_16_9"
          | "square_hd"
          | "square"
          | "portrait_4_3"
          | "portrait_16_9"
          | "landscape_4_3",
        num_images: 1,
      },
    });
    resultData = result.data as { images?: { url: string }[] };
  }

  const falImageUrl = resultData.images?.[0]?.url;
  if (!falImageUrl) {
    console.error("No image returned from fal.ai");
    process.exit(1);
  }

  // Try to download and save locally (graceful failure in sandbox)
  const output: { url: string; localPath?: string; publicUrl?: string } = {
    url: falImageUrl,
  };

  try {
    const outDir = path.join(process.cwd(), "public", "generated");
    mkdirSync(outDir, { recursive: true });

    const fileName = `${saveAs}.png`;
    const localPath = path.join(outDir, fileName);

    const response = await fetch(falImageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(localPath, buffer);

    output.localPath = localPath;
    output.publicUrl = `/generated/${fileName}`;
  } catch {
    // Local save failed (e.g. running in sandbox) — CDN URL still works
  }

  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error("Image generation error:", err);
  process.exit(1);
});
