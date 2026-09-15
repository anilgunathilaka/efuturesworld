# CLAUDE.md — EFutures Website Redesign

This file guides Claude Code (and any contributor) working in this repository. The project is a full redesign of **efuturesworld.com** — moving from a generic offshore-outsourcing site to a premium, AI-native software engineering brand. Read this before generating or editing any page, component, or content.

Reference material (keep these in the repo, e.g. under `/design/`, and consult them before building a new section):
- `design/efutures-redesign-playbook.md` — the full strategy: audit findings, positioning, IA, page-by-page copy, and the phased execution plan.
- `design/efutures-redesign-mockup.html` — a static HTML concept of the homepage showing the target visual direction. Treat it as a **visual reference to translate into components**, not a file to import or link to directly.

---

## 1. Tech stack & commands

- **Framework:** Next.js (App Router, `app/` directory)
- **Language:** TypeScript — strict mode on, no `any` unless justified with a comment
- **Styling:** Tailwind CSS — no separate CSS files or CSS-in-JS unless a plugin genuinely requires it
- **Fonts:** loaded via `next/font/google` (never a manual `<link>` tag — see §3)
- **Images:** always `next/image`, never a raw `<img>`

Standard commands (adjust if `package.json` differs):
```
npm run dev        # local dev server
npm run build       # production build — must pass with zero type errors before any PR
npm run lint         # eslint
npm run typecheck   # tsc --noEmit
```

Before considering any task done: run `lint` and `typecheck` (and `build` for anything touching routing or data fetching). Do not leave TypeScript errors or `console.log` statements in committed code.

---

## 2. Design tokens (Tailwind theme)

The palette is sourced directly from the EFutures logo — brand blue, wordmark black, tagline grey — on a **white ground, always** (this is a deliberate, light-only design; do not add a dark-mode variant unless explicitly asked).

Add these to `tailwind.config.ts` under `theme.extend`:

```ts
colors: {
  bg: "#FFFFFF",
  surface: "#F6F9FC",
  surface2: "#EAF1F8",
  ink: "#0D0F12",
  "ink-soft": "#54565C",
  "ink-faint": "#84868B",
  accent: "#0093FD",       // brand blue — the ONLY accent hue in the system
  "accent-deep": "#006EBE", // hover/pressed state
  "accent-tint": "#E6F4FF", // light backgrounds, badges
  line: "#E3E7EB",
  "line-strong": "#C7CDD3",
},
```

Rules for using them:
- **One accent only** (`accent` / `accent-deep` / `accent-tint`). Do not introduce a second brand hue (no purple-blue gradients, no random greens) — variation comes from tints/shades of this blue plus black/white, matching the logo.
- `bg-white` is the page background everywhere. `surface` / `surface2` are for cards, hovers, and subtly separated blocks only — never a full-page background.
- Body text defaults to `text-ink`; secondary/supporting text uses `text-ink-soft`; small caps labels/meta use `text-ink-faint`.
- Borders and dividers use `border-line` (default) or `border-line-strong` (emphasis, e.g. above a numbered list).

---

## 3. Typography

Two-face system, loaded with `next/font/google` and exposed as CSS variables (`--font-display`, `--font-sans`, `--font-mono`) wired into Tailwind's `fontFamily`:

- **Display (headlines) & Body/UI:** Onest — one geometric sans family used for both roles (weights 500/600/700 for headlines, 400–800 for body/UI). Emphasis in a headline is carried by `accent` color on an `<em>` (Onest has no true italic face, so don't rely on italic alone). Use sparingly — one word or phrase per headline, not whole sentences.
- **Mono (labels, numbers, data):** IBM Plex Mono — uppercase eyebrow labels, stat figures, numbered list indices, footer meta. Always with `tracking-wide` and `text-xs`/`text-[11px]` uppercase for labels.

```ts
fontFamily: {
  display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
  sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["var(--font-mono)", "ui-monospace", "monospace"],
},
```

Headings get `text-balance`. Body copy stays close to 65 characters per line (`max-w-prose` or an explicit `max-w-[60ch]`).

---

## 4. Layout & component conventions

- Max content width: `max-w-[1180px]`, centered, with a minimum side gutter of `1rem` (`px-4`) up to `px-14` on desktop — never edge-to-edge text.
- Sibling spacing via flex/grid `gap-*`, not stacked margins.
- Mobile-first: every component must work down to ~375px wide. Stack multi-column sections to one column below `md`.
- Respect `prefers-reduced-motion` for any transition/animation (Tailwind: wrap in `motion-safe:`).
- Every interactive element (link, button, accordion trigger) needs a visible focus state — do not remove Tailwind's default focus ring without replacing it with an equally visible one in `accent`.

### Component inventory (build as separate components under `components/`)

Match these to the sections in the mockup and playbook — build in this order, homepage first:

1. `SiteNav` — logo (SVG/optimized image of the real mark, not re-typeset text) + links (Work, Services, About, FAQ) + primary CTA button, sticky.
2. `Hero` — eyebrow label, serif headline with one italic accent word, subhead, two CTAs (`Book a Discovery Call` primary, `See Our Work` secondary ghost), thin bordered frame with corner ticks in `accent`.
3. `TrustStrip` — 5-column stat/credential row (25+ yrs, AWS/MS partner, ISO, Google rating, SLASSCOM). Use real numbers — never ship a "0+" placeholder to production.
4. `Capabilities` — 5 numbered rows (not 10 flat items), mono index + serif heading + supporting copy per row.
5. `WhyUs` — two-column: track-record copy + a client testimonial quote card (serif italic quote, attribution).
6. `WorkGrid` — case study cards: Client → Challenge → What we built → Outcome. Real clients, real outcomes — pull from `content/case-studies.ts` (see §5), never invent metrics.
7. `Faq` — accordion (use native `<details>`/`<summary>` or a Radix/shadcn accordion for a11y) covering the objection-handling questions from the playbook (security, IP ownership, ramp-up time, time zones, post-launch support).
8. `FinalCta` — repeats the single primary CTA.
9. `SiteFooter` — logo, nav groups, contact, certifications.

Keep one primary call-to-action label (`Book a Discovery Call`) used consistently across `SiteNav`, `Hero`, and `FinalCta`. Secondary CTAs (`See Our Work`, `Download Capability Deck`) are always visually secondary (ghost/outline style).

---

## 5. Content — never hardcode copy inline

All page copy (headlines, service descriptions, case studies, FAQ, stats) lives in typed content files under `content/`, not inline in JSX:

```
content/
  home.ts           # hero, trust strip, why-us copy
  capabilities.ts    # the 5 service pillars
  case-studies.ts    # client, challenge, build, outcome
  faq.ts
```

Each exports a typed const (e.g. `export const capabilities: Capability[] = [...]`) so content can be edited without touching component logic, and so the same data can later move to a CMS without a rewrite. Use the copy drafted in `efutures-redesign-playbook.md` §5 as the starting content — do not invent new client metrics or testimonials; only use what's sourced from the real site (Sinque, MBT, Weekli, Moovparcel) until real numbers/quotes are confirmed.

**Before shipping:** every stat currently showing "0+" on the live site (staff count, completed projects) must be replaced with a real, confirmed number. Flag it in a PR description if a real number isn't available yet — do not guess one.

---

## 6. What NOT to build (yet)

Per the playbook's phased approach, do not implement these in v1 unless explicitly asked:
- WebGL/custom cursor interactions (Cuberto-style) — expensive to build and maintain; scroll-reveal + real case studies deliver most of the "premium" feeling far more cheaply.
- A second accent color or gradient hero — the system is intentionally single-accent.
- Dark mode — this design is committed to a white ground.
- Auto-playing background video — if case study videos are added later, they must be muted, `loop`, `playsInline`, and pausable.

---

## 7. Accessibility & performance baseline

- Semantic HTML first (`<nav>`, `<main>`, `<section>`, `<footer>`, heading hierarchy starting at one `h1` per page).
- All images have descriptive `alt` text; decorative marks use `alt=""`.
- Lighthouse targets before merging a page: Performance ≥ 90, Accessibility ≥ 95 on mobile.
- Use `next/font` (not a Google Fonts `<link>`) so fonts are self-hosted and don't block render.
- Animate only `opacity`/`transform`; never animate `width`/`height`/`top`/`left`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
