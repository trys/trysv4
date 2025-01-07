---
title: 'Sergey + Markdown + Tests + Folders + ENV + Exclusion'
date: 2019-04-23
description: Markdown and much more added to the little static site generator
categories: Web
tags:
  - side project
---

After a bank holiday weekend of hacking, [Sergey](https://sergey.trysmudford.com) has some exciting new features!

## Markdown 📝

Markdown is one of those developer experience features that usually goes hand-in-hand with a static site generator. But it was important to me for it to be an opt-in feature.

Sergey doesn't profess to be the SSG for everyone, quite the opposite. It's intenionally small in scope, and will never do half the clever things many SSG's do. [Sergey's goal](https://sergey.trysmudford.com/#what-is-sergey) is as much for those who've never used a SSG before, as it is for those who need a prototyping tool before picking a full generator. So markdown support had to subscribe to that philosophy (as with all new features).

[Andy Bell](https://twitter.com/andybelldesign/status/1118062931747512320) suggested the lovely syntax, extending the existing `<sergey-import>` to include an `as` attribute. This'll also open up any future content types without the need for extra HTML tags.

So here's how it works:

1. Add a markdown file to your `_imports` folder.
2. Include the content with:

```html
<sergey-import src="about" as="markdown" />
```

Full documentation is available [here](https://sergey.trysmudford.com/markdown/).

## Tests! 🙌

Another; less glamorous but crucial, update was adding some unit testing. Tests will add confidence to future releases, ensuring nothing's been broken by accident. For now, there are tests for imports, slots, templates and markdown, but I'll be looking into some file-based tests shortly.

The next feature will be to allow imports and markdown files to exist in folders. Hopefully it won't be a major job, but it'll probably involve refactoring the recursive file code, and should make the file watching a bit more reliable. Currently, new files don't get picked up in dev mode without a server restart - not ideal.

## Import folders 🗂

To coincide with the markdown release, Sergey now allows you to nest your partials (and markdown files) into folders.

A header file in `_imports/partials/header` would be included with:

```html
<sergey-import src="partials/header" />
```

You can also override the content folder (also `_imports` by default), to be nested within the imports folder, or totally separate, it's up to you!

If you set the content folder to be `_imports/content`, you wouldn't need specify the `content` bit in the import `src`, simply carry on with imports like:

```html
<sergey-import src="aboutMarkdownFile" />
```

## .env 🗝

You've been able to pass arguments to the `sergey` command from day one, but now you can prebake those values with a `.env` file. All the options have been documented on the [options page](https://sergey.trysmudford.com/options/).

## Exclusion 🚫

Finally, Sergey now ignores all entries in your `.gitignore`, making compilation that bit quicker. You can also pass in additional folders and files to exclude from being watched in dev mode and copied at build time.

## Summing up ✨

If you have any questions, spot any bugs, or think of an feature requests, please send me a message on [Twitter](https://twitter.com/trysmudford).
