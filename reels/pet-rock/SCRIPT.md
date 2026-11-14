# SCRIPT.md — Zero to Empire #2: The Man Who Sold Rocks

> **For you:** put this file in a new folder for this short, such as `~/pet-rock-short/`, open Claude Code and say: "Use the cartoon short skill and make a short from this file." Everything from here down is written for Claude.

## Instructions for Claude

You are making one vertical animated story short with the **cartoon-3d-short** skill (`~/.claude/skills/cartoon-3d-short/SKILL.md`). Follow that skill's pipeline, with these specifics:

1. **This file is the project's SCRIPT.md.** If it has another name, copy it to `SCRIPT.md` in this short's folder (`~/pet-rock-short/`). The skill's "Topic and facts" and "Script" steps are already done: the sourced facts and the final voiceover are below. Start at the Voice step.
2. **Use the voiceover word for word.** Don't add, cut, reword or reorder lines, and don't add advice, predictions, profit figures or claims that aren't in the facts list. Every line is checked against the sources. If timing forces a change, ask me first.
3. **Voice:** generate `voice.wav` with a text-to-speech voice. Never record, clone or imitate my voice. Use one bright, steady narrator at 3.6–4.0 words a second with almost no pauses, starting within the first few frames. Read "1975" as "nineteen seventy-five". Then make `words.json` with word timings and time every shot to it.
4. **Shot plan:** copy the bridge template as the skill describes, into `src/videos/pet-rock/`, and register the composition as `PetRockShort`. Build `story.ts` from the shot table below: illustrate every sentence literally, use the light named in the table (Day or Golden), put a white flash after the hook, and crossfade where the place or time changes. The first frame must already be moving, and the last frame must match the first so the video loops cleanly. If a shot is hard to build in the skill's world, swap in a simpler one that shows the same line.
5. **On screen:** keep products, signs and documents generic: no real logos or packaging designs. Boxes may say PET ROCK in plain lettering, but don't copy the original box design. Show real people only as generic cartoon characters, never as likenesses, and show TV as a generic late-night set with no real host or logo. Any date or number shown on screen must match the facts list.
6. **Format:** vertical 1080×1920, 30 fps, 50–60 seconds. No logo, intro, outro or call to action; the video ends on the last word.
7. **Captions:** burn in captions for the whole voiceover. Use the voiceover text exactly as written below, not the speech-to-text output, timed to `words.json`. Show 1–3 words at a time in white bold sans-serif with a thin black outline, swapping on each word, centred about two-thirds of the way down the frame. Keep them clear of the bottom quarter and the right edge, where Instagram's caption and buttons sit. Show numbers and names in yellow.
8. **Title card:** for the first 2 seconds, show the title card from "On-screen text" in the upper third, then fade it out as the second line starts.
9. **Keep me out of it:** don't use my name, face, photo or voice anywhere in the project.
10. **Check with me:** show me the stills before the full render.
11. Ignore the "For posting" section at the end. It's for Instagram, not for the video.

## About this short

In 1975, advertising man Gary Dahl turned a bar joke into the Pet Rock: beach stones sold in a pet-carrier box with a training manual. He sold nearly 1.5 million and became a millionaire before the craze died. This script is 211 words, about 57 seconds.

## Facts and sources

- Gary Dahl, an advertising executive, came up with the idea in a bar while listening to friends complain about their pets. A rock would not need to be fed, walked, bathed or groomed, and it would not die, get sick or disobey. ([Wikipedia: Pet Rock](https://en.wikipedia.org/wiki/Pet_Rock))
- In the weeks after that April 1975 conversation, he wrote a 36-page instruction book, found two investors and bought "Mexican beach stones" from Rosarito, Baja California. ([Wikipedia: Gary Dahl](https://en.wikipedia.org/wiki/Gary_Dahl_(businessman))) They cost less than a penny each. ([Wikipedia: Pet Rock](https://en.wikipedia.org/wiki/Pet_Rock))
- Each rock came in a cardboard box with ventilation holes and straw bedding, like a pet carrier. ([Wikipedia: Pet Rock](https://en.wikipedia.org/wiki/Pet_Rock)) The "care and training" booklet listed commands such as "come," "stay," "roll over" and "play dead"; "play dead" was one of the Pet Rock's specialties. ([ABC News](https://abcnews.com/US/pet-rock-captured-moment-made-creator-millionaire/story?id=30041318))
- Dahl introduced the Pet Rock in August 1975 in the San Francisco area, at $3.95 each. It appeared on "The Tonight Show", and a song followed: "I'm in Love With My Pet Rock". ([ABC News](https://abcnews.com/US/pet-rock-captured-moment-made-creator-millionaire/story?id=30041318))
- Two months after launch he was reportedly selling 10,000 a day ahead of the holiday season. ([Wikipedia: Gary Dahl](https://en.wikipedia.org/wiki/Gary_Dahl_(businessman)))
- He sold nearly 1.5 million (estimates run from 1.3 to 1.5 million), made 95 cents profit on each and became a millionaire. ([Wikipedia: Pet Rock](https://en.wikipedia.org/wiki/Pet_Rock); [Wikipedia: Gary Dahl](https://en.wikipedia.org/wiki/Gary_Dahl_(businessman)))
- The fad lasted about six months. By February 1976 the rocks weren't selling well, and his investors took him to court and won extra compensation. ([Wikipedia: Gary Dahl](https://en.wikipedia.org/wiki/Gary_Dahl_(businessman)))

**Everyday comparison** (for the "You see," beat): a meme you could gift-wrap for Christmas.

## Voiceover (final: use word for word)

```text
A man sells ordinary beach rocks... and in six months, he's a millionaire.
And each rock comes with its own training manual.
Ad man Gary Dahl's friends complain about their pets at a bar.
He jokes: his pet is a rock. No food. No walks. Never sick.
So he buys Mexican beach stones for less than a penny each.
Each one sits on straw, in a box with air holes. So it can breathe.
The manual teaches come, stay and roll over. Its best trick? Play dead.
We all know someone who'd buy anything with a funny enough box.
August 1975. Price: three dollars ninety-five.
Two months later, he's selling 10,000 a day.
It lands on The Tonight Show. Someone writes it a love song.
Wait. Why would anyone pay four dollars for a rock?
You see, nobody was buying a rock. They were buying a joke: a meme you could gift-wrap for Christmas.
By the end, he's sold nearly one and a half million, at 95 cents profit each.
By February, the craze is over. His own investors take him to court.
But he's already a millionaire.
So was it marketing genius... or the luckiest joke in history?
All for a rock you could pick up on any beach.
```

Length: 211 words, about 57 seconds at 3.7 words a second.

## Beat formula

1. **Hook:** the strange fact stated plainly, in 10–16 words, with no setup.
2. **Stakes:** one short line that teases the payoff: a training manual for a rock.
3. **Escalation:** the joke, the stones, the box, the manual, the sales, the fame.
4. **Mystery:** one "Wait…?" question.
5. **"You see,":** the real reason, through the everyday comparison.
6. **Snap:** the crash, the court case, and the fortune he kept.
7. **Callback:** the last line ("any beach") leads straight back into the first ("ordinary beach rocks"), so the video loops.

This script also carries a **share moment** (the "funny box" friend) and a **debate moment** (genius or luck). Illustrate each as its own shot (see the shot table); never turn either into an on-screen request to share or comment.

## Shot ideas for story.ts

| Beat | What we see | Light |
| --- | --- | --- |
| Hook | First frame already moving: a smooth grey rock in a small cardboard box with air holes; pull back to stacks of these boxes and a man in a 1970s suit fanning out cash | Day |
| Stakes | A tiny booklet titled TRAINING MANUAL flips open beside the rock | Day |
| Bar | A 1970s bar: one friend holds up a chewed shoe, another a tangled leash; Gary listens, grinning | Golden |
| Joke | Gary sets a rock on the bar and pats it like a dog; his friends burst out laughing | Golden |
| Stones | A sunny beach: Gary scoops smooth stones into a sack beside a sign reading LESS THAN 1¢ EACH | Day |
| Box | A rock is laid on straw in a box with air holes, and the lid closes gently | Day |
| Manual | Manual pages flip: COME, STAY, ROLL OVER, and the rock doesn't budge; then PLAY DEAD, and the rock earns a gold star | Day |
| Share moment | In a gift shop, a friend grabs something purely because its box is funny, while another rolls her eyes | Day |
| Launch | A calendar page for August 1975 and a price tag reading $3.95 | Day |
| Boom | A counter spins to 10,000 A DAY as boxes fly off shop shelves | Golden |
| Fame | A generic late-night TV set with a rock on the guest chair; then a crooner sings to a rock under a spotlight | Golden |
| Mystery | A shopper holds a rock in one hand and four dollars in the other, puzzled | Day |
| You see | Under a Christmas tree, a wrapped gift opens to reveal a rock on straw, and the whole family cracks up | Golden |
| Total | A tally board climbs to 1.5 MILLION as each box drops 95¢ into a jar | Day |
| Fall | A February calendar; unsold boxes pile up; two investors in suits wave legal papers | Day |
| Millionaire | Gary leans back on a pile of cash, smiling | Golden |
| Debate moment | Split screen: a lightbulb labelled GENIUS and a horseshoe labelled LUCK, with the rock between them | Day |
| Callback | Waves wash over a beach of ordinary rocks; the camera settles on one rock, matching the first frame so the video loops cleanly | Golden |

## On-screen text

- **Title card (first 2 seconds, upper third):** ZERO TO EMPIRE #2 / THE MAN WHO SOLD ROCKS
- **Captions:** the whole voiceover, word by word, styled as in the instructions.
- **Signs and props:** only the words already in the shot table (TRAINING MANUAL, LESS THAN 1¢ EACH, COME, STAY, ROLL OVER, PLAY DEAD, $3.95, 10,000 A DAY, 1.5 MILLION, 95¢, GENIUS, LUCK, PET ROCK).

---

## For posting (not part of the video)

**Caption:** Marketing genius, or the luckiest joke in history? In 1975, Gary Dahl sold nearly 1.5 million ordinary beach rocks as "pets" for $3.95 each, and became a millionaire. We all know someone who'd buy anything with a funny box. Zero to Empire #2. #moneystories #marketing #business #history #storytime

**Pinned comment:** My vote: genius. The rock was free. The joke was the product.

**Keep it safe:** keep "nearly 1.5 million" and "95 cents profit" as written. Don't copy the original box design, and don't show a real TV host or show logo.

**Sponsor fit:** gifting, e-commerce or packaging brands. Swap the "funny box" friend line for one about the sponsor's gift wrapping or delivery, keeping the same length.

**Trial Reel hook:** In 1975, a man sold over a million ordinary rocks. As pets.

**When you post:**

- Upload the rendered file directly, with no other app's watermark.
- Open the caption with the debate question, pin your own answer (above) as the first comment, then reply to early answers to keep the thread going.
- Test two or three different opening lines as Trial Reels before the main post; Instagram's head says several in one day is fine.
- Turn on Meta AI translation for every language it offers you. Note that the burned-in captions stay in English.
- Post the same file to YouTube Shorts and Facebook yourself, so the original is always yours.
- Pin it next to the paperclip short so new visitors find the series.
