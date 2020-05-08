---
title: URLSearchParams and FormData on MS Edge
date: 2020-05-08
categories: Web
---

This is one of those "I couldn't find the answer googling, so writing this post as a reminder to future me" sort of posts.

There's a really neat feature of `URLSearchParams` that lets you construct it with a `FormData` object. It's a lovely pattern for converting a form to a query string in a few lines. And allows you to append to the string safely.

```js
const formData = new FormData(searchForm);
const searchParams = new URLSearchParams(formData);
const queryString = searchParams.toString();
```

However, this doesn't work on Edge (or pre-chromium Edge). It throws an `0: Invalid argument` error as it doesn't support destructuring of the `FormData` object.

Initial googling suggested using `formData.entries()` but there's a lack of Edge support there, and the usual `Object.entries()` polyfills do not work, due to some oddities of `FormData`. The full FormData polyfill then required a blob polyfill, and a Symbol polyfill. And `searchForm.elements` returns ALL the inputs, not just the ones plucked out by FormData. _Can you tell it was a stressful day of debugging?_

I ended up going down a different route, recreating the `formData.entries()` approach, and accounting for checkboxes. Here's what I came up with:

```js
const formData = new FormData(searchForm);
const searchParams = new URLSearchParams();

/**
  * This is all to replace this single line:
  * new URLSearchParams(formData), because Edge
  */
const keys = [...formData.keys()];
keys.forEach(key => {
  /**
   * For 'checkboxes', we need to append the values to the search params
   * and not just add a comma separated string.
   */
  if (keys.filter(x => x === key).length > 1) {
    /**
     * We grab all the values and append them in one go
     */
    formData.getAll(key).forEach(value => {
      searchParams.append(key, value);
    })

    /**
     * Then remove all the remaining instances of the key from the
     * keys array we're looping around
     */
    keys.forEach((k, i) => {
      if (k === key) {
        keys.splice(i, 1)
      }
    })
  } else {
    // Strings are simple in comparison
    searchParams.set(key, formData.get(key))
  }
})

const queryString = searchParams.toString();
```


