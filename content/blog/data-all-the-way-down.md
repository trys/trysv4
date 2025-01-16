---
title: Data all the way down
year: 2024
date: 2024-06-04
categories: Web
---

We had our bi-monthly company hack day last week. I had the pleasure of teaming up with a colleague who isn't in engineering (yet), but would love to move into the backend engineering space. We took a low-hanging fruit problem and split the work between backend and frontend by popping down some post-it notes to describe the system.

They did a fantastic job building the three API routes required and I was particularly impressed at how methodically they talked through the logic of each method; they definitely have the aptitude to make a great developer. We hooked it all up to the frontend and gave it a good test.

When it was all working as expected, we went on a little refactoring journey. The idea of [make it work, then make it good](https://medium.com/swlh/coding-faster-make-it-work-then-make-it-good-6aa988ebd8ab) really resonated. With an established functional benchmark, we switched focus from end-user #1 (the API consumer), to end-user #2 (the next reader of your code).

There were a good number of traditional `for` loops in use, which, although worked, weren't particularly clear and were the cause of a few early logical bugs. So we looked to switch them out for array methods, a subject I realised I [wrote about](/blog/more-js#array-methods) following some internal training I gave some seven years ago. Array methods really were the penny dropping moment for me, when it came to getting confident with JavaScript. In HTML, 90% of _stuff_ is elements. In JavaScript, 90% is _stuff_ is objects or objects masquerading as arrays. Objects and arrays are simply containers of data, and once you learn how to squash and shape data from one format into another, you can tackle all manner of problems.

With this mindset, state-based frameworks don't seem all that scary. You fetch some data, squash it about a bit from the shape the backend provided into a shape you're happy with, then pass it to a component to show the properties you wish to show. DOM scripting makes more sense; if you `querySelectorAll` gives you an array-like entity, and `querySelector` gets you an object-like entity. You can access data attributes with the `dataset` property, much like any other object. Streams, web audio, geolocation and web storage are all data that can be wrangled and squashed into any shape you need.

Remember, most websites are just a [list of things, or a single thing](/blog/city-life/#:~:text=We%20kid%20ourselves,it%20than%20that.). An array of objects, or an object. It's data all the way down.