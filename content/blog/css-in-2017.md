---
title: CSS in 2017
date: 2017-12-09
categories: Web
tags:
  - css
---

Since beginning to dip my toes into the world of JS frameworks, I’ve noticed patterns emerging about how developers ‘should’ be styling websites. Some of those suggestions go against what I’ve learned building websites (as opposed to web ‘apps’, that’s a topic for another day), so I’m keen to find out what the ‘correct’ solutions are.

Quick pinch-of-salt preface... I love CSS. I love the cascade. I love writing lean and semantic HTML. I love progressive enhancement. And I love building features in CSS that have previously only been possible in JS.

As some form of background, my day-to-day is mostly building sites for small/medium businesses. I’ve worked on some larger ecommerce and business systems. Each site has a bespoke design and I work in a small development team.

With that aside, let’s crack on.

---

## UI Frameworks & Utility classes
Generic UI frameworks are something I’ve admittedly had little time dealing with. The few times I have come into contact have felt cumbersome and generally awkward to work with.

When I say generic UI frameworks, I’m referring to the Bootstraps & Tachyons of this world. The frameworks where you include a rather large black box of CSS and JS into your page, scatter your HTML with classes like `.d-inline-block` and `.float-sm-left` and out pops a nice modern-looking UI.

I think that most of the awkward experiences have occurred when I've tried to fight the system to tweak the design ever so slightly. This tends to lead into a battle of inheritance where one has to write some pretty nasty CSS to ‘beat’ the aggressive framework.

In the past, these frameworks have been sold as prototyping systems or ways for non-designer devs to make beautiful things. These are both very noble and valid use-cases and I can totally see how a framework would help in these situations.

But there does seem to be a trend forming of using a UI framework as a means of implementing a design for production. This gives me a few concerns:

### Top-down design
The internet is being governed more and more by a couple of key players. These huge companies are able to implement changes to their systems and turn the tide of design.

When Google released their design guidelines, the web became flat. When a few top marketing agencies started running a hero image with big white text, it seemed like every agency implemented it (ours included). Since Stripe have pushed their bold gradients and diagonal lines, there have been a swathe of imitators.

The result is a lack of design originality on the web. Don't get me wrong, these are all stunning pieces of design work, but they don’t need to be replicated on every site. Relying on a UI framework increases the design domination of these big multi-nationals.

### Performance
I’ve worked on and created some very specific UI frameworks for clients. They contain all and only the component styling needed for that site with no additional overhead. To that end, they’re very lean.

On the other hand, Bootstrap is comprised of:

1. CSS: **125KB**
2. JS: **50KB**
3. jQuery (JS): **84KB**
4. Popper (JS): **21KB**

Tachyons weighs in at: **80KB**. Tailwind is a whopping: **206KB**.

That is **a lot** of styling, and my guess is most sites don’t use half of it. The last site I worked on had &lt;25KB of CSS. The next Tomango site (still in development) has 10KB of CSS (before Gzip). It’s still possible to write lean CSS in 2017.

### HTML bloat and caching
Another knock-on from these frameworks is the additional HTML in the form of many classes per element. Below is an extract from Tailwind’s get started guide.

```html
<div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
  <div class="sm:flex sm:items-center px-6 py-4">
    <img class="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4" alt="">
    <div class="text-center sm:text-left sm:flex-grow">
      <div class="mb-4">
        <p class="text-xl leading-tight">Adam Wathan</p>
        <p class="text-sm leading-tight text-grey-dark">Developer at NothingWorks Inc.</p>
      </div>
      <div>
        <button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Message</button>
      </div>
    </div>
  </div>
</div>
```

And this is how I’d approach it:

```html
<address class="person v-card">
    <img src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4" alt="Adam Wathan">
    <h3>Adam Wathan</h3>
    <p>Developer at NothingWorks Inc.</p>
    <a class="button" href="mailto:test@example.com">Message</a>
</address>
```

The `<h3>`, `<p>` and `.button` all inherit the global styles and the `.person` class would tidy up the rest: setting the padding, floating the image on larger screens and adding box-shadow to the box. If box-shadows or that amount of padding was prevalent in the design, I’d would build in some utility classes, but not to the extent of a utility UI framework.

The problem with all that extra HTML is caching, or a lack of it. Your CSS file is a static asset, it doesn’t change each time the page loads. So we can cache the CSS very heavily and only tell the browser to fetch a new copy when an update has been made.

The same can’t always be said for HTML/page requests. They are dynamic, perhaps containing data from a CMS or through a social feed or comments section. For this reason, we don’t tend to cache HTML a great deal (if at all).

By utilising static assets, we can get great performance benefits for future site visits by letting HTTP headers handle the cache. But if the styles are inlined or the HTML is covered in hundreds of classes, those bytes are downloaded on every page request.

I was chatting with a friend the other day and they said: “Why not just add the utility classes as inline styles?” It’s a great point. If you’re going to the lengths of covering your HTML in classes, you may as well bite the bullet and write inline styles. But this got me thinking: What if this is long-term aim of the utility class movement? We’ve already seen an adoption of CSS in JS in the last few years. Would it be such a stretch to see utility classes swapped for inline styles in a build step?

`</tinfoil-hat>`

### Learning
I’ve always been told it’s better to understand the underlying concept, rather than learn the implementation. If you get how the system works, a new abstraction or language feature won’t rock the boat.

This worked well for me in the shift from CSS to SCSS. By understanding CSS well, making good use of SCSS wasn’t a stretch, and I could progressively adopt it. I started by writing CSS in a SCSS file. Then I started splitting the code up into logical files. Then variables became useful. Finally, I started using mixins and extends. But if someone pulled the SCSS carpet out from under my feet tomorrow, it wouldn’t be a problem. I’d just go back to the underlying CSS. Sure it would be a bit annoying, but it wouldn’t be a game-changer.

Each UI framework seems to implement a new and different naming convention, it’s all very [927](https://xkcd.com/927/). Let’s take font-size as an example. This is how a few UI frameworks implement the property with utility classes:

- Bootstrap: `.display-1`
- Tachyons: `.f1`
- Tailwind: `.text-5xl`

None of them are particularly intuitive, nor do they obviously represent font-size. I’d imagine swapping between these frameworks would get tiring.

## Component styling
Another trend forming in CSS is component scope styling. As a fan of Vue.js, I’ve got quite used to seeing `<template> <script> <style>` tags coexisting together in my code. I do quite like this concept of grouping the markup, logic and styling together. It’s similar to how I structure my PHP, JS and SCSS files, but instead of having a folder per language and feature, I have a components folder and files that hold it all.

To achieve perfect component encapsulation, JS frameworks either inline these styles or add a unique data attribute to each selector and put the CSS in a `<style>` tag on the page.

I’m yet to see a great solution for developers who are happy to use the cascade. It might work concatenating the component styles onto the global styles - admittedly I haven’t given this a great deal of thought.

Utility classes and component development are two modern practises that appear to go hand-in-hand. But do they? If encapsulation is your aim, utility classes are the polar opposite. Every class is essentially a ‘globally-scoped’ modifier and we’re chaining them to our components. It doesn’t sound all that encapsulated to me.

## Critical styling
![Eliminate render-blocking JS and CSS notice in Google page speed insights.](/images/blog/css-in-2017-pagespeed.png)

Google Page Speed Insights and Google Lighthouse are two tools that profile a site to test the performance (amongst other things). This ‘Eliminate render-blocking JS and CSS’ notice is an interesting one. It suggests that the classic `<link rel=”stylesheet” href=”style.css”>` is an antipattern. The reason: it blocks the first render.

There’s quite the fascination about the first render in performance guidelines - and I agree that it’s super important. Statistics show that an extra few milliseconds of load time can have pretty staggering effect to a site’s bounce rate. So any way to improve that metric has to be a win, right?

I have an alternative suggestion: write less code.

Remove the framework overhead and write lean, semantic CSS & HTML. Minify and Gzip your CSS and set sensible caching headers. Use a CDN and service workers if required. But progressively enhance from a solid starting point. Once the minimal CSS file is downloaded and cached the first time, all future visits will be quicker.

## In closing
I’m not sure what the conclusion is here. I’d like to learn more about styling a large JS-based system efficiently. Having attended a course on Vue.js, subscribed to a number of online resources, read countless tutorials and trawled through UI framework and utility library documentation, it still feels quite awkward to style websites/apps in 2017.

If we’re still in the infancy of this reactive framework movement, maybe the patterns are yet to be fully established. If that’s the case, perhaps there’s hope for an alternative, cascade-friendly and lightweight solution.

Please [tweet me](https://twitter.com/trysmudford) if you have thoughts on this matter, or recommendations on modern web styling, I’d love to learn more.
