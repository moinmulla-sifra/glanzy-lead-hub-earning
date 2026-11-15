# PULSEBOUND — EPISODE 01
## *The Day Everything Changed* — Production Package

A complete **pre-production + pre-visualisation package** for a 35-minute Hindi-language
cinematic anime episode. Isolated from the Glanzy app — nothing here touches `src/`, `server/`
or the Vite build.

---

### Open the pre-vis player

```bash
cd pulsebound && python3 -m http.server 8099 --bind 0.0.0.0
# then open http://localhost:8099/
```

Or open `PULSEBOUND_EP01_PLAYER.html` directly in a browser.

The player gives you, per scene: the key frame, the Hindi narration with its timecodes,
a VO player, the locked cast plates for that scene, and every shot's full production spec.

---

### What's in the package

| File | What it is |
|---|---|
| `PULSEBOUND_EP01_PRODUCTION_BIBLE.md` | The master document — 18 sections: character bible, wardrobe & prop register, 12-location environment bible, cinematography grammar, colour script, VFX bible, audio bible, full narration script, all **89 shots × 13 production fields**, continuity ledger, prompt engineering appendix, QA gates, delivery spec |
| `PULSEBOUND_EP01_PLAYER.html` | Cinematic pre-vis player (self-contained, no build step) |
| `assets/characters/` | 8 locked character plates — the visual authority for every frame |
| `assets/storyboard/` | Key frames per scene |
| `assets/audio/` | `vo-01…vo-10.mp3` — Ishaan's Hindi narration, 34 lines in 10 record blocks |
| `data/scenes/*.json` | **Single source of truth** — timing, shots, narration |
| `scripts/build.py` | Rebuilds the bible, the player and `index.html` from the JSON |

### Numbers

`35:20` runtime · `13` scenes · `89` shots · avg shot length `23.8 s`
`34` narration lines (~2,900 Devanagari characters, ~3:00 of speech = **8.5 % of runtime**)

### Rebuilding

```bash
python3 pulsebound/scripts/build.py
```

Change a shot's `dur` in `data/scenes/scene-XX.json`, re-run, and the runtime, the bible and
the player all recalculate. Never hand-edit the generated files.

---

### The rules that matter most

1. **Character plates outrank the document.** If a frame disagrees with a plate, the frame is wrong.
2. **`JKT-BLR-01` belongs to Ishaan only** — black bomber, crimson lining, two cobalt-blue accents.
   Kabir never wears outerwear that could be confused with it.
3. **Audio is narration only.** No dialogue, no music, no sound effects. Silence is the soundtrack.
4. **Nothing is resolved.** Episode 01 ends on contact, not explanation.

---

*Production Draft 1.0 — all invented creative suggestions are labelled `PROPOSED` and are not canon
until approved. Character names, relationships, class levels, Meera's relationship status, the trip
destination and the Core discovery are protected canon.*
