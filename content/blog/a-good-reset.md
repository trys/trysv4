---
title: A good reset
year: 2022
date: 2022-07-26
categories: Web
description: A response to Jeremy's post on "Control", and why developers opt for divs, not buttons
---

In a [recent post](https://adactio.com/journal/19315), Jeremy discussed a possible reason for developers not reaching for native HTML elements like `button` or `select`, and instead recreating them with `div`s, JavaScript and ARIA:

> But I now understand that someone else might hear that there’s a native HTML element—like button or select—that comes with built-in behaviours around interaction and accessibility, and think “Uh-oh! What if there unexpected side-effects of these built-in behaviours that might bite me on the ass?

But I wonder if there's a simpler explanation.

The one common feature between every codebase I've encountered on that doesn't use `button`s well, is a **bad CSS reset**. Developers try to use a `button`, and find that it still looks like a native browser button, so they grab a plain old, blank canvas `div`, and build from there.

Adding a good CSS reset to an established codebase _is_ tricky; the side effects of changing very global element styles can be unknown and far-reaching. But if you can get your `button`s looking as plain as a `div` from the start of a project, there's very little reason not to use the proper element.

I tend to reset my `button`s to look like any other text element, then layer on styling with classes. But by having the blank canvas to begin with, you won't be fighting against yourself when additional `button` variants come along.

```css
button {
  -webkit-appearance: none;
  border-radius: 0;
  text-align: inherit;
  background: none;
  box-shadow: none;
  padding: 0;
  cursor: pointer;
  border: none;
  color: inherit;
  font: inherit;
}
```