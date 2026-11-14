#!/usr/bin/env python3
"""Layout regression test for the Work section.
Opens every project at many viewport sizes (incl. laptop 'scaled display' sizes) and fails if anything is clipped,
squeezed, mis-ordered or overflowing.   Usage:  npm run build && npx next start -p 3111 &  python3 scripts/check-work-layout.py [url]"""
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3111"
SIZES = [(360, 740), (390, 844), (768, 1024), (1024, 768), (1180, 820), (1279, 800), (1280, 720), (1366, 650), (1440, 900),
         (1536, 730), (1600, 900), (1920, 1080), (2560, 1300)]
JS = """() => {
  const a = document.querySelector('#work article[data-open=true]'); if (!a) return {err: 'no open panel'};
  const r = e => e && e.getBoundingClientRect(); const A = r(a), B = a.querySelector('.body');
  const t = a.querySelector('.body > div:first-child'), m = a.querySelector('.mockwrap'), h = a.querySelector('h3');
  const T = r(t), M = r(m), H = r(h);
  const inside = x => x.left >= A.left - 1 && x.right <= A.right + 1 && x.top >= A.top - 1 && x.bottom <= A.bottom + 1;
  return {A: [A.width, A.height], textW: T.width, mockW: M.width, mockH: M.height, titleLines: Math.round(H.height / parseFloat(getComputedStyle(h).lineHeight)),
    textInside: inside(T), mockInside: inside(M), bodyClipped: B.scrollHeight > B.clientHeight + 1 || a.scrollHeight > a.clientHeight + 1,
    mockRight: M.left >= T.right - 1, mockBelow: M.top >= T.bottom - 1, brokenImgs: [...a.querySelectorAll('img')].filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute('src')),
    pageOverflow: document.documentElement.scrollWidth > innerWidth,
    offenders: [...document.querySelectorAll('body *')].filter(e => !e.closest('#achievements,#top,#menu') && e.getBoundingClientRect().width && e.getBoundingClientRect().right > innerWidth + 1).slice(0, 3).map(e => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 40)),
    vw: innerWidth};
}"""
fails = 0
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h in SIZES:
        pg = b.new_page(viewport={"width": w, "height": h}); errs = []
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.goto(URL); pg.wait_for_timeout(500)
        pg.evaluate("window.scrollTo({top: document.querySelector('#work h2').getBoundingClientRect().top + scrollY - 90, behavior:'instant'})")
        pg.wait_for_timeout(1500)
        n = len(pg.query_selector_all("#work article")); wide = w >= 1280
        for i in range(n):
            el = pg.query_selector_all("#work article")[i]
            if el.get_attribute("data-open") != "true":
                el.scroll_into_view_if_needed(); el.hover() if wide else el.query_selector("button").click()
            pg.wait_for_timeout(1300)
            r = pg.evaluate(JS); bad = []
            broken = pg.evaluate("[...document.querySelectorAll('#work article[data-open=true] img')].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.alt)")
            if broken: bad.append(f"broken images: {broken}")
            if "err" in r: bad.append(r["err"])
            else:
                if r["bodyClipped"]: bad.append("content clipped")
                if not r["textInside"]: bad.append("text outside panel")
                if not r["mockInside"]: bad.append("illustration outside panel")
                if r["textW"] < (230 if wide else 250): bad.append(f"text column too narrow ({r['textW']:.0f}px)")
                if r["mockW"] < 240 or r["mockH"] < 150: bad.append(f"illustration too small ({r['mockW']:.0f}x{r['mockH']:.0f})")
                if wide and not r["mockRight"]: bad.append("illustration not at right")
                if not wide and not r["mockBelow"]: bad.append("illustration not below text")
                if r["titleLines"] > 5: bad.append(f"title wraps to {r['titleLines']} lines")
                if r["brokenImgs"]: bad.append("broken images: " + ", ".join(r["brokenImgs"]))
                if r["pageOverflow"]: bad.append("page overflows horizontally: " + ", ".join(r["offenders"]))
            if errs: bad.append(f"console errors: {errs[:1]}")
            if bad: fails += 1; print(f"FAIL {w}x{h} project {i+1}: {'; '.join(bad)}")
        print(f"ok   {w}x{h}" if not fails else f"     {w}x{h} done"); pg.close()
    # every Skills tile: the inspector must show a loadable logo or icon
    pg = b.new_page(viewport={"width": 1440, "height": 900}); pg.goto(URL); pg.wait_for_timeout(500)
    pg.evaluate("window.scrollTo({top: document.querySelector('#skills').offsetTop, behavior:'instant'})"); pg.wait_for_timeout(1800)
    for t in pg.query_selector_all("#skills .tile"):
        t.hover(); pg.wait_for_timeout(120)
        r = pg.evaluate("() => { const i = document.querySelector('#skills aside img'); return i ? (i.complete && i.naturalWidth > 0 ? 'ok' : i.getAttribute('src')) : 'svg-icon' }")
        if r not in ('ok', 'svg-icon'): fails += 1; print("FAIL skill logo not loading:", t.get_attribute('title') or t.inner_text().replace('\n', ' '), r)
    pg.close()
    b.close()
# Skills inspector: every tile's logo must load
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1440, "height": 900}); pg.goto(URL); pg.wait_for_timeout(800)
    pg.evaluate("window.scrollTo({top: document.querySelector('#skills').offsetTop, behavior:'instant'})"); pg.wait_for_timeout(1500)
    tiles = pg.query_selector_all("#skills button[aria-pressed]")
    for t in tiles:
        if not (t.get_attribute("class") or "").count("tile"): continue
        t.hover(); pg.wait_for_timeout(120)
        r = pg.evaluate("(() => { const i = document.querySelector('#skills aside img'); return i ? {alt: i.alt, ok: i.complete && i.naturalWidth > 0} : null })()")
        if r and not r["ok"]: fails += 1; print("FAIL skills inspector: broken logo:", r["alt"])
    print(f"ok   skills inspector ({len(tiles)} tiles)"); b.close()
print("\nALL LAYOUT CHECKS PASSED" if not fails else f"\n{fails} FAILURES"); sys.exit(1 if fails else 0)
