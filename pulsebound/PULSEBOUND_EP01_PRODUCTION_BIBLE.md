# PULSEBOUND — EPISODE 01
## THE DAY EVERYTHING CHANGED
### Master Cinematic Anime Production Package

**Format** 16:9 · 3840×2160 master · 24 fps · 35:20 runtime
**Language** Hindi (VO only) · **Audio** Ishaan narration only — no dialogue, no music, no SFX
**Version** 1.0 · Production Draft · Generated from `pulsebound/data/scenes/*.json`

---

## 1 · PRODUCTION STATEMENT — READ THIS FIRST

This package is the **pre-production and pre-visualisation bible** for Episode 01: the document a studio actually works from, plus the assets that make it legible before a single frame is animated.

**What is in this package**

| Asset | File | Status |
|---|---|---|
| This production bible (character, wardrobe, environment, camera, colour, VFX, audio, continuity) | `PULSEBOUND_EP01_PRODUCTION_BIBLE.md` | Complete |
| Full shot list — 89 shots, 13 required fields each | Section 11 of this document | Complete |
| Timecoded Hindi narration script (34 lines, 10 record blocks) | Section 10 | Complete |
| Character reference plates (8 characters) | `assets/characters/` | Generated key art |
| Storyboard key frames (one per scene) | `assets/storyboard/` | S01 + S02 delivered; S03–S13 queued (see §14) |
| Hindi narration audio (Ishaan) | `assets/audio/vo-01…10.mp3` | Recorded |
| Cinematic pre-vis player (scene reel, key frame, VO, shot specs) | `PULSEBOUND_EP01_PLAYER.html` | Complete |

**What this package cannot be.** A 35-minute, character-locked, 4K animated film is not producible by text or by a single generation pass — and the brief itself says so (§11: *break the episode into individual scenes and manageable shots*). No still-image or audio system can render 89 consecutive seconds-accurate animated shots with locked identity, cloth sim, hair physics and compositing. What is delivered here is everything **up to** the render: the design authority, the shot breakdown, the timing, the narration, and a review surface for every shot.

**The honest gap, stated plainly:** 89 animated shots + final composite + grade + the Hindi master. That is a studio-scale labour of roughly 1,400–2,200 artist-days at premium quality. The shots below are written so that each one can be handed to a shot-production pipeline (2D animation, 3D layout with 2D shading, or a video model with reference-locked characters) as a **self-contained, unambiguous order**.

**How to use it**

1. Lock the character plates in §3. They are the visual authority — nothing downstream may contradict them.
2. Build the 12 reusable environments in §5 before any shot work, so no location is designed twice.
3. Produce shot-by-shot from §11, in scene order, and file each approved shot into `approved/` before starting the next. **Never re-generate an approved shot.**
4. Record VO-01…VO-10 from §10 in a single session, same mic, same room, same distance.
5. Assemble to the timing map in §12 and finish to the spec in §14.

**A note on restraint.** Every instruction in this document that says *do not*, *never*, or *resist* is load-bearing. Premium anime does not look premium because of what it adds. It looks premium because of what it refuses.

---

## 2 · EPISODE AT A GLANCE

| | |
|---|---|
| **Title** | THE DAY EVERYTHING CHANGED |
| **Runtime** | 35:20 (2,120 s) + 18 s title tail |
| **Scenes** | 13 |
| **Shots** | 89 |
| **Average shot length** | 23.8 s (deliberately long — this is a lyrical, patient film) |
| **Shortest / longest shot** | 14 s / 32 s |
| **Narration lines** | 34 (≈ 2,900 Devanagari characters, ≈ 3:00 of speech) |
| **Speech density** | ≈ 8.5 % of runtime. The other 91.5 % is silence and image. |
| **Act I** | 00:00 – 09:00 · The Ordinary World |
| **Act II** | 09:00 – 24:00 · The New Girl |
| **Act III** | 24:00 – 35:20 · Aaranya Ridge |

**Structural design.** Episodes 01 is built as a *three-act descent*:

- **Act I** is warm, domestic, close-lens, and static. Almost every shot is a portrait. The camera barely moves because nothing in Ishaan's life is moving.
- **Act II** introduces motion — tracking shots, corridors, crowds — as Meera and the trip enter. The camera starts to travel because his world is getting bigger.
- **Act III** is landscape and descent. The lens widens, the camera descends (crane down, drone descend, stairs, chamber), and the colour drains to blue. Form follows story: **the film physically goes downward for 11 minutes.**

**Emotional map**

```
Warmth  ████████████████░░░░░░░░░░░░░░░░░░░░  (S01–S09)
Curiosity ░░░░░░░░░░░░░░░░████████████░░░░░░░░  (S06 → S11)
Dread   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████████  (S12 → S13)
Wonder  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████  (S13)
```

The single most important emotional instruction: **do not let Act I feel like a prologue.** The audience must be as happy in that house as Ishaan is. Everything the finale costs is measured against Scene 3.

---

## 3 · THE CHARACTER BIBLE

> **Supreme rule.** Every character is a locked design. The reference plates in `assets/characters/` outrank any prompt, any frame, and any note in this document. If a generated frame disagrees with a plate, **the frame is wrong.**

### 3.1 Identity lock table

| ID | Character | Age / Class | Height | Skin | Hair | Eyes | Voice (this ep) |
|---|---|---|---|---|---|---|---|
| CH-01 | **ISHAAN** | 15 · Class 10 | 5′7″ / 170 cm | Warm medium brown | Messy layered jet black, fringe over **right** brow | Large dark brown, amber flecks at 4 o'clock | Hindi VO — the only voice in the film |
| CH-02 | **MEERA** | 15–16 · Class 10 (new admission) | 5′3″ / 160 cm | Warm light brown | Long straight dark brown, past mid-back, side part, **silver hairpin LEFT** | Almond dark brown, thin brows | Silent |
| CH-03 | **KABIR** | 15 · Class 10 | 5′5″ / 165 cm | Deeper warm brown | Short black, side-swept quiff, faded sides | Rounder dark brown, one dimple **LEFT** cheek | Silent |
| CH-04 | **AAROHI** | 14 · Class 9 | 5′1″ / 155 cm | Warm medium brown | Long dark, single braid, blue ribbon | Wide, Ishaan's eye shape | Silent |
| CH-05 | **VIVAAN** | 12 · Class 7 | 4′7″ / 140 cm | Warm medium brown | Short, messy, cowlick right | Round, constantly moving | Silent |
| CH-06 | **MAA** | Late 30s | 5′2″ | Warm medium brown | Low bun, two loose strands at temple | Soft, laugh-lines | Silent |
| CH-07 | **PITA** | Mid 40s | 5′8″ | Warm medium brown | Neat short black, grey at temples | Steady, level | Silent |
| CH-08 | **CLASS TEACHER** | 30s | 5′4″ | Warm medium brown | Low bun | Behind thin-framed glasses | Silent |

**Handedness convention.** All left/right descriptions in this document refer to the **character's own body**, not the viewer's. In the reference plate, Ishaan's fringe therefore hangs across the viewer's right-hand side of his face, and the blue forearm accent sits on the viewer's left-hand side. Animate to the plate; read this document through that convention.

**Height relationships are canon.** Ishaan is the tallest of the three students by ~2 cm over Kabir and ~10 cm over Meera. Kabir leans. Meera stands straight. Aarohi and Vivaan are always physically below Ishaan's shoulder line. **Never invert a height relationship for a nicer composition** — recompose the shot instead.

---

### 3.2 CH-01 · ISHAAN — the protagonist

**Face.** Youthful, slightly rounded jaw with a defined chin; the face reads 15, not 18. Large expressive eyes with a **double eyelid line** and a distinct lower-lash shadow; thick naturally arched brows; a small mole is *not* present (do not add one). Mouth is wide and asymmetrical — his smile pulls 2 mm higher on the right.

**Hair (locked).** Messy, slightly layered, jet black with a blue-black sheen under cool light and a warm brown edge under sunlight. Strands fall over his **left eyebrow** — this is the single most reliable identity cue in the film. The back is short but uneven. It does not stay neat; wind and movement displace it and it does not reset perfectly.

**Eyes (locked).** Dark brown, with **amber flecks between 3 and 5 o'clock in both irises**. Catchlights are always from the scene's actual light source. When he is emotionally struck (S06-06, S11-07, S13-07), the pupil dilates 10–15 % — never a colour change, never a glow.

**Build.** Slim, athletic, natural — a boy who plays sport but does not train. Shoulders narrow, hands long. Never drawn with adult musculature.

**Acting notes.** Ishaan performs 70 % with his eyes and 30 % with his jaw. He suppresses smiles (S03-03, S07-07) rather than showing them. When frightened he goes *still*, not loud. His physical tell is touching the blue accent on his right sleeve — established in S04-04.

**SIGNATURE OUTFIT — `JKT-BLR-01` (his exclusive property)**
- Matte **black / very dark navy** technical bomber, anime-premium construction.
- **Crimson-red inner lining**, visible at the open front, at the collar roll, and inside the cuffs.
- Thin red piping along the shoulder seam and the chest pocket zip.
- **Two small cobalt-blue geometric accents**: one on the collar tab, one on the **left** forearm. These are the only blue on the garment.
- High collar, worn folded down. Ribbed cuffs. No hood. No logo. No text. No backpack straps over it except P-03.
- Underneath: **crisp white school shirt** (collar visible, no tie), navy trousers, black canvas shoes.
- Cloth behaviour: the jacket is light and moves with him; it creases at the elbow and hangs open at the front. It must never look like armour or a uniform coat.

> **HARD FAIL CONDITIONS.** If the jacket is on any other character, if the lining is missing, if the blue accents are on the right arm, if the jacket becomes a hoodie, a blazer or a leather coat, or if it changes colour between shots — the shot is rejected without review.

---

### 3.3 CH-02 · MEERA — the new girl

**Face.** Natural teenage proportions, warm light-brown skin, slightly oval face, gently pointed chin. Thin, softly arched brows. Eyes almond, dark brown, with a calm resting expression that makes her look older than she is when she is not smiling.

**Hair (locked).** Long, straight, dark brown (not black), past mid-back. **Side-parted on her left**, with a **small silver hairpin pinning the left side above the ear.** This pin is a continuity anchor — if you cannot see it in a left-profile shot, the shot is wrong. She tucks the left side behind her ear as her nervous tell (S06-04).

**Wardrobe.** Elegant but simple: white shirt, navy pinafore, thin **maroon** ribbon at the collar, black shoes, single silver stud earrings. Bag with both straps, held in front with both hands when she is uncertain. She is *not* dressed better than everyone else — she is dressed more carefully.

**Relationship canon.** She already has a boyfriend from her previous city. **He is never seen, named, shown, or texted legibly in Episode 1.** The audience learns of him only through a facial expression (S07-05) and Ishaan's narration.

**Acting notes.** Meera is friendly before she is interested. She is never coy, never flustered, and never performs for the room. Her defining beat is the *different smile* in S07-05 — softer, downward, no teeth — and the audience must read the difference without any dialogue.

> **HARD FAIL CONDITIONS.** No glow, no soft-focus halo, no sparkle VFX, no slowed-motion entrance, no wind machine in an interior. She enters a classroom like a person, not an event. The romance is created by *Ishaan's face*, not by hers.

---

### 3.4 CH-03 · KABIR — the best friend

**Face.** Deliberately **different skeletal structure** from Ishaan: wider jaw, squarer chin, flatter cheekbone, rounder eyes set slightly wider apart, one **dimple on the left cheek** that appears only at full grin. Skin is a shade deeper than Ishaan's.

**Hair.** Short black, **side-swept quiff** with faded sides — a completely different silhouette from Ishaan's layered mop. It is the fastest way for an audience to tell them apart at a distance.

**Wardrobe (locked — and it is NOT the jacket).** White school shirt, **navy sweater-vest**, **maroon tie**, sleeves pushed to the elbow, navy trousers, black shoes. Bag slung on one shoulder, always falling off. In cold weather he adds nothing — he is the boy who is never prepared.

> **HARD FAIL CONDITIONS.** Kabir may never wear a black jacket, a red-lined anything, or anything with blue accents. Two characters in similar outerwear is the single most common AI-continuity failure in this project and it destroys the episode.

**Acting notes.** Kabir is the film's engine of motion and its only source of comedy. He walks on Ishaan's **left**. He talks with both hands. His face does 80 % of any two-shot he is in. He is loyal in a physical, unhesitating way (S12-03: his hand on Ishaan's shoulder; S13-02: he lets go, and it costs him).

---

### 3.5 CH-04 · AAROHI — younger sister

14, Class 9. Long dark hair in a **single braid with a blue ribbon**, worn over her **right shoulder** at breakfast. Wider, rounder eyes than Ishaan's — the family resemblance is in the brows and the chin. 9th-standard uniform: white shirt, navy pinafore, navy sweater-vest. She is always holding a book, a pen, or something she has confiscated. Her posture is *upright* — she is the only person in the house who never slouches.

**Acting notes.** She is smarter than everyone and does not hide it. Her teasing is affectionate and always lands (S03-02, S09-04). She is the character most likely to notice something is wrong — plant that; do not use it in Episode 1.

---

### 3.6 CH-05 · VIVAAN — younger brother

12, Class 7. Short messy hair with a **cowlick on the right**. Round face, wide grin, permanently in motion. White shirt untucked, navy shorts, **one sock missing**, scuffed black shoes. He uses his **left hand** for everything (established S03-04, repeated S09-05). His pockets contain objects of no value that matter enormously.

**Acting notes.** Vivaan is not a mascot. He is the reason the house is loud, and the film needs to feel that noise without ever hearing it. His toy car (P-04) is the emotional payload of Act III and must not be dropped.

---

### 3.7 CH-06 · MAA — mother

Late 30s, homemaker. Warm face, laugh-lines at the eyes before the mouth. Hair in a **low bun** with two loose strands at the temple. Wears a **deep-teal cotton saree with a mustard border** (locked for the whole episode — she does not change clothes mid-morning), small bindi, **two gold bangles on the right wrist only**.

**Acting notes.** She is introduced through her **hands** (S02-02), not her face. She never sits down in Act I. Her single most important shot is S03-06 — a hand placing a paratha on a plate. No dialogue. Everything the film believes about family is in that shot.

---

### 3.8 CH-07 · PITA — father

Mid 40s, businessman — *and nothing more specific than that.* No company, no office, no invented meeting, no invented business conflict.

Light-blue formal shirt, dark grey trousers, silver watch on the **left** wrist, trimmed moustache, neat short hair with grey at the temples. Carries a slim briefcase. His authority is quiet: he asks two questions instead of ten (S09-01).

**Acting notes.** He is not cold and not stern — he is *practical*, which is harder to animate and more interesting. His affection is expressed in efficiency: he signs the form, he straightens nothing, he nods once. When he looks at Ishaan he is checking, not judging.

---

### 3.9 CH-08 · CLASS TEACHER

30s. Thin-framed glasses, low bun, ID lanyard. Two wardrobe states only: **classroom saree** (S06) and **assembly formal saree** (S08). Friendly but disciplined — she smiles with her mouth closed and her eyebrows do the authority.

**Naming:** she has **no name** and must never be given one without approval. Credits: `CLASS TEACHER`.

---

### 3.10 BACKGROUND STUDENTS

Minimum **10 visually distinct silhouettes** in any crowd shot: varied heights, hair, posture, glasses, bags, one student with a sling, one with a cycle helmet, one with a water bottle permanently in hand. Uniform stays identical (it is a school); the *bodies* vary.

**Prohibited:** identical clone faces; the same face reused across two scenes as if it were a character; any background student designed so well that they compete with the main cast.

---

## 4 · WARDROBE & PROP REGISTER

| ID | Item | Owner | Appears | Lock |
|---|---|---|---|---|
| `JKT-BLR-01` | Black bomber, red lining, blue accents | Ishaan only | S03 (off), S04–S13 | §3.2 |
| `UNI-B` | White shirt · navy trousers (boys) | Ishaan, Kabir | S03–S09 | No logos. No ties on Ishaan. |
| `UNI-K` | Navy vest + maroon tie | Kabir | S05–S09 | Never over a black jacket |
| `UNI-M` | White shirt · navy pinafore · maroon ribbon | Meera | S06–S09 | Ribbon is maroon, not red |
| `P-01` | Digital clock, black, red digits | Bedroom | S01 | Must read 06:12 → 06:15 |
| `P-02` | Steel tiffin, 3-tier | Maa → Pita | S03, S09 | Dented lid, one clip missing |
| `P-03` | Dark grey backpack, one red zip pull | Ishaan | S04, S09, S10, S12 | The red pull is the ID |
| `P-04` | Small red toy car, chipped paint | Vivaan → Ishaan | S09-05, S12-01 (+Ep02) | Must survive the edit |
| `P-05` | Permission form, A4, single sheet | Home | S09-01, S09-02 | Same sheet, same crease |
| `P-06` | Phone, plain dark grey case | Meera | S07-05, S07-06 | Never a readable screen |
| `SIG-01` | The sigil: 3 arcs + 1 bisecting line + 1 circle | — | S12-02, S12-03, S13-05, S13-06 | Never simplified, never embellished |

**Cloth/object physics rule.** Every garment behaves like real cloth at 24 fps: the sweater-vest bunches at the waist, the pinafore swings on turns, the jacket's open front separates when he walks. If a garment moves like a rigid shell, the shot is rejected.

---

## 5 · ENVIRONMENT BIBLE

Twelve reusable locations. **Build these once, at full quality, before any shot work.** Every location has a locked floor plan and a locked sun direction; the sun's position may advance with time of day, but never reverses.

| ID | Location | Appears | Architectural lock |
|---|---|---|---|
| `L01` | Ishaan's bedroom | S01, S04, S09 | Bed house-left, desk house-right, door on the **right** wall of the hall (G-01). Window faces east. |
| `L02` | Family home — living room | S02, S09 | Kitchen door **left**, corridor **back**, main door **right** (G-02). Cream walls, tiled floor, ceiling fan (off — winter). |
| `L03` | Dining area | S03, S09 | Table centre, five chairs, window frame-left, steel thali set (SET-03). |
| `L04` | School exterior | S05, S10 | Gate at the **south** end, three-storey sand block running north, corridor on the **east** face, assembly hall **west** (A-04). Neem tree at the gate. |
| `L05` | School corridor | S05, S07 | Classroom doors **left**, open verandah **right**. Hard sun rectangles on the floor at a fixed angle. |
| `L06` | Classroom | S05–S07 | Blackboard **left**, window wall **right**, door **back-right**, six rows of dual desks. Ishaan+Kabir bench 4 (window side); Meera bench 2, centre-left. |
| `L07` | Assembly hall | S08 | Raked floor, stage north, tall windows **right** wall, projector on centre truss. |
| `L08` | School bus interior | S10 | 3+2 seating, warm strip lighting, curtained windows, driver's mirror front. |
| `L09` | Mountain roads | S10 | Two-lane tarmac, stone parapet, hairpins, valley of cloud. Observatory ridge visible from the west approach. |
| `L10` | Aaranya Ridge Observatory | S11 | White ribbed dome, single slit, glass-and-concrete block running east–west, solar panels, gravel apron. |
| `L11` | Old Observatory Wing | S11, S12 | Separate **stone** structure 60 m **north-west** — boarded windows, rusted chain and padlock, dead creeper, north wall contains the hidden opening (1 m × 2 m, 4 m from the corner). |
| `L12` | Pulse Core chamber | S12, S13 | 60 m domed void, ribbed pillars converging on a sealed apical oculus, 9 concentric floor rings, water film on the floor, sigil inlaid at 30 m radius. |

**Environment rules.**
- **Baked light, live characters.** Backgrounds are hand-painted-plate quality; characters are lit *into* them. Do not relight a background per shot.
- **Atmospheric perspective in three depths** on every exterior: foreground crisp, mid-ground +8 % haze, background +22 % haze.
- **No invented architecture.** If a building appears twice, its window count and roof line are identical both times.
- **The three sacred gradients.** As the episode progresses: (1) haze decreases as altitude rises; (2) saturation decreases; (3) the light source moves from *outside the frame* to *inside the room* to *inside the wall* to *at the centre of the chamber*.

---

## 6 · CINEMATOGRAPHY GRAMMAR

**Lens set (locked).** 24 · 28 · 32 · 35 · 40 · 50 · 85 · 100 macro. In anime terms: 24–28 = environment and dread; 35–50 = behaviour and friendship; 85–100 = feeling and detail. **Never** use a lens outside the set, and never use a long lens for an action or a wide lens for an emotion.

**Camera heights are semantic.**
| Height | Meaning | Used for |
|---|---|---|
| 1.05–1.20 m | Table / child height — vulnerability, intimacy | S03, S05-06, S06-05, S09-05 |
| 1.30–1.55 m | Eye level — equality, honesty | Most of the film |
| 1.60–1.80 m | Slightly above — observation, judgment | S02-07, S04-05, S12-05 |
| 2.20 m+ / aerial | Fate, scale, consequence | S05-01, S08-07, S10-06, S11-01, S13-01 |

**Movement vocabulary.** Only five moves exist in this film:
1. **Dolly-in** — entering someone's private world (S01-03, S02-02, S06-02).
2. **Lateral track** — following a decision (S01-05, S11-05, S13-03).
3. **Crane down** — arriving in a place, or the truth descending (S02-01, S08-07).
4. **Drone descend** — leaving the ordinary world (S05-01, S10-06, S11-01).
5. **Static hold** — the most used move in the episode. When in doubt, do not move the camera.

**Prohibited.** Random zooms. Whip pans. Speed ramps. Dutch angles. Camera shake for tension (the episode has **zero** shake except the bus's 1-px judder and one 1-px breath in CUs). Rack focus more than once per shot. Any transition other than a cut, a dissolve, or a fade to/from black.

**Cutting rules.**
- **Cut on the completion of an action**, not mid-motion.
- **Never cut from a moving shot to a static shot of the same subject** — it reads as an error.
- **Match eyelines to the degree.** Ishaan at bench 4 looking right toward Meera at bench 2 is locked; check S06-05, S06-06, S07-03 against it.
- **Hold the silence.** Several shots are 20–32 s with nothing happening but a face. Those are the film. Do not let any editor "tighten" them.

---

## 7 · COLOUR & LIGHTING SCRIPT

**Palette.** Four colours and no others.
```
INK      #0A0D12   the jacket, night, shadow
WARM     #FFC98A   home, morning, skin light
BLUE     #3F78FF   the mystery, the Core
SKIN     #C98B5E→#8A5638   always protected, never graded to blue
```
Everything else is a value between those four.

| Scene | Key | Contrast | Note |
|---|---|---|---|
| S01 | Warm shaft in cool room | High | The warmest thing is the *clock* |
| S02–S03 | Amber, bounced, honeyed | Low–mid | The safest images in the film |
| S04 | Lateral hard sun + red/blue accents | Mid | Protect the jacket's two accents above all |
| S05 | Cool blue-white exterior | Mid | School is cooler than home by 400K |
| S06 | +200K warmth at the door | Mid | Applied at the moment she enters, **held for the rest of the episode** |
| S07 | Warmest school | Low | The week is passing; sun patches grow |
| S08 | Cool, dusty, high-ceiling | Mid–high | Big room, small people |
| S09 | Warm interior / blue window | High | Split 50/50; the last safe frame |
| S10 | Blue dawn → clean altitude | Mid | Haze decreases as altitude rises |
| S11 | Hard noon, cold | High | One unnatural blue only |
| S12 | Progressive desaturation | High | Skin stays warm or the characters look dead |
| S13 | Blue + skin only | Extreme | Final 4 frames pure white |

**Rules.** One key light per shot, named, with a physical source. Shadow density is consistent within a location. Highlights roll off softly — never clip to pure white except S06-02 (corridor blowout) and S13-07 (the final 4 frames). No rim light on a character who has no light behind them. No glow that is not explained by a light source inside the frame.

---

## 8 · VFX BIBLE — THE PULSE CORE AND ITS LEAK

**The design thesis.** The Core is not a crystal, not a magic gem, not a lantern. It is a **suspended laminar fluid holding an internal lattice of light** — closer to a slow, enormous, ancient mind than to an object. It should feel **older than the building, older than the mountain, and awake.**

**Material spec.**
- Surface: neither glass nor liquid; it reads as depth without a visible skin, like looking into still water that is also a window.
- Interior: geometry. Layers of the `SIG-01` sigil rotating at different speeds, 2–6 °/s, never faster.
- Colour: `#2F6DFF` at the centre, `#7EA6FF` at the edges, with **no magenta, no cyan-teal, no white core hotspot.**
- Motion: the lattice *breathes* on a 4.8 s cycle. Everything it does is slow. Slow is what makes it feel intelligent.

**Five sanctioned effects — and nothing else.**
1. **Volumetric blue light** with physically plausible falloff (inverse-square, minimum 8 m visible throw).
2. **Particle drift** — 20–40 visible motes maximum in any frame, slow, orbital, no streaks.
3. **Geometric propagation** — light travels *along carved grooves* at 0.4 s per metre. It does not fly through the air.
4. **Reflection in standing water**, deliberately 30 % too coherent (the architecture is aware).
5. **Controlled distortion** — a 2–4 px refraction ring at the point of contact, in S13-05 only.

**Prohibited.** Lens flares. God rays in a sealed chamber. Lightning arcs. Sparks. Smoke. Sparks-in-water. Hexagons. Nanotech greebles. Slow-motion particle explosions. Any effect that looks like a video-game pickup. **Any glow that does not come from the sigil geometry.**

**The four-step escalation (locked intensities).**
| Shot | Intensity | What it is |
|---|---|---|
| S11-06 | 40 % | A leak through a boarded window. Barely there. |
| S12-03 | 20 % → steady | Light in a carved groove, following a fingertip. |
| S12-05 | 60 % | Ambient wash down a stairwell. |
| S13-06 | 100 % | The whole chamber answering at once. |

---

## 9 · AUDIO BIBLE

**Absolute rule.** The mix contains **one element**: Ishaan's Hindi narration. No dialogue, no music, no sound effects, no room tone bed, no ambience, no foley. Silence is not the absence of a soundtrack — **it is the soundtrack.**

This is a demanding creative constraint and it must be honoured in the *animation*, not compensated for in the mix. Because there is no sound:
- Every action that would make noise must be choreographed so the audience *hears* it in their head: the kettle, the bangles, the bell, the bus, the water under Ishaan's feet.
- Physical weight must be animated into the drawings: impact frames, anticipation, settle. Sound design is replaced by **motion design**.
- The teacher's announcement (S08) is carried by **faces and the projector**, never by a loudspeaker graphic.

**Loudness & delivery.**
- Master: −16 LUFS integrated, true peak −1.5 dBTP.
- Narration sits at a constant level; **no ducking is required because nothing else exists.** Do not add a music bed "for warmth". Do not add a whoosh at the Core. Do not add a riser at the cut to black.
- The only permissible non-narration audio is **digital silence with no dither artefact** — i.e. nothing.

**VO performance direction for Ishaan.** He is not narrating as a 15-year-old. He is **looking back** at 15 — the voice is older, quieter, and has already lived through what he is describing. Tempo: slow, 90–100 wpm, with a 0.6–1.0 s breath before each line. Never urgent, never theatrical, never "trailer voice". The final three lines (S13) are delivered almost tenderly, at a lower volume, as if to himself.



---

## 10 · NARRATION SCRIPT (ISHAAN — HINDI VO)

> **Policy.** Narration is the *only* audible element in the episode. No character dialogue, no music, no sound effects. 34 lines across 13 scenes / 10 record blocks. Speech density is deliberately low: roughly 2,900 characters of Hindi over 35 minutes (≈ 8 % of runtime). The silence is a creative decision, not a gap.

| Block | Scenes | Lines |
|---|---|---|
| VO-01 | S1 | 3 |
| VO-02 | S2–3 | 6 |
| VO-03 | S4 | 4 |
| VO-04 | S5 | 2 |
| VO-05 | S6 | 3 |
| VO-06 | S7 | 2 |
| VO-07 | S8 | 2 |
| VO-08 | S9 | 2 |
| VO-09 | S10–11 | 4 |
| VO-10 | S12–13 | 6 |

### Scene 01 · MORNING — 00:00–02:00

**`00:04–00:16`** &nbsp; कभी-कभी ज़िंदगी में कुछ ऐसा होने वाला होता है, जिसका हमें ज़रा भी अंदाज़ा नहीं होता।

> *Sometimes life is about to do something to us that we haven't the faintest idea of.*

**`00:22–00:42`** &nbsp; हम रोज़ की तरह उठते हैं, तैयार होते हैं, स्कूल जाते हैं... और सोचते हैं कि आज का दिन भी बाकी दिनों जैसा ही होगा।

> *We wake as always, get ready, go to school… and assume today will be just like every other day.*

**`00:52–00:58`** &nbsp; मैं भी कुछ ऐसा ही सोचता था।

> *I thought the same thing.*

### Scene 02 · FAMILY — 02:00–05:00

**`02:08–02:30`** &nbsp; मेरी माँ — घर की वो कड़ी जो कभी ढीली नहीं पड़ती। सबसे पहले उठने वाली, और सबसे आख़िर में बैठने वाली।

> *My mother — the link in this house that never goes slack. First to rise, last to sit.*

**`02:38–03:02`** &nbsp; पापा। हर चीज़ का हिसाब, हर बात में तर्क। उन्हें लगता था दुनिया एक समीकरण है — और वो उसे हल कर चुके हैं।

> *Papa. Every thing accounted for, logic in every sentence. He believed the world was an equation — and that he had already solved it.*

**`03:10–03:26`** &nbsp; आरोही — मुझसे एक क्लास छोटी, पर समझ में तीन साल आगे।

> *Aarohi — one class below me, three years ahead of me in understanding.*

**`03:34–03:52`** &nbsp; और विवान। सातवीं का वो तूफ़ान, जिसे हर सुबह कुछ नया तोड़ना होता था।

> *And Vivaan. The storm of class seven, who had to break something new every morning.*

### Scene 03 · BREAKFAST — 05:00–07:00

**`05:06–05:26`** &nbsp; घर में सुबह की आवाज़ें हमेशा एक जैसी थीं — चाय की केतली, माँ की डाँट, और विवान की हँसी।

> *The sounds of morning at home were always the same — the kettle, Maa's scolding, and Vivaan's laugh.*

**`05:34–05:56`** &nbsp; उस वक़्त मुझे नहीं पता था कि ये मामूली सी सुबह मेरी सबसे कीमती यादों में से एक बन जाएगी।

> *Back then I didn't know that this ordinary morning would become one of my most precious memories.*

### Scene 04 · ISHAAN — 07:00–09:00

**`07:04–07:12`** &nbsp; वैसे, अभी तक मैंने अपने बारे में कुछ बताया ही नहीं।

> *Actually, I haven't told you anything about myself yet.*

**`07:18–07:24`** &nbsp; मेरा नाम ईशान है।

> *My name is Ishaan.*

**`07:30–07:52`** &nbsp; क्लास टेन का स्टूडेंट। स्कूल, दोस्त, होमवर्क और परीक्षाएँ... बस यही मेरी दुनिया थी।

> *A class-ten student. School, friends, homework, exams… that was my entire world.*

**`08:36–08:48`** &nbsp; कम से कम, उस दिन तक तो नहीं।

> *At least, not until that day.*

### Scene 05 · SCHOOL LIFE — 09:00–12:00

**`09:06–09:28`** &nbsp; स्कूल वही था। गेट वही, दीवारें वही, और कबीर भी वही — हमेशा की तरह पाँच मिनट लेट।

> *School was the same. Same gate, same walls, and Kabir the same too — five minutes late, as always.*

**`09:34–09:56`** &nbsp; कबीर से मिलने का मतलब था दिन की पहली हँसी। और वो हँसी हमारे बीच की सबसे पुरानी आदत थी।

> *Seeing Kabir meant the first laugh of the day. And that laugh was the oldest habit we had.*

### Scene 06 · MEERA'S ENTRY — 12:00–16:00

**`12:04–12:08`** &nbsp; और फिर वो आई।

> *And then she came.*

**`12:14–12:32`** &nbsp; क्लास के दरवाज़े पर एक अनजान चेहरा — जिसे देखकर लगा जैसे कमरे की हवा बदल गई हो।

> *An unfamiliar face at the classroom door — and it felt as if the air in the room had changed.*

**`15:06–15:38`** &nbsp; उस वक़्त मुझे नहीं पता था कि उसका नाम मीरा है। और ये भी नहीं पता था कि उसकी दुनिया में पहले से कोई और है।

> *At that moment I didn't know her name was Meera. Nor did I know that someone else was already in her world.*

### Scene 07 · FRIENDSHIP — 16:00–19:00

**`16:06–16:34`** &nbsp; कुछ दिनों में मीरा हमारी क्लास का हिस्सा बन गई। कबीर को बात करने का बहाना मिल गया, और मुझे... बस देखने का।

> *In a few days Meera became part of our class. Kabir found an excuse to talk to her, and I found… an excuse to watch.*

**`18:02–18:30`** &nbsp; एक दोपहर उसके फ़ोन पर एक मैसेज आया। उसने पढ़ा, मुस्कुराई, और फ़ोन जेब में रख दिया। मैंने कुछ नहीं पूछा।

> *One afternoon a message arrived on her phone. She read it, smiled, and slipped the phone back into her pocket. I didn't ask anything.*

### Scene 08 · THE TRIP — 19:00–22:00

**`19:08–19:30`** &nbsp; अगले हफ़्ते की सुबह असेंबली में एक नाम आया — आरण्य रिज ऑब्ज़र्वेटरी।

> *The following week, in assembly, a name came over the speakers — Aaranya Ridge Observatory.*

**`19:36–20:04`** &nbsp; तीन दिन का एजुकेशनल ट्रिप। पहाड़, दूरबीनें, और स्कूल से दूर दो रातें। कबीर की आँखों में चिंगारी थी। मेरी भी थी।

> *A three-day educational trip. Mountains, telescopes, and two nights away from school. There was a spark in Kabir's eyes. In mine too.*

### Scene 09 · PREPARATION — 22:00–24:00

**`22:06–22:32`** &nbsp; पापा ने फ़ॉर्म देखा, दो सवाल पूछे, और साइन कर दिए। माँ ने बैग पैक किया — जैसे मैं किसी युद्ध पर जा रहा हूँ।

> *Papa looked at the form, asked two questions, and signed it. Maa packed my bag — as if I were going to war.*

**`22:38–23:06`** &nbsp; आरोही ने मेरी जैकेट छुपा दी थी, मज़ाक में। और विवान ने बैग में अपना खिलौना रख दिया — 'ताकि तुम अकेले न हो'।

> *Aarohi had hidden my jacket, as a joke. And Vivaan put his toy in my bag — 'so you're not alone'.*

### Scene 10 · THE ROAD — 24:00–27:00

**`24:06–24:30`** &nbsp; सुबह छह बजे बस चली। शहर धीरे-धीरे पीछे छूटता गया, और खिड़की के बाहर सड़कें पहाड़ों में बदल गईं।

> *The bus left at six. The city fell away behind us, and outside the window the roads turned into mountains.*

**`26:04–26:28`** &nbsp; मीरा बस में पीछे की सीट पर बैठी थी। कभी-कभी वो बाहर देखती... और कभी-कभी मेरी तरफ़।

> *Meera was sitting at the back of the bus. Sometimes she looked outside… and sometimes she looked at me.*

### Scene 11 · AARANYA RIDGE — 27:00–30:00

**`27:06–27:34`** &nbsp; आरण्य रिज। बादलों के नीचे बना एक शांत इमारत — जैसे पहाड़ ने खुद के लिए एक दरवाज़ा बनाया हो।

> *Aaranya Ridge. A quiet building beneath the clouds — as if the mountain had made a door for itself.*

**`29:02–29:30`** &nbsp; पुरानी इमारत बंद थी। ताले पर जंग थी, दीवारों पर धूल। लेकिन उसी तरफ़ से नीली रोशनी आ रही थी।

> *The old building was sealed. Rust on the lock, dust on the walls. But a blue light was coming from that side.*

### Scene 12 · THE HIDDEN DOOR — 30:00–33:00

**`30:04–30:20`** &nbsp; मैंने किसी को नहीं बताया। सिर्फ़ कबीर को इशारा किया — और वो समझ गया।

> *I didn't tell anyone. I only signalled Kabir — and he understood.*

**`30:44–31:08`** &nbsp; दीवार पर एक निशान था। तीन रेखाएँ, एक गोलाई... जैसे कोई पुरानी भाषा मेरा नाम बुला रही हो।

> *There was a mark on the wall. Three lines, one circle… as if some old language were calling my name.*

**`32:10–32:30`** &nbsp; सीढ़ियाँ नीचे जाती थीं। हवा ठंडी थी, और अंधेरे में भी कुछ चमक रहा था।

> *The stairs went down. The air was cold, and even in the dark something was shining.*

### Scene 13 · THE PULSE CORE — 33:00–35:20

**`34:06–34:22`** &nbsp; उस पल मुझे समझ नहीं आ रहा था कि मेरे साथ क्या हो रहा है।

> *In that moment I couldn't understand what was happening to me.*

**`34:30–34:36`** &nbsp; मैं बस एक चीज़ जानता था...

> *I only knew one thing…*

**`34:42–34:58`** &nbsp; अब कुछ भी पहले जैसा नहीं रहने वाला था।

> *Nothing was ever going to be the same again.*


---

## 11 · SCENE-BY-SCENE SHOT LIST

Total runtime **35:20** · **89 shots** · 13 scenes. Every shot carries the 13 production fields required by the brief.


### SCENE 01 — MORNING

**`00:00 – 02:00`** &nbsp;·&nbsp; 120 s &nbsp;·&nbsp; ACT I — THE ORDINARY WORLD  
**Location:** L01 · ISHAAN'S BEDROOM  
**Time of day:** 06:12 → 06:26 · winter dawn, cold blue exterior / warm interior  
**Grade:** Cool cyan shadows (#1B2A3A) against a single warm sunrise shaft (#FFC98A). Low saturation, high contrast, soft halation on the sun edge only.

**Logline:** The world before the world changes. A room, a clock, a boy who believes today will be identical to yesterday.

**Key frame:** `assets/storyboard/S01.png`


#### `S01-01` — EWS · 14 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-01` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 14 s |
| 4 | Characters visible | — |
| 5 | Actions | Empty-feeling room. Curtain breathes once in a draught. Dust motes drift through the sun shaft. No human movement. |
| 6 | Facial expression | — |
| 7 | Camera position | EWS · 24mm · Interior, height 1.55 m, locked off on a tripod at the foot of the bed, window at frame-left edge |
| 8 | Camera movement | Static. Fade in from black over 1.5 s. No zoom. |
| 9 | Environment | Bedroom: bed house-left, study desk house-right, wardrobe on the back wall, half-drawn curtain across a tall window. |
| 10 | Lighting | One hard low-angle sun shaft (≈12° above horizon) raking across the floor; cold 5600K ambient fill; practical bedside lamp OFF. |
| 11 | VFX | Dust motes in the shaft, faint anamorphic bloom on the shaft edge only. |
| 12 | Narration timing | Narration line 1 enters at 00:04, over the empty room — deliberately before we see him. |
| 13 | Continuity requirements | Curtain must be drawn to exactly 2/3. Clock reads 06:12. Blanket smooth, one pillow dented. |

#### `S01-02` — ECU · 16 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-02` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 16 s |
| 4 | Characters visible | — |
| 5 | Actions | Digital clock digits roll 06:14 → 06:15. |
| 6 | Facial expression | — |
| 7 | Camera position | ECU · 100mm macro · Tabletop height, 20 cm from the digital clock, 3/4 angle |
| 8 | Camera movement | Static. Rack focus from the clock body to the digits at 00:14. |
| 9 | Environment | Bedside table: clock, a glass of water, a school ID card face-down, tangled charger cable. |
| 10 | Lighting | A thin warm slit of sun crosses only the digits; the rest of the frame sits in blue shadow. |
| 11 | VFX | None. This is the film's 'honest' shot — zero effects, maximum cleanliness. |
| 12 | Narration timing | Line 2 begins at 00:22, one beat after the digits settle. |
| 13 | Continuity requirements | Digits must read 06:15 and hold until S01-05. Clock model is registered as prop P-01. |

#### `S01-03` — MS · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-03` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 22 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Asleep on his side, one arm out of the blanket, fingers curled. Chest rises and falls. |
| 6 | Facial expression | Fully relaxed; mouth slightly open; brow smooth. |
| 7 | Camera position | MS · 35mm · Interior, height 1.25 m, at the side of the bed, looking slightly down at 8° |
| 8 | Camera movement | Very slow dolly-in, 0.35 m/s, motive: entering his private world. |
| 9 | Environment | L01 bedroom, headboard against the back wall, school bag slumped on the floor. |
| 10 | Lighting | Warm rim along the cheek and shoulder from the sun shaft; face 70% in cool shadow. |
| 11 | VFX | Dust motes; blanket fibre detail; no glow. |
| 12 | Narration timing | Line 2 continues — the narration is describing him while he is unconscious. |
| 13 | Continuity requirements | Hair falls over his LEFT eyebrow — lock this direction in every sleeping/reclining shot. |

#### `S01-04` — CU · 16 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-04` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 16 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Eyes open. Three slow blinks. Pupils contract as they find the window. He does not move his head. |
| 6 | Facial expression | Sleep-fogged → mildly annoyed → resigned. Micro-performance only, no big expression. |
| 7 | Camera position | CU · 85mm · Interior, height 1.15 m, 50 cm from his face, eye-line level |
| 8 | Camera movement | Near-static with 1-px handheld breathing. No dolly. |
| 9 | Environment | Same, background softly defocused, curtain glow behind. |
| 10 | Lighting | Warm key across the bridge of the nose; cool fill keeps the far side of the face readable. |
| 11 | VFX | Slight eye-highlight bloom. |
| 12 | Narration timing | Line 2 ends; 3 s of pure room tone before line 3. |
| 13 | Continuity requirements | Eye colour: dark brown, amber flecks at 4 o'clock in both irises — identical in every CU. |

#### `S01-05` — MS · 18 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-05` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 18 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Pushes himself upright, sits on the edge, stretches both arms overhead, yawns, scratches the back of his head. |
| 6 | Facial expression | Eyes still half-closed; jaw cracks in the yawn; a small involuntary smile at the end. |
| 7 | Camera position | MS · 32mm · Interior, height 1.4 m, near the wardrobe, looking across the bed |
| 8 | Camera movement | Slow lateral dolly left→right, 0.5 m/s, following the stretch. |
| 9 | Environment | L01 bedroom, morning light now stronger and warmer. |
| 10 | Lighting | Sun shaft has moved 4° across the floor — the room is warming shot by shot. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 3 at 00:52 — 'I thought the same thing' lands on the yawn. Understated, almost throwaway. |
| 13 | Continuity requirements | Clock in background must show 06:15+. Blanket now crumpled — do not re-smooth it for the rest of the scene. |

#### `S01-06` — OTS → tracking MS · 18 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-06` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 18 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He stands, walks across the room, kicks a slipper into place, and reaches the bathroom door. |
| 6 | Facial expression | Neutral; eyes on the floor; one hand rubbing the back of his neck. |
| 7 | Camera position | OTS → tracking MS · 28mm · Starts over his shoulder at 1.5 m, then swings to a trailing 3/4 rear track |
| 8 | Camera movement | Smooth 90° arc + follow, steadicam, no shake, ends behind his right shoulder. |
| 9 | Environment | Bedroom → short hallway → bathroom door. Door frame on the right third. |
| 10 | Lighting | Backlit by the window; he reads almost as a silhouette with a warm edge. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. Let the footsteps we cannot hear be felt in the body language. |
| 13 | Continuity requirements | Door is on the RIGHT wall of the hallway (geography lock G-01). Slippers: dark grey, left one scuffed. |

#### `S01-07` — CU · 16 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S01-07` |
| 2 | Scene | 01 — MORNING |
| 3 | Duration | 16 s |
| 4 | Characters visible | ISHAAN (hand only) |
| 5 | Actions | Hand closes on the handle, turns it, door swings inward and warm light spills over his fingers. |
| 6 | Facial expression | — |
| 7 | Camera position | CU · 50mm · Interior, height 1.30 m, focused on the door handle, shallow depth |
| 8 | Camera movement | Static. He pushes the door; light floods; slow 6-frame dissolve to Scene 2. |
| 9 | Environment | Bathroom door, painted off-white, small brass handle, a towel hook at frame-right. |
| 10 | Lighting | Practical bathroom light beyond the door: warm 3000K, blooming into the cold hallway. |
| 11 | VFX | Gentle overexposure bloom on the door edge as it opens. |
| 12 | Narration timing | Line 3 finishes by 00:58, then 60 s of narration-free room tone carries us to the cut. |
| 13 | Continuity requirements | First appearance of the film's recurring motif: light arriving from behind a door. |


### SCENE 02 — FAMILY

**`02:00 – 05:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT I — THE ORDINARY WORLD  
**Location:** L02 · FAMILY HOME — LIVING ROOM / KITCHEN / HALLWAY  
**Time of day:** 06:30 → 07:10 · full morning sun inside the house  
**Grade:** Warm amber interior (#FFB870) with teal shadow pockets. Saturation +8 vs Scene 1 — the house is the warmest place in the film and must stay that way.

**Logline:** Four people, one small flat, and the ordinary choreography of a family that does not yet know it is being remembered.

**Key frame:** `assets/storyboard/S02.png`


#### `S02-01` — EWS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-01` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 26 s |
| 4 | Characters visible | MAA (background, out of focus) |
| 5 | Actions | A geography of home assembles itself as we descend: ceiling fan, wall calendar, framed family photo, sofa, dining table, and finally a figure crossing behind. |
| 6 | Facial expression | — |
| 7 | Camera position | EWS · 24mm · Interior, starts at ceiling height 2.8 m, centred on the living room's back wall |
| 8 | Camera movement | Slow crane DOWN to 1.6 m over the full 26 s — one continuous move, no cut. |
| 9 | Environment | Living room: sofa camera-right, dining table centre, kitchen doorway left, hallway to bedrooms at back. Middle-class Indian home — lived-in, not styled. |
| 10 | Lighting | Hard window light from the left casting long rectangles on the floor; warm bounced fill from the cream walls. |
| 11 | VFX | Dust motes; the fan is OFF (it is winter). |
| 12 | Narration timing | Line 1 begins at 02:08. |
| 13 | Continuity requirements | Lock the room's geography for the whole episode (G-02): kitchen door LEFT, corridor BACK, main door RIGHT. Never mirror this. |

#### `S02-02` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-02` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 26 s |
| 4 | Characters visible | MAA |
| 5 | Actions | Rolling dough / stirring a pan, turning a flame down, wiping her hands on her dupatta, lifting a steel tiffin off the shelf. |
| 6 | Facial expression | Not visible — we meet her through her hands first. Deliberate. |
| 7 | Camera position | MS · 35mm · Interior, height 1.45 m, behind Maa's right shoulder at 1.2 m |
| 8 | Camera movement | Slow push-in 0.25 m/s, ending on her hands, not her face. |
| 9 | Environment | Kitchen: two-burner stove, steel utensils, tiled backsplash slightly stained near the stove. |
| 10 | Lighting | Window over the sink at frame-right: warm key; steam catches the light. |
| 11 | VFX | Steam, faint flour dust in the light. |
| 12 | Narration timing | Line 1 rides this entire shot. |
| 13 | Continuity requirements | Maa wears a deep-teal cotton saree with a mustard border; small bindi; two gold bangles on the right wrist only. |

#### `S02-03` — CU · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-03` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 28 s |
| 4 | Characters visible | MAA |
| 5 | Actions | She calls toward the hallway (lips move, no audible words), smiles at whatever she sees off-screen, and points a spatula in mock warning. |
| 6 | Facial expression | Warm, tired, faintly amused. Eyes crease before the mouth — lock this order of expression. |
| 7 | Camera position | CU · 85mm · Interior, height 1.55 m, 70 cm from her face, 3/4 turned toward the doorway |
| 8 | Camera movement | Static, 1-px breathing. She turns into the lens from a task. |
| 9 | Environment | Kitchen defocused to warm bokeh. |
| 10 | Lighting | Window key on her left cheek; the right side falls into soft shadow, still fully readable. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence across the turn — let the face carry it. |
| 13 | Continuity requirements | Her hair is in a low bun with two loose strands at the temple, identical in every scene. |

#### `S02-04` — MS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-04` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 24 s |
| 4 | Characters visible | PITA |
| 5 | Actions | Adjusts a shirt cuff, fastens a wristwatch, picks up a slim briefcase, checks it once, sets it down again. |
| 6 | Facial expression | Focused, mildly hurried; a single glance at the mirror with no vanity in it. |
| 7 | Camera position | MS · 40mm · Interior, height 1.45 m, in the hallway looking back toward the main door |
| 8 | Camera movement | Static. He walks toward the camera and passes frame-left. |
| 9 | Environment | Hallway with a shoe rack, a mirror, and the main door at the far end. |
| 10 | Lighting | Cool daylight from the door glass against warm hallway tungsten — a two-temperature frame. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 at 02:38, landing on the wristwatch fastening. |
| 13 | Continuity requirements | Pita: light-blue formal shirt, dark grey trousers, no jacket indoors, silver watch on the LEFT wrist, trimmed moustache, neat hair with grey at the temples. |

#### `S02-05` — MS · 32 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-05` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 32 s |
| 4 | Characters visible | AAROHI |
| 5 | Actions | Sits with a textbook open, writing, then looks up sharply toward the hallway, closes the book with one finger inside, and half-rises. |
| 6 | Facial expression | Concentration → alertness → the beginning of a smirk. She is always one beat ahead. |
| 7 | Camera position | MS · 35mm · Interior, height 1.20 m, seated-height at the dining table, looking across at Aarohi |
| 8 | Camera movement | Slow 15° arc to the right, keeping her centred. |
| 9 | Environment | Dining table, steel glass, a stack of notebooks, a school bag hooked on the chair. |
| 10 | Lighting | Window light from frame-left, warm; the notebook page is the brightest object in the frame. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 3 at 03:10. |
| 13 | Continuity requirements | Aarohi: long dark hair in a single braid, blue ribbon at the end, 9th-standard uniform (white shirt, navy pinafore, navy sweater-vest). |

#### `S02-06` — LS → MS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-06` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 24 s |
| 4 | Characters visible | VIVAAN |
| 5 | Actions | Slides down the last three steps, lands badly, recovers with enormous dignity, and runs a toy car along the wall as he goes. |
| 6 | Facial expression | Pure chaos wearing a grin. One sock missing. |
| 7 | Camera position | LS → MS · 28mm · Interior, height 1.10 m at the hall entrance, low enough to catch the bannister |
| 8 | Camera movement | Handheld-lite follow as he runs past; small 20° pan, no whip. |
| 9 | Environment | Stair/hall junction, shoes scattered, a school bag dragging open. |
| 10 | Lighting | Backlit from the door; rim light catches his hair. |
| 11 | VFX | None. Keep the chaos practical. |
| 12 | Narration timing | Line 4 at 03:34, timed to the landing. |
| 13 | Continuity requirements | Vivaan: 7th standard, short messy hair, white shirt untucked, navy shorts, one sock, scuffed black shoes. |

#### `S02-07` — OTS WIDE · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S02-07` |
| 2 | Scene | 02 — FAMILY |
| 3 | Duration | 20 s |
| 4 | Characters visible | ISHAAN, MAA, PITA, AAROHI, VIVAAN |
| 5 | Actions | Ishaan, freshly showered in a plain white shirt, arrives at the end of the corridor and simply watches his family for two full seconds before anyone notices him. |
| 6 | Facial expression | Unreadable, then a small private smile. This is the shot the finale will echo. |
| 7 | Camera position | OTS WIDE · 24mm · Interior, height 1.60 m, behind and left of Ishaan, down the length of the corridor |
| 8 | Camera movement | Static. Ishaan steps into frame and stops; the family continues in soft focus beyond him. |
| 9 | Environment | Corridor to living room; every family member visible but out of focus. |
| 10 | Lighting | Warm interior; Ishaan in near-silhouette with a bright edge. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. Hold the whole 20 s — this is the film's emotional anchor shot. |
| 13 | Continuity requirements | MIRROR SHOT: S13-06 must reuse this exact framing with the light inverted to blue. |


### SCENE 03 — BREAKFAST

**`05:00 – 07:00`** &nbsp;·&nbsp; 120 s &nbsp;·&nbsp; ACT I — THE ORDINARY WORLD  
**Location:** L03 · DINING AREA  
**Time of day:** 07:15 → 07:35 · morning, everything golden  
**Grade:** The warmest grade in the episode: amber key, honeyed highlights, gentle highlight roll-off. Nothing in this scene may look cool.

**Logline:** Small domestic comedy, played entirely in the body. The family at its most functional — and its most fragile.

**Key frame:** `assets/storyboard/S03.png`


#### `S03-01` — MS · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S03-01` |
| 2 | Scene | 03 — BREAKFAST |
| 3 | Duration | 22 s |
| 4 | Characters visible | MAA, PITA, AAROHI, VIVAAN, ISHAAN (hands) |
| 5 | Actions | Parathas, a steel bowl of curd, four glasses of milk, one hand stealing, one hand swatting, one hand pouring. |
| 6 | Facial expression | — (faces cropped above the frame line) |
| 7 | Camera position | MS · 35mm · Interior, height 1.05 m — table-top height, slightly below eye-line, looking across the table |
| 8 | Camera movement | Static. Hands do the acting in the foreground. |
| 9 | Environment | Dining table with a steel thali set, a plastic mat, a newspaper folded beside Pita's plate. |
| 10 | Lighting | Window light from frame-left skimming the table surface; the steel reflects small warm hotspots. |
| 11 | VFX | Steam off the parathas; no bloom on the steel. |
| 12 | Narration timing | Line 1 at 05:06. |
| 13 | Continuity requirements | Table dressing is a registered set piece (SET-03). Same plates, same mat, every shot. |

#### `S03-02` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S03-02` |
| 2 | Scene | 03 — BREAKFAST |
| 3 | Duration | 20 s |
| 4 | Characters visible | AAROHI, ISHAAN (foreground shoulder) |
| 5 | Actions | Aarohi points her spoon at Ishaan's head, mimes an explosion, and grins. |
| 6 | Facial expression | Delighted cruelty. Eyebrows high, chin down. |
| 7 | Camera position | MS · 50mm · Interior, height 1.20 m, seated eye-level, Aarohi frame-right facing camera-left |
| 8 | Camera movement | Gentle push-in 0.15 m/s. |
| 9 | Environment | Dining table, Ishaan's shoulder a soft dark mass in the foreground-right. |
| 10 | Lighting | Warm key on Aarohi; foreground shoulder in shadow. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence — the joke has to land visually. |
| 13 | Continuity requirements | Her braid stays over her RIGHT shoulder in all breakfast shots. |

#### `S03-03` — CU · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S03-03` |
| 2 | Scene | 03 — BREAKFAST |
| 3 | Duration | 22 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Chews, stops, pats his hair down twice, fails, gives his sister a flat look, then goes back to eating. |
| 6 | Facial expression | Deadpan. Eyes only: 'really?' The mouth never changes. |
| 7 | Camera position | CU · 85mm · Interior, height 1.20 m, 60 cm, dead-on eye level |
| 8 | Camera movement | Static, 1-px breathing. |
| 9 | Environment | Background defocused, warm and busy. |
| 10 | Lighting | Warm key from the left, soft shadow side; catchlights in both eyes. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 begins at 05:34 — it must start on the flat look. |
| 13 | Continuity requirements | Jacket NOT worn yet in this scene — he is in the white shirt only. Signature jacket appears in S04. |

#### `S03-04` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S03-04` |
| 2 | Scene | 03 — BREAKFAST |
| 3 | Duration | 20 s |
| 4 | Characters visible | VIVAAN, MAA (hand) |
| 5 | Actions | Vivaan reaches across for a paratha, knocks his milk glass, and Maa's hand appears from frame-right and catches it without her looking. |
| 6 | Facial expression | Guilt → relief → instant re-offence. |
| 7 | Camera position | MS · 40mm · Interior, height 1.15 m, across the table, Vivaan frame-left |
| 8 | Camera movement | Small 10° lateral drift right. |
| 9 | Environment | Dining table, milk sloshing but not spilling. |
| 10 | Lighting | Warm; the milk is the second-brightest object in frame. |
| 11 | VFX | Tiny milk ripple; do not over-simulate. |
| 12 | Narration timing | Silence. One clean comedic beat, then cut. |
| 13 | Continuity requirements | Vivaan uses his LEFT hand — established habit, repeat in S09. |

#### `S03-05` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S03-05` |
| 2 | Scene | 03 — BREAKFAST |
| 3 | Duration | 20 s |
| 4 | Characters visible | PITA, MAA, ISHAAN (background) |
| 5 | Actions | Pita stands, checks his watch, is handed a steel tiffin by Maa without a word exchanged. He nods once. She straightens his collar. |
| 6 | Facial expression | Pita: businesslike. Maa: fond exasperation. |
| 7 | Camera position | MS · 32mm · Interior, height 1.45 m, near the main door, looking back into the room |
| 8 | Camera movement | Static. |
| 9 | Environment | Main door area, the family behind them at the table. |
| 10 | Lighting | Cool daylight at the door behind Pita; warm room light on Maa — the two-temperature frame returns. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 continues and ends here — on the collar straightening, not on the words. |
| 13 | Continuity requirements | The tiffin is prop P-02; it appears again in S09 on the kitchen counter. |

#### `S03-06` — CU · 16 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S03-06` |
| 2 | Scene | 03 — BREAKFAST |
| 3 | Duration | 16 s |
| 4 | Characters visible | MAA (hand), ISHAAN (hand) |
| 5 | Actions | Maa's hand slides a second paratha onto Ishaan's plate. His hand closes over it. Her hand withdraws, then returns to briefly pat his knuckles. |
| 6 | Facial expression | — |
| 7 | Camera position | CU · 100mm · Table height, 25 cm, macro on the hands |
| 8 | Camera movement | Static. Cut to black at 06:58 with a 10-frame fade. |
| 9 | Environment | Plate detail: steel thali, ghee sheen, fingerprints on the rim. |
| 10 | Lighting | Warm; the hand textures are the point of the shot. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence over the whole shot. The episode's thesis, delivered without a word. |
| 13 | Continuity requirements | Maa's bangles must ring — but per the audio rule, no sound effect is mixed; the motion must SUGGEST the sound. |


### SCENE 04 — ISHAAN

**`07:00 – 09:00`** &nbsp;·&nbsp; 120 s &nbsp;·&nbsp; ACT I — THE ORDINARY WORLD  
**Location:** L01 · ISHAAN'S BEDROOM (mirror wall)  
**Time of day:** 07:40 · strong lateral morning sun  
**Grade:** Warm key, cool bounce, and — for the first time — the jacket's RED and BLUE accents are the only saturated colours in frame. Grade the scene to protect them.

**Logline:** The character reveal. The jacket goes on, and the boy the audience will follow for the next 26 minutes is formally introduced.

**Key frame:** `assets/storyboard/S04.png`


#### `S04-01` — CU · 18 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S04-01` |
| 2 | Scene | 04 — ISHAAN |
| 3 | Duration | 18 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | The black jacket is already on his shoulders; he turns the collar up, then flattens it, then settles it. |
| 6 | Facial expression | Focused on the task; jaw set; eyes on his own reflection. |
| 7 | Camera position | CU · 85mm · Interior, height 1.55 m, over his shoulder into the mirror — we see the REFLECTION, not him |
| 8 | Camera movement | Static. Fade up already inside the shot — no scene-setting. |
| 9 | Environment | Mirror above a small dresser, a comb, a school ID card, a tube of hair product. |
| 10 | Lighting | Hard lateral sun from frame-right catching the crimson inner lining as the collar moves. |
| 11 | VFX | Red lining edge bloom only when it faces the light — one flicker, no constant glow. |
| 12 | Narration timing | Line 1 at 07:04, deliberately casual. |
| 13 | Continuity requirements | JACKET LOCK JKT-BLR-01: matte black technical bomber, crimson inner lining, thin red piping on shoulder seam and chest pocket zip, two cobalt-blue geometric accents (collar tab + right forearm), ribbed cuffs, no hood, no logo. |

#### `S04-02` — ECU · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S04-02` |
| 2 | Scene | 04 — ISHAAN |
| 3 | Duration | 22 s |
| 4 | Characters visible | ISHAAN (reflection) |
| 5 | Actions | He looks at himself, blinks once, and pushes his fringe out of his left eye — it falls straight back. |
| 6 | Facial expression | Self-assessment without vanity: a small frown, then acceptance. |
| 7 | Camera position | ECU · 100mm · Interior, height 1.58 m, 40 cm, framed on the eyes in the mirror |
| 8 | Camera movement | Imperceptible push, 0.1 m/s. |
| 9 | Environment | Mirror glass with a faint smudge at frame-left; the room behind him is soft bokeh. |
| 10 | Lighting | Two catchlights, warm; dark brown iris with amber flecks at 4 o'clock. |
| 11 | VFX | None. Eyes must be pristine — no over-sharpening. |
| 12 | Narration timing | Line 2 at 07:18 — 'My name is Ishaan' lands here, on his own reflection, not on a wide shot. |
| 13 | Continuity requirements | Pupil size identical to S01-04. Iris fleck position locked (CONT-EYE-01). |

#### `S04-03` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S04-03` |
| 2 | Scene | 04 — ISHAAN |
| 3 | Duration | 20 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Turns from the mirror, rolls his shoulders once to settle the jacket, and tugs the ribbed cuff. |
| 6 | Facial expression | Neutral; the beginning of confidence. |
| 7 | Camera position | MS · 35mm · Interior, height 1.30 m, three-quarter front, window behind camera-left |
| 8 | Camera movement | Slow 20° arc around him, clockwise, keeping the window at his back-left. |
| 9 | Environment | Bedroom, school bag on the bed, jacket fully visible for the first time. |
| 10 | Lighting | Key from frame-left, cool bounce from the wall — the jacket reads as black, never grey. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 3 begins at 07:30 and rides the arc. |
| 13 | Continuity requirements | Full-body identity check: 5'7", lean athletic build, white school shirt under the jacket, navy trousers, black canvas shoes. |

#### `S04-04` — CU · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S04-04` |
| 2 | Scene | 04 — ISHAAN |
| 3 | Duration | 20 s |
| 4 | Characters visible | ISHAAN (arm) |
| 5 | Actions | His thumb traces the small blue geometric accent on the sleeve — a private, unconscious habit. |
| 6 | Facial expression | — |
| 7 | Camera position | CU · 50mm · Interior, height 1.10 m, low on the right forearm, angled up |
| 8 | Camera movement | Static, shallow depth. |
| 9 | Environment | Sleeve detail against the defocused bed. |
| 10 | Lighting | Raking side light so the blue accent catches one specular highlight; red piping glows faintly. |
| 11 | VFX | None. Resist adding energy here — the jacket is ordinary in Episode 1. |
| 12 | Narration timing | Silence. The habit is a private ritual — do not narrate it. |
| 13 | Continuity requirements | CONT-HABIT-01: he touches this accent again in S12-04 (foreshadow) and S13-04. |

#### `S04-05` — LS · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S04-05` |
| 2 | Scene | 04 — ISHAAN |
| 3 | Duration | 22 s |
| 4 | Characters visible | ISHAAN, MAA (background, crossing) |
| 5 | Actions | Full-body silhouette in the doorway; Maa passes behind him carrying laundry; he ducks slightly to let her through. |
| 6 | Facial expression | Small, automatic courtesy. |
| 7 | Camera position | LS · 24mm · Interior, height 1.50 m, from the corridor looking into the doorway |
| 8 | Camera movement | Static. He crosses the frame left to right and exits. |
| 9 | Environment | Doorway framing the lit bedroom; the corridor in shadow. |
| 10 | Lighting | Backlit doorway — his outline is crisp, jacket breaks the light at the shoulders. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 3 ends at 07:52; the remainder of the shot is silent. |
| 13 | Continuity requirements | This doorway framing is the parent of S02-07 and S13-06 — the 'threshold' motif (MOTIF-01). |

#### `S04-06` — MS · 18 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S04-06` |
| 2 | Scene | 04 — ISHAAN |
| 3 | Duration | 18 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Sling the bag over one shoulder, one last look at his room, then down the stairs out of frame. |
| 6 | Facial expression | A flicker of something unnameable — the last time he looks at this room as an ordinary room. |
| 7 | Camera position | MS · 40mm · Interior, height 1.40 m, at the stair head, looking back at his bedroom door |
| 8 | Camera movement | Static. He turns his head back once, then goes. |
| 9 | Environment | Stair head, bedroom door behind him, morning light on the wall. |
| 10 | Lighting | Warm; the room behind him is slightly overexposed, as if already becoming a memory. |
| 11 | VFX | Very faint halation on the door frame. |
| 12 | Narration timing | Line 4 at 08:36 — 'not until that day' — then hard cut to black for 12 frames, then Scene 5. |
| 13 | Continuity requirements | Bag: dark grey backpack with one red zip pull (P-03). Keep consistent to S10. |


### SCENE 05 — SCHOOL LIFE

**`09:00 – 12:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT II — THE NEW GIRL  
**Location:** L04 · SCHOOL EXTERIOR → L05 · CORRIDOR → L06 · CLASSROOM  
**Time of day:** 07:55 → 08:20 · clear winter morning  
**Grade:** Slightly desaturated blue-white exterior against warm interior corridors. The school is lighter and cooler than home — the visual argument of the episode starts here.

**Logline:** School as a warm, loud, ordinary ecosystem. Kabir is introduced as the person who makes Ishaan's day survivable.

**Key frame:** `assets/storyboard/S05.png`


#### `S05-01` — ELS (aerial) · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-01` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 24 s |
| 4 | Characters visible | — (crowd as texture) |
| 5 | Actions | Students stream through the gate in two directions; a cycle rickshaw waits; a bell tower clock reads 07:52. |
| 6 | Facial expression | — |
| 7 | Camera position | ELS (aerial) · 24mm · Exterior, drone at 40 m, descending along the school's front axis |
| 8 | Camera movement | Slow continuous descend + 15° forward tilt. No orbit, no speed ramp. |
| 9 | Environment | L04 school: three-storey sand-coloured block, blue-grey roof, a neem tree at the gate, painted boundary wall, dusty playground to the right. |
| 10 | Lighting | Low winter sun behind the building, long shadows toward camera; sky pale, almost white at the horizon. |
| 11 | VFX | Dust in the playground air, light atmospheric haze on the treeline. |
| 12 | Narration timing | Line 1 at 09:06 over the descent. |
| 13 | Continuity requirements | ARCHITECTURE LOCK A-04: gate at the south end, main block running north, corridor on the east face, assembly hall to the west. Never rotate this plan. |

#### `S05-02` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-02` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | Walks through the gate, shifts his bag, sidesteps a running junior, and looks for someone. |
| 6 | Facial expression | Half-awake, then alerting to a familiar face. |
| 7 | Camera position | MS · 50mm · Exterior, height 1.55 m, tracking backward ahead of him at 1.0 m/s |
| 8 | Camera movement | Backward track, matching his walk; crowd crosses between camera and subject twice. |
| 9 | Environment | Gate → front steps, painted wall, students in identical uniforms. |
| 10 | Lighting | Cool daylight, gently overcast; the jacket's red lining is the only warm accent in the frame. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 continues. |
| 13 | Continuity requirements | Background students must be visually varied — 10 distinct silhouettes minimum, no identical clones (CONT-BG-01). |

#### `S05-03` — MS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-03` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 24 s |
| 4 | Characters visible | KABIR, ISHAAN |
| 5 | Actions | Kabir is leaning on the pillar, sees Ishaan, pushes off it, spreads his arms theatrically, and claps Ishaan's shoulder hard enough to shift him. |
| 6 | Facial expression | Kabir: enormous grin, mouth open mid-laugh. Ishaan: wincing, then laughing despite himself. |
| 7 | Camera position | MS · 40mm · Exterior, height 1.45 m, at the pillar, side-on to the steps |
| 8 | Camera movement | Static; Kabir moves INTO frame from the right. |
| 9 | Environment | Verandah pillars, notice board behind, morning light striping the columns. |
| 10 | Lighting | Striped shadow pattern from the pillar row across both characters — identical stripe angle in all shots of this location. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 at 09:34. |
| 13 | Continuity requirements | KABIR LOCK: warmer, deeper brown skin than Ishaan; short black hair with a side-swept quiff and faded sides; wider jaw; rounder eyes; one dimple on the LEFT cheek. Outfit: white shirt, navy sweater-vest, maroon tie, sleeves pushed to the elbow, NO jacket. He must never wear anything resembling JKT-BLR-01. |

#### `S05-04` — MS (2-shot) · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-04` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | Kabir talks with both hands, re-enacts something, trips on a bag, recovers, and keeps talking. Ishaan laughs with his shoulders rather than his mouth. |
| 6 | Facial expression | Comfortable, unforced. Kabir's face does 80% of the work; Ishaan's reactions are the other 20%. |
| 7 | Camera position | MS (2-shot) · 35mm · Interior, height 1.50 m, walking backward ahead of them along the corridor |
| 8 | Camera movement | Steadicam backward track, 1.1 m/s, gentle drift; no bumps. |
| 9 | Environment | L05 corridor: classroom doors left, open verandah right, sunlight in hard rectangles on the floor. |
| 10 | Lighting | Strong side light through the verandah arches; dust visible in the beams. |
| 11 | VFX | Dust in the light beams only. |
| 12 | Narration timing | Line 2 rides the walk. |
| 13 | Continuity requirements | Their height relationship is locked: Ishaan ~2 cm taller than Kabir; Kabir leans. Never invert this. |
| + | Friendchemistry | Kabir always walks on Ishaan's LEFT. Keep it. |

#### `S05-05` — LS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-05` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN, KABIR, TEACHER, BACKGROUND STUDENTS |
| 5 | Actions | Students settling — bags dropping, chairs scraping, one student copying homework at speed. The teacher stands at the board, tapping a marker against her palm. |
| 6 | Facial expression | Teacher: patient authority. Students: the universal 8:15 AM slump. |
| 7 | Camera position | LS · 28mm · Interior, height 1.60 m, back of the classroom at the door, deep focus |
| 8 | Camera movement | Slow 8° dolly right as they enter, settling into a static composition. |
| 9 | Environment | L06 classroom: 6 rows of dual desks, blackboard left, window wall RIGHT, door at the back-right, ceiling fans running. |
| 10 | Lighting | Window bank on the right floods the room; left side falls into cool shadow. Sun patches on the right-hand desks. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence — let the room establish itself. |
| 13 | Continuity requirements | SEATING LOCK: Ishaan + Kabir at bench 4, window side. Meera will be seated at bench 2, centre. Do not move anyone. |

#### `S05-06` — MS · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-06` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 28 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | Notebook slides between them. Kabir draws something rude, Ishaan scribbles it out, Kabir flicks a paper ball at the back of a student's head, Ishaan suppresses a laugh by biting his cheek. |
| 6 | Facial expression | Conspiratorial. Eyebrows and cheek muscles only. |
| 7 | Camera position | MS · 50mm · Interior, height 1.10 m, across the desk from the front, low |
| 8 | Camera movement | Static; occasional 1-px breathing. |
| 9 | Environment | Desk surface: two notebooks, one geometry box, pen caps, chalk dust. |
| 10 | Lighting | Warm window light on the desk; faces half-lit. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. The comedy must survive with zero audio. |
| 13 | Continuity requirements | PROPOSED (non-canon, please approve): the paper ball and the rude doodle. Easily removable. |

#### `S05-07` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S05-07` |
| 2 | Scene | 05 — SCHOOL LIFE |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | His laugh fades to a neutral face. He looks out of the window at nothing in particular and drums two fingers once on the desk. |
| 6 | Facial expression | The first hint that he is waiting for something he cannot name. |
| 7 | Camera position | CU · 85mm · Interior, height 1.30 m, 3/4 to Ishaan, window behind his shoulder |
| 8 | Camera movement | Imperceptible 0.08 m/s push. |
| 9 | Environment | Window, the neem tree outside, white sky. |
| 10 | Lighting | Window as the key: 4:1 ratio, soft cool wrap, warm accent from the corridor door. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. This is the plant for Meera's arrival — do not cut it short. |
| 13 | Continuity requirements | Board must still read the same lesson text as S05-05 (CONT-BOARD-01). |


### SCENE 06 — MEERA'S ENTRY

**`12:00 – 16:00`** &nbsp;·&nbsp; 240 s &nbsp;·&nbsp; ACT II — THE NEW GIRL  
**Location:** L06 · CLASSROOM  
**Time of day:** 08:25 · morning sun has moved onto the window desks  
**Grade:** Shift the white balance 200K warmer the moment she steps through the door, and hold it for the rest of the episode. The audience should feel it before they notice it.

**Logline:** The episode's turning point for the heart of the story: a door opens, a girl enters, and one boy forgets how to sit still.

**Key frame:** `assets/storyboard/S06.png`


#### `S06-01` — MS · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-01` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 22 s |
| 4 | Characters visible | TEACHER, BACKGROUND STUDENTS |
| 5 | Actions | The teacher is mid-sentence at the board. The door handle turns. Nobody reacts yet. |
| 6 | Facial expression | Ordinary. This flatness is the setup. |
| 7 | Camera position | MS · 35mm · Interior, height 1.45 m, on the classroom door from the front-side, door at frame-centre |
| 8 | Camera movement | Static. The lesson continues in the background unbroken. |
| 9 | Environment | L06 door: pale green, half-glass panel, a brass handle, a 'X-B' class plate. |
| 10 | Lighting | Corridor daylight leaking around the door edge — the only bright thing on a shadowed wall. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 at 12:04, one second after the handle turns. |
| 13 | Continuity requirements | The door opens INWARD toward the corridor (G-06). Never animate it opening into the room. |

#### `S06-02` — LS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-02` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 26 s |
| 4 | Characters visible | MEERA (silhouette), BACKGROUND STUDENTS |
| 5 | Actions | The door swings open and Meera stands in the frame, backlit into a silhouette, bag strap in both hands. Every head in the room turns. |
| 6 | Facial expression | Not yet readable — that is the point. |
| 7 | Camera position | LS · 24mm · Interior, height 1.55 m, from the back of the room, straight down the centre aisle |
| 8 | Camera movement | Very slow push-in 0.15 m/s, straight, no pan. |
| 9 | Environment | Full classroom depth, centre aisle, blackboard far left. |
| 10 | Lighting | Corridor is 3 stops hotter than the room: she is a white shape with a dark edge. Deliberate blow-out. |
| 11 | VFX | Subtle halation around her outline only. |
| 12 | Narration timing | Line 2 begins at 12:14. |
| 13 | Continuity requirements | Her silhouette proportions locked: long hair past mid-back, medium height (5'3"), straight posture. |

#### `S06-03` — MS · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-03` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 28 s |
| 4 | Characters visible | MEERA |
| 5 | Actions | She steps through, lets the door close behind her with one hand, adjusts the strap, and scans the room — left to right, then settles. |
| 6 | Facial expression | Composed nervousness. Chin level, small swallow, eyes doing all the work. |
| 7 | Camera position | MS · 50mm · Interior, height 1.40 m, inside the room at the front, 3/4 on her as she enters |
| 8 | Camera movement | Slight 10° arc left as she steps in, keeping her centred. |
| 9 | Environment | Doorway, the front two rows soft in the foreground. |
| 10 | Lighting | Now lit properly: window key from frame-right on her cheek, corridor rim behind. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 continues. |
| 13 | Continuity requirements | MEERA LOCK: 15–16, warm light-brown skin, long straight dark-brown hair past mid-back, side part with a small silver hairpin on her LEFT, almond dark eyes, thin brows, slim build. Uniform: white shirt, navy pinafore, thin maroon ribbon at the collar, black shoes, single silver stud earrings. |

#### `S06-04` — CU · 30 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-04` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 30 s |
| 4 | Characters visible | MEERA |
| 5 | Actions | She gives the class a small, genuine, slightly embarrassed smile; her eyes flick to an empty seat; she tucks a strand of hair behind her left ear. |
| 6 | Facial expression | The hair-tuck is the only 'performance' — everything else is restrained. Two blinks, no more. |
| 7 | Camera position | CU · 85mm · Interior, height 1.50 m, 70 cm, eye-line, her face filling frame-right two-thirds |
| 8 | Camera movement | Static with 1-px breathing. Hold longer than comfortable. |
| 9 | Environment | Background of students dissolving into warm bokeh. |
| 10 | Lighting | Window key, 3:1, catchlights in both eyes; the silver hairpin catches a specular spark. |
| 11 | VFX | None. Do not soft-focus or glow her — she must look like a real girl in a real room. |
| 12 | Narration timing | Silence from 12:32 to 15:06 — almost three minutes with no narration at all. Trust the visuals. |
| 13 | Continuity requirements | Hairpin stays on her LEFT in every shot. Earrings silver studs only, both scenes. |

#### `S06-05` — CU (POV) · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-05` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 28 s |
| 4 | Characters visible | MEERA |
| 5 | Actions | She is looking elsewhere now (toward the teacher). We watch her in profile, unaware of being watched. |
| 6 | Facial expression | Unselfconscious. Mouth slightly relaxed. |
| 7 | Camera position | CU (POV) · 85mm · Interior, height 1.45 m, ISHAAN'S EYE LINE — camera placed at his seated eye height at bench 4 |
| 8 | Camera movement | Static. Slightly tighter than S06-04 to imply his attention narrowing. |
| 9 | Environment | As above, but the background now includes the blackboard edge. |
| 10 | Lighting | Warm; her profile edge lit by the window. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. |
| 13 | Continuity requirements | POV LOCK: this framing must match S07-03's angle so the audience reads the same eyeline. |

#### `S06-06` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-06` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | His pen has stopped. He realises his mouth is slightly open and closes it. He looks down at his notebook, then back up. |
| 6 | Facial expression | Caught. The eyes widen 10%, the brow lifts 2mm, and he actively tries to arrange his face into indifference. It does not work. |
| 7 | Camera position | CU · 85mm · Interior, height 1.45 m, at bench 4, 3/4 front on Ishaan |
| 8 | Camera movement | Static. A single, tiny push of 0.05 m/s — almost subliminal. |
| 9 | Environment | Desk foreground, notebook with an unfinished line, pen held mid-stroke. |
| 10 | Lighting | Window key from behind-right; warm bounce lifts his eyes. |
| 11 | VFX | None. No sparkles, no colour shift, no rose tint. This is the most important anti-cliché instruction in the episode. |
| 12 | Narration timing | Silence. |
| 13 | Continuity requirements | Pen stops exactly 1 s before the cut. Notebook page number visible and consistent with S05-06. |

#### `S06-07` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-07` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 26 s |
| 4 | Characters visible | KABIR |
| 5 | Actions | Kabir's eyes slide from Meera to Ishaan, then back, then to Ishaan. He bites his lip to stop the grin and raises one eyebrow. |
| 6 | Facial expression | Pure, delighted evil. Dimple visible on the LEFT cheek. |
| 7 | Camera position | CU · 85mm · Interior, height 1.45 m, at bench 4, 3/4 on Kabir |
| 8 | Camera movement | Static. |
| 9 | Environment | Desk, Kabir's elbow in the foreground. |
| 10 | Lighting | Same warm key as S06-06 to keep the eyeline continuous. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. This is the audience's own reaction, delivered by proxy. |
| 13 | Continuity requirements | CONT-EYELINE-02: Kabir sits on Ishaan's LEFT at bench 4, so Kabir looks RIGHT to see Meera and LEFT to see Ishaan — the mirror of Ishaan's look. |

#### `S06-08` — MS · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-08` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 28 s |
| 4 | Characters visible | MEERA, BACKGROUND STUDENTS |
| 5 | Actions | She walks down the aisle past bench 4. As she passes, Ishaan's shoulder shifts slightly toward her and then pulls back. |
| 6 | Facial expression | She is looking ahead — she does not see him. |
| 7 | Camera position | MS · 40mm · Interior, height 1.50 m, from the front of the class, filming her walk down the aisle toward camera |
| 8 | Camera movement | Static; she walks toward the lens and sits out of the bottom of the frame. |
| 9 | Environment | Aisle, desks left and right, sun patches on the floor. |
| 10 | Lighting | She passes THROUGH a sun patch — a 12-frame warm flash across her uniform. Unrepeatable, so it must be beautiful. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 3 begins at 15:06 as she sits. |
| 13 | Continuity requirements | She sits at bench 2, two rows ahead of Ishaan, centre-left seat. Never change this seat. |

#### `S06-09` — MS (2-shot) · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S06-09` |
| 2 | Scene | 06 — MEERA'S ENTRY |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN, KABIR, MEERA (back of head) |
| 5 | Actions | Kabir leans in and mutters something; Ishaan shakes his head without looking at him. Meera, ahead, opens her notebook. |
| 6 | Facial expression | Ishaan: caught between defending himself and smiling. Kabir: triumphant. |
| 7 | Camera position | MS (2-shot) · 50mm · Interior, height 1.30 m, behind bench 4 looking forward, both boys in foreground, Meera's back in mid-ground |
| 8 | Camera movement | Static. Slow 2 s push to end. |
| 9 | Environment | Three layers of depth: foreground boys, mid-ground Meera, deep background blackboard. |
| 10 | Lighting | Warm; the composition is the point |
| 11 | VFX | None. |
| 12 | Narration timing | Line 3 finishes at 15:38, then silence to the cut. |
| 13 | Continuity requirements | Final image of Act II's opening: three people whose arrangement the entire series will be built on. |


### SCENE 07 — FRIENDSHIP

**`16:00 – 19:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT II — THE NEW GIRL  
**Location:** L06 · CLASSROOM → L05 · CORRIDOR  
**Time of day:** A week compressed: 11:40 → 13:10, several days elided through light changes  
**Grade:** The warmest the school will ever look. Sun patches on the floor grow imperceptibly as the week advances — the only time-passing device allowed.

**Logline:** Three people become a unit. And underneath it, a phone buzzes — and the audience learns something Ishaan does not.

**Key frame:** `assets/storyboard/S07.png`


#### `S07-01` — MS (over-shoulder) · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-01` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 24 s |
| 4 | Characters visible | MEERA, ISHAAN |
| 5 | Actions | Meera slides her notebook across so Ishaan can copy a diagram. He starts to copy, gets a line wrong, and she taps the page with a pencil, correcting him. |
| 6 | Facial expression | Meera: matter-of-fact, no flirting. Ishaan: a 3-second glance at her hand, then back to the page. |
| 7 | Camera position | MS (over-shoulder) · 50mm · Interior, height 1.20 m, behind Meera's right shoulder onto the desk she shares with Ishaan |
| 8 | Camera movement | Slow 15° arc — the camera slowly chooses Meera's side of the frame. |
| 9 | Environment | Desk, open notebook, pencil box, a steel water bottle. |
| 10 | Lighting | Warm window key from frame-right; notebook paper slightly blown out. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 at 16:06. |
| 13 | Continuity requirements | PROPOSED (non-canon): sharing a notebook and the pencil-tap correction. Consistent with the brief's 'notebook sharing' beat. |

#### `S07-02` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-02` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | MEERA, KABIR, ISHAAN |
| 5 | Actions | Kabir finishes a story with a big gesture; Meera laughs openly, head back; Ishaan laughs one beat later, watching her laugh rather than the joke. |
| 6 | Facial expression | Genuine, unguarded. Let the audience see that he is laughing at HER laugh. |
| 7 | Camera position | MS · 40mm · Interior, height 1.50 m, in the corridor, side-on to them, lockers/notice board behind |
| 8 | Camera movement | Static; the three move through the frame right to left. |
| 9 | Environment | L05 corridor mid-block, hard sun rectangles on the floor, one hanging fan. |
| 10 | Lighting | Striped light; their shadows fall left and stay consistent with S05-04. |
| 11 | VFX | Dust in the beams. |
| 12 | Narration timing | Line 1 continues. |
| 13 | Continuity requirements | Kabir between them in this shot — the series' enduring composition: Kabir centre, the other two either side of a gap. |

#### `S07-03` — CU · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-03` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 24 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He writes, stops, looks up and left (toward Meera's bench), catches himself, and resumes writing — but the pen doesn't move. |
| 6 | Facial expression | The small, private smile he will not admit to. |
| 7 | Camera position | CU · 85mm · Interior, height 1.40 m, low front three-quarter on Ishaan at the desk |
| 8 | Camera movement | Imperceptible push, 0.06 m/s. |
| 9 | Environment | Desk, page, his own hand shadow. |
| 10 | Lighting | Warm key, 3:1; the brightest point in frame is the notebook. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence across the whole shot — the narration is deliberately absent here. |
| 13 | Continuity requirements | Eyeline must match S06-05/06-06 to the degree. |

#### `S07-04` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-04` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | MEERA, KABIR, ISHAAN |
| 5 | Actions | Three backs at the arch, looking out at the playground. Meera points at something; Kabir leans to see; Ishaan doesn't look at what she's pointing at. |
| 6 | Facial expression | Faces unseen — posture only. This is the friendship image the series will return to. |
| 7 | Camera position | MS · 28mm · Interior, height 1.55 m, from behind the three of them at the open corridor arch |
| 8 | Camera movement | Very slow dolly-in from behind, 0.2 m/s — we join them rather than watch them. |
| 9 | Environment | Corridor arch, deep background of the playground, tree, white sky. |
| 10 | Lighting | Backlit; the interior is cool, the outside is blown white. |
| 11 | VFX | Atmospheric haze in the outdoor background. |
| 12 | Narration timing | Silence. |
| 13 | Continuity requirements | PROPOSED (non-canon): this friendship tableau. Flagged for approval; harmless to remove. |

#### `S07-05` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-05` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | MEERA, ISHAAN (foreground) |
| 5 | Actions | Her phone buzzes on the desk. She turns it face-up, reads, and a completely different smile arrives — smaller, softer, private. |
| 6 | Facial expression | The smile must be visibly DIFFERENT from the laugh in S07-02. Softer eyes, no teeth, slightly downward. |
| 7 | Camera position | MS · 50mm · Interior, height 1.30 m, across the bench at Meera, Ishaan's shoulder as foreground mass |
| 8 | Camera movement | Static. |
| 9 | Environment | Desk, phone face-down then face-up, a stack of textbooks. |
| 10 | Lighting | Warm; the screen glow adds a tiny cool bounce to her chin — the one cool light in the scene. |
| 11 | VFX | Faint screen glow on her fingers only. |
| 12 | Narration timing | Line 2 at 18:02 — begins exactly as she reads. |
| 13 | Continuity requirements | PHONE LOCK: plain dark-grey case, no visible logos, no readable text on screen ever. Never show the sender, never show the name (CONT-MEERA-01). |

#### `S07-06` — CU · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-06` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 28 s |
| 4 | Characters visible | MEERA |
| 5 | Actions | She types a short reply, hesitates, deletes one character, retypes it, then puts the phone away and returns to her book. |
| 6 | Facial expression | The hesitation is the whole story. Eyes flick down-left, then a small resolve. |
| 7 | Camera position | CU · 85mm · Interior, height 1.30 m, 3/4 on Meera from Ishaan's side of the bench |
| 8 | Camera movement | Static with breathing; she types two characters and stops. |
| 9 | Environment | Phone in hand, notebook beneath, Ishaan's out-of-focus shoulder in the corner. |
| 10 | Lighting | Window key; the phone edge catches a thin line of light. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 continues to 18:30. |
| 13 | Continuity requirements | She is NOT hiding the phone from Ishaan — she simply doesn't think of him as someone to hide from yet. Play it innocent. |

#### `S07-07` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S07-07` |
| 2 | Scene | 07 — FRIENDSHIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He saw. He looks back down at his notebook, adjusts it unnecessarily, and keeps the small smile — but his jaw sets. |
| 6 | Facial expression | Not jealousy. Uncertainty. The performance is entirely in the jaw and the breath. |
| 7 | Camera position | CU · 85mm · Interior, height 1.32 m, 3/4 on Ishaan, slightly tighter than S07-06 |
| 8 | Camera movement | Static. End on a 10-frame hold, then cut. |
| 9 | Environment | Desk, notebook, hand at rest. |
| 10 | Lighting | Warm key, slightly dimmer than S07-06 — one-quarter stop down, subliminal. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. The narration stops before the emotional beat, not during it. |
| 13 | Continuity requirements | Do not add a musical sting. The audio bible forbids it. The jaw must carry it. |


### SCENE 08 — THE TRIP

**`19:00 – 22:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT II — THE NEW GIRL  
**Location:** L07 · ASSEMBLY HALL  
**Time of day:** 09:30 · overcast, cool, big-room light  
**Grade:** Cool, dusty, high-ceilinged. Sunlight through tall windows in visible shafts. The only saturated colour in the hall is the projection screen.

**Logline:** The inciting invitation. A name is spoken over a loudspeaker: AARANYA RIDGE OBSERVATORY. The story's door opens.

**Key frame:** `assets/storyboard/S08.png`


#### `S08-01` — LS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-01` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | TEACHER (on stage), BACKGROUND STUDENTS (≈120) |
| 5 | Actions | Rows of students in uniform, a few whispering, one teacher at the microphone; the projection screen is still white. |
| 6 | Facial expression | — (crowd) |
| 7 | Camera position | LS · 24mm · Interior, height 2.20 m on a riser at the back of the hall, centred on the stage |
| 8 | Camera movement | Slow 10° drift left to reveal the full room. |
| 9 | Environment | L07 assembly hall: raked floor, stage with a wooden podium, tall windows on the RIGHT wall, ceiling fans, a projector hanging from the centre truss. |
| 10 | Lighting | Overcast daylight through the tall windows: soft directional shafts, dust suspended; house lights off. |
| 11 | VFX | Volumetric shafts (very subtle), dust. |
| 12 | Narration timing | Line 1 at 19:08. |
| 13 | Continuity requirements | CROWD LOCK: assembly is a different crowd from the classroom — vary faces, but no character from the main cast wears a different uniform. Ever. |

#### `S08-02` — MS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-02` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 24 s |
| 4 | Characters visible | TEACHER |
| 5 | Actions | She taps the mic twice, checks a paper, and gestures toward the screen. Her lips move — no audio. |
| 6 | Facial expression | Friendly but disciplined: a slight smile, then straight back to business. |
| 7 | Camera position | MS · 50mm · Interior, height 1.70 m, on the stage, 3/4 side on the teacher at the podium |
| 8 | Camera movement | Static; she looks from her notes to the room. |
| 9 | Environment | Podium, a glass of water, a stack of permission forms, the microphone stand. |
| 10 | Lighting | Stage key from a high side window; her shadow falls back-left onto the curtains. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 continues. |
| 13 | Continuity requirements | TEACHER LOCK: 30s, glasses, navy saree with a plain border, hair in a low bun, ID lanyard. Same as S06 but formal saree, not classroom saree. Do not give her a name. |

#### `S08-03` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-03` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | — |
| 5 | Actions | Slides: (1) a dome observatory on a ridge at dawn, (2) a long-exposure star field, (3) students looking through a telescope. |
| 6 | Facial expression | — |
| 7 | Camera position | CU · 100mm · Interior, height 1.90 m, projector lens level, framed so only the screen fills the frame |
| 8 | Camera movement | Static; three slow slide changes on a 4 s dissolve each. |
| 9 | Environment | Projection surface only: cool white, faint hotspot in the centre. |
| 10 | Lighting | The screen is the light source for this shot — project a soft glow onto the surrounding darkness. |
| 11 | VFX | Projector dust, a faint horizontal scan shimmer. Keep it analogue and period-honest. |
| 12 | Narration timing | Silence. Let the audience read the photographs. |
| 13 | Continuity requirements | The dome in slide 1 MUST match the architecture revealed in S11 (A-11): white ribbed dome, single slit, ridge on the left. Continuity supervisor to compare frames. |

#### `S08-04` — MS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-04` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 24 s |
| 4 | Characters visible | BACKGROUND STUDENTS, ISHAAN, KABIR, MEERA |
| 5 | Actions | Heads turning to each other; a ripple of excitement; one student actually bounces in his seat. |
| 6 | Facial expression | Uncontained teenage excitement, in 60 different shades. |
| 7 | Camera position | MS · 35mm · Interior, height 1.55 m, from the stage looking down at the front rows — reverse angle to S08-01 |
| 8 | Camera movement | Slow 20° pan right across the faces. |
| 9 | Environment | Front six rows, wooden seats, backpacks on laps. |
| 10 | Lighting | Cool ambient; faces lit from the front by the screen reflection — a moving blue-white key. |
| 11 | VFX | Screen-reflected flicker on faces, extremely subtle. |
| 12 | Narration timing | Line 2 at 19:36. |
| 13 | Continuity requirements | Meera is in the third row, Ishaan and Kabir in the fifth. Keep them separated here — the bus reunites them. |

#### `S08-05` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-05` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | KABIR |
| 5 | Actions | His face lights up two beats before he moves; then he turns and grabs Ishaan's forearm with both hands. |
| 6 | Facial expression | The full grin. Mouth open, eyes wide, dimple deep. This is Kabir's best frame in the episode. |
| 7 | Camera position | CU · 85mm · Interior, height 1.45 m, seated eye level, 3/4 on Kabir |
| 8 | Camera movement | Static. Small 1-px shake only when he grabs Ishaan's arm. |
| 9 | Environment | Seated rows, shoulders of other students framing him. |
| 10 | Lighting | Screen light from frame-left, warm bounce from Ishaan's jacket on the right. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 continues. |
| 13 | Continuity requirements | His sweater-vest sleeve must be visible — he never wears a jacket. |

#### `S08-06` — MS (2-shot) · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-06` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 28 s |
| 4 | Characters visible | ISHAAN, KABIR, TEACHER (foreground, defocused) |
| 5 | Actions | The boys whisper furiously and bump fists under the seat. The teacher's head turns; they freeze instantly into identical innocent postures. |
| 6 | Facial expression | Panic-comedy. Identical straight faces, one bead of sweat on Kabir. |
| 7 | Camera position | MS (2-shot) · 40mm · Interior, height 1.50 m, in front of them at bench height, looking back |
| 8 | Camera movement | Static; a 15° correction to keep the teacher's glare in frame-right. |
| 9 | Environment | Assembly seating, foreground teacher shoulder out of focus. |
| 10 | Lighting | Screen key, side fill. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. |
| 13 | Continuity requirements | PROPOSED (non-canon): the fist bump and the freeze. It's a genre beat, not a plot event. |

#### `S08-07` — LS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S08-07` |
| 2 | Scene | 08 — THE TRIP |
| 3 | Duration | 26 s |
| 4 | Characters visible | BACKGROUND STUDENTS, TEACHER |
| 5 | Actions | A visible wave of excitement moves through the hall; students turn to each other; the teacher raises a hand for quiet, smiling. |
| 6 | Facial expression | Collective joy, played silently. |
| 7 | Camera position | LS · 24mm · Interior, height 2.30 m, wide from the back of the hall as the room reacts |
| 8 | Camera movement | Slow crane up 0.8 m over the shot — the room opening like a held breath. |
| 9 | Environment | Full hall depth. |
| 10 | Lighting | Overcast shafts; the projector is now dark, so the room dims by a stop and the shafts dominate. |
| 11 | VFX | Dust, shafts. |
| 12 | Narration timing | Line 2 ends at 20:04; 90 s of wordless school life before Scene 9. |
| 13 | Continuity requirements | End the scene on the hall, not on a face — the pull of the destination must feel bigger than the characters. |


### SCENE 09 — PREPARATION

**`22:00 – 24:00`** &nbsp;·&nbsp; 120 s &nbsp;·&nbsp; ACT II — THE NEW GIRL  
**Location:** L02 · FAMILY HOME → L03 · DINING → L01 · BEDROOM  
**Time of day:** 19:40 → 22:15 · evening, tungsten + one window of blue dusk  
**Grade:** Warm tungsten interior fighting a cold blue window. Half the frame warm, half cold — the episode's last 'safety' image.

**Logline:** The last ordinary night. A signature on a form, a mother packing a bag, a sister hiding a jacket, a brother sneaking a toy in.

**Key frame:** `assets/storyboard/S09.png`


#### `S09-01` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S09-01` |
| 2 | Scene | 09 — PREPARATION |
| 3 | Duration | 20 s |
| 4 | Characters visible | PITA, ISHAAN |
| 5 | Actions | Ishaan sets the permission form down. Pita reads it, turns it over, reads the back, and looks up with two silent questions. |
| 6 | Facial expression | Pita: scrutiny without hostility. Ishaan: hopeful, trying to look responsible. |
| 7 | Camera position | MS · 35mm · Interior, height 1.30 m, across the dining table from Pita's side |
| 8 | Camera movement | Static; a single lamp pools light on the form. |
| 9 | Environment | Dining table at night: form, a pen, a cup of tea, the newspaper folded. |
| 10 | Lighting | Single tungsten pendant overhead creating a hard pool of light, the rest of the room in blue window light. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 at 22:06. |
| 13 | Continuity requirements | FORM LOCK: one A4 sheet, white, school letterhead at the top, a signature line at the bottom right. No readable text needed — but the same sheet must appear in S09-02. |

#### `S09-02` — ECU · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S09-02` |
| 2 | Scene | 09 — PREPARATION |
| 3 | Duration | 20 s |
| 4 | Characters visible | PITA (hand only) |
| 5 | Actions | A fountain pen comes down and signs in one unhurried stroke. A thumb presses the corner flat. |
| 6 | Facial expression | — |
| 7 | Camera position | ECU · 100mm · Table height, 20 cm, macro on the signature line |
| 8 | Camera movement | Static. He signs; the pen lifts; the shot holds on the wet ink. |
| 9 | Environment | Paper fibres, pen nib, one drop of ink where the nib rested. |
| 10 | Lighting | Warm pool, raking low; the paper texture is the subject. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 continues. |
| 13 | Continuity requirements | This is the last 'ordinary object' close-up before the observatory. Treat it as an heirloom shot. |

#### `S09-03` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S09-03` |
| 2 | Scene | 09 — PREPARATION |
| 3 | Duration | 20 s |
| 4 | Characters visible | MAA |
| 5 | Actions | She folds clothes with a precision that suggests she has done it a thousand times, counts them silently, and adds one extra sweater. |
| 6 | Facial expression | Absorbed. A mother's face doing arithmetic on the weather. |
| 7 | Camera position | MS · 40mm · Interior, height 1.15 m, low, at the bed, Maa seated on its edge |
| 8 | Camera movement | Static; gentle 8° arc as she leans to fold. |
| 9 | Environment | Bedroom, open backpack on the bed, clothes stacked in neat thirds, a small torch, a strip of tablets. |
| 10 | Lighting | Warm bedside lamp from the left; window dusk behind her — rim light on her hair. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 1 ends on the extra sweater. |
| 13 | Continuity requirements | The bag is P-03; the same bag Ishaan carries in S04-06 and S10. |

#### `S09-04` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S09-04` |
| 2 | Scene | 09 — PREPARATION |
| 3 | Duration | 20 s |
| 4 | Characters visible | AAROHI, ISHAAN (foreground, back to camera) |
| 5 | Actions | Aarohi stands with the black jacket held behind her back and her chin high. Ishaan extends a hand. She shakes her head. One beat of standoff. |
| 6 | Facial expression | Nose in the air; the beginning of a grin she is fighting. |
| 7 | Camera position | MS · 32mm · Interior, height 1.35 m, in the bedroom doorway, Aarohi facing camera |
| 8 | Camera movement | Static; she takes one step back when Ishaan reaches for her. |
| 9 | Environment | Bedroom doorway, corridor behind. |
| 10 | Lighting | Warm from the room, cool from the corridor — she's on the boundary line. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 begins at 22:38. |
| 13 | Continuity requirements | The jacket must remain visibly JKT-BLR-01 in her hands: crimson lining peeking out from her fingers. |

#### `S09-05` — MS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S09-05` |
| 2 | Scene | 09 — PREPARATION |
| 3 | Duration | 20 s |
| 4 | Characters visible | VIVAAN, ISHAAN (background, pretending not to look) |
| 5 | Actions | Vivaan, in the background, quietly pushes a small toy car into the bag's front pocket and steps away with his hands behind his back. |
| 6 | Facial expression | Guilty concentration; then a virtuously blank face. |
| 7 | Camera position | MS · 28mm · Interior, height 1.05 m, LOW at the bed, so the bag is at frame-centre |
| 8 | Camera movement | Static. We see the act as a shadow, not an action. |
| 9 | Environment | Bag front pocket, toy car: red, chipped paint (P-04). |
| 10 | Lighting | Warm lamp, with Vivaan half in shadow. |
| 11 | VFX | None. |
| 12 | Narration timing | Line 2 continues. |
| 13 | Continuity requirements | P-04 must be in frame on the observatory trip: it is visible again in S12-01 when the bag is opened. Prop continuity is the joke. |

#### `S09-06` — LS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S09-06` |
| 2 | Scene | 09 — PREPARATION |
| 3 | Duration | 20 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He zips the bag, sets it by the door, sits on the bed, and looks at his own bedroom for a moment. |
| 6 | Facial expression | Content, uncomplicated, entirely unaware. The last happy frame in the episode. |
| 7 | Camera position | LS · 24mm · Interior, height 1.60 m, from the corridor looking into the bedroom door |
| 8 | Camera movement | Static, held. He crosses to the bag and closes it. Last 12 frames are the window. |
| 9 | Environment | Bedroom at night, lamp on, window showing deep blue dusk, bag by the door. |
| 10 | Lighting | Warm interior + blue window; the split at 50/50 is exactly the point. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. Hold the final 3 s on the empty doorway after he lies back. |
| 13 | Continuity requirements | Final warm-to-cool hand-off in the episode: from here, the film's palette moves permanently toward blue. |


### SCENE 10 — THE ROAD

**`24:00 – 27:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT III — AARANYA RIDGE  
**Location:** L08 · SCHOOL BUS INTERIOR → L09 · MOUNTAIN ROADS  
**Time of day:** 06:00 → 10:30 · dawn to late morning, altitude rising  
**Grade:** Cold blue dawn in the city, warming to clean high-altitude daylight. Reduce haze as altitude increases — the air is literally getting clearer.

**Logline:** The journey out of the ordinary world, told entirely as landscape. The city drains out of the frame and the mountains take it over.

**Key frame:** `assets/storyboard/S10.png`


#### `S10-01` — EWS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-01` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 26 s |
| 4 | Characters visible | BACKGROUND STUDENTS, ISHAAN, KABIR |
| 5 | Actions | Bags into the hold, a queue that isn't a queue, Ishaan and Kabir near the door. |
| 6 | Facial expression | Excited, half-asleep. |
| 7 | Camera position | EWS · 24mm · Exterior, height 1.40 m from the school gate, bus front filling frame-right |
| 8 | Camera movement | Static. Students load; breath fog visible in the cold. |
| 9 | Environment | L04 school gate at dawn, the bus: cream-and-navy school coach, fleet number on the front, no readable text required. |
| 10 | Lighting | Blue hour, 8000K, streetlights still on and warm against it. |
| 11 | VFX | Breath vapour, engine exhaust thin in the cold. Both must be subtle. |
| 12 | Narration timing | Line 1 at 24:06. |
| 13 | Continuity requirements | BUS LOCK: cream body, navy stripe, school crest on the door, 3+2 seating. Same bus in S10-07 and S11-02 at long range. |

#### `S10-02` — MS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-02` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 24 s |
| 4 | Characters visible | KABIR, ISHAAN |
| 5 | Actions | Kabir puts a foot on the step, then leans out and mimes something ridiculous to Ishaan, who pushes him the rest of the way up. |
| 6 | Facial expression | Delight, mock outrage. |
| 7 | Camera position | MS · 35mm · Exterior, height 1.55 m, at the bus door, 3/4 |
| 8 | Camera movement | Static; Kabir climbs in and turns back to say something to Ishaan. |
| 9 | Environment | Bus doorway, driver's silhouette, a hand rail. |
| 10 | Lighting | Warm interior lamp from inside the coach vs cold blue dawn outside — the characters are lit by the doorway. |
| 11 | VFX | Breath vapour. |
| 12 | Narration timing | Line 1 continues. |
| 13 | Continuity requirements | Bus interior has warm tungsten strip lighting — this is important for S10-03's colour. |

#### `S10-03` — MS (2-shot) · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-03` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | Kabir claims the window, sees Ishaan's face, sighs theatrically, and swaps seats. Ishaan grins and takes the window. |
| 6 | Facial expression | Kabir's long-suffering generosity; Ishaan's unearned victory. |
| 7 | Camera position | MS (2-shot) · 28mm · Interior of the bus, height 1.35 m from the seat in front, looking back at their seats |
| 8 | Camera movement | Static with bus vibration — a 1-px vertical judder, no more. |
| 9 | Environment | L08 bus interior: rexine seats, overhead luggage rack, curtained windows, driver's mirror at the far end. |
| 10 | Lighting | Warm strip light + cold window light on Ishaan's face. Two-temperature again, but now it's on a moving vehicle. |
| 11 | VFX | Dust in the strip light; light flicker from passing trees on a 3-frame rhythm. |
| 12 | Narration timing | Line 1 ends at 24:30; the rest of the ride is nearly wordless. |
| 13 | Continuity requirements | PROPOSED (non-canon): the seat swap. Pure character comedy, no plot. |

#### `S10-04` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-04` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 26 s |
| 4 | Characters visible | MEERA |
| 5 | Actions | She sits alone at the back-left, cheek against the window frame, watching the landscape. She turns her head slightly forward — not quite to camera. |
| 6 | Facial expression | Calm, unreadable, faintly sad. The first time we see her unperformed. |
| 7 | Camera position | CU · 85mm · Interior, height 1.35 m, three rows back, framed past seat backs |
| 8 | Camera movement | Static; gentle sway synced to the bus. |
| 9 | Environment | Bus back rows, empty seat beside her, the window as a bright plane. |
| 10 | Lighting | Cold daylight on her face, warm strip light in the ceiling above — half warm, half cold on the same cheek. |
| 11 | VFX | None. |
| 12 | Narration timing | Silence. Do not narrate this shot. |
| 13 | Continuity requirements | She must be visually separated from the boys here — the geography of the bus is a diagram of the emotional plot. |

#### `S10-05` — LS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-05` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 26 s |
| 4 | Characters visible | — |
| 5 | Actions | City edge: flyovers, shuttered shops, a tea stall, then a widening road. |
| 6 | Facial expression | — |
| 7 | Camera position | LS · 24mm · Exterior, height 2.10 m, rigged to a vehicle tracking the bus through the city |
| 8 | Camera movement | Parallel tracking, 40 km/h matching; the bus in the right third. |
| 9 | Environment | L09 city outskirts at dawn: low buildings, wires, a broken footpath, one cow. |
| 10 | Lighting | Flat blue-grey morning, sodium streetlights dying out one by one. |
| 11 | VFX | Motion blur limited to the foreground only. |
| 12 | Narration timing | Silence. |
| 13 | Continuity requirements | The cow is a single-frame background gag — keep it, it's a real Indian road. |

#### `S10-06` — AERIAL ELS · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-06` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 28 s |
| 4 | Characters visible | — |
| 5 | Actions | The bus threads a switchback. Mist in the valley below. Pine forest on both sides. |
| 6 | Facial expression | — |
| 7 | Camera position | AERIAL ELS · 24mm · Drone, 120 m, tracking the bus from the front-left, mountains behind |
| 8 | Camera movement | Slow forward tracking with a 10° tilt up to reveal the ridge line. |
| 9 | Environment | L09 mountain road: two-lane tarmac, stone parapet, hairpin bends, a valley of cloud. |
| 10 | Lighting | High-altitude morning: hard sun, crisp shadows, cool blue in the shadowed valley. |
| 11 | VFX | Thin cloud wisps; atmospheric perspective layered in three depths. |
| 12 | Narration timing | Line 2 at 26:04 — the narration arrives exactly when the mountains do. |
| 13 | Continuity requirements | GEOGRAPHY: the observatory ridge is visible on the horizon from this shot onwards (a small white dome, frame-left). Planted here, paid off in S11-01. |

#### `S10-07` — ELS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S10-07` |
| 2 | Scene | 10 — THE ROAD |
| 3 | Duration | 24 s |
| 4 | Characters visible | — |
| 5 | Actions | The bus crawls along a switchback; the scale of the terrain reduces it to a beetle. |
| 6 | Facial expression | — |
| 7 | Camera position | ELS · 100mm (compressed) · Exterior, ground level on a far ridge, telephoto compression of the road and the bus |
| 8 | Camera movement | Static. The bus is a tiny object crossing the frame in 14 s. |
| 9 | Environment | Vast ridge landscape, terraced fields far below, snow line just visible at the top of frame. |
| 10 | Lighting | Sun on the ridge, shadow in the valley; the bus is a bright fleck. |
| 11 | VFX | Haze layer between camera and subject. |
| 12 | Narration timing | Line 2 ends on this shot, on the smallness of them. |
| 13 | Continuity requirements | Scale rule: this is the largest frame in the episode until S13-01. Save the epic for the Core. |


### SCENE 11 — AARANYA RIDGE

**`27:00 – 30:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT III — AARANYA RIDGE  
**Location:** L10 · AARANYA RIDGE OBSERVATORY (exterior) → L11 · OLD OBSERVATORY WING  
**Time of day:** 11:00 → 13:30 · hard mountain noon, wind  
**Grade:** Clean, high, cold daylight. Whites are bright but never clipped. The ONE blue is the light from the old wing — it must be the only unnatural colour in the scene.

**Logline:** A beautiful place with one wrong thing in it. The old wing is boarded up, and something blue is leaking through the gaps.

**Key frame:** `assets/storyboard/S11.png`


#### `S11-01` — ELS (aerial) · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-01` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 26 s |
| 4 | Characters visible | — |
| 5 | Actions | Cloud pours over the far ridge. The dome catches the sun. A small figure-scale bus is parked below. |
| 6 | Facial expression | — |
| 7 | Camera position | ELS (aerial) · 24mm · Drone, 200 m, approaching the ridge from the valley side, dome in the left third |
| 8 | Camera movement | Slow forward push over the ridge crest; the building reveals itself over the horizon line. |
| 9 | Environment | L10 observatory: white ribbed dome on a concrete-and-glass research block, single slit, solar panels on the roof, a gravel apron, wind-bent grass. |
| 10 | Lighting | Hard noon sun, short shadows, sky deep blue at the zenith fading pale at the horizon. |
| 11 | VFX | Cloud sea, wind-blown grass, one bird at the top of frame. |
| 12 | Narration timing | Line 1 at 27:06. |
| 13 | Continuity requirements | A-11 ARCHITECTURE: the dome in S08-03's slide must match this exactly. Modern block runs east–west; the OLD WING is a separate stone structure 60 m north-west, half-abandoned. Never swap sides. |

#### `S11-02` — LS · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-02` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 24 s |
| 4 | Characters visible | BACKGROUND STUDENTS, ISHAAN, KABIR, MEERA |
| 5 | Actions | Disembarking. Wind immediately messes everyone's hair and clothes. Two students chase a blown cap. |
| 6 | Facial expression | Awe, then immediate shivering and laughing. |
| 7 | Camera position | LS · 35mm · Exterior, height 1.60 m, at the gravel apron, bus in frame-left |
| 8 | Camera movement | Static; students spill out of the door. |
| 9 | Environment | Gravel apron, low stone parapet, the modern building behind. |
| 10 | Lighting | Hard sun, high contrast; everyone squints. Do not correct the squinting — it's the honesty of the location. |
| 11 | VFX | Dust kicked from the gravel, hair physics, one blown cap. Wind is a character in this scene. |
| 12 | Narration timing | Line 1 continues. |
| 13 | Continuity requirements | Meera gets off last. That is a character beat, not a camera accident. |

#### `S11-03` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-03` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 26 s |
| 4 | Characters visible | TEACHER, BACKGROUND STUDENTS, ISHAAN, KABIR |
| 5 | Actions | The teacher gathers them with two raised hands and gestures at the dome, then at the path. Students bunch up around her. |
| 6 | Facial expression | Disciplined enthusiasm. |
| 7 | Camera position | MS · 28mm · Exterior, height 1.50 m, wide-ish on the group with the teacher in the middle |
| 8 | Camera movement | Slow 15° pan following the teacher's pointing hand toward the dome. |
| 9 | Environment | Apron, path to the dome, wind-bent grass at the edges. |
| 10 | Lighting | Hard noon; the teacher's shadow falls toward camera — this fixes the sun's direction for the whole location (SUN-LOCK A-11). |
| 11 | VFX | Wind. |
| 12 | Narration timing | Silence. |
| 13 | Continuity requirements | TEACHER stays with the group for the rest of Scene 11. She must NOT notice the boys slip away in S12 — she is occupied with a student's question. |

#### `S11-04` — LS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-04` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 26 s |
| 4 | Characters visible | — |
| 5 | Actions | Nothing moves. Architectural reveal only — glass, concrete, the ribbed dome, a single antenna. |
| 6 | Facial expression | — |
| 7 | Camera position | LS · 24mm · Exterior, height 1.75 m, low angle from the path looking up at the research block |
| 8 | Camera movement | Slow 25° tilt up from the entrance to the dome. |
| 9 | Environment | Modern building: three storeys, curtain-wall glazing, deep concrete reveals, a service door with a keypad. |
| 10 | Lighting | Glass reflects the cloud sea; the concrete is bright and neutral. |
| 11 | VFX | Reflection detail only. |
| 12 | Narration timing | Silence. A breath of pure production design. |
| 13 | Continuity requirements | Do NOT put readable signage anywhere in this shot. The name exists in narration and in the episode title card. |

#### `S11-05` — MS · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-05` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He turns away from the group. His attention catches on something off-axis. He takes half a step, stops, and looks properly. |
| 6 | Facial expression | The 'wait, what' face — brow gathering, mouth opening slightly. |
| 7 | Camera position | MS · 40mm · Exterior, height 1.55 m, 3/4 behind Ishaan, the old wing across frame |
| 8 | Camera movement | Static until the last 6 s, then a slow 12° drift toward the old wing — the camera leaning toward the mystery before he does. |
| 9 | Environment | Old wing in the middle distance: stone walls, boarded windows, a rusted chain and padlock, a dead creeper, a collapsed gutter. |
| 10 | Lighting | The old wing is in shade — a full stop darker than everything else. Its shadow side faces camera. |
| 11 | VFX | Wind-blown dust at the base of the wall. |
| 12 | Narration timing | Line 2 at 29:02. |
| 13 | Continuity requirements | L11 must read as OLD — but not gothic. Practical, institutional, forgotten. No cobwebs-cliché. |

#### `S11-06` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-06` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 26 s |
| 4 | Characters visible | — |
| 5 | Actions | Through a 4 cm gap between planks: darkness, dust suspended, and a faint, pulsing blue glow from below floor level. |
| 6 | Facial expression | — |
| 7 | Camera position | CU · 100mm · Exterior, height 1.55 m, 2.5 m from the boarded window, telephoto through the gap in the planks |
| 8 | Camera movement | Very slow push-in, 0.1 m/s — an investigative move, not a horror move. |
| 9 | Environment | Boarded window: splintered timber, rusted nails, a stone sill with lichen. |
| 10 | Lighting | Daylight outside at 5 stops over the interior: the gap is almost white, the interior pure black, the blue glow the only other value. |
| 11 | VFX | VFX HERO SHOT 1: a slow 2.4 s pulse of blue from a source below frame; dust motes drifting in the gap; no lens flare, no god rays. |
| 12 | Narration timing | Line 2 continues. |
| 13 | Continuity requirements | The blue is #2F6DFF at 40% intensity, never neon, never a hard-edged beam. This is a leak, not a beacon. Locked as VFX-CORE-01. |

#### `S11-07` — CU · 26 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S11-07` |
| 2 | Scene | 11 — AARANYA RIDGE |
| 3 | Duration | 26 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He looks directly at the boarded window. Nothing about his face changes except his eyes narrowing and his breathing stopping for a beat. |
| 6 | Facial expression | Recognition without understanding. This is the moment the episode's spine locks in. |
| 7 | Camera position | CU · 85mm · Exterior, height 1.55 m, 3/4 on Ishaan's face, old wing behind him |
| 8 | Camera movement | Static; a 2-frame head-turn and then absolute stillness. |
| 9 | Environment | Old wing behind, out of focus, a dark shape in a bright frame. |
| 10 | Lighting | Sun on the left of his face; a barely perceptible blue bounce on his right cheek — the light is already touching him. |
| 11 | VFX | A single, tiny blue specular in his left iris. 4 frames. Almost subliminal. |
| 12 | Narration timing | Silence. End scene on the iris. Hard cut. |
| 13 | Continuity requirements | Continuity supervisor: the specular must be in the LEFT iris only, matching the light source's position relative to the old wing. |


### SCENE 12 — THE HIDDEN DOOR

**`30:00 – 33:00`** &nbsp;·&nbsp; 180 s &nbsp;·&nbsp; ACT III — AARANYA RIDGE  
**Location:** L11 · OLD OBSERVATORY WING → PASSAGE (L12 approach)  
**Time of day:** 13:45 · the sun has moved off the old wing entirely  
**Grade:** Progressive desaturation. By the end of the scene, the only saturated colour left in the frame is the blue. Skin tones stay warm — protect them or the characters will look dead.

**Logline:** Two boys step out of the day and into a corridor that was built for something the world has forgotten.

**Key frame:** `assets/storyboard/S12.png`


#### `S12-01` — MS · 28 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S12-01` |
| 2 | Scene | 12 — THE HIDDEN DOOR |
| 3 | Duration | 28 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | Ishaan tilts his head — Kabir looks, follows the look, and grins. They drift sideways away from the group, casual as thieves. Kabir opens the bag and shows the toy car; Ishaan takes it out and pockets it (P-04). |
| 6 | Facial expression | Conspiratorial joy. Kabir mouths something; Ishaan shushes him with one finger. |
| 7 | Camera position | MS · 35mm · Exterior, height 1.55 m, side-on to the old wing's north wall, the group far background frame-right |
| 8 | Camera movement | Slow lateral track right, following the two of them along the wall. |
| 9 | Environment | Old wing north wall, gravel, wind-bent grass, a rusted drainpipe. |
| 10 | Lighting | Sun now behind the building: the wall is in shade, the boys half-lit by bounce. |
| 11 | VFX | Wind, dust. |
| 12 | Narration timing | Line 1 at 30:04. |
| 13 | Continuity requirements | P-04 appears here — the red toy car. If it's absent, the audience will notice the missing payoff in Episode 2. Do not drop it. PROPOSED (non-canon): Ishaan pocketing the toy as a lucky charm. |

#### `S12-02` — CU · 30 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S12-02` |
| 2 | Scene | 12 — THE HIDDEN DOOR |
| 3 | Duration | 30 s |
| 4 | Characters visible | ISHAAN (hand) |
| 5 | Actions | A hand sweeps the dust off the stone. Underneath: a carved geometric sigil — three concentric arcs, a bisecting line, and a central circle, all cut shallow into the stone. |
| 6 | Facial expression | — |
| 7 | Camera position | CU · 100mm · Exterior, height 1.35 m, low, close on the stone at shoulder height |
| 8 | Camera movement | Static. Dust is wiped away by a hand entering from frame-right. |
| 9 | Environment | Weathered sandstone, mortar lines, lichen in the grooves, chisel marks visible at the edges. |
| 10 | Lighting | Flat shade, then a thin sliver of warm light catches the carving from the left and defines it. |
| 11 | VFX | Dust falling. No glow yet — the symbol is just a carving. Restraint is the whole point. |
| 12 | Narration timing | Line 2 at 30:44. |
| 13 | Continuity requirements | SIGIL LOCK: three arcs + one bisecting line + one circle. This exact geometry is the series' mark. It reappears on the floor of the Core chamber in S13-06. Never simplify or embellish it. |

#### `S12-03` — MS · 30 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S12-03` |
| 2 | Scene | 12 — THE HIDDEN DOOR |
| 3 | Duration | 30 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | Ishaan's fingers trace the outer arc. A hairline of blue light traces the groove he touched. Both boys go very still. Kabir's hand closes on Ishaan's shoulder. |
| 6 | Facial expression | Awe and fear in the same face, in that order, in three seconds. |
| 7 | Camera position | MS · 28mm · Exterior, height 1.50 m, 3/4 behind Ishaan, Kabir just behind his right shoulder |
| 8 | Camera movement | Static; the stone responds — a 6-frame mechanical shift, then stillness. |
| 9 | Environment | The wall, the sigil at chest height, the boarded window frame-left. |
| 10 | Lighting | The blue now lights their faces from below — the first time the film's key light comes from inside a wall. |
| 11 | VFX | VFX HERO SHOT 2: light travels the groove like liquid in a channel, 0.6 s, then settles to a steady 20% glow. Volumetric bloom kept to a 2-px radius. |
| 12 | Narration timing | Silence. No narration over the discovery. This is the audience's moment alone. |
| 13 | Continuity requirements | Blue intensity locked at 20% here, 40% at S12-04, 60% at S12-05, 100% at S13-06 — a deliberate four-step escalation across the act. |

#### `S12-04` — LS · 30 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S12-04` |
| 2 | Scene | 12 — THE HIDDEN DOOR |
| 3 | Duration | 30 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | A section of stonework recesses and grinds sideways, revealing a descending stairwell. Cold air moves their hair. Ishaan looks at Kabir. Kabir looks at the stairs. |
| 6 | Facial expression | Terror and invitation. Kabir's grin returns first. |
| 7 | Camera position | LS · 24mm · Exterior, height 1.60 m, wide enough to hold both boys and a 3 m section of wall |
| 8 | Camera movement | Static. The wall section sinks and slides back 40 cm, then stops — no whoosh, no dust cloud. |
| 9 | Environment | The opening: a meter-wide rectangle of black in a sunlit wall, stone steps going down, a smell we cannot see but must believe. |
| 10 | Lighting | Daylight outside vs absolute darkness inside; a faint blue wash rising from below the stair head. |
| 11 | VFX | Cold vapour rolling out over the threshold — ground fog, 4 cm deep. Stone dust settling. Corroborating weight in the stone's motion. |
| 12 | Narration timing | Line 2 ends at 31:08. |
| 13 | Continuity requirements | The opening is 1 m wide × 2 m high, in the north wall, 4 m from the boarded window. Architectural geometry must be consistent inside and out. |

#### `S12-05` — MS · 32 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S12-05` |
| 2 | Scene | 12 — THE HIDDEN DOOR |
| 3 | Duration | 32 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | They descend shoulder to shoulder, Kabir's hand flat on the stone wall as a guide. Ishaan counts steps under his breath. Their breathing becomes visible. |
| 6 | Facial expression | Faces barely lit; we read them by posture and one reflected highlight each. |
| 7 | Camera position | MS · 28mm · Interior of the stairwell, height 1.70 m, from above and behind, looking down at their backs |
| 8 | Camera movement | Slow descending follow, steadicam, matching their pace — 0.5 m/s, never faster. |
| 9 | Environment | Stone spiral-ish stair, 60 cm steps, hand-cut, a low corbel ceiling, walls wet with condensation. |
| 10 | Lighting | Blue from below at 60%, warm daylight dying behind them at the top of frame — the mouth of the opening slowly losing brightness shot by shot. |
| 11 | VFX | Condensation, breath vapour, light scattering through the blue haze. |
| 12 | Narration timing | Line 3 at 32:10. |
| 13 | Continuity requirements | Their shadows must fall UP the stairs behind them, toward the daylight. Physically correct, narratively perfect. |

#### `S12-06` — LS · 30 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S12-06` |
| 2 | Scene | 12 — THE HIDDEN DOOR |
| 3 | Duration | 30 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | A corridor. Ribbed stone columns, an arched ceiling, inlaid geometric lines running the length of the floor. Blue light bleeds from every groove. They stand at the threshold, absolutely silent. |
| 6 | Facial expression | Two small faces doing the largest possible version of 'what is this place'. |
| 7 | Camera position | LS · 24mm · Interior, height 1.65 m, from inside the corridor looking back at them arriving |
| 8 | Camera movement | Static. They step into frame from the stairwell at frame-left and stop. |
| 9 | Environment | L12 approach corridor: 3 m wide, 4 m high, 40 m long, no doors — everything leads to the chamber. |
| 10 | Lighting | Blue-only environment, but with correct falloff: bright at the grooves, dark between them, and a soft overall ambient so the walls stay readable. |
| 11 | VFX | Volumetric haze, slow particle drift, floor reflections that are 30% too coherent to be natural — the architecture is awake. |
| 12 | Narration timing | Line 3 continues; the last words land on the empty corridor ahead of them, not on their faces. |
| 13 | Continuity requirements | ANCIENT ARCHITECTURE LOCK A-12: no sci-fi greebles, no neon strips, no circuitry. This is stone that predates the building above it. The technology must look carved. |


### SCENE 13 — THE PULSE CORE

**`33:00 – 35:20`** &nbsp;·&nbsp; 140 s &nbsp;·&nbsp; ACT III — AARANYA RIDGE  
**Location:** L12 · PULSE CORE CHAMBER  
**Time of day:** No daylight. No time. Blue.  
**Grade:** Total palette collapse to blue + skin. Everything that is not a face becomes a blue value. Final 4 frames: pure white → hard cut to black → title.

**Logline:** A boy reaches for something older than the mountain, and the mountain answers. Episode 01 ends on the first contact.

**Key frame:** `assets/storyboard/S13.png`


#### `S13-01` — ELS · 18 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-01` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 18 s |
| 4 | Characters visible | — |
| 5 | Actions | The chamber: a domed void, 60 m across, ribbed stone pillars converging overhead, and at its centre — floating a metre above a circular dais — the CORE. |
| 6 | Facial expression | — |
| 7 | Camera position | ELS · 24mm · Interior, height 1.30 m at the chamber mouth, subject 60 m away |
| 8 | Camera movement | Static. Fade up from black over 2 s, already inside the reveal. No whoosh, no shake. |
| 9 | Environment | L12 chamber: concentric floor rings, a 40 m apical oculus (sealed), water on the floor reflecting everything, the sigil pattern inlaid in a 30 m radius. |
| 10 | Lighting | The Core is the only light. Blue at 100%, with physically plausible falloff — pillars near it are bright, the mouth of the chamber is almost black. |
| 11 | VFX | VFX HERO SHOT 3: volumetric shafts through the haze; reflection in standing water; slow orbital particles. The Core must read as ANCIENT, INTELLIGENT, MYSTERIOUS — not a crystal. |
| 12 | Narration timing | Silence for the first 4 s of the reveal. Let the room be the loudest thing in the film. |
| 13 | Continuity requirements | The dome's rib count and pillar positions are locked to a plan drawing (see Environment Bible, A-12). S13-06 must match this geometry exactly. |

#### `S13-02` — LS · 20 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-02` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 20 s |
| 4 | Characters visible | ISHAAN, KABIR |
| 5 | Actions | Kabir takes one step in, then stops and grabs Ishaan's sleeve. Ishaan keeps walking. Kabir lets go. |
| 6 | Facial expression | Kabir: fear, correctly. Ishaan: compulsion, incorrectly. |
| 7 | Camera position | LS · 28mm · Interior, height 1.55 m, wide on the two boys at the chamber mouth |
| 8 | Camera movement | Slight 8° push, then stop. They do not move for 12 s. |
| 9 | Environment | The mouth of the chamber, the vast space beyond. |
| 10 | Lighting | They are rim-lit from 60 m away — small blue silhouettes with warm skin edges. |
| 11 | VFX | Haze between camera and subject. |
| 12 | Narration timing | Line 1 at 34:06. |
| 13 | Continuity requirements | THE DECISION POINT: Kabir does NOT follow past the third ring. He stays at the mouth. But he must be visible in S13-06 — do not lose him. |

#### `S13-03` — MS · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-03` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 22 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He walks across the water-film floor. Ripples spread from each footfall. As he advances, geometric lines in the floor ignite one ring at a time, ahead of him, as if leading. |
| 6 | Facial expression | Not scared. That is the unsettling part. |
| 7 | Camera position | MS · 35mm · Interior, height 1.45 m, tracking sideways with him as he crosses the floor |
| 8 | Camera movement | Smooth lateral track, 0.7 m/s, perfect steadiness — the camera is being pulled too. |
| 9 | Environment | Floor rings, water film, inlaid sigil widening. |
| 10 | Lighting | Blue key from the Core, climbing his body as he approaches; his jacket's red lining goes black-and-blue. |
| 11 | VFX | Ripple simulation + ring ignition with a 0.4 s propagation, plus a reflection double in the water that is very slightly out of sync. |
| 12 | Narration timing | Silence. Only the wet footfalls that we never hear. |
| 13 | Continuity requirements | The ring he is standing on must be identical in count to S13-06. Count them: 9 concentric rings. |

#### `S13-04` — CU · 22 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-04` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 22 s |
| 4 | Characters visible | ISHAAN |
| 5 | Actions | He stops a metre away. He raises his right hand — his thumb brushes the small blue accent on his sleeve once, the first habit from S04-04 — and then he extends his fingers. |
| 6 | Facial expression | Wonder. Mouth open, eyes wide, no fear at all. The audience should want to shout at him. |
| 7 | Camera position | CU · 85mm · Interior, height 1.50 m, 3/4 front on Ishaan, the Core's light behind and above him |
| 8 | Camera movement | Very slow push, 0.1 m/s. |
| 9 | Environment | Core glow behind him, out of focus. |
| 10 | Lighting | Full blue key from above-front, warm fill retained in the skin so he doesn't look like a corpse. |
| 11 | VFX | Particles drawn toward his hand, 2 frames behind his motion. |
| 12 | Narration timing | Line 1 continues and lands at 34:22, on the raised hand. |
| 13 | Continuity requirements | RIGHT hand, always. Do not mirror the shot — the sleeve accent is only on the RIGHT arm; if you mirror, the continuity is destroyed. |

#### `S13-05` — ECU · 24 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-05` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 24 s |
| 4 | Characters visible | ISHAAN (fingertips) |
| 5 | Actions | Fingertips stop 2 cm from the surface. The air between skin and Core distorts. Contact. |
| 6 | Facial expression | — |
| 7 | Camera position | ECU · 100mm macro · Interior, level with his fingertips, 8 cm away |
| 8 | Camera movement | Static. The last 3 s are completely still before contact. |
| 9 | Environment | The Core's surface: not glass, not crystal — a suspended laminar fluid that holds an internal lattice of light. Ancient, layered, almost organic. |
| 10 | Lighting | At contact the key jumps 2 stops — but only on the fingers, never on the whole frame. |
| 11 | VFX | VFX HERO SHOT 4: a shockwave that is a SILENCE of light — the glow collapses inward for 6 frames, then blooms outward in the sigil's geometry. No sparks. No electricity. No lightning. |
| 12 | Narration timing | Silence. Absolute. This is the episode's loudest moment and it has no sound at all. |
| 13 | Continuity requirements | The Core's internal lattice must resolve into the S12-02 sigil when viewed at contact. Continuity supervisor: compare frames at 100%. |

#### `S13-06` — LS · 18 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-06` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 18 s |
| 4 | Characters visible | ISHAAN, KABIR (small, at the chamber mouth) |
| 5 | Actions | Blue energy travels out along every groove, ring, pillar and sigil in the chamber. The water brightens. Ishaan is a silhouette at the centre of a mandala of light. Kabir covers his eyes at the mouth. |
| 6 | Facial expression | Ishaan's face is only a profile edge — the rest is absorbed by the light. |
| 7 | Camera position | LS · 24mm · Interior, height 1.20 m — the SAME framing and height as S02-07, but from behind Ishaan |
| 8 | Camera movement | Static. The light floods from the centre outward in 2 s. |
| 9 | Environment | The whole chamber, now fully lit by its own patterns. |
| 10 | Lighting | Rim + silhouette. The light arrives in waves, not all at once — three pulses, rising. |
| 11 | VFX | Full-chamber propagation, reflection, volumetric bloom, particle storm held to a readable density. Controlled, architectural, magnificent. |
| 12 | Narration timing | Line 2 at 34:30 — 'I only knew one thing' — delivered over the flood, quietly. |
| 13 | Continuity requirements | MOTIF-01 PAYOFF: this is the mirror of S02-07 (watching his family from a doorway). Same height, same lens, same framing language — but inverted: he is now the thing being watched. |

#### `S13-07` — ECU → BLACK · 16 s

| # | Field | Value |
|---|---|---|
| 1 | Shot number | `S13-07` |
| 2 | Scene | 13 — THE PULSE CORE |
| 3 | Duration | 16 s |
| 4 | Characters visible | ISHAAN (eye) |
| 5 | Actions | One eye, flooded with blue. The amber flecks in the iris brighten — the only warm thing left. Then a single line of light crosses the pupil, like a scan. |
| 6 | Facial expression | Not pain. Not joy. Arrival. |
| 7 | Camera position | ECU → BLACK · 50mm · Interior, eye-line, filling the frame with one eye |
| 8 | Camera movement | Static. Iris dilation on a 6-frame curve. Cut to white for 4 frames, then hard cut to black. |
| 9 | Environment | Skin texture, eyelashes, one tear forming but not falling. |
| 10 | Lighting | Blue everywhere except the amber iris flecks, which must stay amber. |
| 11 | VFX | Iris detail, subtle chromatic shift at the edges only, one scan line. NO full-frame distortion. |
| 12 | Narration timing | Line 3 at 34:42–34:58, delivered almost tenderly. |
| 13 | Continuity requirements | The tear does not fall in Episode 01. Do not resolve it. It belongs to Episode 02. |
| + | Tail | 34:58–35:02 black. 35:02 TITLE CARD: PULSEBOUND — EPISODE 01. 35:08: TO BE CONTINUED. |

**Tail / end card:** 34:58–35:02 black. 35:02 TITLE CARD: PULSEBOUND — EPISODE 01. 35:08: TO BE CONTINUED.



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
