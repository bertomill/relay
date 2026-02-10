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
