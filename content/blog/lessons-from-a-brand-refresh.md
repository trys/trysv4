---
title: Lessons from a Brand Refresh
year: 2025
date: 2025-04-09
categories: Web
image: /images/blog/motorway-cvt.jpg
tags:
  - design system
  - design engineering
---

I've had the pleasure of leading the engineering rollout of a pretty exciting brand refresh for [Motorway](https://motorway.co.uk/). Called onto the project in early February, the task was to manage and implement the rollout across our entire digital platform. Motorway is a complex car marketplace, with multiple consumer-, dealer-, driver-, and internal-facing products.

![A banner graphic with the updated Motorway logo, and a blue hatchback car on top of some triangular shapes](/images/blog/motorway-refresh.jpg)

On March 17th, we successfully and smoothly launched the refresh to 16 web and native applications. I wanted to share some lessons learned along the way.

## The importance of a design system

Unsurprisingly, the biggest asset in this project was our solid design system: The Highway Code. Since 2022, a small team of dedicated designers & engineers have cultivated this system, ensuring it does _just enough, but not too much_. This atomic and foundational system allowed us to fundamentally refresh our wider visual language and update our components.

I cannot stress how impossible and painful a task this would have been without this design system. Speaking of...

## The pain of frontend tech debt

Design systems can only be the panacean "single source of truth" _if_ they are the only source of truth. Our reality is three design systems: The Highway Code, and two legacy component libraries that have never properly been deprecated. Totally removing these libraries wasn't feasible in the time we had, so compromises had to be made.

Firstly, all legacy colours & typographic references within consuming applications were removed and replaced with references from The Highway Code. We could release this change long before go-live day safe in the knowledge that when the design system was updated, all colours & typography would also be updated. We also updated as many legacy components to use The Highway Code as time allowed, again, reducing the risk of functional changes on go-live day.

In a bid to reduce the number of application launches needing to be synced up, I opted to use CSS custom properties & fallbacks to control the legacy library components from The Highway Code. For example, a legacy multi-select component needed a `border-radius` update, so I wrapped the existing value in a custom property:

```css
.multiselect {
   border-radius: var(--thc-input-border-radius, 4px);
}
```

This meant I could safely pre-release the (admittedly quite flaky) legacy systems, safe in the knowledge that no visual changes would occur until The Highway Code updated that custom property. It's not perfect to form this tie, but as a stopgap until the legacy systems are deprecated, it worked pretty well in reducing launch risk. Along the way, we also removed 20% of the legacy components, which was a nice bonus.

## The challenge of ambition

The "easy" option in a brand refresh is to just update colours & typography, slap on a new logo, and call it a day. But that didn't sit right with us. Brand refreshes are pretty unique opportunities to focus on UI over user flows & product features. Although we didn't want to touch fundamental UX patterns, we did want to use this opportunity to improve accessibility, performance and usability through good UI practices.

We improved colour contrast, typographical hierarchy and legibility, reduced page weights, and simplified a good amount of visual clutter. We sweated the details on animations, iconography and micro-interactions, and even made some fundamental and scary changes to our space & typographical design token naming conventions, knowing that the opportunity to touch every CSS file doesn't come around often.

Naturally, I also used it as a trojan horse for some [fluid CSS](https://utopia.fyi).

![A screenshot from the Motorway product, showing a hero image & MOT checker form](/images/blog/motorway-cvt.jpg)

## The benefits of prioritisation

The design team was given a divergent brief to apply this brand refresh, which led to a huge quantity of design ideas that gradually converged to a consistent but ambitious design language update. In a product as large as Motorway, we had to be ruthless in the rollout prioritisation.

Estimating on an evolving design across 16 applications is a tricky task. Understandably, executives like to know _what_ would be shipping on the 17th March. We knew we couldn't build _everything_, but, as mentioned before, also had the ambition to go well beyond just colours and typography.

Using a ['MoSCoW'-esque](/blog/prioritising-requirements/#exercise-moscow) exercise (Must do, Should do, Could do, Won't do), we set about categorising the biggest design changes into P1's, P2's & P3's. We committed to completing all P1's by the 17th, building from there if time allowed.

Foundational design system updates were all P1's, as was the application of the updated system to all consuming services. It was important to me that no system got left behind, including internal ones. For consumer-facing services, we committed to updating home, account and vehicle profiling flows, and for dealer-facing services we updated all logged out pages, and the key bidding screen. I've seen enough brand refreshes in my time to know that patchy or half-baked design rollouts are glaring and abrasive.

We felt quietly confident that we could complete the P1's and make good headway through the P2's before go-live. Under-promising and over-delivering always pays off in these scenarios.

However, the challenge with a list of categorised line-items, is its still pretty hard for executives to _see_ what will actually be going live...

![A screenshot from the Motorway product, showing a banner advertising Motorway Pay](/images/blog/motorway-outline.jpg)

## The power of a good demo & release candidates

With the design team creating the "visual north star", we didn't want to spend precious design hours mocking up interim views, especially if we felt we could get through the P1's and onto P2's & P3's. Thanks to the design system & our CI setup, we were able to produce release candidate versions of the system on every commit, and apply that to our key consuming applications. So rather than Figma-ise a make-believe middle step, we could render exactly what the product would look like if we did nothing more to the product, other than apply the design system update.

We could then side-by-side the "north star" and the "worst case scenario" and present it to the executive team, explaining that all P1's would be at the north star level, and P2/3's would look _at least_ as good as the release candidate application, and almost certainly better. This calmed all nerves and got us the green light to proceed without wasting any design effort.

These release candidates then served as consistent staging applications that could be shared widely with the team so there were no surprises come go-live day.

## The guard against conversion

We were naturally very cautious about the potential for conversion impact in this project. With the best design intent, user research and data in the world, there's still no guarantee that a design refresh won't have a negative impact on conversion. To mitigate this, we ran a number of A/B tests ahead of the launch, testing any functional changes before the 'big day' so we could be sure the new designs were at least at parity with the old ones.

## The importance of a solid release process

As we approached go-live, we'd completed all P1's, all P2's and a good number of P3's. Our release candidates were in a great place, and we'd reduced risk as much as possible. The final step was to create a solid release plan.

No-one likes big-bang releases, but for a project like this (one that used so much SCSS & CSS), it was impossible to use feature flags. We spent time with product managers to understand what features were being rolled out as we were building to ensure they were all visually compatible, and we merged `main` into the 16 release branches daily to reduce conflicts. Through All Hands, and regular Slack messages, we communicated the go-live plan with the whole company, informing when code freezes would come into place, when the release would happen, where they should report bugs/incidents, and when code thaws would take place.

Each application had a bespoke go-live checklist, with links to the pull request, release candidate and relevant product dashboards, and a visual ticklist of each step that would need to take place on the day.

On the big day, we methodically worked through each checklist, and got through all 16 applications in a matter of hours. There were no hiccups, challenges or downtime—it was all incredibly calm and smooth. We watched the numbers like hawks over the coming days and saw no negative conversion impact whatsoever. A week on from the launch and we all breathed a sigh of relief and celebrated a job well done 🍾

## The ideal job for a design engineer

This project was **perfect** for me (and would be for any other design engineer). There was a huge degree of design ambiguity, as well as a lot of plates to spin. Touching every CSS file and changing every page is no small beast, and potentially one that a "software engineer" would shy away from, or wish to break into smaller chunks.

But for a design engineer, it was an absolute dream. Designers and I were able to rapidly iterate in the browser, using design & engineering sensibilities to quickly make decisions and avoid wasted Figma time. I absolutely love being the glue between design & engineering, and this project was a perfect example of how that can work in practice.

This post is getting long so I might follow up with another going into some of the design details and fun engineering challenges we faced along the way.
