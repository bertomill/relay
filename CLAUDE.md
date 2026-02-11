# Lighten AI — Design System (Origin-Inspired)

## Typography
- **Headlines:** Instrument Serif (CSS var `--font-instrument-serif`), italic where editorial emphasis is needed
- **Body / UI:** Plus Jakarta Sans (CSS var `--font-plus-jakarta`)
- **Labels:** Uppercase, `tracking-[0.15em]`, `text-xs font-semibold`

## Colors
- **Light bg:** `#FAFAF8`
- **Dark sections:** `#1C1C1C` (near-black, used for contrast sections)
- **Text primary:** `#1C1C1C`
- **Text muted:** `#555`, `#666`, `#888`, `#999`
- **Accent green:** `#6B8F71` (brand color)
- **Accent green hover:** `#5A7D60`
- **Borders:** `#E8E6E1`

## Buttons
- **Primary (dark pill):** `bg-[#1C1C1C] text-white rounded-full uppercase tracking-[0.1em] text-sm font-semibold px-6 py-3`
- **Secondary (outlined pill):** `border border-[#1C1C1C] text-[#1C1C1C] rounded-full uppercase tracking-[0.1em] text-sm font-semibold px-6 py-3`
- **Green CTA pill:** `bg-[#6B8F71] text-white rounded-full uppercase tracking-[0.1em] text-sm font-semibold px-6 py-3`

## Layout Patterns
- **Navigation:** Slim horizontal, uppercase link labels with tracking, pill CTA right
- **Sections:** Alternate light (`#FAFAF8`) and dark (`#1C1C1C`) for visual rhythm
- **Cards:** `rounded-2xl`, clean borders, minimal shadow
- **Max width:** `max-w-6xl mx-auto px-6`
- **Hero:** Large serif headline, sans subtitle, pill CTA below

## Font Import
Instrument Serif is loaded via `next/font/google` in `layout.tsx`.

## Reference Files
Origin website screenshots: `/Users/bertomill/Downloads/Origin web Apr 2025/`

## Demo Videos (Remotion + Playwright)

When creating demo videos for new features, use the **Remotion skill** (`/remotion-best-practices`) and follow this pipeline:

### Pipeline
1. **Capture screenshots** with Playwright (`scripts/demo-video/capture-demo.ts`)
   - Automates the app, takes screenshots at key steps
   - Outputs to `scripts/demo-video/frames/`
2. **Generate voiceover** with ElevenLabs TTS (`scripts/demo-video/generate-voiceover.sh`)
   - 7 narration segments timed to each scene
   - Outputs to `scripts/demo-video/audio/`
3. **Build Remotion composition** in `video/src/`
   - Screenshots go in `video/public/demo/`
   - Use `Img` + `staticFile()` for images (never native `<img>`)
   - Animations via `interpolate()` and `spring()` — no CSS animations
   - Ken Burns effect (subtle zoom/pan) on screenshots
   - Spring-animated text captions at bottom
   - Branded intro/outro with FeatherLogo
4. **Render** with `npx remotion render <CompositionId> out/<name>.mp4 --concurrency=1`
   - `--concurrency=1` is required on this machine (Remotion 4.0.0 parallel render bug)
5. **Merge audio** with ffmpeg: `ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4`

### Key files
- `video/src/FeatureDemo.tsx` — example composition (Highlight & Ask demo)
- `video/src/Root.tsx` — register all compositions here
- `scripts/demo-video/capture-demo.ts` — Playwright screenshot automation
- `scripts/demo-video/generate-voiceover.sh` — ElevenLabs TTS + ffmpeg merge

### Remotion patterns (from skill)
- All animation via `useCurrentFrame()` + `interpolate()` — CSS animations forbidden
- Use `spring()` for natural motion (`{ damping: 200 }` for smooth, `{ damping: 12 }` for bouncy)
- Use `<Sequence>` for timing, `<Img>` (not `<img>`) for images
- Keep only one `<Img>` in the DOM at a time (ScenesLayer pattern) for reliability
