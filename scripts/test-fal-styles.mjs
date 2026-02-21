#!/usr/bin/env node
/**
 * Test Fal AI Recraft V3 sketch styles
 * Generates the same prompt across multiple styles so you can compare
 *
 * Usage: node scripts/test-fal-styles.mjs
 * Requires: FAL_KEY in .env.local
 */

import { readFileSync } from 'fs';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
}
const FAL_KEY = envVars.FAL_KEY;
if (!FAL_KEY) {
  console.error('FAL_KEY not found in .env.local');
  process.exit(1);
}

const HEADERS = {
  'Authorization': `Key ${FAL_KEY}`,
  'Content-Type': 'application/json',
};

// Brand colors
const BRAND_COLORS = [
  { r: 107, g: 143, b: 113 },  // #6B8F71 accent green
  { r: 28, g: 28, b: 28 },     // #1C1C1C dark
  { r: 250, g: 250, b: 248 },  // #FAFAF8 light bg
  { r: 232, g: 230, b: 225 },  // #E8E6E1 border
];

// Styles to test
const STYLES = [
  'digital_illustration/hand_drawn',
  'digital_illustration/hand_drawn_outline',
  'digital_illustration/urban_sketching',
  'digital_illustration/crosshatch',
  'digital_illustration/grain',
  'digital_illustration/pastel_sketch',
  'vector_illustration/editorial',
  'vector_illustration/line_art',
  'vector_illustration/marker_outline',
  'vector_illustration/engraving',
];

// Test prompt — a scene relevant to Lighten AI
const PROMPT = "A minimalist illustration of a person at a desk with a laptop, surrounded by floating paper documents and a small friendly robot assistant organizing them, clean white background";

const outputDir = resolve(__dirname, '..', 'public', 'test-styles');
mkdirSync(outputDir, { recursive: true });

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateImage(style) {
  const styleName = style.replace('/', '_');
  console.log(`\nGenerating: ${style}...`);

  try {
    // Step 1: Submit to queue
    const submitRes = await fetch('https://queue.fal.run/fal-ai/recraft-v3', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        prompt: PROMPT,
        style: style,
        image_size: 'landscape_4_3',
        colors: BRAND_COLORS,
      }),
    });

    if (!submitRes.ok) {
      const error = await submitRes.text();
      console.error(`  Submit error for ${style}: ${submitRes.status} ${error}`);
      return null;
    }

    const { request_id } = await submitRes.json();
    console.log(`  Queued: ${request_id}`);

    // Step 2: Poll for result
    let attempts = 0;
    while (attempts < 60) {
      await sleep(3000);
      attempts++;

      const statusRes = await fetch(
        `https://queue.fal.run/fal-ai/recraft-v3/requests/${request_id}/status`,
        { headers: HEADERS }
      );

      if (!statusRes.ok) {
        console.log(`  Status check failed: ${statusRes.status}`);
        continue;
      }

      const status = await statusRes.json();

      if (status.status === 'COMPLETED') {
        // Fetch the result
        const resultRes = await fetch(
          `https://queue.fal.run/fal-ai/recraft-v3/requests/${request_id}`,
          { headers: HEADERS }
        );
        const data = await resultRes.json();
        const imageUrl = data.images?.[0]?.url;

        if (!imageUrl) {
          console.error(`  No image URL for ${style}`);
          return null;
        }

        // Download the image
        const imgResponse = await fetch(imageUrl);
        const buffer = Buffer.from(await imgResponse.arrayBuffer());
        const filename = `${styleName}.png`;
        writeFileSync(resolve(outputDir, filename), buffer);
        console.log(`  Saved: ${filename}`);
        return { style, filename, url: imageUrl };
      } else if (status.status === 'FAILED') {
        console.error(`  Failed for ${style}: ${JSON.stringify(status)}`);
        return null;
      } else {
        process.stdout.write('.');
      }
    }

    console.error(`  Timeout for ${style}`);
    return null;
  } catch (err) {
    console.error(`  Error for ${style}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('Testing Fal AI Recraft V3 styles for Lighten AI');
  console.log(`Prompt: "${PROMPT}"`);
  console.log(`Output: ${outputDir}`);
  console.log(`Styles to test: ${STYLES.length}`);
  console.log('---');

  const results = [];
  for (const style of STYLES) {
    const result = await generateImage(style);
    if (result) results.push(result);
    // Brief pause between submissions
    await sleep(1000);
  }

  console.log('\n\n---');
  console.log(`Generated ${results.length}/${STYLES.length} images`);
  console.log(`\nView them in: ${outputDir}`);

  // Generate a simple HTML comparison page
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Fal AI Style Comparison — Lighten AI</title>
  <style>
    body { font-family: system-ui; background: #FAFAF8; color: #1C1C1C; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 2rem; }
    .prompt { background: #f0f0ee; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; font-style: italic; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
    .card { border: 1px solid #E8E6E1; border-radius: 16px; overflow: hidden; background: white; }
    .card img { width: 100%; display: block; }
    .card .label { padding: 1rem; font-weight: 600; font-size: 0.875rem; letter-spacing: 0.05em; }
  </style>
</head>
<body>
  <h1>Style Comparison</h1>
  <div class="prompt">Prompt: "${PROMPT}"</div>
  <div class="grid">
    ${results.map(r => `
    <div class="card">
      <img src="${r.filename}" alt="${r.style}" />
      <div class="label">${r.style}</div>
    </div>`).join('')}
  </div>
</body>
</html>`;

  writeFileSync(resolve(outputDir, 'compare.html'), html);
  console.log(`Open comparison page: open ${outputDir}/compare.html`);
}

main().catch(console.error);
