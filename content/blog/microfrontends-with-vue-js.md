---
title: Microfrontends with Vue.js
year: 2019
date: 2019-11-13
categories: Web
tags:
  - vue
---

We've recently been building a complex search integration for a holiday provider using a microfrontends approach in Vue.js.

I've [noted in the past](https://www.trysmudford.com/blog/city-life/), that there's a common trap many fall into with frontend frameworks:

> Not all of your app/site needs to be controlled by JavaScript. When you dive into the framework pool, the natural, and most documented step is to write it all in the framework.

This site uses a traditional server-rendered stack, so we began from a position of great markup, and added layers of functionality. Instead of using Vue CLI to spin up a new Vue website, we opted to `import` Vue into the existing JS pipeline - a Gulp build system provided by the client. It meant losing some of the <abbr title="Hot Module Reloading">HMR</abbr> benefits that come from a well-tuned Webpack setup, but it was definitely the most appropriate and comfortable option to fit for the client.

That's one of the fun parts of agency-life, each project is a case of finding the balance between user needs, client appropriateness, and developer appetite.

## Requirements

The site needed to render components for various features on the results page:

1. Search panel
2. Search results & pagination
3. Search filters
4. Search sorting

And a different set on the details page:

1. Search panel
2. Holiday details
3. Edit holiday details
4. Holiday pricing

## Choosing an approach

The next decision was working out how to slice up the Vue parts of the site. As we'd ruled out letting Vue control the entire page, our options were limited to:

### Option 1

Write isolated Vue instances that read data from localStorage & the URL, and work independently.

![](/images/blog/microfrontends-option-1.jpg)

There was some definite initial appetite for this choice. Truly encapsulated components is the utopian dream, but it has a major downside: code duplication. If each component is working in isolation, they all have to do a lot of similar grunt work (reading URLs, catching errors, responding to APIs).

### Option 2

Use a single Vue instance wrapper and use `portal-vue` to push the components into the correct parts of the non-Vue DOM

![](/images/blog/microfrontends-option-2.jpg)

The client had previous experience with `portal-vue`, so this seemed like a sensible route. But for our use-case, `portal-vue` simply acted as an unnecessary abstraction around Vue's default instance mounting logic. Sharing a Vue instance would also mean prop-drilling and event bubbling galore. Not fun.

### Option 3

Write a Vue instance per feature, mount them to various DOM nodes, and link them all together with a Vuex store.

![](/images/blog/microfrontends-option-3.jpg)

Vue already has a 'portal' system out of the box: the `.mount()` function. This, combined with Vue's ability to automatically inject the store dependency into all child components, makes this option extremely powerful. Every feature of the website is its own distinct Vue application, but with the option to hook into global data if required.

## The code

Here's how we instantiated the various Vue applications:

```js
import Vue from 'vue';
import SearchPanel from './components/SearchPanel/SearchPanel.vue';
import SearchResults from './components/SearchResults/SearchResults.vue';
import Feefo from './components/Reviews/Feefo.vue';
import store from './store';

store.dispatch('init', storeDefaults);

const vueRoots = [
  {
    id: 'search-panel',
    component: SearchPanel,
    store
  },
  {
    id: 'search-results',
    component: SearchResults,
    store
  },
  {
    id: 'reviews-box',
    component: Feefo
  }
];

vueRoots.forEach(({ id, store, component }) => {
  if (document.getElementById(id)) {
    new Vue({
      store,
      render: h => h(component)
    }).$mount(`#${id}`);
  }
});
```

After importing our top-level components, we instantiate the store, passing in any default state (driven by server-rendered JSON). This backbone of data includes items like API endpoints and feature flags.

Next we have a list of all the Vue instances we wish to load. It's here where we pass in the reference to the store for the components that require it. In the example above, the Feefo component doesn't need access to the store, so it doesn't get lumbered with it.

Finally, we loop around the objects and check whether the mounting node is on the current page. Vue will still instantiate a component, even if element isn't available. While this can be helpful, it's not the desired effect for this site.

## Accessing data

The beauty of this approach over option two, is the way Vue injects the store as a property of `this` in all child components & mixins.

Reading global data is so clean:

```js
export default {
  computed: {
    hasResults() {
      return !!this.$store.state.results.length;
    }
  }
};
```

Writing data is a little more involved. Due to the actions/mutations pattern in Vuex, we can't write directly to `this.$store.state` properties.

One approach I tend to lean towards is a generic state updater mutation, which works for most use-cases:

```js
const mutations = {
  updateState(state, payload) {
    const payloads = !Array.isArray(payload) ? [payload] : payload;

    for (const { key, value } of payloads) {
      state[key] = Array.isArray(value) ? [...value] : value;
    }
  }
};
```

Writing to global state is achieved with the following call:

```js
this.$store.commit('updateState', {
  key: 'stateKey',
  value: 'new-value'
});

// Multiple value update
this.$store.commit('updateState', [
  {
    key: 'stateKey',
    value: 'new-value'
  },
  {
    key: 'aDifferentStateKey',
    value: 'another-value'
  }
]);
```

## Vuex helpers

Store state is generally read in with computed properties, but it can be cumbersome writing `this.$store.state.key` if you're pulling in a lot of data. Vuex comes with some handy helper methods out of the box for this very purpose.

```js
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['results']),

    hasResults() {
      return !!this.results.length;
    }
  }
};
```

`mapGetters`, `mapActions` and `mapMutations` work in the same way, and go a long way towards cleaning up your code.

## Microfrontends benefits

The biggest win from this approach came when we realised that the 'Edit holiday details' component really should be working against the same dataset as the 'Search panel'. Had they been written as isolated components; reading data in from the URL and working independently, it would've been a nightmare to unpick. This approach made is very straightforward to conform the two components retrospectively.

This approach doesn't give you the ability to communicate directly between components, but that's broadly seen as a feature, not a bug. Firing events out and receiving data in is a scalable component design paradigm. Components, where possible, should be a [reflection of state, not stateful](https://www.trysmudford.com/blog/coding-with-contracts-components/).

We're used to the idea of systematic design, and component-based thinking, but this frontend infrastructure modularity feels like an interesting space. There's certainly more to be explored when it comes to bundle sizes, dynamic imports, and working with multiple stores/modules, but on the back of this project, it feels like a very viable approach to adding a bit of framework spice to a server-rendered site.

[Preact](https://preactjs.com/) & [Unistore](https://github.com/developit/unistore) does a great job of injecting different dependencies into a component if you're on the other side of the JS fence! I've written about that previously [here](https://www.trysmudford.com/blog/injecting-dependencies-with-unistore/).
