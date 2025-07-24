---
title: Better max-width queries
year: 2025
date: 2025-07-24
categories: Web
tags:
  - css
  - tips
---

A friend shared this tip the other day and it was too useful not to reshare. If you're a mobile-up kind of developer, it's easy to forget that `max-width` media queries are "less than or equal to" by default. It can play havoc with your nice round numbers:

```css
@media (min-width: 60em) {
  /* above and including 60em */
}

@media (max-width: 59.9375em) {
  /* below 60em, but not including 60em exactly */
}
```

If you want to tidy that up, and continue to support <= Safari 16.3, you can use a query like this:

```css
@media (max-width: 60em) and (not (width: 60em)) {
  /* below 60em, but not including 60em exactly */
}
```

However, if you're bought into range queries, it all becomes much, much simpler:

```css
@media (width < 60em) {}
```