---
title: Brussels Day 1
date: 2017-10-17
categories: Web
---

## Building Scalable Web App with Vue.js by Evan You

I’ve just got back to the hotel after the first day of the Hackages workshop. After a bit of food and a Leffe beer in my hand, I’m ready to starting unpacking the 10 pages of notes I wrote. There was so much great stuff to take in!

We kicked off by going over the high-level concepts of Vue. It was handy to see where it fits in to JS ecosystem, particularly comparing it to the other frameworks out there – not from a ‘which one is best’ attitude, but from a ‘which is the most opinionated. **Vue has opinions, but they’re optional.**

The Vue team takes responsibility for the core libraries like Vuex and Vue-Router. They’re guaranteed to be compatible with each other.

Then we started running through a basic ‘hello, world’ example, including the different ways to mount Vue. Turns out you can run Vue without mounting it to the DOM and still get all the benefits of data binding and reactive state. This is useful for unit testing.

V1 of Vue walked through the DOM on load and set up bindings. V2 live-compiles your templates into render functions. This produces VDOM which reattaches itself back onto the DOM itself. Webpack precompiles those templates which lowers the cost to the user. But it’s not a required step, you can prototype without it. Infact, we didn’t touch Webpack, CLI or any build tool at all today!

Evan touched on the difference between declarative and imperative programming, specifically relating to DOM manipulation. jQuery is imperative, you have to call `$('.some').text(thing)` every time thing changes. This is a bug source. Reactive frameworks take that responsibility away from you. It tracks ‘dependancies’ and when they change, it re-renders all affected DOM nodes.

The first step to any modern JS project is to chunk the design into small components. This is the key to maintainability and scalability. Without proper abstraction, you hit the maintainability boundary far quicker. We’ve all seen too many spaghetti-code JS projects, right?

A component should have a maintained ‘contact’ to the outside world, it’s public API. This makes a component sharable, reusable and swappable.

## Directives

Directives like `v-if` are extended HTML attributes. The standard implementation is plain text, `v-html` allows raw HTML and opens you up to XSS. Similarly, never mount Vue to user-generated content.

## Binding structures

`v-if` and `v-show` looks pretty similar but one removes the DOM node and the other one toggles display: none. The former is lazy and better suited to big chunks of ‘static’ HTML, the latter is better for regularly toggled elements.

`v-for` has loads of nifty features on top of array/object looping. It can iterate numbers, break up strings, pass out different-based indexes and be sliced to limit output.

Vue uses a VDOM diffing algorithm to determine what needs to be re-rendered and what can be changed with simple text updates. key is the key to ensuring a re-render, and it has to be unique, don’t use the iterator id. It’s useful on other directives to ensure their lifecycle hooks get called.

After a bit of detail on event handling, we moved onto the classic:

## Todo list

This was a nice task to get us into the swing of things. There were useful tidbits like: When using `@input`, omitting the parentheses on the method call passes in the DOM event into the method. Then you can use event.target.value. `v-model` is just sugar over `:bind` and `@input`. `v-model` also handle cross-browser incompatibilities for you.

Modifiers make subtle changes to directives. `.prevent` calls `event.preventDefault()` etc.

You can use ‘decorators’ to handle more complex keychain combinations. This keeps the template clean and hides the repetitive tasks in JS.

Code should be as decoupled from the browser as possible, it’ll help if you want to move to SSR.

Radio, checkboxes and select/multi-selects all work very similarly. Just bind them to a single `v-model` and Vue does the legwork for you.

## Computed properties

They must be a function! You can put expensive computation in here, they only get updated if the dependencies change.

Computed properties create ‘derived state’. They’re computed on the fly, they’re temporary, and they don’t need to persist. As long as you have have source data, you can create the derived state on demand.

Side note, watchers should only be used for ‘side-effect’ code like Google Analytics calls or drawing to a canvas. Only use them for things that can’t be expressed as part of the template.

## Components

After lunch, we jumped into custom components.

The data property must be a function, this is to stop shared data scope. This is the same for default props.

Props express the data that should be passed to them, it becomes the public interface for the component.

Then we discussed a really key topic: Colocation. **Data should be mutated where it is declared.**

We do this by passing props down and emitting events up. Instead of changing child state for a looped component, emit an event to the parent and change it there. Encapsulate ‘dirty work’ inside the component but let the parent handle the pure data.

## Lifecycle hooks & Data flow

There are a number of component lifecycle hooks. Each is useful for different tasks.

Two-way binding is often seen as ‘better’ than one-way. But that assumes your two-way data binding is better than Angular 1 where it was possible to have two sources of truth.

By moving logic to a parent component, a child can express an intention to update props. If it changes props directly, they can be overwritten on re-render.

The sync modifier does two-way binding but it’s not for all cases, emitting events is the correct ‘standard’ way.

## Custom inputs

Creating a ‘super-input’ is straightforward:

```javascript
Vue.component('my-input', {
   props: ['value'],
   template: `<input :value="value" @input="$emit('input', $event.target.value)" />`
});
<my-input v-model="foo"></my-input>
```

## Slots

Slots are good for layout components, content composition and content distribution. They inject the children of the parent into the slot value. Scoped slots look epic, we get to that on day three.

## Final task
Create a custom `<select>` box.

## Closing thoughts

What a first day. I feared today could be a bit dull, just going over things I already knew. It wasn’t. There were so many bits and pieces I noted down in the morning and the afternoon deep-dive into data flow answered and clarified many questions I had about child components.

Roll on day two!
