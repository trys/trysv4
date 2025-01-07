---
title: Making some updates
date: 2018-09-23
categories: Web
description: "I spent the evening making performance updates on my site"
tags:
  - website
  - digital gardening
---

After [falling down the rabbit warren](/blog/down-the-rabbit-warren/), I thought it was time to perform some housekeeping on my site. This was spread over two evenings with the commits from day one [here](https://github.com/trys/trysv4/commit/b5a72e3b3404e9892d8b66100e92b2972cf2dbde). The day two commits are linked from their respective headings below.

## NPM updates

This site is written in Hugo and is compiled with [hugo-bin](https://www.npmjs.com/package/hugo-bin). There are a few other `devDependencies` to take care of too.

NPM has a handy feature that warns you if your packages are getting out of date, or if any major security fixes are available. A quick run of `npm audit fix` did the job here.

## Fonts - stage 1

As ever, Zach Leatherman [provided the secrets](https://www.zachleat.com/web/font-checklist/) to font optimisation!

### Preload

I added a preload statement for the two web fonts on the site; it tells the browser to start downloading them earlier. Without a preload hint, the browser has to recieve and parse the CSS requesting the font, before it can make the request. I only preload the `woff2` font as most browsers can serve this format now.

`<link rel="preload" href="/fonts/[font_file].woff2" as="font" type="font/woff2" crossorigin>`

### Font-display

Adding `font-display: swap` to the `@font-face` block asks browsers to perform a FOUT, rather than a FOIT. It's not hugely supported, but thanks to the declarative nature of CSS, that doesn't matter!

## Tidying up the home page

I <del>have</del> had two projects on the home page. They were mostly superfluous fluff. They're gone now - saving two image requests!

---

That was enough for one evening, so I came back to the site today and make a few more changes...

## Fonts - stage 2

### [Subsetting](https://github.com/trys/trysv4/commit/b6a68ccea1cc49822ede4c95edcf01b6691a490f)

After finally getting `pip` installed (it all got a bit ['Hal changing a lightbulb'](https://www.youtube.com/watch?v=AbSehcT19u0)), [Glyphhanger](https://www.zachleat.com/web/glyphhanger/) took huge chunks out of my font files by subsetting them.

It's truly amazing. The two `17kb .woff2` files became `4kb`!

I added the new fonts to the static directory and updated the `@font-face` references.

### [Service Worker font references](https://github.com/trys/trysv4/commit/86199800f0726074368951c60f742b4c7e5341dc)

After running the site through WebPageTest, I was still seeing the old files being served. It transpired that the Service Worker was precaching them! Fortunately that was a quick change to the font references in the SW.

## [Meta description](https://github.com/trys/trysv4/commit/abaa30f2bb313f3edac924002234a5c75bc7839c)

I ran Lighthouse on the site, it showed 100 on all counts, apart from an SEO issue. Thanks to the brilliant descriptions, it showed that the home page was missing a meta description. Again, a nice quick fix.

## [Redirects error](https://github.com/trys/trysv4/commit/cc5ee0d5fb8cf821b59089f968cec905987aa3a6)

When I checked the build status of a deployment, Netlify warned me that one of the redirects wasn't formatted correctly. This is a new feature in Netlify's deployment process, and it's super-helpful. It alerts you to mixed-content warnings, header/redirect issues and more! It's all outlined [here](https://www.netlify.com/blog/2018/09/05/more-confident-deployments-thanks-to-netlify-deploy-summaries/).

## Google Analytics

The cache time on Google Analytics has always frustrated me. WebPageTest and Google PageSpeed insights always complains that the GA JS file isn't being cached heavily enough. Thanks to the wonderful [ga-lite](https://github.com/jehna/ga-lite) package, you can serve high-cache and minimal analytics! It's all compatibe with GA, but a quarter of the size.

---

## Results

The home page was: **147kb**  
The home page now is: **28kb**

An article page was: **41kb**
An article page now is: **16kb**

WebPageTest is showing all A's and Lighthouse is all 100's.
