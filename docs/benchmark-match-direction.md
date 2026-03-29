# Riley's_Office — Benchmark Match Direction

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This document is intended to tighten the existing office-world direction so implementation matches the supplied office and war-room benchmark images much more closely.

## Purpose
Lock Riley's_Office to the benchmark references instead of allowing a generic "premium dark office" interpretation.

This document translates the benchmark into exact implementation guidance for:
- architectural shell
- layout and furniture placement
- material palette
- lighting behavior
- camera/framing
- room-by-room asset priorities
- things the build must stop doing because they drift away from the benchmark

---

## 1. Benchmark Read We Are Matching

The supplied references read as:
- **high-end executive interior**, not a stylized game set
- **modern corporate war room**, not a sci-fi control deck
- **luxury but restrained**, with most premium feel coming from architecture, wood, stone, glass, and lighting instead of glowing effects
- **dark, moody, evening-lit**, with bright focal planes coming from screens, city windows, and linear architectural lighting
- **real furniture-first composition**, where the room identity is immediately obvious from desk/table/chair placement

### Hard benchmark truth
The references are successful because they are built from **recognizable interior-design decisions**:
- large slab desk / table anchors
- framed window walls with night skyline
- dark stone/charcoal envelope
- warm wood surfaces breaking up the dark shell
- integrated linear lighting
- large screen walls / monitor arrays as focal infrastructure
- broad, uncluttered floor areas with carefully spaced premium furniture

If Riley's_Office reads as glowing modules on a platform, it has missed the benchmark.

---

## 2. Non-Negotiable Visual Traits to Match

## 2.1 Architectural shell
Use these as mandatory:
- full room envelope with **real back wall and side-wall read**
- **floor-to-ceiling glazing** or near full-height window band on at least one major edge
- **thick structural frames / mullions** in black or dark bronze
- **ceiling presence implied** by soffits, recessed slots, suspended light bars, or perimeter cove glow
- **large uninterrupted floor planes** with sparse furniture placement

Do not use:
- void backgrounds
- roofless platform-first staging as the default presentation
- floating room objects with no enclosing architecture
- stylized miniature office proportions

## 2.2 Furniture anchors
The benchmark rooms are organized around a few large anchors, not many medium objects.

Mandatory anchors:
- one **hero executive desk or command table** per room
- one **screen wall / monitor bank** as major focal infrastructure
- one **secondary seating or supporting desk zone**
- large, sculptural office chairs with visible silhouette

Furniture should feel:
- heavy
- custom
- low-clutter
- expensive
- physically grounded with clear weight and footprint

## 2.3 Material language
Primary material family:
- charcoal stone / smoked concrete / matte graphite shell
- dark tinted glass
- walnut / smoked oak / deep brown wood slabs
- brushed black metal or dark bronze trim
- occasional leather or matte upholstered chair surfaces

Avoid:
- bright white office finishes
- playful color blocking
- glossy neon plastic surfaces
- exposed raw industrial clutter

## 2.4 Light behavior
Benchmark lighting comes from a few believable sources:
- city light through windows
- recessed warm-white or neutral-white linear ceiling slots
- concealed underlighting at desk/table bases
- monitor and video wall glow
- wall wash or edge-light at feature surfaces

State lighting must sit on top of this realistic base.
The architectural lighting must work even if status colors are removed.

---

## 3. Benchmark-to-Implementation Mapping

| Benchmark trait | Implementation rule in Riley's_Office |
|---|---|
| Large premium desk/table dominates room | Build each hero scene around one oversized slab desk or command table; it must occupy roughly 20–30% of the room composition |
| Dark shell + warm wood contrast | Use charcoal/graphite room shell with one strong wood surface family on desks, credenzas, wall panels, or floor insets |
| Night skyline through big windows | Every HQ hero and at least one project room must include a visible night exterior through mullioned glazing |
| Linear lighting, not decorative glow spam | Use recessed strips, cove lines, table underlighting, and screen glow; remove gratuitous ambient neon |
| Screen wall is part of architecture | Treat displays as wall-integrated infrastructure, not floating UI cards |
| Spacious, expensive layout | Leave negative space around hero furniture; do not overfill the room with pods or repeated assets |
| War-room seriousness | Meeting/review spaces must feel strategic, disciplined, and operational rather than lounge-like or playful |

---

## 4. Office Benchmark — Exact Direction

## 4.1 Room type to match
The office reference should drive the **executive office / primary HQ command office**.

This room must feel like:
- a founder/CEO office
- premium but functional
- private
- city-facing
- used for live oversight and decision-making

## 4.2 Required layout
Implement the office room using this arrangement:

```text
[Window wall / skyline]

  side credenza / low storage      screen wall or display panel

           hero executive desk + chair

  visitor chairs / side seating    secondary sculpture/plant/console

[entry side / darker foreground edge]
```

### Spatial rules
- hero desk sits **between room center and window line**, never pushed against a wall
- desk faces either the entry axis or a screen wall, with the window visible behind/adjacent
- keep a clear perimeter walkway around the desk
- add a low credenza or console wall on one side to avoid emptiness
- do not pack this room with multiple equal-sized desks

## 4.3 Desk design
The office benchmark wants a desk that reads as custom executive furniture.

Desk spec:
- long rectangular or slightly tapered slab top
- dark wood, smoked wood, or dark stone top
- thick top profile or visually substantial edge
- integrated cable-hidden monitor placement
- optional underlit base or pedestal glow
- large premium task chair behind it
- 1–2 guest chairs opposite or off to the side

Do not use:
- thin startup-style white desk
- gamer desk proportions
- tiny laptop-only setup
- multi-desk bullpen logic inside the executive office

## 4.4 Wall treatment
At least one office wall should be a feature surface.

Use one of:
- dark vertical paneling
- stone slab feature wall
- wood panel wall with integrated shelving
- wall-integrated widescreen display

Avoid bare empty walls.

## 4.5 Window treatment
Windows are one of the strongest benchmark cues.

Required:
- full-height or nearly full-height glazing
- dark mullion divisions
- night city bokeh / skyline lights outside
- subtle reflections on interior glass
- skyline should feel premium and distant, not bright daytime scenery

## 4.6 Floor treatment
Office floor should use one of these combinations:
- charcoal stone perimeter + dark wood inset under desk zone
- dark wood field + large neutral rug beneath desk grouping
- graphite stone with softer area texture at seating zone

Do not leave the floor as one flat generic dark plane.

---

## 5. War-Room Benchmark — Exact Direction

## 5.1 Room type to match
The war-room reference should drive the **meeting/review/command room** used for:
- project review
- approvals
- multi-agent coordination
- QA/reviewer signoff
- critical run intervention

The room must feel:
- strategic
- cinematic
- slightly more infrastructural than the executive office
- display-centric
- built for coordinated oversight

## 5.2 Required layout
Implement the war room using this arrangement:

```text
[Large display wall / command screen wall]

      long command table or meeting table
   chairs evenly spaced on both long edges

 side console / credenza          side circulation lane

[glass wall or dark panel wall with controlled entry]
```

### Spatial rules
- the display wall is the primary architectural focal point
- the table aligns to the display wall axis
- chairs are symmetrical enough to read as a formal command space
- side lanes remain open and uncluttered
- the room should feel wider than a normal meeting room

## 5.3 Display wall
This is a benchmark-defining object and cannot be replaced by floating cards.

Display wall spec:
- one large continuous display surface or a disciplined array of large panels
- embedded in a dark architectural wall
- surrounding trim should be matte black, dark bronze, or charcoal
- content brightness must stay contained; screen light should illuminate nearby surfaces
- optional lower console shelf beneath the display band

### Riley's_Office mapping
Use this display wall for:
- run summaries
- QA/review gate states
- artifact board snapshots
- project heat / priority visualization
- live system status

## 5.4 Command table
Table spec:
- elongated rectangle or subtly rounded rectangle
- dark wood or matte stone surface
- heavy pedestal or concealed structural base
- integrated light strip under tabletop or base is allowed
- 6–10 high-back chairs depending on framing

Keep the table clean.
One or two devices, microphones, or embedded interface cues are enough.
Too much clutter breaks the benchmark feel.

## 5.5 Side architecture
The war room should include at least one of:
- side glass wall overlooking city or adjacent office
- vertical wall slats/paneling
- low side console with integrated task lighting
- ceiling slot lighting aligned to table axis

This keeps the room from reading as a black box.

---

## 6. HQ Translation Rules

## 6.1 HQ must look like benchmark rooms stitched into one believable office floor
The HQ cannot be a symbolic city board anymore.
It should feel like a cutaway view containing:
- executive office inspired by the office benchmark
- war-room / review suite inspired by the war-room benchmark
- supporting workstation floor that inherits the same shell/material language

## 6.2 HQ zone composition
Use this macro composition:
- **front / near edge:** arrival strip and command dock
- **center:** open workstation field with disciplined spacing
- **one side:** executive office with wood-heavy premium tone
- **opposite side:** war-room with large display wall and long table
- **perimeter:** continuous glazing and skyline
- **rear or side support:** archive/delivery wall and credenzas

## 6.3 Open floor translation
The open floor must borrow from the references without competing with them.

Use:
- bench desks in dark finishes
- strong monitor silhouettes
- linear overhead lighting
- glass partitions or low dividers
- fewer, larger workstation clusters rather than many small ones

Avoid:
- colorful pods
- toy-like desk repetition
- playful coworking aesthetics

---

## 7. Camera and Framing Rules

## 7.1 Benchmark camera behavior
The references work because the camera feels architectural and deliberate.

Use:
- slow, composed three-quarter views
- medium-wide framing that shows room volume and major furniture anchors
- eye line low enough to feel inside the room, not purely top-down
- slight lens compression feel rather than exaggerated perspective

Avoid:
- high isometric toy view as the only mode
- dramatic fisheye or ultra-wide distortion
- orbit-heavy presentation

## 7.2 Camera for each scene
### Executive office / hero office view
- camera at seated-to-standing eye height equivalent
- angle 20°–35° off axis from desk front
- desk occupies foreground/midground
- window wall or feature wall visible behind

### War room view
- camera aligned slightly off the table centerline
- display wall visible as the far focal plane
- table stretches toward camera for depth
- side architecture remains visible to prove room volume

### HQ overview
- elevated cutaway is acceptable, but only if the room identities remain obvious
- maintain readable desk/table silhouettes
- show glazing, partitions, and feature walls, not only floor shapes

## 7.3 Mobile/web framing constraint
On iPhone, do not sacrifice the benchmark anchors.
The first viewport must still show:
- one large desk or table
- one wall/window cue
- one major lighting cue
- enough negative space to feel premium

If space gets tight, remove secondary props before shrinking the hero furniture.

---

## 8. Materials, Colors, and Finishes

## 8.1 Locked palette
Use this as the default benchmark-derived palette:
- shell charcoal: `#171A1F` to `#22262C`
- deep graphite stone: `#2A2F36`
- smoked walnut / dark wood: `#4A3426` to `#6A4A35`
- dark bronze / blackened metal: `#2B241F` / `#111317`
- warm-white light: `#E7D8BE`
- neutral display white: `#DCE6F2`
- controlled cyan accent: `#59B7D9`
- restrained amber: `#C78A43`
- localized warning red/coral: `#A84D41`

## 8.2 Accent rule
The benchmark is not color-driven.
Color must come from:
- screen content
- subtle state trim
- skyline lights
- small controlled light seams

Not from:
- large saturated floor zones
- full-room color washes
- bright brand color walls

## 8.3 Surface finish ratios
Target ratio per hero room:
- 45% dark matte shell
- 20% glass / reflective surfaces
- 20% wood or warm textured material
- 10% screen light surfaces
- 5% accent/state lighting

This prevents the build from becoming too glossy or too flat.

---

## 9. State Lighting Rules Inside the Benchmark Look

## 9.1 Active
Map active state to:
- screen glow increase
- cool seam beneath desk/table edge
- subtle reflection increase on nearby material

## 9.2 Waiting
Map waiting to:
- amber call-light on desk console or side strip
- one localized status ribbon on screen wall/table edge

## 9.3 Blocked
Map blocked to:
- warm warning strip on one portion of display wall or desk edge
- one contaminated light pool near the affected station
- keep the rest of the room premium and readable

## 9.4 Approved
Map approved to:
- calmer white-violet or neutral-white stability
- less motion
- more orderly display grouping

### Global rule
Do not flood benchmark rooms with status color.
The reference mood survives only if the architecture remains dominant.

---

## 10. Asset Build List — Benchmark-Critical

## Executive office assets
1. hero executive desk
2. premium task chair
3. 1–2 guest chairs
4. low credenza / console wall
5. wall-integrated screen or art/display surface
6. full-height mullioned window set
7. wood panel or stone feature wall
8. floor inset or large rug treatment

## War room assets
1. long command/conference table
2. 6–10 high-back chairs
3. large display wall system
4. side credenza / low console
5. glass or paneled side wall
6. ceiling linear light alignment
7. dark floor field with subtle reflection or rug zoning

## Shared assets
1. mullioned glazing modules
2. skyline/night exterior plate
3. charcoal stone floor and wall materials
4. dark wood slab material
5. dark metal trim kit
6. integrated linear light fixtures
7. monitor glow / display shaders
8. restrained accessory set: laptop, notebook, control pad, small planter at most

---

## 11. Immediate Corrections to Existing Riley's_Office Direction

The existing docs move the product toward a more believable office, but this benchmark document sharpens several things.

### Tighten these areas
1. **Less abstract command language**
   - replace generic glowing "run table" shapes with furniture that clearly reads as executive desk or conference table

2. **More real wall architecture**
   - require actual feature walls, display walls, and window walls in hero shots

3. **More wood + stone contrast**
   - current premium direction risks becoming uniformly dark; benchmark needs warmer wood surfaces to break up the shell

4. **Larger hero furniture, fewer total objects**
   - benchmark rooms feel expensive because objects are sparse and oversized

5. **Display systems integrated into architecture**
   - avoid floating dashboard panels as primary room focal points

6. **Camera closer to architectural visualization**
   - less toy-like isometric abstraction, more cinematic room photography logic

---

## 12. Build Sequence

## Phase 1 — Shell lock
Implement first:
- window walls
- feature walls
- floor zoning
- ceiling light cues
- room proportions

## Phase 2 — Hero anchors
Implement next:
- executive desk room
- war-room table + display wall
- premium chair silhouettes
- credenzas / side consoles

## Phase 3 — Support systems
Implement next:
- open workstation floor aligned to same material family
- delivery/archive wall
- secondary monitor banks
- glass partitions

## Phase 4 — State integration
Add only after the base room already matches the benchmark:
- active/waiting/blocked/approved light behavior
- subtle live animation
- content overlays within displays

---

## 13. Acceptance Test

This direction is only satisfied if all of the following are true:
1. The executive office clearly resembles the supplied office benchmark in shell, desk weight, window treatment, and material contrast.
2. The review/command space clearly resembles the supplied war-room benchmark in display-wall dominance, table composition, and strategic mood.
3. A first-time viewer would describe the environment as a luxury office and command suite, not a stylized dashboard world.
4. The premium feel comes mostly from architecture, materials, furniture scale, and lighting discipline.
5. Hero scenes still work in mobile/web framing without shrinking the benchmark anchors into generic cards.

## Failure signs
Revise the implementation if any of these are true:
- the room still reads like floating modules on a stage
- there is no obvious window wall or display wall
- hero desks/tables are too small or too thin
- the build relies on neon accents more than material richness
- the war room looks like a normal meeting room instead of a command space
- the office feels like a generic dark SaaS illustration instead of a specific luxury interior benchmark
