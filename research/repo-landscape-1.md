# REPO LANDSCAPE 1 — Riley's_Office

Project note: `PROJECT.md` and `BRAND.md` were not present in `C:\Users\omino\.openclaw\workspace\projects\Riley's_Office` during this research pass, so this document is grounded in `product-brief.md`, `readme.md`, and live GitHub repo metadata.

## What Riley's_Office actually needs from GitHub research

Riley's_Office is not trying to become a full game engine. It needs a **game-feeling operator interface** for mobile:
- a scene-first HQ world
- project rooms and agent desks that feel spatial and explorable
- lightweight isometric / fake-3D language
- touch-friendly motion and camera choreography
- strong React/Next foundations instead of a fragile bespoke rendering stack

That means the best repos to learn from are not just “cool 3D websites.” They should teach one of these concrete patterns:
1. **R3F scene architecture**
2. **camera, motion, and interaction orchestration**
3. **world navigation or room composition**
4. **isometric projection / tile layout thinking**
5. **game-state organization that still plays nicely with React**

---

## Tier 1 — foundational repos Riley's_Office should actively borrow from

### 1) pmndrs/react-three-fiber
- Repo: https://github.com/pmndrs/react-three-fiber
- Why it matters:
  The core React renderer for Three.js. This is the foundation if Riley's_Office moves from fake-3D CSS scenes into selective real 3D layers without abandoning the React mental model.
- What to borrow:
  - declarative scene composition inside React
  - camera, lights, meshes, and event handling as components
  - separation of scene graph concerns from app-shell concerns
  - progressive enhancement: keep some UI in DOM, move only the high-value world layers into canvas
- Riley's_Office application:
  Use R3F for the **HQ skyline/world map layer**, not for every screen. Keep cards, chat, controls, and governance UI in normal React DOM. Use R3F surgically for:
  - animated skyline background
  - project-office fly-ins
  - ambient depth/parallax
  - interactive room hotspots
- Recommendation:
  **Adopt as the long-term rendering foundation** if the product graduates from CSS fake-3D into actual spatial navigation.

### 2) pmndrs/drei
- Repo: https://github.com/pmndrs/drei
- Why it matters:
  Drei is the practical toolbox that makes R3F production-usable. It reduces a huge amount of low-level boilerplate.
- What to borrow:
  - staging helpers for cameras, environments, shadows, text, bounds, controls
  - loaders and helpers for models and interaction
  - common presentation primitives instead of hand-rolling everything
- Riley's_Office application:
  Very useful for quickly shipping:
  - hoverable world markers
  - room labels floating in space
  - soft lighting / environment presets
  - bounded camera framing for mobile-safe scenes
  - lightweight model loading if desks, monitors, or room props become 3D assets
- Recommendation:
  **Mandatory companion to R3F** if Riley's_Office adds canvas scenes.

### 3) theatre-js/theatre
- Repo: https://github.com/theatre-js/theatre
- Why it matters:
  Riley's_Office needs cinematic transitions more than physics. Theatre is strong for art-directed motion, camera choreography, and scene states.
- What to borrow:
  - timeline-based camera moves
  - keyframed transitions between scene states
  - authorable motion curves for polish instead of ad hoc spring tuning everywhere
  - coordination of animation with UI state changes
- Riley's_Office application:
  Ideal for:
  - zoom from HQ to a project room
  - snap from project room to agent desk
  - focus mode when opening evidence or alerts
  - subtle environmental motion loops that make the office feel alive
- Recommendation:
  **High-value polish layer** once the base world navigation is stable.

### 4) coldi/r3f-game-demo
- Repo: https://github.com/coldi/r3f-game-demo
- Why it matters:
  This is one of the most directly relevant small repos because it shows a simple tile-based game structure in R3F rather than a generic portfolio.
- What to borrow:
  - tile/grid thinking for world layout
  - mapping abstract game coordinates to rendered space
  - simple player/world interaction patterns
  - scene composition that feels like a navigable environment instead of a landing page
- Riley's_Office application:
  Riley's_Office can treat:
  - projects as districts/tiles in HQ
  - rooms as navigable zones
  - desks as nodes inside a room
  This repo is useful for thinking in **world coordinates and adjacency**, which is more scalable than hand-positioning everything visually.
- Recommendation:
  **Best small reference repo for world-map structure**.

### 5) ViciousFish/buzzwords
- Repo: https://github.com/ViciousFish/buzzwords
- Why it matters:
  A browser-based game with real product structure, not just a visual demo. Helpful for understanding how a game-like front end can coexist with actual app logic.
- What to borrow:
  - organization of front-end systems around a playable interface
  - event-driven UI layered on top of a game board
  - patterns for state, actions, and interaction feedback in a browser game
- Riley's_Office application:
  The lesson here is architectural: Riley's_Office needs a **serious app core disguised as a playful world**. This repo is relevant for how to keep actual application logic behind game-feeling surfaces.
- Recommendation:
  **Reference for product-grade browser-game architecture**, not visual style.

---

## Tier 2 — repos that are especially useful for spatial presentation patterns

### 6) VinayMatta63/threejs-portfolio
- Repo: https://github.com/VinayMatta63/threejs-portfolio
- Why it matters:
  One of the better examples of a game-like portfolio with character movement and explorable feeling rather than static hero-section 3D.
- What to borrow:
  - embodied navigation patterns
  - environmental storytelling through scene layout
  - using motion and interaction to make a site feel like a place
- Riley's_Office application:
  Useful as inspiration for how the operator “walks into” an office or control room rather than simply opening another dashboard page.
- Caution:
  Do not borrow portfolio tropes wholesale. Borrow **sense of traversal and spatial reveal**, not vanity-site conventions.
- Recommendation:
  **Strong experiential reference** for scene-to-scene navigation feel.

### 7) mohitvirli/mohitvirli.github.io
- Repo: https://github.com/mohitvirli/mohitvirli.github.io
- Why it matters:
  Combines React Three Fiber, Drei, GSAP, and Zustand in a real portfolio build. Good example of how scene logic and UI state can coexist.
- What to borrow:
  - state partitioning between visual scene state and app/UI state
  - layered animation systems
  - scroll/transition choreography without fully losing React structure
- Riley's_Office application:
  Helpful for building:
  - a persistent world state store
  - scene transition state
  - focused camera mode vs overview mode
  - animated overlays that stay synchronized with 3D motion
- Recommendation:
  **Good bridge repo between flashy demo and maintainable React app**.

### 8) Giats2498/giats-portfolio
- Repo: https://github.com/Giats2498/giats-portfolio
- Why it matters:
  More polished than many tutorial portfolios. Useful for studying pacing, transitions, and presentation discipline.
- What to borrow:
  - pacing of reveals
  - restrained scene transitions
  - premium-feeling motion design in a React/Next context
- Riley's_Office application:
  Riley's_Office needs a premium command-center feel, not noisy motion. This repo is useful as a reference for **tasteful motion density**.
- Recommendation:
  **Use as a polish benchmark**, especially for transition cadence.

---

## Tier 3 — repos specifically relevant to isometric and room/world layout thinking

### 9) axaq/traviso.js
- Repo: https://github.com/axaq/traviso.js
- Why it matters:
  An open-source JS engine focused on building isometric applications in the browser. Even if Riley's_Office never uses it directly, it is highly relevant conceptually.
- What to borrow:
  - isometric coordinate thinking
  - tile-to-screen mapping logic
  - how interaction zones and navigation work in a projected world
  - scene readability when many objects share one view
- Riley's_Office application:
  Useful if Riley's_Office evolves from “fake perspective cards” into a true **2.5D office map** where rooms, desks, and agents occupy a single spatial coordinate system.
- Recommendation:
  **Best conceptual repo for isometric projection logic**.

### 10) numtel/webgl-isometric
- Repo: https://github.com/numtel/webgl-isometric
- Why it matters:
  Focused on orthographic/isometric-ish world rendering from tiled maps. Less mature as a product reference, but useful technically.
- What to borrow:
  - orthographic camera thinking
  - map-driven world generation
  - separation between authored map data and rendering logic
- Riley's_Office application:
  If HQ becomes data-driven, Riley's_Office could store district/room layout as map-like JSON rather than hand-coded JSX positions.
- Recommendation:
  **Useful technical reference for data-driven layout generation**.

### 11) igorski/rts
- Repo: https://github.com/igorski/rts
- Why it matters:
  Isometric RTS concepts are relevant because they solve the exact problem of showing many actionable entities in one overview.
- What to borrow:
  - overview readability
  - selection hierarchies
  - macro-to-micro navigation patterns
  - importance encoding through scale and position
- Riley's_Office application:
  HQ should behave like a command overview: many projects visible at once, with the ability to drill into one room or desk. RTS layout thinking is a strong fit for that.
- Recommendation:
  **Good conceptual reference for command-surface hierarchy**.

---

## Tier 4 — repos useful for system architecture, not necessarily direct visual borrowing

### 12) verekia/manapotion
- Repo: https://github.com/verekia/manapotion
- Why it matters:
  A toolkit for JavaScript game development and interactive experiences with explicit R3F relevance. Interesting because it thinks in reusable systems rather than one-off scenes.
- What to borrow:
  - modular game-system design
  - reusable interaction primitives
  - ECS-ish thinking where appropriate
- Riley's_Office application:
  Riley's_Office probably does not need full ECS complexity yet, but this repo is useful for thinking about reusable systems such as:
  - hover/select/focus mechanics
  - world object metadata
  - interaction registration
  - scene object lifecycle
- Recommendation:
  **Useful if Riley's_Office starts accumulating too many bespoke interaction components**.

### 13) akarlsten/cuberun
- Repo: https://github.com/akarlsten/cuberun
- Why it matters:
  A small 3D game built in react-three-fiber. Helpful for studying game-loop and interaction organization in a compact codebase.
- What to borrow:
  - compact scene/game organization
  - handling responsiveness and motion inside an R3F app
  - separating gameplay-ish logic from rendering elements
- Riley's_Office application:
  Good reference if Riley's_Office adds lightweight avatar-like movement, active camera rails, or simple mini-interactions in rooms.
- Recommendation:
  **Use as a compact code-reading reference**, not as a design reference.

---

## Best patterns to explicitly copy into Riley's_Office

### Pattern A — DOM UI over a selective 3D world layer
**Borrow from:** `pmndrs/react-three-fiber`, `pmndrs/drei`, `mohitvirli/mohitvirli.github.io`

Riley's_Office should not put chats, cards, logs, forms, and approval controls inside the 3D scene. Instead:
- keep governance/product UI in DOM
- keep 3D or pseudo-3D for the spatial shell
- synchronize them through shared state

This keeps the app fast, accessible, and easier to ship on iPhone.

### Pattern B — world coordinates, not page-by-page decoration
**Borrow from:** `coldi/r3f-game-demo`, `axaq/traviso.js`, `numtel/webgl-isometric`

Instead of manually composing each screen as unrelated art direction, define:
- HQ districts
- room zones
- desk coordinates
- camera targets
- interaction hotspots

That turns Riley's_Office into a coherent world rather than a sequence of themed pages.

### Pattern C — art-directed transitions between overview, room, and desk
**Borrow from:** `theatre-js/theatre`, `Giats2498/giats-portfolio`

The highest-value motion in Riley's_Office is not ambient spinning objects. It is transition logic:
- overview -> project room
- room -> agent desk
- desk -> artifact focus
- alert -> urgent camera snap/focus state

This is where the app will feel premium.

### Pattern D — app-grade logic behind a playful shell
**Borrow from:** `ViciousFish/buzzwords`, `mohitvirli/mohitvirli.github.io`

Riley's_Office is still an operations product. It needs:
- reliable state stores
- event-driven updates
- interaction contracts
- strong separation between data truth and visual treatment

The game-feel should sit on top of a disciplined app architecture.

---

## Repos to prioritize first in actual implementation order

### Immediate study order
1. `pmndrs/react-three-fiber`
2. `pmndrs/drei`
3. `coldi/r3f-game-demo`
4. `theatre-js/theatre`
5. `mohitvirli/mohitvirli.github.io`
6. `axaq/traviso.js`

Why this order:
- first establish the rendering foundation
- then understand practical helpers
- then understand world/grid composition
- then add polished transitions
- then study app/scene state coexistence
- then deepen isometric logic if needed

---

## Concrete implementation recommendations for Riley's_Office

### Recommendation 1 — use a hybrid architecture
- **DOM:** chat, cards, approvals, alerts, evidence, command actions
- **R3F/canvas:** skyline, room shells, desk scenes, camera travel, environmental depth

This is the safest path to a “video-game-like web world” without making the app brittle.

### Recommendation 2 — create a world schema before adding more visuals
Borrow the tile/world thinking from `coldi/r3f-game-demo` and `traviso.js`.

Suggested entities:
- `district`
- `projectRoom`
- `agentDesk`
- `hotspot`
- `cameraTarget`
- `ambientState`

This will scale much better than hand-positioning every new room in JSX/CSS.

### Recommendation 3 — treat camera choreography as a product feature
Borrow from `theatre-js/theatre`.

The product should feel amazing when the user:
- opens the app
- taps into a project
- focuses an agent
- jumps to an alert

Those transitions should be intentional, authored, and consistent.

### Recommendation 4 — use isometric ideas selectively, not dogmatically
Borrow from `traviso.js` and `webgl-isometric` conceptually.

Riley's_Office probably does **not** need a literal tile-map office game. What it does need is the clarity that isometric systems provide:
- spatial hierarchy
- object legibility
- predictable layout
- navigable adjacency

Use those ideas to inform the office map, but keep the UI product-oriented.

### Recommendation 5 — avoid copying tutorial-portfolio structure too literally
Many portfolio repos are helpful for polish but weak for product architecture. Use them for:
- pacing
- motion quality
- sense of place
- layering and reveal

Do **not** use them as the main blueprint for data/state architecture.

---

## Final shortlist

If Riley's_Office only studies six repos deeply, use these:

1. `pmndrs/react-three-fiber` — core rendering foundation
2. `pmndrs/drei` — production helper toolkit
3. `theatre-js/theatre` — premium camera and transition choreography
4. `coldi/r3f-game-demo` — best direct reference for navigable R3F world structure
5. `axaq/traviso.js` — best conceptual reference for isometric world logic
6. `mohitvirli/mohitvirli.github.io` — best bridge between scene work and app-grade React state

## Evidence sources
- `C:\Users\omino\.openclaw\workspace\projects\Riley's_Office\product-brief.md`
- `C:\Users\omino\.openclaw\workspace\projects\Riley's_Office\readme.md`
- GitHub API metadata retrieved during this run for:
  - `pmndrs/react-three-fiber`
  - `pmndrs/drei`
  - `theatre-js/theatre`
  - `coldi/r3f-game-demo`
  - `ViciousFish/buzzwords`
  - `VinayMatta63/threejs-portfolio`
  - `mohitvirli/mohitvirli.github.io`
  - `Giats2498/giats-portfolio`
  - `axaq/traviso.js`
  - `numtel/webgl-isometric`
  - `igorski/rts`
  - `verekia/manapotion`
  - `akarlsten/cuberun`
