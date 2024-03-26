---
title: "Prototypes, production & fidelity layers"
date: 2024-03-26
categories: Web
description: "Finding the fidelity sweet spot"
---

The mindsets for writing production and prototype code are often portrayed as binaries. Production code needs to be solid, serious and battle-hardened, whereas the fleeting nature of prototypes means they can be approached with less attention to detail and a 'good enough' mindset.

But if I learned anything from working at a startup that ran out of runway, it was that so much of our production code is ultimately fleeting. It doesn't matter how many hundreds of thousands of lines were committed in good faith by great engineers, decisions outside our control usually dictate their lifespan.

Production and prototypes exist, not as a binary, but on a spectrum. We don't build 'a web application', we build hundreds of features, components and business that unite to form an application. Each of these chunks exists along this spectrum, and don't *have* to be placed in the production camp. Not from day one. We can play with the form.

## Identify your layer

Stewart Brand's [pace layers](https://doi.org/10.21428/7f2e5f08), despite becoming design thinking cliché, continues to be a useful expression of organisational structure.

![An illustration of pace layers with concentric rings from nature through culture, governance, infrastructure, commerce, through to fashion](/images/blog/pace-layers.webp)

The concept maps a healthy civilization, where components operate independently with different change-rates, scales and speeds. The inner layers are slow, powerful and not easily shaken. The outer layers are quick, adaptable and attention grabbing.

At a meta-organisational level, this explains why startups can move nimbly but exist precariously. Well-established companies take time to react, but weather many storms.

Within an organisation, you'll no doubt be able to think of a handful of factions, departments and components and place them on different pace layers. Identifying which layer your project exists in is a useful test for deciding the fidelity required.

Code that touches systems in the inner rings should be treated with respect. It will likely exist for longer, influencing the layers around it making it harder to unpick. Projects or features sitting further out are inherently more experimental, and more likely to change.

## Coupling & Postel's law

*"Be liberal in what you accept, and conservative in what you send"*. Jon Postel wrote this in an early spec for TCP/IP, the most foundational protocol for the internet and the centre of the [web's pace layers](https://adactio.com/articles/16334). Getting this contract right required the ultimate slow, powerful, production-driven mindset.

Services must interface to form useful web applications. Any cross-organisational join requires planning and communication between the relevant parties. It needs a production mindset to build a [solid contract](/blog/coding-with-contracts-api). An irreverent approach here leads only to unintended consequences or tight coupling between services.

Fortunately, we're not all building products as foundational as TCP/IP. We're often working on components or features that are, for the most part isolated to our own squads. As long as we get the contract right, we can play with the level of fidelity in approach and delivery.

## Defining quality

It would be easy to jump to the conclusion that fidelity === quality, and that I'm advocating we're ship services of lower quality. But I don't think it's that clear cut. Quality can be measured in all manner of ways and at a number of different altitudes.

Testability, design accuracy, data timeliness, interoperability, measurability, adaptability. These [non-functional requirements](/blog/prioritising-requirements/) (spot the -ilities) are not foregone conclusions. They can be prioritised and ranked per organisation, project and feature. Some features require data timeliness above all else. Other features could sacrifice that to prioritise the pace of adaptability, or even just simply to ship quicker to see how it tests in the real world.

I recently shipped a feature that has 'untimely data'; data that's a few hours, or up to a day old.

- Is it ideal? Of course not.
- Will the user notice? Probably not at this stage.
- Was it **months** quicker to ship? Without a doubt.
- Has it unearthed dozens of assumptions in our product. Absolutely.

Spending months on getting timely data would have simply delayed the discovery of these assumptions. We can now jump on these and ship solutions before we would have even launched the 'perfect' solution. The key was identifying that this non-functional requirement wasn't actually as important as getting people onto the product. But it wasn't a gung-ho decision or solution; we considered the contract for this feature so that when live data becomes available, it's effortless to patch the systems.

The less certain you are about a feature, the wider the ring you should attach to. Shipping something *good* in 3 weeks can trump shipping something *great* in 3 months, or *perfect* in 3 years. And if you've shipped the 'perfect' system but are left scratching your head as to why it hasn't worked, you might've chosen the wrong layer of fidelity.

### What if it all goes right?

If we hit a purple patch, and this feature exceeds our expectations, are we in trouble, or could we adapt quickly to meet this scale? If our feature is viewed as an experiment, rather than a certainty, smashing this goal gives us confidence to allocate more money / people / resources to this problem at the right time. We can also invest to move this down through the pace layers by hardening our approach, testing more, or even re-writing to something more performant.

### What if it all goes wrong?

If the feature flops, how hard will it be to pivot, or unpick this from our codebase? A project on a wider ring will be more loosely coupled to other services, and the impact of removing the service reduced. In other words, we've optimised for deletability.

## Finding the right slices

With any feature, there are a myriad of ways to tackle it. We should encourage the prototype mindset to consider the MVP version and the layer below that, and the layer below that, rather than jump straight to the inner rings of production fidelity.

A prototype is an experiment, a bet at what we _think_ will resonate with our users. These experiments celebrate success & failure equally; both are opportunities to learn. A psychologically safe space like this fosters innovation and gives agency to contributors to try new approaches.

This mindset does not equal lower quality. It requires real intentionality to pick the *right* approach, the vision to ensure you're not painting yourself into a corner, and the confidence to take a calculated risk.

Because when we take into account the feature lifespan, interdependencies, non-functional requirements, resources available, and desire for risk, you'd be surprised at how different your approach might be.
