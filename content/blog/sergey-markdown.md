---
title: 'Sergey + Markdown + Tests'
date: 2019-04-20
description: Adding markdown support to the little static site generator
categories: Web
---

After a bank holiday weekend of hacking, [Sergey](https://sergey.cool) now has markdown support!

Markdown is one of those developer experience features that usually goes hand-in-hand with a static site generator. But it was important to me for it to be an opt-in feature.

Sergey doesn't profess to be the SSG for everyone, quite the opposite. It's intenionally small in scope, and will never do half the clever things many SSG's do. [Sergey's goal](https://sergey.cool/#what-is-sergey) is as much for those who've never used a SSG before, as it is for those who need a prototyping tool before picking a full generator. So markdown support had to subscribe to that philosophy (as with all new features).

[Andy Bell](https://twitter.com/andybelldesign/status/1118062931747512320) suggested the lovely syntax, extending the existing `<sergey-import>` to include an `as` attribute. This'll also open up any future content types without the need for extra HTML tags.

So here's how it works:

1. Create a `_content` folder and add a markdown file or two in there.
2. Include the content with:

```html
<sergey-import src="about" as="markdown" />
```

Full documentation is available [here](https://sergey.cool/markdown/).

## Tests! 🙌

The other; less glamorous, update was adding some unit tests in. Tests will add confidence to future releases, ensuring nothing's been broken by accident. For now, there are tests for imports, slots, templates and markdown, but I'll be looking into some file-based tests shortly.

The next feature will be to allow imports and markdown files to exist in folders. Hopefully it won't be a major job, but it'll probably involve refactoring the recursive file code, and should make the file watching a bit more reliable. Currently, new files don't get picked up in dev mode without a server restart - not ideal.
