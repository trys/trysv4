---
title: "Rounded triangular boxes in CSS/SVG"
year: 2025
date: 2025-04-10
categories: Web
tags:
  - css
---

In the [Motorway brand refresh](/blog/lessons-from-a-brand-refresh/), I had to build _a lot_ of rounded rectangular & triangular shapes (I don't know what they're officially called), and got quite good and understanding the pro's and con's of each approach. Depending on your use-case, there's a few possible options available to you.

## The filled box

![A screenshot from the Motorway product, showing a hero image on top of several rounded triangular rectangles](/images/blog/motorway-cvt.jpg)

The 'simpler' use-case is the filled box. Bennett Feely's [Clippy](https://bennettfeely.com/clippy/) continues to be the best tool for the job of generating `clip-path` shapes, and even has  'left/right point' options. Clip-path gives us a pointy edge, but doesn't give us rounded edges, or a particularly responsive solution out of the box - wider screens will have a more pronounced point than smaller screens when using percentages:

<style>
  .pointy-demo {
    background: var(--site-chrome);
    padding: var(--space-l);
    border: 1px solid var(--blog-bg);
    margin-bottom: var(--space-l);
  }

  .pointy-controller {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs) var(--space-l);
    align-items: center;
    justify-content: center;
  }

  .pointy-controls {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
    justify-content: center;
    align-items: center;
    padding-top: var(--space-s);
    font-size: var(--step--1);
    font-weight: 700;
  }

  .pointy-controls code {
    font-size: var(--step--2);
    font-weight: 400;
  }

  .pointy-demo + .highlight {
    margin-top: calc(-1 * var(--space-l));
  }

  .box {
    background: linear-gradient(90deg, var(--gradient-blue), var(--gradient-green));
    height: 200px;
  }

  .box1 {
    --point-inset: calc(1% * var(--value0, 90));
    clip-path: polygon(0% 0%, var(--point-inset) 0%, 100% 50%, var(--point-inset) 100%, 0% 100%);
  }
</style>

<svg height="0" style="position:absolute;visibility:hidden" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg"><defs><filter id="rounding-filter"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="6"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs></svg>

<div class="pointy-demo">
  <div class="box box1"></div>
  <div class="pointy-controls">
    <label for="box1-slider">Clip path: <output>90</output>%</label>
    <input type="range" id="box1-slider" min="50" max="99" value="90" />
  </div>
</div>

```css
.box {
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
}
```

To improve the point, you can use `calc` with `clip-path` to determine where the point starts/ends. `border-radius` gets us some roundedness, but only on the flat edge, not on the pointy edge:

<style>
  .box2 {
    --point-inset: calc(100% - (1px * var(--value0, 32)));
    clip-path: polygon(0% 0%, var(--point-inset) 0%, 100% 50%, var(--point-inset) 100%, 0% 100%);
    border-radius: calc(1px * var(--value1, 16));
  }
</style>

<div class="pointy-demo">
  <div class="box box2"></div>
  <div class="pointy-controller">
    <div class="pointy-controls">
      <label for="box2-slider">Clip path offset: <output>32</output>px</label>
      <input type="range" id="box2-slider" min="1" max="120" value="32" />
    </div>
    <div class="pointy-controls">
      <label for="box2-slider1">Border radius: <output>16</output>px</label>
      <input type="range" id="box2-slider1" min="1" max="48" value="16" />
    </div>
  </div>
</div>

```css
.box {
  --point-inset: calc(100% - 2rem);
  clip-path: polygon(0% 0%, var(--point-inset) 0%, 100% 50%, var(--point-inset) 100%, 0% 100%);
  border-radius: 1rem;
}
```

To properly round this out, we need to employ a lesser-used bit of SVG: `<feGaussianBlur>`. There's a [wonderful article](https://dev.to/afif/css-shapes-with-rounded-corners-56h) by Temani Afif that explains the technique. This snippet can be popped at the bottom of your page, and sits there as an invisible SVG.

```html
<svg height="0" style="position:absolute; visibility:hidden" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="rounding-filter">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="5"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"></feColorMatrix>
      <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
    </filter>
  </defs>
</svg>
```

We can then apply this filter to our box and it will round the corners of child elements. Change `stdDeviation` to increase/decrease the amount of rounding.

<style>
  .box3 {
    filter: url(#rounding-filter);
  }

  .box3 > * {
    --point-inset: calc(100% - (1px * var(--value0, 32)));
    clip-path: polygon(0% 0%, var(--point-inset) 0%, 100% 50%, var(--point-inset) 100%, 0% 100%);
  }
</style>

<div class="pointy-demo">
  <div class="box3">
    <div class="box"></div>
  </div>
  <div class="pointy-controller">
    <div class="pointy-controls">
      <label for="box3-slider">Clip path offset: <output>32</output>px</label>
      <input type="range" id="box3-slider" min="1" max="120" value="32" />
    </div>
    <div class="pointy-controls">
      <label for="box3-slider1">stdDeviation: <output>6</output></label>
      <input type="range" id="box3-slider1" data-deviation="1" min="1" max="30" value="5" />
    </div>
  </div>
</div>

```css
.box {
  filter: url(#rounding-filter);
}

.box > * {
  --point-inset: calc(100% - 2rem);
  clip-path: polygon(0% 0%, var(--point-inset) 0%, 100% 50%, var(--point-inset) 100%, 0% 100%);
}
```

{{< alert "Note" >}}
`filter: url()` will only apply to child elements including `:before/:after`, so you need a bit more markup to make this work.

In addition, you'll want to avoid putting any text/images that don't want to be blurred into pulp as direct descendants of the box. This filter works (I believe) by blurring the child elements and the lopping off the blurred edges.
{{</ alert >}}


## The outlined box

![A screenshot from the Motorway product, showing an outlined triangular box](/images/blog/motorway-outline.jpg)

Outlined boxes are a bit more tricky. You'd think it would just be a case of swapping background for a border, but alas not. Again, because this filter works by blurring the edges of the component, all borders effectively disappear.  To compound the problem, `box-shadow: inset`, `filter: drop-shadow()` also get blurred, and `clip-path` and `border` do not play nicely (subtle background added for effect):

<div class="pointy-demo">
  <div class="box box4"></div>
  <div class="pointy-controls">
    <label for="box4-slider">Clip path offset: <output>32</output>px</label>
    <input type="range" id="box4-slider" min="0" max="120" value="32" />
</div>
</div>

<style>
  .box4 {
    --point-inset: calc(100% - (1px * var(--value0, 32)));
    clip-path: polygon(0% 0%, var(--point-inset) 0%, 100% 50%, var(--point-inset) 100%, 0% 100%);
    border: 1px solid var(--gradient-green);
    background: light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1));
  }
</style>

The best solution I found was to employ an additional SVG element an append it to the right-side of the box (as demonstrated by the orange flashing line).

<div class="pointy-demo">
  <div class="box-wrapper">
    <div class="box box5"></div>
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="none" viewBox="0 0 127 478">
      <path stroke="var(--gradient-green)" stroke-width="1" d="M0 477h11.33a15.5 15.5 0 0 0 14.17-9.22l98.67-222.51a15.5 15.5 0 0 0 0-12.56L25.51 10.22A15.5 15.5 0 0 0 11.34 1H0" vector-effect="non-scaling-stroke"/>
    </svg>
  </div>
  <div class="pointy-controller">
    <div class="pointy-controls">
      <label for="box5-slider1">Border radius: <output>16</output>px</label>
      <input type="range" id="box5-slider1" min="1" max="48" value="16" />
    </div>
    <div class="pointy-controls">
      <label for="box5-slider2">Triangle size: <output>48</output>px</label>
      <input type="range" id="box5-slider2" min="12" max="160" value="48" />
    </div>
  </div>
</div>

```html
<div class="box-wrapper">
  <div class="box"></div>
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="none" viewBox="0 0 127 478">
    <path stroke="var(--theme)" stroke-width="1" d="M0 477h11.33a15.5 15.5 0 0 0 14.17-9.22l98.67-222.51a15.5 15.5 0 0 0 0-12.56L25.51 10.22A15.5 15.5 0 0 0 11.34 1H0" vector-effect="non-scaling-stroke"/>
  </svg>
</div>
```

```css
.box-wrapper {
  --theme: rebeccapurple;
  display: grid;
  grid-template-columns: auto 3rem;
}

.box {
  border: 1px solid var(--theme);
  border-inline-end: none;
  border-radius: 0.5rem 0 0 0.5rem;
}
```

<style>
  .box-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .box5 {
    border: 1px solid var(--gradient-green);
    border-inline-end-style: dashed;
    border-inline-end-color: rgba(255, 60, 5, var(--dash-opacity));
    background: none;
    border-radius: calc(1px * var(--value0, 16)) 0 0 calc(1px * var(--value0, 16));
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      --dash-opacity: 1;
    }
    
    50% {
      --dash-opacity: 0;
    }
  }

  .box-wrapper > svg {
    height: 200px;
    width: calc(1px * var(--value1, 48));
  }
</style>

{{< alert "Post requisites" >}}
Firstly, the SVG needs to be pre-rounded for this to work. You also need to decide your `stroke-width` beforehand to get this to work consisently:

<div class="pointy-demo" style="display: flex; justify-content: center;">
  <svg width="80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="none" viewBox="0 0 127 478"><path stroke="var(--gradient-green)" stroke-width="1" d="M0 477h11.33a15.5 15.5 0 0 0 14.17-9.22l98.67-222.51a15.5 15.5 0 0 0 0-12.56L25.51 10.22A15.5 15.5 0 0 0 11.34 1H0" vector-effect="non-scaling-stroke"/></svg>
</div>

Next, it's essential that you use `preserveAspectRatio="none"` on the SVG. This allows you to squash and squeeze the SVG into whatever shape you require.

Finally, you need to set `vector-effect="non-scaling-stroke"` on the `<path />` element. This ensures that the stroke width remains the consistent with the box border, regardless of the size & shape of the SVG. If you don't do this, you'll end up with a very thin line when the SVG is scaled down.
{{</ alert >}}

<script>
  const demos = document.querySelectorAll('.pointy-demo');
  const deviation = document.querySelector('#rounding-filter feGaussianBlur');
  (() => {
    demos.forEach(demo => {
      const controls = demo.querySelectorAll('.pointy-controls');
      controls.forEach((controls, index) => {
        const slider = controls.querySelector('[type="range"]');
        const outputs = controls.querySelectorAll('output');
        if (!slider) return;
        slider.addEventListener('input', (e) => {
          demo.style.setProperty(`--value${index}`, e.target.value);
          outputs.forEach(output => output.innerText = e.target.value);

          if (slider.dataset.deviation && deviation) {
            deviation.setAttribute('stdDeviation', e.target.value);
          }
        });
      });
    });
  })();
</script>

## Closing note

You may be asking yourself, why not just set an SVG background image and have done with it? Well, if you want control over the corner rounding, triangle size, and most importantly, stay responsive to differing viewports and quantities of content, then this is probably the way to go. If the requirement is for a simple empty box, then an SVG directly in the DOM is a simpler bet.
