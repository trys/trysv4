---
title: Currying in CSS?
date: 2020-02-26
categories: Web
description: Is this currying in CSS? Probably not, but maybe?
tags:
  - utopia
  - css
---

There were lots of interesting discoveries found whilst developing [Utopia](https://utopia.fyi/). This one came when declaring CSS custom properties.

Taking a card as an example, one would often start off with some CSS like this:

```css
.card {
  padding: 40px;
  background: #FAFAFA;
}
```

Then extract the values out for re-use across the website:

```css
:root {
  --card-padding: 40px;
  --card-background: #FAFAFA;
}

.card {
  padding: var(--card-padding);
  background: var(--card-background);
}
```

We've simply lifted the values out into the `:root` and replaced them verbatim with their variable counterparts. Nothing contentious to see here.

When working with [fluid custom properties](https://utopia.fyi/blog/fluid-custom-properties), I was desperately trying to refactor the equation to keep it as succinct as possible. It was at this point, I stumbled upon a strange property of custom properties...

> The value after the `:` in the CSS custom property does not have to be valid CSS.

It won't cause any errors, nor invalidate the custom property. It won't be evaluated in the browser until used, or more specifically, placed in a `calc()` function.

## What does this mean?

This means we can write concise CSS 'calculations' without worrying about wrapping every line in `calc()`s, and providing its wrapped when we use the property, it will be valid. When you finally run `calc()`, the browser (appears to) gather all the associated parts of the equation, and run them in one go.

The `--f-2` declaration below is not 'valid' CSS. But when used in the `font-size` with a `calc()`, it becomes valid:

```css
:root {
  --f-2: ((2 / 16 - var(--f-foot)) * var(--f-hill));
}

body {
  font-size: calc(var(--f-2) * 16);
}
```

## So what?

To me, this feels much like the two distinct actions of:

1. Defining a function
2. Calling that function

Which is kind of cool. I don't know whether there's more here, but I feel like there probably is.

Some way of currying in CSS, perhaps? I've likened currying to [priming 'code grenades'](/blog/pedalboard/#closures-and-currying), then calling them later? Who knows, I'm definitely gonna keep digging to find out.
