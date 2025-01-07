---
title: Utopia WCAG warnings
date: 2024-01-29
categories: Web
description: "Warnings & WCAG 1.4.4"
tags:
  - utopia
  - css
  - accessibility
---

Another day, another Utopia update. This time, we're addressing some accessibility concerns that relate to fluid typography. [Adrian&nbsp;Roselli](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html) has been warning about the dangers of untested fluid typography for many years. The issue derives from the interplay of `vw/vi` units and browser zoom.

Where `rem` values increase when you zoom in, viewport units are not affected. The viewport _doesn't_ change when you zoom, therefore `1vi` must still equal 1% of the browser width.

Here's a CSS clamp function:

```css
clamp(1.62rem, 1.5041rem + 0.5793vi, 1.9531rem)
```

The middle argument combines `rem` and `vi` (sidenote: this is the bit that makes the value fluid). But if you zoom the browser in, only one half of that equation is getting bigger. Although Chrome has a 500% zoom limit, it might only equate to an ~150% text size increase. And [WCAG SC 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html) states:

> Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.

Most _'standard'_ fluid typography automatically meets this criteria, but as you use more dramatic typographic scales (eg. a larger disparity between minimum and maximum sizes), you can start to fall foul of this rule. Larger headings on larger screens can struggle to increase in size by 200%.

[Max Barvian](https://barvian.me/) has written a tremendously [in-depth dive](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) into why this happens, and more importantly, how to calculate _when_ it will happen. To top it off, as the creator of the fantastic [fluid.style](https://fluid.style), Max kindly shared the calculations with us to power this feature ❤️

[![A screenshot from utopia.fyi showing the new WCAG 1.4.4 warning callout that alerts you if any steps fail to meet this success criterion.](/images/blog/utopia-wcag.jpg)](https://utopia.fyi/type/calculator/)

As you generate and tweak your type scale, Utopia will now warn you if any steps fail WCAG SC 1.4.4, and tell you between which viewports the problem lies. Often, the simplest solution is to either lift the type scale at your minimum viewport, or lower the type scale at your maximum viewport.

{{< button "https://utopia.fyi/type/calculator/" >}}Utopia type calculator{{</ button >}}
