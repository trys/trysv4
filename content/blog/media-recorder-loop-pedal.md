---
title: Making a loop pedal with MediaRecorder
date: 2019-05-13
categories: Web
---

After building the [JS pedalboard](/blog/pedalboard/), I ended the launch post with an ambitious stretch goal:

> A loop pedal would also be incredible.  
> But who knows.

After a Saturday of hacking, I'm pleased to say the loop pedal is alive and working! It's all based around the fantastic, but relatively unknown `MediaRecorder` API.

{{< youtube "A-qqC3x6_Bk" >}}

{{< button "https://pedalboard.netlify.com/" >}}Try the pedalboard out for yourself!{{</ button >}}

The video also uses the new Smoosh compressor and `Math.pow()` overdrive.

---

Here's a diagram of the audio routing in the `for(loop)` pedal:

![Loop pedal routing diagram, explained below](/images/blog/loop-routing.png)

1. A loop pedal is an 'always-on' pedal, so the input is passed straight to the output.
2. It's also sent to the 'Mix in' gain node. This is for summing purposes for overdubbing.
3. `MediaRecorder` will only accept a 'stream', so we have to do a little conversion from the gain node with a `ctx.createMediaStreamDestination()`.
4. It's then passed to the `MediaRecorder`.
5. Once the recording has finished, we pass the audio into an `<audio>` tag and read the sound back out of there.
6. The audio is sent back into the 'Mix in' node, to allow us to overdub loops.
7. Finally, the audio tag is also run into a gain node, to control the output volume.

The code looks a little like this:

```js
const output = ctx.createGain();
const mixIn = ctx.createGain();
const volume = ctx.createGain();
const streamer = ctx.createMediaStreamDestination();
const recorder = new MediaRecorder(streamer.stream);
const audio = document.createElement('audio');
const audioOut = ctx.createMediaElementSource(audio);

input.connect(output);
input.connect(mixIn);
mixIn.connect(streamer);
audioOut.connect(volume);
audioOut.connect(mixIn); // Loop back around for overdubbing
volume.connect(output);
```

## Using the `MediaRecorder`

The `MediaRecorder` takes a stream and listens to it. When you call `recorder.start()`, it begins recording, and surprise, surprise, when you call `recorder.stop()`, it stops! Then, like all browser API's, it fires an event. In this case, it's `dataavailable` where it passes the audio out. That can be hooked up to an audio tag with a single line:

```js
function onDataAvailable(event) {
  audio.src = URL.createObjectURL(event.data);
  audio.play();
}
```

The initial plan was to use the `loop` attribute on the audio tag, which worked well till overdubs came into the picture.

As the audio is sent back into the 'Mix in' node, the recording part of overdubbing was surprisingly simple. But it turns out timing the dub is considerably more complicated that recording an initial loop. To simplify things, I opted to only allow overdubs over a full loop length. Once a loop is recorded, clicking the loop button again will prepare the looper for more recording, but will only trigger when the loop comes around again. When it gets to the end, the recording phase ends and we go back to playback mode. In theory, this can be done as many times as you like!

When using the `loop` attribute, the audio tag never sends an `ended` event. There is a `timeupdate` events that appears to be pretty consistent in sending an event at `0`, but I thought it better to ditch the attribute and listen to the `ended` event. Then I could immediately call `audio.play()` again. This didn't appear to make any difference to playback, it's practically instantaneous. I could then hook into the event to start/stop the recorder, and switch the 'LED' colour.

## UI

The other stretch goal was to add some animations to the pedals, and this seemed like the perfect opportunity. I've mocked the pedal to look like a little cassette deck, complete with playback heads and spinning tape! A bit of `border-radius: 100% 95%;` and infinite rotation on the tape produced a pretty neat effect.

![Emulating a little cassette deck](/images/blog/looper.gif)

In the spirit of 'always on', there is no on/off switch for this pedal, this did mean re-doing the DOM code for it. I haven't refactored the DOM code just yet though - that might come if another always-on use-case arrives.

MIDI control as a must, as seen by the video. It works in the same way as outlined in the [first post](/blog/pedalboard/#web-midi-api).

And yes, `for(loop)` was the best name I came up with! Please have a play and let me know what you think!

{{< button "https://pedalboard.netlify.com/" >}}Try the pedalboard out for yourself!{{</ button >}}
