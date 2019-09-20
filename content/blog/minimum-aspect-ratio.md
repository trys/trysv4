---
title: Minimum aspect ratio in CSS
date: 2019-09-20
categories: Web
---

The `padding-bottom` aspect ratio trick has been around for a while, and until we get the [official unit](https://www.smashingmagazine.com/2019/03/aspect-ratio-unit-css/), it's all we've got to create fluid-sized elements. At [Daisie](https://daisie.com), I remember needing a 'minimum aspect ratio' but never properly implemented it. Today, when working on some cards, that requirement came up again.

> The aim is to have a container at a minimum aspect ratio, but if the content within exceeds it, we allow it to grow.

### The result

<div class="min-aspect-wrapper">
  <div class="min-aspect-container">
    <article class="min-aspect">Article with a 50% aspect ratio</article>
    <article class="min-aspect">Article with lots and lots of very tall and rather amazing content that spans so very many lines that it becomes taller than the minimum aspect ratio.</article>
  </div>
</div>

<style>
  .min-aspect-wrapper {
    background: #eaeef2;
    font-size: 1.25em;
    line-height: 1.3;
    margin: 2rem 0;
  }

  .min-aspect-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    width: 50vw;
  }

  .min-aspect {
    justify-content: flex-start;
    align-items: flex-end;
    background: slategrey;
    padding: 1rem;
    display: flex;
    color: #FFF;
  }
  
  .min-aspect + * {
    margin-top: 1rem;
  }

  /* Minimum aspect ratio */
  .min-aspect:before {
    padding-bottom: 50%;
    content: '';
    float: left;
  }

  /* Clearfix like it's 2012 */
  .min-aspect:after {
    display: table;
    content: '';
    clear: both;
  }
</style>

### The code

The CSS is nice and succinct, and straight out of 2012. Clearfixes n' all. The `:before` pseudo element uses the `padding-bottom` trick to give the container some height, but floats out the way, and the `:after` clears up afterwards. If the content is larger than the box, the element is defined by that height instead.

```css
.min-aspect:before {
  padding-bottom: 50%; /* Minimum aspect ratio */
  content: '';
  float: left;
}

.min-aspect:after {
  display: table;
  content: '';
  clear: both;
}
```

<small>**The caveat:** Given how classic™ this code is, this has probably been implemented many times before, but my googling skills weren't good enough to find other articles on the matter.</small>
