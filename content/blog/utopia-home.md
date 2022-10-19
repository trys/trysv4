---
title: Building the new Utopia homepage
date: 2022-10-19
categories: Web
image: images/blog/utopia-home.jpg
description: "Utopia has a new home page with a nifty demo to (hopefully) show what the fuss is about. Here's how it works."
---

[Utopia](https://utopia.fyi) has a new home page with a nifty demo to (hopefully) show what the fuss is about. This is a quick write up on how it works under the hood...

<div style="position: relative; padding-bottom: 73.77%; padding-top: 30px; margin-bottom: 30px; height: 0; overflow: hidden;">
  <video src="https://trysmudford.com/images/blog/utopia-home.mp4" poster="https://trysmudford.com/images/blog/utopia-home.jpg" loop style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" preload="none" controls></video>
</div>

[James](https://twitter.com/j98) designed the beautiful new component, which acts as a 'website within a website'. It could've been a `<video>` file. This would've been easy to add to the site, but not at all interactive. Alternatively, an `<iframe>` pointing at a page with the demo, with controls to resize the iframe itself would've worked, but with one distinct disadvantage specific to this implementation. This component also needed to provide the homepage `<h1>`, and putting it in an iframe would've removed the content from the page.

So I attacked this as a standalone component on the page. Markup-wise, it was all pretty standard stuff. The interesting bit is in how the type/space scales interact with the form controls and pretend to be rendered on small/large screens.

Most sites are designed at a minimum of `~320px`, but this needed to be smaller. So I created a [scale on Utopia](https://utopia.fyi/type/calculator/?c=210,12.5,1.2,686,16,1.25,5,0,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l) running from `210px` to `686px`:

```css
:root {
  --fluid-min-width: 210;
  --fluid-max-width: 686;

  --fluid-screen: 100vw;
  --fluid-bp: calc(
    (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
      (var(--fluid-max-width) - var(--fluid-min-width))
  );
}

@media screen and (min-width: 686px) {
  :root {
    --fluid-screen: calc(var(--fluid-max-width) * 1px);
  }
}
```

Instead of applying those values to the `:root` element, where the whole website would be affected, I changed the selector to `.demo`, so it cascades inside this component. Thanks to the [CSS Lock Refactor](https://www.trysmudford.com/blog/refactoring-css-locks/), `--fluid-screen` is a variable we can control; usually set to `100vw` before capping all the type/space units with a single media query.

But for this component, we remove the `--fluid-screen: 100vw` line, and the whole media query, so we can control it via an `<input type="range" />`. In Vue, it looks a bit like this:

```html
<template>
  <div class="demo" :style="{
    '--fluid-screen': `${screen}px`
  }">
    ...
    <input type="range" v-model="screen" min="210" max="686" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      screen: 686
    }
  }
}
</script>

<style>
  .demo {
    --fluid-min-width: 210;
    --fluid-max-width: 686;
    --fluid-bp: calc(
      (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
        (var(--fluid-max-width) - var(--fluid-min-width))
    );

    --step-0: ...
    /* ... all the type & space units */

    width: var(--fluid-screen);
  }
</style>
```

Now we can paint on the type/space units onto the markup as we would on any other website. When the user interacts with the input and sets it to somewhere in the middle, say `448`, the browser renders the demo as if it was `448px`, even if your viewport is `1440px` or `320px`, and all the space/type reacts accordingly! I love it so much ❤️


If you'd like to read more about this approach, check out my [previous blog post on space aware components](https://www.trysmudford.com/blog/space-aware-components/). This is all stuff that will become trivial when container queries arrive, but for now this works pretty well.
