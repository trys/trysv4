---
title: "Figma plugins & asynchronous updates"
date: 2024-04-10
categories: Web
---

Utopia has two Figma plugins: [Fluid type & space calculator](https://www.figma.com/community/plugin/951884648789524000/utopia-fluid-type-space-calculator) and [Batch update text styles](https://www.figma.com/community/plugin/979005485047252094/utopia-batch-update-text-styles). Hopefully their names describe what they do.

They've both been updated to the latest [Figma specs](https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/), to support a feature they're calling "Dynamic Page Loading". The update process was pretty seamless, and very well documented. It predominantly involved migrating a number of functions from synchronous versions over to asynchronous counterparts.

However, running the type & space calculator in this new mode (before making any suggested changes) immediately threw up a bunch of issues. I sighed dramatically, then dug into what was going on. And lots of them! Race conditions! (sorry, the world always needs n+1 race condition jokes).

Where previously, a lot of the asynchronous issues in my code had been papered over by eager pre-loading, this new update shone an honest light on them. It made me realise just how fortunate we are to have great `async/await` support these days. It makes it effortless to split work into parallel chunks, or intentionally run things in non-blocking series. A train journey later and all the issues have been fixed.

If you do spot anything untoward with the plugins, do let me know!
