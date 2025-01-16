---
title: 'Weeknotes #15'
year: 2019
date: 2019-06-21
categories: Weeknotes
---

It's been a productive week of knuckling down with the work project.

After a pretty nondescript Monday of general office admin, I was able to spend the remainder of the week making solid progress on the site build. It's now hooked up to ElasticSearch and the live API, pulling in products and filtering to great effect.

There's been a temptation to prematurely abstract various features, and it's been a worthwhile task weighing them up to see which are worth pursuing.

In code and design, I think there's a knack to spotting the difference between things that _look_ similar, and things that are similar. You get it a lot in CSS. Three things may share the same value, but that doesn't mean they will always do so, and in that case, grouping them keeps them tightly coupled. It's a similar thing with the data fetching for these product filters. On the surface they look similar: pick one or more values from a list of things and send the UUID's off to the API. But each one has intricacies and requirements that may mean a level of duplication is actually preferable. It's a bit of a tightrope walk, but a fun one.

In other news, I ran a guitar workshop for the church band, played another three games of squash (and a rogue game of table tennis), and started reading "How to make sense of any mess". My blog is getting unwieldy. It was only when talking through the category situation with [Hana](https://twitter.com/hana_stevenson) at Homebrew website club, that it became clear how much of a mess it has become. Hopefully this book will help shine a light!
