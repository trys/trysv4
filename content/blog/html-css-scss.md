---
title: "HTML / CSS / SCSS"
year: 2018
date: 2018-03-21
categories: Training
draft: true
---

> The World Wide Web is an information space where documents and other web resources are identified by URLs, interlinked by hypertext links, and can be accessed via the Internet. <cite>[Wikipedia](https://en.wikipedia.org/wiki/World_Wide_Web)</cite>

'Content' is why the web works. We ingest content created by others around the globe and in turn, can create content for others to consume. The barrier is low so the uptake is high. It's a wonderous hodge-podge of cultures, opinions and creativity. URLs and HTML have the job of organising this lovely mess of content.

## The importance of HTML

HTML underpins everything we do on the web. It should always be the starting point for any site, feature or bug fix.

It's a markup language, meaning it is designed; first and foremost, to annotate text. By wrapping chunks of text in tags, the browser can infer additional meaning from the content.

Take this extract:

---

Etymology

The term markup is derived from the traditional publishing practice of "marking up" a manuscript.

---

Now compare it to:

---

## Etymology

The term _markup_ is derived from the traditional publishing practice of _"marking up"_ a [manuscript](https://en.wikipedia.org/wiki/Manuscript).

---

By adding headings, anchors and emphasis tags, the content takes on additional meaning. A heading indicates a section or tonal change. Anchors provide extra information relating to the current page. Emphasis tags; for me anyway, change the way I read a sentence aloud, or in my head. It nods me to where in the sentence I should be focusing.

## Websites from paragraphs

Taking this idea further, we should build websites in the same way as we 'build' paragraphs. Start with the core content, decide what additional meaning would ade the user, then _"mark up"_ that content. Break the design apart into bite-sized chunks to begin with, if it makes it easier.

## Starting point

Let's run through the following snippet, outlining what each bit does.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Page title</title>
    </head>
    <body>
    </body>
</html>
```

`<!DOCTYPE html>` tells the browser how to parse this document, and which version of HTML to use. Since HTML5, we don't need to specify exactly which version, which is nice.

`<html>`, often known as the root element, is the top-most element on the page. In JavaScript, this is referred to as 'document'.

`<head>` contains things we don't need to show to the user, but things that are useful for computers to consume.

`<meta charset="utf-8">`. This tag tells the browswer which character set the document is written in. This a bit of a throwback, as the default character set for HTML5 is `utf-8`.

`<meta name="viewport" content="width=device-width,initial-scale=1.0">`. Before responsive design came along, a smaller device would load a 'desktop' version of a website. The user would then zoom and scroll around the page. Without this tag, this is still how sites would work on smaller screens. Now we have hyper-retina screens to worry about, this tag does the inverse. An iPhone X has a resolution of 2436 x 1125px. If media queries were based purely on pixel values, the site would appear very small. This tag tells the browser to work at the non-retina level - on an iPhone X with a 3x retina value, the resolution becomes 375 x 812px.

`<title>` is the page title that'll appear in tabs, Google and browser history.

`<body>` is where the user-visible content starts.

## Forgiveness

HTML is a fault-tollerant language. It won't throw an error if you put a tag out of place, nor will it fail if the browser doesn't support a tag. It's the reason why the [first ever website](http://info.cern.ch/) still works today. It's pretty rare for a technology to be that resilient.

This tolerance isn't an excuse to write bad HTML though. It should however, give you confidence to use new features knowing that older browsers will not fail. Take this markup:

```html
<a-new-tag>Some content</a-new-tag>
```

What do you think displays if the browser doesn't understand `<a-new-tag>`? The answer: 'Some content' still displays. Will it look identical? Perhaps not. But will it still display the core content? Yes! [Side note](http://dowebsitesneedtolookexactlythesameineverybrowser.com/).

## Semantics

The reason we don't write slapdash HTML is: semantics. The 'Semantic Web' is a term to describe 'data that can be processed by machines'. Although Tim Berners-Lee's full vision of 'day-to-day mechanisms of trade, bureaucracy and our daily lives will be handled by machines talking to machines' hasn't quite been realised, semantics are still really useful. Semantic HTML means search engines can infer movie times from your content. It's how screen readers make sense of your information. And it's how social networks construct meaningful snippets when your article is shared.

It's often overlooked, but writing semantic HTML helps those we cannot see. It's not a huge burden for a developer, but it can make the difference for a machine parsing your site, or a user reading your content.

## Elements

Have a read through the [MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) explaining the different types of elements. There are a good number of them, understanding which ones are useful for different tasks is important.

The tendancy for many developers is to over-use `<div>`s. They're the most generic type of element with no semantic value. This makes them great for abstract wrappers around semantic content. But the key is to use semantic content within them, not more divs!

---

## CSS

Cascading Style Sheets describe how a HTML document should be presented. Originally, presentation was handled within the document itself. But this tight coupling of style and content didn't scale well. Changing all link colours is quite a chore when every file needs editing.

Like HTML, it's extremely fault-tolerant, coping well when new properties are added.

It has also kept an incredibly simple syntax throughout the years:

```css
.selector {
    property: value;
}
```

## The cascade

As stylesheets can be defined in multiple places, there needs to be a way of ranking which properties are applied to each element. This is handled by **priority** and **specificity**.

Priority dictates which order the CSS declarations are ranked. For example, an inline style will have a higher priority than an external rule. In the middle of the ranking list is 'selector specificity'. Specificity refers to the weights of selectors. A more specific selector will be ranked above a more generic selector. For example, `h1 {}` is a very generic selector, `.class {}` is more specific and `#id` is very specific.

Another great feature of CSS is **inheritance**. When you set a parent element to have `color: blue`. You don't need to specify this on each child element, it inherits it from the parent. Likewise, as media queries take effect, you don't need to redeclare styles, they will continue to inherit until a selector with a greater specificity takes over. The **rule order** also has bearing, in fact, it has a higher priority than inheritance.

## How I write CSS

When writing CSS, a good aim is to keep the specificity as low as possible. The higher it gets, the harder it is to override a rule.

I like to start my CSS with a very basic reset.

Then it's down to setting the global items: typography, colours and generic spacing - things that apply to all or most headings would be a good example. These rules are all low specificity using rules like `h1 {}`

Then it's on to common components such as grids, image handling and content areas. These will be generic classes like `.wrap {}` or `.content h2`.

Finally, I work on components or 'features'. Starting from the most generic down to the most specific. I like to use a BEM-like syntax.

## An example

Here's some markup for a blog preview. I want to display the linked title, date & excerpt:

```html
<article>
    <h2>
        <a href="#">Post title</a>
    </h2>
    <time datetime="2018-03-21T09:00:00Z">21st March 2018</time>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
</article>
```

It begins with an `<article>` tag to give the semantic representation of self-contained content. Then a `<h2>` is used as the title. The `<time>` tag has a datetime attribute to provide a computer-readable timestamp for the content. Then it's a classic `<p>` tag for the excerpt. One thing to note - the `<time>` tag is a inline-level element (meaning it'll sit inline with text alongside it). As the block-level heading and paragraph elements sit either side of it, we don't need to explicitely set `display: block` on it as it'll be pushed onto it's own line.

Targetting this component with `article {}` would work, but it would probably be too generic, it's not uncommon to have two `<article>` elements in use across the site. For this reason, I tend to put a class on it.

```html
<article class="preview">
...
</article>
```

```css
.preview h2 {
    font-style: italic;
}
```

[Naming things is hard](https://twitter.com/secretGeek/status/7269997868), specifically picking class names. Being too specific with the class name won't make any computational difference, but it will restrict how you can use the class elsewhere. I quite like the class `.preview` for components whose job it is to point at another page.

With the BEM-like approach, I can add a double-hyphen **modifier** class to only change blog previews:

```html
<article class="preview preview--blog">
...
</article>
```

Targetting the items within the `.preview` is down to preference and reusability. Some developers take issue with selectors like `.preview h2` as they couple the HTML with the CSS. IMHO, to think that you're going to achieve perfect separation of concerns is naive. If you are in the former camp, or if different heading elements are required, a class-based approach is needed:

```html
<article class="preview preview--blog">
    <h2 class="preview__title">
        <a href="#">Post title</a>
    </h2>
    ...
</article>
```

This is where the double-underscored **element** part of BEM comes in. Targetting this can be achived in two ways:

```css
.preview .preview__title {}

.preview__title {}
```

The first selector is overly specific, something we want to avoid. If you are diligent with your BEM, there will be no other instance of `class="preview__title"` in the HTML, so a simple selector can be used here.

## Pre-processors

CSS pre-processors are very cool. They make CSS feel more like a 'programming' language, adding things like variables and nesting. But they have drawbacks.

The biggest is a disconnect from the code you write and the code that is generated. Once you get into the realm of uglification and minification, it can be difficult to dissect the generated CSS. I'd highly recommend investigating source maps as a way of helping you debug in the inspector.

With nesting and extending in pre-processors, it becomes really easy to be overly specific in the generated CSS. Take this code:

```scss
.menu {
    ul {
        color: blue;

        li {
            font-weight: 700;

            a {
                text-decoration: none;
            }
        }
    }
}
```

This gets generated to:

```css
.menu ul {
    color: blue;
}

.menu ul li {
    font-weight: 700;
}

.menu ul li a {
    text-decoration: none;
}
```

As the nesting gets deeper, the specificity increases. There are two solutions: use classes, or use less nesting. For the most part, these two selectors will achive the same thing `.menu a {}` - `.menu ul li a`. If there's only a list of anchors in the `.menu`, you can pretty safely use the first selector without a worry.

The alternative is to add classes:

```html
<nav class="menu">
    <ul>
        <li>
            <a class="menu__link" href="/">Home</a>
        </li>
    </ul>
</nav>
```

This is where we can utilise the & selector in SCSS:

```scss
.menu {
    &__link {
        text-decoration: none;
    }
}
```

& will print the selector as it currently stands in its place. As we've used BEM and matched the name of the parent block, instead of creating: `.menu ul li a` or `.menu .menu__link`, it prints the parent selector `.menu`, adding it to `&__link`, creating:

```css
.menu__link {
    text-decoration: none;
}
```

This is great! We've created a selector that is not computationally specific, but still specific enough so it won't be used elsewhere.

