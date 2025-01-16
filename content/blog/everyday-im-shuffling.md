---
title: "Everyday I'm Shuffling"
year: 2020
date: 2020-12-17
categories: Web
description: "How to unshuffle cards and shuffle arrays"
tags:
  - side project
---

I've been thinking about shuffling cards and arrays. That might sound odd, but having built a fair few [spreadsheet games](https://www.trysmudford.com/blog/virtual-games-boggle/), and played an awful lot of cards this year, I guess it makes sense.

Let's start with shuffling a deck of cards. This classic move is the riffle and bridge, or so I'm told:

<figure>
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video src="https://www.trysmudford.com/images/blog/shuffle-small.mp4" poster="https://www.trysmudford.com/images/blog/shuffle-poster.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" preload="none" controls></video>
  </div>
  <br />
  <figcaption>Yes - I'm not very good at this shuffle yet...</figcaption>
</figure>

It involves splitting the deck in two, and fanning the two halves back together from the bottom of each side, card by card. But I was wondering, assuming you did a perfect shuffle:

> How long would it take to get the deck back to the first, initial state? Could you unshuffle the shuffle?

Now as you've seen from the above video, I'm not nearly a good enough shuffler to do this perfectly in real life, but I can code (replace shuffler with pretty much anything, and this statement sums up my life).

Let's write a bit of JavaScript. A traditional deck is made of 52 cards, so we can create an array with numbers: 1-52 with the `Array.from()` method.

```js
const cards = 52;
let deck = Array.from({ length: cards }, (_, i) => i + 1);
```

Next we have a method that splits the deck in two, empties the original pack, and pushes the cards back in, card by card.

```js
function shuffleIn() {
  const half1 = deck.slice(0, cards / 2);
  const half2 = deck.slice(cards / 2, cards);
  deck = [];
  
  half2.forEach((card, index) => deck.push(card, half1[index]));
}

shuffleIn();
```

When we output the result, we can see what's happening:

```
[26, 52, 25, 51, 24, 50, 23, 49, 22, 48, 21...]
```

The odd-position numbers are the original top half of the pack, and the even-positions are the bottom, and both positions are descending. Running it a second time on the newly created deck produces the following:

```
40, 27, 14, 1, 41, 28, 15, 2, 42, 29, 16, 3...]
```

It's looking more random, but we still have a pattern: every fourth card is ascending. So, the big question, how many shuffles till we get back around to the same pack? 20, 40, 80? Let's run it 100 times, and stop when it looks like the pattern is back to the beginning:

```js
for (let i = 1; i < 100; i++) {
  shuffleIn();
  if (deck[0] === 1 && deck[1] === 2) {
    console.log(deck, `Shuffle no. ${i - 1}`);
    break;
  }
}
```

The answer? **Shuffle no. 52**.

That seems like a reasonable number given the number of cards. And it doesn't seem like the sort of problem we'd run into in the real world, right?

But what if we made one small change. Let's swap the halves round, so we push in the top deck first. All we're changing is the final line here:

```js
function shuffleOut() {
  const half1 = deck.slice(0, cards / 2);
  const half2 = deck.slice(cards / 2, cards);
  deck = [];
  
  half1.forEach((card, index) => deck.push(card, half2[index]));
}
```

The answer? **Shuffle no. 8** 😳

Goodness! I wasn't expecting it to be that low! That seems like a similar number to a pretty 'average' shuffle in my experience. Interestingly, 7 is the number the [Gilbert–Shannon–Reeds model](https://en.wikipedia.org/wiki/Gilbert%E2%80%93Shannon%E2%80%93Reeds_model) arrives at to generate a thoroughly randomised deck.

So depending on which way you shuffle a pack, you could end up with _very_ different results.

### Other noteworthy findings

With the `shuffleIn` method, we arrive at the original order in reverse on shuffle no. 26:

```js
Shuffle 26: [ 52, 51, 50, 49, 48, 47, 46, 45, ...]
```

You can even begin to see the convergent pattern as you get closer to 52, too:

```js
Shuffle 49: [ 8, 16, 24, 32, 40, 48, 3, 11, ...]
Shuffle 50: [ 4, 8, 12, 16, 20, 24, 28, 32, ... ]
Shuffle 51: [ 2, 4, 6, 8, 10, 12, 14, 16, ...]
Shuffle 52: [ 1, 2, 3, 4, 5, 6, 7, 8, ...]
```

## Shuffling arrays

Okay, onto shuffling arrays in JS. A cursory google with Bing for 'randomly sort array js' will return a bit of code a bit like this:

```js
array.sort(() => Math.random() - 0.5);
```

If we un-minify it a little, we can see what's happening:

```js
array.sort(function (a, b) {
  return Math.random() -[]() 0.5;
});
```

`array.sort()` runs a comparison function that compares two items, normally items `a` and `b`. You return a positive or negative value to indicate whether item `a` is bigger or smaller than item `b`.

But in this 'random' function, instead of using the items themselves, it calls `Math.random()`; that returns a random number between 0 and 1, say: `0.7395929326168424`. If you minus 0.5 from that, it'll be a positive, or a negative number, achieving the same result.

In theory, random. In reality, flawed.

Let's run the above in an experiment where we plot the distribution of the first card in a deck (call it the Ace of Hearts).

We'll start by constructing a deck. It's similar to before, but this time, we're going to get a fresh deck every time we call it. We'll also create a 'distribution' object with keys running from 0 - 51, all set with a starting point of 0.

```js
const deck = () => Array.from({ length: 52 }, (_, i) => i + 1);
const distribution = {};
deck().forEach((l, i) => distribution[i] = 0);
```

Next we'll pop in the shuffle function, and run it 10,000 times, plotting the `indexOf` position for card 0 every time we loop around. Finally, we'll log the results. (For the record, this is running in Node 11).

```js
const shuffle = (arr) => {
  const array = [...arr];
  array.sort(() => Math.random() - 0.5)
  return array;
}

for (let index = 0; index < 10000; index++) {
  const letters = shuffle(deck());
  distribution[letters.indexOf(1)]++;
}

console.log(distribution);
```

Okay, here goes:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 450" id="shufflePoor" data-shuffle="shufflePoor">
  <g fill="none" fill-rule="evenodd" class="distribution-group">
    <path fill="#EAEEF2" d="M0 0h740v450H0z"/>
    <path stroke="#6E6E6E" stroke-linecap="square" stroke-width="3" d="M30.5 29.5L30.066 421M710.5 421.5l-680.434-.479"/>
    <text fill="#5E616B" font-family="Avenir-Roman, Avenir" font-size="16"><tspan x="50" y="441">Card no.</tspan></text><text fill="#5E616B" font-family="Avenir-Roman, Avenir" font-size="16" transform="rotate(-90 15 312.5)"><tspan x="-73.5" y="317.5">Distribution in position 0</tspan></text>
  </g>
</svg>
<button type="button" class="button" data-target="shufflePoor">Simulate</button>

### Results

```
'0': 591,
'1': 506,
'2': 422,
'3': 405,
'4': 334,
'5': 313,
...
'45': 145,
'46': 164,
'47': 157,
'48': 144,
'49': 147,
'50': 109,
'51': 100
```

Woah there. The chances of the Ace of Hearts appearing in position 0 is **six** times more likely than it is appearing in position 51. That's a _huge_ bias!

**Sidenote**: Safari appears to have a reverse bias, in comparison to Chrome and Firefox.

To be totally honest, the only reason I even contemplated this being a problem was when I'd foolishly implemented this method of sorting on an online version of Nomination Whist I created in a spreadsheet. After playing for many weeks in lockdown, one of the players regularly seemed to pick up the Ace of Hearts when they were 'randomly' dealt cards, and this was why.

Depending on the sorting algorithm used in the browser/runtime, the items at either end of the array get compared less than those in the middle, and if the 'random' chance is effectively 50/50 (as `Math.random() - 0.5 > 0` is), there's a greater chance those items will stay nearer the ends.

To fix it, we need a better shuffle. The [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) is the one to go for, as explained [here by javascript.info](https://javascript.info/task/shuffle).

```js
const shuffle = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array;
}
```

Now when we run the test, the results are more far promising:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 450" id="shuffle" data-shuffle="shuffle">
  <g fill="none" fill-rule="evenodd" class="distribution-group">
    <path fill="#EAEEF2" d="M0 0h740v450H0z"/>
    <path stroke="#6E6E6E" stroke-linecap="square" stroke-width="3" d="M30.5 29.5L30.066 421M710.5 421.5l-680.434-.479"/>
    <text fill="#5E616B" font-family="Avenir LT, Avenir-Roman, Avenir, sans-serif" font-size="16"><tspan x="50" y="441">Card no.</tspan></text><text fill="#5E616B" font-family="Avenir LT, Avenir-Roman, Avenir, sans-serif" font-size="16" transform="rotate(-90 15 312.5)"><tspan x="-73.5" y="317.5">Distribution in position 0</tspan></text>
  </g>
</svg>
<button type="button" class="button" data-target="shuffle">Simulate</button>

### Results

```
'0': 187,
'1': 189,
'2': 174,
'3': 180,
'4': 198,
...
'46': 215,
'47': 207,
'48': 182,
'49': 171,
'50': 171,
'51': 181
```

Bingo.

<script>
(() => {
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

  const shuffles = {
    shufflePoor: (arr) => {
      const array = [...arr];
      array.sort(() => Math.random() - 0.5)
      return array;
    },

    shuffle: (arr) => {
      const array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }

      return array;
    }
  }

  const minX = 55;
  const maxX = 695;

  const minY = 400;
  const maxY = 33;

  let runningMin = 0;
  let runningMax = 1;

  const newDeck = () => Array.from({ length: 52 }, (_, i) => i);

  function plotter(svg, method) {
    const group = svg.querySelector('.distribution-group');

    const deck = Array.from({ length: 52 }, (_, i) => ({ index: i, circle: null }));
    const distribution = {};
    deck.forEach((l, i) => distribution[i] = 0);

    deck.forEach((card) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', range(0, 51, minX, maxX, card.index));
      circle.setAttribute('cy', range(runningMin, runningMax, minY, maxY, distribution[card.index]));
      circle.setAttribute('r', 5);
      circle.setAttribute('fill', '#727272');
      group.appendChild(circle);
      card.circle = circle;
    });

    return [distribution, () => plot(0, method, distribution, deck)]
  }

  function plot(i, method, distribution, deck) {
    if (i >= 1000) return;

    for (let i = 0; i < 10; i++) {
      const letters = method(newDeck());
      distribution[letters.indexOf(0)]++;
      runningMin = Math.min(...Object.values(distribution));
      runningMax = Math.max(...Object.values(distribution));

      runningMax = runningMax * 1.25;
      runningMin = runningMin * 0.5;

      deck.forEach(card => {
        card.circle.setAttribute('cy', range(runningMin, runningMax, minY, maxY, distribution[card.index]));
      })
    }

    requestAnimationFrame(() => plot(i + 1, method, distribution, deck));
  }

  Array.from(document.querySelectorAll('[data-target]')).forEach(el => {
    const svg = document.getElementById(el.getAttribute('data-target'));

    const [distribution, method] = plotter(svg, shuffles[svg.getAttribute('data-shuffle')])

    el.addEventListener('click', () => {
      newDeck().forEach((l, i) => distribution[i] = 0);
      method()
    })
  })
})();
</script>
