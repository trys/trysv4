---
title: Line on side headings in CSS
date: 2018-05-09
categories: Web
tags:
  - css
---

A discussion started in our Slack channel on how to best accomplish a design like this:

![Lines around a header](/images/blog/fancy-header.jpg)

This legend-style line-on-side heading is a popular trend right now, and there doesn't appear to be a definitive approach. 

Creating some lines atop a solid background isn't too challenging, the difficulty comes when you overlay it on a gradient or photograph. Neat, but it would be nicer if the extra markup wasn't there.

A [CSS Tricks](https://css-tricks.com/line-on-sides-headers/) article outlines an approach using `spans` around a paragraph.

In this [JSFiddle](http://jsfiddle.net/Puigcerber/vLwDf/), a clever use of `overflow: hidden` means no additional spannage. But it falls apart when the text wraps onto multiple lines.

It was time to boot up CodePen and get experimenting:

## Flexbox solution

```css
h2 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h2:before,
h2:after {
    content: '';
    border-top: 2px solid;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
}

h2:after {
    margin: 0 0 0 20px;
}
```

Flexbox and pseudo elements was the first solution I found. Generally, pseudo elements and flexbox are a pain, namely when resetting a clearfix, but in this instance, they work together brilliantly.

{{< button "https://codepen.io/trys/pen/vjRXLW/" >}}View the CodePen{{</ button >}}


## CSS Grid solution

```css
h2 {
    display: grid;
    grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
    align-items: center;
    text-align: center;
    grid-gap: 20px;
    width: 100%;
}

h2:before,
h2:after {
    content: '';
    border-top: 2px solid;
}
```

CSS Grid seemed like the natural next step for enhancement.

`grid-gap` has to be one of the best properties ever added to the spec. Margin resets can be removed, min-widths are handled by `minmax` and the pseudo elements only need to worry about being presentational. CSS Grid is brilliant.

{{< button "https://codepen.io/trys/pen/vjRzPa" >}}View the CodePen{{</ button >}}
