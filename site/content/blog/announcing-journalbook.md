---
title: JournalBook
date: 2018-12-31
categories: Web
description: JournalBook is a private, offline-first personal journal.
image: /images/blog/journalbook.jpg
---

I've been working on a little web product over the Christmas break, and I'm proud to announce version 1 of [JournalBook](https://journalbook.co.uk) 🎉

[![JournalBook](/images/blog/journalbook.jpg)](https://journalbook.co.uk)

### What's JournalBook?

JournalBook is a private, offline-first personal journal.

Your notes are **only** stored on your device — they're never sent to a server. You don't even need to sign-in to use it! It's works offline, so you can reflect upon your day on the slow train journey home.

It's quick, lightweight, and developed [in the open](https://github.com/trys/JournalBook). You can even add it to your homescreen as an app.

### Why build it?

On one of the last days of work in 2018, one of my colleagues asked us about our highlights from the year. Sure, I could remember the big ticket items, but I quickly struggled to remember anything past that.

I've never been much of a writer, so keeping a diary or journal has never crossed my mind. But it dawned on me over the holiday that I would benefit from keeping some daily notes, not least to keep track of the small victories. I'm a creature of habit, and most days blend into one routine, so pulling out differences can be a challenge.

After considering existing solutions, I decided that building a small Progressive Web App would be perfect for this use case. Something that would work entirely offline, reading and writing directly to my device. Not only would it be faster, it would be personal and private, like a physical journal.

It needed to be a product that worked on the underground whilst on my commute home. But it also needed to be fully-featured, as 'paper-like' as possible, and a joy to use. I'm hoping [JournalBook](https://journalbook.co.uk) rises to those challenges.

---

### How does it work?

Right, sales pitch over, let's get technical. The stack is as follows:

- Preact
- IndexedDB
- Netlify

I chose [Preact](http://preactjs.com) as it's tiny and fast. This project would be more than achievable in Vanilla JS, but I'm working day-to-day in React so this seemed like a good way to build something nice and quickly. It was mostly built on Boxing Day and I didn't want to get bogged down in application decisions!

IndexedDB wrapped with [idb](https://www.npmjs.com/package/idb) was the perfect local database layer. It's all stored directly in the browser and I can separate the data far better than with LocalStorage. There are two data types: questions and entries. Each entry is autosaved to the cache each keypress so there's no need for 'save' buttons, nor waiting for network requests to resolve.

As there's no servers or databases storing user information, this was (yet again) an opportunity to use the wonderful [Netlify](http://netlify.com). I've waxed lyrical about Netlify in the past so I won't dwell on it too long, but once again **it just worked**. There's nothing like it.

Even though the application works entirely offline, it's still able to provide features like data import/export, data eradication and autosave. The former two features are thanks to `Blob` and `FileReader`. It's genuinely incredible to me that you can read and write data files **entirely in the browser**. That's bonkers! But amazingly, it's not that complex, 15-20 lines of code for each and we've got personal data managment on the web!

### What's next?

To ensure I actually launched this product, and it didn't fall into the pile of abandoned side-projects, I first created a [Roadmap](https://github.com/trys/JournalBook/projects/1) with features ranked in order of importance. There was an MVP column, a V1 column, and a backlog. By breaking it down this way, I could separate the 'musts' from the 'coulds' and the 'shoulds', and have sensible milestones for each release.

Now the V1 pile is clear, the product can be launched!

Next up is data visualisation, being able to navigate to previous entries, and the ability to search your content. I _really_ don't want to have heavy tracking on this, as it goes against the spirit of the product, but it would be nice to know if people are using it. Basically, I want a **90's hit counter as a service!** So that's probably next on the list.

The product will continue to be developed in the open, so please file issues and suggestions on [GitHub](https://github.com/trys/JournalBook).

{{< button "http://journalbook.co.uk" >}}Start Writing{{</ button >}}

