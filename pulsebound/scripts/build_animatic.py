#!/usr/bin/env python3
"""
PULSEBOUND — EPISODE 01 animatic renderer.

Turns the production package into a watchable pre-vis animatic:
  · one key frame per scene, held for the scene's exact duration, with a slow Ken Burns move
  · scene label burn-in for the first seconds of each scene
  · the 10 recorded Hindi narration blocks placed at their absolute timecodes
  · soft subtitles (.srt) muxed in and written alongside
  · a 22 s end card

This is an ANIMATIC: still key frames + narration. It is not the finished episode.

Requires ffmpeg (installed from PyPI as imageio-ffmpeg).
Run:  python3 pulsebound/scripts/build_animatic.py
"""

import glob
import json
import os
import re
import subprocess
import sys
import tempfile

import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "animatic")
FPS = 24
W, H = 1280, 720
TOTAL = 2120
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_R = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def run(args, **kw):
    return subprocess.run(args, capture_output=True, text=True, **kw)


def load_scenes():
    scenes = [json.load(open(p, encoding="utf-8"))
              for p in sorted(glob.glob(os.path.join(ROOT, "data", "scenes", "scene-*.json")))]
    return sorted(scenes, key=lambda s: s["n"])


def secs(t):
    m, s = t.split(":")
    return int(m) * 60 + int(s)


def audio_duration(path):
    p = run([FF, "-i", path, "-f", "null", "-"])
    found = re.findall(r"time=(\d+):(\d+):(\d+\.\d+)", p.stderr)
    if not found:
        return 0.0
    h, m, s = found[-1]
    return int(h) * 3600 + int(m) * 60 + float(s)


def silence_mids(path):
    p = run([FF, "-i", path, "-af", "silencedetect=noise=-38dB:d=0.30", "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", p.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", p.stderr)]
    mids = []
    for s in starts:
        if s < 0:
            continue
        after = [e for e in ends if e > s]
        if after:
            mids.append((s + after[0]) / 2)
    return sorted(mids)


def pretty_title(t):
    """Title-case that does not break apostrophes: 'MEERA\'S ENTRY' -> \"Meera's Entry\""""
    out = []
    for word in t.split():
        low = word.lower()
        out.append(low[0].upper() + low[1:] if low else low)
    return " ".join(out)


def esc(text):
    return (text.replace("\\", "").replace("'", "").replace(":", " -")
                .replace(",", " ").replace("%", "pct"))


# --------------------------------------------------------------------------- #
# video segments
# --------------------------------------------------------------------------- #

def build_segments(scenes):
    """Returns [(kind, image_or_None, dur, label)]"""
    segs = []
    for s in scenes:
        dur = s["dur"] - 22 if s["n"] == len(scenes) else s["dur"]
        label = f'S{int(s["n"]):02d}  -  {pretty_title(s["title"])}'
        segs.append(("key", s.get("key"), dur, label, s["n"] % 2 == 0))
    segs.append(("card", None, 22, None, False))
    return segs


def key_path(rel):
    if not rel:
        return None
    p = os.path.join(ROOT, rel)
    if os.path.exists(p):
        return p
    # tolerate filename drift (e.g. S01 vs s01)
    alt = os.path.join(ROOT, "assets", "storyboard", os.path.basename(rel).upper())
    return alt if os.path.exists(alt) else None


def encode_segment(kind, img, dur, label, zoom_out, out_path):
    frames = dur * FPS
    label_txt = esc(label or "")
    fade = "if(lt(t,0.6),t/0.6,if(lt(t,4.2),1,max(0,(5.4-t)/1.2)))"

    if kind == "card":
        src = ["-f", "lavfi", "-i", f"color=c=0x04060a:s={W}x{H}:d={dur}:r={FPS}"]
        vf = (
            f"drawtext=fontfile={FONT}:text='PULSEBOUND':fontsize=64:fontcolor=0xF2F6FF:"
            f"x=(w-text_w)/2:y=(h/2)-96:alpha='if(lt(t,1.2),t/1.2,1)',"
            f"drawtext=fontfile={FONT_R}:text='EPISODE 01':fontsize=22:fontcolor=0x7EA6FF:"
            f"x=(w-text_w)/2:y=(h/2)+2:alpha='if(lt(t,2.0),0,min(1,(t-2.0)/1.0))',"
            f"drawtext=fontfile={FONT_R}:text='TO BE CONTINUED':fontsize=16:fontcolor=0x5C6B82:"
            f"x=(w-text_w)/2:y=(h/2)+76:alpha='if(lt(t,3.0),0,min(1,(t-3.0)/1.0))',"
            f"format=yuv420p"
        )
        cmd = [FF, "-y", *src, "-vf", vf, "-frames:v", str(frames),
               "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-crf", "32",
               "-pix_fmt", "yuv420p", "-r", str(FPS), "-g", "48", out_path]
    else:
        if img:
            src = ["-loop", "1", "-framerate", str(FPS), "-t", str(dur), "-i", img]
        else:
            src = ["-f", "lavfi", "-i",
                   f"color=c=0x060a12:s={W}x{H}:d={dur}:r={FPS}"]
        z = (f"1.08-0.08*on/{frames}" if zoom_out else f"1+0.08*on/{frames}")
        ken = (f"scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,"
               f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
               f"d=1:s={W}x{H}:fps={FPS}")
        if img:
            vf = (f"{ken},drawtext=fontfile={FONT}:text='{label_txt}':fontsize=20:"
                  f"fontcolor=0xD8E4F5@0.85:x=44:y=h-58:alpha='{fade}',"
                  f"drawtext=fontfile={FONT_R}:text='PRE-VIS ANIMATIC':fontsize=13:"
                  f"fontcolor=0x9FB2C9@0.55:x=w-text_w-44:y=h-54:alpha='{fade}',format=yuv420p")
        else:
            vf = (f"{ken},drawtext=fontfile={FONT}:text='{label_txt}':fontsize=24:"
                  f"fontcolor=0x7EA6FF:x=(w-text_w)/2:y=(h/2)-70:alpha='{fade}',"
                  f"drawtext=fontfile={FONT_R}:text='KEY FRAME PENDING':fontsize=15:"
                  f"fontcolor=0x4E5C72:x=(w-text_w)/2:y=(h/2)-30:alpha='{fade}',format=yuv420p")
        cmd = [FF, "-y", *src, "-vf", vf, "-frames:v", str(frames),
               "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-crf", "34",
               "-pix_fmt", "yuv420p", "-r", str(FPS), "-g", "48", out_path]

    p = run(cmd)
    if p.returncode != 0:
        sys.exit(f"segment failed: {label}\n{p.stderr[-1800:]}")


# --------------------------------------------------------------------------- #
# audio
# --------------------------------------------------------------------------- #

def audio_pieces(scenes, tmp):
    """[(path, start_seconds)] — splits multi-scene blocks at the nearest silence."""
    blocks = {}
    for s in scenes:
        b = blocks.setdefault(s["voiceBlock"], {"scenes": [], "lines": {}})
        b["scenes"].append(s["n"])
        b["lines"][s["n"]] = [
            l for l in s["narration"]
        ]
    pieces = []
    for num, b in sorted(blocks.items()):
        src = os.path.join(ROOT, "assets", "audio", f"vo-{int(num):02d}.mp3")
        if not os.path.exists(src):
            continue
        ns = b["scenes"]
        first = secs(b["lines"][ns[0]][0]["t"].split("–")[0])
        if len(ns) == 1:
            pieces.append((src, first))
            continue

        # split the block between consecutive scenes, at the nearest detected silence
        total_chars = sum(len(l["hi"]) for n in ns for l in b["lines"][n])
        for i in range(len(ns) - 1):
            done_chars = sum(len(l["hi"]) for n in ns[: i + 1] for l in b["lines"][n])
            ratio = done_chars / total_chars
            dur = audio_duration(src)
            target = dur * ratio
            mids = silence_mids(src)
            cut = min(mids, key=lambda x: abs(x - target)) if mids else target
            head = os.path.join(tmp, f"vo{int(num):02d}_{i}a.mp3")
            tail = os.path.join(tmp, f"vo{int(num):02d}_{i}b.mp3")
            run([FF, "-y", "-i", src, "-t", f"{cut:.3f}", "-c", "copy", head])
            run([FF, "-y", "-ss", f"{cut:.3f}", "-i", src, "-c", "copy", tail])
            pieces.append((head, secs(b["lines"][ns[i]][0]["t"].split("–")[0])))
            src = tail
        pieces.append((src, secs(b["lines"][ns[-1]][0]["t"].split("–")[0])))
    return pieces


def build_audio(pieces, out_path, tmp):
    inputs, chains = [], []
    for i, (path, _) in enumerate(pieces):
        inputs += ["-i", path]
    for i, (_, start) in enumerate(pieces):
        ms = int(round(start * 1000))
        chains.append(f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,"
                      f"adelay={ms}:all=1[a{i}]")
    mix = "".join(f"[a{i}]" for i in range(len(pieces)))
    graph = ";".join(chains) + f";{mix}amix=inputs={len(pieces)}:normalize=0[mixout]"
    cmd = [FF, "-y", *inputs, "-filter_complex", graph, "-map", "[mixout]",
           "-t", str(TOTAL), "-c:a", "aac", "-b:a", "80k", "-ar", "48000", out_path]
    p = run(cmd)
    if p.returncode != 0:
        sys.exit(f"audio mix failed\n{p.stderr[-1800:]}")


# --------------------------------------------------------------------------- #
def write_srt(scenes, path):
    def stamp(t):
        h, r = divmod(int(t), 3600)
        m, s = divmod(r, 60)
        return f"{h:02d}:{m:02d}:{s:02d},000"

    cues = []
    for s in scenes:
        for l in s["narration"]:
            a, b = l["t"].split("–")
            cues.append((secs(a), secs(b), l["hi"]))
    with open(path, "w", encoding="utf-8") as fh:
        for i, (a, b, txt) in enumerate(cues, 1):
            fh.write(f"{i}\n{stamp(a)} --> {stamp(b)}\n{txt}\n\n")
    return len(cues)


def main():
    os.makedirs(OUT, exist_ok=True)
    scenes = load_scenes()
    tmp = tempfile.mkdtemp(prefix="pulsebound_")

    segs = build_segments(scenes)
    files = []
    for i, (kind, rel, dur, label, zo) in enumerate(segs):
        img = key_path(rel) if kind == "key" else None
        ts = os.path.join(tmp, f"seg{i:02d}.ts")
        print(f"[video] {i+1}/{len(segs)} {label or 'end card':38s} {dur:>4}s "
              f"{'key' if img else ('card' if kind=='card' else 'PLACEHOLDER')}", flush=True)
        encode_segment(kind, img, dur, label, zo, ts)
        files.append(ts)

    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as fh:
        for f in files:
            fh.write(f"file '{f}'\n")
    video = os.path.join(tmp, "video.ts")
    p = run([FF, "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy",
             "-bsf:a", "aac_adtstoasc", video])
    if p.returncode != 0:
        sys.exit(f"concat failed\n{p.stderr[-1500:]}")

    print("[audio] splitting + placing narration…", flush=True)
    pieces = audio_pieces(scenes, tmp)
    mix = os.path.join(tmp, "vo.m4a")
    build_audio(pieces, mix, tmp)

    srt = os.path.join(OUT, "PULSEBOUND_EP01.srt")
    n = write_srt(scenes, srt)
    print(f"[subs] {n} cues → {os.path.relpath(srt, ROOT)}", flush=True)

    final = os.path.join(OUT, "PULSEBOUND_EP01_ANIMATIC.mp4")
    p = run([FF, "-y", "-i", video, "-i", mix, "-i", srt,
             "-map", "0:v", "-map", "1:a", "-map", "2:s",
             "-c:v", "copy", "-c:a", "copy", "-c:s", "mov_text",
             "-metadata:s:s:0", "language=hin", "-metadata", "title=PULSEBOUND EP01 animatic",
             "-t", str(TOTAL), "-movflags", "+faststart", final])
    if p.returncode != 0:
        sys.exit(f"mux failed\n{p.stderr[-1500:]}")

    size = os.path.getsize(final) / 1e6
    print(f"\ndone → {os.path.relpath(final, ROOT)}  ({size:.1f} MB, {TOTAL//60}:{TOTAL%60:02d})")


if __name__ == "__main__":
    main()
