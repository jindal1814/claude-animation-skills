# SCRIPT.md — Zero to Empire #1: One Red Paperclip

> **For you:** put this file in a new folder for this short, such as `~/paperclip-short/`, open Claude Code and say: "Use the cartoon short skill and make a short from this file." Everything from here down is written for Claude.

## Instructions for Claude

You are making one vertical animated story short with the **cartoon-3d-short** skill (`~/.claude/skills/cartoon-3d-short/SKILL.md`). Follow that skill's pipeline, with these specifics:

1. **This file is the project's SCRIPT.md.** If it has another name, copy it to `SCRIPT.md` in this short's folder (`~/paperclip-short/`). The skill's "Topic and facts" and "Script" steps are already done: the sourced facts and the final voiceover are below. Start at the Voice step.
2. **Use the voiceover word for word.** Don't add, cut, reword or reorder lines, and don't add advice, predictions, profit figures or claims that aren't in the facts list. Every line is checked against the sources. If timing forces a change, ask me first.
3. **Voice:** generate `voice.wav` with a text-to-speech voice. Never record, clone or imitate my voice. Use one steady narrator at 3.6–4.0 words a second with almost no pauses, starting within the first few frames. Then make `words.json` with word timings and time every shot to it.
4. **Shot plan:** copy the bridge template as the skill describes, into `src/videos/paperclip/`, and register the composition as `PaperclipShort`. Build `story.ts` from the shot table below: illustrate every sentence literally, use the light named in the table (Day or Golden), put a white flash after the hook, and crossfade where the place or time changes. If a shot is hard to build in the skill's world, swap in a simpler one that shows the same line.
5. **On screen:** keep products, vehicles, signs and documents generic: no real logos, labels or packaging designs. Show real people only as generic cartoon characters, never as likenesses. Any date or number shown on screen must match the facts list.
6. **Format:** vertical 1080×1920, 30 fps, 50–60 seconds. No logo, intro, outro or call to action; the video ends on the last word.
7. **Captions:** burn in captions for the whole voiceover. Use the voiceover text exactly as written below, not the speech-to-text output, timed to `words.json`. Show 1–3 words at a time in white bold sans-serif with a thin black outline, swapping on each word, centred about two-thirds of the way down the frame. Keep them clear of the bottom quarter and the right edge, where Instagram's caption and buttons sit. Show numbers and the names of people, places and brands in yellow.
8. **Title card:** for the first 2 seconds, show the title card from "On-screen text" in the upper third, then fade it out as the second line starts.
9. **Keep me out of it:** don't use my name, face, photo or voice anywhere in the project.
10. **Check with me:** show me the stills before the full render.
11. Ignore the "For posting" section at the end. It's for Instagram, not for the video.

## About this short

In 2005–06 a Canadian blogger traded one red paperclip up to a house in 14 trades, because each item found someone who wanted it more. This script is 208 words, about 56 seconds.

## Facts and sources

- Kyle MacDonald, a Canadian blogger, traded from one red paperclip to a house in 14 online trades over a year. The children's game Bigger, Better inspired him. ([Wikipedia: One red paperclip](https://en.wikipedia.org/wiki/One_red_paperclip))
- He started in July 2005 while living in Montreal. The final trade came on 12 July 2006. ([Town of Kipling](https://www.townofkipling.ca/p/red-paperclip-story))
- The trades, in order: a fish-shaped pen; a hand-sculpted doorknob; a camp stove; a generator; an "instant party" (an empty keg, an IOU for beer and a neon beer sign); a snowmobile from Quebec comedian Michel Barrette; a trip to Yahk, British Columbia; a box truck; a recording contract; a year's rent in Phoenix; an afternoon with Alice Cooper; a motorized KISS snow globe; a role in the film *Donna on Demand*; and a two-storey house. ([Wikipedia](https://en.wikipedia.org/wiki/One_red_paperclip))
- Actor Corbin Bernsen, an avid snow-globe collector, wanted the snow globe and offered a paid film role for it. ([ABC News, July 2006](https://abcnews.com/WNT/story?id=2171378))
- Kipling's economic development officer proposed an offer, and the town traded the house at 503 Main Street for the role. Bernsen later picked a local resident from auditions held in Kipling. ([Town of Kipling](https://www.townofkipling.ca/p/red-paperclip-story))
- Kipling unveiled what was then the world's largest red paperclip on 12 July 2007. ([Town of Kipling](https://www.townofkipling.ca/p/red-paperclip-story))
- The town says the trade put Kipling in international news, Guinness certified its paperclip as the world's largest, and tourists often stop for photos at the house and the paperclip. ([Town of Kipling](https://www.townofkipling.ca/p/red-paperclip-story))

**Everyday comparison** (for the "You see," beat): your friend's "useless" collection is someone else's treasure.

## Voiceover (final: use word for word)

```text
A man trades one red paperclip... and a year later, he owns a house.
The trade that makes it happen? A snow globe.
Kyle MacDonald's only rule: always trade up. Trade one: a pen shaped like a fish.
Then a doorknob. Then a camp stove. Then a generator.
Then an "instant party": an empty keg and an IOU for beer.
Then a snowmobile. Then a trip to a town called Yahk. Yes, Yahk.
A box truck. A recording contract. A year's rent in Phoenix. An afternoon with Alice Cooper.
Which he swaps for... a motorized KISS snow globe.
Wait. How is a snow globe a step up?
You see, value isn't in the thing. It's in who wants it. That's why your friend's "useless" collection is someone else's treasure.
Actor Corbin Bernsen collects snow globes. For that one, he offers a role in his next movie.
Then a town in Saskatchewan, Kipling, offers a two-storey house for that role.
Fourteen trades. One house.
A local resident gets the part. And the town builds a giant red paperclip, then the world's biggest.
Honestly? Kipling won this trade, not Kyle. For one house, it got global headlines and tourists stopping for photos.
All from the cheapest thing on your desk.
```

Length: 208 words, about 56 seconds at 3.7 words a second.

## Beat formula

1. **Hook:** the strange fact stated plainly, in 10–16 words, with no setup.
2. **Stakes:** one short line that raises the stakes or teases the payoff. There is no separate scene-setting line: names, dates and places ride along inside the action. (Our first video lost about 4 in 10 viewers on a scene-setting line in seconds 3–10.)
3. **Escalation:** 3–4 beats, each bigger than the last, often with a short line of dialogue.
4. **Mystery:** one "Wait…?" question.
5. **"You see,":** the real reason, explained through the everyday comparison.
6. **Snap:** the moment it all breaks.
7. **Callback:** the last line echoes the hook, and the video ends on that word.

This script also carries a **share moment**: one line, built into the story, that makes viewers think of a specific friend. It also has a **debate moment**: one fair question or hot take, built on the facts, that gives viewers something to argue about. Illustrate each as its own shot (see the shot table); never turn either into an on-screen request to share or comment.

## Shot ideas for story.ts

| Beat | What we see | Light |
| --- | --- | --- |
| Hook | A red paperclip on a desk; it passes from hand to hand until a house key drops into a palm | Day |
| Stakes | A small musical snow globe spins in a spotlight; a tiny house sits inside it | Day |
| Trade one | Kyle holds the paperclip up to his laptop camera, then swaps it on a doorstep for a fish-shaped pen | Day |
| Montage | Fast doorstep swaps: doorknob, camp stove, generator; the camera follows each object to the next person | Day |
| Party | An empty keg and an IOU note pile into his arms | Golden |
| Snowmobile | A snowmobile roars past; a road sign reads YAHK and Kyle does a double take | Day |
| Escalation | A box truck, a studio microphone, an apartment key, then a long-haired rock star silhouette waving | Day |
| Snow globe | Kyle holds up the snow globe; the camera snap-zooms onto it | Day |
| Mystery | A question-mark sprite pops over the snow globe | Day |
| You see / share moment | A friend's shelf of odd knick-knacks; a collector spots one and his eyes light up | Golden |
| Twist | An actor in a room lined with snow globes beams and hands over a film script | Golden |
| Offer | A small prairie town council raises hands; a two-storey house appears with a giant bow on it | Day |
| Snap | Keys change hands on a porch; a counter on the wall clicks to 14 | Day |
| Consequence | A local resident on a film set; then a giant red paperclip rises in a park | Golden |
| Debate moment | A scoreboard flips to KYLE 1, KIPLING 2 as tourists snap photos of the giant paperclip | Golden |
| Callback | Tilt down from the giant paperclip to a tiny paperclip on a desk | Golden |

## On-screen text

- **Title card** (first 2 seconds, upper third): a small tag reading "ZERO TO EMPIRE #1" above the title "ONE RED PAPERCLIP".
- **Captions:** the whole voiceover, word by word, styled as in the instructions.
- **Signs and props:** only the words already in the shot table.

---

## For posting (not part of the video)

**Caption:** Who won this trade: Kyle or Kipling? Kyle MacDonald traded one red paperclip up to a house in 14 trades. The trick? Find who wants what you have. We all know someone whose junk drawer could buy a house. Zero to Empire #1. #moneystories #negotiation #storytime #business #history

**Pinned comment:** Kipling, easily. One house put the whole town on the map.

**Keep it safe:** draw the snow globe and the rock star generically, with no band face paint, logos or real faces.

**Sponsor fit:** resale and marketplace apps; the whole story is one trade after another.

**Trial Reel hook:** once you pass 1,000 followers, test a second version that swaps line 1 for: "How do you turn one red paperclip into a house? Fourteen trades."

**When you post:**

- Upload the rendered file directly, with no other app's watermark.
- Open the caption with the debate question, pin your own answer (above) as the first comment, then reply to early answers to keep the thread going.
- Turn on Meta AI translation to dub it into Hindi. The burned-in captions stay in English.
- Invite a history or business creator as a Collab, so the Reel shows on both profiles.
- Post the same video to YouTube Shorts and Facebook.
- Pin your three best Reels to the top of your profile.
- If a version carries a sponsor, turn on Instagram's Paid partnership tag and start the caption with "Ad".
- Series order for the first five: 5, 2, 3, 1, 4.
