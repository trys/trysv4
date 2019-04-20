---
title: Dynamic scoped slots in Vue.js
date: 2019-04-11
categories: Web
description: 'A run-through of default, named, scoped and dynamic scoped slots in Vue.js'
---

[Slots](https://vuejs.org/v2/guide/components-slots.html) are super-powerful in Vue.js. They let you inject components from a parent into a various parts of the child, helping you compose nice and generic components. But that's not all! We'll take a run-up to dynamic scoped slots through the following:

- [Default slots](/blog/dynamic-scoped-slots-in-vue-js#default-slots)
- [Named slots](/blog/dynamic-scoped-slots-in-vue-js#named-slots)
- [Scoped slots](/blog/dynamic-scoped-slots-in-vue-js#scoped-slots)
- [Dynamic scoped slots](/blog/dynamic-scoped-slots-in-vue-js#dynamic-scoped-slots)

Btw, apologies for the syntax highlighting, it struggles a bit with Vue!

## Default slots

This is the most basic of slots. It takes the content you provide in the child declaration: `<comp>THIS BIT</comp>`, and injects it into the component.

```jsx
// Component: PageHeader
<template>
  <header>
    <h1>Our header</h1>
    <slot />
  </header>
</template>

// Parent
<template>
  <body>
    <PageHeader>
      <h2>Custom content</h2>
    </PageHeader>
  </body>
</template>
```

This will render as:

```jsx
<template>
  <body>
    <header>
      <h1>Our header</h1>
      <h2>Custom content</h2>
    </header>
  </body>
</template>
```

## Named slots

Named slots allow you to inject multiple bits of content within a child component:

```jsx
// Component: PageTemplate
<template>
  <body>
    <header>
      <slot name="header" />
    </header>

    <slot name="content" />

    <footer>
      <slot name="footer" />
    </footer>
  </body>
</template>

// Parent
<template>
  <PageTemplate>
    <template v-slot:header>
      <h1>Header content</h1>
    </template>

    <template v-slot:content>
      <p>Page content</p>
    </template>

    <template v-slot:footer>
      &copy; 2019
    </template>
  </PageTemplate>
</template>
```

## Scoped slots

Scoped slots let you pass data/methods from the child component, **back into the parent**. It's really useful for list rendering, where the child does some data-wrangling and global styling, but the parent can still define the shape of each list item:

```jsx
// Component: List
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot
        name="item"
        :item="item"
        :remove="removeItem"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  methods: {
    removeItem(id) {
      // ... handle item removal
    }
  }
}
</script>
```

The parent can then implement it's own rendering style for different data structures:

```jsx
// Parent
<template>
  <List :items="items">
    <template v-slot:item="{ item, remove }">
      {{ item.name }}
      <button
        type="button"
        @click="remove(item.id)"
      >Delete</button>
    </template>
  </List>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: '1',
          name: 'Trys'
        }
      ]
    }
  }
}
</script>
```

Note the attribute: `v-slot:item="{ item, remove }"`. It tells Vue which named slot to use, exposes the passed props, which we can destructure. This could be a method or data and works a bit like a render-function in React.

## Dynamic scoped slots

Right, the final piece of the puzzle. Dynamic scoped slots are much like regular scoped slots, but they have a name derived at runtime. How is that useful, you may ask...

Take a multi-step form. You want a wrapper element that'll handle all the styling and step navigation, and you want to feed the steps as an array. Most steps have a consistent header, but a few of them need additional components to be rendered within. If this was React-land, we could pass full components in the array easily enough, but Vue makes this sorta thing a bit more tricksy. Let's approach this from the outside, and define how we want to use this component before building it.

```jsx
// Parent
<template>
  <multi-step-form steps="steps">
    // Our default header
    <template v-slot:header="{ step }">
      <h1>{{ step.title }}</h1>
    </template>

    // Our additional content for the step one header
    <template v-slot:['header_step-1']="{ save }">
      <p>Additional content, just for step one</p>
      <button type="button" @click="save">Save</button>
    </template>
  </multi-step-form>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {
          id: 'step-1',
          title: 'First step'
        },
        {
          id: 'step-2',
          title: 'Second step'
        }
      ]
    }
  }
}
</script>
```

Cool, onto building this component:

```jsx
<template>
  <form>
    <div v-for="step in steps" :key="step.id">
      // Our default header
      <slot
        name="header"
        :step="step"
        :save="save"
      />

      // Our additional content for any step
      <slot
        :name="`header_${step.id}`"
        :step="step"
        :save="save"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    steps: Array
  },

  methods: {
    save() {
      // ... Saving logic
    }
  }
}
</script>
```

With that intriguing looking `<slot />` tag, we create a dynamic scoped slot that'll only be rendered when a corresponding `<template name="header_step-1">` is used by the parent. We can still pass in custom data and methods like any other scoped slot.

You could even hide the default header if a dynamic slot has been passed in with the following code:

```jsx
<template>
  <form>
    <div v-for="step in steps" :key="step.id">
      // Our default header
      <slot
        v-if="!$scopedSlots[`header_${step.id}`]"
        name="header"
        :step="step"
        :save="save"
      />

      // Our alternative header for provided steps
      <slot
        :name="`header_${step.id}`"
        :step="step"
        :save="save"
      />
    </div>
  </form>
</template>
```

Pretty neat!
