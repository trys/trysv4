---
title: Launch Thyme
year: 2018
date: 2018-06-02
categories: Web
---

### Date is DateTime

Timezones and programming rarely mix well, particularly on the client-side web.

When building a traditional server-rendered site, it's common for the server to be in one timezone, making it a dependable source of truth. JavaScript takes it's time from the users' device, which, when combined with a single-page/serverless architecture, can result in some unexpected outcomes.

<small>Prefix: I'm in the UK, and it's British Summer Time right now.</small>

Take the following: `new Date('2018-05-10').toString()`. What do you reckon will be returned? A natural conclusion would be something like: `Thu May 10 2018` or `Thu May 10 2018 00:00:00`, but alas not. The result is: **`Thu May 10 2018 01:00:00 GMT+0100 (BST)`**.

That's interesting, but not _that_ bad, right? What's an hour between friends. Let's notch it up a bit and set our device system time to be in New York, USA. Same code: `new Date('2018-05-10').toString()`, very different result:

> `Wed May 09 2018 20:00:00 GMT-0400 (EDT)`

### We 'lost' a day...

Even though we explicitly gave the `Date` object a date, it treated it more like a _DateTime_, bringing timezones into play. It makes handling dates unreliable, which is never a good trait in programming. What we want is a `Date` object that diregards time entirely...


## Introducing Thyme

[Thyme](https://github.com/trys/Thyme) was built out of a need to handle dates, but not times, and certainly not timezones. 

From a coding perspective, it's pretty similar to the `Date` object: pass it a date and run methods on it.

```js
const a = new Thyme('2018-05-01')
```

### Useful methods

#### Equality
`a.equals(b)` can be used to compare two Thyme objects, or two dates: `new Thyme('2018-10-02').equals('2018-10-02')`.

#### Date Ranges
`const range = a.till(b)` returns an array of Thyme objects between two dates. There's also a handy `range.contains(c)` method.

#### Date methods
The date-like `getFullYear`, `getMonth`, `getDate`, and `getDay` are all available.

#### Alterations
`add()` or `remove()` changes the day for each Thyme object. They default to 1 day each, but accept an alternative numerical argument.

#### Formatting
There's no complex formatting functionality, just a single `format()` method that returns a simple string: `4 October 2018`

#### Casting
`toString()` will return the date in `YYYY-MM-DD` format. This'll also happen when the object is stringified (`toJson`) or compared against (`valueOf`).

All the methods are detailed in the [repo](https://github.com/trys/Thyme).

<small>_This is still a work in progress, so please file bugs/pull requests :)_</small>

{{< button "https://github.com/trys/Thyme" >}}GitHub{{</ button >}} {{< button "https://www.npmjs.com/package/@trys/thyme" >}}NPM{{</ button >}}
