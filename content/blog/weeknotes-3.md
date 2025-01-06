---
title: 'Weeknotes #3'
date: 2019-03-29
categories: Weeknotes
---

This week saw the end of my tenure at [daisie](https://www.daisie.com)! The main goals were:

- Add comments & advanced search to the platform
- Wrap up any loose ends
- Tick off my favourite lunch haunts for the final time

After a first pass at search on Monday morning, I set about on a big refactor of our internal Typescript interfaces. In our haste to deliver the product by the tight beta deadline, we had to work with some assumptions for the shape of the API data. These assumptions (in the form of mock data) led to a looser use of Typescript than was ideal.

The first part to untangle was the network layer. Our `Http` class was too simplistic, leading to a lot of verbose checks each use. I learned about Typescript generics, a means of passing in a return type when calling a method. It's a great way to re-use un-opinionated code, but keep it strongly typed. I wrote up my findings [here](/blog/typescript-generics/).

The next phase was to go through and write schemas for all the data coming back from the API. When combined with the `Http` changes, a bunch of opportunities for simplification arose. **The confidence of strong data contract lets you write more intentional code.** 

`Partial<Type>`, a feature we'd used heavily, also ended up being a Trojan horse for verbosity, so it was a pleasure to remove those. Finally, I could rewrite our image avatars to work far more gracefully, and enforce stronger types on the core authentication model.

We got comments into staging by the skin of our teeth after some _very odd_ back-end issues. Sadly some more _very odd_ back-end issues blocked the production release.

I hit publish on a [blog post](/blog/city-life/) reflecting about coding in the city. It took several train journeys to feel comfortable about it, and I'm not totally sure it's right, but hey ho!

My sister and I played squash, which may well turn out to be the beginning of a weekly sports activity. I've never been a big one for exercise, but I've thoroughly enjoyed playing some squash this past month. Once the first game is done and I've drowned myself in water, my body seems to cope okay for the next four or five games.

The goal of ticking off lunch highlights was completed. Savure on Monday, Backstreet burger on Tuesday, Cafe Z on Wednesday, and Pizza (sadly not Homeslice) on Thursday! I also had far too many chai latte's at Taylor Street Coffee, a place that I will wholeheartedly miss. I wonder if Brighton has any decent coffee... 😉

An arbitrary but fun achievement was hitting [100k lines](https://twitter.com/trysmudford/status/1111232970071904258) added to the frontend repo. Thanks to Olivia for surfacing so many stats!

![100k lines added, 55k removed, 1350 pull requests](/images/blog/weeknotes-3-4.png)

My final day at daisie was bizarre. I didn't feel anywhere near as emotional as when I left Tomango, but then again, 6 years vs. 6 months should elicit a different response. Regardless, it was still strange clocking out from Clifton Street for the final time. The whole team made a big old embarrassing fuss of me before we grabbed leaving drinks. I wish them all the best in the run-up to launch, and can't wait to see how the platform evolves.

So, for my next challenge... I'm joining; and I still can't quite believe I get to write this, [Clearleft](https://clearleft.com) as Senior Front-end Developer 🎉

More on that next week!

## Songs from the week

- [Deep Burn Blue - The Paper Kites](https://open.spotify.com/track/0ySZOAaEFX3NxykNIsFsEO) - Thank you Spotify suggestions, this is right up my street
- [Bud (Rose) - Rosie Carney](https://open.spotify.com/track/1gfzgfcrmkn2yTWuVGhCgh)
- [Ocean Wide, Canyon Deep - Jacob Collier ft MARO](https://www.youtube.com/watch?v=BzjIoRFB8r0)

## Photos from the week

I went on a photography trip to Standen with a friend last Saturday. It was a little grey, but the flowers suggest spring is just around the corner.

![Flowers blooming in brilliant yellow](/images/blog/weeknotes-3-1.jpg)

![A mossy bench](/images/blog/weeknotes-3-2.jpg)

There are always buildings going up in London

![Reflection of a crane in a skyscraper](/images/blog/weeknotes-3-3.jpg)

A stunning Friday in Sussex

![Walk Wood at Sheffield Park](/images/blog/weeknotes-3-6.jpg)

![Daffodils out in bloom at Sheffield Park](/images/blog/weeknotes-3-5.jpg)

