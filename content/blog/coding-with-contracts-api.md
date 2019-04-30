---
title: Coding with contracts - API
date: 2019-04-30
categories: Web
---

This is the first in a series called 'coding with contracts', a look into writing more robust API's, components, and more!

---

Using an API requires an element of trust. Trust that the data you request will be well-formed, quick and most importantly, consistent. Consistency is _everything_ for an API.

That consistency extends to failing well. If an API fails consistently, it's a breeze to check against as a consumer. As diligent developers, we should strive to put adequate error checking in our code. But if we can trust an API to fail consistently, we can run high-level checks for errors, remaining confident that the data we request is present and correct.

> Failing at a high level, staying consistent & concise at a low level.

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

Zero posts is fine; the array will be empty. New post data is also all good, we can add it to the post object. 🎉

Things get more tricky when there's an error. Do we swap the array for a string with the error message? Or a number with an error code? Or an object with more information? Or a stacktrace for authenticated users? 🤔

Pagination? If we're stuck with an array, we can't add data such as the total page count or the next/previous page cursors. And likewise, adding more data is out the question. We've painted ourselves into a corner. 👨🏼‍🎨

Our contrived API isn't consistent, and it means we have to handle multiple eventualities, _every time_ we interact with it, and it really sucks. See how many arbitrary checks we're having to make, just to confirm we can safely access the data:

```js
try {
  const posts = await fetch('/api/posts')
    .then(x => x.json()); // Check 1 - our data needs to be transformed

  // Check 2 - it'll only be an array if it's correct
  if (Array.isArray(posts)) {
    // Safely interact with the posts
    return;
  }
  
  // Check 3 - errors, pagination, etc.
} catch (e) {
  // Check 4 - network-level errors
}
```

Let's compare that to a different API response:

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Blog title"
    },
    {
      "id": 2,
      "title": "Blog title two"
    }
  ]
}
```

The subtle difference of wrapping the response in an object makes a huge difference to the consumer:

```js
try {
  const { posts } = await fetch('/api/posts')
    .then(x => x.json());

  // Interact with the posts
} catch (e) {
  // Network errors
}
```

This is so much more readable and confident. We glean this confidence from a **contract**.

For an API, a contract can come in two forms:

- Schema
- Documentation

A live schema will surface _exactly_ what the API is expecting to send & receive, but it'll often be in a code-y format and not overly readable.

Documentation is great, assuming it is kept up to date. Much like a pattern library, as soon as it goes stale, it's useless. It needs to become both part of the project culture, and part of the codebase itself. Colocating documentation with code is a great way to increase the chances of documentation accuracy. Tools like [Swagger](https://swagger.io) and [JSDoc](http://usejsdoc.org/) can help with this.

Where a schema will answer the **what** and **how** questions, documentation can provide context, answering the **whys**.

## Adding confidence to your API

[GraphQL](https://graphql.org/) is a super-interesting development in this field. Not only is it a fresh way to interact with a data source, it acts as hybrid of schema and documentation. Furthermore, the schema is shared between client and server, providing even greater levels of confidence to both parties.

[Typescript](https://www.typescriptlang.org/) can also help in the quest for contract confidence. By defining [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html), you can describe the shape of the many arbitrary objects that float around a codebase. Here's an interface example:

```ts
interface BlogPost {
  id: Number;
  title: String;
  metadata: PageMetaData;
  body: String;
  author: User;
  comments: Comment[];
  image?: Media;
}
```

When we tell Typescript that an object is a `BlogPost`, the compiler, codebase and IDE suddenly know a huge amount more about this piece of data. In fact, **data begins to become information**. This information, in the form of type-checking, gives us confidence.

We know that the `BlogPost.comments` will be an array of comments, so it's safe to access `.length`, or run `.map()` over it.

We also know that `BlogPost.image` is an optional property, so might be missing from any API response. If we try and access `BlogPost.image.url` (for example) without first checking that `BlogPost.image` exists, the code simply won't compile. It prevents us from making mistakes that would cause 'regular' JS to fall over.

I say 'regular' JS, because Typescript still ultimately compiles down to JS. These type-checks are purely theoretical, and if the API fails to provide `comments`, you'll still have problems. This 'false' confidence is dangerous if you can't trust your API. Fortunately, it's where a **shared schema** can come to the rescue. If the backend is also written in Typescript, you can share your interfaces between the two codebases, and if either party makes a breaking change, the code won't compile and you'll be alerted!

Marking up a network request with an interface is a great start, and I [wrote about it](/blog/typescript-generics/) last month.

This approach leads on nicely to a consolidation of API responses. A `BlogPost` will usually appear in multiple places across an API: On a blog index page, as a related post, as a list of posts by an author, attached to a comment, and as a direct request to a post. It's inefficient to send the full post for all of those use-cases, so it's common to return a subset of the data. **These subsets are where problems tend to occur.**

Nailing down the two or three forms in which a post can be returned is an essential part of a good data contract. Take this interface:

```ts
interface BlogPost {
  id: Number;
  title: String;
  relatedPosts: BlogPost[];
}
```

It gives the impression that the `relatedPosts` will contain full `BlogPost` objects within. But chances are, they'll be a subset of the full post. In this instance, creating a `BlogPostPreview`, or `SimpleBlogPost` might be a good idea. Then create a service that returns posts in that shape, and use it everywhere you need that amount of data. Aim to synchronise these interfaces so you're left with a couple of options.

It might be tempting to reach for the `Partial<BlogPost>`, but do not give into that temptation. `Partial<>` is a trojan horse, and will lead to problems further down the line.
