---
title: "It's all about that space"
date: 2022-11-23
categories: Web
description: "'bout that space. Not 12 column grid systems."
tags:
  - utopia
  - css
---

I've been working with [James](https://www.hustlersquad.net/) on the new [Utopia Grid Calculator](https://utopia.fyi/grid/calculator/), the latest tool in the Utopia arsenal. It asks for four pieces of information:

- Gutter width @min viewport
- Gutter width @max viewport
- Column width @max viewport
- Number of columns

Combining these four values creates a fluid grid:

![A screenshot of the Utopia Grid Calculator, with a table of results, and a live visualisation of the grid.](/images/blog/utopia-grid-calculator.jpg)

Under the visualisation, there's a CSS generator. On the first iteration, it included the line:

```css
.u-grid {
  grid-template-columns: repeat(var(--grid-columns), 1fr);
}
```

That might seem reasonable given the user has just asked for X columns. But something didn't feel at all right about that line.

When I said earlier that those four values created a fluid grid, that wasn't entirely true. What we've created is a fluid container that can be used as a grid with fluid gutters. The columns inform the size of the container. But what you choose to do with that container is entirely up to you. A grid is a complex and nuanced beast that is so context & content dependent, that making assumptions within a tool like this is fruitless.

I've always avoided boot-windy grid systems. They're heavy and designed for the 'average' website, never truly catering for the intricacies of your design. They provide all the classes in the world to push/pull columns at whatever breakpoints they deem 'correct', but without knowing what lives inside your rectangles, they are ultimately blunt tools.

## The 12 column illusion

The grid is a designer's tool. It assists in getting things to be the right size, and as Lex reminded those at FFConf, [in balance](https://noti.st/loftio/wDxO6z/design-for-developers#sagiuf4). But the 12&nbsp;column grid itself is an illusion, or at best a fading artefact of the emergent design.

We've settled on 12&nbsp;columns, not because we necessarily need <span style="white-space: nowrap;">1-3-7-1</span> layouts, but because it divides neatly and in multiple ways. It's flexible. What we're _really_ looking for is halves, thirds and quarters to be rendered in context of the available space.

It all comes down to: **fractions and the spaces between**.

Utopia is concerned about the latter, about how your fractions slot together, and whether they feel in harmony with the overarching design. It's why, by default, our [grid calculator](https://utopia.fyi/grid/calculator/) visualises gutters, not columns. Get the gutters right, and the rest will follow. Or as [Alan&nbsp;Moore quotes](https://medium.com/@alansmlxl/the-space-between-the-lines-6ed1a78059a8):

> ‘I start with the space between the lines.’

## Required further reading

If you've got this far, do read the entirety of [gridless.design](https://gridless.design/). [Donnie D'Amato](https://twitter.com/donniedamato) has done a remarkable job in articulating the flaws in the grid systems we've come to accept. [Brad Frost has also recently written on the subject](https://bradfrost.com/blog/post/layout-grid-in-design-systems/), specifically from a design systems' perspective. It's well worth your time.
