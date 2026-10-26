# Nathan Nunes — Portfolio

A single-page portfolio for Nathan Nunes, built with Next.js App Router, TypeScript, Tailwind CSS, framer-motion and two Google fonts loaded through `next/font`.

The page is one route (`/`). On large screens it behaves as a full-screen section deck: each section fills the viewport and wheel, swipe, keyboard or nav links page between them. The outgoing section rushes toward the viewer and phases out while the next one pops through behind it, and the sky and clouds rise with each step. Below the deck breakpoint, and for reduced-motion visitors, the same markup is a normal scrolling page.

The hero is type over the shared sunset gradient, with the portrait set beside the copy on larger screens. A liquid-glass lens follows the pointer across the whole page, including the nav, the deck and the contact panel. All copy lives in [`lib/content.ts`](lib/content.ts) so it can be audited against the build handover in one place.

## Stack

- Next.js `14.2.15` (App Router)
- React `18.3.1`
- TypeScript `5.6.3`
- Tailwind CSS `3.4.17`
- framer-motion `11.18.2` (sky and cloud motion, card tilt, lens; the deck tunnel itself is CSS)
- lucide-react `0.468.0` (arrow icon on project links)
- sharp `0.33.5` (build-time image optimisation)
- Fraunces (display) and IBM Plex Sans (body), via `next/font/google`
- Node.js 20 LTS or later

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build and run in production

```bash
npm run build
npm run start
```

## How the deck works

`components/DeckProvider.tsx` owns the deck:

- Deck mode turns on only when the viewport is at least `1024 × 700` and `prefers-reduced-motion` is not set. Everything else keeps the normal document scroll.
- `components/SectionDeck.tsx` wraps the four sections in `[data-deck-panel]` divs. In deck mode the panels overlap at `[0, height]` instead of sitting in a moving track; the active panel sits on top (`z-index: 2`). Each panel is wrapped in `.tunnel-panel` and gets `data-deck-state="active"`, `before` or `after`.
- The tunnel is pure CSS. The section being left (`before`) travels to `translateY(-3%) scale(1.7)` with `opacity: 0` and a 4 px blur, so it rushes past the viewer and phases out. The section waiting behind (`after`) rests at `translateY(6%) scale(0.6)` with `opacity: 0` and a 5 px blur, then pops through to `scale(1)`, `opacity: 1` and no blur when it becomes active. The origin is `50% 45%`, slightly above centre, so the zoom reads as depth rather than a slide.
- The transform eases over 900 ms with `cubic-bezier(0.16, 1, 0.3, 1)`. Leaving opacity and filter finish in 460 ms; arriving opacity and filter take 680 ms with a 90 ms delay, so the incoming section resolves just after the outgoing one has cleared.
- Panels are `var(--deck-height, 100svh)` with their own `overflow-y`. A wheel or key only advances the deck once the active panel is at its scroll edge, so a section that is taller than the viewport scrolls normally first, then hands over. Wheel intent accumulates 28 px and paging is locked for 620 ms so a trackpad flick cannot skip sections.
- Supported input: wheel, touch swipe (60 px threshold), `ArrowDown`/`ArrowUp`, `PageDown`/`PageUp`, `Space`/`Shift+Space`, `Home`/`End`, and any `href="#section"` link.
- Nav links call `history.replaceState` and move the deck instead of jumping the document. A `#hash` on first load opens the matching panel; in normal-scroll mode the section is focused below the fixed header.
- Focus follows the deck: tabbing into a panel that is off screen moves the deck to that panel. Content is never `inert` or hidden from assistive technology.

## How the sky works

The sunset runs behind the whole page rather than only the hero.

- `DeckProvider` publishes a single `pageProgress` motion value: the active panel's fraction of the deck in deck mode, or `scrollYProgress` when the page scrolls normally.
- `components/SkyBackdrop.tsx` is a fixed, three-layer gradient sky. A day, gold and dusk gradient cross-fade against that progress, so the page warms from cool blue at the top to dusk at the contact panel. A sun and horizon haze drift at different rates for depth.
- `components/CloudField.tsx` is a fixed field of six cloud images **behind** the content (`z-0`), so each section step lifts the clouds while text and cards stay crisp. Each cloud has its own lift (540–900 px across the page), drift (±110–220 px), opacity (0.45–0.62), blur and ambient float. Even when the page is idle the clouds keep drifting a few pixels, so the sky never looks frozen. Both layers are `aria-hidden` and `pointer-events-none`.
- Content and cards sit on `main` at `z-10`; nav is `z-20` and the skip link `z-50`.
- `components/Reveal.tsx` fades blocks in as they enter the viewport when the page scrolls normally. In deck mode the panel itself carries the motion and the reveal transition is disabled, so a section never arrives semi-transparent.
- `lib/usePrefersReducedMotion.ts` is the single source of truth for the motion preference. The deck waits for that read before enabling, so a reduced-motion visitor never gets a one-frame deck activation that would cancel a deep link.

## Project structure

```text
app/
  layout.tsx          Fonts, metadata, deck provider, sky, cloud field, whole-page lens, nav and skip link
  page.tsx            The single page and all section markup
  globals.css         Tailwind directives, cloud cards, deck panels, tunnel transforms, reveals, lens copy, reduced motion
components/
  DeckProvider.tsx    Deck state, page progress, wheel/touch/key/nav/focus input
  SectionDeck.tsx     Overlapping full-viewport panels with the tunnel handover
  SkyBackdrop.tsx     Page-wide sunset gradients, sun and haze
  CloudField.tsx      Six-layer cloud field behind the content
  Reveal.tsx          Scroll-in entrance that degrades to visible
  Nav.tsx             Sticky glass nav and mobile disclosure menu
  Hero.tsx            Hero copy and portrait over the gradient
  Timeline.tsx        Record timeline and certifications
  SkipLink.tsx        First focusable element
  ui/
    liquid-glass-cursor.tsx  Whole-page pointer lens built from a client clone of the page
    3d-card.tsx              Transparent project card with pointer tilt
lib/
  content.ts                Every piece of page copy
  media.ts                  Build-time checks for the cloud and portrait assets
  usePrefersReducedMotion.ts Motion preference hook
  utils.ts                  Dependency-free class-name joiner
public/
  resume.pdf        Present in the repository
  images/
    clouds/         Five transparent cloud images
    cards/          Four square cloud-photo card textures
    portrait.jpg    Hero portrait
```

The previous version of the site is preserved on the `legacy-site` git branch.

## Image assets

| Asset | Files | Notes |
|---|---|---|
| Cloud layers | `public/images/clouds/cloud-1.webp` to `cloud-5.webp` | Present, transparent background, 890–1376 px wide, 10–80 KB each. All five must exist for the field to render. |
| Card textures | `public/images/cards/card-1.webp` to `card-4.webp` | Present, square 1024 × 1024, 12–30 KB each. `card-3.webp` backs the contact card; the other three are spares from the same set. |
| Resume | `public/resume.pdf` | Present. Confirm it is the current version before launch. |
| Social preview | `public/images/og.jpg` | Optional and currently absent. No OG image tag is emitted. |
| Portrait | `public/images/portrait.jpg` | Present. 1536 × 2048 JPEG, served through `next/image`. Sits to the right of the hero copy at `md` and above, and stacks below it on phones. The layout omits it automatically if the file is removed. |

The hero is drawn from the shared gradient and the cloud field, plus the portrait; the old sunset photograph is gone.

Cloud card textures are cropped from two free Freepik photos found through the Magnific MCP stock search:

- `2461477` — “Clouds in the blue sky”
- `2829674` — “Clouds from below”

They were cropped square, brightened slightly, desaturated for use under white text, flopped for variety and exported as WebP. **They were generated from 626 px previews because the MCP download endpoint was rate limited**; regenerate `card-1..4.webp` from the 7.6 MB originals and keep the same filenames before launch. Check the Freepik licence terms for the attribution requirements that apply to public use.

Cloud artwork is derived from a free Freepik stock asset (ID `1215902`) obtained through the same integration. The renders were luminance-keyed to transparency, cropped and re-exported as WebP.

Image availability is checked at build time in `lib/media.ts`, so a production rebuild is required after adding or removing assets. This avoids requesting files that do not exist and keeps the console clean.

## Build warnings and dependency notes

- `npm run build` completes with no errors or warnings.
- `npm install` reports npm audit findings, including an advisory against Next.js `14.2.15`. The version is pinned as required by the handover. Plan an upgrade to a patched Next.js 14 release, or a separately scoped framework upgrade, after launch.
- `sharp` is installed, so the production image optimiser runs without the optional-dependency notice.
- First Load JS is about 137 kB for `/`, with the shared runtime at 87 kB. framer-motion is imported by the deck, sky, cloud, card and lens components; lucide-react adds the single arrow icon; the hero portrait adds the optimiser route.

## Decisions made where the brief was silent

- The app lives at the repository root (`app/`, `components/`, `lib/`) rather than under `src/`.
- The deck is enabled at `min-width: 1024px` and `min-height: 700px`. Smaller viewports keep native scrolling, and reduced motion always disables the deck. A section that overflows its panel scrolls inside the panel before the deck advances.
- The sticky nav uses a zero-height sticky wrapper so its glass bar floats over the sky without taking layout space. Sections use `scroll-margin-top: 7rem` so anchored navigation clears the bar when the page scrolls normally.
- The sky is fixed and shared by every section, which keeps the sunset continuous instead of restarting per section. Sections themselves are transparent.
- Clouds sit behind the content (`z-0`) rather than in front. The first build layered them above the cards; the blur and white haze washed out body text and contact buttons. Depth now comes from parallax, scale and blur across the six layers, and the contact card carries a cloud texture instead.
- Project cards are transparent glass panels: a `bg-white/10` surface with a `2px` backdrop blur, a white hairline border and a soft shadow, so the sky and clouds stay visible through them. The card lifts its content `36px` on the z axis and tilts up to 7° toward the pointer; reduced motion drops the tilt. The hero paragraph stays on `.glass`, and the contact panel keeps the `.cloud-card` texture.
- The liquid-glass lens covers the whole page rather than just the hero. Wrapping the page in the lens while keeping a single set of `[data-deck-panel]` nodes is the hard part: the magnified surface is a **client-side clone of the rendered page**, taken after mount. The clone strips ids, `data-deck-panel`, `tabindex` and ARIA references, demotes every heading to a `p`, and is `aria-hidden` plus `inert`, so the real page keeps the only outline and focus stops. Clone sync copies `--deck-height`, each panel's `scrollTop` and `data-deck-state`, the card tilt and the sticky header offset, so the lens follows paging, the tunnel zoom and inner-panel scrolling. The clone keeps the tunnel transition instead of the blanket `transition: none`, so the magnified view turns with the page rather than snapping to the next section. The clone is only built on fine-pointer devices; touch-only phones skip it. The supplied component's SVG displacement filter was dropped: in Chromium it caused the whole page to re-render through the filter region, which showed up as ghosted text and a washed-out sky. A backdrop blur on the lens caused the same kind of page-wide wash, so the glass is a tinted disc with a rim, highlight and offset shadow instead. Reduced motion renders a plain wrapper with the native cursor and no lens.
- All secondary text is `ink/80`, not `ink/70`. `ink/70` measured 3.78:1 against the darkest dusk stop, below 4.5:1; `ink/80` measures at least 5.24:1 across all three sky states.
- The mobile menu adds `bg-white/60` on top of `.glass`. The extra white keeps the menu labels above 4.5:1 contrast when the open menu sits over the sunset hero; the closed nav bar is unchanged.
- The existing favicon is kept. No new favicon was generated.
- Structured data was left out. The metadata fields are exactly the ones requested.

## Copy notes for the owner

The original handover copy was kept except for the hero: the slogan is now “Securing the cloud, minus the fog.” and the first hero paragraph was rewritten around cloud systems plus GRC tooling, so the hero matches the rest of the page. The portrait has returned to the hero, and Unilinq now links out to <https://unilinq.org>. A few open items need confirmation before launch:

1. Confirm the GRC agent still maps exactly 3 frameworks: NIST CSF, ISO 27001 and Essential Eight.
2. Confirm the Unilinq description, including “Live, and currently in trial with 3 SMEs”, is current and safe to publish, and that `unilinq.org` is the canonical live URL.
3. Confirm the four certification statuses are current on launch day.
4. Confirm the portrait is the photo you want public and that you have the rights to use it.
5. Confirm the resume PDF is the current version.
6. Confirm the card textures can be regenerated from the full-resolution Freepik originals.
7. Confirm the slogan “Securing the cloud, minus the fog.” and the cloud-plus-GRC hero paragraph are final.

## Accessibility and motion

- One `h1`; sections use `h2`; cards and subheadings use `h3`.
- Skip link is the first focusable element and targets `main#main`.
- The mobile menu is a disclosure with `aria-expanded` and `aria-controls`, closes on link click and Escape, and returns focus to the menu button on Escape.
- `:focus-visible` outlines use the accent colour.
- All decorative imagery is hidden from assistive technology.
- The deck keeps all four panels in the accessibility tree and never sets `inert` or `aria-hidden`. Tabbing or focusing into an off-screen panel moves the deck to that panel, and nav links move the deck instead of jumping the page.
- The deck is keyboard-operable (`Home`, `End`, arrows, `PageUp`/`PageDown`, `Space`), and wheel paging is disabled while a panel still has scroll left in the requested direction.
- Reduced motion is read through `matchMedia` after mount (via `usePrefersReducedMotion`, not framer-motion's synchronous hook, which caused a hydration mismatch). It disables deck mode entirely, holds the sky on a single static gradient, drops the cloud parallax and ambient float, removes the lens in favour of a plain wrapper with the normal cursor, disables card tilt, and never arms the reveal animation. The page renders fully visible and scrolls normally with the preference on.
- The lens copy is decorative: `aria-hidden` plus `inert`. It has no ids and no `data-deck-panel`, and its headings are demoted to `p`, so the page keeps exactly one `h1`, one `hero-heading` id and one set of focus stops. Pointer events pass through the lens, so its calls to action still activate the real link underneath.
- The lens is only built when `(any-pointer: fine)` matches. Touch-only devices keep native scrolling and the native cursor without cloning the page.
- Reveals arm only after mount and only for blocks that start off screen, so content is visible if scripts fail or an observer never fires.
- An earlier build used framer-motion's `whileInView` for reveals; under `prefers-reduced-motion` the blocks stayed at `opacity: 0` and the page below the hero was blank. That is why reveals are now CSS transitions driven by `IntersectionObserver`.

## Deployment

1. Push the repository to GitHub.
2. Import it in Vercel with the Next.js preset. Build command: `npm run build`.
3. Point `www.nnunes.com` at the deployment and handle the apex redirect in DNS.
4. No environment variables, backend or analytics are required.

## Checks run for this build

- `npm run build` passes with TypeScript strict mode.
- Browser console is clean in production at 1440 × 900 and 390 × 844.
- Deck paging checked via nav links, wheel, arrow keys, `Home`/`End` and rapid scroll bursts; the active panel always lands at the viewport, the tunnel states swap in the right order and paging stays locked for 620 ms.
- The tunnel was sampled at 60, 140, 240, 360, 520, 700 and 900 ms after a page step: the outgoing panel grows and fades on schedule, the incoming panel pops through after its 90 ms delay, and the real panels and the lens clone report identical transform, opacity and filter values at every sample.
- Tunnel visuals were captured as a contact sheet with and without the lens; the two tracks stay in step, and a baseline pair with no lens in either frame showed the same ambient cloud drift, so the lens does not leak outside its clipped disc.
- Inner panel scrolling checked at 1024 × 700 and 1280 × 720, where Selected work overflows its panel: wheel scrolls the panel first, then advances once it reaches the bottom.
- Deep links (`#record`, `#contact`, `#projects`) open the right panel on a cold load in deck mode.
- Focus following: focusing a contact link from the Record panel moves the deck to Contact.
- Reduced motion at 1440 × 900 disables the deck, keeps every block visible and lands `#record` below the fixed header. Mobile at 390 × 844 also keeps native scrolling and clears the header on nav jumps.
- Cloud layers are `pointer-events-none`; link hit-testing resolves to the real anchors.
- Whole-page lens checked at 1440 × 900 over the hero, Selected work, Record, Contact and the nav: it magnifies the clone, follows deck paging and inner-panel scrolling, and keeps the sticky nav aligned. The clone has 0 ids, 0 `data-deck-panel` nodes and 0 headings, is `aria-hidden`/`inert`, and produces no duplicate ids. Deck paging still lands on the right section.
- Cloud motion checked: idle clouds drift roughly 9 px over 2.4 s, and a deck step lifts them by about 520 px.
- Hero checked at 1440 × 900, 1280 × 800, 1024 × 700 and 390 × 844: one `h1`, the portrait sits to the right of the copy on desktop and stacks under it on mobile, and no panel overflows its viewport at the deck breakpoint.
- The Unilinq card renders “Visit unilinq.org” and resolves to `https://unilinq.org/`.
- Four panels with three nav links (`#projects`, `#record`, `#contact`) are the whole deck; the old Writing section is gone.
- Project cards are transparent (`rgba(255,255,255,0.1)` behind a 2 px blur), tilt up to 7° toward the pointer, and drop the tilt under reduced motion.
- Production console is clean on cold loads, including with reduced motion emulated: the cursor no longer causes a hydration mismatch.
- Contrast: body and secondary text at `ink/80` measure at least 5.24:1 against every sky gradient stop; the accent button is 7.90:1.
- No horizontal overflow at 360, 390, 640, 720, 768, 1024, 1440 or 1920 px.
- Mobile menu open/close, Escape-close and focus return tested.
- Keyboard order starts with the skip link; every focus stop has a visible accent outline and at least a 44 × 44 px target.
- Resume, mailto and external link targets match the brief.
- All page copy was checked against Section 3 of the handover.
- Lighthouse on the production build scores Accessibility 100, Best Practices 100 and SEO 100, with no failing audits. That audit does not produce a performance score; before launch, still profile Total Blocking Time and memory on a low-end laptop because the lens clones the page after mount and the tunnel blurs full-viewport layers.
