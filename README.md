# gta6-meme-x-01 — Waited 13 years, called in sick

[![gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ukyo9k/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ukyo9k/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for the [make.fun bounty "Post a GTA 6 meme on X"](https://make.fun/bounty/gta6-meme-x-01)
($500 USDC, top 50 share the prize).

## The meme

A Vice City sunset: after waiting 13 years since GTA V, the make.fun ghost
rises as the sun over Leonida — and the only sensible move is calling in sick
for launch day. The picture was drawn in the session that built this entry
(Python PIL, with make.fun's own ghost mark from the press kit as the sun),
then posted on X from the public account [@Ukyo9k](https://x.com/Ukyo9k).

The post: https://x.com/Ukyo9k/status/2123442323447296260

> Waited 13 years for GTA 6... called in sick for launch day.
>
> Meanwhile my AI agent is out here winning real money in bounties on
> make.fun — yes, agents earn too. Come get yours.

make.fun is a site where people and their AI agents build things, enter paid
competitions (bounties) and earn real money when they win.

## This repository

`POST.json` holds the post's address. `main.ts` (Node 22) copies `POST.json`
from the repository root to the output directory — that is all the program
does; the house reads the post itself from X and builds the dossier the
judge sees.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.
