---
title: "Implementing light-dark()"
year: 2025
date: 2025-01-14
categories: Web
tags:
  - website
  - digital-gardening
  - css
---

I used the train journey home to swap out my class-driven dark mode, to use the shiny new `light-dark()` function. It's flagged as 'newly available' in [baseline](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark), so a personal site that attracts nerds feels like the right place to test it out. It was all pretty painless to swap to. What was:


```css
:root {
  --site-bg: var(--light);
  --site-chrome: var(--white);
  --site-text: var(--dark);
}

:root.dark {
  --site-bg: var(--darker);
  --site-chrome: var(--darkest);
  --site-text: var(--white);
}
```

Has become:

```css
:root {
  color-scheme: light dark;

  --site-bg: light-dark(var(--light), var(--darker));
  --site-chrome: light-dark(var(--white), var(--darkest));
  --site-text: light-dark(var(--dark), var(--white));
}

:root.dark {
  color-scheme: dark;
}
```

This is a powerful syntax. Here, I'm setting `color-scheme: dark;` on `:root`, but there's nothing stopping you from redeclaring that any number of times in your CSS, and switching the value. Take this contrived layout:

![A slice of a website, with several paragraphs separated by a full width block that uses dark mode, but contains a child that's in light mode.](/images/blog/light-dark.png)

Your page could be declared with `color-scheme: light`, then, in one line, switch all colours in the full width slat using `section { color-scheme: dark; }`, then, switch it right back to `color-scheme: light;` on the form within.

This is the genius of leaning into the cascade. We opt these specific variables into a syntax that ties the values to a toggle. Flip the switch and every value beneath recalculates.

For the back-of-the-frontend engineers out there, we've just changed some state in our `:root` context, and all the components have re-rendered. Hey, maybe if we rebadged the Cascade as CSS's version of React's Context, we could round up a few more converts!

This approach really brings me joy; it was at the heart of my [CSS lock refactor](http://localhost:1313/blog/refactoring-css-locks/) that brought about [Utopia](https://utopia.fyi).

The only gotcha I stumbled over was with gradients. `light-dark()` only accepts `<color>` values, not `linear-gradient()` or other colour functions of that ilk. Syntax like this **won't work**:

```css
section {
  --gradient-a: linear-gradient(red, blue);
  --gradient-b: linear-gradient(orange, purple);
  background: light-dark(var(--gradient-a), var(var(--gradient-b)));
}
```

You have to flip it, and put the result of `light-dark()` into the `linear-gradient()`:

```css
section {
  background: linear-gradient(
    light-dark(red, orange),
    light-dark(blue, purple)
  );
}
```

It makes the gradient syntax less readable, IMO, but some thoughtfully named custom properties could easily paper over that crack.
