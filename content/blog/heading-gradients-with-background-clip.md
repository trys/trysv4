---
title: Heading gradients
date: 2018-11-18
categories: Web
---

Inspired by Mandy Michael's [amazing talk at ViewSource 2018](https://www.youtube.com/watch?v=5qgUC_z8syw), I made a small tweak to my website. The `h1` title at the top of this post now has a fancy gradient as a fill colour.

The first part is a linear gradient background. This feature is only going to work on `-webkit` browsers so we can use the `-webkit-gradient`.

```css
h1 {
  background-image: -webkit-gradient(linear,0% 0%,100% 100%,from(#96A0DE),to(#4CACC1));
}
```

Next, we need to clip the background so it only appears behind the text:

```css
h1 {
  -webkit-background-clip: text;
}
```

Then we hide the text fill so the background shows through:

```css
h1 {
  -webkit-text-fill-color: transparent;
}
```

There are two final touches to make. Firstly, the headings are centred on my blog, and by default `h1` is a block-level element. This'll mean the heading, and therefore the gradient background will span the width of the parent, not the words inside. This would lead to a super-subtle gradient for short headings. By making the heading `display: inline-block`, the width and background are dictated by the word length.

Finally, this is a reasonably experimental feature only supported in `-webkit` browsers. We don't want half a working feature, so we can use `@support` queries to our advantage:

```css
@supports (-webkit-text-fill-color: transparent) {
  h1 {
    background-image: -webkit-gradient(linear,0% 0%,100% 100%,from(#96A0DE),to(#4CACC1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
}
```
