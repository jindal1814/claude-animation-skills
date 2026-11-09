# SCRIPT.md — Epic Money #1: The Dice Game

> **For you:** put this file in a new folder for this short, such as `~/dice-game-short/`, open Claude Code and say: "Use the cartoon short skill and make a short from this file." Everything from here down is written for Claude.

## Instructions for Claude

You are making one vertical animated story short with the **cartoon-3d-short** skill (`~/.claude/skills/cartoon-3d-short/SKILL.md`). Follow that skill's pipeline, with these specifics:

1. **This file is the project's SCRIPT.md.** If it has another name, copy it to `SCRIPT.md` in this short's folder (`~/dice-game-short/`). The skill's "Topic and facts" and "Script" steps are already done: the sourced facts and the final voiceover are below. Start at the Voice step.
2. **Use the voiceover word for word.** Don't add, cut, reword or reorder lines, and don't add advice, predictions, profit figures or claims that aren't in the facts list. Every line is checked against the sources. If timing forces a change, ask me first.
3. **Voice:** generate `voice.wav` with a text-to-speech voice. Never record, clone or imitate my voice. Use one steady narrator at 3.6–4.0 words a second with almost no pauses, starting within the first few frames. Pronounce Yudhishthira "yoo-DHISH-thi-ra", Shakuni "SHUH-ku-nee", Draupadi "DROW-puh-dee", Mahabharata "muh-haa-BHAA-ruh-tuh" and SEBI "SAY-bee", and read "F&O" as "F and O". Then make `words.json` with word timings and time every shot to it.
4. **Shot plan:** copy the bridge template as the skill describes, into `src/videos/dice-game/`, and register the composition as `DiceGameShort`. Build `story.ts` from the shot table below: illustrate every sentence literally, use the light named in the table (Day or Golden), put a white flash after the hook, and crossfade where the place or time changes. The first frame must already be moving, and the last frame must match the first so the video loops cleanly. If a shot is hard to build in the skill's world, swap in a simpler one that shows the same line.
5. **On screen:** draw the Mahabharata characters with dignity, in traditional dress, with no comic exaggeration. No gods on screen and no religious symbols as props. Don't show Draupadi being dragged or disrobed; show the hall's reaction instead. Keep phones, charts and apps generic: no real logos or app designs. Any number shown on screen must match the facts list.
6. **Format:** vertical 1080×1920, 30 fps, 35–45 seconds. No logo, intro, outro or call to action; the video ends on the last word.
7. **Captions:** burn in captions for the whole voiceover. Use the voiceover text exactly as written below, not the speech-to-text output, timed to `words.json`. Show 1–3 words at a time in white bold sans-serif with a thin black outline, swapping on each word, centred about two-thirds of the way down the frame. Keep them clear of the bottom quarter and the right edge, where Instagram's caption and buttons sit. Show numbers and names in yellow.
8. **Title card:** for the first 2 seconds, show the title card from "On-screen text" in the upper third, then fade it out as the second line starts.
9. **Keep me out of it:** don't use my name, face, photo or voice anywhere in the project.
10. **Check with me:** show me the stills before the full render.
11. Ignore the "For posting" section at the end. It's for Instagram, not for the video.

## About this short

In the Mahabharata, Yudhishthira loses his wealth, kingdom, brothers, himself and Draupadi at dice, gets it all back, then plays again and loses 13 years in exile. Today, SEBI's data shows most loss-making F&O traders keep trading too. This script is 142 words, about 40 seconds once the long names are voiced.

## Facts and sources

From the Sabha Parva of the Mahabharata, in K. M. Ganguli's public-domain translation:

- Yudhishthira: "Summoned, I do not withdraw. This is my established vow." ([Section LVIII](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LVIII))
- Before each win, Shakuni plays "adopting foul means" and says "Lo, I have won!" ([Section LXIV](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LXIV))
- In order, Yudhishthira stakes and loses his wealth, his cattle, his city and land, his brothers Nakula, Sahadeva, Arjuna and Bhima, and then himself. Shakuni then says: "Stake thou Krishna, the princess of Panchala. By her, win thyself back." He stakes Draupadi and loses. ([Section LXIV](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LXIV))
- When he stakes Draupadi, the elders cry "Fie!", Bhishma, Drona and Kripa break into a sweat, and Vidura holds his head in his hands. ([Section LXIV](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LXIV))
- Dhritarashtra then tells Yudhishthira to go and "rule thy own kingdom with thy wealth." ([Section LXXII](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LXXII))
- Urged on by Duryodhana, and despite Gandhari's warning, Dhritarashtra says: "Let the Pandavas return. And let my sons again gamble with the sons of Pandu." ([Section LXXIV](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LXXIV))
- The second game's stake: the loser spends twelve years in the forest and a thirteenth year unrecognised. Yudhishthira: "How can, O Sakuni, a king like me... refuse, when summoned to dice? Therefore I play with thee." He loses. ([Section LXXV](https://en.wikisource.org/wiki/The_Mahabharata/Book_2%3A_Sabha_Parva/Section_LXXV))

From SEBI:

- 93% of over 1 crore individual F&O traders lost money between FY22 and FY24, an average of about ₹2 lakh each. "Despite consecutive years of losses, more than 75% of loss-making traders continued trading in F&O." ([SEBI press release, September 2024](https://www.sebi.gov.in/media-and-notifications/press-releases/sep-2024/updated-sebi-study-reveals-93-of-individual-traders-incurred-losses-in-equity-fando-between-fy22-and-fy24-aggregate-losses-exceed-1-8-lakh-crores-over-three-years_86906.html))
- Background only: 87.7% of individual traders lost money in FY26, down from 90.9% in FY25. ([SEBI study, August 2026](https://www.sebi.gov.in/reports-and-statistics/research/aug-2026/study-profitability-of-individual-traders-in-the-equity-derivatives-segment-fy25-fy26-_103835.html))

**Everyday comparison** (for the "You see," beat): the friend who says "One more round. I'll win it back", because quitting feels like locking in the loss.

## Voiceover (final: use word for word)

```text
Yudhishthira, the most righteous king in the Mahabharata, loses everything at dice.
Then he gets it all back... and sits down to play again.
His vow: once challenged, never back out.
Across the board: Shakuni, who cheats.
Throw. His wealth: gone. Throw. His kingdom: gone.
Everyone has that one friend who says, "One more round. I'll win it back."
Then his four brothers. Then himself.
Then Shakuni says, "Stake Draupadi. Win yourself back."
He does. And loses her too.
Wait. Why does he keep playing?
You see, quitting feels like locking in the loss. SEBI found more than 3 in 4 F&O traders who lost year after year kept trading.
The old king gives everything back... then calls him to one more game. The stake: thirteen years in exile.
He can't refuse. He loses.
Shakuni cheated. But who kept saying yes?
```

Length: 142 words, about 39–41 seconds at 3.7 words a second once the long names and pauses are voiced.

## Beat formula

1. **Hook:** the strange fact stated plainly, in 10–16 words, with no setup.
2. **Stakes:** one short line that raises the stakes or teases the payoff. Here it's the flash-forward: he gets it all back and plays again.
3. **Escalation:** each throw takes something bigger, ending with Shakuni's "Win yourself back."
4. **Mystery:** one "Wait…?" question.
5. **"You see,":** the real reason, through the everyday comparison and SEBI's figure.
6. **Snap:** the second game and thirteen years of exile.
7. **Callback:** the last line asks "who kept saying yes?" and the first line answers it, so the video loops.

This script also carries a **share moment** (the "one more round" friend) and a **debate moment** (Shakuni's cheating against Yudhishthira's choices). Illustrate each as its own shot (see the shot table); never turn either into an on-screen request to share or comment.

## Shot ideas for story.ts

| Beat | What we see | Light |
| --- | --- | --- |
| Hook | First frame already in motion: two dice tumble across a board in a torch-lit palace hall as a crowned king watches | Golden |
| Stakes | Flash-forward: gold coins and a crown slide back across the board to the king, and he reaches for the dice again | Golden |
| Vow | A messenger bows and holds out a dice board; the king rises and nods, hand on heart | Day |
| Opponent | Across the board, Shakuni smiles and rolls the dice with a sleight-of-hand flourish | Golden |
| Escalation | Each throw sweeps a pile off the king's side: gold coins, then a tiny model of his city | Golden |
| Share moment | Modern cutaway: a young man stares at a red chart on his phone and mutters to himself while his friend facepalms | Day |
| Escalation | Four brothers' shadows fade from the king's side of the hall, then the king's own shadow | Golden |
| Draupadi | Shakuni gestures across the hall; the king hesitates, then throws; the elders cover their faces | Golden |
| Mystery | Close on the king's hand, still holding the dice | Golden |
| You see | A phone with a red chart; four little traders, three of them still tapping BUY after a row of red days | Day |
| Return | The old blind king pushes the gold and the crown back across the board | Golden |
| Snap | A stake card reads 13 YEARS; the dice land; the king and his brothers walk into a dark forest | Golden |
| Debate moment / callback | Shakuni smirks behind the board; the king's hand reaches for the dice again, matching the first frame so the loop is seamless | Golden |

## On-screen text

- **Title card (first 2 seconds, upper third):** EPIC MONEY #1 / THE DICE GAME
- **Captions:** the whole voiceover, word by word, styled as in the instructions.
- **Signs and props:** only the words already in the shot table (BUY, 13 YEARS).

---

## For posting (not part of the video)

**Caption:** Shakuni or Yudhishthira: who's more to blame? He lost his kingdom, his brothers, himself and Draupadi at dice, got it all back, then played again. We all know someone who says "one more round". Epic Money #1. #mahabharat #moneystories #trading #history #finance

**Pinned comment:** My vote: Yudhishthira. Shakuni cheated, but nobody made him say yes to the second game.

**Keep it safe:** tell the epic straight and with respect. Don't joke about gods, the Pandavas or Draupadi, and keep the debate about choices and money, never about faith. Leave out the folk tale that Shakuni's dice were made from his father's bones; it isn't in the text. Keep the SEBI line as written: no tips, returns or broker names, and don't call trading gambling.

**Sponsor fit:** money-habit and budgeting apps. Swap the friend line for one about the sponsor's spending limits, keeping the same length. Avoid trading platforms, which clash with the SEBI line.

**Trial Reel hook:** He lost his kingdom at dice. Got it all back. Then played again.

**When you post:**

- Upload the rendered file directly, with no other app's watermark.
- Open the caption with the debate question, pin your own answer (above) as the first comment, then reply to early answers to keep the thread going.
- Turn on Meta AI translation to dub it into Hindi. The burned-in captions stay in English.
- Invite a mythology or finance creator as a Collab, so the Reel shows on both profiles.
- Post the same video to YouTube Shorts and Facebook.
- If a version carries a sponsor, turn on Instagram's Paid partnership tag and start the caption with "Ad".
- A natural Part 2: Draupadi's question, "Whom did you lose first, yourself or me?" It's a dispute over whether you can stake what you no longer own.
