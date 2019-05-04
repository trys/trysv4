---
title: Building a JavaScript guitar pedalboard
date: 2019-05-04
categories: Web
draft: true
---

I've just launched a new side project, in the form of a [JS guitar pedalboard](https://pedalboard.netlify.com/). It's a handy crossover of my coding and guitaring hobbies.

{{< youtube "OJVmZ7hbVPQ" >}}

---

This isn't my first foray into Web Audio API, I took a stab at a [synthesizer](https://github.com/trys/Synth) back in 2015 but never quite finished it. Maybe I should've bought a domain, that might've been the problem... 🤔

The original intention for the project was to build a delay pedal, but after a Wednesday evening of hackery, I had a working prototype with mix, speed, feedback and tone controls. My mind started to wander, and before long, I had visions of a whole pedalboard!

Each pedal had to have a fun code-y name. For some of them it was a case of pun-driven development, where the name decided which pedal to build next.

- [Delay](/blog/pedalboard/#delay): **`setTimeout`**
- [Tremolo](/blog/pedalboard/#tremolo): **`<blink />`**
- [Chorus](/blog/pedalboard/#chorus): **`float`**
- [Boost](/blog/pedalboard/#boost): **`!important`**
- [Reverb](/blog/pedalboard/#reverb): **`spacer.gif`**
- [Wah Wah](/blog/pedalboard/#wah-wah): **`.filter()`**

## Delay

Delay was a fun starting point; the API has a [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode) that takes a stream and delays it be a specified number of seconds. This delays the whole signal, which at first glance isn't ideal. The trick is to split the signal, sending one side straight to the ouput and the other two a filter node. This filter is the tone control for the delay repeats, giving the impression of a darker analogue delay, or a crisper digital version.

Next it heads to the delay node, which does what is says on the tin. Then to the feedback gain stage, this is crucial for the next step, which is to connect the stream **back** into itself. Audio recursion! This is how we get multiple, controllable repeats of lowering volume. Without the feedback gain stage, the delay would get into a real life feedback loop, creating some crazy sounds. Finally, the stream also goes to the final gain node, and off to the output. This acts as the mix control on the the pedal. Here's a diagram of the pedal:

![Delay flowchart](/images/blog/flowchart.jpg)

And here's the code:

```js
const filter = ctx.createBiquadFilter();
const delay = ctx.createDelay(defaults.maxDelay);
const feedback = ctx.createGain();
const delayGain = ctx.createGain();
const output = ctx.createGain();

input.connect(output);
input.connect(filter);
filter.connect(delay);
delay.connect(feedback);
feedback.connect(delay);
feedback.connect(delayGain);
delayGain.connect(output);
```

It's all very "[leg bone's connected to the hip bone](https://www.youtube.com/watch?v=mVoPG9HtYF8)", which I absolutely love. It's a brilliantly designed API; very practical, intuitive, and extensive. The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) are also fantastic.

## Tremolo

Tremolo was the next candidate. It uses the [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) to modulate the amplitude (volume/gain) of the input signal. The most challenging part was the depth control. Again, the key was to split the signal in two, and control the dry/wet signals in inverse quantities. The dry path stayed unaltered, whereas the wet path had the modulated gain node attached. As you mix more wet signal in, you reduce the amount of dry. This give a less intense sound without increasing the overall volume.

## Chorus

Chorus was tricky, and to be honest, it's the one I'm least happy with. Dan from [That Pedal Show](https://www.youtube.com/watch?v=ni0RtQWWpig) explained the concept of Chorus/Flanging, but I really struggled to emulate it. Modulating the delay time never quite got the right sound, and I ended up using `requestAnimationFrame` as the `OscillatorNode` was too aggressive. This is definitely one to refactor and prototype a little more, it could be a great effect and would tick off flanging too.

## Boost

Boost was nice and simple, a single gain node, nothing more. Lovely stuff.

## Reverb

Reverb was so cool! It uses the `ConvolverNode` which samples another audio source (an impulse) and works out the shape of the sound, making it reproducable. Some kind chap has created a whole host of [free impulses](https://www.voxengo.com/impulses/) to use, I opted for the 'Conic Long Echo Hall' to get a nice large reverb. Wiring it up was surprisingly straightforward for what seems likes a complex effect:

```js
const reverb = ctx.createConvolver();
let buffer = null;
await fetch('/assets/Conic Long Echo Hall.wav')
  .then(response => response.arrayBuffer())
  .then(data => {
    ctx.decodeAudioData(data, buffer => {
      reverb.buffer = buffer;
    });
  });
```

The final piece of the puzzle was a mix control, created in the same way as the tremolo depth control. I was particularly proud of **spacer.gif** too!

## Wah Wah

[Tim](https://www.novis.co/) suggested a Wah pedal after I filled him in on the project. I was pretty happy with the outcome, but it's definitely not as pronounced an effect as I would like. It uses the [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) in `bandpass` mode. There's an aggressive Q, and maximum attenuation, but it still sounds quite subtle. I started off with an 'autowah' approach, using another `requestAnimationFrame` loop, but nothing beats hooking up a real expression pedal. 🥁

### Web MIDI API

This is an equally lovely web API. I'm mostly using very light touches, but it's a very powerful way to get tactile and tangible hardware interacting with your website. Connecting to MIDI devices is a nice one-liner promise, returning an array of inputs and outputs. We loop the inputs and attach our event listener.

```js
try {
  const midiCtx = await navigator.requestMIDIAccess();

  midiCtx.inputs.forEach(entry => {
    entry.onmidimessage = onMidiMessage;
  });
} catch (e) {
  console.log('No midi connectivity');
}
```

The handler is pretty low key too. We listen for the two appropriate codes; 144 and 176, and dispatch custom events onto the window with the data sent to us.

```js
const onMidiMessage = ({ data }) => {
  if (data[0] === 144) {
    window.dispatchEvent(new CustomEvent('MIDI', {
      detail: data[1]
    }));
  }

  if (data[0] === 176) {
    window.dispatchEvent(new CustomEvent('MIDIEXP', {
      detail: data[2]
    }));
  }
};
```

**144** is the 'Note On' message. I use the wonderful [Looptimus](https://loopcommunity.com/en-us/looptimus) controller, that sends out digits according to which pedal is pressed, which in turn, we can use to turn the JS pedals on and off!

```js
window.addEventListener('MIDI', ({ detail }) => {
  if (detail === pedalIndex) {
    togglePedal();
  }
});
```

**176** is the 'Control change' event which fires every time the expression pedal is moved. It runs from 0 to 127, so we can [invlerp, then lerp](/blog/linear-interpolation/) to squash and stretch the values from one data size to another.

```js
window.addEventListener('MIDIEXP', ({ detail }) => {
  const decimal = invlerp(0, 127, detail);
  const value = lerp(filterMin, filterMax, decimal);
  filter.frequency.value = value;
});
```

This hands-off MIDI approach also keeps the rotary knobs working and adds expression pedal control as a form of progressive enhancement.

## Creating the UI

[![The pedalboard](/images/blog/pedals.png)](https://pedalboard.netlify.com/)
