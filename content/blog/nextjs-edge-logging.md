---
title: 'Next.js edge logging with Pino/Datadog'
date: 2024-04-30
categories: Web
---

I encountered an issue with the potent combo of: Next.js App Router, Edge runtime, Server Actions, Pino and Datadog. After much googling, I couldn't find a solution to this problem, hence this keyword-stuffed blog post for future me/others.

First up: logs were appearing in Datadog over multiple lines, which broke the `stdout` formatting rendering the logs unusable. Note, this only happened with the Edge runtime, not the standard Node variation. To solve this, I added a new section to the standard pino config:

```js
const isServer = typeof window === 'undefined';
const isNextEdgeRuntime = process.env.NEXT_RUNTIME === 'edge';

export const config = {	
    // ...standard pino config
    ...(isServer && isNextEdgeRuntime && {
        browser: {
            write: {
                critical: (o: Object) => console.error(JSON.stringify(o)),
                debug: (o: Object) => console.log(JSON.stringify(o)),
                error: (o: Object) => console.error(JSON.stringify(o)),
                fatal: (o: Object) => console.error(JSON.stringify(o)),
                info: (o: Object) => console.log(JSON.stringify(o)),
                trace: (o: Object) => console.log(JSON.stringify(o)),
                warn: (o: Object) => console.warn(JSON.stringify(o)),
            },
        },
    }),
};

const loggerInstance = pino(config);
```

However, this created a second problem. Despite using `console.error`, errors were still being reported to Datadog as `info`, which then failed to trigger alerts and monitors. Not great. The solution was to pass a `level` parameter into the object; pre-stringification, on the `warn` and `error` methods.

```js
const isServer = typeof window === 'undefined';
const isNextEdgeRuntime = process.env.NEXT_RUNTIME === 'edge';

export const config = {	
    // ...standard pino config
    ...(isServer && isNextEdgeRuntime && {
        browser: {
            write: {
                critical: (o: Object) => console.error(JSON.stringify(o)),
                debug: (o: Object) => console.log(JSON.stringify(o)),
                error: (o: Object) => console.error(JSON.stringify({ ...o, level: 'error' })),
                fatal: (o: Object) => console.error(JSON.stringify(o)),
                info: (o: Object) => console.log(JSON.stringify(o)),
                trace: (o: Object) => console.log(JSON.stringify(o)),
                warn: (o: Object) => console.warn(JSON.stringify({ ...o, level: 'warn' })),
            },
        },
    }),
};

const loggerInstance = pino(config);
```

This tells Datadog to treat the offending logs as errors/warnings, which can then be used to trigger alerts etc.
