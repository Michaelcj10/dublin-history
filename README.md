# Time Travel News

A Next.js app that uses Claude AI at build time to generate historically accurate news pages for every year from 1900 to 2026. Each year is styled with an era-authentic design: Victorian broadsheet, Art Deco magazine, Depression-era newspaper, 1960s mod magazine, 1970s print, 1980s neon, 1990s Geocities, 2000s web portal, 2010s flat design, and 2020s dark glassmorphism.

## Setup

```bash
npm install
```

Create `.env.local` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-...
```

## Generate Content

Run this once. It calls Claude (claude-opus-4-5) for each year from 1900–2026 and saves JSON files to `content/years/`. Already-generated years are skipped, so you can safely re-run.

```bash
npm run generate
```

Generates 127 years. Runs in batches of 5 concurrent requests with rate-limit pauses. Estimated time: 15–40 minutes depending on API speed.

To regenerate a single year:
```bash
npm run generate -- --year=1969
```

## Build & Run

```bash
npm run build   # SSG: reads all JSONs, outputs 127 static pages
npm start       # Serve production build
```

Or in development (requires JSON files to exist):
```bash
npm run dev
```

## Navigation

- **←  →** arrow keys to step between years
- **← →** buttons in the bottom nav bar
- Click any decade marker to jump directly
- Direct URL: `/1969`, `/1989`, `/2001`, etc.

## Era Styles

| Years | Era | Style |
|-------|-----|-------|
| 1900–1920 | Victorian/Edwardian | Sepia broadsheet, ornate borders |
| 1921–1929 | Art Deco | Black & gold, geometric |
| 1930–1939 | Depression | Stark newsprint, heavy serif |
| 1940–1945 | Wartime | Military, patriotic red/white/blue |
| 1946–1959 | Post-War | Optimistic broadsheet |
| 1960–1969 | Mod | Pop art, bold colour |
| 1970–1979 | Magazine | Earth tones, Impact font |
| 1980–1989 | Neon | Dark bg, neon cyan/pink |
| 1990–1999 | Geocities | Web chaos, blinking text |
| 2000–2009 | Web Portal | Glossy blue gradients |
| 2010–2019 | Flat | Material design, clean cards |
| 2020–2026 | Modern | Dark glassmorphism, AI-era |

## Extending

Each year's content is stored in `content/years/{year}.json`. You can hand-edit any year's JSON to refine the content. The TypeScript type `YearContent` in `lib/types.ts` documents every field.

Future ideas:
- Click any article headline to expand full coverage
- "This Day in History" sidebar pulling from adjacent years
- AI-powered quiz mode for each era
- Audio narration via TTS
