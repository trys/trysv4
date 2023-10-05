---
title: 'Shortcuts for comparing/overlaying against Figma designs'
description: 'Keyboard shortcuts to help you get closer to pixel perfection'
date: 2023-10-05
categories: Web
---

Pixel perfection is a myth. Now we've got that out the way, let's carry on.

Well, first, we know [the ideal viewport doesn't exist](https://viewports.fyi/), and chasing absolute pixel accuracy is a fool's errand, but that doesn't stop us from trying to get pretty darn close. For me, the reasons are twofold.

Firstly, I take personal pride in getting as close as I ~~possibly~~ reasonably can. Call me weird, but I get such a rush delivering a dynamic component that's impossible to distinguish its static counterpart in Figma. Oh boy, do I love it.

Secondly, and *way* more importantly, I believe designers make hundreds of micro-decisions based on their wealth of experience and considerably better creative brains than me, and they make these choices for a reason. _That's_ why I take pride in nailing their work, because their work deserves to be done justice.

So in that light, there are a few shortcuts that have become muscle memory for me when overlaying my work on top designer's work in Figma/Mac OS (Sorry, Sketch/Windows, I'm sure there are similar shortcuts).

## Preparing your artboards

In bigger organisations, you're unlikely to have write-access to a Figma file as a developer. Things have improved for extraction with their new 'dev-mode', but it doesn't help this use-case where we need to _add_ to the file. But regardless of whether you have write-access or not, I *highly recommend* copying the frame/artboard you'd like to compare against into a brand new draft folder before doing anything else. The last thing you want is to accidentally move something, or worse, delete someone else's hard work.

So, click on an artboard, hit `Cmd + C`, then `Cmd + N` to create a new Figma draft. Finally, `Cmd + V` to paste the artboard into the new file.

## Overlaying your work

So, the main command you'll want to commit to memory is: `Cmd + Ctrl + Shift + 4`. This hand contortion of a command brings up a little crosshair cursor and allows you to select a portion of your screen/website/component. The `Ctrl` key is the important one as it copies said section	to your clipboard, rather than saving it to your hard drive.

Now you can head back to Figma and hit `Cmd + V` again. Next, hit the number `5` - this will drop the opacity of your selection to 50%. Finally, drag the selection over the top of the design and bask in the glory of how great a job you've done / go back to your codebase and tweak your CSS some more (delete as appropriate).

Bonus tip - you'll also find `Shift + Arrow Keys` to be very helpful when nudging your selection around. Pop all this together with some judicious use of `Alt + Tab` and you'll be flying around your screen in no time.

{{< alert "Note" >}}
Note: Auto Layout can provide some challenges when dragging a screenshot onto a design, so either drag it to the side and use the aforementioned `Shift + Arrow Keys` to get it into place, or let it drop into an Auto Layout frame, and then press the [Absolute position](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#h_01G2RPRBBKVKXK0JV59NCSKEE0) button next to the `Y` coordinate input.
{{</ alert >}}
