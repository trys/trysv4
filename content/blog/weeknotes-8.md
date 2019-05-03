---
title: 'Weeknotes #8'
date: 2019-05-03
categories: Web
---

It's been a productive week, and fortunately, largely without incident following [last week](/blog/weeknotes-7/).

Work-wise, I rounded out my first project. It's been very successful, we've been able to deliver all the requested features and much more. Deployment was handled by [Envoyer](https://envoyer.io), a service I've not used before. It's missing the detailed documentation you come to expect of a premium product, but after a morning of config tweaking, it was up and running. Laravel + Forge + Envoyer is clearly the ideal setup; given it's a Taylor Otwell project, but it works well enough for Craft projects.

Following a small round of feedback, I was able to jump onto the Vue project again. It'll be my focus for the next three weeks, so it was nice to get a head start and see what's changed on the project in the last few weeks. Getting a couple of PR's merged was a nice way to end the week.

I also took a deeeeep dive into Elf, our internal dev environment and deployment tool. I'd had trouble pulling DB's down since joining and it was beginning to irk. The actual fix was two lines, but it took a morning of rooting around the composer dependencies to find the problem. Mac OS Mojave changed the default SSH certificate type, which caused some interop issues. Finding that involved logging PHPSecLib's `Crypt_RSA` class to the point where it parsed the certificate! It felt _tremendous_ to fix!

We had a fascinating brown bag lunch on diversity and inclusion, organised by [DnA](https://diversityandability.com/). It's such a treat to work in a company that prioritises learning aggresively as Clearleft.

[Sergey](https://sergey.cool) got a lovely mention on [CSS Tricks](https://css-tricks.com/the-simplest-ways-to-handle-html-includes/). I was reading through the article about HTML includes thinking, "Oh, I can tweet to suggest Sergey", certainly not expecting to see the little critter in the post!

Homebrew was pretty good this week. I published a [tiny lesson](/blog/fancy-slack-meta-tags/) and [sorted out](https://github.com/trys/trysv4/commit/b8114923691eecd055bafbc8f4c362ef07ba4369) the `<head>` of my website. This should make OpenGraph output a bit nicer.

I also wrote a post on [API response design](/blog/coding-with-contracts-api/) in the first of a series on 'coding with contracts'.

I went for my first 'run' on Monday evening. It was pretty tought, but I just about survived. My hamstrings weren't so sure on Wednesday; the Clearleft stairs were quite the struggle. Still, I managed ~2.5k!

In less welcome news, the old insomnia is creeping back again. It's not an issue getting to sleep, but I'm waking way earlier than I need to. Sleep has never been an issue till last November. Since then, bouts of awful sleep have come and gone and I'm not particularly sure why. Something to monitor.

Danielle is leaving Clearleft next week 😞 so we've been doing a spot of handover in readiness for the interim period between now and [her replacement](https://clearleft.com/team/jobs/head-of-front-end-development) starting.

Finally, I made a start on a new side project, which I'm hoping to share a bit more about next week. No doubt inspired by [Cassie](https://twitter.com/cassiecodes)'s relentless creativity, I'm really enjoying making fun web things again!

## Songs of the week

- [Nothing Else - Angus & Julia Stone](https://open.spotify.com/track/33ZjZqqFuGRTPjNVqO0h8o)
- [Vessel - Jon Hopkins](https://open.spotify.com/track/61MCvDqpGjGYd37u98qeyF)
- [Motives - Davis John Patton](https://open.spotify.com/track/58XCB33rWd3wi73d4luOwY)

## Photos of the week

I hardly took any photos this week 😐 need to up my game.