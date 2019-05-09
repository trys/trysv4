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

_"Good code is it's own documentation"_ is a popular quip, most often used to explain or excuse a lack of comments. And although clarity at a micro scale (sensible variable names, logical arguments, good spacing) is hugely important, and may mean a reduced number of comments, I'm not sure a lack of documentation at a macro scale is such a good thing. A comment is perfect for explaining the **whys** and **why nots**. Finding out what a component doesn't do is very interesting, and often overlooked.

Components should be flexible, but not overstretch their reach. Flexibility shouldn't be handled by saturating the component with props. The more props, the more cognitive load required to understand the scope of the component. Composing simpler, single responsibility components, into more complex interfaces is often a more scalable approach.

An alternative approach is to wrap simpler components in varient components. You'll have more components in total, but they'll be easier to digest and maintain, assuming you keep a consistent API with the simple component. This sounds remarkably like a contract! Here's how I'd sum up a component within a system:

> A component should lay out a considered API and stick to it. Tests should confirm that the I/O is unaltered after any refactoring.

## Slots and render props

As mentioned earlier, a good component should be extensible and flexible. Along with props, slots (Vue) and render props (React) are a great way of achieving this. I'll focus on slots to keep things concise, but the same rules apply to render props.

The default slot is often the most overlooked in Vue. One of the great joys of Vue is the HTML-like syntax, but so regularly it gets substituted for yet another prop. Aim to be **'HTML-like'** when you can; it keeps down that barrier to entry, and improves readability.

```jsx
// 🤔
<my-button label="Label" />

// 😎
<my-button>Label</my-button>
```

Slots allow you to override or extend components, but they're also a way of lifting child logic and methods back up into the parent. I recently wrote an extensive run-through of [slots and how to use them](/blog/dynamic-scoped-slots-in-vue-js/), so I won't dwell on them any longer other.

## Events

With props providing input to a component, events provide the output.

---

## Refs

Clearly comment where are component calls an inner method via a ref.

---

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
