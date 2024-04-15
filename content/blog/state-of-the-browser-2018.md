---
title: State of the Browser
date: 2018-09-09
categories: Web
description: State of the Browser 2018 was a wonderful conference. The talks were thought provoking and the whole day was organised brilliantly
---

State of the Browser 2018 was a wonderful conference. The talks were thought provoking and varied, the whole day was organised brilliantly, and the tickets were so reasonably priced.

---

## Super-powered Layouts with CSS Grid and CSS Variables

Michelle Barker kicked off the event tackling CSS Grid Layout & CSS Custom Properties. It was amazing - there were so many knowledge-bombs dropped.

The square-bracket syntax for line names had totally passed me by. _Side note: I love it when you learn something new about a language you've been writing for years. The `turn` unit knocked me for six the other day_. The `-start` and `-end` suffix shorthand was another brilliant revelation.

Combining Grid and Custom properties looks so exciting! Both specs have been written in such a thoughtful manner, and clearly built to solve real-world problems. It shouldn't be a surprise that they work well together!

One key reason I attend conferences is to be inspired, and Michelle's talk did just that. I was scribbling notes throughout the day as new ideas formed on how to incorporate custom properties into my CSS.

---

## Moving toward Web 3.0 in Brave

If inspiration is one reason to attend a conference, having ideas challenged has to be another. This second talk by Dr. Ben Livshits certainly provoked some thoughts!

Brave looks like a totally different challenger in the browser market. It's new, it's different, and I'm still not really sure how I feel about it! But that's cool!

The goals sound noble enough:

- Private by default
- Reform digital ads
- Pay users to browse

And the Basic Attention Token (BAT) appears to be an interesting approach to user tracking. But the BAT is also used as currency, and this is where the Brave direction started to feel uncomfortable.

It encourages pay walls. If reforming digital ads means walling off the open web, then count me out.

![Black Mirror episode, Fifteen Million Merits](/images/blog/fifteen-million-merits.jpg)

Intentionally consuming advertisements to earn credits was the premise of one of the first Black Mirror episodes. This approach by Brave feels like it could be the first step down that path; providing justification for gated content, crediting users for consuming advertising, and placing a tangible value on our time.

This talk generated so much discussion at lunch and I'm glad to have heard it. When discussing Brave, we conceded that we take for granted just how established and **shady** the current 'system' is. Google Chrome, Google Adwords, Google Analytics - there's a trend here.

I think the feeling of discomfort was partly down to Brave being a new and potentially disruptive technology, but also it made us stop and thinking about the current landscape a little more.

---

## Stop the #divFest!

Sara Vieira's talk was brilliant. It was a fast-paced and hilarious dive into the div-soup that makes up many modern web applications.

It's a subject I feel strongly about being a passionate supporter of semantic HTML.

`<svg role="img">` was another nugget that's getting integrated pronto. I had no idea assistive devices read out SVG tags when that role isn't set!

---

## The web, apps, web apps, and other Venn diagrams

There was a lot to digest in this talk, definitely one to re-watch. Rowan Merewood discussed what users require from our sites and apps.

We focus so much on the technology stack, the design, the UX, the right approach, the correct tracking model. But to users, **our sites and apps are implementation details**. They have a goal, our job is to help them meet it, simple as that.

This is a mind shift from app-centric to task-centric.

Rowan showed a great example contrived from the idea of buying a sofa. Most customers are not in the business of buying sofas everyday (👀 looking at you Amazon and your suggest products feed ). Bombarding a user with newsletter signups, push notification requests, and add to homescreen popups too early on the process is futile. They'll quite rightly block the requests and might even get fed up enough to try a different site.

Instead, we can view their visit in a task-centric way, and look to help them with their specific goal. Don't prompt the user to add the whole site to their homescreen from the offset. Catch that event, and serve it when they've invested some time - perhaps after an order has been placed?

Better still; look into creating micro PWAs that serve the single purpose of handling their order. It stands to reason that a customer will be more likely to install a PWA that is relevant, timely and concise.

Follow the same approach with push notifications. Use the web platform tools we've been given wisely.

---

## WebXR and the Immersive Web

Ada Rose Cannon shared about the amazing possibilities of Web XR.

Virtual reality and augmented reality are two ends of the same spectrum.

The most encouraging part of this talk was seeing how much care is going into developing these specifications. The transition from desktop to mobile was shaky, so it's great to hear how browsers and companies are preparing for this next shift. Pokémon Go showed the world how massive XR can be, so we need to be ready to steward this new medium well.

Ada raised a really interesting point about the problem with native XR apps. We know how large 'normal' native apps can get, and how expensive their daily updates are for many users. Native XR apps are often an order of magnitude larger. And when each content provider creates their own walled product, it's going to be very costly to the user.

Web XR will be the only viable option to get XR to the masses.

---

## How to be a Web A/V Artist Part 2: Picking Up the Threads

Ruth John talked about Web Audio and visualisations, but a key part of the talk was on web workers and worklets.

Workers bring multi-threading to JavaScript. Computationally complex tasks can be pushed to other threads leaving the main thread to handle scrolling, rendering and general DOM work.

It was super interesting to learn about transferables, and how the browser literally plucks the data from one thread to the other, leaving nothing behind!

This all feels pretty low-level and scary! But the API is surprisingly straightforward. `worker.postMessage()` sends the data, and `worker.addEventListener('message')` receives it.

---

## Bring on the design tools

Chris Mills walked us through the exciting new tools in Firefox, and showed how perfect they are for designers and developers to use.

The easing tool, variable fonts editor and animation inspector were particular highlights. They're set up to allow on-the-fly adjustments to make your site 'feel' right - something designers are incredibly skilled at!

The accessibility view shows how the browser is interpreting your semantic HTML in the accessibility tree.

I'm also really excited to see how Firefox works in a dev tools 'history' to make changes persist across page loads.

---

## Hinting at a better web

Christian Heilmann started off the final three impassioned talks on a better, progressive web. 

Developer convenience and a desire to release quickly often trump performance. When you're constantly AB testing, changing interfaces and pushing updates, nothing stays around long enough to be improved. The `#divFest` Sara talked about is rarely around for enough time to be spotted, nor is it noticed by our current crop of tools.

Our online resources (👀 looking at you Stack Overflow) favour the **how over the why**. How can we encourage learning to those who need it?

Being a web expert is less exciting than being a full stack developer. Should we be specialising more?

> We're not paid to learn, just deliver.

This quote generated some interesting group discussion on whose responsibility it is to encourage training. Should our organisations be doing more to upskill us? Could it be that smaller businesses skill us enough to be useful, but not enough for us to desire greater challenges beyond the company? Does the lack of industry accreditation and unions make it easier for companies to hold back on training?

The modern web of today becomes the security bugs of tomorrow. Best practises don't get updates so our code stagnates.

Documentation and best practises should be given **in context**. In-editor linting is a great example of this, much like spellcheck. Preventing bugs before they happen is the best approach.

Christian rounded out by showing [webhint.io](https://webhint.io), a JS foundation product that's both a website, and a CLI integration for testing your site against current best practises.

---

## The Web Is Agreement

Jeremy Keith presented an [excellent talk](https://adactio.com/articles/14321) on standards, intangibility and the web.

Web standards are intangible. They are agreements of shared consensus. A website is an instantiation of the intangible agreement of what HTML is.

The [priority of constituencies](https://www.w3.org/TR/html-design-principles/#priority-of-constituencies) puts users over authors over implementors over specifiers over theoretical purity. The cost should never land at the users feet; we should harbour that responsibility, that's the job.

Shipping containers and the web are both patent-free, it's a key reason why they both rose to such levels of success.

Pave the cowpaths. Take note when people use a feature in a certain way. Embrace it, and make it better. Don't invent something new.

> If developer convenience is your priority, silver bullets are hard to justify. But if you’re prioritising users over authors, progressive enhancement is the logical methodology to use.

Consistency is not the main priority for the web, universality is.

Working together, collaborating and coming to agreement are not _soft skills_. They are so important.

---

## Dear Developer, the web isn't about you

Charlie Owen's talk was like oxygen.

I was nodding and scribbling furiously throughout! It was such a great talk, linking in perfectly to the truths dropped in the preceding two talks. I can't wait for the recording of this talk to be released.

> The web is strong because of stupid layers.

🔥 _A few developers on Twitter should consider this point in light of the CSS drama this weekend_ 🔥

It is robust. The fact that you can open dev-tools and delete whole chunks of markup; **at runtime**, and the site stays error free is incredible. We don't remember this enough.

The web was weird, free and wild. And then it became commercial. After several years, the iPhone changed everything - it was a lesson in diversity. Now we're starting to exclude people again.

We should be building sites in a pyramid of robustness - HTML and CSS are incredibly fault-tolerant so they should hold down the fort at the base of the stack. JS is fragile and fails badly. JS-first is like commuting to work two miles in a self-built flying car. It's hugely impressive, but maybe just buy a bike next time?!

One stat that stood out was: the average rural US network speed is still running at dialup levels.

Charlie challenged us on accessibility. It's never the number one on the job description, it's rarely even near the top.

It's too easy to fall in love with over-engineering. The web `!==` JS apps.

> Resume-driven development

👆 This quote hit like a freight-train. In encapsulates so much of what's going on in our industry right now.

1. Have a simple technology mindset
2. Build with semantics
3. Design and develop progressively
4. Build a site available to everybody
5. Test like a professional
