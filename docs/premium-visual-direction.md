# Riley's_Office — Premium Visual Direction

> Project note: `PROJECT.md` and `BRAND.md` are now present in the project root and should be treated as active implementation context. This direction is grounded in the existing product brief, iPhone UX notes, world design, and current UI scaffold.

## North-Star Aesthetic
Riley's_Office should feel like a private executive operating suite on iPhone: dark architectural surfaces, controlled light, sharp data hierarchy, and subtle spatial depth that suggests walking through a premium office tower after hours.

The reference mood is:
- **Apple Wallet / Apple Sports clarity** for information density control
- **High-end automotive UI lighting** for premium contrast and edge glow
- **Luxury hotel lobby materials** for calm, expensive restraint
- **Mission-control precision** for operational seriousness

This is **not** neon cyberpunk, gamified sci-fi, or skeuomorphic office cosplay. The app should feel credible enough to run real work and distinctive enough to be instantly memorable.

## Brand Positioning in One Sentence
A luxury command app for operating governed AI workstreams from an iPhone.

## Experience Pillars
1. **Executive calm** — information feels composed, never noisy.
2. **Spatial legibility** — every screen reads like a room in the same building.
3. **Premium tactility** — cards feel milled, glass-backed, and precisely lit.
4. **Urgency without chaos** — blockers and alerts are vivid but controlled.
5. **Native-iPhone intimacy** — one-hand operation, large rhythm, sharp typography.

## Visual Personality
### What it should feel like
- expensive
- exacting
- architectural
- modern
- private
- alive

### What it must avoid
- startup-dashboard genericness
- loud gradients everywhere
- full black with no depth
- candy color saturation
- flat admin-panel tables
- cartoon office illustrations

## Core Material System
Use three consistent material families across the app.

### 1. Structural Base
Used for app background, screen framing, recessed zones.
- Charcoal-navy with blue undertone
- Matte finish
- Large soft vignettes instead of hard section breaks
- Reads like shadowed stone/glass architecture

### 2. Floating Glass Panels
Used for heroes, room cards, office tiles, sheets.
- Slight translucency
- Strong edge definition with cool-white top highlight
- Backdrop blur only where it improves depth, never as decoration
- Inner shadow to imply layered laminated glass

### 3. Instrument Surfaces
Used for pills, chips, mini meters, segmented controls, stat capsules.
- More opaque than panels
- Sharper contrast
- Tighter corner radius
- Higher typography density

## Color System
The existing purple accent is a useful seed, but the premium redesign needs a fuller palette.

### Core Neutrals
- `ink-950` — `#050816` main background
- `ink-900` — `#0A1220` elevated base
- `ink-850` — `#101A2A` recessed panels
- `slate-700` — `#243247` hard dividers / map lines
- `fog-300` — `#A8B6CC` secondary text
- `ice-100` — `#EAF1FB` primary text
- `white-true` — `#F8FBFF` specular highlights only

### Signature Accent Family
Use purple as the identity metal-light, not as flat fill.
- `violet-500` — `#7C6BFF`
- `violet-400` — `#998CFF`
- `violet-300` — `#C2B8FF`
- `violet-glow` — `rgba(124, 107, 255, 0.30)`

### Supporting Accent Family
Add cool cyan for live-system energy.
- `cyan-500` — `#3CCBFF`
- `cyan-400` — `#67D8FF`
- `cyan-glow` — `rgba(60, 203, 255, 0.24)`

### Status Colors
All state colors should be desaturated enough to feel premium.
- healthy — `#3DDC97`
- active — `#56C2FF`
- waiting — `#FFB84D`
- blocked — `#FF6B6B`
- stale — `#B39DFF`
- degraded — `#FF8D7A`
- locked — `#8A95A8`

### Usage Rules
- 70% neutral / 20% white-fog text / 10% accent light.
- Never place large solid purple blocks behind body text.
- State color should appear first in border, badge, meter, or dot before becoming a fill.
- Every alert surface needs a calm dark base plus a colored edge, not full red panels.

## Typography Direction
Use typography to sell the premium feel more than decoration.

## Type Pairing
- Primary UI sans: `Inter` or `SF Pro Display/Text` if available
- Accent numerics / compact telemetry: `JetBrains Mono` or `SF Mono` in limited instrumentation contexts only

## Type Scale
- Display hero: 32/36, weight 650, -0.03em
- Screen title: 28/32, weight 630, -0.02em
- Section title: 18/22, weight 600
- Card title: 16/20, weight 590
- Body primary: 15/22, weight 430
- Body compact: 13/18, weight 450
- Caption / eyebrow: 11/14, weight 600, +0.12em uppercase
- Telemetry mini: 12/14 mono, weight 500

## Typography Rules
- Screen titles can wrap to two lines max.
- Eyebrows must be sparse and meaningful; avoid stacking multiple metadata labels.
- Body copy should rarely exceed 3 lines on primary cards.
- Numeric data gets tighter tracking and slightly brighter color than descriptive text.
- Use sentence case for most UI labels; reserve uppercase for tiny system labels only.

## Shape Language
Current 20px radius is a good start but needs more hierarchy.

### Radius System
- screen modules / hero surfaces: `28px`
- primary cards: `24px`
- secondary cards: `20px`
- pills / chips: `999px`
- mini meters / icon wells: `16px`

### Edge Treatment
- outer stroke: 1px with cool translucent border
- top inner highlight: 1px white at 6–10% opacity
- deep inner shadow: soft navy-black to create lamination

## Elevation and Shadows
Premium depth should come from layered shadow stacks instead of stronger opacity.

### Elevation Stack
- `elevation-0`: flat instrumentation, no large shadow
- `elevation-1`: `0 10px 30px rgba(0,0,0,.18)`
- `elevation-2`: `0 18px 40px rgba(0,0,0,.24)`
- `elevation-3`: `0 28px 60px rgba(0,0,0,.34)` for hero and active sheet

### Lighting Rule
Every elevated surface also gets one of:
- subtle violet rim light for office-level surfaces
- subtle cyan rim light for live or active surfaces
- neutral white top-edge sheen for static premium surfaces

## Texture and Background Treatment
The app background should feel architectural, not empty.

### Global Background Recipe
- Base: `ink-950`
- Radial ambient pools at top-left and upper-center using violet and cyan at low opacity
- Very faint gridline or mullion pattern at 2–3% opacity in select screens only
- Deep vignette at edges to keep focus centered

### Spatial Cues
Use environmental bands to imply rooms and corridors:
- horizontal light seams behind hero cards
- faint floorplan lines in office map areas
- subtle depth fog behind stacked cards

## Iconography
- Use thin-to-medium stroke icons, 1.75–2px optical weight
- Rounded corners, not geometric harshness
- Filled icons only for active nav state or urgent callout badges
- Icon containers should be small glass wells or instrument capsules, never loose floating glyphs

## Component Appearance Rules
### Hero Cards
- Large, edge-lit, luxurious
- Must contain one dominant headline, one subheadline, and one status cluster
- Background can use directional glow tied to project accent
- Include at least one inset panel for secondary telemetry

### Section Cards
- More opaque than hero
- Stronger local contrast
- Clear title row with room-like framing
- Use interior spacing that feels architectural: 20–24px padding, 14–16px between modules

### Project Cards
- Transform from simple list cards into **office tiles**
- Add zone label, live state line, run progress meter, and occupancy indicator
- Accent should appear as edge lighting, door-stripe, or room beacon rather than left border only

### Agent Desk Cards
- Should resemble premium workstation pods
- Include role, live state, current contract fragment, and artifact activity strip
- Top-right state badge, bottom utility row
- Desk status glow should encode activity intensity

### Status Pills
- Use tinted glass with border + icon dot
- Minimum height: 28px
- Avoid flat outline-only pills for primary states

### Chips and Controls
- Resting state: smoky glass
- Active state: brighter core fill with inner glow
- Locked state: muted graphite with lock icon and lower contrast

### Bottom Navigation
- Should feel like a floating machined control bar
- Frosted dark capsule with individual active dock pocket
- Active tab receives small illuminated backplate and brighter icon/label
- Inactive items remain legible at 70% opacity

## Premium Motion Intent
Motion should imply moving between spaces in the same building.

### Motion Tone
- smooth
- slightly weighty
- restrained
- confidence over speed

### Transition Rules
- Screen push: 280ms, standard cubic-bezier `(0.22, 1, 0.36, 1)`
- Card lift / press: 160ms
- Sheet rise: 240ms
- Status pulse: 1800–2400ms ambient cycle, only on active live elements
- Shimmer / sweep: only on loading or live-sync rails, never on all cards

### Spatial Motion Metaphors
- Office -> project office: forward drift + scale-in from 0.98 to 1.0
- Project office -> desk: tighter zoom with vertical anchoring
- Room switching: horizontal rail slide with parallax of background grid
- Returning to overview: slight pullback, not abrupt replace

### Reduced Motion Mode
- Replace all zoom/parallax with fade + opacity emphasis
- Retain state change clarity using color and border changes only

## Photography / Illustration Policy
Do not use literal office photos or character art.
Allowed decorative assets:
- abstract architectural gradients
- line-based floorplan overlays
- glass reflections
- project insignia marks
- subtle topographic or blueprint textures

## Implementation Token Proposal
These should replace or extend the current flat token set.

```css
:root {
  --ink-950: #050816;
  --ink-900: #0A1220;
  --ink-850: #101A2A;
  --panel-strong: rgba(16, 26, 42, 0.88);
  --panel-glass: rgba(19, 31, 49, 0.72);
  --panel-soft: rgba(255, 255, 255, 0.04);
  --border-soft: rgba(181, 198, 224, 0.14);
  --border-strong: rgba(181, 198, 224, 0.22);
  --text-primary: #EAF1FB;
  --text-secondary: #A8B6CC;
  --text-tertiary: #7F8CA3;
  --violet-500: #7C6BFF;
  --violet-glow: rgba(124, 107, 255, 0.30);
  --cyan-500: #3CCBFF;
  --cyan-glow: rgba(60, 203, 255, 0.24);
  --success: #3DDC97;
  --active: #56C2FF;
  --waiting: #FFB84D;
  --blocked: #FF6B6B;
  --stale: #B39DFF;
  --degraded: #FF8D7A;
  --shadow-lg: 0 18px 40px rgba(0, 0, 0, 0.24);
  --shadow-xl: 0 28px 60px rgba(0, 0, 0, 0.34);
  --radius-hero: 28px;
  --radius-card: 24px;
  --radius-subcard: 20px;
}
```

## Visual QA Checklist
A screen passes the premium direction only if:
- it feels intentionally layered before color is added
- the user can identify the primary action in under 2 seconds
- blockers are high-salience without turning the whole screen red
- the design still looks expensive in grayscale
- no section feels like a generic SaaS card dump
- motion reinforces room-to-room movement, not random animation

## Engineer Handoff Summary
If engineering implements only the most important visual changes first, do these in order:
1. Replace the flat token palette with the premium neutral/accent system.
2. Upgrade hero, card, and nav surfaces to layered glass/architectural panels.
3. Introduce room/desk/project-specific card layouts with stronger hierarchy.
4. Add ambient spatial background treatments and edge lighting.
5. Add restrained room-transition motion and active-state pulses.

