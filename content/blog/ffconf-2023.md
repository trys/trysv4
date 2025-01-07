---
title: 'FFConf 2023 Conference Recap'
date: 2023-11-13
categories: Web
image: /images/blog/ffconf-2023.jpg
description: A quick summary from FFConf 2023
tags:
  - FFConf
---

It was a pleasure to head back down to "sunny" (see the final photo) Brighton for the annual FFConf. This conference always feels like coming home; Remy and Julie do a top-notch organising this conference. The speakers are always fantastic, the talks are simultaneously challenging and reassuring, and the details are second to none.

![The now iconic FFConf 2023 photo from the stage, looking out at all the attendees with their hands in the air](/images/blog/ffconf-2023.jpg)

I've been fortunate enough to photograph the event for the past few years in exchange for a prime seat where I can take in all the amazing content; it's a pretty sweet deal. So I'll post a couple of photos from the day, along with a little summary of what I got from each talk. I was buzzing around the room for the beginning of each talk, so I have no doubt missed some details. Amy Hupe has written a [fabulous summary of the day](https://amyhupe.co.uk/articles/ffconf-2023/) so definitely check that out. The full album of photos is [available here](https://www.flickr.com/photos/remysharp/albums/72177720312654713).

## Session one

![Amber Shand and Maggie Appleton](/images/blog/ffconf-session-1.jpg)

### Amber Shand - Imposter syndrome, overworking, and working environments

We kicked off with a great talk from Amber tackling perfectionism, imposter syndrome and building a growth mindset. It was a great reminder of the difference between unhealthy perfectionism, and a healthy pursuit for excellence. She framed the error messages you may encounter as an opportunity for practising a growth mindset. I loved the idea that, even in the midst of a production incident caused by an individual, as peers and/or managers we can look at and log away the positive steps that person is taking to resolve it, and provide that as feedback after the dust has settled.

Amber provided a free ["Wins tracker" template](https://sage-skunk-dbd.notion.site/bb55dc78e44648aca177075c51f2a263?v=f55eb2fb86de451a8dc1d77209007d97) in Notion, which is particularly timely in this season of end of year reviews. As we go into 2024, take the time to note down all your wins, no matter how small they feel. It's not pompous; it's self-affirming and acts as a super-handy reminder when you're asked to list what you've achieved in the past year.


### Maggie Appleton - The Expanding Dark Forest and Generative AI

Maggie is an authority on all things AI so I was pumped to hear her speak at FFConf. Using the analogy of the Dark Forest theory of the universe, she talked through the startling capabilities of generative AI, particularly when agents are chained together. She then mapped out several ~~possible~~ probable future scenarios in the very near future; how the internet will soon drown in a sea of mediocre content, how we have entered the age of sharing the internet with non-humans. As the signal-to-noise ratio shifts, it will become increasingly hard to differentiate who is a human, and who is an AI, to the point where the "reverse Turing test" will come into play, with humans having to prove their humanity.

We're likely to retreat into more gated communities where human trust is easier to establish. Those privileged enough to own their own space on the internet will lean into the "cosy web", but everyone else will be even more at the mercy of the tech gatekeepers. In person events will blossom as, again, trust can be established.

But it wasn't all doom and gloom - there were some practical tips on how we can coexist with AI. Firstly, we should treat AI like animals; humans have happily coexisted with animals for millennia and we can learn how to work in harmony. The more AI is focused on doing what we can't, or struggle to do, the better this relationship will be. AI should augment our cognitive abilities, not replace them. 

## Session two

![Angela Ricci and Ire Aderinokun](/images/blog/ffconf-session-2.jpg)

### Angela Ricci - We need to talk about the front web

Angela delivered an impassioned talk on the state of the frontend on the web. She's been developing on the web since before styling was a thing, so has seen the cyclical mistakes be made time and time again. Where `bgcolor` and `<font>` previously existed, we now have the utility class effect, amounting to the same issue of separating style and content. It's just a different flavour of soup.

We need proper training for the foundational blocks of the frontend; particularly HTML and CSS, two languages we appear to despise.

HTML is wonderfully resilient, accessible, retrievable and interoperable; the web is wholly different from any other medium like it and we should cherish these characteristics and semantics. It's the foundation of the house, and if we're treating HTML as a compile target, we build on shaky ground.

### Ire Aderinokun - Web accessibility - it's not just about HTML

90% of accessibility is using HTML correctly, the other 10% is not screwing it up with CSS and JS. Ire articulated a number of do's and don'ts for CSS & JS that can break accessibility, or enhance shortcomings in the browser.

CSS shouldn't convey meaning without a semantic reflection of that meaning, eg. through the use of colour. The `content: ''` attribute is another way to inject content that's not surfaced to the accessibility tree. Ire challenged us on the use of `visibility`, suggesting there's no genuine reason to use this property when other methods exist to hide content.

I *loved* the idea of our CSS being additive, sitting atop the browser CSS and code others have written. To be additive, you must first understand what's got you to this point, which is a great mindset when picking up someone else's code.

JS should be the icing on the cake, not a cake made of icing. Use the [grain of the web](https://gomakethings.com/the-grain-of-the-web/), don't fight against it. We often think of accessibility as 'no JS for screen readers', but in reality, only 0.07% of screen readers have Javascript disabled, in comparison to the 1% of all users. People disable JS primarily for performance reasons. If your audience is particularly data-conscious, creating a fully working experience without JS would be a great investment.

## Session three

![Steven Goodwin and Ada Lovelace](/images/blog/ffconf-session-3.jpg)

### Steven Goodwin - Ada Lovelace and The Very First Computer Program

Following lunch, Steven expertly guided us through the *first ever* program, written on paper by Ada Lovelace. It was awesome to see such a seminal document handled with such respect. After breaking down the program into bite size chunks, he recreated it in JavaScript to help land the concepts.

So many concepts we take for granted today were literally invented by Ada in this paper. As well as the first program, it was the first 'bug'! A comment on line 4 didn't match up with the logic in the program itself!

### Jonathan Fielding - Embracing Neurodiversity in Tech: Building Empathy, Unveiling Strengths

Jonathan's talk was both vulnerable and highly practical. He shared his journey to an autism diagnosis, and how it's helped him understand how he interacts with the world. He then went on to break down autism, ADHD, dyslexia, dyspraxia and dyscalculia, sharing symptoms, busting myths, and suggesting ways to better support those who are neurodivergent in our workplaces.

Some tips included breaking down our tickets into smaller chunks, prefacing meetings with details on the calendar invite, supplying figures in advance of meetings, and communicating in multiple formats.

This was a detailed talk with tons of tips, so definitely check it out when the video is published in the coming weeks.

## Session four

![Ana Rodrigues and Salma Alam-Naylor](/images/blog/ffconf-session-4.jpg)

### Ana Rodrigues - Exploring the Potential of the Web Speech API in Karaoke

I've been a big fan of [Ana's website](https://ohhelloana.blog/) for many years and when I heard she was going to be hacking with the Web Speech API, I was so excited! The talk didn't disappoint!

She pitched the problem (I'm sure we all suffer with) when the song you want isn't available at Karaoke and then showed how she set about building an interface using Web Speech to capture your voice and scrub through the lyrics.

Live demo's a plenty, this was tremendous fun, and included a wonderful easter egg that I won't spoil! Even though Web Speech isn't *necessarily* something we'll use everyday, it demonstrates the power of tinkering with these browser API's, and all the things you can learn to directly help your day-to-day role in the process.

### Salma Alam-Naylor - Entertainment as Code

Following Ana's joyful talk, Salma ramped up the festivities as she explained how streaming silly coding on Twitch has transformed her career, and built a community.

She shared the myriad of tech she's created on Twitch, for Twitch, and although these (potentially) over engineered systems are "only" creating interactivity for her viewers, it once again showed how building fun projects can help us learn. It was the perfect end to the conference!

![A group shot of organising team and all the speakers speakers](/images/blog/ffconf-2023-organisers.jpg)

![The stunning Duke of Yorks cinema, the venue for FFConf](/images/blog/ffconf-2023-duke-of-yorks.jpg)

![Hail and flash floods hitting the conference as attendees were arriving!](/images/blog/ffconf-2023-flood.jpg)


