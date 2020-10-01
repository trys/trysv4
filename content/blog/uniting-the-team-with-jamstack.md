---
title: Uniting the team with Jamstack
date: 2020-10-01
categories: Web
description: Video, slides and transcript from my conference talk on Jamstack, teams and requirement gathering
image: /images/blog/uniting-thumbnail.jpg
---

I had the wonderful opportunity to speak at GIDS Web live, and talk about how you can use a Jamstack project to unite a team. The slides are [available here](https://noti.st/trys/JskKCk/uniting-the-team-with-jamstack), and below is the subtitled video and a full transcript of that talk.

{{< youtube dA6khbpVR04 >}}

---

Hi there, I'm Trys - I’m a frontend developer at Clearleft where we help design leaders get the most from their products & teams, through work as an agency, and through our events.

I’m going to talk today about how we went from a blank sheet of paper, to a multisite headless CMS, and a hyper-performant and accessible site in just a number of days. I’ll also touch on how developers can communicate better with stakeholders and the content team, and use a web project as an agent for change in an organisation.

Like all good stories, ours starts with a meeting. Thanks to COVID-19, our portfolio of physical events had to be postponed. But like with this conference, an opportunity arose. Clearleft decided to organise our first virtual conference: SofaConf an ambitious 5-day, affordable online event covering topics such as Service Design, Product Strategy, and Research. And we had 8 weeks to bring it all together.

It was 9am and we gathered online to kickoff the project. With no more than a name, we began discussing what we'd need to pull it off. Firstly, we'd need a website.

Event websites are a speciality for us. Having organised events for the past 15 years, we've built more than our fair-share of them. But lately, most new sites have been created as annual editions on top of established platforms. The ‘2020’ edition...

This project was different, a totally new prospect with no foundations, starting points, or leg-ups to help us along. Or no baggage or constraints, depending on how you look at it.

See, it's rare to have a project where all bets are off and you have total freedom. When they come along, grab them. Developers tend to be known as the 'no' brigade, the ones that come to a meeting to pour cold water on the ideas of others, saying it's "too complicated" or "will take too long".

Come at a project meeting with an attitude of experimentation, enthusiasm, and excitement. Listen out for those moments where you, as a developer can add real value.

The big issue we had for SofaConf was time. It was one of those, 'if we could launch this, like yesterday that would be great' sorts of meetings. We discussed just building a hardcoded site in classic HTML just to get it out the door quickly, then retro-fit a CMS later on. And that is a decent option if you're really strapped for time, but: strangely

> It’s often easier to get time for a new build, than it is to get time to pay back technical debt.

Once something’s launched, unless it's causing major problems it tends to get forgotten about.

Our standard 'stack' for an event site is CraftCMS; a PHP, server-rendered content management system, but it has a big downside. With the CMS and frontend tightly coupled, we end up blocking the content team until we’ve done our job building the whole site, which often leads to a frantic few days for them just before launch.

We had a long term plan to create a centralised, headless CMS that would speed up development and remove this blocker for our colleagues, but finding time for it wasn't really a priority. As I said, unless it's broken, things get left alone.

But as a frontend development team, we didn’t abandon that plan. We had a vision for this project, and when the opportunity arose, we took it.

Why? Because **making the lives of your colleagues easier is a massive and often overlooked incentive**. We work on a global web where we have **no real idea** if we're hitting the mark with the things we create. How cool is it that we can remove pain-points from our peers with an immediate feedback loop!

We’re primarily a frontend development team at Clearleft, so why would we care about building a Headless CMS to begin with? As counter-intuitive as working on a backend project was, in the long term, building a more complex CMS once freed us frontenders up to work on the things we actually love doing.
 
So despite the ridiculous timeframe, and the sheer amount of work building SofaConf and this generic events system would take, this opportunity was just too good to miss. But which stack…?

Tech stack choice impacts the business. You need to be confident that a decision isn't based on the 'shiny shiny', but on objective truths that make sense for your organisation.

Changing everything is a **huge** risk to a business, and you might be in that situation where suggesting a wholesale shift to a new stack will be met with stubborn retorts. I know that feeling, I spent 6 years in a WordPress-only design studio. We were comfortable and pretty effective at building bespoke WordPress themes, but it meant we were blinded to other better options.


And along with other obvious wins like increased performance, less downtime, cheaper hosting, change a stack also has the ability to unite a team.

> Change is your secret fuel. People want to be part of change... Teams gather around ideas that will change things.

As a developer taking time out to attend this conference, I have no doubt you want to try the latest and greatest technologies, and use them responsibly. So I have some tips for bringing the rest of the organisation along with you:

## 1. Try the tech out first

Side projects or internal projects are a brilliant place to try out new tech before putting it into production with a paying client or your own company. Use them as a way of dipping your toe into the water, seeing what works and more importantly what doesn't. Side projects give you confidence to step up and put forward a bolder solution when it matters.

## 2. Prototype

Jumping straight into a new build is risky, so use prototypes as a way of breaking down the problem before you commit to it. Write throwaway code that answers any gut-check fears you may have. It doesn't have to be a full end-to-end solution, just enough to get you to a point of being confident that you can deliver the whole thing.

## 3. Do your research

Unfortunately, gathering requirements is a whole separate talk, but I've written a blog post on the subject should you wish to find out more. To summarise: I start by gathering the whole team: designers, stakeholders, marketers, developers, and we work out our non-functional requirements (ie. how the system should work) and functional requirements (what the system should do). Then I gather a long-list of stack options. Next, mark them with a weighted ranking to ensure our requirements are met. Now, break the top results down further with pros & cons; discuss the risks as much as the benefits. This should feed into the beginning of a conversation with the rest of the team.

## 4. Change one thing at a time

The scientific method of 'control' pays dividends if you've got wary stakeholders. Changing one thing minimises risk, and can hold the key to unlocking the go ahead on a project.

That doesn't necessarily mean only changing one thing, but changing one thing that affects your stakeholders. Take a new CMS for example. Making a jump from one platform to another is a big step. Not only is there mass migration of content required, a full rebuild and new infrastructure, there's a whole bunch of training that now has to happen to get the rest of the company up to speed with the new system. For Sofaconf, we could’ve either chosen a cloud-CMS, designed to be consumed in a headless way, or kept the CMS the same as it is currently and added a headless endpoint. The first changes everything, the second exercises control.

These tips are all a way of increasing your confidence with a platform before you pitch it to others. This isn't so you can go into a meeting and brashly lay out your master plan - but to give you, the "doubting developer", the quiet confidence that your solution has solid foundations and is worth considering.

The net result for SofaConf? We went for Craft as our headless CMS. It’s familiar to the team, so there was no retraining required, and it fulfilled all the headless requirements we set out before profiling the options.

When we picked the frontend stack for SofaConf, the principle of least power guided our thoughts.

> Choose the least powerful language suitable for a given purpose.

Solid, accessible HTML should be the base of any web stack. If everything fails (and it will), your users still get the core content. With that in mind, an SPA was off the table, and it left us with three routes:

1. A traditional server render
2. SSR
3. Jamstack

Server rendering means managing a live web server, which requires time, skills and resources. As nice as Next & Nuxt.js are, they also can be quite expensive, and a bit of a pain to host still. But more importantly, a live web server also means a live API which is another point of failure, and Jamstack removes that.

Jamstack is an approach or a methodology for building websites, where you aim to pre-render as much of the site as possible upfront, and serve it via a content delivery network, or CDN. This removes the need to manage web servers that render on the fly, allowing you to scale quicker and at a lower cost, while delivering an accessible, content-first experience.

The name Jamstack came from these three pillars:

- J - JavaScript: client side code to enhance the experience
- A - API’s: distributed business logic for complex interactions
- M - Markup: pre-rendered HTML sent down the wire

Now two of those parts aren't mandatory; the only important factor is to serve real HTML through a CDN. This means a WordPress site, a Node.js site, or a SPA are not Jamstack-driven.

But as well as the original definition of Jamstack, I think there's another way to frame it:

- J - Javascript - Developers
- A - APIs - Controlling the business logic for Stakeholders
- M - Markup - Content team

Three parts of the web process, all connected through a single stack. See, by design, Jamstack provides an opportunity to bring the team together more closely than a traditional build.

I think a Jamstack approach helps you think more systematically

A web page is fed by multiple data streams. In a traditional CMS, you'll make DB queries for the header, the content, the related content, the footer etc. Each query comes with an inevitable performance hit; generally minor but they do mount up, and some queries can be expensive. To minimise impact, we tend to use monoliths with centralised data. Connecting to one DB is costly enough, so why connect to multiple?

In a Jamstack driven site, we don't have those limitations in the same way. Content can be fed from several places: Markdown files, image repositories, API calls, GraphQL queries. This means we can **store content in its rightful place**.

Those heavy DB queries I mentioned? It's not a problem for Jamstack as all the fetching happens at build time, not runtime. You can scale down those big API and content servers that have to serve every request, and go for a cheap server that only gets hit when the site is rebuilt. Need to convince your financial stakeholders? This can be a powerful motivator.

As a user-centred developer, the key differentiator of Jamstack over other methodologies is the `user > developer` attitude.

> With Jamstack, we take on the performance hit, so our users don't. That longer build time isn't a mistake, it's there for a reason.

If it's minutes for us, but we're saving seconds for thousands of our customers, it's a price worth paying. That makes economic sense, and I believe it's also the right thing to do.

In the monolith world, there's a glass ceiling for creating a high performing website. Surprise, surprise, time & money tend to be the limiting factors. If you're a freelancer, or working for a small agency, shared hosting is often all that's attainable.

But Jamstack puts global performance into the hands of the masses. It's in reach for all those developers, like I was, who don't have vast budgets or time for performance optimisation when you've just gotta ship that next site.

Now back to the story! Writing technical specifications seems like a job for a developer, right? Well - kinda. Sure, deciding database entities and components might be a technical job, but this is a great opportunity to bring in the experience of your team for a better result.

This was one of the highlights of the project for me. I spent a couple of hours mapping out the system with my colleague, Sophia, the events coordinator who would ultimately be the one using the system. With her wealth of events knowledge and my ruthless determinism to make things as generic as possible, we landed on a list of models & fields.

She shared what caused her pain with the previous CMS's, and I was able to put forward fixes. Without her input, I'd no doubt create future headaches for her - what a joy to be able to alleviate that at the start of a project!

We 'designed' the CMS there and then, and were able to share the entities and endpoints with the designer to let them know what data they had to play with.

Once planning was complete, my first goal was to deploy the CMS as soon as possible.

We all know good web development takes time, and there can be an unfortunate, but not always unfounded attitude in our companies that "developers always deliver late".

My aim is to get the 'spotlight' off me reasonably early, the sooner I can deploy the content editing experience, the better, but only if it's ready. The worst thing is to deliver something that needs patching, or worse, is downright faulty.

I've also found that developers quite enjoy the 'big reveal' moment when we show off our finished creation to the rest of the company, getting that huge rush of dopamine when the 'wows' come in. But really, under the surface, I think it kids us to feel like we're more in control of the deadline than on a more iterative project; we hold all the cards until the very end of the project.

But it tends to be followed rather quickly by a list of bugs and snagging items, souring the end of the project as you rush to get it over the line.

Aiming for an anticlimactic go-live is a sensible approach - "Nothing went wrong" doesn't sound all that exciting, but it makes business sense and it's far less stressful.

With a 'deploy early' mindset, you can adapt your code & design as content arrives, by pointing your local dev environment to the staging content area.

Rather than baking in the content API endpoint URL directly into the application, expose them as environment variables, so they can be injected externally. `.env` files, or additional `package.json` scripts are great for this, and a good example of an approach I call: 'just scalable enough’.

We can get fixated on 'scalability' in our projects, particularly when we see conference talks about "how the big tech companies do X", leading us to over-engineer our own code. Plan for ‘appropriate scale’, optimising the things that will actually cause you pain in the future.

Taking into consideration our earlier research concluding that a Jamstack approach would be right, and the Clearleft frontend team skill, Hugo, Eleventy and Gatsby all looked like good contenders. Unfortunately Hugo can't ingest an API to create pages, and Gatsby ships with just too much JS, unnecessary for rendering this content-driven website.

That point about creating 'pages from an API' is the key differentiator of Eleventy from a lot of Static Site Generators. As well as ingesting Markdown really well, Eleventy allows you to pull in API data sources, then render pages off the back of them.

Let's go through how we'd create a set of 'speaker' pages for the conference - this was one of the tech spikes we carried out.

We have an API endpoint in Craft that returns all the speakers like so, an array of speaker objects holding their basic information.

We achieve this with the `element API` in Craft, which allows us to return JSON, rather than HTML. Here we set out our endpoint, query the 'person' post type, filter down to only return speakers, and return their basic information. Note, we decided to have 'people' that can be speakers. Events also have MC's and workshop organisers that need to be on the website too. Had I not had that planning session with Sophia, that would've been accounted for!

For the frontend, Eleventy allows us to put content fetching scripts in the `_data` folder, and it will call them when rebuilding the website. Each script uses a utility function that wraps around the package `node-fetch` and allows us to bake in sensible defaults for all the API calls we're going to make, as well as expose the important parts for overwriting with environment variables.

See those lines setting out our `API` variable? Those are where we first ask if there's an environment variable called `API`, and if not, we fall back to the sensible default. This means we can run against our local API without any environment file.

We can create a `.env` file, setting the variable ‘API’ to point at the staging API.

Finally, for the live server, we can inject an environment variable at build time to point at the live API. We've avoided putting secrets in our repository, but also opened up possibilities for testing more thoroughly. This is appropriate scaling.

Now we can call our utility function, passing in the endpoint, and returning the data back to Eleventy.

This is an async function so use it as a place to call multiple endpoints and prepare data before it arrives in your view layer. This is server side Javascript, so you can pull in all the heavy lodash/moment libraries you want here; it won't impact the user experience at all, as it all happens at build time.

Eleventy now exposes this response as a global variable called `speakers`. Using the `-pages.njk` format, Eleventy will loop through the array of speakers, and create a page for each one.

We already have an existing LAMP deployment setup at Clearleft, so putting Craft on there made the most sense.

This was a global, virtual conference, so a global hosting solution for the frontend was preferred. Netlify was the natural choice.

Netlify runs the build command `npx eleventy`, rendering the site and pulling in the latest content every time we push to the main branch in GitHub.

And there lies a little problem... The site only deploys when new code is added, not new content. How do we trigger a new build when content is written? Also, with a traditional CMS, when you hit publish, the changes go live immediately. With a Jamstack site, there's a delay. We know it's to boost performance for the user, but how do you sell that to your colleagues who just want to get things live quickly?

Well, that traditional "go live as soon as you hit publish" can be flipped to be seen as a bug as much as a feature. Conferences often go hand-in-hand with 'big announcements' - speakers, schedules etc. Sometimes you want to stage a number of changes and deploy it in one go.

Now that's something that Jamstack can help with, and provides us a great way to 'explain' the go-live delay.
 
So we need a way of letting content editors trigger a build when they're ready to do so. Netlify has a nifty feature called 'build hooks' that let you run a build when you send a `POST` request to a unique URL they give you.

One option would be to create a small web page on a private URL with a big red launch button on it. Every time the button is pushed, it sends a `POST` request to Netlify.

Another option, the one we went for sounds more fancy but ended up being achievable without any code, and is a bit more integrated into the day to day tooling of our company. It's Slack!

Where Netlify has an inbound WebHooks to trigger a build, Slack has outgoing WebHooks, for sending those commands. We're going to marry the two together.

Within Slack's online settings area, you can create a new WebHook, set the channel it works against, the URL to `POST` to, and the trigger words that call it. For us, that was `launch-sofaconf`

The content team were so excited to run this magic ✨command and see their changes go live. They’re not traditionally in charge of deployments, so letting them behind the magicians curtain and triggering build processes was really cool! Another way to unite the team!

With very little effort on our part, other than building sensibly and choosing responsible technologies, we had a maxed out lighthouse score. As I said earlier: global performance is available for everyone with Jamstack.

- This is the fastest conference site we've ever built, so our users will be happy.
- The CMS was totally tailored to our events, and will be a consistent platform going forwards, so the events team were happy.
- It was built in record time, and will speed up future builds, so the stakeholders were happy.
- And it was built with modern web tools, so the frontend team were happy

We maxed out our internal scores too!

We got the site live in a number of days, and sold out of early-bird tickets within 2 hours. A huge team success, with genuine collaboration, brought together with a Jamstack approach.

I hope you've found that a useful story, with some handy tips in there for how you can gather requirements more effectively, choose appropriate technology, and bring your organisation along for the exciting Jamstack ride!

Thank you so much for listening!

I’ve got a few minutes now for questions if you’d like to type them into the chat window. If not, have a great time at the rest of the conference!

Thanks so much!
