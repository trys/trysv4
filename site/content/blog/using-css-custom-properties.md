---
title: Using CSS Custom Properties
date: 2018-03-08
Categories: Web
---

I've been tackling an interesting problem on the new Tomango site. We're using a 'brand pattern' as a hero image — it's all SVG and CSS `background-image`. There are two parts to it, a grey pattern, and a repeating set of white/light grey lines.

The lines are consistent across the site but the pattern changes from page to page. It all worked well until network speed got involved. Once cached, the lines would load before the pattern, causing a nasty flash of light-on-light.

This was intriguing, as the pattern was being served as a Base64'd SVG in an internal stylesheet. A cached stylesheet and subsequent cached SVG request was quicker to load than an inlined SVG.

---

Custom properties have been on the learning list for a while. I've dipped the toe in with PostCSS, but they're really properties impersonating variables. Now was the time to dive in.

I defined the default pattern and brandlines on the `:root` element:

```css
:root {
  --pattern: url("data:image/svg+xml;charset=utf-8;base64...");
  --brandlines: url("data:image/svg+xml;charset=utf-8;base64...");
}
```

Then I could begin using the variables within the hero area `.scss` file:

```css
[role=banner] {
  background-image: var(--pattern);
  background-color: $black;

  @supports ( (--a: 0)) {
    background-color: darken($light, 5%);
  }

  @include mq(769px) {
    background-image: var(--pattern), var(--brandlines);
  }
}
```

The additional `@supports` query helps browsers that don't support custom properties (or feature queries) gracefully degrade. The `$light` `background-colour` will only be added if the browser can support it, if not, they get a high-constrast black backround.

Finally, the internal stylesheet can be hugely reduced to one line!

```css
[role=banner] {
  --pattern:  url('data:image/svg+xml;utf8,{{ .Params.banner }}');
}
```

It's so sweet being able to pass data back into CSS like this!
