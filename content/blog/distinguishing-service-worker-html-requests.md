---
title: Distinguishing cached vs. network HTML requests in a Service Worker
date: 2019-05-09
categories: Web
---

Jeremy posted a [wonderful write-up](https://adactio.com/journal/15122) of how he's tackling the 'Lie-Fi problem' with his Service Worker. It's also a great read if you're looking for tips on refactoring a Service Worker. He ended with a wish:

> What I’d _really_ like is some way to know—on the client side—whether or not the currently-loaded page came from a cache or from a network.

Challenge accepted!

Disclaimer, this is a proof of concept created in an evening, and probably not a production-ready solution!

Here's what I came up with. It's a function that reads the response body stream in, returning a new stream. Whilst reading the stream, it searches for the character codes that make up: `<html`. If it finds them, it tacks on a `data-cached` attribute. Here's the code:

```js
// Stream in the response
// returning a new stream with <html data-cached>
function markHTMLAsCached(response) {
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }

          // Create the patterns
          const input = convertPattern('<html');
          const output = convertPattern(' data-cached');

          // Find the input pattern in the array
          const match = findSequence(value, input);

          // If we've found it
          if (match !== -1) {
            // Convert Uint8Array to a classic array
            // (Uint8Array) doesn't allow splicing
            const data = Array.from(value);

            output.forEach((char, i) => {
              // Add each charCode to the data array
              data.splice(match + input.length + i, 0, char);
            });

            // Convert the array back to a Uint8Array
            value = new Uint8Array(data);
          }

          controller.enqueue(value);
          push();
        });
      }

      push();
    }
  });

  return new Response(stream, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText
  });
}

// Convert string to a character code array
function convertPattern(str) {
  return str.split('').map((x, i) => str.charCodeAt(i));
}

// Find a sequence in an array, return the first index
function findSequence(arr, pattern) {
  return arr.findIndex((val, i) => {
    for (let j = 0; j < pattern.length; j++) {
      if (arr[i + j] !== pattern[j]) return;
    }
    return true;
  });
}
```

And here's how to use it. It'll only add the attribute when the network request fails AND the file is available in the cache:

```js
if (request.headers.get('Accept').includes('text/html')) {
  event.respondWith(
    fetch(request)
      .then(response => {
        let copy = response.clone();
        stashInCache(pageCache, request, copy);
        return response;
      })
      .catch(() => {
        return caches.match(request).then(response => {
          if (response) {
            return markHTMLAsCached(response);
          } else {
            return caches.match('/offline/');
          }
        });
      })
  );
  return;
}
```

Finally, it can be checked within your client-side JS with:

```js
if (document.documentElement.getAttribute('data-cached') === '') {
  // We're on a cached page
}
```

### Cons

Effectively it's performing a full on **man-in-the-middle** attack on your own site! 😬 But that's kinda at the [heart of Service Workers](https://adactio.com/articles/13796).

It also has to stream and re-stream the whole HTML response, which is less than ideal, but I've not really noticed any performance impact on local testing. It only runs when the network request fails, plus we're serving from a local cache, so we're dealing in the single-figure miliseconds.

It also makes the assumption that there will be one `<html>` tag in the document (seems fair), and that the tag will arrive within the first chunk of the stream (also pretty safe).
