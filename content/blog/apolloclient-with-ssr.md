---
title: ApolloClient with SSR
categories: Web
date: 2018-11-19
tags:
  - react
---

I recently came across an curious issue with `ApolloClient` on a server-side render. The GraphQL results wouldn't update until I restarted the server.

In a client-side app, a `new ApolloClient` gets created for each page load. But in a `node.js` service, it runs once on application launch and sits in memory till the whole application has been killed - that could be days or weeks.

Not only that, as the server-side `ApolloClient` sits in memory, it's shared between every user connection, and is therefore ripe for leaking data between connections. Not what we want.

To overcome this problem, we instantiate a `new ApolloClient` for each connection. We can wrap this up in a nice reusable method:

```ts
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

const CreateClient = (defaults = {}, links: any[] = []): ApolloClient<{}> => {
  const cache = new InMemoryCache();

  const stateLink = withClientState({
    cache,
    resolvers: {},
    defaults
  });

  return new ApolloClient({
    connectToDevTools: false,
    ssrMode: true,
    link: ApolloLink.from([
      stateLink,
      ...links,
      createHttpLink({
        uri: process.env.GRAPHQL_URL
      })
    ]),
    cache
  });
};

export { CreateClient };
```

We can then import the file on launch, and crucially, run the `CreateClient` function for each request. Not only that, we can pass in `defaultState` and prime the `apollo-link-state` cache with any user defaults. Furthermore, we can add additional link helpers like `onError`.

```jsx
server.get('/*', async (req: express.Request, res: express.Response) => {
  const defaultState = {};
  const errorLink = onError((error) => {});

  const client: ApolloClient<{}> = CreateClient(defaultState, [errorLink]);

  const Application = () => {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
  }
```

## Reusing CreateClient

We could've run all that `CreateClient` code within the `server.get` method, but by moving it outside, we can reuse it in our tests. This time, there's no `defaultState` or additional links, so we can call `createClient` directly.

```jsx
import * as React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { mount } from 'enzyme';
import { CreateClient } from '@/gql/CreateClient';
import { User } from '@/pages/User';

describe('<User /> page', () => {
  const client: ApolloClient<{}> = CreateClient();
  it('renders a user profile', () => {
    mount(
      <ApolloProvider client={client}>
        <User match={{ params: { username: 'trys' } }} />
      </ApolloProvider>
    );
  });
});
```
