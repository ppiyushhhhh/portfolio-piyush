
# Engineering Notebook Portfolio Redesign

Transform the single-page resume into a multi-page interactive notebook experience where each section is a "page" of a vintage engineering journal.

## Architecture

Keep it as a single route (`/`) with in-page section navigation — no route splitting needed since each notebook "page" is a scroll section with a page-turn transition. This preserves fast loading, SEO simplicity, and smooth flipping between chapters.

```text
/  (single route, notebook shell)
 ├─ Cover / Table of Contents  (landing)
 ├─ 01 About
 ├─ 02 Skills
 ├─ 03 Projects
 ├─ 04 Experience
 ├─ 05 Certifications
 └─ 06 Contact
```

Navigation: clicking a chapter in the TOC animates a page-turn (Framer Motion 3D rotateY) to that section; a persistent tiny page-number + "next page" corner tab allows sequential flipping; scroll also works for accessibility.

## Visual System

**Fonts** — loaded via `<link>` in `__root.tsx` head (Google Fonts):
- Headings/handwritten: Caveat + Patrick Hand
- Body: Inter
- Nav/labels: IBM Plex Sans
- Code: JetBrains Mono

**Tokens** (added to `src/styles.css` under `@theme`):
- `--color-paper: #FBF8F2`
- `--color-desk: #F7F2E8`
- `--color-ink: #2B2B2B`
- `--color-rule: #BFD7F5` (notebook lines)
- `--color-margin: #D97B7B` (red margin)
- `--color-accent: #4A6FA5`
- `--color-edge: #D8D1C7`

**Paper texture** — layered CSS: repeating linear-gradient for horizontal ruled lines every 32px, a single vertical `--color-margin` line at ~56px from the left, plus a subtle SVG noise/grain overlay at ~4% opacity for fiber. Page has cream background, rounded corner, and dual box-shadows for depth + folded corner triangle via `clip-path`.

## Sections

**Cover / TOC** — Centered on desk background. Handwritten title "Piyush Prasad · Engineering Notebook". Contents list `01 About … 06 Contact` with dotted leaders and page numbers. Each row is a button that flips to that page.

**01 Hero/About combined** — Big handwritten "Hello. I'm Piyush Prasad". Subtitle "Cloud & DevOps Engineer". Two tactile buttons (View Projects / Download Resume). Right column: ASCII/SVG hand-drawn AWS architecture sketch (EC2 → Nginx → Cloudflare) rendered as inline SVG with sketchy stroke. Below: short journal-style paragraph on the IT-support → Cloud journey with handwritten arrows (SVG) between milestones.

**02 Skills** — Grid of sticky notes (each `<div>` with slight random `rotate(-3deg…3deg)`, drop shadow, tape strip on top via pseudo-element). Skills: AWS, Linux, Git, GitHub, GitHub Actions, Docker, Cloudflare, Nginx, React, TypeScript, Tailwind, MongoDB, Node.js. Each note has a small Lucide icon + label. Hover: lifts and straightens slightly.

**03 Projects** — Two project spreads (existing content preserved: Production Portfolio + AWS Deployment). Each spread: hand-drawn architecture sketch (inline SVG), Problem / Solution / Tech / Result blocks with handwritten section labels, and Live Demo + GitHub buttons styled as stamped ink.

**04 Experience** — Vertical hand-drawn timeline: SVG dashed line with arrowheads between nodes. Nodes: 2022 Credence Infotech → 2024 Runtime Solutions → 2025 Cloud Projects → Future DevOps Engineer. Each node is a small card with company/role/period + bullets (existing content).

**05 Certifications** — Six badges laid on the page as if taped down: each certificate is a small card rotated slightly, with a masking-tape strip (semi-transparent yellow rectangle) across the top corners. Content from existing certs list (Canonical, GitHub, AWS, LinkedIn, Packt).

**06 Contact** — Final page. Handwritten "Thanks for reading. Let's build something together." Four links (GitHub, LinkedIn, Email, Resume) styled as underlined ink. Ends with a Caveat "Piyush" signature drawn with an SVG stroke-dasharray write-on animation on view.

## Interactions (Framer Motion)

- **Page-turn**: `rotateY` + `transformOrigin: left` + shadow sweep when navigating chapters.
- **Sticky note drop**: notes animate in with `y: -30 → 0`, slight bounce, staggered.
- **Ink writing**: signature and section underlines use `pathLength: 0 → 1` on `whileInView`.
- **Marker highlight**: hovering key phrases animates a yellow highlight bar behind the text (`scaleX 0 → 1`).
- **Hover lift**: pages/notes get `y: -2` and shadow expand on hover.
- **Doodles**: small SVG doodles (gear, cloud, terminal `>_`) fade + draw in when their page enters viewport.

## Background & Ambience

Desk background `#F7F2E8` with an SVG coffee-ring in the bottom-right corner at ~15% opacity, and a folded-page corner (triangle via clip-path with lighter fill + inner shadow) on the top-right of the active page. Sparse — one coffee stain, one folded corner, a couple of tiny pencil doodles per page. Nothing more.

## Responsiveness

- Desktop: two-column spreads where noted (project sketch left, text right).
- Tablet: single column, page still shows margin + rules.
- Mobile: pocket-notebook mode — narrower page, smaller margin, page-turn becomes a horizontal swipe (Framer Motion drag with snap). Sticky notes stack in a 2-column grid.

## SEO & Head

Update `__root.tsx` head:
- title: "Piyush Prasad — Cloud & DevOps Engineer"
- description matching
- og:title, og:description, og:type=website, twitter:card=summary_large_image
- JSON-LD Person schema (name, jobTitle, url, sameAs github/linkedin)
- Preconnect + stylesheet links for Google Fonts (Caveat, Patrick Hand, Inter, IBM Plex Sans, JetBrains Mono)

No `og:image` added (would need a real hero image; skip per head-meta guidance).

## Files to change

- `src/styles.css` — add notebook color tokens, font family tokens, paper/rule/tape utility classes via `@utility`.
- `src/routes/__root.tsx` — add font `<link>` tags, update metadata, add JSON-LD.
- `src/routes/index.tsx` — full rewrite into notebook shell with 7 pages (Cover + 6 chapters) and Framer Motion transitions.
- `src/components/notebook/` — new small components: `NotebookPage`, `StickyNote`, `TimelineNode`, `TapedCert`, `Doodle`, `HandArrow`, `Signature`. Keeps `index.tsx` readable.

## Dependencies

- Add `framer-motion` (via `bun add framer-motion`).
- Lucide already available.
- No image assets required — all sketches are inline SVG.

## Out of scope

- Dark mode (spec marks optional; skipping to keep the notebook aesthetic pure).
- Real "flip a physical page" 3D book (using CSS `rotateY` transitions on stacked pages instead — feels like a page turn without a full book rig).
- Adding new project content beyond what exists; will reuse current copy plus placeholder sketches for Onix Mall / Linux Automation if user later provides content. **Question: should I include the two extra projects (Onix Mall, Linux Automation) as placeholders, or only render the two projects already in your resume?** I will assume "only the two existing projects" unless you say otherwise before implementing.
