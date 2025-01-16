---
title: LetterImages
year: 2019
date: 2019-02-16
categories: Web
description: ASCII images and how I did it
tags:
  - side project
---

I've made [LetterImages](https://letterimages.netlify.com/)! It's a little website that renders images as ASCII. Not a hugely imaginative name, I know.

It functions both as an arty piece for pre-existing images gratefully taken from [Unsplash](https://unsplash.com/t/people), and as a means for one to upload individual photos.

[![A letter image creation](/images/blog/letterimages.jpg)](https://letterimages.netlify.com/)

Canvas does most of the heavy lifting here, plotting the image and analysing the pixel data from each chunk of image. The visible output itself is a multitude of `spans`.

It's a bit rough n' ready in places, but that's fine - it's a side project! One of the main incentives was to create something with an immediate result. Work has been very stressful these past two months and I haven't been coding for fun as much as I'd like. It has felt wonderful to build something a little lighter over the weekend.

The code is available for perusal [on GitHub](https://github.com/trys/LetterImages), and I've commented in the main [.js file](https://github.com/trys/LetterImages/blob/master/letter-image.js) to explain how it's all working.

Oh, and it's pretty CPU intensive, sorry! `OffscreenCanvas` and Workers look like the perfect candidates for this, but a lack of Safari support snuffed that out for now.
