---
title: Declarative Tracking
date: 2023-12-08
categories: Web
description: 'A declarative approach to tracking events in a reactive project'
---

On 'reactive' projects, it's pretty common to attach event tracking to buttons/forms etc using inline `onClick`/`onSubmit` handlers. It usually starts with the harmless "can we track how many times this button is pressed" request, and without thinking, you attach a handler that looks something like this: `onClick={() => ga('event'))`. This continues for many months & years until your codebase is littered with these inline tracking functions.

I've had the opportunity to work on a greenfield project recently and was able to trial an alternative approach. A more declarative approach. I'm certainly not the first person to think of this, but I wanted to share my experience. It looks a bit like this:

```html
<button
    type="button"
    data-track="cta"
    data-track-category="homepage"
    data-track-name="heroCta"
>

<form data-track="submit" data-track-category="createAccount">

<a href="..." data-track="click">
```

Any anchor, form, or button can be marked up with `data-` attributes that describe the event. Rather than attach a handler to each event, we register one global `click` and `submit` event handler on the `document`. Thanks to event bubbling and `event.target.closest`, we can easily filter out elements that don't have the `data-track` attribute.

## Benefits

- This is a substantially more efficient pattern to attaching events to each element, particularly in a re-render heavy framework like React
- Abstracting this functionality allows us to declare less per element. For example, we can read `event.target.textContent`, rather than re-supply the label on every call-to-action button. We can automatically pull in the `href` on an anchor once, rather than duplicate the URL in an inline function
- There's less code to write per component
- We can add new tracking providers without touching every component
- Common values can be set globally, rather than per component. For example, we may wish to pass the current page URL for all events
- This all started in a Next.js project. I'd painstakingly constructed my server/client components to minimise the number of client components. And that would've been entirely obliterated with inline tracking functions, that have to exist in a `'use client'` file. This approach allowed me to keep as many components as pure server components

## Drawbacks

- It's extra HTML to send over the wire - sending markup for something that is entirely client-side isn't ideal
- Everything that's tracked is easier to see in dev-tools - it's not as if inline functions are hidden, but they're certainly less obvious. This could be a positive; if you're not comfortable with someone seeing what's being tracked, then maybe it shouldn't be tracked? The tracking sunlight test
- Non-primitives can't easily be tracked without stringifying JSON

## Abstracting the tracking

Rather than calling, say, Google Analytics directly in the global handler, I've taken to dispatching a `CustomEvent` in a consistent format that can be listened to by any number of handlers. For the few times you may need to track something outside of the global handler, you can dispatch a `CustomEvent` with the same format and it'll be fed to all the handlers.

## Implementation

This is a rough implementation of the concept - I can't guarantee perfection but it's broadly what I've been using:

```js
const TRACKING_EVENT = 'namespaced:tracking';

// Fire events to all tracking providers
const trackEvent = (eventAction, trackingDetail) => {
    window.dispatchEvent(
        new CustomEvent(TRACKING_EVENT, {
            detail: {
                eventAction,
                trackingDetail,
            },
        }),
    );
};

const globalTrackingHandler = async (event: Event) => {
    // Detect if we're on a trackable element
    const target = (event.target as HTMLElement).closest('[data-track]');
    if (!target) return;

    // Prevent click events from firing on trackable forms
    const action = target.dataset.track;
    if (action === 'submit' && event.type === 'click') return;

    // Extract data from the trackable element
    const category = target.dataset['track-category'];
    const label = target.dataset['track-label'];
    const name = target.dataset['track-name'];
    const url = target.dataset['track-name'] ?? target.getAttribute('href') ?? window.location.href;

    // Pass events to the global tracking helper
    switch (action) {
        case 'click': {
            trackEvent(action, {
                category,
                label,
                name,
                url,
            });
            break;
        }
        case 'submit': {
            const formLabel = target.querySelector('[type="submit"]')?.textContent ?? label;
            const formUrl = target.getAttribute('action') ?? url;
            trackEvent('cta', {
                category,
                label: formLabel,
                name,
                url: formUrl,
            });
            break;
        }
        default:
            break;
    }
};

document.addEventListener('click', globalTrackingHandler);
document.addEventListener('submit', globalTrackingHandler);

const specificTrackingHandler = (event) => {
    const { detail } = event;
    if (!detail) return;
    const { eventAction, trackingDetail } = detail;

    switch (eventAction) {
        case 'click':
            trackClick(trackingDetail);
            break;
        case 'cta':
            trackCta(trackingDetail);
            break;
        default:
            break;
    }
};

window.addEventListener(TRACKING_EVENT, specificTrackingHandler);
```
