---
title: "Making a 'post-it game' PWA with mobile accelerometer API's"
date: 2020-01-02
categories: Web
description: 'Accessing device hardware events, and working offline'
tags:
  - side project
---

At the annual Clearleft Christmas Party, after a fabulous pub lunch and successful Secret Santa (courtesy of [Basil](https://basil.christmas.trysmudford.com/)), we ordered some drinks and settled in to play some games.

Charades was the first candidate, but after some truly questionable suggestions & acting, we thought it best to open the acting out to democracy and play the 'Heads up' game.

Originally known as the [Rizla game](https://www.theguardian.com/lifeandstyle/2008/nov/17/party-games-guide) or 'post-it' game, the aim is for one individual to attach a post-it/cigarette paper to their forehead, and for the rest of the group to act it out. When guessed, you move onto the next clue.

Nowadays there is, of course, an app for that. Instead of post-its, you use your phone. And instead of swapping clues/post-its, you droop your head down, and look back up. It's a lot of fun, and generated a lot of laughter. But it got me thinking: why use an app, when you can use the web?! We are Clearleft, after all.

The next morning, while others were nursing slightly sore heads, I got to work on [building just that](http://trys-heads-up.netlify.com/). There were two main challenges to overcome:

1. Make the website work offline
2. Detect when the user looks down!

## Building a PWA

I begun the project with the [Preact CLI](https://preactjs.com/cli/getting-started); this provided me with a progressive web app shell and a smart webpack build system.

Preact pre-caches routes and assets included in webpack, but I needed to get a few sound effects into the cache. I followed the [documentation](https://preactjs.com/cli/service-worker/) on how the service worker works, and added the following snippet:

```js
workbox.routing.registerRoute(
  ({ url, event }) => url.pathname === '/assets/ding.mp3',
  workbox.strategies.cacheFirst()
);
```

Finally, it was important to get this to work without browser chrome, and launch in landscape mode. The [web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest) gives developers control over both of these things with the `display` and `orientation` properties.

```json
{
  "display": "standalone",
  "orientation": "landscape"
}
```

Once deployed to Netlify, part one was complete!

## Accelerometer access

Accessing device hardware sensors comes with some challenges. For one: security. In days of yore, you could gain access to this sensor without any user permission. This had [massive security implications](https://arxiv.org/abs/1602.04115), namely that malicious code could infer PIN entries based on the angle of the device. Yikes.

This has quite rightly led to a big clampdown on accessing the API. Unfortunately, this means there's a lot of conflicting documentation out there, making it hard to learn about the accelerometer today.

Additionally, hardware API's spit out a **huge** number of events, and sifting through them can be a challenge. More on that in a bit.

### DeviceOrientation vs. Accelerometer

I started off looking into the `Accelerometer` API. On first glance, it was perfect:

```js
const accelerometer = new Accelerometer({ frequency: 30 });

accelerometer.addEventListener('reading', () => {
  const { x, y, z } = accelerometer;
  console.log(x, y, z);
});
accelerometer.start();
```

But [poor browser support](https://caniuse.com/#feat=accelerometer) makes this a no-go for now. Furthermore, it's wrapped up in the deeply confusing, and poorly supported `Permission`s API. This wasn't going to work.

I looked into `DeviceOrientation`, an event on the `window` that emits the gyroscope position of the phone. But I initially struggled to get this hooked up. The [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation) example seemed to work on my phone, but although the same simple example in my codebase and local server didn't error, it also didn't output any events.

A library called [Gyronorm](https://github.com/dorukeker/gyronorm.js) was linked to from the very same article, but that had all sorts of complications with linked third-party modules not playing ball. It was beginning to look like this wasn't going to be possible.

I went back to the `DeviceOrientation` code and deployed it to Netlify. Loading that version DID work! The earlier issue was down to a lack of SSL on the local server. Progress!

### Picking events

Wading through the `deviceorientation` events was a case of trial and error.

```js
window.addEventListener('deviceorientation', e =>
  console.log(e.alpha, e.beta, e.gamma)
);
```

After deploying and running this, I held up my phone and started moving it around to get a feel of which value I should be focusing on. This game only requires the tracking of one angle: facing the phone downwards, and it appeared to be **Gamma**.

I wrote up some code to handle the movement and triggering of the next question:

```js
// Convert all negative to positive integers
const angle = Math.abs(event.gamma);
// See if the angle is within our bounds of accuracy
const angleMatches = angle < DEGREES;
const { nexting, gameState } = this.state;

if (angleMatches && !nexting && gameState === 'running') {
  // Add the catch, call the next question method
  this.setState({ nexting: true }, this.next);
} else if (!angleMatches && nexting) {
  // Remove the catch
  this.setState({ nexting: false });
}
```

Apologies for the word `nexting`, the API throws out an awful lot of events, so it's important to put a catch in place to stop the next question from being called multiple times before the user has lifted the phone back up to their head.

### Debugging

I gave this a spin on my phone and iPad, and to my great surprise, it worked! Excited by this, I sent it to a friend with an iPhone. Surprise, surprise, yet more problems. The accelerometer did nothing.

I pondered for a while, and sent the site over to [Jeremy](https://adactio.com/). It also didn't work on his phone. Our original theory was that the `deviceorientation` API hadn't landed in time for his phone. But after checking the iOS versions of our respective devices, it became apparent it was the opposite problem. iOS 13 disabled the use of the API without a user opt-in.

After several minutes of Googling, I came across [this issue](https://github.com/aframevr/aframe/issues/4287) on the Aframe repository. They had also had to overcome this problem to get VR to work in the browser. I delved into [the PR](https://github.com/aframevr/aframe/pull/4303/files) fixing this issue, and updated my code to suit:

```js
requestAccelerometer = () => {
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          this.startAccelerometer();
        }
      })
      .catch(console.error);
  } else {
    this.startAccelerometer();
  }
};

startAccelerometer = () => {
  window.addEventListener('deviceorientation', this.move, true);
};
```

The `DeviceOrientationEvent.requestPermission()` method triggers a browser-based on-screen prompt for the user, asking if they are happy to use the accelerometer on this site. If they approve, we can start listening for those events.

With all that pieced together, hundreds of ideas collated, and a quick lick of visual paint, the site was ready to go! A good morning's 'work'! Below is a video of me playing the game, and here's a link to [the live game](http://trys-heads-up.netlify.com/).

<div style="position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden;">
  <video src="https://www.trysmudford.com/images/blog/heads-up.mp4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" preload="none" controls></video>
</div>
