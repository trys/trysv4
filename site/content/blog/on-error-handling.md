---
title: Error Handling
date: 2018-08-08
categories: Web
draft: true
---

[Jeremy Keith](https://adactio.com) has written about [handling errors in Service Workers](https://adactio.com/journal/14241).

It's a pertinent subject for me at the moment. I was reflecting back to when I started web development. There were some programming concepts dubbed as 'essential' that totally went over my head. Starting with HTML and CSS made it appear that these were heavy, complex, and only needed for 'proper programmers'.

How wrong I was.

Two concepts sprang to mind: **Git**, and **Exceptions**.

Early me couldn't understand why you'd ever want a third-party library to throw an Exception, let alone why you'd want to throw one yourself. Why would you intentionally cause an Error that breaks the program flow?

When writing in JavaScript and PHP, I'd do my utmost to return a nice clean value from every method, convinced that every possible error had been accounted for. And yet, errors still occurred. I'd add even more nested `if/else` statements, to try and catch the blighters but a couple of months later, they'd return like whack-a-mole moles.

The clue was in that last sentence: **try and catch**.

I'd used `try/catch` when working with third-party code that I knew threw Exceptions. But only disgruntely, I still didn't see the point. Too often, the code would look like:

```
try {
    // Do something
} catch (e) {}
```

A dangling `catch` doing nothing. I knew it looked stupid, but in mixture of programming arrogance/naivety, I thought, _"that'll never error!"_.

Your code will error, and that's fine, everyone's does.



WordPress handled errors in a different way. To begin with, `WP_DEBUG` is set to suppress errors by default. Not a bad thing for production sites, but not a clever move for development.


API public interface
