---
title: Linear Interpolation Functions
year: 2019
date: 2019-08-21
categories: Web
description: "Linear Interpolation isn't just for animation, it's amazing for data manipulation and a worthwhile tool to have in your coding arsenal."
---

I wrote a blog post some months back on [Linear Interpolation](/blog/linear-interpolation/). It was a subject I knew very little about at the time, having not done a great deal of animation work. But now I know a little more, I've found it's been one of those techniques I keep coming back to for most projects.

What I've learned is that interpolation isn't just about animation, or even about visual things—it's about **data conversion**.

<small>Aside: that might sound a bit heavy or dry, but it's how my brain works! I love how different coding concepts 'click' for different people in different ways.</small>

Among more traditional animation-y things, I've used these techniques to calculate rotary dial positions on the [guitar pedalboard](https://pedalboard.netlify.app/), mapped usernames to fallback avatars on [Daisie](https://www.daisie.com/) and plotted typographic graphs on a side project I'm currently building.

## The four functions

```js
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
```

<small>There's a Typescript version at the bottom of the page, if you're that way inclined.</small>

## Lerp

A <abbr title="Linear Interpolation">lerp</abbr> returns the value between two numbers at a specified, decimal midpoint:

```js
lerp(20, 80, 0)   // 20
lerp(20, 80, 1)   // 80
lerp(20, 80, 0.5) // 50
```

It's great for answering gnarly maths questions like: _"What number is 35% between 56 and 132?"_ with elegance: <code>lerp(56,&nbsp;132,&nbsp;0.35)</code>. My maths skills aren't all that, so it's great to have these up my sleeve.

Here's an example that converts a range slider set between 0 and 1, to a `hsl()` colour with hue degrees of 11 through 60.

{{% pen id="XWrNNRa" tab="result" %}}

---

## Clamp

The clamp method is wonderfully dull. You give it a number and then a minimum & maximum. If your number falls within the bounds of the min & max, it'll return it. If not, it'll return either the minimum it's smaller, or the maximum if it's bigger.

```js
clamp(24, 20, 30) // 24
clamp(12, 20, 30) // 20
clamp(32, 20, 30) // 30
```

It's really handy for preventing absurd numbers from entering a calculation, stopping an element from rendering off screen, or controlling the edges of a `<canvas>`.

Here's an example that lets you add or subtract 10 from the current number, but clamped between 0 and 100.

{{% pen id="xxKRdOP" tab="result" %}}

---

## Inverse Lerp

This works in the opposite way to the lerp. Instead of passing a decimal midpoint, you pass any value, and it'll return that decimal, wherever it falls on that spectrum. Internally it also uses a clamp, so you never get unwieldy values back.

```js
invlerp(50, 100, 75)  // 0.5
invlerp(50, 100, 25)  // 0
invlerp(50, 100, 125) // 1
```

This is great for scroll animations. Questions like _"How far through this section has the user scrolled?"_ can be neatly answered with code like:

```js
const position = el.getBoundingClientRect();
const howFarThrough = invlerp(
  position.top,
  position.bottom,
  window.scrollY
);
```

Here's an example that tracks the percentage scroll position of a target slab against the viewport.

{{% pen id="XWrNRze" tab="result" %}}

---

## Range

This final method is ace. It's a one-liner that converts a value from one data range to another. That might sound a bit arbitrary, but it's surprisingly useful. We pass in two data ranges and a value that sits within data range one (it will still be clamped).


```js
//    Range 1    Range 2    Value
range(10, 100, 2000, 20000, 50) // 10000
```

Taking the previous example up a notch, let's say that as the user scrolls through a section, we want to subtly move an element down the page by `150px`. The section is in the middle of the document, starting at `3214px` and ending at `3892px`, and we want to convert `window.scrollY` from the big range down to a value between `0px` and `150px`. That's a pretty nasty calculation to make, but `range()` makes it nice and clean.

```js
const position = el.getBoundingClientRect();
const transformY = range(
  position.top,
  position.bottom,
  0,
  150,
  window.scrollY
);
```

If the user is above the section, it'll be clamped to `0px`. If they're below, it'll be clamped to `150px`. And in all positions in between, it'll evenly interpolate between the values.

The final example takes the previous Codepen and maps the result against a `transform: translateY` range of `-20%` to `20%`. Parallax, eat your heart out.

{{% pen id="vYBymPq" tab="result" %}}

---

## Typescript version

```ts
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number
) => lerp(x2, y2, invlerp(x1, y1, a));
```


