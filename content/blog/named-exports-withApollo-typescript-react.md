---
title: Named exports withApollo in Typescript React
date: 2018-11-06
categories: Web
description: How to use withApollo with named exports in Typescript React
---

I came across a small hurdle when working with GraphQL fragments. To get access to the Apollo client, it needed to be wrapped in the `withApollo` higher-order component, a task which is usually straightforward. However, things are a little more tricky when the component uses named exports.

Here's a 'standard' component as a starting point:

```js
import * as React from 'react'

class Sidebar extends React.Component {
  public render() {
    // ...
  }
}

export { Sidebar }
```

On the surface, that final line looks like a ordinary object with property/value shorthand, but sadly that's not the case. Assignment within that 'object' is not allowed, it **only accepts a comma separated list**. This prevents `withApollo` being assigned in a 'normal' object-y way:

```js
export { Sidebar: withApollo(Sidebar) }
```

## The solution

Although not very elegant, the best solution I found was to rename the original class declaration and export the correctly named wrapped variable:

```js
import { withApollo } from 'react-apollo';

class SidebarComponent extends React.Component {
  public render() {
    // ...
  }
}

export const Sidebar = withApollo(SidebarComponent);
```

## Now with added Typescript

The above code works well in JS-land, but Typescript tends to get a bit grumpy. The component needs to be aware of props being passed in from the `withApollo` <abbr title="Higher-order component">HOC</abbr>. The solution is to add a new type to the component:

```ts
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';

class SidebarComponent extends React.Component<WithApolloClient<{}>> {
  public render() {
    // ...
  }
}

export const Sidebar = withApollo(SidebarComponent);
```

If you already have some custom props defined on the component, they can be nested within the `WithApolloClient` annotation:

```ts
interface Props {
  id: number;
}

class SidebarComponent extends React.Component<WithApolloClient<Props>>
```
