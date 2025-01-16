---
title: Brussels Day 3
year: 2017
date: 2017-10-19
categories: Web
---

We started off discussing testing in Vue.js, specifically how to test, what to test and what tools to use.

Unit tests should test components logically, not presentationally. They shouldn't test how the component works internally; that's too tightly coupled. It should test how the 'public API' of the component works. The IO of the component is the most important factor to test, how it works internally is open for refactoring.

Vue-test-utils with Mocha and Webpack is the recommended option, with the 'expect' assertion library on top. Test utils wraps components and adds useful methods like `.find()` and `.trigger()`. The `.emitted()` method helps you test emitted events.

Routing is application-level code, it's worth using E2E testing for that.

## Custom directives

These are used for low-level DOM interactions but it's better to write code that's not tightly coupled to the the DOM. It'll make code re-use in SSR and native apps far easier. A custom directive can be bound to a JS expression – which is nice.

`v-show` is essentially a simple directive that calls:

```javascript
style.display = binding.value ? 'block' : 'none'
```

## Plugins & Mixins

Plugins are good for registering global directives, components and mixins. Global mixins are very powerful so you'll want to either avoid doing expensive computation, or at least test whether a component needs to use the mixin.

## Task – creating a basic validation plugin

There were some killer tips and refactors in this task. I'm going to have to sleep on this one for a while!

```javascript
const validatorPlugin = {
   install(Vue) {
       Vue.mixin({
           created() {
               const validations = this.$options.validator;
               if (validations) {
                   Object.keys(validations).forEach(key =< {
                       const { assert, message } = validations[key]
                       this.$watch(key, value =< {
                           const result = assert(value)
                           if(!result) {
                               console.error(message(key, value))
                           }
                       })
                   })
               }
           }
       })
      
   }
}
Vue.use(validatorPlugin)

const vm = new Vue({
 el: '#app',
 data: {
   value: 1,
   foo: 2
 },
 validator: {
   value: {
       assert: newValue =< newValue < 1,
       message: (key, value) =< `${key} must be greater than 1, but got ${value}`
   }
 }
})
```

In a plugin, the aim is abstract away the 'dirty work' like watchers and iteration and let the user be declarative with the code you expose.

Computed properties provide a different and cleaner alternative to raw watchers.

```javascript
computed: {
    warnings() {
        const warnings = []
        const validations = this.$options.validator
        if(validations) {
            Object.keys(validations).forEach(key => {
                const value = this[key]
                const { assert, message } = validations[key]
                const result = assert(value)
                if(!result) {
                    warnings.push(message(key, value))
                }
            })
        }
        return warnings
    }
}
```

The cleanliness is tremendous.

## Render functions

This; like Webpack, has been another penny waiting to drop. By understanding how Vue uses single-file components, I suddenly understood how render functions work! Template -> compiled into Render Function -> returns VDOM -> generates actual DOM.

They are perfect for logic-heavy templates where access to the full JS stack is more useful than some HTML directives.

The h function does all the heavy-lifting but it's really not as bad as it first seemed. It takes three args: 'tagName', 'data', 'children'. From that, you can do clever things like implementing the :is directive in one line:

```javascript
return h('div', [ h(routeTable[this.currentView]) ] )
```

## Task – component with render functions

Turn:

```html
<render-function tags=”['div', 'span', 'p']” />
```

Into:

```html
<div>0</div><span>1</span><p>2</p>
```

This sounds like reasonably complicated task for templates. But it's a breeze with render functions:

```javascript
Vue.component('render-function', {
   props: {
       tags: Array
   },
   render(h) {
       return h('div', this.tags.map(h))
   }
})
```

## Component patterns

After lunch, we finished the workshop off going through component patterns. Specifically:

- Functional components
- Async components
- Higher-order components
- Abstract components & scoped slots

There was so much good stuff in here!

## Functional components

Functional components are non-reactive, the don't have an 'instance' so you don't have access to `this`. The benefit is that they're very performant as they don't need to manage their internal state and they don't have a lifecycle, their parent does it for them. So icons and buttons are great potential performance-win candidates when converted to be functional.

You can now convert a single file component to be functional with `<template functional>`. They're also great candidates for higher-order components.

## Async components

These can have loading & error states, as well as a delay for loading and a timeout value. This can greatly improve your web app UX.

## Higher-order components

These are a bit like currying functions, they wrap a standard component and augment extra logic on top of it. They are great ways to implement a complex element that has a simple public API for the user. An example is a 'super-select' or a specific transition effect that you want to re-use around your app.

## Abstract components

`<transition>` is an abstract component, it doesn't produce any markup for the DOM but it does produce vNodes. Effectively, it's just a wrapper for it's children.

A great example is an `<error-boundary>` component that catches errors thrown in child components and lets you catch and display them nicely to the user. This uses the new `errorCaptured` method.

```javascript
Vue.component('error-boundary', {
   data() {
       return {
           error: null
       }
   },
   errorCaptured(e) {
       this.error = e
   },
   render(h) {
       if (this.error) {
           return h('div', 'Errors!')
       } else {
           return this.$slots.default[0]
       }
   }
})
```

It could catch the errors and send them to a logging service or you could deploy a beta feature to the app wrapped in this `<error-boundary>` to have confidence it won't crash the whole app!

We then looked at scoped slots and all the craziness that they bring. They're another great way to abstract complex logic away from the user, but still give them the choice of how to display the output.

---

That rounded out the three-day workshop! It was a great deep-dive into Vue.js and I learned a tonne of stuff. I feel so much more confident in the framework and I'm ready to get stuck-in to using it at work and on side projects very soon!

A massive thanks to [Evan You](https://twitter.com/youyuxi) for the brilliant training, it was so inspiring and useful to be able to ask him questions and understand his motives behind the project.

Also a huge thanks to [Hackages](https://hackages.io/) for organising the course so well and Science14 for providing such a great venue!

![Evan You and I](/images/blog/7240RP1y-675x1200.jpg)
