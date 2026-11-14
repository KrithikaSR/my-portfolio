#!/usr/bin/env python3
"""Turn the intro video into a seamless looping hero clip (mp4 + webm), plus portrait + OG images.
Usage: python scripts/build-hero-assets.py intro.mp4 [--crop W:H:X:Y] [--photo portrait.png]
Needs ffmpeg, numpy, Pillow. Never retimes the clip, so lips stay in sync."""
import argparse, subprocess, tempfile, os, json, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont

XF = 0.5  # cross-fade seconds
ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("--crop"); ap.add_argument("--photo")
ap.add_argument("--out", default="public"); ap.add_argument("--name", default="Krithika SR")
a = ap.parse_args()
os.makedirs(f"{a.out}/hero", exist_ok=True)
run = lambda *c: subprocess.run(c, check=True, stderr=subprocess.DEVNULL)

probe = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "stream=width,height,r_frame_rate:format=duration", "-of", "json", a.video]))
W, H = probe["streams"][0]["width"], probe["streams"][0]["height"]
FPS = eval(probe["streams"][0]["r_frame_rate"])
T = min(float(probe["format"]["duration"]), 10.0)
L = T - XF

# 1. crop: given, or detect the person from dark pixels (hair/trousers) across sampled frames
if a.crop:
    cw, ch, cx, cy = map(int, a.crop.split(":"))
else:
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", a.video, "-t", str(T), "-vf", "fps=2,format=gray", "-f", "rawvideo", "-"])
    fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W)
    ys, xs = np.where((fr < 90).any(0))
    top, bot = ys.min(), ys.max()
    ch = min(H, int((bot - top) * 1.14)); ch -= ch % 2
    cw = int(ch * 0.8); cw -= cw % 2
    cy = max(0, min(H - ch, int(top - (ch - (bot - top)) * 0.35)))
    cx = max(0, min(W - cw, int(np.median(xs) - cw / 2)))
print(f"crop={cw}:{ch}:{cx}:{cy}")

tmp = tempfile.mkdtemp()
# 1b. flatten the studio backdrop to pure white: fit a smooth (cubic) surface to the background of the
#     median frame, then divide every frame by it, so the grey vignette disappears under mix-blend-mode: multiply.
import subprocess as sp
base = f"crop={cw}:{ch}:{cx}:{cy},scale=768:960"
RW, RH = 768, 960
raw = sp.check_output(["ffmpeg", "-v", "error", "-i", a.video, "-t", str(T), "-vf", base + ",fps=6", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"])
med = np.median(np.frombuffer(raw, np.uint8).reshape(-1, RH, RW, 3), axis=0)
yy, xx = np.mgrid[0:RH, 0:RW]; u = (xx / RW - .5).ravel(); v = (yy / RH - .5).ravel()
A = np.stack([u**i * v**j for i in range(4) for j in range(4 - i)], -1)
lum = med.mean(-1).ravel()
inl = (lum > 100) & (np.abs(u) > .34)  # start from the side margins, then refine by residual
plate = np.zeros_like(med)
for _ in range(4):
    idx = np.where(inl)[0][::5]
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A[idx], med[..., c].ravel()[idx], rcond=None)
        plate[..., c] = (A @ coef).reshape(RH, RW)
    inl = np.abs(lum - plate.mean(-1).ravel()) < 8
gain = (255 / np.maximum(plate * 0.97, 1)).astype(np.float32)
dec = sp.Popen(["ffmpeg", "-v", "error", "-i", a.video, "-t", str(T), "-vf", base, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=sp.PIPE)
enc = sp.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{RW}x{RH}", "-r", str(FPS), "-i", "-", "-c:v", "ffv1", f"{tmp}/clean.mkv"], stdin=sp.PIPE)
fs = RW * RH * 3
while len(b := dec.stdout.read(fs)) == fs:
    f = np.frombuffer(b, np.uint8).reshape(RH, RW, 3).astype(np.float32) * gain
    enc.stdin.write(np.clip(f, 0, 255).astype(np.uint8).tobytes())
enc.stdin.close(); enc.wait(); dec.wait()
vf = "colorlevels=rimax=0.99:gimax=0.99:bimax=0.99"  # final safety net
# 2. video loop: o(t) = xfade(tail[L..T] -> head[0..XF]) then c[XF..L]
fc = (f"[0:v]{vf},split=3[a][b][c];"
      f"[a]trim={L}:{T},setpts=PTS-STARTPTS[tail];[b]trim=0:{XF},setpts=PTS-STARTPTS[head];"
      f"[c]trim={XF}:{L},setpts=PTS-STARTPTS[rest];"
      f"[tail][head]xfade=transition=fade:duration={XF}:offset=0[x];[x][rest]concat=n=2:v=1:a=0[v]")
run("ffmpeg", "-y", "-i", f"{tmp}/clean.mkv", "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "ffv1", f"{tmp}/loop.mkv")

# 3. audio loop, sample-accurate in numpy (no acrossfade)
run("ffmpeg", "-y", "-i", a.video, "-t", str(T), "-vn", "-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le", f"{tmp}/a.wav")
with wave.open(f"{tmp}/a.wav") as w:
    sr = w.getframerate(); s = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32)
n, nl = int(XF * sr), int(L * sr)
t = np.linspace(0, np.pi / 2, n)  # equal-power fade
head, tail = s[:n], s[nl:nl + n]
out = np.concatenate([tail * np.cos(t) + head * np.sin(t), s[n:nl]])
with wave.open(f"{tmp}/loop.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(np.clip(out, -32768, 32767).astype(np.int16).tobytes())

# 4. export
common = ["-y", "-i", f"{tmp}/loop.mkv", "-i", f"{tmp}/loop.wav", "-shortest"]
run("ffmpeg", *common, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", f"{a.out}/hero/hero.mp4")
run("ffmpeg", *common, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-c:a", "libopus", "-b:a", "80k", f"{a.out}/hero/hero.webm")

# 5. portrait (photo if given, else clearest frame) + OG image
if a.photo:
    im = Image.open(a.photo).convert("RGB"); s_ = min(im.size)
    bw, bh = int(s_ * 0.77), int(s_ * 0.96)
    x0, y0 = int(im.width * 0.11), int(im.height * 0.04)
    bust = im.crop((x0, y0, x0 + bw, y0 + bh))
else:
    run("ffmpeg", "-y", "-ss", "1", "-i", f"{a.out}/hero/hero.mp4", "-frames:v", "1", f"{tmp}/f.png")
    f = Image.open(f"{tmp}/f.png"); bust = f.crop((0, 0, f.width, int(f.width * 1.25 * 0.55)))
bust.resize((480, 600), Image.LANCZOS).save(f"{a.out}/portrait-bust.webp", quality=84)
og = Image.new("RGB", (1200, 630), "#f4f2ee")
p = bust.resize((420, 525), Image.LANCZOS); og.paste(p, (720, 52))
d = ImageDraw.Draw(og)
bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
try: d.text((70, 240), a.name, font=ImageFont.truetype(bold, 72), fill="#0d0d0d"); d.text((70, 340), "Senior QA Engineer", font=ImageFont.truetype(bold, 36), fill="#77756f")
except OSError: d.text((70, 240), f"{a.name} - Senior QA Engineer", fill="#0d0d0d")
og.save(f"{a.out}/og.jpg", quality=88)
print("done:", os.listdir(f"{a.out}/hero"))
