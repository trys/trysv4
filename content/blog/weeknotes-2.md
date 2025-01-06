---
title: 'Weeknotes #2'
date: 2019-03-22
categories: Weeknotes
---

One of the original intentions for [JournalBook](https://www.jounalbook.co.uk) was to act as a reminder of day-to-day life. It has become very useful when compiling these weeknotes to have a daily summary to hand. But also as noted at the time:

> I’m a creature of habit, and most days blend into one routine, so pulling out differences can be a challenge.

Even in quite a 'normal' week, I've noticed there is variety each day. I'm fortunate to work in a creative role where every day brings different challenges. Anyway, let's crack on...

Our lil' frontend team has been down a member these past two weeks, with Tim galavanting in Japan - [read his weeknotes here](https://www.novis.co/post/weeknotes-0/). Emma and I have been busy rolling out features and tidying up the codebase in his absence.

I spent some time working on 'search' for daisie - it'll be great to see this rolled out to start rounding out our discovery offering. After the ease of [last week's](/blog/weeknotes-1/) feature 'snapping together', this was a bit more fiddly.

Subtle design changes are often the most challenging; when the work is considerably different, there is no option but to write new code. But it's when new UI is _close-ish_ to existing components, there's a decision to be made. In this case, I was able to add a few new props to bolster our existing generic components, but you start to run the risk of bloating components to the point of confusion.

In many ways it's like car manufacturers. D'you remember the Mk.1 VW Golf? It was a small car! Now take 40+ years of 'new features', and the car is not only 2ft longer, VW have introduced two smaller cars into the range to cover that part of the market. As components bloat, we can easily find ourselves recreating the simple base components we started out with. Sorry, tangent over.

I did a bit of prototyping for a new feature we're experimenting with. In many ways, this feels like a potential 'pivot' point in the making. That doesn't come without challenges, especially when there's a desire to see the feature introduced swiftly.

After being given the go-ahead on Tuesday lunchtime, I set about prototyping. The train journey to and from London provided a [great space](https://twitter.com/trysmudford/status/1108274460342263808) to get it working and come Wednesday morning, there was something to show. Unfortunately (yes, there's a twist in the tail), I was given the go-ahead too eagerly. The design team proudly presented a new design for the feature I'd literally just built, and once again my heart sank - this isn't the first time this has happened.

One of the biggest lessons learned from the past 6 months is patience, and in many ways, caution. Sadly, it's been mostly taught in hindsight. There's a full blog post in this so I won't go on about it now...

Wednesday also included trying a Macha latte for the first time, and then feeling ill for the rest of the day. Plus a 2.5 hour journey home! It wasn't a classic.

We've been working with an infrastructure consultancy firm these past few weeks and it's been fascinating watching them prepare our pipelines for production. But it has also made appreciate yet again, how truly great Netlify is. We needed a space to test this prototype, and whilst our dev environments are being finalised, another environment was required. I built the site locally, dragged the folder onto Netlify, and ten seconds later, we had a new dev environment!

Friday was been spent battling cache invalidation bugs and working on the admin CMS. There's next to no client-side JS and surprise, surprise, it's one of the quickest things we've built, and an absolute joy to use!

## Songs from the week

- [Fear - Ben Rector](https://open.spotify.com/track/7zSmIcTiLVW5rMflzXj9C5)
- [Fuel on the fire - Bear's Den](https://open.spotify.com/track/2ZsHg7kRuIiEtbsXhzGP2x)

## Photos from the week

![Land Rover Defender at the station](/images/blog/weeknotes-2.jpg)

## Videos from the week

{{< youtube "CzJ94TMPcD8" >}}
