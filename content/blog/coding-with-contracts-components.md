---
title: Coding with contracts - Components
date: 2019-05-21
categories: Web
---

This is the second in a series called 'coding with contracts', a look into writing robust [API's](/blog/coding-with-contracts-api), components, and more!

---

Following on from the [last installment](/blog/coding-with-contracts-api/), we're going to focus on component contracts.

Components require a similar level of trust to a REST API, in fact, we interact with them in surprisingly similar ways. A component exposes a public API, an I/O in the form of props and events. Keeping this API clear and consistent increases the trustworthiness of the component, making it easier to integrate.

A component developed in isolation within a pattern library will often face different challenges to one developed directly within the codebase. For these components, it's important we document their I/O and declare how they can and should be used.

## Props

Props are the most common form of interaction with a component, and the one of the most crucial elements to tie down. They should be named logically, and declared with accepted prop types. A developer integrating a component shouldn't have to delve within the codebase to see how a prop works, it should either be painfully obvious from the prop name, or followed up with a descriptor comment. There's a great [Storybook add-on](https://github.com/pocka/storybook-addon-vue-info) for Vue, that'll let you expose these descriptions.

```js
export default {
  name: 'card',

  props: {
    /**
     * A heading for the card, aim for 30-50 characters
     */
    heading: {
      type: String,
      required: true
    }
  }
};
```

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

Slots allow you to override or extend components, but they're also a way of lifting child logic and methods back up into the parent. I recently wrote an extensive run-through of [slots and how to use them](/blog/dynamic-scoped-slots-in-vue-js/), so I won't dwell on them for too long.

React has a much more liberal approach to passing components around than Vue. In fact, it's one of it's strongest points IMHO. Passing a component via a prop is pretty common place in React-land, but it's more difficult in Vue. This is where slots come in.

```jsx
// React
<list render={(item) => <list-item item={item}>} />

// Vue
<list>
  <template v-slot:item="item">
    <list-item :item="item" />
  </template>
</list>
```

As you can see, React is significantly more succinct than Vue for this sort of thing, but it does look considerably less like HTML.

## Events

As a general rule of thumb. props provide the input to a component, and events provide the output. It's the same execution model as HTML elements, attributes are 'input' to the element, and event listeners tell us when things have changed, ie. output.

Vue does a wonderful job of separating these two concepts, exposing an 'event emitter' that you can use to fire events out of a child component. React muddies these waters somewhat, where you pass in an event listener, and call it directly on a child component. It's more hands-on and explicit, but there's something wonderful about the opt-in event model in Vue. React's never been one for separating concerns, and I wouldn't be surprised if they work in very similar ways under the hood, but personally I like that distiction between component input and output.

Vue takes it one step further with `v-model`. It's a standardised way of controlling component state that works great with form inputs, and third-party dependencies. The concept is based around 'one-way data flow' - a piece of stateful data is stored in a parent component, and passed into a child component (let's say it's an input field) with a `:value` prop. When the input changes, it fires out an `input` event. We can listen to that in the parent, and update the state.

This model is really powerful, and shouldn't be underestimated.

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
