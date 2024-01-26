---
title: Utopia Updates
date: 2024-01-26
categories: Web
description: "CSS & SCSS generator updates"
---

Utopia has recently released two new plugins to npm: `utopia-core` and `utopia-core-scss`. I wrote about the [SCSS library](https://utopia.fyi/blog/utopia-core-scss) last week, so now it's time to dig into `utopia-core`.

[Utopia Core](https://github.com/trys/utopia-core) is a calculation library for [type](https://utopia.fyi/type/calculator/), [space](https://utopia.fyi/space/calculator/) & [clamp](https://utopia.fyi/clamp/calculator/). As Utopia has grown, a number of people in the web community have generously created library-specific generators including [Tailwind](https://github.com/domchristie/tailwind-utopia) & [StyleX](https://github.com/facebook/stylex/tree/main/apps/nextjs-example/app)!

To make it simpler to create future generators, we've published this library to handle the maths, so you can focus on the implementation details specific to your language/library. A WordPress theme.json generator is in the pipeline on the back of this work, so watch this space.

We're in the process of refactoring Utopia.fyi & our Figma plugins to use this library too, so there's a standardised set of calculations happening across all our tooling.

## CSS generator updates

On the back of that refactor, we've been able to ship some long-awaited updates to the CSS generators.

![A screenshot of the updated CSS space generator on Utopia.fyi, including CSS/SCSS tabs, a clamp/css locks toggle, a rem/px toggle and a viewport/container toggle](/images/blog/utopia-generator.jpg)

Firstly, if you're using the new [SCSS plugin](https://www.npmjs.com/package/utopia-core-scss), you can copy the SCSS config and paste it into your project.

Next, there's a new toggle for `rem/px` for the space & clamp generators. Depending on the design, you may wish to disconnect your spacing from browser zoom settings that affect `rem` values. Note, this **isn't** available for text generators for accessibility reasons.

We've updated the generators to use `vi` instead of `vw` units. This relates to the inline axis, rather than width, and respects the `writing-mode` value.

Finally, if you're using container queries, you can calculate your type scales relative to the container, rather than the viewport. I've personally been using this on a recent project and look forward to blogging about it soon.

## Open source

We're aware that Utopia isn't 'open source' right now, in that it doesn't have a public GitHub repository. This has historically been purely a time-driven decision. James and I work on Utopia when we can and much as we'd like to give more to the project, we simply haven't had the time & headspace to manage the administration of a truly open source library.

However, we have now opened up [utopia-core](https://github.com/trys/utopia-core) and [utopia-core-scss](https://github.com/trys/utopia-core-scss) on GitHub to dip our toes into this space, and look forward to any suggestions & contributions that come the project's way!
