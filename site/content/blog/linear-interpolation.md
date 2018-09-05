---
title: Linear Interpolation
date: 2018-09-05
categories: Web
description: Building native-like scroll-aware animations in JS
---

tldr; Native-like scroll-aware animations:

<video src="/images/blog/blur.mp4" type="video/mp4" controls style="width: 100%; margin-bottom: 30px;"></video>

## Learning about lerps

A few days ago, Matt DesLauriers [tweeted a beautiful lerp function‏](https://twitter.com/mattdesl/status/1031305279227478016).

```js
function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

lerp(0, 50, 0.5) // 25
lerp(20, 80, 0)   // 20
```

A lerp/linear interpolation function takes three values, `start`, `end` and `t` (sometimes referred to as `alpha`). The `t` value generally ranges between 0 and 1 and can be thought of a bit like a percentage range between 0 and 100. In the first example, a `t` value of 0.5 is like 50%. So the function returns the '50% position' between 0 and 50: **25**

## Inverse Lerp

Lerps are great for setting values, ie. we're 50% through the transition from 20 to 40, therefore set the value as 30.

But how do you actually calculate how far through the transition you are?

<small>_Word of warning, I'm still learning about lerps so this approach may have holes!_</small>

An **inverse lerp** function returns the `t` position.

Say you want to react to the scroll position between 0 and 100px. Let's call them `a` and `b`. With the following inverse lerp, you pass in `a`, `b` and the scroll position `v`.

```js
function invlerp(a, b, v) {
  return ( v - a ) / ( b - a )
}
```

This is a 'true' invlerp function and if you provide a `v` value that exceeds `b`, the value returned will be greater than 1, which may not be what you're after. A clamp function can help this - it'll hold the value between two limits, usually 0 and 1. Once ES6'd, they look like: 

```js
const lerp = (x, y, a) => x * (1 - a) + y * a
const invlerp = (a, b, v) => clamp(( v - a ) / ( b - a ))
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
```

## Putting it all together

Let's control some CSS with the scroll position. This uses CSS custom properties to pass the value from JS to CSS.

```js
(function() {
  const item = {
    y1: 70,                // Scroll tracking start point
    y2: 120,               // Scroll tracking end point
    property: '--profile', // CSS Custom property
    from: 1,               // CSS property lower limit
    to: 0.5,               // CSS property upper limit
    value: 0               // Starting point
    suffix: null           // Optional suffix (px, deg, turn)
  }
  
  const scroll = () => {
    // Calculate where we are between y1 and y2
    const n = invlerp(item.y1, item.y2, window.scrollY)
    if (item.value !== n) {
      item.value = n
      // Run the visual updates in the next available frame
      window.requestAnimationFrame(() => {
        // Calculate the new value with the invlerp result
        const property = lerp(item.from, item.to, item.value)
        // Set the CSS Custom Property
        document.documentElement.style.setProperty(item.property, property + (item.suffix || null))
      })
    }
  }

  // Run when we load and scroll
  window.addEventListener('scroll', scroll)
  scroll()
})();
```

This code essential converts the scroll position (between 70px and 120px) to a value between 1 and 0.5! This can then be set to any CSS property, for example, scaling an image:


```css
img {
  transform: scale(var(--profile));
}
```

## Social profile example

In the video at the top of this post, the blur of the hero image and the size of the profile picture are altered on scroll. The code is very similar to the example above, but I've wrapped it all in a loop to control more than one value:

```js
(function() {
  const items = [
    {
      y1: 70,
      y2: 120,
      property: '--profile',
      from: 1,
      to: 0.5,
      value: 0
    },
    {
      y1: 0,
      y2: 120,
      property: '--hero',
      from: 0,
      to: 20,
      value: 0,
      suffix: 'px'
    }
  ]
  
  const scroll = () => {
    items.forEach(item => {
      const n = invlerp(item.y1, item.y2, window.scrollY)
      if (item.value !== n) {
        item.value = n
        window.requestAnimationFrame(() => {
          const property = lerp(item.from, item.to, item.value)
          document.documentElement.style.setProperty(item.property, property + (item.suffix || null))
        })
      }
    })
  }

  window.addEventListener('scroll', scroll)
  scroll()
})();
```

```css
header img {
  transform-origin: 0% 115%;
  transform: scale(var(--profile));
}

.hero {
  filter: blur(var(--hero))
}
```

The end result:

<video src="/images/blog/blur.mp4" type="video/mp4" controls style="width: 100%; margin-bottom: 30px;"></video>

{{< button "https://codepen.io/trys/pen/XPaYBj/" >}}Codepen{{</ button >}}


## Taking it too far

If you can control two things, why not four! The core code can stay the same thanks to the loop. It's a case of passing in a few extra items to track, and setting up the CSS:

```js
const items = [
  {
    y1: 70,
    y2: 120,
    property: '--profile',
    from: 1,
    to: 0.5,
    value: 0
  },
  {
    y1: 70,
    y2: 120,
    property: '--turn',
    from: 0,
    to: 1,
    value: 0,
    suffix: 'turn'
  },
  {
    y1: 0,
    y2: 120,
    property: '--hero',
    from: 0,
    to: 20,
    value: 0,
    suffix: 'px'
  },
  {
    y1: 0,
    y2: 200,
    property: '--bg',
    from: 100,
    to: 300,
    value: 100
  },
]
```

```css
header img {
  transform-origin: 0% 115%;
  transform: scale(var(--profile));
}

header {
  transform: rotate(var(--turn));
}

.hero {
  filter: blur(var(--hero))
}

main {
  background: hsl(var(--bg), 30%, 70%)
}
```

<video src="/images/blog/far-too-much.mp4" type="video/mp4" controls style="width: 100%; margin-bottom: 30px;"></video>

This is clearly over the top! But it shows how you can animate all manner of CSS values based of scroll position. And this example could be extended to handle resize events, time changes, maybe even the Ambient Light API!

{{< button "https://codepen.io/trys/pen/22eb1cf7a026727011a85d5077c5bc3b" >}}Codepen{{</ button >}}
