---
title: Named slots with Sergey
year: 2019
date: 2019-04-13
categories: Web
tags:
  - side project
---

Sergey launched with two main features:

- Imports: `<sergey-import src="" />`
- Basic slots: `<sergey-slot />`

It was intentionally small in scope to: **a.** get something out there quickly to see if it's a useful tool, and **b.** not take on too many tasks and execute them badly.

Reception has been very positive, answering **a.** so I can get on with adding a few new features. Not many mind, Sergey is never going to be a big static site generator.

The first feature request was for named slots. It's something Jeremy and I discussed when it was first demo'd, but the MVP nature of the launch dictated the decision to hold it back.

## Syntax

I took the syntax inspiration from Vue.js. Given Sergey already uses `<sergey-slot />`, adding a name attribute, and a corresponding `<sergey-template />` tag seemed like the most sensible route. Here are the new tags:

```html
<sergey-template name="slotName">Content</sergey-template>

<sergey-slot name="slotName">Fallback content</sergey-slot>

<sergey-slot name="slotName" />
```

Named slots open up opportunities for creating page templates with Sergey. Here's an example `template.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><sergey-slot name="title" /></title>
  </head>
  <body>
    <sergey-import src="header" />

    <main>
      <h1><sergey-slot name="title" /></h1>
      <sergey-slot name="content" />
    </main>

    <sergey-import src="footer" />
  </body>
</html>
```

With that, we can compose a full page with a couple of template tags:

```html
<sergey-import src="template">
  <sergey-template name="title">My page title</sergey-template>

  <sergey-template name="content">
    <p>Page content</p>
    <p>goes here</p>
  </sergey-template>
</sergey-import>
```

---

## Building it

Tackling named slots wasn't as challenging as I first feared. But it was only when I started building use-cases for the documentation that I spotted some cracks in the overall foundations! 😬

The compilation step for Sergey happened in two phases, once for imports, and again for each file. This worked for all the examples I'd written so far. But once the templates got a bit deeper, it quickly became apparent that it wasn't good enough. I spent the rest of the evening mulling over the problem, and writing psuedo-code as the solution became clearer.

The key was recursion. The parser needed to run for every import it came across, calling itself on each iteration. Slots could then be properly calculated and nested imports returned correctly. Much like `while` loops, recursion can be a scary prospect, but fortunately, barring a little regex trickery, it all came together okay.

I finished off by writing up [the documentation](https://sergey.trysmudford.com/slots/#named-slots) for named slots. I'm still not sure how casual to make the docs. I think there's value in walkthrough examples, but maybe there needs to be some more cold hard facts. Let me know if you have any preferences. It's also time to decide what feature to add next - there's quite a bit to do on [the roadmap](https://github.com/trys/sergey/projects/1)!
