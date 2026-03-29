# Riley's_Office — Office Scene Layout

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This layout spec translates the office-world direction into buildable scene zones for HQ, project rooms, and workstation views.

## Purpose
Define the exact layout logic that makes Riley's_Office read unmistakably as an office world.

This document tells engineering:
- what rooms and sub-zones exist
- where furniture and architecture sit
- how circulation should work
- how to stage desks, delivery walls, and premium focal points
- how to preserve office readability on mobile/web

---

# 1. Master HQ Layout

## 1.1 Layout summary
Build HQ as a **cutaway premium office floor** viewed from an elevated angle.

The floor should read as one continuous workplace with six primary zones:
1. reception / arrival strip
2. central command island
3. open workstation floor
4. glass meeting suite
5. executive project offices
6. delivery/archive support wall

## 1.2 Top-level layout diagram

```text
[ Perimeter windows / skyline edge ]

+------------------------------------------------------------+
|  Glass Meeting Suite   | Executive Project Offices         |
|  table + display wall  | private offices / project rooms   |
|------------------------+-----------------------------------|
|  Open Workstation Floor / Agent Bays                       |
|  bench desks + monitor rows + circulation paths            |
|------------------------+-------------------+---------------|
|  Delivery / Archive    | Central Command   | Ops Console   |
|  wall + shelving       | island / run core | side systems  |
|------------------------------------------------------------|
|  Reception / Arrival / Command Dock                        |
+------------------------------------------------------------+

[ Near edge / user-facing foreground ]
```

## 1.3 Zone intent
### Zone A — Reception / arrival strip
Use as the visual front door.

Contains:
- HQ plaque / brand wall
- one bench or pair of lounge chairs
- floor transition into the office
- command dock / top-level world actions

### Zone B — Central command island
The main focal object in HQ.

Contains:
- HQ title
- active world summary
- priority run cue
- major CTA cluster

Physical read:
- large executive command desk or island table
- visible monitor rail or integrated display slab
- more premium than all other desks

### Zone C — Open workstation floor
The main agent execution area.

Contains:
- grouped workstation benches
- active desk pods
- clear aisles between clusters
- monitor glow indicating live activity

### Zone D — Glass meeting suite
The collaboration zone.

Contains:
- meeting table
- 4–8 chairs
- wall display / presentation surface
- glass enclosure and door break

### Zone E — Executive project offices
The project-specific office suites.

Contains per project office:
- room plaque
- one primary desk/table
- 1–3 supporting stations
- window or partition edge
- localized project accent lighting

### Zone F — Delivery/archive support wall
The evidence side of the office.

Contains:
- artifact wall slots
- shelving / filing logic
- review / QA grouping
- calmer task lighting

---

# 2. Circulation and Walkable Read

## 2.1 Main circulation spine
The office must show how someone would walk through it.

Required path order:
- entry strip
- central command island
- split toward workstation floor or executive offices
- secondary route to meeting suite
- secondary route to delivery/archive wall

## 2.2 Walkway width rules
For visual readability, circulation lanes should appear wider than desk gaps.

Recommended relative widths:
- main corridor: 1.5x desk-gap width
- between workstation benches: 1x desk-gap width
- around command island: generous perimeter clearance

## 2.3 Layout rule
Never place all desks flush together with no aisle. That destroys the office read.

---

# 3. Open Workstation Floor Layout

## 3.1 Workstation cluster pattern
Use a believable office planning pattern.

Recommended default:
- two or three desk-bench clusters
- each cluster holds 2–4 agent stations
- clusters separated by walking aisles
- one cluster may be more active / brighter than others

## 3.2 Desk orientation
Desks should face into the room or toward a shared center, not all randomly angled.

Preferred patterns:
- bench desks facing opposite directions with divider screen
- side-by-side specialist desks on one perimeter edge
- one featured corner station angled slightly toward the command core

## 3.3 Desk cluster anatomy
Each visible cluster should include:
- desk surfaces
- task chairs
- monitor silhouettes
- acoustic divider or desk accessory line
- localized label / status overlays

## 3.4 Visual staging
### Foreground cluster
- largest workstation silhouettes
- highest detail
- strongest monitor visibility

### Mid cluster
- still readable as desks and chairs
- reduced label density

### Background cluster
- mostly silhouette + monitor glow + room identity cue

---

# 4. Executive Project Office Layout

## 4.1 Role
Each project should read as a private office or premium suite, not a tower block.

## 4.2 Base project-office layout
Each office should have five sub-zones:
1. entry plaque wall
2. primary project desk / run table
3. supporting agent workstation row
4. delivery or review wall
5. window or glazing edge

## 4.3 Recommended project-office plan

```text
+--------------------------------------------------+
| Window band / city glow                          |
|                                                  |
| Delivery / review wall      Supporting stations  |
|                                                  |
|        Primary project desk / run table          |
|                                                  |
| Entry plaque / threshold     Side credenza       |
+--------------------------------------------------+
```

## 4.4 Primary desk placement
Place the hero desk slightly off center, not perfectly centered, so the office feels designed.

Best placement:
- center-left or center-right of room
- facing room entry or angled toward the window
- enough clearance behind for a wall or glazing read

## 4.5 Supporting stations
Supporting workstations should sit on one side or rear edge, not surround the hero desk equally on all sides.

This preserves office hierarchy.

---

# 5. Meeting Room Layout

## 5.1 Core composition
The meeting room should be instantly recognizable by furniture alone.

Required objects:
- elongated meeting table
- chairs around table
- wall display / whiteboard
- glass wall enclosure
- pendant or recessed rectangular light cue above table

## 5.2 Recommended orientation
- table oriented parallel to longest room edge
- display wall opposite the entry edge
- one side visibly glazed to the larger office floor

## 5.3 Use in product logic
Map:
- review sessions
- QA checkpoints
- planning summaries
- approvals

into this room or its visual language.

---

# 6. Delivery / Archive Wall Layout

## 6.1 Role
Artifacts need a clear physical address inside the office.

## 6.2 Wall composition
The delivery wall should sit on a rear or side wall, not float in the center of the room.

Contains:
- grouped wall panels
- mounted evidence plaques
- shelving / filing cues below or beside the wall
- category bands for working, QA, review, approved, blocked

## 6.3 Layout pattern

```text
[ Wall surface ]
| Group Header |
| Evidence Slot |
| Evidence Slot |
| Evidence Slot |

[ Lower credenza / filing / archive shelf ]
```

## 6.4 Visibility rule
At least part of the delivery wall should be visible from the main project room view so evidence feels physically nearby.

---

# 7. Workstation Scene Layout

## 7.1 Scene framing
When opening an agent station, the camera should feel like it moved to a real desk.

The workstation scene needs these six stacked layout bands:
1. compact identity mast
2. main contract display
3. evidence stack
4. side or lower comms console
5. governed action tray
6. telemetry strip

## 7.2 Workstation plan

```text
+--------------------------------------------------+
| Identity mast                                    |
|--------------------------------------------------|
| Main contract display / monitor bank             |
|--------------------------------------------------|
| Evidence stack                                   |
|--------------------------------------------------|
| Conversation console                             |
|--------------------------------------------------|
| Governed action tray                             |
|--------------------------------------------------|
| Telemetry strip                                  |
+--------------------------------------------------+
```

## 7.3 Background context
Keep hints of the room behind the workstation through:
- dim glass wall
- blurred window band
- silhouette of neighboring desks
- edge of partition or credenza

Without this context, the desk risks collapsing back into a generic app screen.

## 7.4 Desk object cues
The desk scene should imply these objects even if stylized:
- desk surface or underlit slab
- monitor bank or main display
- chair position
- side tray or evidence plaques
- console or keyboard zone

---

# 8. Mobile Composition Rules

## 8.1 HQ first viewport
Must show:
- arrival / HQ identity cue
- central command island
- at least one readable workstation or project-office zone
- enough architecture to read as interior office space

## 8.2 Project room first viewport
Must show:
- room plaque / identity
- hero desk or run table
- one side architectural boundary
- either a support station or delivery-wall preview

## 8.3 Workstation first viewport
Must show:
- agent identity
- main contract display
- blocker or freshest evidence

## 8.4 Compression priority
When mobile space tightens, reduce in this order:
1. decorative architectural depth
2. secondary furniture detail
3. background support zones
4. metadata density

Do not remove:
- desks
- chairs
- monitor cues
- windows / wall cues
- circulation read

---

# 9. Premium Composition Recipes

## 9.1 HQ hero recipe
Use this stack for the HQ scene:
- foreground: reception edge + command dock
- focal midground: command island
- support midground: workstation clusters
- rear layer: glass meeting suite + executive offices
- perimeter: windows and city wash

## 9.2 Project office hero recipe
Use this stack for a project room:
- foreground: desk edge / chair / action rail
- focal object: project run desk
- side support: agent stations
- rear support: delivery wall or glazing
- perimeter: window or partition frame

## 9.3 Workstation hero recipe
Use this stack for a desk view:
- foreground: desk plane / action tray
- focal object: contract display
- support object: evidence stack
- tertiary object: comms console
- rear cue: room silhouette / glazing

---

# 10. Asset Priorities for Environment Build

## Must-build office assets
1. executive desk / command island
2. workstation bench desk
3. task chair silhouette
4. dual-monitor / monitor-bank silhouette
5. glass partition wall
6. meeting table + chair set
7. delivery wall / evidence panel system
8. side credenza / shelf / archive unit
9. window band with mullions
10. floor zoning materials

## Nice-to-have support assets
- planters
- coat stand or reception accessory
- table lamp / task light
- whiteboard / glass-note wall
- acoustic ceiling light cue

---

# 11. UI-to-Environment Mapping

| UI concept | Office placement |
|---|---|
| HQ summary | central command island |
| project card | project office suite / room plaque |
| agent card | workstation desk pod |
| artifact list | delivery wall or evidence shelves |
| chat thread | communications console at desk |
| quick actions | desk-edge control shelf |
| runtime health | ops console ribbon or side credenza display |
| approvals / review | meeting room or delivery-wall grouping |

---

# 12. Scene Validation Checklist

The layout succeeds only if all are true:
1. HQ reads as one office floor with recognizable room types.
2. There is a visible circulation path through the environment.
3. Workstation clusters clearly show desks, chairs, and monitors.
4. Project spaces read as offices/suites with boundaries and furniture.
5. Delivery artifacts visibly live on a wall or storage-oriented surface.
6. Meeting / review space is distinguishable from active workstation space.
7. Mobile framing still preserves office architecture and furniture cues.

## Failure signs
Revise the layout if:
- interactive zones still look like floating tiles
- there is no clear corridor or floor circulation
- furniture is too abstract to identify
- all project spaces have the same exact layout silhouette
- the room loses windows, walls, and architectural edges in mobile view

---

# 13. Immediate Engineering Build Order

1. Establish one continuous HQ floorplate with room zones and windows.
2. Add the central command island plus open workstation clusters.
3. Replace tower-style project representations with office-suite layouts.
4. Build one glass meeting room and one delivery/archive wall.
5. Rework project view around hero desk + support stations + wall cues.
6. Rework agent view around a real workstation composition.
7. Layer premium materials and localized state lighting after the office read is solid.
