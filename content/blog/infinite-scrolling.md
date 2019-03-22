---
title: Infinite Scrolling
date: 2017-10-13
categories: Web
---

While I mentioned in my last post that the new Tomango site won’t have a CMS, I wasn’t being fully truthful…

A blog is required and naturally we turned to WordPress. We’ve got posts running back 5 years or so, it didn’t seem worth the fight to move the blogging system for a bit more performance or a nicer development experience.

In my quest to make this site as performant as possible, JS and CSS is being kept to an absolute minimum. There’s no framework and no jQuery. Side note, it has been an interesting, frustrating and ultimately rewarding experience to be as lean as possible. It’s a fun tightrope to walk, the site has to be fast, but it also has to look great and be a breeze to navigate. I’m fortunate to have such a ‘performant design’ to work with but I’ve had to choose some battles! Designers are pretty keen on webfonts, dropping them isn’t an option (however similar they look to Helvetica…), loading them efficiently is the real challenge.

Anyway, tangent over…

Infinite scrolling is quite a common pattern on blogs nowadays. It brings up an interesting point about perceived performance, although there’s a JS cost for implementing this pattern, it provides a ‘better’ experience for the user compared to clicking a button and waiting for a page load.

‘Normally’, the code process would be something like:

1. Attach a debounced scroll handler to the window scroll event
1. Check if the ‘load more’ button was visible in the viewport with some DOM hackery
1. Trigger a click
1. Catch the click event, GET the URL with AJAX
1. Insert the posts
1. Push the URL to the History API

## IntersectionObserver
I recently saw some tweets about the new `IntersectionObserver API`. It seemed to handle points 1, 2 and 3 rather nicely:

> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document’s viewport.

After 15 minutes of work, I’d got a grip on the basics. It fires a callback every time the targeted element enters or leaves the viewport. All I needed to do was check if the element ‘isIntersecting’, then trigger a click.

```javascript
var observer = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) {
    entries[0].target.click();
  }
});
observer.observe(document.querySelector('.load-more'));
```

Following that, I thought I’d use the Fetch API to handle point 4 – AJAX. Fetch is pretty well supported but it still needs polyfills. However, I decided not to add that extra JS and use a classic try/catch and leverage how a browser handles `event.PreventDefault()`.

```javascript
function load(event) {
  try {
    fetch(url)
    event.preventDefault();
  } catch(e) {}
}
```

In this code snippet, if fetch is supported, it’ll run the fetch event and immediately run event.PreventDefault(). However, if it’s not supported, it’ll throw an exception, get caught by the catch clause and allow the link click to go through as is standard behaviour.

Finally, I did a bit of DOM querying to find the new posts and add them to the current posts. Then I reattach the event handlers to the new load more button (brought in from the AJAX’d page) and we’re good to go for the next page.

## The Full Snippet

```javascript
(function InfiniteScroll(TRIGGER_WRAPPER, POSTS_WRAPPER) {
  var triggerSelector = TRIGGER_WRAPPER + ' a';
  var trigger = document.querySelector(triggerSelector);
  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      entries[0].target.click();
    }
  });

  function attachHandlers() {
    if (trigger) {
      observer.observe(trigger);
      trigger.addEventListener('click', load);
    }
  }
  
  attachHandlers();

  function load(event) {
    var url = event.target.href;
    try {
      fetch(url)
        .then(result => result.text())
        .then(result => Promise.resolve(result.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "" )))
        .then(function(data) {
          var results = document.createElement('div');
          results.innerHTML = data;

          var foundPosts = results.querySelector(POSTS_WRAPPER);
          var currentPosts = document.querySelector(POSTS_WRAPPER);
          if (foundPosts && currentPosts) {
            currentPosts.innerHTML += foundPosts.innerHTML;
          }

          trigger = results.querySelector(triggerSelector);
          if (trigger) {
            document.querySelector(TRIGGER_WRAPPER).appendChild(trigger);
            attachHandlers();
          }

          history.pushState({}, '', url);
        })
        .catch(function(e) {
          window.location.href = url;
        });

      event.target.parentNode.removeChild(event.target);
      event.preventDefault();
    } catch (e) {}
  }
})('.more-posts', '.posts');
```
