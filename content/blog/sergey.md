---
title: 'Sergey'
year: 2019
date: 2019-04-13
categories: Web
tags:
  - side project
---

Yesterday saw the launch of [Sergey](https://sergey.trysmudford.com), a tiny little static site generator. It's been around a week in the making, with the idea triggered by discussions with Cassie at [Homebrew website club](https://indieweb.org/Homebrew_Website_Club#Brighton) (come along, it's great!).

We were chatting about Michelle's wonderful [new site](https://michellebarker.co.uk/), built [entirely in HTML and CSS](https://twitter.com/mbarker_84/status/1107416868711743490). It's so refreshing to see such clean, semantic and understandable markup in this world/[bubble](https://adactio.com/journal/15011) of complexity. I mean, please `view-source` [the website](https://michellebarker.co.uk/), doesn't it spark joy?! 😍

This HTML & CSS only approach is great for very small sites, but as soon as the number of pages increases to beyond one or two, you'll quickly find yourself copying and pasting global markup to keep the pages in sync.

We came across a similar conundrum at daisie, specifically for the [LDNCreates campaign site](https://ldncreates.daisie.com/). Emma built it with classic HTML + CSS, and it works brilliantly! At the moment it's a one-pager, but sub-pages are in the pipeline. This sounded like a job for a static site generator (SSG), but which one to choose?!

The deadline was _really_ tight for that project, so time couldn't be spent [researching SSG's](https://www.staticgen.com/), testing them for viability and weighing up the pro's and con's. And that's the same for [a lot of developers](/blog/city-life/). Funny how things keep coming back around to bubbles! Many simply don't have the luxury of time to invest in that research phase, so keep with the tried and true methods, and lo, out pops another PHP site (for the record I have zero problems with PHP, it's my bread and butter).

LDNCreates went with [Hugo](https://gohugo.io/), but it's only using a **fraction** of what Hugo is capable of. That's not a problem, per se, more of a shame to use a hammer to crack a nut.

What this project needed was: **HTML plus some includable partials**. To be fair to PHP, it's something it did really well, but not everyone has a PHP dev envinronment to hand, and again, nor the luxury of time to set it up.

Cassie mentioned that from her [Codebar](https://codebar.io/brighton) experience, there'd definitely be a market for a SSG like that. So that night, I made a start!

---

Sergey (thanks for the name [Jeremy](https://adactio.com)!), has two main features exposed via custom tags:

- Imports: `<sergey-import src="" />`
- Slots: `<sergey-slot />`

## Basic imports

The `<sergey-import />` tag has one attribute: `src`.

`<sergey-import src="footer" />` will pull in the file: `_imports/footer.html` and inject it in place of the tag. So with the following markup:

```html
<!-- /index.html -->
<body>
  <sergey-import src="footer" />
</body>
```

```html
<!-- /_imports/footer.html -->
<footer>
  &copy; 2019
</footer>
```

Sergey will merge the two together and create:

```html
<!-- /public/index.html -->
<body>
  <footer>
    &copy; 2019
  </footer>
</body>
```

## Slots

Within any import file, you can place a `<sergey-slot />` tag. This slot allows you to inject custom content into your generic import files. Here's a header example:

```html
<!-- /_imports/header.html -->
<header>
  <h1>Page title</h1>
</header>
```

This isn't a very useful component, as we can't use different titles per page. Slots make that possible:

```html
<!-- /_imports/header.html -->
<header>
  <sergey-slot />
</header>
```

To inject content, we expand `<sergey-import />` to be a full tag; rather than a self-closing one, and put the custom content within:

```html
<!-- /index.html -->
<main>
  <sergey-import src="header">
    <h1>My custom page title</h1>
  </sergey-import>
</main>
```

And all together, it'll create:

```html
<!-- /public/index.html -->
<main>
  <header>
    <h1>My custom page title</h1>
  </header>
</main>
```

## Slot fallback content

The final Sergey feature (for now!) is 'default slots' or 'slot fallbacks'. Wherever you've used a slot, you can provide some default content that'll be shown if you don't provide slot content. Let's go for a `<head>` example, and create a default `<title>` tag:

```html
<!-- /_imports/head.html -->
<head>
  <meta charset="UTF-8" />
  <sergey-slot>
    <title>Default title</title>
  </sergey-slot>
</head>
```

If we leave the `<sergey-import src="head" />` as a self-closing tag, it'll render the fallback title:

```html
<!-- /index.html -->
<html>
  <sergey-import src="head" />
</html>
```

```html
<!-- /public/index.html -->
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Default title</title>
  </head>
</html>
```

But by passing in some content, it'll override that default slot content:

```html
<!-- /about/index.html -->
<html>
  <sergey-import src="head">
    <title>About title</title>
  </sergey-import>
</html>
```

```html
<!-- /public/about/index.html -->
<html>
  <head>
    <meta charset="UTF-8" />
    <title>About title</title>
  </head>
</html>
```

## All together now!

Let's make a final page to show all the bits in action:

```html
<!-- /index.html -->
<html>
  <sergey-import src="head" />

  <body>
    <main>
      <sergey-import src="header">
        <h1>My custom page title</h1>
      </sergey-import>
    </main>

    <sergey-import src="footer" />
  </body>
</html>
```

```html
<!-- /public/index.html -->
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Default title</title>
  </head>

  <body>
    <main>
      <header>
        <h1>My custom page title</h1>
      </header>
    </main>

    <footer>
      &copy; 2019
    </footer>
  </body>
</html>
```

## Have a go!

To act as a starting point, I've created an example website that can be deployed straight to Netlify. You can also have a root around the code [here](https://github.com/trys/sergey-netlify). The [sergey.trysmudford.com](https://sergey.trysmudford.com/) site is naturally written with Sergey, so that can be [checked out](https://github.com/trys/sergey/tree/master/example) too.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/sergey-netlify)
