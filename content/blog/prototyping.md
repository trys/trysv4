---
title: "On Design Engineering: Prototyping"
date: 2021-02-16 10:00:00
categories: Web
image: /images/blog/og-de-2.jpg
description: "How do we prototype as design engineers?"
---

{{< alert "Series" >}}
This post is part of a series on Design Engineering. You can read the [main post](/blog/i-think-im-a-design-engineer), or the post on [design foundations](/blog/design-foundations)
{{</ alert >}}

## Why prototype?

A mid-to-high fidelity prototype helps you answer the niggling questions quickly, and more importantly, in the browser. The final medium for any web design is ultimately the browser, so the quicker you can get your design onto real devices, the quicker you can validate your design & product assumptions.

### Prototypes unearth UX assumptions

Prototypes unearth UX and product assumptions, and shine a light on what's possible. An early prototype in [Wildlife Photographer of the Year](https://www.nhm.ac.uk/wpy/) pulled in 10 years of the photographic archive onto a single page, laid out in a tight masonry grid—the first time that had been done with this archive. We were mesmerised by the quality of images all in one place, and knew we had to make this a reality in the final product.

It also made us realise how easy it would be to 'cheapen' the fantastic content by making it too easy to consume all at once. So the UX team began working out how to add a degree of friction back into the design to ensure the end result would still be gratifying.

### Prototypes get buy-in

Getting the funding or go-ahead for a large project can be a big ask. If it's a big step of faith, consider pitching for a smaller amount of time/money and investing in a prototype to see if the idea is even achievable. Regularly, the best outcome of a prototype is a confirmation that the idea is flawed, the market is missing, or the approach is impossible.

Prototypes also lift morale in a project team, giving the team hope that the project is do-able. For nervy stakeholders, an early prototype can be hugely reassuring. All those gnarly little problems that make a project initially seem scary and huge can be broken down into manageable chunks and tackled early.

### Prototypes are deliverables

Prototypes can act as deliverables to an engineering team, particularly if they are an off-site team. That could be a single component, all the way up to a full set of page templates. Rather than supplying the engineering team with a 'picture of a design', we can supply them real code to copy, adapt and evolve.

Some engineering teams function best if you create the design in its entirety in code-form. It leaves them to focus on doing the dev-heavy coding, integrating your responsive and interactive templates directly.

### Prototypes promote user testing

Another benefit of a prototype is testing. Validating our design ideas before they get to production helps prevent surprises, and often surfaces the incorrect assumptions and unconscious biases we put into our products.

When we test with a 'picture of a design', the image quality, device-specific scaling, and dead links often to become the focus for participants. By testing a high-fidelity prototype in the browser, we lift these stumbling blocks and the participants can be fully focused on a product tailored to them. In our experience, this generates better insights.

### Prototypes help you focus on the things that matter

It's very common to 'time-box' a prototyping session to ensure it doesn't get out of hand. Reducing time is a great prioritisation tool. It focuses you on the must haves. Spend the time breaking down this things that really matter. A prototype can cut corners on the known-knowns, to let you focus on the challenging, or unknown parts.

Having a distinction between prototype and production work can be important to impress on stakeholders; it can be too easy to mistake a coded prototype for the final result, tricking people into thinking the product is ready to ship.

{{< alert "Tip" >}}
I find that train rides are a great place to prototype. Sketchy internet and limited timeframes force you to build light and quick.
{{</ alert >}}

## How I prototype

Prototypes are perfect both for learning new languages in a safe environment, and also working quickly in a language you already know. There's _nothing_ wrong with a classic HTML, CSS, JS stack for prototyping. In my opinion, there's also nothing wrong with a single-page application for prototyping. Currently, I gravitate towards Preact, Nuxt.js, or Eleventy for my prototype work. They all get out of your way and let you get to work fast. You don't really want to spend a day configuring webpack when you could be writing _actual_ code.

The only pre-requisite I’d suggest is to use a stack that you can deploy easily. There’s nothing worse than getting something working locally, then finding you can’t host it without an AWS degree or pricey hosting. [Netlify](https://www.netlify.com/) is a prime space to host lightweight prototypes.

If it's helpful, consume real data in your prototypes by hooking into live API's. Eleventy has an `_data` folder [fetches data at build time](https://www.11ty.dev/docs/data-global/) and exposes it as a global variable. Live data is particularly important if you're building data visualisations or anything that takes 'extremes' of user generated content.
