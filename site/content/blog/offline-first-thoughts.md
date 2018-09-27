---
title: Offline-first thoughts
date: 2018-09-26
categories: Web
description: I've spent the evening experimenting with offline-first techniques, and considering the implications of this approach.
---

I've spent the evening experimenting with offline-first techniques, and considering the implications of this approach.

Service Workers have such huge potential power, and I feel like we (developers on the web) have hardly scratched the surface with what's possible with them.

Being such a new technology, standards and best practises are yet to be formed, and I'm fascinated how these will evolve over the next couple of years.

Service Workers are most commonly used as a progressive enhancement, providing an offline fallback. But they can do so much more than that. What if they were central to your site architecture? What would that look like in practice? What if you build a **Service worker-first web application?**

---

Network-first with cache fallback is a pretty safe option when it comes to <abbr title="Progressive Web Apps">PWAs</abbr>. But that only helps users with **great or no connection**, it doesn't help those with slow connections, flaky connections, or high network costs.

> The true power of a PWA is with offline-first

But offline-first has massive implications on UX and usability. Sadly it's not as simple as flicking the switch and letting the cache do the work.

The 'Webpack' approach of 'pre-cache all the things' is often bundled into `create-[FRAMEWORK]-app` starter files. That might work for small applications, but I don't believe it scales. Caching all routes is presumptive, and if you're making regular changes to your site, those installation requests are going to mount up. As with most things on the real-world web, **nuance is required**.

There is so much to consider.

## Stale content

How timely is your content. Does it matter if you're reading 'yesterdays' website?

Are there some pages that must be served network-first? If so, how should they be flagged to the browser?

Could we use last-updated `<meta>` tags, or a <abbr title="Time to live">TTL</abbr> concept to keep content fresh?

A background fetch after serving the content from the cache helps keeps it up to date, but the user will always be one page refresh behind the 'live' content. This approach helps slow/flaky networks, but it still incurs a request per file, and the associated mobile data costs. Perhaps this background fetch should be limited to HTML requests only?

## Refreshing

There are times when it's crucial to get the user to see the latest version of the site. This could be for breaking news, a security fix, or a major new release.

Other times, you may wish to prompt the user with what's changed, or just inform them that a new version of the page is available.

The `activate` event in the Service Worker lifecycle is a good time to check for new caches, so it's also a good time to potentially alert the user to the change.

I wonder whether using different caches is a good distinguishing factor for these refresh events. When a cache is deleted, you can react accordingly. A deletion of the most crucial cache may send a message prompting the browser to perform an immediate reload, whereas a change to your CSS/JS cache may only prompt an update message. 

Clear lines of communication between the Service Worker and browser are really important for a great offline-first site. At this point in time, I think it feels right that the Service Worker should provide declarative information to the browser, rather than force changes itself.

There's a difference between sending a message of 'refresh the browser' and 'the crucial cache has changed, what are you going to do about it'. The first is a hammer/nut solution, but the second puts the control in the hands of the developer. They can decide when the time is right to refresh.

If a user was using a chat feature and was mid-conversation, refreshing or even prompting for a refresh would be very disruptive. Much like the `beforeinstallprompt` event, delaying an update notification may be the smart move.

Workers use the `postMessage` format to communicate. It's all string-based, so establishing a standard pattern of communication with stringified object is probably a good plan.

## Slow networks

One of the biggest issues with the network-first approach is slow connections. In fact, network-first, cache-fallback sites perform best when you turn off your Wi-Fi. This is one of the main attractions to an offline-first approach!

I wonder whether a well-defined `setTimeout` race condition could be used to keep some assets as network-first, but with an upper limit on time. If the timer pings, the cached version could be served and the live version requested in the background, perhaps posting a message to the user alerting them to the new content.

## Content updates

Like refreshing, it's important to consider the best way to introduce new content into an existing page. If we view a page as offline-first, there will regularly be fresh content that could be injected into the stale page.

For example, when you load the Twitter native app, you don't immediately see the latest feed (let's not dwell on non-chronological feeds just yet); you see the feed from where you left off last time. This happens regardless of your [network conditions](https://youtu.be/LinpRhB4aWU?t=21s). If you're online, the latest posts are fetched and injected at the top of the page, and you're alerted that new content is available.

We need to be mindful of scroll position, page performance and screenreaders when injecting new content into a page.

## Authentication

Handling login states in Service Workers requires yet more thought.

In some regards, the man-in-the-middle nature of Service Workers provides a neat way to handle all unauthorised requests. Listening for 403 errors in `Response.status` could be a good way to prompt the browser to redirect the user to the login screen. But given Service Workers are not supported by all browsers, it's safer to ensure a server & client-side alternative is also put in place.

Purging most caches at the time of logout is probably a good step, but it'll be important to leave a login page in a different cache. Again, nuance will be required to get authentication to feel just right in a website.

## Releases

The 'pre-cache all the things' technique does throw up an interesting point about 'releases'. The web is an ever-changing landscape, and fortunately, we don't have to deal with app store walled gardens. But maybe there's a thing or two that could be learned from staged releases.

With an offline-only approach, the only file requested at runtime is the Service Worker itself. Until that file is altered, the browser will keep merrily serving the cached files. This gives us the option to stage releases and prompt refreshes when they're ready. I certainly don't think that the daily multi-megabyte native app update pattern is worth copying, but perhaps there are elements of it worth exploring?

## Non-SW

Service Workers have [great browser support](https://caniuse.com/#feat=serviceworkers) but we can't take that as a given. A service worker-first approach should **still be progressively enhanced**, but leverage the power of offline-first more than we currently do.

Classic [cache-busting](/blog/cache-busting/) techniques still have their place, and need to be accounted for in our Service Workers. Again, clear lines of communication will ensure you're handling the your caching responsibilities correctly. `/style.css?ver=20180927`, `/style.css` and `/style.20180927.css` may need to be viewed as the same URL in the Service Worker.

## Conclusion

Like all new technologies, patterns will emerge over time and standards will be forged.

I'm so excited to see how we can use Service Workers to improve the web.
