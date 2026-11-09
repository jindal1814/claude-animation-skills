# Getting started: making animated videos with Claude Code

This repo already has six animation skills. This guide shows how to make your first video with them. It also explains how
[mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (the "cartoon 3D short" skill
from the *How to Make Viral Animated Shorts Using Claude* video) fits in, and what to take from it.

## The idea in one paragraph

None of these skills uses an AI video generator. Claude **writes code** that draws every frame: three.js for 3D,
Canvas/GSAP for 2D. A headless browser renders the frames on your computer, and ffmpeg turns them into a vertical
1080x1920 mp4. A skill is just a `SKILL.md` that tells Claude the steps, the rules and the files to edit, plus the engine
code it edits. You bring a topic, and Claude does the script, voice, shots and render.

## 1. Install (10 minutes, once)

You need macOS or Linux with **ffmpeg**, **Node.js 18+**, **Python 3.9+** and Claude Code.

```bash
brew install ffmpeg node                     # macOS, if missing
git clone https://github.com/jindal1814/claude-animation-skills.git ~/claude-animation-skills
cd ~/claude-animation-skills && ./install.sh # links the skills into ~/.claude/skills, installs three.js, Playwright, GSAP, HyperFrames
./install.sh --voice                         # only for /stick-figure and /zach-d-films: free Kokoro voice + word timings (~1 GB)
```

Restart Claude Code. The skills then show up as `/graph`, `/minimalistic-graphics`, `/map-route`, `/breakdown`,
`/stick-figure` and `/zach-d-films`.

> Checked in a cloud sandbox on 2026-11-09: `/graph` rendered a 4 s video in 6.8 s. If `setup.sh` fails on the
> Playwright or GSAP download, your network is blocking `playwright.azureedge.net` or `cdnjs.cloudflare.com`. Use
> `npm i gsap@3.12.5` and copy `node_modules/gsap/dist/gsap.min.js` to `kit/vendor/`, or point Playwright at a Chrome
> you already have.

## 2. Your first five videos, easiest first

Make a folder for your reels (`mkdir ~/reels && cd ~/reels`), start `claude` there, and go down this list. Each one
teaches you a bit more of the workflow.

| # | Type this in Claude Code | What you learn | Time |
|---|---|---|---|
| 1 | `/graph 0 to 100K followers in 9 months: 1.2K, 2.1K, 3.4K, 5K, 9K, 24K, 51K, 78K, 100K` | spec → render → contact sheet | ~10 s |
| 2 | `/minimalistic-graphics every step feels small until you look back` | how Claude turns an idea into short on-screen text | ~10 s |
| 3 | `/map-route home to the gym, 2.8 km, 9 minutes` | 3D (three.js) rendering; check with `--snap` first | ~1.5 min |
| 4 | `/stick-figure why did pirates wear eye patches?` | a full explainer: script → voice → word timings → shots → stills → render | a working session |
| 5 | `/zach-d-films could ancient armour stop an arrow?` | 3D characters, props, slow motion, captions timed to the voice | a working session |

For 4 and 5, **look at the bundled example first** so you know what "done" looks like:

```bash
cp -r ~/claude-animation-skills/skills/stick-figure/engine/template ~/reels/pirate
bash ~/claude-animation-skills/skills/stick-figure/engine/make.sh ~/reels/pirate
```

Every quick skill writes `name.<skill>.mp4` plus `name.<skill>.sheet.jpg`, a contact sheet with Instagram's safe area
drawn in red. Read the sheet before you post.

## 3. The workflow for a story short (from the cartoon-3d-short skill)

The skill in mromidev's repo is a pipeline more than a template. Whichever engine you use, this order works:

1. **One true, visual story.** Something surprising with a physical cause and effect, plus an everyday analogy that
   explains it. Write the facts and their sources at the top of `SCRIPT.md`.
2. **Script with the beat formula** (about 3.7 words/s for 55-70 s, or 2.5 words/s for the slower `/zach-d-films`):
   - **Hook:** the paradox stated as fact, in sentence 1.
   - **Setting:** 1-2 lines.
   - **Escalation:** 3-6 beats, each bigger than the last.
   - **Snap:** the moment it breaks.
   - **Explanation:** a pivot ("You see,"), then the mechanism through an everyday analogy.
   - **Ironic payoff:** a short twist at the end.

   Never narrate what the viewer can already see. The example script `templates/SCRIPT_example.md`, *The Bridge That
   Fell for a Song*, is a good model.
3. **Approve the script, then let Claude run.** Once you say yes, Claude does the rest.
4. **Voice → word timings.** Everything is timed to `words.json`. Here that's `kit/words.py` (Parakeet, free and
   local). Make each visual reaction land 0-3 frames before its word.
5. **Shot plan in code:** cut on big jumps, use 18-40 frame eased glides otherwise, and make every hold creep forward.
   A static hold of 12+ frames reads as a freeze.
6. **Stills before the render.** Render 3-6 frames, look at them, fix them, then do the full render.
7. **QA the final file:** look for black, white, frozen or popping frames, check loudness (-14 LUFS), and check the
   safe area.

Its `references/STYLE_BIBLE.md` and `references/reports/*.md` measure the look in numbers: ink width, colour,
depth of field, camera speed, character proportions. Telling Claude "match these numbers" works far better than
"make it look nicer".

## 4. Should you also install cartoon-3d-short?

It makes the richest look (2D bean-head characters in an ink-outlined, painted 3D town). It is also the hardest to run.
Know these before you try it:

| | This repo's skills | cartoon-3d-short |
|---|---|---|
| Renderer | Playwright / HyperFrames, nothing to set up | **Remotion** + `@remotion/three`; you create the Remotion project yourself |
| Ready to run | yes, each engine includes a finished example | no: no `package.json`, `Root.tsx` or `index.ts` included |
| 3D assets | made in code | loads 26 **Kenney CC0 `.glb` models** from `public/bridge/kenney/`, which aren't included. Download the Kenney Nature Kit and similar kits yourself. Missing models are skipped silently. |
| OS | macOS / Linux | written on Windows: `scripts/bridge-stills.mjs` hard-codes `C:/Program Files/Google/Chrome/...`, so change it on Mac |
| Disk | small | every Remotion bundle copies `public/` (~1.3 GB) into temp; set `REMOTION_TMP` to a big drive |
| Render | minutes | ~10 min at 2K for a 67 s short |

If you want it, install it as its own skill next to these:

```bash
git clone https://github.com/mromidev/claude-animated-shorts ~/.claude/skills/cartoon-3d-short
npx create-video@latest ~/bridge-remotion      # blank Remotion project
cd ~/bridge-remotion && npm i three @remotion/three @react-three/fiber @react-three/drei
```

Then, in Claude Code inside `~/bridge-remotion`: *"Use the cartoon short skill. Copy templates/bridge into
src/videos/bridge, register the BridgeShort composition, fix the Chrome path for my OS, and render stills 100 and 400."*
Get the bridge example rendering **before** you ask for a new story.

**My recommendation:** start with `/zach-d-films` or `/stick-figure` from this repo. They are the same kind of video
(a cartoon "what if" story short with a voice), they already run on Mac and Linux, and they come with finished
examples. Borrow the **script formula, the timing rules and the QA loop** from cartoon-3d-short now (section 3). Move
to its Remotion pipeline only when you want that particular painted-town look.

## 5. House rules worth keeping

- The story, characters and voice are always your own. Use reference videos for the look only, and never repost them.
- Check every fact. Jokes should be true facts too.
- Use one steady narrator voice (your own recording beats TTS). Mix: voice on top, music ducked under it, SFX lower still.
- Keep faces and key props out of the caption band and inside the safe area (x 100-980, y 220-1500 of 1080x1920).
- Save after every step, and keep each reel in its own folder so you can re-render later.

## Troubleshooting

- **The skill doesn't appear:** re-run `./install.sh` and restart Claude Code. Check `ls -l ~/.claude/skills`.
- **3D renders are black or very slow:** no usable GPU. Set `GL=swiftshader` for `/zach-d-films` (slower but works).
- **`sub_timeline_readiness_timeout` warning:** normal for the 3D quick skills.
- **The voice and the shots drift apart:** delete `audio/words_ref.json` after changing the script, so the next take
  becomes the timing reference (see `skills/stick-figure/SKILL.md`).
