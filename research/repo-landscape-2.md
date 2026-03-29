# Riley's_Office — Interactive World / Simulation UI Reference Set

## Goal
Curated references for a browser-based, iPhone-first "spatial command center" that feels like moving through a live headquarters without becoming a gimmicky game. The focus here is on interaction patterns, scene composition, and what to steal for Riley's_Office.

## Selection Criteria
- Browser-native or browser-first interaction model
- Strong spatial comprehension layer
- Useful patterns for rooms, desks, maps, digital twins, or simulation dashboards
- Adaptable to 2D/2.5D mobile UI rather than requiring full 3D free-roam

---

## 1) WorkAdventure
- **Type:** Browser-based multiplayer office world
- **Repo:** https://github.com/workadventure/workadventure
- **Why it matters:** One of the clearest examples of a work product framed as a navigable office/game world without losing utility.

### What to learn
- **Room-as-navigation:** People understand destinations faster when they are framed as named spaces rather than abstract tabs.
- **Presence by proximity:** Agents feel "placed" in the world, not just listed in a feed.
- **Spatial memory:** A project office or ops room becomes memorable because it always occupies the same place.

### Apply to Riley's_Office
- Use **fixed rooms** like Mission Control, Delivery Wall, Ops Room, Inbox, and Archive as persistent anchors.
- Show **agent desks as placed objects**, not just status cards.
- Borrow the sense of "walking into a place," but implement it as **tap/swipe transitions between scene layers**, not avatar movement.

### Pattern takeaway
**Spatial destination beats tab overload** when the operator must remember where system state lives.

---

## 2) Gather
- **Type:** Product reference for virtual office / spatial collaboration
- **Product:** https://www.gather.town/
- **Why it matters:** Strong proof that office metaphors can support real work when the environment is visually legible and lightweight.

### What to learn
- **Atmosphere without clutter:** The environment sets mood, but utility still comes from obvious hotspots and zones.
- **Identity through place:** Teams, rooms, and functions become easier to remember when associated with a visual district.
- **Soft game language:** It feels playful, but still supports serious coordination.

### Apply to Riley's_Office
- Give each project office a **recognizable signature composition**: accent color, room arrangement, desk cluster shape, and one hero status object.
- Use **room landmarks** to encode function: a wall for deliverables, a console for runtime, a desk cluster for agents.
- Keep decorative worldbuilding secondary to **operator readability in under 10 seconds**.

### Pattern takeaway
**Visual landmarks create faster recall** than generic screen layouts.

---

## 3) Matterport
- **Type:** Digital twin / immersive space navigation product
- **Product:** https://matterport.com/
- **Why it matters:** Excellent reference for turning a complex space into a legible explorable model with clear points of interest.

### What to learn
- **View framing matters:** Users need an obvious "best angle" that introduces the scene before deeper navigation.
- **Hotspot density control:** Too many interactive points at once destroys comprehension.
- **Layered reveal:** Summary first, detail second, inspection third.

### Apply to Riley's_Office
- Every office/room screen should open with a **canonical hero view**.
- Restrict visible interaction targets to the **highest-priority desks, alerts, and rooms** on first paint.
- Use a **bottom-sheet drill-down model** instead of exposing every artifact inline.

### Pattern takeaway
**A good scene has a default camera and controlled hotspot density.**

---

## 4) CesiumJS
- **Type:** Open-source digital twin / 3D globe and map engine
- **Repo:** https://github.com/CesiumGS/cesium
- **Why it matters:** Even though Riley's_Office should not become a globe app, Cesium is a strong reference for digital-twin layering and hierarchical scene composition.

### What to learn
- **Semantic overlays:** Base scene + status layers + event overlays + contextual panels.
- **Scale transitions:** Global overview to local inspection without breaking orientation.
- **Live state as scene decoration:** Data becomes part of the environment, not a separate admin panel.

### Apply to Riley's_Office
- Build the UI in layers:
  1. **Base office scene**
  2. **Health/status overlays**
  3. **Run/agent/event markers**
  4. **Context panel / bottom sheet**
- Keep transitions consistent between **campus -> office -> room -> desk**.
- Let activity pulses, blocked badges, and quality-gate markers live **inside the world view**.

### Pattern takeaway
**The environment should be the data canvas, not just a background image.**

---

## 5) MapLibre GL JS
- **Type:** Interactive browser map engine
- **Repo:** https://github.com/maplibre/maplibre-gl-js
- **Why it matters:** Useful for understanding how layered, pannable, touch-friendly spaces stay readable on small screens.

### What to learn
- **Information hierarchy through zoom:** The same surface can reveal different detail at different depths.
- **Layer toggles:** Context can be shown selectively rather than all at once.
- **Panning discipline:** Movement in space feels natural when orientation cues stay stable.

### Apply to Riley's_Office
- Treat office navigation as **zoomed layers of the same world**, not unrelated pages.
- Use **disclosure by depth**:
  - campus = project urgency
  - office = room/run state
  - room = agent/desks
  - desk = task/evidence/chat
- Keep persistent orientation cues: office title, breadcrumb, mini-map, active room highlight.

### Pattern takeaway
**Stable orientation is mandatory when navigation is spatial.**

---

## 6) kepler.gl
- **Type:** Browser geospatial analysis tool
- **Repo:** https://github.com/keplergl/kepler.gl
- **Why it matters:** Great reference for turning dense, live data into an expressive scene without collapsing into spreadsheet UI.

### What to learn
- **Visual encoding discipline:** Color, size, pulse, density, and layer choice each mean something distinct.
- **Filter-first interaction:** Users can reduce complexity without leaving the scene.
- **Big-picture + detail panel:** Main canvas remains dominant while detail lives in side panels.

### Apply to Riley's_Office
- Assign a **single semantic meaning** to each visual variable:
  - glow = live activity
  - red/amber = urgency/blocker
  - size = project weight or active run count
  - pulse = freshness or event velocity
- Add quick filters for **runs / agents / QA / reviewer / alerts** without leaving the office scene.
- Keep the world dominant; use sheets/panels for explanation and actions.

### Pattern takeaway
**Scene clarity depends on strict visual encoding rules.**

---

## 7) Home Assistant Floorplan
- **Type:** Room-based control UI over a real floor plan
- **Repo:** https://github.com/pkozul/ha-floorplan
- **Why it matters:** One of the best references for mapping live state onto rooms, objects, and hotspots inside a familiar spatial layout.

### What to learn
- **Real-world metaphor, live-state overlay:** Rooms stay understandable because the floor plan is stable while state changes on top.
- **Object targeting:** A device or room can be individually actionable without leaving the broader layout.
- **Status in-place:** Users can inspect state exactly where it belongs.

### Apply to Riley's_Office
- Build a **mini office map** where rooms are tappable zones and desks are stateful objects.
- Put statuses **where they belong**: blocker on the desk, milestone on the delivery wall, transport issue in ops.
- Use SVG-like composition or layered cards so the office map remains lightweight and touch-friendly.

### Pattern takeaway
**State should appear in the place the user expects it to live.**

---

## 8) Satisfactory Calculator Interactive Map
- **Type:** Browser interactive world map for a management/simulation game
- **Product:** https://satisfactory-calculator.com/en/interactive-map
- **Why it matters:** Strong example of a dense systems view made usable through filters, iconography, and layered spatial context.

### What to learn
- **System density can work** if the user can progressively enable categories.
- **Functional icon sets** outperform verbose labels in crowded scenes.
- **Map as command surface:** The world itself becomes the tool.

### Apply to Riley's_Office
- Use toggles for **agents, blockers, evidence, room health, and live events**.
- Design a compact icon system for desk state, approvals, blocked runs, and stale data.
- Make the office scene itself the primary command surface instead of hiding actions in separate menus.

### Pattern takeaway
**Dense worlds remain usable only with ruthless filtering and icon discipline.**

---

## 9) React Flow / XYFlow
- **Type:** Node-based spatial UI toolkit
- **Repo:** https://github.com/xyflow/xyflow
- **Why it matters:** Not a world interface by itself, but very relevant for positioning connected entities in a touch-manipulable spatial canvas.

### What to learn
- **Spatial relationships beat lists** when dependency and flow matter.
- **Selectable objects with contextual controls** work well inside a larger canvas.
- **Progressive detail** can be attached to a node without redrawing the entire world.

### Apply to Riley's_Office
- Use node-like positioning for **agent desks**, **run rails**, or **artifact chains** inside a room view.
- Show lightweight relationship lines between **current run -> QA -> reviewer -> deliverables**.
- Consider React Flow-style selection behavior for **focus mode on a desk or evidence object**.

### Pattern takeaway
**Connection visibility is part of spatial comprehension.**

---

## 10) Grafana Canvas + Grafana Scenes
- **Type:** Operational dashboard composition system
- **Repos:**
  - https://github.com/grafana/grafana
  - https://github.com/grafana/scenes
- **Why it matters:** Useful reference for building serious operational views that still feel designed rather than purely tabular.

### What to learn
- **Operational seriousness:** You can create a visual environment without sacrificing trust.
- **Composable scene model:** A dashboard can be assembled from reusable stateful objects.
- **Live-state prominence:** Alerts and trends are first-class visual citizens.

### Apply to Riley's_Office
- Treat rooms/desks as **composable scene components** with their own live state contracts.
- Preserve an enterprise-grade feel through **clarity, contrast, and measurable status indicators**.
- Use visual flourish sparingly; prioritize **operator trust** over cinematic styling.

### Pattern takeaway
**Riley's_Office should feel like a command center first, a game second.**

---

## Cross-cutting UI Patterns Worth Stealing

### 1. Canonical scene framing
Every spatial screen needs a default composition that answers, at a glance:
- where am I?
- what needs attention?
- what can I act on right now?

### 2. Layered scene architecture
Use a stack like:
- base environment
- state overlays
- alert/event overlays
- contextual detail sheet
- guarded action tray

### 3. Landmark-driven navigation
People remember **Mission Control**, **Delivery Wall**, and **Ops Room** better than generic screen titles.

### 4. In-place state encoding
Place status where it semantically belongs:
- blocked agent -> desk
- failing run -> run rail / delivery wall
- degraded transport -> ops console
- unread intervention -> inbox portal

### 5. Controlled hotspot density
On mobile, showing every action target at once will fail. First paint should expose only top-priority interactions.

### 6. Depth without full 3D
Riley's_Office should use:
- parallax layers
- elevation/shadow
- perspective cards
- map-like transitions
- zoomed region focus

Not:
- free-roam avatars
- complex camera controls
- dense 3D manipulation

### 7. Filtered complexity
The user should be able to toggle overlays for:
- alerts
- active runs
- agents
- QA/reviewer gates
- evidence
- degraded/stale data

### 8. Scene-consistent action model
Tap object -> sheet opens -> guarded action tray appears -> contextual chat/evidence is one step away.

---

## Recommended Direction for Riley's_Office

### Best blend
The strongest direction is a hybrid of:
- **WorkAdventure / Gather** for memorable office-world structure
- **Home Assistant Floorplan** for room/object-based control
- **Cesium / MapLibre / kepler.gl** for layered data semantics
- **Grafana Scenes** for operational trust and composability

### Suggested scene formula
For each office screen:
1. **Hero room/office composition** with stable landmarks
2. **Live overlays** for agent state, blockers, and run progress
3. **Mini-map or room rail** for fast movement
4. **Bottom-sheet detail model** for drill-in
5. **Contextual action tray** with governance-safe controls

### Suggested anti-patterns to avoid
- Overcommitting to full game movement instead of fast command interactions
- Decorative objects that do not map to real system entities
- Too many simultaneous glows, badges, and animations
- Multiple unrelated navigation systems fighting each other
- Turning the world into a static illustration rather than a live control layer

---

## Shortlist: Highest-Value References for Immediate Design Work
1. **WorkAdventure** — world metaphor and room-based navigation
2. **Home Assistant Floorplan** — stateful rooms/objects on a stable map
3. **CesiumJS** — layered digital-twin thinking
4. **kepler.gl** — visual encoding discipline for dense live data
5. **Grafana Scenes** — composable operational scene architecture

## Bottom Line
Riley's_Office should not imitate a game literally. The winning move is to build a **digital twin of the operating system**: a stable spatial headquarters where rooms, desks, walls, and consoles are visual containers for real governed state. The scene should feel premium and memorable, but every object must earn its place by improving orientation, diagnosis speed, or actionability.
