---
title: Refactoring CSS Locks
date: 2020-02-06 16:00:00
categories: Web
---

In our first [Utopia.fyi](https://utopia.fyi/) release, I stumbled upon an elegant way to re-use [CSS locks](https://blog.typekit.com/2016/08/17/flexible-typography-with-css-locks/).

In a traditional CSS lock, we have a `@media` query that locks the selectors when they reach the max viewport size. In this example, we go from `2em` to `4em`, between viewports of `20em` and `80em`:

```css
h2 {
  font-size: calc(2em + (4 - 2) * ((100vw - 20em) / (80 - 20)));
}

@media screen and (min-width: 80em) {
  h2 {
    font-size: 4em;
  }
}
```

## Refactor round one

First off, let's extract the 'screen' part of the lock into a CSS custom property. This has made our `h2` lock much more readable, as we're only worrying about the size, not the screens. In the browser, this still looks and works in exactly the same way:

```css
:root {
  --fluid-bp: ((100vw - 20em) / (80 - 20));
}

h2 {
  font-size: calc(2em + (4 - 2) * var(--fluid-bp));
}

@media screen and (min-width: 80em) {
  h2 {
    font-size: 4em;
  }
}
```

## Refactor round two

Here we swap out the magic values in the 'screen' part of the lock into their own custom properties. It does make the code a bit harder to read, but crucially pulls out the most important & configurable parts into their own section. This will be useful shortly.

```css
:root {
  --fluid-min-screen: 20;
  --fluid-max-screen: 80;

  --fluid-bp: (
    (100vw - calc(var(--fluid-min-screen) * 1em)) / (var(--fluid-max-screen) -
          var(--fluid-min-screen))
  );
}

h2 {
  font-size: calc(2em + (4 - 2) * var(--fluid-bp));
}

@media screen and (min-width: 80em) {
  h2 {
    font-size: 4em;
  }
}
```

The big downside is that we're still having to duplicate the `4em` in the `@media` section. We could extract that value out into another property, or we could approach the problem from another angle...

## Refactor round three

Here comes the flip. Instead of overriding the value of `4em` in the `@media` section, we override what the lock thinks the viewport width is.

The `100vw` value is great when we want the size to be proportional to the screen, but as soon as we get to the lock point, we don't care about how large the screen is.

The first step is to extract the `100vw` into its own property: `--fluid-viewport`.

Then we change the `@media` section to cap our new property at `80em`, when we get to `80em`. This tells the lock that the screen is always `80em` wide even when the screen is larger. And this has the effect of **locking** the values in place, as if the screen was `80em` wide.

```css
:root {
  --fluid-min-screen: 20;
  --fluid-max-screen: 80;
  --fluid-viewport: 100vw;
  --fluid-bp: (
    (var(--fluid-viewport) - calc(var(--fluid-min-screen) * 1em)) / (var(
            --fluid-max-screen
          ) - var(--fluid-min-screen))
  );
}

h2 {
  font-size: calc(2em + (4 - 2) * var(--fluid-bp));
}

@media screen and (min-width: 80em) {
  :root {
    --fluid-viewport: 80em;
  }
}
```

## Refactor round four

Finally, we can update the `@media` lock to use the aforementioned `--fluid-max-screen` property, rather than hardcoding `80em` a second time. Unfortunately, it's not currently possible to use custom properties in a `@media` query declaration, but we're minimising the amount of repetition.

Now, whenever we want a new CSS lock for our `h3` font size, `h4` margin, or `hr` borders, we can reuse the same `--fluid-bp` property and save on a whole host of media queries!

```css
:root {
  --fluid-min-screen: 20;
  --fluid-max-screen: 80;
  --fluid-viewport: 100vw;
  --fluid-bp: (
    (var(--fluid-viewport) - calc(var(--fluid-min-screen) * 1em)) / (var(
            --fluid-max-screen
          ) - var(--fluid-min-screen))
  );
}

h2 {
  font-size: calc(2em + (4 - 2) * var(--fluid-bp));
}

h3 {
  font-size: calc(1.5em + (3 - 1.5) * var(--fluid-bp));
}

h4 {
  margin-top: calc(0.5em + (2 - 0.5) * var(--fluid-bp));
}

hr {
  border: calc(0.1em + (4 - 0.1) * var(--fluid-bp)) solid teal;
}

@media screen and (min-width: 80em) {
  :root {
    --fluid-viewport: calc(var(--fluid-max-screen) * 1em);
  }
}
```

### Utopian thinking

If this post is the sort of CSS nerdery you're into, you're going to love [Utopia.fyi](https://utopia.fyi/). It's a project created by me and a [Clearleft](https://clearleft.com/) colleague, to demonstrate and interrogate modern responsive design paradigms.
