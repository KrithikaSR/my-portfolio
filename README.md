# Krithika SR — Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind 4. No GSAP, no three.js, no external scripts. Fonts are self-hosted.

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Content
All text lives in `src/lib/data.ts` and comes from `public/resume.pdf`. Components only read from it.

## Sections
| # | Section | Component | Motion |
|---|---|---|---|
| – | Hero | hero/Hero.tsx | looping voice video, sound toggle, pauses when <35% visible |
| 01 | About | sections/About.tsx | swaying, flippable ID card |
| 02 | Skills | sections/Skills.tsx | periodic-table grid, diagonal wave reveal, inspector |
| 03 | Work | sections/Work.tsx | expanding accordion |
| 04 | Certifications | sections/Certifications.tsx | ink-flood rows |
| 05 | Experience | sections/Experience.tsx | scroll-drawn timeline (education + roles) |
| 06 | Achievements | sections/Achievements.tsx | pinned horizontal gallery, count-up |
| 07 | Contact | sections/Contact.tsx | hopping letters, copy chip |

## Rebuild the hero video
Needs `ffmpeg`, `numpy`, `Pillow`.
```
python3 scripts/build-hero-assets.py intro.mp4 --photo Krithika_Portrait.png
# optional manual crop: --crop 576:720:345:0   (W:H:X:Y)
```
Crops around the person, whitens the backdrop, cross-fades the last 0.5 s into the first 0.5 s (video via ffmpeg `xfade`, audio sample-accurately in numpy), and writes `public/hero/hero.mp4`, `hero.webm`, `portrait-bust.webp` and `og.jpg`.

## Notes
- Smooth scrolling uses Lenis (off for `prefers-reduced-motion`; in-page links route through it).
- The ID card is a damped pendulum driven by pointer velocity, with a faint idle sway.
- Work panels show an "Illustrative UI" sketch, labelled as such; they are not screenshots.
- The résumé's "Portfolio" link points to a placeholder (`example.com`), so the site does not use it.

## Logo credits & licences
Brand logos in `public/logos` are the property of their owners and used only to identify the technologies listed in the résumé.
Sources: [devicon](https://devicon.dev) (MIT, `LICENSE-devicon.txt`) and [simple-icons](https://simpleicons.org) (CC0, `LICENSE-simple-icons.md`).
GitHub Copilot's icon (`githubcopilot.png`) was supplied by the site owner. OpenAI GPT, Power BI, SpecFlow, ReqnRoll, REST Assured, SoapUI and Sybase have no logo in those sets, so they use line icons. Skills without a brand (leadership, BDD, etc.) also use line icons.

## Troubleshooting: "I still see the old layout"
Check DevTools → Elements: `<section id="work" data-layout="work-v3">` means you are running the current build.
If it is missing: stop the server, delete the `.next` folder, run `npm install` then `npm run dev`, and hard-refresh (Ctrl/Cmd + Shift + R).

## Layout regression test
`npm run build && npx next start -p 3111` in one terminal, then `python3 scripts/check-work-layout.py` (needs `pip install playwright && playwright install chromium`).
It opens every project at 13 screen sizes and fails on clipped content, squeezed text, misplaced illustrations, page overflow or broken logos.
