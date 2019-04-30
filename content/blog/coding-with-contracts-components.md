---
title: Coding with contracts - Components
date: 2019-04-29
categories: Web
draft: true
---

Components require a similar level of trust to a REST API, we interact with them in very similar ways. A component exposes a public API, an I/O in the form of props and events. Keeping this API clear and consistent will increase the trustworthiness in the component, and make it easier to integrate. A good component will be extensible.

- Typescript
- GraphQL
- Classes _shakes fist at immutability_
- Clear public API
- Testable
- Use sugar and conventions
- Component library _should_ include documentation, as well as being a visual reference
- Not there to reduce creativity
- WordPress hooks
- Additive changes
- Musts, shoulds, coulds
- State machines, always be a reflection of state
- Data wrangling colocation

_"Good code is it's own documentation"_ is a popular quip, most often used to explain or excuse a lack of comments. And although clarity at a micro scale (sensible variable names, logical arguments, good spacing) is hugely important, and may mean a reduced number of comments, I'm not sure a lack of documentation at a macro scale is such a good thing.
