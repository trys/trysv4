---
title: Coding with contracts
date: 2019-04-27
categories: Web
---

_"Good code is it's own documentation"_ is a popular quip, most often used to explain and excuse a lack of comments. And although clarity at a micro scale (sensible variable names, logical arguments, good spacing) is hugely important, and may mean a reduced number of comments, I'm not sure a lack of documentation at a macro scale is such a good thing.

Using an API requires an element of trust. Trust that data you request will be well-formed, quick and most importantly, consistent. Consistency is _everything_ for an API.

That consistency also extends to failing well. If an API fails consistently, it makes it a breeze for the consumer to check against. As diligent developers, we should strive to put adequate error checking in our code. But if we trust an API to fail consistently, we can run high-level checks for errors, remaining confident that the data we request is present and correct.

### Failing at a high level, staying consistent at a low level.

Take the following API response for a list of blog posts:

```json
[
  {
    "id": 1,
    "title": "Blog title"
  },
  {
    "id": 2,
    "title": "Blog title two"
  }
]
```

It seems sensible enough at first glance - let's start asking some 'what ifs':

- What if there are no blog posts?
- What if there's new data for each post?
- What if there's an error we need to return?
- What if we need to add pagination
- What if we want to add the list of categories to this response?

Zero posts is fine; the array will be empty. New post data is also all good, we can add it to the post object 🎉

Things get more tricky when there's an error. Do we swap the array for a string with the error message? Or a number with an error code? Or an object with more information? Or a stacktrace for authenticated users? 🤔

Pagination? If we're stuck with an array, we can't add data such as the total page count or the next/previous page cursors. And likewise, adding more data is out the question. We've painted ourselves into a corner. 👨🏼‍🎨

This post won't go into how to [fix this particular use-case](https://jsonapi.org/), as we're more interested in the issues it causes as a consumer.

Our contrived API isn't consistent, and it means we have to handle multiple eventualities, _every time_ we interact with it, and it really sucks...

```js
try {
  const posts = await fetch('/api/posts')
    .then(x => x.json()); // Check 1 - our data needs to be transformed

  // Check 2 - it'll only be an array if it's correct
  if (Array.isArray(posts)) {
    // Interact with the posts
    return;
  }
  
  // Check 3 - errors, pagination, etc.
} catch (e) {
  // Check 4 - network-level errors
}
```

It gets worse with Typescript involved, as it (quite rightly) doesn't know what shape `posts` is, and therefore can't provide any type checking. I [wrote about](/blog/typescript-generics/) how to fix that with generics last month.

We need a **contract**.


Components require a similar level of trust to a REST API, we interact with them in very similar ways. A component exposes a public API, an I/O in the form of props and events. Keeping this API clear and consistent will increase the trustworthiness in the component, and make it easier to integrate. A good component will be extensible.

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
