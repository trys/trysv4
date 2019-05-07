---
title: Coding with contracts - Components
date: 2019-05-07
categories: Web
---

This is the second in a series called 'coding with contracts', a look into writing robust [API's](/blog/coding-with-contracts-api), components, and more!

---

Following on from the [last installment](/blog/coding-with-contracts-api/), we're going to focus on component contracts.

Components require a similar level of trust to a REST API, in fact, we interact with them in surprisingly similar ways. A component exposes a public API, an I/O in the form of props and events. Keeping this API clear and consistent increases the trustworthiness of the component, making it easier to integrate.

A component developed in isolation within a pattern library will often face different challenges to one developed directly within the codebase. For these components, it's important we document their I/O and declare how they can and should be used.

## Props

Props are the most common form of interaction with a component, and the one of the most crucial elements to tie down. They should be named logically, and declared with accepted prop types. A developer integrating a component shouldn't have to delve within the codebase to see how a prop works, it should either be painfully obvious from the prop name, or followed up with a descriptor comment. There's a great [Storybook add-on](https://github.com/pocka/storybook-addon-vue-info) for Vue, that'll let you expose these descriptions.

_"Good code is it's own documentation"_ is a popular quip, most often used to explain or excuse a lack of comments. And although clarity at a micro scale (sensible variable names, logical arguments, good spacing) is hugely important, and may mean a reduced number of comments, I'm not sure a lack of documentation at a macro scale is such a good thing. A comment is perfect for explaining the **why**.

## Slots and render props

A good component will be extensible.

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
