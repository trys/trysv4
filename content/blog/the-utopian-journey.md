---
title: The Utopian Journey
year: 2024
date: 2024-03-22
categories: Web
description: Spotting your design team on the fluid responsive design spectrum
tags:
  - utopia
  - css
  - design system
---

When chatting to design teams about Utopia, the most common question is: *"But where would we even start?"*.

Identifying the current state of play for your company is a good first step. You may be part way along the journey without realising. I'm sure we can all smell when a system isn't working as well as it could, and when wholesale changes feel overwhelming, we often patch the system with short-term-gain fixes.

This journey doesn't have to be linear, so I think it can help to see what steps might be ahead of you, so you can decide whether the short-term fix, or long-term solution is best next move.

## The path towards systematic heaven:


1. **Bespoke chaos** - with no system in place, every type size is decided in isolation and needs to be measured (read: guessed at) by developers.

This is the wild west, but it's pretty common, particularly in single-person design teams, where a system feels overkill. In fact, it's default position that our design tools leave us in when we create a new document. This process needs some boundaries and constraints.

**→ Common solution:** You add a set of static type sizes and apply them to elements. If you're feeling systematic, you might use a static modular scale to generate harmonious typography, but it's not responsive. All sizes are tied directly to HTML elements (eg. our H1 size is 40px).

---

2. **Undesirable layouts** - Your H1 might look good on large screens, but it's chuffing massive on small screens.

**→ Common solution:** You patch these problems with a breakpoint at an <code>&lt;insert-topical-css-framework&gt;</code>-defined size (768px, 1024px, 1440px etc.) by mapping H1 to another static heading size.

---

3. **Semantic gymnastics** - Your H1 is styled as a H3 on mobile, and a H1 on desktops.

**→ Common solution:** You realise tying semantics and size was a mistake so you extract the sizing into a class, and apply that to the appropriate heading elements.

---

4. **Brokepoints** - [buy the t-shirt here](https://utopiafyi.teemill.com/search/?search=brokepoints)

- Small screens looks 👍
- Large screens looks 👍
- In-between screens looks 🥴

You've used a breakpoint to update the sizing class at an arbitrary point, so inevitably, when the viewport is 1px below the breakpoint, everything looks too small, and 1px above, everything looks too big.

**→ Common solution:** Design more! You design a 'tablet' sized design, and a small desktop, and a big mobile, and a...

---

5. **Busy work** - Designers mindlessly churn out static screens, setting the 'best' size per element at each viewport, developers spend hours matching them. You think more breakpoints = more control, but in reality, it's just more inconsistency and more code. And now you have 6 designs to maintain.

Your design tools are a matrix of pages → and breakpoints ↓, and it almost feels like a game to create a complete prototype for every screen size. But a really miserable and expensive game.

This is the reality for so many design team; inertia brings you to this point and you ask the question: "Is *this* the responsive design we were promised?".

## The Utopian solution

You take a step back, and realise that trying to impose control was a fool's errand. So you relinquish control and write a handful of declarative, fluid rules to govern your system. You implement your first fluid responsive design system and...

6. **Utopia emerges** - you're designing fewer screens than ever because everyone on the team understands what will naturally happen on different viewports. Your designs are harmonious, and accommodating of content changes, and you have a common language between design & engineering that makes snagging conversations so much simpler.

Sound good? [Check out Utopia](https://utopia.fyi).
