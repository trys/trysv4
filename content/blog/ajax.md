---
title: Ajax
date: 2017-12-13
categories: Web
---

# AJAX and polyfills

## Polyfills

[Polyfill.io](https://polyfill.io/v2/docs/)

## AJAX

AJAX stands for Asynchronous Javascript and XML. It's a way of requesting assets or sending data without reloading the page. Forms using GET and POST were previously the only way to handle data transfer. AJAX makes sites like Google Maps possible. 

Generally speaking, AJAX is used to make more interactive sites, and improve perceived performance. It often feels faster to dynamically swap out some content, rather than force a full page reload. It's less jarring for the user.

## How to AJAX

Here are a couple of ways to perform AJAX requests. We'll use a JSON mock service: `var url = 'https://jsonplaceholder.typicode.com/posts';`.

### XMLHttpRequest (XHR)

This is the underlying browser service for most third-party AJAX libraries.

```javascript
var oReq = new XMLHttpRequest();
oReq.addEventListener('load', function() {  
    console.log(this.responseText)
});
oReq.open('GET', url);
oReq.send();
```

### jQuery

These are both wrappers around the `$.ajax` method. See the doc [here](https://api.jquery.com/jquery.ajax/). You can allow for error catching, different data formats and many more things so it's worth reading up on it.

```javascript
$.get(url, function(response) {
    // work with the response   
});

var data = {
    name: 'Trys'    
};

$.post(url, data, function(response) {
    // work with the response   
});
```

### Fetch

Fetch has decent support but it does need some (pretty small) polyfills for itself, and Promises.

```javascript
fetch(url)
    .then(function(response) {
        // work with the response
    })
    .catch(function(error) {
        // Handle errors
    })
```

### Axios

This is a [library](https://github.com/axios/axios) that wraps around fetch to give you a slightly nicer developer experience. In the above examples, you have to convert to JSON yourself, Axios handles that for you. It also works in Node.js and in the browser which makes it perfect for universal JS apps.

```javascript
axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## Asynchronous programming

I remember finding the move to async programming a bit confusing at first. I'm so used to a procedural structure in code:

```javascript
var a = 1;   // 1. This runs
a = a + 1;   // 2. then this
aFunction(); // 3. this runs the function
a = a - 1;   // 4. then comes back to here
```

In async programming, once you call some asynchronous code, the rest of your code carries on running. When the asynchronous call resolves, it gets handled separately:

```javascript
var a = 1;   // 1. This runs
a = a + 1;   // 2. then this
fetch(url)   // 3. this fetch call gets started
    .then(function(res) {
        console.log(res); // 5. finally, when this resolves, we carry on here.
    });
a = a - 1;   // 4. then we carry on running this code
```

If you're only handling one thing asynchronously, it's not too bad to keep track of, but once you start running multiple requests, it can be more complicated. That's where Promises become useful, but that's something for another time.

The main thing is, like variable scope, keep track of where and when your code is running when async calls get used. Don't assume a request will take 5 seconds to resolve, or that it will resolve at all - expect it to fail some of the time. Also, if you're making two async calls, don't assume they'll come back in the order you requested them. This can trigger 'race conditions'.

## Streaming

It may seem tempting to make everything run using AJAX. There are, however, some downsides. HTML is 'streamed' by the browser. For a large page of HTML, the browser can break the HTML into chunks and start displaying content very quickly, appending as the page downloads. It's why a static HTML page can feel so quick, the time to content is pretty small. That's why we are encouraged as developers to reduce the number of 'blocking' elements. External scripts and stylesheets block the render of the page so we want to offload and minize them as much as possible. A streamed HTML page is very quick so we don't want to hold it up.

There is a tendancy now to do something different. JS frameworks often require you to ship a HTML 'skeleton', then use AJAX to load the content in after. The problem with this is an AJAX request isn't streamed (by default). It needs to download the full asset before you can start using it. This also means that if your request fails (for example due to a lost connection), the whole request fails and you have to catch the error and start again. With streaming, each chunk is like a checkpoint in a game, if the connection drops, all previous chunks are saved and you don't lose everything.


## Task - load more posts

We're going to make a small blog archive. Under a list of posts, we'll have a button that can be clicked to asynchronously load more posts. 

We'll write one example in Vue for a bit of fun, then maybe run through a more traditional server-side example afterwards.

1. Install the Vue Chrome Extension and Sublime packages
2. Create the template, a `div` with a `ul` inside. For each `li`, include a `h2` and `p`
3. Using 'http://jsonplaceholder.typicode.com/posts?_limit=2&_start=0' as the schema example for the `h2` and `p`
4. Add a data object with an empty `posts` array
5. In the `created()` hook, `fetch()` the first lot of posts
6. Add the AJAX posts to the Vue posts (this should show some results)
7. Create a `button` with a method `loadPosts`
8. Inside the method, `fetch()` the next lot of posts and append them to the Vue posts

### Stretch goals

1. Refactor the `fetch()` calls efficiently.
2. Add the page name to `window.location.hash` after each button click
3. Read the `window.location.hash` on load and start the posts from the correct position.

### Server example

1. Clone into the [pagination-example repository](https://github.com/trys/pagination-example)
2. Run `npm i` to install the local dependancies
3. Run `npm start` to kick it off
4. Visit [http://localhost:3000](http://localhost:3000)

1. In `/static/main.js`, implement a 'load-more' solution
2. Listen for the `.load-more` button click
3. `fetch()` the button href URL
4. Append the new posts the page
5. Add the new load more button to the page

### Stretch goals

1. Use Push State to update the page URL
2. Filter the response
3. Investigate the Intersection Observer API to trigger the load more on scroll
