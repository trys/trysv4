---
title: 'SofaConf 2020 - a technical write-up'
date: 2020-05-06
description: We've just launched SofaConf and you should come along!
categories: Web
---

We've just launched [2020.sofaconf.com](https://2020.sofaconf.com) and you should definitely come along! The tickets are _incredibly_ reasonable for a one day conference, let alone a 🎉 **FIVE DAY** 🎉 conference, with an amazing roster of speakers!

We build a good number of event sites at [Clearleft](https://clearleft.com/), including: [dConstruct](https://2020.dconstruct.org/) (we all remember [this absolute peach 🍑](https://2015.dconstruct.org/)), [UXLondon](https://2020.uxlondon.com/), [Leading Design](https://leadingdesign.com/), and [Ampersand](https://2018.ampersandconf.com/). Each has its own personality, intricacies and challenges.

## Choosing a backend stack

With just eight weeks to go till the conference, we discussed how we would build this site. Our usual go-to is [CraftCMS](https://craftcms.com/). We have a pretty well-oiled setup for deploying PHP sites (yeah, PHP still works in 2020, crazy-right). It works well, and we're pretty snappy at building with it.

There is a downside though. With the content and frontend tied together, we end up blocking the fantastic content writers until we've done our job, which often leads to a frantic few days for them before launch.

We therefore wanted to separate the two elements. Headless CMS's are very much a solved problem, and after a recent round of [thorough research](https://clearleft.com/posts/prioritising-requirements) on CMS options, we had a good idea of what was out there. But for all the brilliant features and options offered by [Contentful](https://www.contentful.com/) & [Prismic](https://prismic.io/), there was one more attribute to consider. 

**Familiarity**.

CraftCMS can output HTML, but it can also output JSON. We can stick to the CMS our team is familiar with, but consume the content in a totally different, modern codebase!

**However, there is a trade-off here**. We've doubled the number of systems we need for every conference. When the next event comes around, we're going to have to host a PHP site AND a separate frontend.

The solution? Write a generic multisite event system atop CraftCMS, allowing future event CMS's to be created in the click of a button, without any code! Decision made at 10am.

{{< small >}}Sidenote, time was <em>incredibly</em> tight on this project, but we were ambitious and driven to get this right. A herculian amount of effort was put in by the whole team to pull this off, and it was an honour working with them.{{</ small >}}

[Sophia](https://clearleft.com/about/team/sophia-hill) and I spent a few hours mapping out the entities and endpoints required for the system. With her wealth of events knowledge and my ruthless determinism to make things as generic as possible, we landed on a list of models & fields to create.

![Entity Mapping](/images/blog/entity-mapping.jpg)

Every event has tickets, a schedule (usually over several days), talks/workshops, people (speakers / MC's / curators), 'hygiene pages', and general conference settings. So starting with that as the basis, I created a new multisite Craft instance and began building the CMS.

Craft does have a GraphQL API, but there's nothing wrong with a classic bit of JSON. The [element API](https://github.com/craftcms/element-api) works really nicely and we could build custom endpoints very quickly. By the afternoon of day one, we had speakers and schedules into the CMS, and exposed on two endpoints.

The [project config](https://docs.craftcms.com/v3/project-config.html) file was a lifesaver for this project. It gave us 'migrations through commits' and proved incredibly useful for deploying changes without interruption over the past week.

We deployed the CMS and handed the keys over to the events team to begin   adding content - in record time.

## Choosing a frontend stack

As big fans of the [principle of least power](https://adactio.com/journal/14327), it was essential we had a solid base of HTML for the site. So the choices were:

- Server render (like PHP) - given we'd stepped away from Craft for the frontend, this seemed like a backwards step. It also exposed the API as a point of failure, something I wanted to avoid
- SSR (like Next/Nuxt) - we'd need a Node environment, and again, point of failure
- Pre-rendered/JAMstack (like Gatsby/Eleventy/Hugo) - this seemed to tick all the boxes

Of the pre-rendered options there was really only one contender. Gatsby arrives with a gigatonne of unnecessary JS for a site like this. Hugo sadly can't create pages from data files. So we opted for the coolest kid in the class right now, [Eleventy](https://www.11ty.dev/) 🕶

This was my first Eleventy build; so eager to try, I used the remainder of day one to consume the two new JSON feeds. In a `_data` folder, I created a file called `speakers.js` and wrote a fetch call to the API.

```js
/* _data/speakers.js */

const fetch = require('../_utilities/content');

module.exports = async function () {
  try {
    return fetch('speakers').then(({ data }) => data);
  } catch (e) {
    return [];
  }
};
```

And a wrapper around `node-fetch`

```js
/* _utilities/content.js */

const fetch = require('node-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const API = process.env.API || 'https://events.local';
const CONF = process.env.CONF || 'sofaconf2020';

module.exports = function (path, query = '') {
  return fetch(`${API}/${CONF}/${path}.json${query}`, {
    agent: httpsAgent,
  }).then((x) => x.json());
};
```

Next, I created a file called `speakers-pages.njk` as per the [create pages from data](https://www.11ty.dev/docs/pages-from-data/) documentation.

```
---
layout: layouts/base.njk
pagination:
  data: speakers
  size: 1
  alias: speaker
permalink: 'speakers/{{ speaker.slug }}/'
---

<div class="flow">
  <h1>{{ speaker.title }}</h1>
  <p>{{ speaker.role }}</p>
  <a href="{{ speaker.companyWebsite }}">{{ speaker.company }}</a>
  {{ speaker.bio | safe }}
</div>
```

I visited `/speakers/andy-budd`, and hey presto, we had a basic speakers page! From that we fleshed out the structure of the site for the data-generated pages (hygiene pages, schedule and speakers), and single pages (tickets, home, venue). After a day of hard work, we had a skeleton site ready and a CMS, all while the design was still in the infancy.

The next day, I made a start on the [utopia](https://utopia.fyi/) implementation and design tokens, then cracked on with a first pass at the speakers grid.

![Speakers grid](/images/blog/speakers-grid.jpg)

Eleventy exposes the fetched API data as a global variable, so looping the speakers into a grid was as succinct as:

```html
<div class="speakers-grid">
  {% for speaker in speakers %}
    {% include '_includes/components/speaker-preview.njk' %}
  {% endfor %}
</div>
```

Blobby masks are all the rage right now, but I'd not created one before. However, my learned colleague and friend, [Cassie](https://twitter.com/cassiecodes) had just built a client site that was oh-so-blobby! Using a `@supports` query, we can serve a circular image to browsers that don't support masks, and enhance up for the ones that do!

```css
.speaker-preview img {
  border-radius: 100%;
}

@supports (clip-path: url(#speakerMask)) {
  .speaker-preview img {
    clip-path: url(#speakerMask);
    -webkit-clip-path: url(#speakerMask);
    border-radius: 20px;
  }
}
```

Soon after this point, I was seconded back to a client project, and I handed the frontend over to Cassie. Thanks to the decoupled site & CMS, she focussed on absolutely nailing the frontend with mocked data. I then spent the first hour of each day adding and tweaking endpoints as required. It was a great way to play to our strengths and use our time wisely to get this site ready as soon as possible.

## Deployments & collaboration

Rather than rely on an API & database for every page load, a JAMstack site gathers up the content at build time. So we needed a way to trigger a build of the site. [Netlify](https://www.netlify.com/); our host for this project, allows you to trigger a build via a `POST` to a webhook - a unique URL to your project. Ideally we'd add a button to do this within Craft, but given the very tight timeframes and MVP mindset, we went for a Slack integration.

![Build Hooks on Slack](/images/blog/build-hook.png)

You can set up Slack integrations with zero code through their website. When Slack sees the words `launch-sofaconf` in our internal channel, it fires a `POST` to Netlify, which rebuilds and deploys the site. 25 seconds later, the site is live! A button is _probably_ more useful, but there's something really fun seeing your colleagues tweaking the site and making deployments!

![Build Hooks triggered on Slack](/images/blog/build-hook-2.png)

As well as getting the CMS live quickly, we deployed the frontend almost immediately, allowing us to collaborate:

- We adapted the frontend during the build as the live content arrived
- There was no 'big reveal' or surprises, as everyone involved could see the latest version of the site
- We could deploy CMS changes without disrupting the team or imposing content freezes.

### Added bonus

Finally, Eleventy and Netlify made it incredibly straightforward to max out Lighthouse.

![Lighthouse](/images/blog/lighthouse.png)
