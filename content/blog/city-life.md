---
title: City life
date: 2019-03-25
categories: Web
draft: true
---

As my final days at daisie draw to a close, I've been reflecting the lessons I've learned, the people I've met, and the opinions I've encountered.

Prior to joining the startup, I earned my spurs at Tomango, a creative agency in Sussex, and when I say in Sussex, I mean in the middle-of-a-field Sussex. It was an iddylic location, about as far from a city as you could get. There were no ammenities, no shops, no fancy coffee joints and certainly no Deliveroo.

I anticipated, and looked forward to the inevitable culture shock of coming to the ciy after 6 seemingly sheltered years in the field. But I, in hindsight naïvely, didn't expect some of the different approaches, values and career paths that the 'city team' had. It's been eye-opening and very interesting hearing their stories, weighing them and learning from them.

The other day, Jake Archibald posted a fascinating comparison of [F1 team's web performance](https://jakearchibald.com/2019/f1-perf/), two subjects very dear to my heart. But it was the final thoughts that struck me:

> None of the teams used any of the big modern frameworks. They're mostly Wordpress & Drupal, with a lot of jQuery. It makes me feel like I've been in a bubble in terms of the technologies that make up the bulk of the web.

oooph. Nail on the head.

It reminded my of an encounter in my first week or so at daisie. I was chatting to one of the team about my previous role. _"I built two websites a month in WordPress"_.

They laughed... _"WordPress! Who uses that anymore?!"_

[Nearly a third of the web](https://venturebeat.com/2018/03/05/wordpress-now-powers-30-of-websites/) as it turns out.

I may be jumping to conclusions from a dataset of two points, but I feel like the web built in the city, is very different to web outside. Or perhaps, the web built in 'city-sized' companies is different to 'village-sized companies'. The [Wealthy Western Web](https://www.smashingmagazine.com/2017/03/world-wide-web-not-wealthy-western-web-part-1/) is very much alive in Shoreditch.

## Products & apps, not websites

Perhaps this disparity stems from the unhelpfully vague term 'web app'? When you move from an agency building for small/medium businesses, there's rarely a dispute that you're building a website. Even if they use the site as a 'business-critical system', it's still a website.

But since crossing the M25, the term web app has been floated around much more readily. _"We're building a product, a web app"_. Maybe it's a justification for funding, or a personal/corporate brand thing, but 'website' doesn't appear to cut the mustard in London. Once business-logic crosses an undocumented threshold, our sites become apps. And I believe that's bad...

> 'Web app' covers a multitude of sins.

Not only does the differentiation of terms create a divide within the industry, the term 'web app' acts as an excuse for corner cutting and exclusion.

The phrase 'You can't build Gmail without JavaScript' is usually pretty quick off the lips of the web app aficionado. Not only is that statement false (I wholeheartedly believe you could), it misses that point that I'm not building Gmail, and neither are you.

Tim and I recently mulled over our work and independently came to the same conclusion. **Not all of the app/site needs to be controlled by JavaScript.** When you dive into the framework pool, the natural, and most documented step is to write it all in the framework. But in reality, we both felt that there was only two sections of the site that truly benefitted from a React implementation. The remaining majority could've been achieved with a static or server-rendered build.

We kid ourselves into thinking we're building a groundbreakingly complex system that requires complex tools, but in reality, much of what we build is a way to render a list of things, and the way to render a single thing. Here are some users, here is a user. Here are your contacts, here are your messages with that contact. There ain't much more to it than that.

This 'product' attidude can also lead to the opinion that accessing a production database is sacrilege (correct), but creating a near-matching tracking database is perfectly fine (not so correct).

## Team size

Team size could be a factor in the divide between city and rural development. Businesses in cities tend to be vast and distributed. Employees will usually have a specific role, and will be in a large team of colleagues doing similar or similarly niche roles. Everyone has their place and sticks to it, to keep the company running efficiently.

Not only will the field of vision be narrow, but the number of project touchpoints will probably be limited. Big companies are like big ships, they aren't all that agile and take time to react to change. New sites will come about far less frequently for those in a big company.

That large team can easily exist in a bubble, much like the bubble that Jake described. So it's not a surprise when the question: _"WordPress! Who uses that anymore?!"_ gets asked. The underlying motive is often _"We haven't used WordPress in years, therefore no-one has used WordPress in years"_.

## In closing

It's certainly been fascinating working in the startup world this past six months. I've learned a huge amount about prioritising, MVP's and iteration. I've also learned that rural developer and city developers, while different in many ways, are very similarly skilled. Making the leap from Sussex to London was daunting, I thought that I'd be outskilled by the big company developers who regularly have the loudest voices online. But to my delight, that's not been the case. We're all building for the same platform, and I guess it's a testament to the web that it can flourish for both city and rural developers alike.
