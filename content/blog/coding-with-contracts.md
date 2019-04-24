---
title: Coding with contracts
date: 2019-04-24
categories: Web
---

_"Good code is it's own documentation"_ is a popular quip, most often used to explain a lack of comments. And although clarity at a micro scale (variable names, logical arguments, good spacing) is hugely important, and may mean a reduced amount of comments, I'm not sure a lack of documentation at a macro scale is such a good thing.

Using an API requires an element of trust. Trust that data you request will be well-formed, quick and most importantly, consistent. Consistency is _everything_ for an API.

That consistency also extends to failing well. If an API fails consistently, it makes it a breeze for the consumer to check against. Though we should strive to put adequate error checking in our code, having trust in an API to fail consistently means we can run high-level checks for errors, and remain confident that the error we requested is present and correct. Failing at a macro level, staying consistent at a micro level.

- Typescript
- GraphQL
- Classes _shakes fist at immutability_
- Clear public API
- Testable
- Use sugar and conventions
- Component library _should_ include documentation, as well as being a visual reference
- Not there to reduce creativity
- WordPress hooks
