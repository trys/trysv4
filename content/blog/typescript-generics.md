---
title: Typescript Generics
year: 2019
date: 2019-03-25
categories: Web
description: How to use generics in Typescript
---

[tldr;](/blog/typescript-generics/#tldr) This was a learning reinforcement blog post, so it's a little waffly.

Code smells point to a need for refactoring. Such an opportunity arose today when I decided to work our main network request class. This `Http` class is a wrapper around `fetch`, adding in API authentication tokens, parsing JSON and generally making requests slightly nicer to deal with.

The response type of `APIResponse` was as follows:

```ts
interface APIResponse {
  errors?: APIError[];
  data?: APIData | APIData[];
}

interface APIData {
  id: string;
  type: string;
  attributes: DynamicObject;
}
```

Looks neat enough. The API responds with a data property that's either non-existent, an `APIData` object, or an array of them. 

The issue comes when you start to use the thing...

```ts
const { data } = new Http('/endpoint').get();
```

At this point, data could be three very different things. If you're expecting an array, you should be able to call `.length` on data. But as data can be undefined, or an object, Typescript gets (quite rightly) rather cross. So we end up doing silly things like:

```ts
const { data } = new Http('/endpoint').get();
if (!data || !Array.isArray(data)) {
  throw new Error();
}

/* data.length can now be safely accessed */
```

The thing is, we know which endpoints return an array, and which return an object - that isn't going to change. So we need a way to tell our `Http` class which type will be coming back.

## Enter generics ✨

A generic describes a `type` you can pass into a method, and use to guarantee the output, and is kind of similar to an overload but for types.

I often find it's good to start coding from the direction of the caller, defining the problem from the outside, and working back from there. Here's the ideal end result:

```ts
/* Always an array */
const { data } = new Http('/users').get<APIArray>();

/* Always an object */
const { data } = new Http('/users/username').get<APIObject>();
```

To define a generic, you decorate a method with a type parameter on the way in, and again on the way out. This 'type parameter' `<T>` sits outside the function parameters, as shown below:

```ts
class Http {
  // ...
  private get = <T>(options = {}): Promise<T> => {
    return fetch(this.route);
    // ...
  };
}
```

And that's it! We've told Typescript to trust the type we send in as the type to send out.

## Going a bit further

We can push a little further with generics outside of a method. Take the `APIObject` and `APIArray` mentioned earlier. How did they come about? They look something like this:

```ts
interface APIData {
  id: string;
  type: string;
  attributes: DynamicObject;
}

interface APIObject {
  data: APIData;
}

interface APIArray {
  data: APIData[];
}
```

This is great, but a bit limiting should we want to express more detail about the types being returned. Take a `User` model, for example. There are certain attributes that we can count on, and describing them would be handy. We need away to extend `APIData` for certain endpoints. Again, let's define the solution first.

```ts
const { data } = new Http('/users/username')
  .get<APIObject<APIUser>>();
/* data.attributes.username is safe to access */

const { data } = new Http('/users')
  .get<APIArray<APIUser>>();
```

Next, let's create the `APIUser` shape:

```ts
interface APIUser extends APIData {
  attributes: {
    username: string;
    bio: string;
  };
}
```

By extending `APIData`, we get sensible defaults, but can be more specific about the attributes that will return. Finally, we can make the two other interfaces more generic:

```ts
interface APIObject<T = APIData> {
  data: T;
}

interface APIArray<T = APIData> {
  data: Array<T>;
}
```

This kind of looks like weird function, because is kind of is! We're telling Typescript to use variable `T` if we send it, but fallback to `APIData` if we don't. This gives the net result of:

```ts
APIObject /* returns an APIData */
APIObject<APIUser> /* returns an APIUser */

APIArray /* returns an APIData[] */
APIArray<APIUser> /* returns an APIUser[] */
```

## tldr;

```ts
/* Interfaces */
interface APIData {
  id: string;
  attributes: DynamicObject;
}

interface APIUser extends APIData {
  attributes: {
    username: string;
    bio: string;
  };
}

interface APIObject<T = APIData> {
  data: T;
}

interface APIArray<T = APIData> {
  data: Array<T>;
}

/* The class */
class Http {
  // ...
  private get = <T>(options = {}): Promise<T> => {
    return fetch(this.route);
    // ...
  };
}

/* The implementation */
const { data } = new Http('/posts/slug')
  .get<APIObject>();

const { data } = new Http('/users/username')
  .get<APIObject<APIUser>>();

const { data } = new Http('/users')
  .get<APIArray<APIUser>>();
```

