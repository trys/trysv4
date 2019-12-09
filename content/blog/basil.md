---
title: 'Basil: Secret Santa as a Service'
date: 2019-12-09
categories: Web
---

I recently launched [basil.christmas](https://basil.christmas/), a 'Secret Santa as a service'. Basil has two modes. The first is a traditional list generator, letting you shuffle the participants and print of a nice, foldable list of names. The second is a little more involved. A 'head elf' from your company can sign up and enter all participant names into the system. Basil will email everyone, letting them know who their giftee is.

But that's only the beginning. We've all been there; you start in a new company and you get assigned the one person you've never spoken to. This is where Basil steps in. In each email, there's a unique link that, when clicked, anonymously emails the giftee, asking for a little nudge in the right direction. They can respond, all without knowing who has asked for help! Basil-based encryption!

The legend of 'Basil' started many moons ago at Clearleft, where a certain individual embodied the elvish role, and emailed each person in the team; acting as the encryption go-between. This worked great, but meant that individual knew all the Secret Santarers. It sounded to me like an opportunity for tech!

To be honest, it's a bit of a silly side project, but there's always ample opportunity for learning on websites like this. With no client restraints or budgets to consider, a side project is a great opportunity to try out new technologies and push ones design chops.

## The stack

**Vue.js** is my go-to framework. When set up with **Nuxt.js**, I find it really quick and empowering to build in. Rather than spin up a Node.js server, I opted to use the `generate` mode, and host the site on **Netlify**. It gives me CDN hosting and a great devops experience with zero configuration.

The database & backend layer was an interesting choice, and where I focused my learning efforts. I opted for an avant-garde option in **Airtable** + **Netlify Functions**. Airtable is a lovechild of a spreadsheet and a database. Columns are typed and rows can be linked, so it's possible to run it as a relational database. It has a very sensible API (and incredible live API docs). I used Airtable for our [signature generator](https://www.trysmudford.com/blog/rapid-building/), but rather than use the HTTP REST API, this time I went for the `npm`. Again, another learning opportunity.

The module still uses callbacks, so there was a bit of 'promisification' required to get it work nicely with `async/await`.

```js
exports.updateElf = (rowId, payload = {}) => {
  return new Promise((resolve, reject) => {
    base('Elves').update(rowId, payload, function(err) {
      err ? reject(Errors.Generic) : resolve();
    });
  });
};
```

Netlify Functions are 'serverless lambda functions' that run as individual backends. When called, they spin up and make calls to the Airtable database. All API authentication is handled with environment variables stored on Netlify, so when developed with [Netlify Dev](https://www.netlify.com/products/dev/), all your security is handled for you.

Emails were handled by **Mailgun**. The biggest hurdle was getting the first email to send. Their documentation doesn't currently mention a different API URL for EU domains. As soon as I found [this stackoverflow answer](https://stackoverflow.com/a/52562241/2233707), I was away.

## Classic form POSTs

Rather than use AJAX and JSON requests, I ended up going old school and use form POSTs and redirects for the data exchange. This meant I could start from a base of solid HTML, without worrying about requests from JavaScript. It might not be quite as seamless having full page refreshes, but given most users will only see one form in the whole flow, it doesn't harm the experience.

Deciding when to add complexity, and when to hold back, is another skill that's worth honing. So regularly do we reach for the shiny tool, when the slightly dusty one will do just fine.

Even in modern tools, like Vue.js, there's still plenty of power in the humble `<form>` and 302 redirect.

## Design

> I'm not a designer, but I do love Christmas

With those credentials out the way, I decided to have a crack at designing this site. [Creative Market](https://creativemarket.com/) was my biggest friend on this project. There are so many über talented individuals on that platform. As soon as I stumbled upon these creatures, I fell in love.

![](/images/blog/characters.jpg)

The colour scheme and typography had to be suitably festive for such a project. **Zeichen**, and **DM Sans** provided a nice mix of conversational 'basil tone' and readable prose. A contrasting scheme of pink and dark blue, combined with lashings of noise, and topped with some wonderful snowflakes (created by Cassie), let to a suitably seasonable creation.

![](/images/blog/scheme.jpg)

The initial design direction was decided in Sketch, but I quickly moved to the browser to roll it out. Working in Vue.js components, I was able to swiftly build out the various form-based pages with great ease.

## Error codes

Deciding on an error structure is easily overlooked. As this project used redirects, rather than `JSON` responses, it was important to establish a format that could be interpreted by the frontend.

I came up with an 'enum' of possible error codes and shared it between the front- and backend. If the serverless function ever caught an error, it redirected the user to `/error/${ErrorCode}/` where Nuxt rendered the appropriate message to the user. This was also an opportunity to play around with Basil's tone of voice.

```js
{
  TokenExpired: 'My dearest elf, it\'s time to log in again',
  AlreadyContacted: 'Have patience, child. You\'ve already contacted that elf!',
  FarTooMany: 'Humble apologies, you\'ve hit your elvish quota!'
}
```

## Planning for 'appropriate scale'

Basil was never going to take over the internet, but there was a chance a few others may like to use it. Rather than build it just for our internal use at Clearleft, I made sure the schema was set up to allow multiple groups to use the system. This did mean the added complication of putting in an authentication system, but that in itself was an opportunity to build a password-less authentication flow for the first time.

There was no need to [prepare for greater scale](https://twitter.com/dhh/status/1201992702860107776) than that. I think we've all been burned in the past worrying about whether the stack will cope with X users, with not basis for whether any users will arrive. More and more, I'm realising that building for myself, keeping in mind not to be exclusionary, nor paint myself into a corner, is the best bet for web things.

## Give it a go!

If you're in the market for a Secret Santa generator, managed or otherwise, please feel free to give Basil a whirl!

{{< button "https://basil.christmas" >}}Visit Basil{{</ button >}}
