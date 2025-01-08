---
title: Testing knarly React hooks
date: 2025-01-08
categories: Web
tags:
  - testing
  - react
  - hooks
---

Treat this post as a reminder to future me, when I'm tearing my hair out after testing knarly hooks in React. Hooks that use: `useEffect` + `async/await` + `setInterval` + state updates = 🤯

Here are all the things you probably forgot to do, Trys:

1. Use `renderHook` from `testing-library-test-utils`

It gives you a `result` object, as well as some very handy `waitFor` functions. These are particularly useful when the hook fires off an async function in `useEffect`.

2. Wrap `act` around state updates

Anything that causes a state update and subsequent rerender should be wrapped in `act`.

3. Use the right `act`

`act` from `react-dom/test-utils` is different from `act` from `@testing-library/react` which is different from `react-test-renderer`. Use the right one. I don't know which is the right one, but one of them is 🤷

4. `waitFor` is your friend

`waitFor` waits for an assertion to pass. It's handy when you're testing async code `waitForValueToChange` was really useful, but doesn't work in React 18. Use `waitFor` instead.

5. `jest.useFakeTimers` is also your friend

Timeouts and Intervals are a pain to test. `jest.useFakeTimers` makes them a little less painful. Use `jest.advanceTimersByTime` to move time forward. Use `jest.runOnlyPendingTimers` to run any pending timers. Use `jest.useRealTimers` to go back to the real world (pop that in an `afterEach`).

6. Group things

I'm waiting for my friend [Szymon](https://szympajka.com/) to write a blog post on this (consider this a nudge, pal!) - he's come up with a beautiful pattern for testing hooks/components, so I'll link to that here when it's done.