---
title: Brussels Day 2
year: 2017
date: 2017-10-18
categories: Web
---

Day 2 kicked off with a great explanation of Vue.js transitions. It’s a subject I’ve never truly understood; as great as the documentation is, it does help hearing about the motive behind the feature, especially from the person who created it!

jQuery animations are imperative. Vue transitions are declarative. In the context of fading out an element, they work by separating ‘leaving’ and ‘exiting’. That is, from the moment you ask it to remove the component, to one frame before the component is removed from the DOM. The `.[name]-leave` and `.[name]-leave-to` CSS classes handle these moments.

The `.[name]-leave-active` class is the class that runs the transition, it’s where you add transition: `opacity 0.5s ease`. The killer feature is that Vue infers all the timings from your CSS, there’s no duplication in JS or any need to listen for a `transitionEnd` event!

We went into so much more detail, including keyframe animations & libraries, component transition events and higher-order transition components.

## Vue CLI

The command-line interface for Vue differs from other JS frameworks in that it is 90% a scaffolding tool. Once it has given you the files, that’s pretty much it.

Then we went down the Webpack rabbit warren..! In all seriousness, this was the first time someone has explained Webpack to me and it all made sense. The penny might’ve finally dropped!

One killer feature is the dead code elimination that’s achieved in conjunction with UglifyJS.

```javascript
new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"'
    }
})
```

By swapping out all instances of `process.env` to the string ‘production’, the following:

```javascript
if (process.env !== 'production') {...}
```

is swapped to:

```javascript
if ('production' !== 'production') {...}
```

Which UglifyJS reads as:

```javascript
if (false) {...}
```

So it can safely strip the code away entirely. This is how a framework strips out warnings in a ‘production’ build. Mindblown.gif.

## Routing

We built a manual hash-based router which was gradually refactored into a proper [Vue router](https://router.vuejs.org/en/) component. It was good to see a link to the [historyApiFallback](https://router.vuejs.org/en/essentials/history-mode.html) implementations in the documentation. PHP isn’t entirely dead!

A feature that had totally passed me by was passing in `props: true` into the route object. This auto-adds the params as props (as long as you request them on the component). It makes testing a component far easier, we don’t need a `$route` object, just the ability to pass starter props in.

Nested mappings and redirects were next on the agenda. Following that, we looked at route hooks, meta properties and in-component hooks. That led rather nicely onto data fetching patterns – something I’ve been very keen to learn.

## Task – make a blog

After lunch, we made a simple blog with an index page and post pages. It provided an opportunity to put into practise the data fetching patterns we’d worked on earlier.

There was an interesting point raised about ‘over-componenting’. There’s no clear-cut way to decide when to make native HTML elements into a component. It’s a question of taste, maintainability and reusability. You shouldn’t make components for the sake of it, fragmenting an app too much will cause unnecessary mental context switches.

## Async components

Dynamic imports and Webpack are black magic. It’s incredible. With babel-syntax-dynamic-imports, you can write:

```javascript
const Post = () => import('./Post.vue')
```

and it will automatically create and handle an async component. MindBlownAgain.gif.

## State management

Vuex (and other Flux implementations) move the source of truth to a global area. They’re designed for long-term, big and multi-dev projects. They’re not for every project.

We then took a deep-dive into how Vue.js tracks dependancies using `Object.defineProperty` getters & setters. We also discussed the difference between ‘Mutable style’ (used by Vue.js) and ‘Immutable style’ (used by React).

With mutable style code, we don’t have to return a copy after each state change, we don’t even need to call `setState`, the getters and setters on the mutable data catches the changes and reacts automatically.

The Vuex dev-tools time-travel is epic. But it has a more grounded use of import/export for your app state. It means you can hand off state to a colleague and they’ll be able to boot up to where you were. Perfect for bug fixing.

Computed properties from the store give you dependancy tracking and getters are the Vuex equivalent to computed properties. They have the same caching behaviour. One extra win is that getters are cached globally, computed properties are cached locally.

Following that, we refactored our blog to use stores. By implementing global state management, we could reduce the number of API requests required to navigate the site. One gotcha was caching. You do need to plan caching quite carefully when holding internal state. I guess an alternative is to leave caching to a `ServiceWorker` and handle each API request as if it’s fresh.

Another cracking day. The difficulty is definitely ramping up so I’m excited to see what day three brings!
