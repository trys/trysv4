---
title: "On Design Engineering: I think I might be a design engineer..."
date: 2021-02-17 07:00:00
categories: Web
image: /images/blog/og-de-1.jpg
description: "Exploring design engineering, and deciding whether that's what I do"
---

{{< alert "Series" >}}
This post is part of a series on Design Engineering. It looks at the changing role of a web developer over their career, and discusses the design → engineering gulf. I've also written supplementary posts on [prototyping](/blog/prototyping/), [systemised design foundations](/blog/design-foundations/), and the [designer developer relationship](/blog/designer-and-developer-relationship/) to try and keep this post a readable length. On with the show.
{{</ alert >}}

For several years, I've been wondering where I fit into the web development spectrum. Reflecting on my career, I can see a convergence towards a certain way of working. But I've not been able to name it... till now.

## A web developer builds websites?

In my first couple of years as a "Web Developer", the role didn't actually mean *building websites*. It meant making copy updates on sites, FTP'ing files, making tea, and contacting our server host when something went wrong[^1].

Over time, I was given more responsibility and moved into actually *building websites*. But that also came with managing our hosting infrastructure, writing email templates, pitching in with winning and planning work, and helping with marketing campaigns. Not *just* building websites[^2].

Joining a startup introduced me to two new designers, and for the first time, a backend engineering team who created the headless API's that powered the product. The front-end team covered both the 'front' and the 'back-of-the-front-end'. [Creating the buttons, and wiring them up](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/). Still *building websites*, but in collaboration with an engineering team.

Becoming a part of such a design-rich company like [Clearleft](https://clearleft.com/) opened my eyes to even better ways of collaborating with designers & engineers, and has pushed me to understand the whole design process more thoroughly. Every project is different, but more and more, we're working on the 'front-of-the-front-end', and handing over to a 'back-of-the front-end' engineering team to integrate into the actual website.

## Understanding and realising design intention

This is a huge part of the job for a web developer. And it's not _just_ visual design, it's the whole process that has come before: Research, UX, Product and Content. How do we take all of the good ideas that have preceded our involvement in the project, tie them all together elegantly, and deliver them to the user appropriately.

If you're a web developer who "builds websites", that's on you. But what if you're not the end of the chain? What if you're handing your code off to... Engineering.

## A web developer builds for the web

In larger agency and most product teams, there is an 'engineering' team[^3] who tend to fall into two disciplines:

- Backend
- Back-of-the-front-end

I'm generalising, but developers in these fields tend to be 'systems thinkers' and approach things with a programming > design mindset—that's just how their brains tend to work in my experience. Their skills are in writing elegant, robust and scalable code to ensure our products don't fall over when things go awry. Their skills are in breaking down the whole product into sensible chunks, storing data efficiently, and making it easy to query. Their skills are in preventing data being leaked, stopping users from storing corrupt data, and ceasing hackers in their stride.

Their skills (again, generalising), are *not* in realising the nuance of a design. And that's great! If you have the privilege of working in a team of this nature, it's so good to be able to focus on the things you're good at, and let a really qualified professional carry out their specialities.

In this team, the web developer (as we've described so far) is part of a bigger chain. They're now **building for the web** rather than **building websites**.

## The design → engineering gulf

However, it's becoming increasingly more common for organisations to jump straight from "design" to "engineering", missing out the front-of-the-front-end altogether. After all, the engineer codes, and the phase after design is code, so why not let the engineers build the UI?

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

## Our approach

<div class="grid-of-cards">
	<article class="card">
		<h3><a href="/blog/design-foundations/">Design foundations</a></h3>
		<p>Before diving into divergent design or any coding phase, we by creating a foundational set of instructions and calculations to govern the project, covering: <strong>Typography, Space, Colour and Grids</strong>.</p>
		<p><a href="/blog/design-foundations/">Read more →</a></p>
	</article>
	<article class="card">
		<h3><a href="/blog/prototyping/">Prototyping</a></h3>
		<p>The final medium for any design is ultimately the browser, so the quicker you can get your design onto real devices, the quicker you can validate your assumptions</p>
		<p><a href="/blog/prototyping/">Read more →</a></p>
	</article>
</div>

## Translating design

As web developers in a larger build chain, I think our goal is to 'translate' the design in the best way possible. From experience, that's considerably easier to do if both the development **and** design has been built using a system, rather than trying to create one from scraps. This is why we start try to start the coding phase *with* the design phase, integrated and making decisions together. Front-end code becomes an extension of design.

Or as James deftly puts it:

{{< longquote "James Gilyead" >}}
The fidelity of the product’s code version is built up during the design phase, rather than afterwards. The developer is integrated in the design team rather than waiting to catch the designer’s mic before it hits the floor.
{{</ longquote >}}

## What role is this?

This way of working has proved incredibly effective, and has *really* piqued my interest. I love [building rapidly](https://www.trysmudford.com/blog/rapid-building/), designing systems and writing elegant and scalable code.

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
- Creating useful tools
- Encapsulating systems
- Setting up project groundwork
- Empowering effective collaboration

Yes. This was a *very* exciting discovery.

## Where the design engineer sits

The design engineer sits in this earlier described gulf between the two disciplines and finds a way to smoothly translate between the two.

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

In essence, a design engineer's goal is to **be helpful**. Helping UX come to sound decisions, helping research get the most useful insights from their testing, helping designers generate sound & deliverable ideas, and helping engineers understand the design intention. But the primary focus is on doing anything they can to help translate the design for the engineering team.

We talk of 'creators' and 'maintainers': those who do the work, and those who keep it running well. But I think it's a spectrum. Design engineers sit firmly in the most 'creationy' part of the creator camp, building rapidly, failing early and clearing a way through the bad ideas so the other creators can follow smoothly.

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