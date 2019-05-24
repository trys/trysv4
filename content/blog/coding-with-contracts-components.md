---
title: Coding with contracts - Components
date: 2019-05-21
categories: Web
---

This is the second in a series called 'coding with contracts', a look into writing robust [API's](/blog/coding-with-contracts-api), components, and more!

---

Following on from the [previous installment](/blog/coding-with-contracts-api/), we're going to focus on component contracts.

Components require a similar level of trust to a REST API, in fact, we interact with them in surprisingly similar ways. A component exposes a form of public API, an I/O in the shape of props and events. Keeping this API clear and consistent increases the trustworthiness of the component, making it easier to integrate.

A component developed in isolation within a pattern library will often face different challenges to one developed directly within the codebase. For these components, it's especially important we document their I/O and declare how they can and should be used. Here's how I'd sum up a component within a system:

> A component should lay out a considered API and stick to it. Tests should confirm that the I/O is unaltered after any refactoring.

## Props

Props are the most common form of interaction with a component, and the one of the most crucial elements to tie down. They should be named logically, and declared with their accepted prop types. A developer integrating a component shouldn't have to delve within the codebase to see how a prop works; it should either be painfully obvious from the prop name, and ideally followed up with a descriptor comment. There's a great [Storybook add-on](https://github.com/pocka/storybook-addon-vue-info) for Vue, that'll let you expose these descriptions.

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

_"Good code is it's own documentation"_ is a popular quip, most often used to explain or excuse a lack of comments. And although clarity at a micro scale (sensible variable names, logical arguments, good spacing) is hugely important, and may mean a reduced number of comments, I'm not sure a lack of documentation at a macro scale is such a good thing. A comment is perfect for explaining the **whys** and **why nots**. Finding out what a component doesn't do is surprisingly useful, and often overlooked.

Components should be flexible, but not overstretch their reach. Flexibility shouldn't be handled by saturating the component with props. The more props, the more cognitive load required to understand and use it. Composing simpler, single responsibility components, into more complex interfaces is often a more scalable way of working.

An alternative approach is to wrap simpler components with variants. You'll have more components in total, but they'll be easier to digest and maintain, assuming you keep a consistent API with the simple component. This sounds remarkably like a contract!

[Mixins](https://vuejs.org/v2/guide/mixins.html) are definitely your friend here. They let you share common props, events, and methods with multiple components, keeping a tidy single source of truth.

## Events

As a general rule of thumb, Props provide the input to a component, and events provide the output. It's the same execution model as HTML elements, attributes are 'input' to the element, and event listeners tell us when things have changed, ie. output.

Vue does a wonderful job of separating these two concepts, exposing an 'event emitter' that you can use to fire events out of a child component. Calling `this.$emit('click')` in a child component sends out the event, and this can be listened to with an `@click` prop in the parent. Vue's [official docs](https://vuejs.org/v2/guide/events.html) on this are well worth a read.

React muddies these waters somewhat; you pass in an event listener function like any other prop, and call it directly in a child component. It's more hands-on and perhaps more explicit, but there's something wonderful about the opt-in event model in Vue. React's never been one for separating concerns, and I wouldn't be surprised if they work in very similar ways under the hood, but personally I like that distiction between component input and output.

Vue takes it one step further with `v-model`. It's a standardised way of controlling component state that works great with form inputs, and third-party dependencies. The concept is based around 'two-way data binding' - a piece of stateful data is stored in a parent component, and passed into a child component (let's say it's an input field) with a `:value` prop. When the input changes, it fires out an `input` event. We can listen to that in the parent, and update the state.

![v-model data flow](/images/blog/data-flow.png)

`v-model` wraps this all up into a single directive. Check out the [official documentation](https://vuejs.org/v2/guide/forms.html) for detailed instructions. This model is really powerful, and shouldn't be underestimated. Although often associated with inputs, `v-model` can be used with **any** component; as long as you accept a `:value` prop, and emit an `input` event, anyone consuming the component can use the `v-model` directive.

It's a great example of when to use syntax sugar. Under the hood, `v-model` is just adding the `:value` and `@input` props (plus a bit of cross-browser goodness), but it makes component consumption so much nicer, and more consistent. Having standards and rules might sound draconian, but it's generally for the good of the developers consuming the code. It's also confirms that it's worth reading and understanding framework documentation before embarking on a larger project. Most problems we face have been solved before, and the solutions are often baked into the frameworks already.

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

The key takeaway is to document slots, and particularly the scoped data/methods they expose. By placing a method in a scoped slot, you extend the public API of your component. It should therefore be as well considered, documented and consisted as your props and events. Don't flood slots with all the methods & data from the child component, it may seem like a simple way to cover all bases, but it commits you to maintaining that data contract for life.

---

## Refs

Refs are another way of gaining access to a child component from a parent. But unlike all the aforementioned features, refs are dictated by the parent, not the child. This makes them particularly difficult to tie-down and plan for. They break the concept of 'props in, events out', getting you access to internal methods and letting you fire 'events in'. For that reason, they should really be a last resort, but should you need to use them, here's a few thoughts.

Objects and classes can't have private methods in JavaScript (yet?!), so you can't explicitly denote a method as being externally reachable. A starting point is to add a sizable comment above the method declaration, warning future developers that this methods is called externally.

```js
methods: {
  /**
   * Public method
   *
   * This method is called via refs from outside this component
   */
  focus() {
    this.$refs.input.focus();
  }
}
```

I'd also err on adding a 'Public methods' section to the component documentation summary. Our aim in documenting should be to surface every feature, and anything out of the ordinary within the component.

> Documentation is as much a way to show how a component should and shouldn't be used, as it is a feature list preventing future developers unnecessarily building similar functionality.
