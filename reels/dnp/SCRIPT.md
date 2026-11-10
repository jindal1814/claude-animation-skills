# SCRIPT.md — Gym Diet Files #3: The Fat Burner Made for Factories

> **For you:** put this file in a new folder for this short, such as `~/dnp-short/`, open Claude Code and say: "Use the cartoon short skill and make a short from this file." Everything from here down is written for Claude.

## Instructions for Claude

You are making one vertical story short from still images, using the **cartoon-3d-short** skill (`~/.claude/skills/cartoon-3d-short/SKILL.md`). Follow that skill's pipeline, with these specifics:

1. **This file is the project's SCRIPT.md.** If it has another name, copy it to `SCRIPT.md` in this short's folder (`~/dnp-short/`). The skill's "Topic and facts" and "Script" steps are already done: the sourced facts and the final voiceover are below. Start at the Voice step.
2. **Use the voiceover word for word.** This is a true story about a real person who died, so don't add, cut, reword or reorder lines, and don't add medical advice, doses, diet tips or claims that aren't in the facts list. If timing forces a change, ask me first.
3. **Voice:** generate `voice.wav` with a text-to-speech voice. Never record, clone or imitate my voice. Use one calm, steady narrator at 3.6–4.0 words a second, starting within the first few frames. Pronounce Knapman "NAP-mun"; read DNP as "D-N-P". Then make `words.json` with word timings and time every shot to it.
4. **Images, not animation:** the only visuals are still images you create. For each row of the image table below, build the scene in the skill's three.js world, pose it and render it once as a 2K still with the skill's stills helper. Don't animate characters, walk cycles or camera flights. Register the composition as `DnpShort` in `src/videos/dnp/`. Light each still with the preset in its Light column, adding presets the skill doesn't have: **Night** (cold blue moonlight, fog), **Dusk** (deep blue hour), **Lamp** (a dark interior lit by one warm practical light, such as a lamp, fridge or screen) and **Storm** (heavy overcast daylight, desaturated).
5. **Zoom and pan:** in Remotion, show each still full-frame and move across it as its Move column says (push in, pull out, or pan left, right or up), slowly and steadily, about 8% over the shot, with easing. Change to the next still on the word where its line starts in `words.json`, with a short crossfade of about 8 frames. Never hold one still for more than about 4 seconds: if a line runs longer, render a second, closer still of the same scene. Skip the white flash after the hook; this story opens on a death. The first frame must already be moving.
6. **Look:** dark and mysterious throughout. Low-key light, deep shadows, light fog or haze, a heavy vignette, fine film grain and a desaturated teal-and-amber grade. Faces sit half in shadow but stay readable. Show the real people only as generic cartoon characters, never as likenesses or photos. No bodies, injuries, gore or medical procedures; show loss through places and objects. Label every tub, jar and bottle generically, as in the image table: no real brand names, logos or packaging. Never show how to buy, measure or take any substance.
7. **Sound:** replace the skill's march score with a slow, low ambient drone and a soft pulse, synthesised the same way, and add one muted heartbeat under the "Wait…?" line. No comic or cartoon sound effects. Keep the skill's ducking so the voice stays clear.
8. **Format:** vertical 1080×1920, 30 fps, 40–55 seconds. No logo, intro, outro or call to action; the video ends on the last word.
9. **Captions:** burn in captions for the whole voiceover. Use the voiceover text exactly as written below, not the speech-to-text output, timed to `words.json`. Show 1–3 words at a time in white bold sans-serif with a thin black outline, swapping on each word, centred about two-thirds of the way down the frame. Keep them clear of the bottom quarter and the right edge, where Instagram's caption and buttons sit. Show numbers and names in yellow.
10. **Title card:** for the first 2 seconds, show the title card from "On-screen text" in the upper third, in white with a soft glow, then fade it out as the second line starts.
11. **Keep me out of it:** don't use my name, face, photo or voice anywhere in the project.
12. **Check with me:** show me all the stills, in order, before the full render.
13. Ignore the "For posting" section at the end. It's for Instagram, not for the video.

## About this short

In March 2018, 21-year-old bodybuilder Jack Knapman died after taking DNP, an industrial chemical sold online as a fat burner. The Food Standards Agency had spotted his purchase, but its warning letter was delayed. This script is 180 words, about 49 seconds.

## Facts and sources

- On 21 and 22 March 2018, Jack Knapman, 21, took a substantial quantity of dinitrophenol (DNP) to lose weight and for bodybuilding. He developed severe toxicity, was admitted to Northampton General Hospital, had a cardiac arrest and died shortly after 1am on 23 March 2018. ([Coroner's Prevention of Future Deaths report](https://www.judiciary.uk/wp-content/uploads/2022/12/Jack-Knapman-Prevention-of-future-deaths-report-2022-0405_Published.pdf))
- Most DNP is sold online. The Food Standards Agency had become aware of his purchase, and there was an admitted delay in sending him a letter warning of the risk. The coroner could not conclude that the delay made a material difference to the outcome. ([Coroner's report](https://www.judiciary.uk/wp-content/uploads/2022/12/Jack-Knapman-Prevention-of-future-deaths-report-2022-0405_Published.pdf); [BBC](https://www.bbc.com/news/uk-england-northamptonshire-64051711))
- The coroner, in December 2022: DNP "should never be used for human consumption", and the risk of further deaths remains for as long as it is available and used. ([Coroner's report](https://www.judiciary.uk/wp-content/uploads/2022/12/Jack-Knapman-Prevention-of-future-deaths-report-2022-0405_Published.pdf))
- DNP's industrial uses include photographic chemicals, fertiliser, dyes and explosives. It causes weight loss by turning the body's energy into heat; temperature and metabolic rate rise, which can be fatal. ([BBC](https://www.bbc.com/news/uk-england-44388389))
- Doctors used it to treat obese patients in the mid-1930s; because of its side effects it was banned in the US in 1938. There is no specific antidote. ([BBC](https://www.bbc.com/news/uk-england-44388389))

**Everyday comparison** (for the "You see," beat): a stove stuck on full, with no off switch.

## Voiceover (final: use word for word)

```text
A 21-year-old bodybuilder dies just after 1am, poisoned by his own fat burner.
And the authorities already knew what he'd bought.
Jack Knapman wants to lose weight for bodybuilding. Online, he finds a fat burner called DNP.
Over two days, he takes a lot of it.
Every gym has someone with a secret fat burner from a guy online.
Then the toxicity hits. Hospital. Cardiac arrest.
Wait. What exactly was he taking?
You see, DNP isn't a supplement. It's an industrial chemical, used in dyes, fertiliser... and explosives. It makes your body burn fuel as pure heat, like a stove stuck on full, with no off switch. And there's no specific antidote.
Doctors gave it to patients in the 1930s. America banned it in 1938.
And those authorities? They'd spotted Jack's purchase. Their warning letter was delayed.
In 2022, a coroner says DNP should never be used for human consumption. And as long as it's sold online, the risk remains.
So should selling it be treated like dealing drugs?
A fat burner that was never meant for people at all.
```

Length: 180 words, about 49 seconds at 3.7 words a second.

## Beat formula

1. **Hook:** the tragedy itself, stated plainly in the first line.
2. **Stakes:** one short line that opens the mystery: where the answer was hiding.
3. **Escalation:** what led up to it, in short, concrete steps.
4. **Mystery:** one "Wait…?" question.
5. **"You see,":** the real cause, explained through the everyday comparison.
6. **Snap:** the official finding and what changed afterwards.
7. **Callback:** the last line echoes the hook, and the video ends on that word.

This script also carries a **share moment** (the "we all know someone who…" line) and a **debate moment** (the "So should…?" question). Give each its own still (see the image table); never turn either into an on-screen request to share or comment.

## Images (one still per row, in order)

| Beat | Image | Move | Light |
| --- | --- | --- | --- |
| Hook | A hospital corridor at night; a wall clock just past 1:00; a gym bag on a plastic chair | Push in | Night |
| Stakes | A dark office: a file marked DNP PURCHASE sitting in an out-tray under one desk lamp | Pan right | Lamp |
| Goal | A young man at a dim gym mirror under one cold overhead light, pinching his waist | Push in | Lamp |
| Online | A laptop glowing in a dark bedroom, showing a generic shop page with a jar labelled FAT BURNER | Push in | Lamp |
| Two days | A calendar with 21 and 22 crossed out, beside the half-empty jar | Pan left | Lamp |
| Share moment | A locker room in shadow: one guy slips a friend an unlabelled bag of capsules | Pan right | Night |
| Toxicity | Ambulance light washing over an empty, wet street at night | Pull out | Night |
| Mystery | Close on the jar, its FAT BURNER label half peeled away | Push in | Lamp |
| You see 1 | The label gone: the jar now reads INDUSTRIAL CHEMICAL, with dye vats, fertiliser sacks and an explosives crate behind it in a dark warehouse | Pull out | Night |
| You see 2 | An old stove glowing red, every dial jammed on full and the off switch missing | Push in | Lamp |
| History | A dim 1930s doctor's office in sepia tones; a medicine bottle stamped BANNED 1938 | Pan right | Lamp |
| Letter | The DNP PURCHASE file, now stamped LATE, in a dark sorting room | Push in | Night |
| Coroner | A courtroom in shadow; a document under a lamp reads NEVER FOR HUMAN CONSUMPTION | Pull out | Lamp |
| Debate moment | A split image: a glowing online BUY button on one side, a police evidence bag on the other | Pan left | Night |
| Callback | The jar alone on a dark shelf | Pull out | Night |

## On-screen text

- **Title card (first 2 seconds, upper third):** GYM DIET FILES #3 / THE FAT BURNER MADE FOR FACTORIES
- **Captions:** the whole voiceover, word by word, styled as in the instructions.
- **Signs and props:** only the words already in the image table (DNP PURCHASE, FAT BURNER, INDUSTRIAL CHEMICAL, BANNED 1938, LATE, NEVER FOR HUMAN CONSUMPTION, BUY).

---

## For posting (not part of the video)

**Caption:** Should selling DNP be treated like dealing drugs? Jack Knapman, 21, died in 2018 after taking DNP, an industrial chemical sold online as a fat burner. We all know someone with a "secret" fat burner. Gym Diet Files #3. #gym #fatloss #supplements #truestory #healthawareness

**Pinned comment:** My take: yes. It was never a supplement. It's an industrial chemical with a fitness label on it.

**Keep it safe:** this is a real person's death, and their family went public to warn others. Tell it straight: no blame on them, no jokes, no graphic detail. Also, don't say where DNP is sold, what it costs or how much he took. Don't suggest the late letter would have saved him; the coroner couldn't conclude that.

**Sponsor fit:** none. As a registered doctor, you can't endorse health products, and the NMC's 2026 guidelines allow educational health content only if it isn't monetised through promotional marketing.

**Trial Reel hook:** He bought a fat burner online. It was an industrial chemical.

**When you post:**

- Upload the rendered file directly, with no other app's watermark.
- Open the caption with the debate question, pin your own answer (above) as the first comment, and reply to early answers to keep the thread going.
- If someone questions a fact, reply with the source link from the facts list.
- Turn on Meta AI translation to dub it into Hindi. The burned-in captions stay in English.
- Post the same video to YouTube Shorts and Facebook.
- Suggested order: 1, 2, 4, 3.
