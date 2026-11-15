
---

## 12 · CONTINUITY LEDGER

The supervisor's sheet. Check every item against the frame before a shot is approved.

### 12.1 Time-of-day chain (absolute, unbroken)

| Scene | Clock | Evidence in frame |
|---|---|---|
| S01 | 06:12 → 06:26 | `P-01` reads 06:15 from S01-02 onward. Sun shaft moves 4° across the floor. |
| S02 | 06:30 → 07:10 | Fan OFF. Curtains open. |
| S03 | 07:15 → 07:35 | Pita leaves at ~07:30. |
| S04 | 07:40 | Ishaan in `JKT-BLR-01` for the first time. |
| S05 | 07:52 → 08:20 | Bell tower clock in S05-01 reads 07:52. |
| S06 | 08:25 | Sun has moved onto the window-side desks. |
| S07 | 11:40 → 13:10 | Multiple days; sun patches on the corridor floor grow. |
| S08 | 09:30 | Assembly. Overcast. |
| S09 | 19:40 → 22:15 | Tungsten on, blue dusk outside. |
| S10 | 06:00 → 10:30 | Departure at 06:00 (day after S09). |
| S11 | 11:00 → 13:30 | Sun moves off the old wing by S12. |
| S12 | 13:45 | Old wing fully in shade. |
| S13 | — | No time. No daylight. |

### 12.2 The nine locked behaviours

1. **`CONT-EYE-01`** — Ishaan's amber iris flecks sit between 3 and 5 o'clock, both eyes, every close-up.
2. **`CONT-HABIT-01`** — Ishaan touches the blue sleeve accent: S04-04 → S12-01 → S13-04. Three times, no more.
3. **`CONT-MEERA-01`** — The phone never shows a readable screen, a sender, a name or a photo. Ever.
4. **`CONT-BG-01`** — No background student face is reused across two scenes as if it were a character.
5. **`CONT-BD-01`** — The classroom blackboard carries the **same lesson text** from S05-05 to S06-09.
6. **`CONT-SUN-01`** — Shadow direction is fixed per location. It advances with time; it never flips.
7. **`CONT-BAG-01`** — `P-03` is on Ishaan's **right** shoulder in S04-06 and S10-01, on the **left** in S09-06 (he did not notice he switched). Deliberate.
8. **`CONT-HAND-01`** — Ishaan reaches with his **right** hand at the Core. Never mirror the shot; the sleeve accent is on the right arm.
9. **`CONT-HAIR-01`** — Ishaan's fringe covers his **right** eyebrow. In every shot. In every scene. Including from behind.

### 12.3 Motifs (planted → paid off)

| Motif | Plant | Payoff |
|---|---|---|
| **`MOTIF-01` — the threshold** | S01-07 (light spills from a door) → S02-07 (watching family from a corridor) → S04-05 (silhouette in a doorway) | **S13-06** — same height, same lens, same framing, but he is what is being watched |
| **`MOTIF-02` — the warm hand** | S03-06 (a paratha placed on a plate) | S13-04 (his own hand raised) — the last warm gesture before the blue |
| **`MOTIF-03` — downward** | S02-01 crane down | S10-06 → S12-05 stairs → S13-01 chamber: the film never stops descending |

### 12.4 Recurring-shot integrity check (the three that must match exactly)

| Match | Reference | Must be identical | Must be inverted |
|---|---|---|---|
| S08-03 ⟷ S11-01 | Observatory dome | Rib count, slit position, ridge silhouette to frame-left | — |
| S02-07 ⟷ S13-06 | Threshold | Camera height (1.60 m), lens (24 mm), subject placement, OTS-from-behind | Light source (window → Core) and colour (warm → blue) |
| S12-02 ⟷ S13-06 | `SIG-01` | 3 arcs, 1 bisecting line, 1 circle — geometry, proportions, stroke weight | Scale only |

---

## 13 · PROMPT ENGINEERING APPENDIX

### 13.1 The reusable shot prompt template

For any shot-generation system that accepts reference images, use this order. **Reference images first, style second, action last.**

```
[REFERENCE] @ishaan_plate.png @meera_plate.png @L06_classroom.png
[IDENTITY LOCK — verbatim, do not paraphrase]
Ishaan: 15, Indian, warm medium-brown skin, messy layered jet-black hair with a
fringe over his LEFT eyebrow, large dark-brown eyes with amber flecks,
matte-black bomber with CRIMSON inner lining and two small COBALT-BLUE
geometric accents (collar tab + RIGHT forearm), white school shirt.
Meera: 15, Indian, long straight dark-brown hair past mid-back, side part with a
small silver hairpin on her LEFT, white shirt + navy pinafore + thin maroon ribbon.
Kabir: 15, Indian, deeper brown skin, short side-swept quiff, rounder eyes, dimple
on LEFT cheek, white shirt + navy sweater-vest + maroon tie. NO jacket.
[SHOT] {size} · {lens-equivalent} · camera at {height} m · {movement}
[ACTION] {one sentence. Behaviour, not emotion.}
[FACE] {micro-expression, one clause}
[SET] {location ID} — {three architectural details, verbatim from §5}
[LIGHT] {one key light, named, with its source in frame}
[STYLE] premium Japanese-anime feature-film cel, hand-painted background,
soft cel shading, consistent anatomy, natural cloth and hair physics,
cinematic depth of field, subtle film grain, 16:9, no text, no watermark
[NEGATIVE] plastic skin, airbrushed faces, extra fingers, merged characters,
wrong jacket, glow where no light source exists, redesigned uniform, logo,
watermark, text, oversaturated, HDR halo
```

### 13.2 The thirteen scene master prompts

Use these as the *anchor* prompt for a scene; then vary only `[SHOT]`, `[ACTION]` and `[FACE]` per shot using §11.

**S01 — MORNING.** Interior Japanese-anime bedroom at 06:12, winter dawn. One hard low sun shaft through a half-drawn curtain, cold blue ambient, dust motes suspended. A 15-year-old Indian boy asleep on his side, blanket to the chest, messy black hair on the pillow, fringe over his left eyebrow. Static 24 mm wide. Low saturation, high contrast, soft halation on the shaft edge only. Reference: L01.

**S02 — FAMILY.** Warm Indian middle-class living room, 06:30, hard window light making long rectangles on a tiled floor, cream walls, ceiling fan still. A mother in a deep-teal saree with a mustard border working at a two-burner stove; a father in a light-blue shirt fastening a silver watch; a girl with a braid writing at a dining table; a boy of twelve sliding down the last three steps. Amber key, teal shadows, dust in the light. Camera: slow crane down from the ceiling.

**S03 — BREAKFAST.** Indian dining table at 07:20, steel thali set, parathas steaming, four glasses of milk. Hands in the foreground: one pouring, one stealing, one swatting. Faces cropped. The warmest grade in the film — amber key, honeyed highlights, low contrast, nothing cool anywhere in frame. Camera at table height, 1.05 m, static.

**S04 — ISHAAN.** A 15-year-old Indian boy in a matte-black bomber jacket with a crimson inner lining and two small cobalt-blue geometric accents, white school shirt underneath, reflected in a bedroom mirror in lateral morning sun. Hard side light, two catchlights, dark-brown eyes with amber flecks. Medium close-up, 85 mm, over the shoulder into mirror glass. The red lining and the blue accents are the only saturated colours in the frame.

**S05 — SCHOOL LIFE.** Indian school exterior at 07:52, three-storey sand-coloured block, blue-grey roof, a neem tree at the gate, cold blue-white winter light, dust in the air, students streaming through. Aerial 24 mm descending. Then a corridor: classroom doors left, open verandah right, hard sun rectangles on the floor, two boys walking and laughing, the shorter one in a navy sweater-vest and maroon tie.

**S06 — MEERA'S ENTRY.** Indian classroom at 08:25, six rows of dual desks, blackboard left, window wall right. A pale-green door opens inward; a 15-year-old girl stands silhouetted in a corridor three stops brighter than the room, long dark-brown hair, silver hairpin on her left, white shirt and navy pinafore. Backlit blow-out, subtle halation on her outline only. Slow push-in, 24 mm, from the back of the room down the centre aisle.

**S07 — FRIENDSHIP.** Indian classroom and corridor at midday, the warmest the school ever looks. A girl slides a notebook across a desk; a boy in a navy sweater-vest makes a joke; three students stand at a corridor arch with their backs to us, looking out at a blown-white playground. Warm sun patches on the floor, dust in the beams, no glow, no sparkle, no slow motion.

**S08 — THE TRIP.** Dusty Indian school assembly hall, 09:30, raked floor, tall windows on the right wall, volumetric overcast shafts, a projector screen glowing cold white with a photograph of a white ribbed observatory dome on a mountain ridge. A teacher in a navy saree at a wooden podium. Wide 24 mm from a high riser; then a slow crane up as the room reacts. Over a hundred students, all distinct silhouettes.

**S09 — PREPARATION.** Indian home at night, 20:00, a single tungsten pendant over a dining table, deep blue dusk in the window. A father's fountain pen signing an A4 permission form; a mother folding clothes into a dark-grey backpack; a girl holding a black jacket with crimson lining behind her back, chin high; a small boy pushing a red toy car into a bag pocket. Warm interior, cold window, split 50/50.

**S10 — THE ROAD.** A cream-and-navy Indian school coach leaving a city at 06:00 in blue hour, sodium lights still on, breath vapour in the cold. Then a mountain road: two-lane tarmac, stone parapet, hairpins, a valley of cloud, pine forest, hard high-altitude sun. Drone tracking shots, 24 mm, three depths of atmospheric perspective. Inside the bus: warm strip lighting against cold window light, a girl alone at the back with her cheek against the glass.

**S11 — AARANYA RIDGE.** A white ribbed observatory dome on a high ridge beneath a cloud sea, glass-and-concrete research block, wind-bent grass, hard noon sun and short shadows. Sixty metres north-west, a forgotten stone wing with boarded windows and a rusted padlock. Through a four-centimetre gap between planks: darkness, suspended dust, and a faint pulsing blue glow rising from below floor level. Blue at forty percent. No flare. No god rays.

**S12 — THE HIDDEN DOOR.** Cold shade on an old stone wall, a carved sigil — three concentric arcs, one bisecting line, one central circle, cut shallow into weathered sandstone. A fingertip traces the groove and blue light follows the carving like liquid in a channel, then settles. A three-metre section of stonework sinks and grinds sideways revealing a one-metre-wide stairwell and cold vapour rolling over the threshold. Below: a ribbed stone corridor, arches, inlaid geometric lines bleeding blue. Ancient, carved, pre-technological.

**S13 — THE PULSE CORE.** A sixty-metre domed stone void, ribbed pillars converging on a sealed apical oculus, nine concentric floor rings, standing water reflecting everything. At the centre, one metre above a circular dais, floats a suspended laminar fluid holding an internal lattice of blue light — ancient, intelligent, breathing on a five-second cycle. At the edge of the frame, a lone boy in a black jacket with a red lining, one hand raised, reaching. Blue at one hundred percent. Skin stays warm. No sparks, no lightning, no crystal.

---

## 14 · ASSET MANIFEST & PROJECT STRUCTURE

```
pulsebound/
├── PULSEBOUND_EP01_PRODUCTION_BIBLE.md      ← this document
├── PULSEBOUND_EP01_PLAYER.html              ← cinematic pre-vis player (open in a browser)
├── data/
│   ├── bible_head.md                        ← §1–9 source
│   ├── bible_tail.md                        ← §12–18 source
│   └── scenes/scene-01…13.json              ← single source of truth (timing, shots, VO)
├── scripts/build.py                         ← rebuilds both deliverables from the JSON
└── assets/
    ├── characters/     CH-01…CH-08 reference plates
    ├── storyboard/     S01…S13 key frames
    └── audio/          vo-01.mp3 … vo-10.mp3  (10 narration blocks)
```

**Asset status this pass.** All 8 character plates are delivered. Storyboard key frames exist for
**S01** and **S02**; **S03–S13 are queued** and should be generated from the scene master prompts in
§13.2, using the character plates as reference images. The pre-vis player degrades gracefully —
any missing key frame shows a `KEY FRAME PENDING` plate rather than breaking the layout.

**Editing the production.** All timings live in the JSON. Change a shot's `dur` and re-run `python3 pulsebound/scripts/build.py` — the bible and the player both rebuild, and the runtime recalculates. Never hand-edit the generated files.

**Delivery structure for the studio (outside this repo).**
```
01_SCRIPT/       narration script + timecodes
02_DESIGN/       character plates, model sheets, expression sheets, colour scripts
03_ENV/          L01–L12 paint plates + floor plans
04_LAYOUT/       per-shot layout (LD) files
05_KEYANIM/      key animation (原画)
06_INBETWEEN/    in-betweens (動画)
07_PAINT/        character paint + background paint
08_COMP/         compositing (撮影) masters per shot
09_AUDIO/        VO masters (10 blocks), mixed to the §9 spec
10_MASTER/       3840×2160 · 24 fps · ProRes 4444 XQ · Rec.709
```

---

## 15 · PROPOSED / NOT-CANON REGISTER

Everything below is an **invention of this production draft**, kept deliberately small and removable. Nothing here alters a character name, a family relationship, a class level, Meera's relationship status, Ishaan's jacket, Kabir's clothing, the trip destination, or the Core discovery. **Labelled PROPOSED; not CANON until approved.**

| # | Proposal | Where | Why | Removable? |
|---|---|---|---|---|
| P-1 | The rude doodle and paper ball | S05-06 | Silent comedy needs a physical gag | Yes, trivially |
| P-2 | The fist bump + freeze under the teacher's glare | S08-06 | Genre beat, no plot | Yes |
| P-3 | Kabir gives up the window seat | S10-03 | Establishes his generosity without dialogue | Yes |
| P-4 | Vivaan hides his toy car in the bag; Ishaan pockets it | S09-05, S12-01 | Gives the climax a human object to be holding | Yes — but recommended |
| P-5 | Aarohi hides the jacket as a joke | S09-04 | Sisters, established in S03 | Yes |
| P-6 | The friendship tableau at the corridor arch | S07-04 | The series' recurring image | Yes |
| P-7 | Ishaan's sleeve-accent habit | S04-04 | A physical tell he can carry for the series | Yes — but recommended |
| P-8 | Nine concentric floor rings in the chamber | S13 | Gives the Core a countable geometry | Yes |
| P-9 | The dome in the S08 slide matches S11 exactly | S08-03 | Visual proof the trip was always the destination | No — keep |

**Explicitly NOT invented (canon protected):** no new named characters; no teacher name; no business details for the father; no boyfriend appearance, name or cast; no explanation of the Core; no episode-ending resolution.

---

## 16 · QA GATE — SHOT APPROVAL CHECKLIST

Every shot passes through five gates. A shot that fails any gate is regenerated from layout, never patched in compositing.

**Gate 1 — Identity (the most important gate).**
- [ ] Every face matches its reference plate to the eyebrow.
- [ ] Ishaan's fringe covers his **right** eyebrow.
- [ ] The jacket has its crimson lining and **both** cobalt-blue accents, in the right places.
- [ ] Kabir is not wearing a jacket. Any jacket.
- [ ] Height relationships hold: Ishaan > Kabir > Meera.
- [ ] No two characters merged, duplicated, or swapped.

**Gate 2 — Continuity.**
- [ ] Outfit identical to the previous shot of the same scene.
- [ ] Props present and matching §4.
- [ ] Shadow direction consistent with the location.
- [ ] Clock / board / form / phone screen as specified.
- [ ] Eyeline to the degree.

**Gate 3 — Performance.**
- [ ] The expression is a **micro**-expression, not a pose.
- [ ] Hands are correct: five fingers, natural pose, no distortion.
- [ ] Eyes have a real catchlight from the frame's actual light source.
- [ ] The moment reads with the sound off (because there is no sound on).

**Gate 4 — Craft.**
- [ ] Cloth and hair behave with weight; nothing is rigid.
- [ ] Anatomy consistent (no elongated neck, no broken wrist).
- [ ] Depth of field motivated; no fake bokeh on a face.
- [ ] No plastic skin, no airbrush, no HDR halo.

**Gate 5 — Story.**
- [ ] The shot's narration timing still fits the action (§11 field 12).
- [ ] The camera move serves the beat; if unsure, make it static.
- [ ] The shot does not teach the audience anything Episode 2 needs to reveal.

### 16.1 Known AI failure modes → the fix

| Failure | Cause | Fix |
|---|---|---|
| Jacket migrates to Kabir | Weak differentiation in prompt | Re-issue with the negative `black jacket` and Kabir's vest described first |
| Face changes between shots | No reference image passed | Always pass the plate; never rely on text alone |
| Extra fingers / melted hands | Hands star in frame | Reframe to hide hands, or hand-animate the hand in 2D |
| Everyone glows in the dark | Model's default "mystery" bias | Add `single key light, source visible in frame, no glow` |
| Uniform redesigns itself | Long prompt drift | Move the wardrobe description to the top of the prompt |
| Crowd clones | No silhouette variety requested | Specify "10 distinct silhouettes, varied heights and hair" |
| Character looks 25 | Model's default age bias | Add `15-year-old, youthful round jaw, teenage proportions` |
| The Core looks like a crystal | The single easiest mistake in the episode | Describe it as **suspended laminar fluid with an internal lattice**, and ban the words "crystal", "gem", "glow" |

---

## 17 · EDIT & DELIVERY SPEC

**Timeline.** 24 fps, 3840×2160. Scene boundaries at §11 timecodes are locked; shot durations may be adjusted ±1 s to fix animation, but the **scene total must not change** or the narration drift will be cumulative across 35 minutes.

**Transitions.** Cuts only, except: dissolve out of S01-07; 12-frame black between S04 and S05; 10-frame fade at the end of S03; 4-frame white flash and hard cut to black at S13-07. **No other transitions exist in this episode.**

**Titles.** End card only: `PULSEBOUND` (letter-spaced, white), `EPISODE 01` (small, blue), `TO BE CONTINUED` (small, dim). No opening title sequence. No credits crawl inside the runtime — they follow the card.

**Audio master.** Narration only, −16 LUFS, −1.5 dBTP. No music. No SFX. No ambience.

**Deliverables.**
1. `PULSEBOUND_EP01_MASTER_4K.mov` — ProRes 4444 XQ, Rec.709, 24 fps.
2. `PULSEBOUND_EP01_MASTER_1080.mov` — ProRes 422 HQ.
3. `PULSEBOUND_EP01_WEB.mp4` — H.264, 16 Mbps, AAC 192 kbps (VO only).
4. `PULSEBOUND_EP01_VO_STEMS/` — 10 narration blocks, 48 kHz / 24-bit WAV.
5. `PULSEBOUND_EP01_RECAP.pdf` — one page per scene for the review meeting.

**Legal/credit hygiene.** All character designs and environments in this package are original to PULSEBOUND. Generated key art is for internal pre-visualisation only and must not be shipped as final frames.

---

## 18 · HANDOFF TO EPISODE 02

Episode 01 ends on contact. **Do not resolve any of the following** — they are the series:

1. What the Core is, who built it, or how old it is.
2. What the blue light has done to Ishaan — no visible mark, no power demonstration, no transformation. Only the tear that does not fall (S13-07).
3. Whether Kabir saw what happened, and what he tells anyone.
4. Who Meera's boyfriend is.
5. Whether anyone above ground noticed the light — **plant nothing, imply nothing, in Episode 01.**

The final frame of the series' first episode is a boy's eye, flooded blue, with amber flecks that refuse to change. Everything the audience needs to come back is in that contradiction.

---

*PULSEBOUND — Episode 01 · The Day Everything Changed · Production Draft 1.0*
*Generated from `pulsebound/data/scenes/*.json` · rebuild with `python3 pulsebound/scripts/build.py`*
