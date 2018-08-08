---
title: Error Handling
date: 2018-08-08
categories: Web
description: Error handling and exceptions
---


[Jeremy Keith](https://adactio.com) has written about [handling errors in Service Workers](https://adactio.com/journal/14241).

It's a pertinent subject for me at the moment. I was recently reflecting back to when I began building websites. There were some programming concepts dubbed as _essential_ that totally went over my head! Starting with HTML and CSS made it appear that these were heavy, complex, and only required learning for 'proper programmers'. One of those concepts was **Exceptions**.

Early me couldn't understand why you'd ever want a third-party library to throw a fatal error, let alone throw one yourself. Why would you intentionally cause an error that breaks the program flow?

So when writing any JavaScript and PHP, I'd do my utmost to return a nice clean value from every method, convinced that every possible outcome had been accounted for. And yet, from time to time, an error would occur. I'd add even more nested `if/else` statements, to try and catch the blighters but a couple of months later, they'd return like whack-a-moles.

The clue was in that last sentence: **try and catch**.

## Dangling catch

I'd used `try/catch` when working with third-party code that threw Exceptions. But only disgruntledly, I still didn't see the point. Too often, my code would look like:

```
try {
    // Do something
} catch (e) {}
```

A dangling `catch` doing nothing. I knew it looked stupid, but in mixture of programming arrogance/naivety, I thought, _"that code will never error!"_

## Code will fail

Your code will error, and that's fine, everyone's does. Accepting that is empowering, it's the first step towards writing [resilient code](https://resilientwebdesign.com/). The web is a chaotic place full of packet-loss, ad-blockers and browsers in various states of stability - even the best code can fail in these conditions. Therefore, how we handle failure is crucial.

**Websites, URLs and APIs are public interfaces. They'll be used in whatever way a user deems fit.** We cannot pin that down, it's what makes the web special. If a user wishes to browse a site blocking images, CSS and JavaScript, they can. Failing to return sensible error messages makes the users' interaction with the interface more challenging. This extends from Exceptions to 404, 500 & offline pages, empty API responses, toasts and form validation.

When working with Promises, using `then().catch()` is pretty common practise. When `await` becomes the norm, we're going to have to get used to writing a few more `try {} catch {}` statements.

## Logical Exceptions

Exceptions do not have to only be used to report fatal errors. They can be used as a logical tool. One example is as a 'deep else'. A thrown Exception will bubble up to the nearest `catch {}` and so can be used as a way to jump out of a deep nest or iteration.

They can also be used to refactor existing code to make it clearer. The following snippet is a reasonably common task: checking the array for an ID, and backing out if it fails. I realise this code could be more concise, but let's run with it for now. By the time we get to 'do something', we're three `ifs` deep.

```js
if (array.length) {
  if (id) {
    const current = array.find(x => x.id === id)
    if (current) {
      // Do something
    } else {
      show_error('No match found')
    }
  } else {
    show_error('No ID provided')
  }
} else {
  show_error('Empty array provided')
}
```

Let's spin it round to use Exceptions. Code under a thrown Exception will never run, so we can use that to our advantage. Instead of checking for the `id`, `array.length` and `current`, going deeper each time, we can check for the lack of them. This way, when we 'do something', we're zero levels deep!

```js
try {
  if (!array.length) throw new Error('Empty array provided')
  if (!id) throw new Error('No ID Provided')
  
  const current = array.find(x => x.id === id)
  if (!current) throw new Error('No match found')
  // Do something
} catch (e) {
  show_error(e.message)
}
```

This code is more **readable** and **reasonable**. Deep nesting requires your brain to keep track of where it is within the flow, whereas code on a single-level can be read in a more procedural manner. By using Exceptions as a tool, the code becomes less brittle and clearer to readers.

## Back to Service Workers

On the subject of reasonability, the final example in [Jeremy's post](https://adactio.com/journal/14241) was:

```js
fetch(request)
  .then(fetchResponse => {
    return fetchResponse;
  })
  .catch(fetchError => {
    console.error(fetchError);
  });
```

That can be rewritten as:

```js
fetch(request)
  .then(fetchResponse => fetchResponse)
  .catch(console.error);
```

`console.error` will be called passing in the error arguments (in this case [the rejection reason](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch#Parameters)).

It's shorter, but is it more **reasonable**? I'll leave that up to you...
