# SCRIPT.md — Scam Files #1: The Country That Never Existed

> **For you:** put this file in a new folder for this short, such as `~/poyais-short/`, open Claude Code and say: "Use the cartoon short skill and make a short from this file." Everything from here down is written for Claude.

## Instructions for Claude

You are making one vertical animated story short with the **cartoon-3d-short** skill (`~/.claude/skills/cartoon-3d-short/SKILL.md`). Follow that skill's pipeline, with these specifics:

1. **This file is the project's SCRIPT.md.** If it has another name, copy it to `SCRIPT.md` in this short's folder (`~/poyais-short/`). The skill's "Topic and facts" and "Script" steps are already done: the sourced facts and the final voiceover are below. Start at the Voice step.
2. **Use the voiceover word for word.** Don't add, cut, reword or reorder lines, and don't add advice, predictions, profit figures or claims that aren't in the facts list. Every line is checked against the sources. If timing forces a change, ask me first.
3. **Voice:** generate `voice.wav` with a text-to-speech voice. Never record, clone or imitate my voice. Use one steady narrator at 3.5–4.1 words a second with almost no pauses, starting within the first few frames. Then make `words.json` with word timings and time every shot to it.
4. **Shot plan:** copy the bridge template as the skill describes, into `src/videos/poyais/`, and register the composition as `PoyaisShort`. Build `story.ts` from the shot table below: illustrate every sentence literally, use the light named in the table (Day or Golden), put a white flash after the hook, and crossfade where the place or time changes. If a shot is hard to build in the skill's world, swap in a simpler one that shows the same line.
5. **On screen:** keep products, vehicles, signs and documents generic: no real logos, labels or packaging designs. Show real people only as generic cartoon characters, never as likenesses. Any date or number shown on screen must match the facts list.
6. **Format:** vertical 1080×1920, 30 fps, 55–70 seconds. No captions, logo, intro, outro or call to action; the video ends on the last word. I'll ask if I want captions.
7. **Keep me out of it:** don't use my name, face, photo or voice anywhere in the project.
8. **Check with me:** show me the stills before the full render.
9. Ignore the "For posting" section at the end. It's for Instagram, not for the video.

## About this short

In 1822 a Scottish general sold land, bonds and even banknotes for a country that didn't exist. This script is 243 words, about 66 seconds.

## Facts and sources

All from [Wikipedia: Gregor MacGregor](https://en.wikipedia.org/wiki/Gregor_MacGregor), which draws on David Sinclair's history of the scheme.

- MacGregor became a general in Venezuela's war of independence. He came back to Britain in 1821 claiming a Mosquito Coast king had made him "Cazique" (prince) of Poyais, in what is now Honduras.
- His pitch: a capital, St Joseph, with paved boulevards, a theatre, an opera house, a domed cathedral, a bank and a royal palace. His guidebook said the rivers held "globules of pure gold".
- The 355-page guidebook (1822) was credited to a "Captain Thomas Strangeways". MacGregor or his accomplices actually wrote it.
- Land cost 2s 3d an acre, about a working man's daily wage. Demand let him raise it to 4s an acre without losing sales.
- In October 1822 a well-regarded London bank underwrote a £200,000 Poyais loan paying 6% interest.
- The settlers included a City banker who was to run the Bank of Poyais, and an Edinburgh cobbler appointed "Official Shoemaker to the Princess of Poyais". They swapped their gold for Poyais dollars printed by the Bank of Scotland's official printer.
- Two ships carried about 250 settlers to the Black River in 1822–23. They found jungle; a search party found only some old foundations and rubble.
- At least 180 settlers died, and fewer than 50 ever got back to Britain.
- France arrested MacGregor over a copycat scheme in 1825 and acquitted him in 1826. He died in Caracas in 1845 and was buried with full military honours.

**Everyday comparison** (for the "You see," beat): a slick fake website fools more people than a sloppy one, because details feel like proof.

## Voiceover (final: use word for word)

```text
In 1822, a Scottish general sells land in a country that doesn't exist.
London. General Gregor MacGregor is back from South America's wars. A native king, he says, has made him prince of Poyais, on the coast of Honduras.
Its capital, St Joseph, has paved boulevards, an opera house, a domed cathedral and a bank. The rivers? They carry lumps of gold.
His 355-page guidebook is by a Captain Thomas Strangeways. The captain doesn't exist either.
An acre costs about a day's wage. Demand's so strong he nearly doubles the price.
A respected London bank sells two hundred thousand pounds of Poyais bonds.
Hundreds sign up to move there, including an Edinburgh cobbler, now Official Shoemaker to the Princess.
They swap their gold for Poyais dollars, printed by the Bank of Scotland's own printer.
Two ships, about two hundred and fifty people. They land at the Black River... and find jungle.
Wait. Where's the capital?
A search party finds it: some old foundations and rubble.
You see, details feel like proof. A slick fake website fools more people than a sloppy one. MacGregor had a book, bonds and banknotes. Nobody checked the country.
Fever sweeps the camp. At least 180 settlers die. Fewer than fifty ever get home.
Luckily, France catches him running the same scam. Unluckily, the court lets him go.
In 1845, he dies in Caracas and is buried with full military honours. The prince of a country that never existed.
```

Length: 243 words, about 66 seconds at 3.7 words a second.

## Beat formula

1. **Hook:** the strange fact stated plainly, in 10–16 words, with no setup.
2. **Setting:** a year, a place, a named person and one number, in the present tense.
3. **Escalation:** 3–4 beats, each bigger than the last, often with a short line of dialogue.
4. **Mystery:** one "Wait…?" question.
5. **"You see,":** the real reason, explained through the everyday comparison.
6. **Snap:** the moment it all breaks.
7. **Callback:** the last line echoes the hook, and the video ends on that word.

## Shot ideas for story.ts

| Beat | What we see | Light |
| --- | --- | --- |
| Hook | A general unrolls a giant map across a cobbled London street; a crowd leans in | Day |
| Setting | A paper crown floats down onto MacGregor's head as he says "prince" | Day |
| Pitch | The map comes alive: boulevards, an opera house, a domed cathedral, a river sparkling with gold | Day |
| Escalation | A huge leather book thumps onto a desk; the author's portrait is a blank outline | Day |
| Escalation | A queue outside a bank; the price board flips from 2s 3d to 4s an acre | Day |
| Escalation | A cobbler holds up a tiny royal shoe; settlers hand gold coins over a counter for bright banknotes | Golden |
| Departure | Two sailing ships leave harbour; follow the flag across the sea to the next shot | Golden |
| Mystery | Settlers step onto a jungle beach and look around, bags in hand | Day |
| Reveal | A search party pulls back leaves to find a few stones and rubble | Day |
| You see | A slick fake shop window next to a scruffy one; then the book, bonds and banknotes stacked up | Golden |
| Snap | Tents in heavy rain; a small boat sails home almost empty | Golden |
| Luckily / Unluckily | A French courtroom; the gavel bangs and MacGregor strolls out tipping his hat | Day |
| Callback | A military salute at a cathedral; the old map blows away like loose paper | Golden |

---

## For posting (not part of the video)

**Caption:** In 1822, hundreds of people paid to move to a country that didn't exist. He even printed its money. Scam Files #1. #history #scam #moneystories #finance #storytime

**Sponsor fit:** online-safety or password-manager brands. Swap the fake-website line for one about the sponsor checking links for you, so the length stays the same.

**Series order:** post the set as 5, 2, 3, 1, 4. If a version carries a sponsor, turn on Instagram's Paid partnership tag and start the caption with "Ad".
