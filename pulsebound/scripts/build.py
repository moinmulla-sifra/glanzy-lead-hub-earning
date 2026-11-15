#!/usr/bin/env python3
"""
PULSEBOUND — EPISODE 01 build script.

Single source of truth  : pulsebound/data/scenes/scene-*.json
Generated artifacts     : PULSEBOUND_EP01_PRODUCTION_BIBLE.md
                          PULSEBOUND_EP01_PLAYER.html  (self-contained pre-vis player)

Run:  python3 pulsebound/scripts/build.py
"""

import json
import glob
import os
import html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")


def load_scenes():
    scenes = []
    for path in sorted(glob.glob(os.path.join(DATA, "scenes", "scene-*.json"))):
        with open(path, encoding="utf-8") as fh:
            scenes.append(json.load(fh))
    scenes.sort(key=lambda s: s["n"])
    return scenes


def tc(seconds):
    return f"{seconds // 60:02d}:{seconds % 60:02d}"


# ----------------------------------------------------------------------------
# MARKDOWN BIBLE
# ----------------------------------------------------------------------------

def md_characters(scenes):
    return ""


def build_markdown(scenes):
    parts = []
    with open(os.path.join(DATA, "bible_head.md"), encoding="utf-8") as fh:
        parts.append(fh.read())

    # ---- 9. Narration script -------------------------------------------------
    total = sum(s["dur"] for s in scenes)
    lines = [(s["n"], ln) for s in scenes for ln in s["narration"]]
    blocks = {}
    for s in scenes:
        blocks.setdefault(s["voiceBlock"], {"scenes": [], "lines": []})
        blocks[s["voiceBlock"]]["scenes"].append(s["n"])
        blocks[s["voiceBlock"]]["lines"].extend(s["narration"])

    parts.append("\n---\n\n## 10 · NARRATION SCRIPT (ISHAAN — HINDI VO)\n")
    parts.append(
        "> **Policy.** Narration is the *only* audible element in the episode. No character dialogue, "
        "no music, no sound effects. 34 lines across 13 scenes / 10 record blocks. "
        "Speech density is deliberately low: roughly 2,900 characters of Hindi over 35 minutes "
        "(≈ 8 % of runtime). The silence is a creative decision, not a gap.\n"
    )
    parts.append("| Block | Scenes | Lines |\n|---|---|---|")
    for b in sorted(blocks):
        sc = "–".join(str(x) for x in sorted(set(blocks[b]["scenes"]))) if len(set(blocks[b]["scenes"])) > 1 else str(blocks[b]["scenes"][0])
        parts.append(f"| VO-{b:02d} | S{sc} | {len(blocks[b]['lines'])} |")

    for s in scenes:
        parts.append(f"\n### Scene {s['n']:02d} · {s['title']} — {s['start']}–{s['end']}")
        for ln in s["narration"]:
            parts.append(f"\n**`{ln['t']}`** &nbsp; {ln['hi']}\n\n> *{ln['en']}*")
    parts.append("")

    # ---- 11. Shot list -------------------------------------------------------
    parts.append("\n---\n\n## 11 · SCENE-BY-SCENE SHOT LIST\n")
    parts.append(
        f"Total runtime **{tc(total)}** · **{sum(len(s['shots']) for s in scenes)} shots** · "
        f"{len(scenes)} scenes. Every shot carries the 13 production fields required by the brief.\n"
    )
    for s in scenes:
        parts.append(f"\n### SCENE {s['n']:02d} — {s['title']}\n")
        parts.append(f"**`{s['start']} – {s['end']}`** &nbsp;·&nbsp; {s['dur']} s &nbsp;·&nbsp; {s['act']}  ")
        parts.append(f"**Location:** {s['location']}  ")
        parts.append(f"**Time of day:** {s['tod']}  ")
        parts.append(f"**Grade:** {s['grade']}\n")
        parts.append(f"**Logline:** {s['logline']}\n")
        parts.append(f"**Key frame:** `{s['key']}`\n")
        for sh in s["shots"]:
            parts.append(f"\n#### `{sh['id']}` — {sh['size']} · {sh['dur']} s\n")
            parts.append("| # | Field | Value |\n|---|---|---|")
            parts.append(f"| 1 | Shot number | `{sh['id']}` |")
            parts.append(f"| 2 | Scene | {s['n']:02d} — {s['title']} |")
            parts.append(f"| 3 | Duration | {sh['dur']} s |")
            parts.append(f"| 4 | Characters visible | {', '.join(sh['cast'])} |")
            parts.append(f"| 5 | Actions | {sh['action']} |")
            parts.append(f"| 6 | Facial expression | {sh['expr']} |")
            parts.append(f"| 7 | Camera position | {sh['size']} · {sh['lens']} · {sh['cam']} |")
            parts.append(f"| 8 | Camera movement | {sh['move']} |")
            parts.append(f"| 9 | Environment | {sh['env']} |")
            parts.append(f"| 10 | Lighting | {sh['light']} |")
            parts.append(f"| 11 | VFX | {sh['vfx']} |")
            parts.append(f"| 12 | Narration timing | {sh['vo']} |")
            parts.append(f"| 13 | Continuity requirements | {sh['cont']} |")
            extra = [k for k in sh if k not in
                     ("id", "dur", "size", "lens", "cam", "move", "cast", "action",
                      "expr", "env", "light", "vfx", "vo", "cont")]
            for k in extra:
                parts.append(f"| + | {k.title()} | {sh[k]} |")
            if sh.get("tail"):
                parts.append(f"\n**Tail / end card:** {sh['tail']}\n")
        parts.append("")

    with open(os.path.join(DATA, "bible_tail.md"), encoding="utf-8") as fh:
        parts.append(fh.read())

    out = os.path.join(ROOT, "PULSEBOUND_EP01_PRODUCTION_BIBLE.md")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write("\n".join(parts))
    return out


# ----------------------------------------------------------------------------
# PRE-VIS PLAYER (single self-contained HTML)
# ----------------------------------------------------------------------------

TPL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>PULSEBOUND · EP 01 — Pre-vis Player</title>
<style>
:root{
  --bg:#05070b; --bg2:#0a0e15; --panel:rgba(255,255,255,.045);
  --line:rgba(255,255,255,.10); --txt:#eaf0f8; --dim:#8fa0b6;
  --blue:#3f78ff; --blue2:#7ea6ff; --warm:#ffc98a; --red:#ff4d5e;
  --dv:'Noto Sans Devanagari','Nirmala UI','Mangal',system-ui,sans-serif;
  --ui:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{background:
   radial-gradient(1100px 600px at 78% -10%, rgba(63,120,255,.16), transparent 60%),
   radial-gradient(900px 500px at 8% 110%, rgba(255,201,138,.07), transparent 60%),
   var(--bg);
  color:var(--txt);font-family:var(--ui);-webkit-font-smoothing:antialiased}
a{color:var(--blue2)}
::-webkit-scrollbar{width:9px;height:9px}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.13);border-radius:9px}
::-webkit-scrollbar-track{background:transparent}

.wrap{display:grid;grid-template-columns:308px 1fr;height:100vh;overflow:hidden}
/* ---------- rail ---------- */
.rail{border-right:1px solid var(--line);display:flex;flex-direction:column;background:linear-gradient(180deg,rgba(255,255,255,.03),transparent 40%);overflow:hidden}
.brand{padding:22px 22px 14px}
.brand h1{margin:0;font-size:19px;letter-spacing:.30em;font-weight:800;
  background:linear-gradient(92deg,#fff,#9fc0ff 60%,#3f78ff);-webkit-background-clip:text;background-clip:text;color:transparent}
.brand .sub{margin-top:7px;font-size:11px;letter-spacing:.16em;color:var(--dim);text-transform:uppercase}
.watch{display:block;margin:0 22px 14px;padding:10px 12px;border-radius:10px;text-align:center;
  text-decoration:none;font-size:11.5px;letter-spacing:.10em;text-transform:uppercase;font-weight:700;
  color:#dce8ff;border:1px solid rgba(63,120,255,.45);
  background:linear-gradient(180deg,rgba(63,120,255,.22),rgba(63,120,255,.06));transition:.16s}
.watch:hover{border-color:#7ea6ff;box-shadow:0 0 22px rgba(63,120,255,.30)}
.meta{display:flex;gap:8px;flex-wrap:wrap;padding:0 22px 16px}
.chip{font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--dim);
  border:1px solid var(--line);padding:4px 8px;border-radius:999px;background:rgba(255,255,255,.02)}
.rail-scroll{overflow-y:auto;flex:1;padding:0 12px 28px}
.rail-h{font-size:10px;letter-spacing:.18em;color:var(--dim);text-transform:uppercase;padding:10px 10px 8px}
.sc{display:flex;gap:11px;align-items:center;width:100%;text-align:left;cursor:pointer;
  background:transparent;border:1px solid transparent;border-radius:11px;padding:9px 10px;color:var(--txt);
  font-family:inherit;font-size:13.5px;transition:.16s;margin-bottom:2px}
.sc:hover{background:rgba(255,255,255,.05)}
.sc .num{font-variant-numeric:tabular-nums;font-size:10.5px;color:var(--dim);width:20px;flex:none}
.sc .t{flex:1;line-height:1.25}
.sc .t small{display:block;color:var(--dim);font-size:10.5px;letter-spacing:.05em;margin-top:2px}
.sc.on{background:linear-gradient(90deg,rgba(63,120,255,.20),rgba(63,120,255,.04));border-color:rgba(63,120,255,.42)}
.sc.on .num,.sc.on .t small{color:#a9c2ff}
.pulsebar{height:3px;background:rgba(255,255,255,.07);margin:0 22px 16px;border-radius:3px;overflow:hidden}
.pulsebar i{display:block;height:100%;background:linear-gradient(90deg,var(--blue),#a9c2ff);width:0}

/* ---------- stage ---------- */
.stage{overflow-y:auto;position:relative}
.hero{position:relative;aspect-ratio:16/9;max-height:52vh;overflow:hidden;background:#04060a}
.hero img{width:100%;height:100%;object-fit:cover;display:block;opacity:.96}
.hero .veil{position:absolute;inset:0;background:
  linear-gradient(180deg,rgba(5,7,11,.10) 0%,rgba(5,7,11,.20) 45%,rgba(5,7,11,.92) 100%)}
.hero .fallback{position:absolute;inset:0;display:grid;place-items:center;color:#33405a;
  font-size:12px;letter-spacing:.2em;text-transform:uppercase;background:
  repeating-linear-gradient(45deg,#070a10,#070a10 12px,#090d14 12px,#090d14 24px)}
.hero .top{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;
  align-items:center;padding:16px 22px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#c3d2e8}
.hero .bot{position:absolute;bottom:0;left:0;right:0;padding:18px 26px 22px}
.hero .act{font-size:10.5px;letter-spacing:.24em;color:var(--blue2);text-transform:uppercase}
.hero h2{margin:6px 0 0;font-size:clamp(22px,3.1vw,38px);letter-spacing:.02em;font-weight:800;line-height:1.05}
.hero .log{margin-top:8px;color:#b8c6da;font-size:13.5px;max-width:74ch;line-height:1.5}

.body{padding:22px 26px 90px;display:grid;gap:20px;max-width:1200px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px}
.card h3{margin:0 0 12px;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);font-weight:700}
.kv{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.kv div{font-size:13px;line-height:1.45}
.kv b{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-bottom:4px;font-weight:700}

.vo{display:flex;gap:16px;align-items:flex-start}
.playbtn{flex:none;width:52px;height:52px;border-radius:50%;border:1px solid rgba(63,120,255,.5);
  background:radial-gradient(circle at 30% 25%,rgba(126,166,255,.35),rgba(63,120,255,.12));
  color:#dce8ff;cursor:pointer;display:grid;place-items:center;transition:.18s;font-size:15px}
.playbtn:hover{transform:scale(1.06);border-color:#7ea6ff;box-shadow:0 0 24px rgba(63,120,255,.35)}
.playbtn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
.vo-lines{flex:1;display:grid;gap:12px}
.line{display:grid;gap:3px}
.line .hi{font-family:var(--dv);font-size:17px;line-height:1.75;letter-spacing:.005em}
.line .en{color:var(--dim);font-size:12.5px;font-style:italic;line-height:1.5}
.line .t{font-size:10.5px;letter-spacing:.12em;color:var(--blue2);font-variant-numeric:tabular-nums}
.note{font-size:11.5px;color:#6f819a;margin-top:10px;letter-spacing:.03em}
audio{width:100%;margin-top:14px;filter:saturate(.8)}

.shots{display:grid;gap:8px}
details.shot{border:1px solid var(--line);border-radius:11px;background:rgba(255,255,255,.022);overflow:hidden}
details.shot[open]{background:rgba(63,120,255,.055);border-color:rgba(63,120,255,.30)}
summary.shot{display:flex;gap:12px;align-items:center;padding:11px 14px;cursor:pointer;list-style:none;font-size:13px}
summary.shot::-webkit-details-marker{display:none}
summary.shot .id{font-variant-numeric:tabular-nums;color:var(--blue2);font-size:11.5px;letter-spacing:.08em;width:58px;flex:none}
summary.shot .sz{color:#c9d6e8;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
summary.shot .du{color:var(--dim);font-size:11.5px;font-variant-numeric:tabular-nums;flex:none}
.sp{padding:2px 14px 16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.sp div{font-size:12.5px;line-height:1.5;color:#c2cfe0}
.sp b{display:block;font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim);margin-bottom:3px}
.sp .full{grid-column:1/-1}

.cast{display:flex;gap:12px;overflow-x:auto;padding-bottom:4px}
.cast figure{margin:0;flex:none;width:98px}
.cast img{width:98px;height:132px;object-fit:cover;object-position:top center;border-radius:9px;
  border:1px solid var(--line);display:block;background:#0a0d13}
.cast figcaption{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);margin-top:6px;text-align:center}
.cast .miss{width:98px;height:132px;border-radius:9px;border:1px dashed var(--line);display:grid;place-items:center;
  color:#3b4658;font-size:9.5px;letter-spacing:.1em}
.foot{position:fixed;left:308px;right:0;bottom:0;display:flex;justify-content:space-between;align-items:center;
  padding:11px 26px;background:linear-gradient(180deg,transparent,rgba(5,7,11,.94) 40%);backdrop-filter:blur(7px);
  font-size:11.5px;color:var(--dim)}
.nav{display:flex;gap:8px;align-items:center}
.nav button{font-family:inherit;font-size:12px;color:var(--txt);background:rgba(255,255,255,.06);
  border:1px solid var(--line);border-radius:9px;padding:7px 13px;cursor:pointer;transition:.15s}
.nav button:hover{background:rgba(63,120,255,.20);border-color:rgba(63,120,255,.5)}
@media (max-width:900px){
  .wrap{grid-template-columns:1fr}
  .rail{display:none}
  .foot{left:0}
}
</style>
</head>
<body>
<div class="wrap">
  <aside class="rail">
    <div class="brand">
      <h1>PULSEBOUND</h1>
      <div class="sub">Episode 01 · The Day Everything Changed</div>
    </div>
    <a class="watch" href="animatic/PULSEBOUND_EP01_ANIMATIC.mp4" target="_blank" rel="noopener">▶ Watch the 35-minute animatic</a>
    <div class="meta" id="meta"></div>
    <div class="pulsebar"><i id="prog"></i></div>
    <div class="rail-scroll"><div class="rail-h">Scene reel</div><div id="reel"></div></div>
  </aside>

  <main class="stage" id="stage">
    <div class="hero">
      <div class="fallback" id="fallback">Key frame pending</div>
      <img id="keyimg" alt="" onerror="this.style.display='none'"/>
      <div class="veil"></div>
      <div class="top">
        <span id="tc">00:00</span>
        <span id="scn">SCENE 01</span>
      </div>
      <div class="bot">
        <div class="act" id="act"></div>
        <h2 id="title"></h2>
        <div class="log" id="log"></div>
      </div>
    </div>

    <div class="body">
      <section class="card">
        <h3>Production parameters</h3>
        <div class="kv" id="params"></div>
      </section>

      <section class="card">
        <h3>Narration · Ishaan (Hindi VO)</h3>
        <div class="vo">
          <button class="playbtn" id="play" disabled>▶</button>
          <div class="vo-lines" id="volines"></div>
        </div>
        <div class="note" id="vonote"></div>
        <audio id="audio" preload="metadata"></audio>
      </section>

      <section class="card">
        <h3>Cast in this scene — locked plates</h3>
        <div class="cast" id="cast"></div>
        <div class="note">Character plates are the visual authority for every generated frame. Never redesign, recolour or re-outfit a character between shots.</div>
      </section>

      <section class="card">
        <h3>Shot list — <span id="shotcount"></span></h3>
        <div class="shots" id="shots"></div>
      </section>
    </div>

    <div class="foot">
      <span id="footmeta"></span>
      <div class="nav">
        <button id="prev">← Prev</button>
        <button id="next">Next →</button>
      </div>
    </div>
  </main>
</div>

<script id="payload" type="application/json">__DATA__</script>
<script>
const EP = JSON.parse(document.getElementById('payload').textContent);
const $ = id => document.getElementById(id);
let cur = 0;

function tc(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(Math.round(s%60)).padStart(2,'0')}

$('meta').innerHTML = [
  EP.runtime, EP.shots+' shots', EP.scenes+' scenes', '16:9'
].map(x=>`<span class="chip">${x}</span>`).join('');

/* rail */
$('reel').innerHTML = EP.data.map((s,i)=>`
  <button class="sc" data-i="${i}">
    <span class="num">${String(s.n).padStart(2,'0')}</span>
    <span class="t">${s.title}<small>${s.start} · ${s.dur}s</small></span>
  </button>`).join('');

$('reel').querySelectorAll('.sc').forEach(b=>b.onclick=()=>go(+b.dataset.i));

function go(i){
  cur = (i + EP.data.length) % EP.data.length;
  const s = EP.data[cur];
  location.hash = 's' + s.n;

  $('reel').querySelectorAll('.sc').forEach((b,k)=>b.classList.toggle('on',k===cur));

  const img = $('keyimg');
  img.style.display='block';
  img.parentElement.querySelector('.fallback').style.display='none';
  img.onerror = ()=>{ img.style.display='none'; img.parentElement.querySelector('.fallback').style.display='grid'; };
  img.src = s.key;

  $('tc').textContent = s.start + ' – ' + s.end;
  $('scn').textContent = 'SCENE ' + String(s.n).padStart(2,'0');
  $('act').textContent = s.act;
  $('title').textContent = s.title;
  $('log').textContent = s.logline;

  $('params').innerHTML = [
    ['Runtime', s.dur + ' s'],
    ['Location', s.location],
    ['Time of day', s.tod],
    ['Colour grade', s.grade],
    ['Voice block', 'VO-' + String(s.voiceBlock).padStart(2,'0')],
    ['Key frame', s.key]
  ].map(([k,v])=>`<div><b>${k}</b>${v}</div>`).join('');

  /* narration */
  const vo = s.narration;
  $('volines').innerHTML = vo.length
    ? vo.map(l=>`<div class="line"><span class="t">${l.t}</span>
        <span class="hi">${l.hi}</span><span class="en">${l.en}</span></div>`).join('')
    : `<div class="line"><span class="en">No narration in this scene — the silence is intentional.</span></div>`;

  const a = $('audio');
  a.pause();
  const src = 'assets/audio/vo-' + String(s.voiceBlock).padStart(2,'0') + '.mp3';
  a.src = src;
  const btn = $('play');
  btn.disabled = false; btn.textContent = '▶';
  a.onerror = ()=>{ btn.disabled = true; $('vonote').textContent = 'Block audio not found yet — ' + src; };
  $('vonote').textContent = 'Audio block VO-' + String(s.voiceBlock).padStart(2,'0') +
    ' covers scenes ' + EP.blockScenes[s.voiceBlock].map(n=>String(n).padStart(2,'0')).join(' + ') +
    '. Recorded as a single take per block; trim per line using the timecodes above.';

  /* cast */
  const names = [];
  s.shots.forEach(sh => sh.cast.forEach(c => {
    const n = c.replace(/\s*\(.*\)$/, '').trim();
    if (n && n !== '—' && !/^BACKGROUND/i.test(n) && !names.includes(n)) names.push(n);
  }));
  $('cast').innerHTML = names.map(n => {
    const f = EP.cast[n];
    return f
      ? `<figure><img src="${f}" alt="${n}" onerror="this.style.display='none'"/><figcaption>${n}</figcaption></figure>`
      : `<div class="miss">PLATE<br/>PENDING</div>`;
  }).join('') || `<div class="note">No named cast in this scene — environment and props carry it.</div>`;

  /* shots */
  $('shotcount').textContent = s.shots.length + ' shots · ' + s.dur + ' s';
  $('shots').innerHTML = s.shots.map(sh=>`
    <details class="shot">
      <summary class="shot">
        <span class="id">${sh.id}</span>
        <span class="sz">${sh.size} · ${sh.lens}</span>
        <span class="du">${sh.dur}s</span>
      </summary>
      <div class="sp">
        <div class="full"><b>Cast</b>${sh.cast.join(', ')}</div>
        <div class="full"><b>Action</b>${sh.action}</div>
        <div class="full"><b>Expression</b>${sh.expr}</div>
        <div><b>Camera position</b>${sh.cam}</div>
        <div><b>Camera movement</b>${sh.move}</div>
        <div class="full"><b>Environment</b>${sh.env}</div>
        <div><b>Lighting</b>${sh.light}</div>
        <div><b>VFX</b>${sh.vfx}</div>
        <div class="full"><b>Narration timing</b>${sh.vo}</div>
        <div class="full"><b>Continuity</b>${sh.cont}</div>
      </div>
    </details>`).join('');

  $('footmeta').textContent = 'Scene ' + (cur+1) + ' of ' + EP.data.length +
    ' · episode position ' + s.start + ' / ' + EP.runtime;
  const pct = (parseInt(s.start.split(':')[0])*60 + parseInt(s.start.split(':')[1])) /
              (parseInt(EP.runtime.split(':')[0])*60 + parseInt(EP.runtime.split(':')[1])) * 100;
  $('prog').style.width = Math.max(2, pct) + '%';
  $('stage').scrollTop = 0;
}

$('play').onclick = ()=>{
  const a = $('audio');
  if (a.paused){ a.play().then(()=>$('play').textContent='❚❚').catch(()=>{}); }
  else { a.pause(); $('play').textContent='▶'; }
};
$('audio').onended = ()=>$('play').textContent='▶';
$('prev').onclick = ()=>go(cur-1);
$('next').onclick = ()=>go(cur+1);
document.addEventListener('keydown', e=>{
  if(e.key==='ArrowRight') go(cur+1);
  if(e.key==='ArrowLeft') go(cur-1);
});

const hash = (location.hash||'').match(/^#s(\\d+)$/);
const startIdx = hash ? Math.max(0, EP.data.findIndex(s=>s.n===+hash[1])) : 0;
go(startIdx);
</script>
</body>
</html>
"""


def build_player(scenes):
    total = sum(s["dur"] for s in scenes)
    block_scenes = {}
    for s in scenes:
        block_scenes.setdefault(str(s["voiceBlock"]), [])
        block_scenes[str(s["voiceBlock"])].append(s["n"])
    cast_map = {
        "ISHAAN": "assets/characters/CH-01-ishaan.png",
        "MEERA": "assets/characters/CH-02-meera.png",
        "KABIR": "assets/characters/CH-03-kabir.png",
        "AAROHI": "assets/characters/CH-04-aarohi.png",
        "VIVAAN": "assets/characters/CH-05-vivaan.png",
        "MAA": "assets/characters/CH-06-maa.png",
        "PITA": "assets/characters/CH-07-pita.png",
        "TEACHER": "assets/characters/CH-08-teacher.png",
    }
    payload = {
        "cast": cast_map,
        "runtime": tc(total),
        "shots": sum(len(s["shots"]) for s in scenes),
        "scenes": len(scenes),
        "blockScenes": block_scenes,
        "data": scenes,
    }
    js = json.dumps(payload, ensure_ascii=False).replace("</", "<\\/")
    out = os.path.join(ROOT, "PULSEBOUND_EP01_PLAYER.html")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(TPL.replace("__DATA__", js))

    # index.html so that any static server lands directly on the player
    idx = os.path.join(ROOT, "index.html")
    with open(idx, "w", encoding="utf-8") as fh:
        fh.write(
            '<!doctype html><html lang="en"><head><meta charset="utf-8"/>'
            "<title>PULSEBOUND · EP 01</title>"
            '<meta http-equiv="refresh" content="0;url=PULSEBOUND_EP01_PLAYER.html"/>'
            "<style>html,body{height:100%;margin:0;background:#05070b;color:#eaf0f8;"
            "font-family:system-ui,sans-serif;display:grid;place-items:center}"
            "a{color:#7ea6ff;letter-spacing:.2em;text-transform:uppercase;font-size:12px}</style>"
            "</head><body><a href='PULSEBOUND_EP01_PLAYER.html'>Opening PULSEBOUND · EP 01 pre-vis player…</a></body></html>"
        )
    return out


if __name__ == "__main__":
    scenes = load_scenes()
    print("built:", build_markdown(scenes))
    print("built:", build_player(scenes))
    print("runtime:", tc(sum(s["dur"] for s in scenes)),
          "| shots:", sum(len(s["shots"]) for s in scenes),
          "| scenes:", len(scenes))
