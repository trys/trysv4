---
title: Fading out siblings on hover in CSS
date: 2019-04-18
categories: Web
---

Here's a tiny trick for making your hover states stand out, and also a cool way to target the siblings of the thing you're hovering over. The effect is a mixture of two effects:

- Scale the hovered item
- Fade out the siblings

{{< fade-out-siblings >}}

Hover states traditionally run on the element being hovered on (makes sense, right?). But we can also listen for the hover event on the parent element.

That's the crux of this 'trick', we fade out all children when the parent is hovered, and attach another hover handler the child, fading it back in:

```css
.parent:hover > * {
  opacity: 0.5;
}

.parent:hover > *:hover {
  transform: scale(1.1);
  opacity: 1;
}
```

This is pretty great, but there's a slightly frustrating side effect when you hover in the gap between the children - they all fade out. Fortunately, we can solve this with `pointer-events`!

`pointer-events: none;` tells the browser to ignore mouse events on the element and ALL children. But, if we tell the child element to listen to the mouse again with `pointer-events: auto;` we get a neat effect where the hover events only run on the children, but still trigger the `:hover` pseudo selector on the parent:

```css
.parent {
  pointer-events: none;
}

.parent > * {
  pointer-events: auto;
}
```


All together, here's the code for the above example:

```css
.fade-out-siblings {
  --gutter: 2.5rem;

  background: var(--gradient-blue);
  text-align: center;
  grid-gap: var(--gutter);
  padding: var(--gutter);
  display: grid;
  margin: 2rem 0;

  pointer-events: none;
}

.fade-out-siblings > * {
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
  padding: 2rem 1rem;
  cursor: pointer;

  pointer-events: auto;
  transition: 300ms opacity, 300ms transform;
}

.fade-out-siblings:hover > * {
  opacity: 0.4;
}

.fade-out-siblings:hover > *:hover {
  transform: scale(1.1);
  opacity: 1;
}

@media (min-width: 40em) {
  .fade-out-siblings {
    grid-template-columns: repeat(3, 1fr);
  }

  .fade-out-siblings > * {
    padding: 4rem 1rem;
  }
}
```


## Update!

As suggested by [@css](https://twitter.com/css/status/1121039342594666502), adding `:focus-within` support would be a nice _touch_.

```css
.parent:hover > *,
.parent:focus-within > * {
  opacity: 0.4;
}

.parent:hover > :hover,
.parent:focus-within > :focus {
  transform: scale(1.1);
  opacity: 1;
}
```

And taking [Jakob's](https://twitter.com/eriksen_dk/status/1121067556662648832) `:not()` selector idea, we can handle hovering siblings when there's already a focused element!

```css
.parent:hover > :focus:not(:hover) {
  transform: scale(1.05);
}
```
