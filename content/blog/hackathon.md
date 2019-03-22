---
title: Hackathon
date: 2015-10-07
categories: Web
---

Last weekend I attended my first hackathon, Kingdom Code London. Working from a coworking space in the New Zealand embassy, over 100 developers, designers and ideators congregated to birth website and app concepts in under 48 hours.

As part of the Christian organisation Code for the Kingdom, our projects were designed to help charities, non-profits, churches and fellow-Christians. Furthermore, there were 12 other hackathons in 8 countries going on at the same time totalling 800+ people and 100+ projects.

There were three types of challenge; globally set, locally set and individual concepts. The global challenges were open-ended allowing teams to interpret them in unique ways. The local challenges were more defined making it slightly easier to come up with a concept. We went for the local challenge of Christmas, specifically building something that explains the true meaning of Christmas.

## Friday

We started with a team of four; two backend and two frontend developers. Our initial planning session led to the idea of creating an advent calendar treasure hunt which gamified the well-known paper/chocolate calendar into a worldwide points-based web app. Upon completing a daily challenge, competitors would receive points, badges and some thought-provoking content.

After analysing our skill sets, we opted for a C# backend API and a lightweight HTML frontend pulling in the content. On Friday night at 23:00 we started coding, or rather, the rest of the team started while I wasted 2 hours trying to find out why my laptop had decided to run at 500% CPU continuously.

When I finally started, it became clear that we would need some form of template renderer to run the frontend. Although I have investigated Angular, I’ve never used it for more than a small 20 minute hack and I’ve certainly never used it in anger. It did however seem like the right option to implement with our API.

## Saturday

The venue was a one minute walk from Trafalgar square so it wasn’t exactly quiet outside the building and teamed with a room with the lights on, other teams chatting and other delegates snoring, sleep was near-impossible. After two hours of lying awake, I decided to get up at 5:00 and start learning/implementing Angular. Despite a few issues with routing (which lead to the discovery of ui-router) and a fair amount of trial and error coding, I got a consistent Angular controller-view app running pretty nicely. In the meantime, the backend contingent had got a great API running and had made serious progress into scanning Twitter for our daily hashtags and parsing them to check the answers.

We recruited another backend developer to work on the leaderboards and badges sections and by the time it came to break for dinner, it was starting to look pretty positive. We recruited two marketing experts to conjure up some exciting and “sticky” challenges that would ensure users would keep coming back during December. Our other frontend dev focussed on establishing the narrative that would lead a user through the real Christmas story.

Saturday evening was a bit frustrating due to some database problems that cost us about two hours per developer but by 02:30, the app was taking shape even if sleep deprivation had hit us big time.

## Sunday
Thankfully a better night’s sleep was had by all and we woke up refreshed and ready to finish off the app. After a quick meeting to establish the remaining tasks, we got started. My first priority was to get the app looking a bit better and after consulting a designer we tweaked what we had and rebuilt the home page, swapping it from a vertical list of days to a calendar style grid. Adding 3D-style doors on hover/tap was a personal highlight although it did generate the debate as to whether perforated cardboard edges or door handles should’ve been used!

At 14:00 we ran a technical presentation rehearsal which went great from a presentational point of view and pretty poorly from a technical standpoint. We rushed back to our desks and following a small incident involving a considerable amount of chilli con carne falling into a laptop bag, we managed to fix almost all of the problems.

## Judgement

The announcement for the genuine presentations starting at 14:30 came as quite a surprise so we all pushed our final commits as we walked into the auditorium, hoping that the server would deploy the final version quickly enough. To make matters worse, we had decided to call ourselves AdventHunt and the presentations were being carried out in alphabetical order – definitely something to log for the future.

The presentation ran pretty smoothly and everything worked (or at least looked like it worked to the untrained eye!). One of our marketing experts presented the app and did a superb job of fielding the tough judges questions – discussing growth mechanics and long-term sustainability for a slightly silly advent calendar hacked together in 48 hours was no mean feat.

There were some seriously cool apps, websites and prototypes created by the other 17 teams, it was amazing to see the breadth and quality of work created in such a condensed amount of time. All other teams tackled serious matters like disaster response, accountability and refugee housing administration so it did feel a little strange showing our game! That said, our team had so much fun; we really gelled, played to each other’s strengths and we got a working(ish) app built in the allocated time.

Personally, I learned a huge amount over such a short period of time. Being a quieter individual, I don’t tend to frequent these sorts of events. However, I would now go to another without question. It was so nice to program in a team again, working towards a common goal is such a desirable objective as a developer. From a code standpoint, writing it in Angular was a pretty big achievement for me. For most “normal” projects at work, the opportunity to explore JavaScript frameworks is not always possible and to be honest, I have steered clear because of my wish to ensure compatibility without JavaScript. But from my experience over the weekend, I agree that it was the right framework for the job as it allowed quick prototyping to be achieved. I would be tempted to use it for an admin area section on future projects or an area where JavaScript can be relied on a little more. Perhaps I’m just being a bit of a Luddite!

All in all, it was a hugely successful event and I for one am really looking forward to my next hackathon.