---
title: 'Desktop progressive web applications'
date: 2023-11-22
categories: Web
image: /images/blog/arrows.png
description: Desktop applications without a single line of Objective-C
---

Jeremy recently blogged about ["Websites in the dock"](https://adactio.com/journal/20520), a feature in the latest Mac OS that allows you to add a progressive web application to your dock, effectively rendering it as a desktop application. Chrome has supported this for a while, but it had an annoying side-effect of launching Chrome alongside the PWA, awkwardly showing how the magic trick was really working.

Safari, however, lets you load this application entirely standalone. There's no trace of the web browser once you've installed the application through "File → Add to Dock". There's a custom application icon, with a custom name. When you open the application, it remembers whatever size/shape you left the window last time. When you supply the `standalone` attribute in the manifest file, the application loads without a browser bar, back button or bookmarks. And the application is called whatever name you supply in the Mac toolbar. For all intents and purposes, this is a desktop application created without a single line of Swift or Objective-C, or any heavy Electron wrappers.

Oh, and the application can work offline! Service workers, and browser storage are more than stable enough to handle a variety of offline loading patterns. These are truly exciting times to be building for the web!

## Putting it to the test

Naturally, I had to give this a go. After upgrading to Sonoma, I booted up Visual Studio Code and wrote a quick website. My colleague Chris and I have been discussing how frustrating it is to add those posh unicode arrows (↑↗→) and how we always end up googling 'unicode right arrow' and copying from an ad-laden page.

No more! [arrows.trysmudford.com](https://arrows.trysmudford.com) is my new home for all those symbols that are hard to remember. Need an Interrobang in your life‽ Grab it from the site. Are you regularly reaching for ≠? Add it as a custom symbol and never search again.

The stack is intentionally simple. There's no build script. There's no JS framework. There's a HTML file and a Service Worker that keeps it working offline. `localStorage` is used to hold any custom icons a user may choose to store. And there's a manifest file that tells the system which icons to use when saving the site as an application. It's stored on GitHub, and hosted on Netlify. I even deployed it to the internet from my phone.

Sit with that for a second, you can write a **desktop application** with **no tooling**, launch it **from your phone** to the internet **for free**, and seconds later **install it on any computer**. I didn't have to ask permission, or jump through any App Store hoops. I wrote a thing, pushed it to the internet, and then I could use the thing. Even better, I could send the link to Chris and *he* could use the thing. That's the power of the internet.
