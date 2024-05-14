---
title: 'Minimum network request time'
date: 2024-05-14
categories: Web
---

My super-smart colleague Szymon has written a top piece on [managing async operations](https://medium.com/@szympajka/managing-asynchronous-operations-with-abortcontroller-96f7c9cb4917) with the lesser-used AbortController. I love this abstraction—it gracefully moves network and non-network asynchronous work into the same conceptual layer, and makes your async code more predictable and robust.

Taking his [abortable & promisified sleep helper](https://medium.com/@szympajka/managing-asynchronous-operations-with-abortcontroller-96f7c9cb4917#:~:text=Let%E2%80%99s%20modify%20our%20sleep%20function%20to%20add%20support%20for%20signals%3A), you can build in artificial delays between asynchronous work. Here it's running in series (using `React.useEffect` to handle aborts):

```js
useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetcher = async () => {
        await fetch('/api/1', { signal });
        await sleep(500, { signal });
        await fetch('/api/2', { signal });
    };

    void fetcher();

    return () => {
        abortController.abort();
    };
}, []);
```

## Slowing down the network

It's rare to want to actively slow down a task on the web, but occassionally an element of articifical friction can go a long way to helping an experience _feel_ correct. Some tasks, particularly ones involving sensitive user input, benefit a _minimum_ request time, to give the impression that the work is sufficiently complex and we're taking it seriously. Perceived performance, but from the other perspective, if you will.

If the time between clicking "Purchase" and seeing the "Order confirmed screen" was in the order of `100ms`, I bet that a), you'd question whether it had even gone through, and b) you could feel as if the transaction wasn't handled with sufficient propriety given the money you'd just spent. But in a Reactive world with Edge-API's, it's possible for a network request to resolve that fast, and for the user to be transported to the confirmed screen within a subsequent frame. I'm not suggesting we build in five seconds of artificial delay to every interaction, but a safety net of `1000ms` might be appropriate for _some_ key interactions.

In cases where the network _is_ slower, we definitely don't want to hold up users any longer with our artificial delay. We can run the above code in parallel with `Promise.all` to get around this, whilst still getting all the great unloading protection from the `AbortController`:

```js
useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetcher = async () => {
        // Wait a minimum of 1 seconds before proceeding
        await Promise.all([
            fetch('/place-order', { signal }),
            sleep(1000, { signal })
        ]);

        // Navigate the user
    };

    void fetcher();

    return () => {
        abortController.abort();
    };
}, []);
```

Which could be abstracted one step further into another helper:

```js
export const fetchWithFriction = async (url, params = {}, friction = 0) => {
    const [response] = await Promise.all([
        fetch(url, params),
        sleep(friction, { signal: params?.signal })
    ]);

    return response;
}

await fetchWithFriction('/place-order', { signal }, 1000);
```
