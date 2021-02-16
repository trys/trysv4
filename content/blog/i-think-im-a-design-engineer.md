---
title: "On Design Engineering: I think I might be a design engineer..."
date: 2021-02-16 08:00:00
categories: Web
image: /images/blog/og-de-1.jpg
description: "Exploring design engineering, and deciding whether that's what I do"
---

{{< alert "Series" >}}
This post is part of a series on Design Engineering. It contains a short, slightly self-indulgent retrospective of my career, a look at the relationship between designer and developer, and discusses the design → engineering gulf. I've also written supplementary posts on [prototyping](/blog/prototyping) and [systemised design foundations](/blog/design-foundations) to try and keep this post  at a readable length. On with the show.
{{</ alert >}}

---

Naming things is hard. Naming roles is even harder.

For several years, I've been wondering where I fit into the web development spectrum. Having taken a step back and looked over my career, I can see a convergence towards a certain way of working. But I've not been able to name it... till now.

## A web developer builds websites?

### First job

In 2012, I interviewed for the role of "Junior Web Developer / Designer" at a [small agency](https://www.tomango.co.uk/). I distinctly remember the moment where I took a deep breath and said: "Just one thing to mention... I'm not a designer, I'm a developer", fully expecting that to be the end of the engagement. Thankfully it wasn't, and I was fortunate enough to assume my first position in this fine industry of web: "Junior Web Developer".

Starting off, "Web Developer" meant making copy updates on sites, FTP'ing the changed files, and contacting our server host when something went wrong[^1]. Over time, I was given more responsibility and moved into actually **building websites**. But that also came with managing our hosting infrastructure, writing email templates, pitching in with winning and planning work, and helping with marketing campaigns. Not *just* building websites[^2]. 

### Second job

Starting at [Daisie](https://www.daisie.com/) introduced me to two new designers. It felt like a relationship reset at the start, taking time to understand how each other worked, the nuances we put into our craft, and the best way to critique each others creations.

You can learn a lot about a designer by looking at their design files. I pored over their Figma files and learned about how they 'organised' their designs, how they used grids to lay out new work, and how they iterated ideas rapidly.

### Third job

Joining such a design-rich company as [Clearleft](https://clearleft.com/) opened my eyes to even better ways of collaborating with designers, and has pushed me to understand the whole design process more thoroughly.

{{< alert >}}
### Designer & Developer rhythm

In those early days at Tomango, I recall observing the relationship between our designer and the freelance developers we used. There was an invisible trust between the two roles: the designer knew their creation would be realised accurately, and the developer knew they'd be given all they'd need to achieve the design. They were in harmony.

But in time, I found my own groove with our designer and we designed and built many sites together. We developed our own shared understanding and common language between us, through the formative process of client work. By understanding his design intention, and him understanding my development capabilities, we could build with serious efficiency and accuracy.

Interestingly, this was also the time when I realised I *was* designing after all. When there's fluidity and understanding between design and development, design also happens at the development stage.

As soon as his design ideas were in the browser, we'd be iterating together and feeding back into the original design file. Live tweaks in dev tools and early prototypes to prove concepts were my medium for design. It wasn't <strike>photoshop</strike> <strike>fireworks</strike> <strike>sketch</strike> Figma, but it was still design.
{{</ alert >}}

---

## Design intention

The phrase I keep coming back to is: **Understanding and realising the design intention.**

That's a huge part of the job for a web developer. And it's not _just_ visual design, it's the whole process that has come before: Research, UX, Product and Content. How do we take all of the good ideas that have preceded our involvement in the project, tie them all together elegantly, and deliver them to the user appropriately.

If you're a web developer who "builds websites", that's on you. But what if you're not the end of the chain? What if you're handing your code off to... Engineering.

## A web developer builds for the web

In larger agency and most product teams, there is an 'engineering' team[^3] who tend to fall into two disciplines:

- Backend
- Back-of-the-frontend

I'm generalising, but developers in these fields tend to be 'systems thinkers' and approach things with a programming > design mindset—that's just how their brains tend to work in my experience. Their skills are in writing elegant, robust and scalable code to ensure our products don't fall over when things go awry. Their skills are in breaking down the whole product into sensible chunks, storing data efficiently, and making it easy to query. Their skills are in preventing data being leaked, stopping users from storing corrupt data, and ceasing hackers in their stride.

Their skills (again, generalising), are *not* in realising the nuance of a design. And that's great! If you have the privilege of working in a team of this nature, it's so good to be able to focus on the things you're good at, and let a really qualified professional carry out their specialities.

In this team, the web developer (as we've described so far) is part of a bigger chain. They're now **building for the web** rather than **building websites**.

## The design → engineering gulf

However, it's becoming increasingly more common for organisations to jump straight from "design" to "engineering", missing out the front-of-the-frontend altogether. After all, the engineer codes, and the phase after design is code, so why not let the engineers build the UI?

Well, by jumping straight between the colossal gulf spanning the two functions, a huge wealth of design intention can disappear out of sight.

I *love* this explanation of that gap, and the grievances that can occur here, taken from [Natalya Shelburne](https://twitter.com/natalyathree)'s [talk at Beyond Tellerrand](https://beyondtellerrand.com/events/berlin-2019/speakers/natalya-shelburne):

![Design: Circles, Engineering: Owl](/images/blog/de-slide-1.jpg)

{{< longquote >}}
When I am wearing my software engineer hat and I’m working with a designer, I feel like they hand me some circles and I need to deliver a beautiful owl. They don’t understand nor value the code, the quality, the things I have to do in architecture and keep guessing at their pictures of websites and I feel like I’m the hero.
{{</ longquote >}}

![Design: Owl, Engineering: Circles](/images/blog/de-slide-2.jpg)

{{< longquote >}}
Meanwhile, every design, and when I’m working as the designer on a project, I hand someone a fully detailed, perfect owl and they give me divs -- I’m sorry, circles.
{{</ longquote >}}

The above quotes and images are extracted from Natalya's talk. [Read the script](https://beyondtellerrand.com/events/berlin-2019/speakers/natalya-shelburne), or [watch the talk](https://vimeo.com/373397621), it's well worth your time.

Both disciplines can get disappointed over their expectations not being met. But with the two roles having such different mindsets, how do we ensure an efficient and successful handover at this point?

## [Design foundations][Foundations]

A phrase [James](https://clearleft.com/about/team/james-gilyead) and I like to use at [Clearleft](https://clearleft.com) is 'Designing design'. Rather than diving straight into the divergent design process, we start by creating a foundational set of instructions to govern the project, covering:

- Typography
- Space
- Colour
- Grids

Rather than leaving it for the engineering/development team to 'unpick' the design to try and find any logic or reason, these four pillars are decided collaboratively and are adhered to by both functions ahead of any formal coding or design phase.

It's very helpful to create the rules to calculate these foundational values, rather than extracting them (hex codes, font-sizes etc.) from the design file as set-in-stone values. Here's why:

1. [Creating a palette of named foundations produces a positive 'friction-point'](/blog/design-foundations/#1-creating-a-palette-of-named-foundations-produces-a-positive-friction-point)
2. [You can tweak the system to generate interesting new possibilities, inspiring new design.](/blog/design-foundations/#2-you-can-tweak-the-system-to-generate-interesting-new-possibilities-inspiring-new-design)
3. [It empowers developers to design](/blog/design-foundations/#3-it-empowers-developers-to-design)
4. [Engineers are 'systems thinkers' - so built them a system](/blog/design-foundations/#4-engineers-are-systems-thinkers---built-them-a-system)

I've added a load more detail on the above points in [this post][Foundations], in a vague attempt to keep this post a readable length.

But design is inherently divergent, *"how do you know your system will work if you 'design it before the design phase'?"*, I hear you ask...

## [Prototyping][Prototype]

The key tool in my arsenal is rapid prototyping. A mid-to-high fidelity prototype helps you answer any niggling questions quickly, and more importantly, in the browser. The final medium for any design is ultimately the browser, so the quicker you can get your design onto real devices, the quicker you can validate your assumptions.

- [Prototypes unearth UX assumptions](/blog/prototyping/#prototypes-unearth-ux-assumptions)
- [Prototypes get buy-in](/blog/prototyping/#prototypes-get-buy-in)
- [Prototypes are deliverables](/blog/prototyping/#prototypes-are-deliverables)
- [Prototypes promote user testing](/blog/prototyping/#prototypes-promote-user-testing)
- [Prototypes help you focus on the things that matter](/blog/prototyping/#prototypes-help-you-focus-on-the-things-that-matter)


## Translating design

As web developers in a larger build chain, I think our goal is to 'translate' the design in the best way possible. From experience, that's considerably easier to do if both the development **and** design has been built using a system, rather than trying to create one from scraps. This is why we start try to start the coding phase *with* the design phase, integrated and making decisions together. Frontend code becomes an extension of design.

Or as James deftly puts it:

{{< longquote "James Gilyead" >}}
The fidelity of the product’s code version is built up during the design phase, rather than afterwards. The developer is integrated in the design team rather than waiting to catch the designer’s mic before it hits the floor.
{{</ longquote >}}

## What role is this?

This way of working has proved incredibly effective, and has *really* peaked my interest. I love [building rapidly](https://www.trysmudford.com/blog/rapid-building/), designing systems and writing elegant and scalable code.

However, it doesn't really feel like **building websites** any more, and sometimes it doesn't even feel like **building for the web**. Even if the foundational systems make it to production, the prototypes are almost always throwaway. They serve their purpose of translating the design to engineering, and validating the project assumptions, and then they're gone. In some ways, this is role **building for the engineers**.

This niggling feeling made me wonder if this role had a name? Turns out it does...

## ✨ Design engineering ✨

I was reading the excellent [design engineering handbook][Handbook][^4], and a paragraph at the end of chapter one stopped me in my tracks:

{{< longquote "Natalya Shelburne" >}}
Design engineering is the name for the discipline that finesses the overlap between design and engineering to speed delivery and idea validation. From prototyping to production-ready code, this function fast-tracks design decisions, mitigates risk, and establishes UI code quality. The design engineer’s work encapsulates the systems, workflows, and technology that empower designers and engineers to collaborate most effectively to optimise product development and innovation.
{{</ longquote >}}

### It me.

That paragraph *totally* describes the role I've been trying to push towards without realising:

- Idea validation
- Rapid prototyping
- Production code
- UI code quality
- Encapsulating systems
- Empowering effective collaboration

Yes. This was a *very* exciting discovery.

## Where the design engineer sits

The design engineer sits in this earlier described gulf between the two disciples and finds a way to smoothly translate between the two.

{{< longquote >}}
On one end of the spectrum, designers strive for pixel-perfect mockups and beautiful interfaces. On the other, engineers endeavor to architect systems and optimize for patterns. In the middle are designers and engineers concerned with how those two approaches intersect.
<cite>Adekunle Oduye in the <a href="https://www.designbetter.co/design-engineering-handbook/">design engineering handbook</a></cite>
{{</ longquote >}}

## What the design engineer writes

CSS is the primary language of the design engineer.

{{< longquote >}}
CSS is made for programming design. It’s a tool that serves both designers and engineers, and that’s precisely why it is often the subject of such debate. Intersections where people with different mental models need to work together tend to be loud and sometimes even hostile—but that’s where learning happens.
<cite>Natalya Shelburne in the <a href="https://www.designbetter.co/design-engineering-handbook/">design engineering handbook</a></cite>
{{</ longquote >}}

Regardless of how we write our code, ultimately it is all compiled down to HTML, CSS and JS. A design engineer must balance the user experience with the developer experience, both empowering the team to write great code in whatever way is right to them, whilst ensuring that doesn't detrimentally harm the user experience.

Sometimes that means learning and using technologies _we_ wouldn't normally choose, knowing that it will empower the team to create the best product they can.

Words are another tool.

- **Discussing** the challenges design and engineering face
- **Describing** the solutions we create
- **Documenting** the [foundations][Foundations], [prototypes][Prototype] and systems in play

In essence, a design engineer's goal is to **be helpful**. Helping UX come to sound decisions, helping research get the most useful insights from their testing, helping designers generate sound & deliverable ideas, and helping engineers understand the design intention. But the primary focus is on doing anything you can to help translate the design for the engineering team.

We talk of 'creators' and 'maintainers': those who do the work, and those who keep it running well. But I think it's a spectrum. Design engineers sit firmly in the most 'creationy' segment in the creator camp, building rapidly, failing early and clearing a way through the bad ideas so the other creators can follow smoothly.

> Building rapidly, failing early and clearing a way through the bad ideas so the other creators can follow

## Conclusion

So there we are. I think I might actually be a design engineer. It's not a radical shift from what I've already been doing. The [foundations][Foundations], [prototypes][Prototype] and design systems I've helped create of all fall into this function, and it's so reassuring to see it's more than just little old me out there. I can't wait to dig into this community more.

So that leaves one final question...

### Does every project need a design engineer?

I'm going to go out on a limb and say yes, **if** there is an engineering function bringing the project together. Furthermore, I'm thoroughly convinced that a developer should be involved in the design process of every project. It's all too easy to put development down stream in the waterfall, but as we know from the design & engineering 'owl grievances', the earlier the design engineering involvement, the smoother the process.

[^1]: Whilst trying my introverted best to calm upset clients.

[^2]: This might be why I take issue with the "it's not possible to be full stack" argument. I bet there are _plenty_ of young developers who've been thrown into the deep end of small agency world, and have no choice but to spin all the plates and learn all the things. Saying "you can't be a full stack" is disrespectful for those who don't have the luxury of specialising.

	Maybe it is 'impossible' to load all aspects of development into your noggin if you're working in [city product land](https://www.trysmudford.com/blog/city-life/). But if you're building sites for small clients, and there's no budget for specific devops/frontend/backend/QA roles, you don't really have a choice.

[^3]: Whether you like the term engineering [or not](https://www.theatlantic.com/technology/archive/2015/11/programmers-should-not-call-themselves-engineers/414271/), you can't deny its prevalence in the industry.

[^4]: Natalya Shelburne, Adekunle Oduye, Kim Williams, Eddie Lou are all doing amazing work in this space. I'm so grateful to have found their resources.

[Prototype]: /blog/prototyping/
[Foundations]: /blog/design-foundations/
[Handbook]: https://www.designbetter.co/design-engineering-handbook/