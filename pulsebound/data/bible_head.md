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

