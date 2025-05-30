---
title: Coding with contracts - API response design
year: 2019
date: 2019-05-02
categories: Web
description: "This is the first in a little series called 'coding with contracts', a look into writing robust API's, components, and more!"
---

This is the first in a little series called 'coding with contracts', a look into writing robust API's, components, and more!

There are many articles relating to API request design, focusing on URL structure, sanitization and, input acceptance. This post looks at API responses, and how better backend design can make frontend consumption more resilient and readable.

---

Using an API is an exercise in trust. Trust that the data you request will be well-formed, precise and, most importantly, consistent. Consistency is _everything_ for an API.

That consistency extends to failing well. If an API fails consistently, it's a breeze for a consumer to check against. As diligent frontend developers, we should strive to put adequate error checking in our code. But if we can trust an API to fail consistently, then we can run high-level checks for errors and remain confident that the data we requested is all present and correct.

> Fail at a high level,  
> Stay consistent & concise at a low level.

## Future-proof responses

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

It seems sensible enough at first glance. But let's start asking some 'what if' questions:

- What if there are no blog posts?
- What if there's new data for each post?
- What if there's an error we need to return?
- What if we need to add pagination
- What if we want to add the list of categories to this response?

Zero posts is fine; the array will be empty. New post data is also all good, we can add it to the post object. 🎉

Things get more tricky when there's an error. Do we swap the array for a string with the error message? Or a number with an error code? Or an object with more information? Or a stack trace for authenticated users? 🤔

How about pagination? If we're stuck with a top-level array, we can't add related data like the total page count or the next/previous page cursors. And likewise, adding more data is out the question. We've painted ourselves into a corner. 👨🏼‍🎨

From the error states alone, we can see that our contrived API isn't consistent. It means we'd have to handle multiple eventualities _every time_ we interact with it, and that really sucks. See how many arbitrary and illogical checks have to be made, just to safely access the data:

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

The subtle difference of wrapping the response in an object makes a _huge_ difference to the consumer:

```js
try {
  const { posts } = await fetch('/api/posts')
    .then(x => x.json());

  // Interact with the posts
} catch (e) {
  // Network errors
}
```

## API contracts

The above is more common sense than contractual, so let's move on to that...

To be entirely honest, a contract is more theoretical than tangible. It sounds airy-fairy, but contract-based coding is as much a 'state of mind', or part of the project culture, than a strict set of documents.  
<small>(Did I really just write that sentence?!)</small>

That being said, there are some physical things that can form an 'API contract'. They tend to come in three forms:

- Schema
- Documentation
- Product specifications

A live schema will surface _exactly_ what the API is expecting to send & receive, but it'll often be in a code-y format and not overly readable. It'll be used within an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) to keep a database in sync with the API models. [Sequelize](http://docs.sequelizejs.com/) and [TypeORM](https://github.com/typeorm/typeorm) are pretty common Node.js ORM choices.

Documentation is great, assuming it's kept up to date. Much like a pattern library, it's useless the minute it gets stale. It needs to become both part of the project culture, and part of the codebase itself. Colocating documentation with code is a great way to increase the chances of documentation accuracy. Tools like [Swagger](https://swagger.io) and [JSDoc](http://usejsdoc.org/) can help with this.

Where a schema will answer the **what** questions, documentation examples answer the **how's** and provide context for the **why**'s.

Clear product specifications also _really_ help. If backend, frontend, and design are all working from the same pre-agreed specs, and the feature intention is clear, the room for errors is greatly reduced.

[GraphQL](https://graphql.org/) is a super-interesting development in this field. Not only is it a fresh way to interact with a data source, it acts as hybrid of schema and documentation. Furthermore, the schema is shared between client and server, providing even greater levels of confidence to both parties.

## A good API is fussy

_Be conservative in what you send, be liberal in what you accept._

Postel's principle of robustness describes good API design, and good software at large. This conservative approach is a form of tough love - an API is strict for your own good.

If it was lapse, waivering to poorly formed requests, it would be doing you a disservice, and as we experienced above, would ultimately be worse to use. A stubborn and boring API that keeps responding in a consistent manner is really what we want to work with.

## Data conversion & common language

It's often a prudent move to format API responses when they arrive on the client. This conversion step could include stashing parts of the data in a global cache, renaming properties to more logical frontend parlance, or providing missing content fallbacks.

An avatar is a great example of this. You could pass the API data straight through, using a media object/string for uploaded images, and undefined/null for missing ones. Although this would be technically 'pure', it would be an inefficient move, going against the practise of failing at a high level, and staying consistent & concise at a low level. With this approach, every time an avatar is rendered, a check will need to be made to see if it's there, falling back to an alternative. That sounds like code duplication, and an opportunity for inconsistencies to creep in.

Explicitely setting a fallback image once, ensures that every `User` will always have an avatar. It also makes it nice and simple to change the fallback image in the future, or update it when the user uploads a new profile picture.

We want to reduce the number of 'types' a piece of data can have. It's where a lot of runtime errors occur. If you incorrectly assume to have an array and call `.map()`, there'll be problems. But if the conversion step ensures there'll always be a minimum of an empty array, everything will be fine.

Use these junctures to get your data into a sound format, ready to be rendered. Our components work best as pure representatives of state (more on that in the next article), so keep data wrangling at a high-level.

Also, if you're working with an existing API that's inconsistent, this is the place to tidy it up. Fill in any gaps, create sensible defaults, and handle errors once at the top of your application, returning well formatted, logical data structures.

If you can keep common langauge between API and backend, it's usually preferential. It'll make your debugging life considerably simpler.

## Increasing confidence with Typescript

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

When we tell Typescript that an object is a `BlogPost`, the compiler, codebase and IDE suddenly know a huge amount more about this piece of data. In fact, **data begins to become information**. This information, in the form of type-checking, can start to give us confidence.

We know that the `BlogPost.comments` will always be an array of comments, so it's safe to access `.length`, or run `.map()` over it.

We also know that `BlogPost.image` is an optional property, and might be missing from any API response. If we try and access `BlogPost.image.url` (for example) without first checking that `BlogPost.image` exists, the code simply won't compile. It prevents us from making mistakes that would cause 'regular' JS to fall over.

Marking up a network request with an interface is a great start, and I [wrote about it](/blog/typescript-generics/) last month.

This approach leads on nicely to a consolidation of API responses. A `BlogPost` will usually appear in multiple places across an API: on a category page, as a related post to another page, in a list of posts by an author, attached to a comment, or as a direct request to a post. It's inefficient to send the full post for all of those use-cases, so it's common to return a subset of the data. **These subsets are where problems tend to occur.**

Take this interface:

```ts
interface BlogPost {
  id: Number;
  title: String;
  relatedPosts: BlogPost[];
}
```

It gives the impression that the `relatedPosts` will contain full `BlogPost` objects within. But chances are, they'll be a subset of the full post.

In this instance, creating a `BlogPostPreview`, or `SimpleBlogPost` interface might be a good idea. It might be tempting to reach for the `Partial<BlogPost>`, but do not give into that temptation. `Partial<>` is a trojan horse, and will lead to problems further down the line.

Aim to synchronise these interfaces so you're left with a couple of variations. Nailing down the two or three forms of a data type is an essential part of a good data contract. This'll mean working with the API developers to set in stone all the possible permutations where `BlogPost`'s are used. Then, they can create services that return posts in that shape, and use them throughout the project.

```js
db.find('posts')
  .where(x => x.id === comment.postId)
  .select('id, title, author');
```

From an API perspective, seeing something like this in a comments service would be a red flag. We want to limit the number of `select` calls to those predefined variations, and colocate them with their counterparts.

## Typescript data conversion

As mentioned earlier, frontend data conversion is a powerful tool for getting data into the right shape. This is the perfect place to enforce your interface types.

```ts
interface APIUser {
  id: Number;
  name: String;
  avatarUrl?: String;
}

interface User {
  id: Number;
  name: String;
  avatar: String;
}

const prepareUser = (user: APIUser): User => {
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatarUrl || '/images/fallback.jpg'
  };
}
```

As a bonus, you've now got a neat way to create mock data for a test environment or pattern library. This function takes data in the shape of an `APIUser`, and returns a `User` with sensible fallbacks:

```ts
const mockUser = prepareUser({ id: 1, name: 'Trys' });
/* mockUser is now a full User 'type' with an avatar */
```

## Issues with Typescript

Earlier I said 'regular' JS, because Typescript still ultimately compiles down to JS. These type-checks are purely theoretical, and if the API fails to provide `comments`, you'll still have problems. This 'false' confidence is dangerous if you can't trust your API. Fortunately, it's where a **shared schema** can come to the rescue. If the backend is also written in Typescript, you can share your interfaces between the two codebases, and if either party makes a breaking change, the code won't compile and you'll be alerted!

Typescript also raises the barrier of entry to the codebase, something that should be avoided if possible. But much like SCSS to CSS, Typescript can be adopted in a 'JS + types' approach. You won't benefit from all the of the fancy language features, but it might just save your bacon at build time. When you and your team get comfortable with it, you can begin to experiment with the more advanced features.
