---
title: Prioritising Requirements
date: 2020-03-25
description: 'How we profile and prioritise technical requirements'
categories: Web
---

In any development project, there is a point at which one must decide on the tech stack. For some, that may feel like a foregone conclusion, dictated by team appetite and experience.

Even if the decision seems obvious, it's always worth sense-checking your thought process. Along with experience and gut-feelings, we also have blind-spots and biases.

We're big fans of [prioritisation exercises](https://clearleft.com/posts/getting-your-priorities-right) at Clearleft, and regularly help to steer clients in their technical and product decisions. As an agency, our role is not to dictate solutions or steamroll our agenda, but to listen, interrogate and question before using our experience to empower teams to make their best decisions.

We recently helped a not-for-profit decide which content management system to use. Rather than dive straight into the build, we took a step back, using a technical discovery phase as an opportunity to ask questions, learn and come to a well-informed decision together.

Although this was used to decide a CMS, the same approach works well for picking front-end frameworks, CSS methodologies, and design/research tools.

## Types of requirements

We start by breaking down the decision into four chunks:

1. Non-functional requirements: "**How** the system should work"
2. Functional requirements: “**What** the system should do”
3. Costs
4. Risks

Although tempting to dive straight into the juicy functional requirements, it's really helpful to begin by framing the problem-space with non-functional requirements.

## Non-functional requirements

Often referred to as the ‘-ility’s’ (by virtue of the fact many end in those letters), non-functional requirements are just as important as functional requirements. Here are a few examples:

- Usability
- Maintainability
- Reliability
- Scalability

They can be pretty ‘wooly’ and subjective, making them quite difficult to quantify. But they are very useful to help frame how successfully a functional requirement has been achieved. For example, every CMS may have the ability to ‘write content’, but some CMS’s may have a text editor that is far more 'usable' than others.

It’s also worth noting that **non-functional requirements come with trade-offs**. By prioritising one, you usually take a negative hit on another. For example, by prioritising a non-functional requirement of ‘Security’, you may decide to impose strict password requirements, or require two-factor authentication. While that helps achieve the secure goal, it also makes the system more complex from a code point-of-view (less maintainable), but also more complex for the user (less usable).

### Exercise: Ranking exercise

Take the following list of non-functional requirements, and write them on post-its, if you can think of any others, write them down too:

#### Performance

Response times, TTFB, traffic peaks and troughs, will dictate caching plans and approach

#### Scalability

Does this system need to scale over time?

#### Capacity

How many people can use the system? User accounts.

#### Availability

Where can this system be accessed from?

#### Reliability

Trust in the system & time between failures

#### Recoverability

In the event of a failure, how quickly can the system be restored?

#### Maintainability

Can this system be supported, and is it cost-effective?

#### Security

What is the risk of the system being hacked? User account and passwords

#### Regulatory

Does the system need to be approved, inspected, tested or regulated?

#### Manageability

How easy is it for the maintainers to monitor the system, and spot critical issues?

#### Environmental

How important is environmental impact of the system?

#### Data integrity

Audit trails, revision and checking

#### Usability

The system is prioritised based on usage patterns. User testing and an analytics plan is helpful

#### Interoperability

Should the system slot in with third-party services?

#### Affordability

How price-sensitive is this project? If costs increase, will it be problematic?

Run through each one, and ensure everyone understands the difference between them all, particularly in how they differ for your project. Scalability and capacity may sound similar, but they will have very different meanings for each project.

If you're in a small group situation, rank the requirements. Don't worry too much if some come out as equally important at this stage.

In a larger group, you may find [dot-voting](https://en.wikipedia.org/wiki/Dot-voting) to be a more efficient way of ranking the most important requirements.

Pull out the top four or five, discuss them, and write them up in a bit more detail, outlining how they will affect your system.

## Functional requirements

Functional requirements describe “what the system will do” - or perhaps more accurately, “what the system should do”. These are objective and quantifiable statements that either a system can, or cannot do.

### Exercise: MoSCoW

Carry out a [MoSCoW prioritisation exercise](https://en.wikipedia.org/wiki/MoSCoW_method) to evaluate and group functional requirements for this system.

- Must have
- Should have
- Could have
- Won’t have

By placing each requirement into one of these groups, we gained a sense of importance for each feature. With all the time in the world, everything could be a ‘must’, but that’s not at all practical - be honest about what is achievable for this project.

Use your prioritised non-functional requirements as a way to justify each decision. If you've ranked 'security' as a low priority in the first exercise, and then find that in this exercise, 'two-factor authentication' is being put forward as a 'Must have', it might be worth reevaluating your non-functional requirements.

Again, post-its are the way to go here, put the four headings on the wall, and group the requirements below them.

![](/images/blog/post-its.png)

**Tip:** It's a good idea to pre-prepare a bunch of post-its with common or more obvious functional requirements beforehand, then add to that list as you go.

Feel free to delve into the rabbit warrens when they arrive. If your pre-prepared requirement says: "users should be able to log in", interrogate that a little further; start asking questions about roles and permissions, about how many users you may have, and how many concurrent users need to access the system. You may uncover some interesting assumptions from within in the group.

## Costs

Open source software is fabulous, but not always right for every project. For some systems, relying on a tried and tested paid solution may well be more appropriate. Depending on the non-functional requirements you previously gathered, uptime SLA's, and guaranteed support might be more important than price.

Some software has upfront costs, some has monthly or annual subscriptions. Sub-sections of the system may also have their own costs; plugins, add-ons and transaction fees come to mind.

If you are relying on open source software, strongly consider donating back, it helps keeps the authors in business, and in-turn, working on the project that powers your system.

## Risks

There are always risks to consider when making a tech stack decision. We joke about there being a "new JS framework every week", but the age of the product may well be a deciding factor. Too new and you could encounter teething problems, too old and you run the risk of the project being discontinued, or support being challenging to find.

The ecosystem and community of the solution should also be considered. If there is a healthy community of supporters, maintainers, and authors, the risk of project discontinuation is reduced. It will also be easier to find external support when required.

Finally, you need to consider your own experience. In our most recent case of picking a CMS, it might've been that a system written in Java was the most appropriate, but if no-one on the team has experience in that language, or your hosting infrastructure doesn't allow for it, that's a huge risk to undertake.

## Exercise: list your solutions

Start gathering a list of the possible solutions. Go as wide as you can and include a few wild cards, even if they feel totally inappropriate, they may well surprise you. It's worth asking your network, colleagues and on Twitter. The more options you have to profile, the better.

## Main exercise: Ranking spreadsheet

It's time to start ranking our solutions against our requirements. We like to use a Google Sheet for this sort of thing, but feel free to use Airtable or a simple piece of paper!

To help you along, we've created a [Google Sheets template](https://docs.google.com/spreadsheets/d/1lOs8EjQR1TCWtAob03NrILQlv7jMqAdudxOiGl3teEo/template/preview) that you can use to get you started.

{{< button "https://docs.google.com/spreadsheets/d/1lOs8EjQR1TCWtAob03NrILQlv7jMqAdudxOiGl3teEo/template/preview" >}}Download the template{{</ button >}}

---

Along the top, we list our solutions, and down the side our requirements, costs and risks:

![](/images/blog/spreadsheet.png)

In the world of software development, anything is technically possible given the right time, budget and team. A simple boolean yes/no isn’t a fair assessment when profiling systems against functional requirements. We need a more nuanced profile, and go for a 5-point scale:

- -2: Incredibly complex or time consuming to fulfil
- -1: Complex to fulfil, requiring a lot of custom code
- 0: Possible, but would require custom coding
- 1: Achievable, perhaps adapting an existing system feature
- 2: Very achievable, and available out of the box

The same -2 to 2 scale can be used for non-functional requirements too.

Work through each system, one at a time, ranking it against the requirement. Bring up the project documentation as you go - it's a great way to get a flavour of how well written their supporting information is, should you choose that solution.

Try to **be as objective as possible** when scoring. By breaking out each project feature into requirements, we're trying to reduce our overall and individual bias.

For costs, work out the year one and two costs. It's good to be as aware of the ongoing costs as it is the upfront ones. Factor in plugins, add-ons, donations, maintenance and hosting. You may find it helpful to also break it down to monthly figures, if that will aid stakeholder buy-in. Once you've completed the cost breakdown for all the solutions, rank them accordingly working from 0 down. In a group of ten solutions, the cheapest should score: 0, and the most expensive: -9.

Risks are subjective, and in some ways they should be. Consider age of solution, ecosystem and experience, and rank them from 0 and down.

## Totalling up

Once you've completed all the ranking, it's time to tally up the results.

![](/images/blog/spreadsheet-values.png)

### Non-functional requirement multipliers

Using the earlier results from the ranking exercise, reverse the order to work out the multiplier. The most important requirements will have the largest number, going down the least important with a multiplier of 1. If you ranked some requirements equally, keep their multipliers the same. You'll end up with a list a bit like this:

- Usability × 6
- Accessibility × 6
- Security × 5
- Reliability × 5
- Maintainability × 5
- Recoverability × 4
- Environmental × 4
- Affordability × 4
- Performance × 4
- Availability × 3
- Interoperability × 3
- Regulatory × 2
- Capacity × 2
- Manageability × 1
- Scalability × 1
- Data Integrity × 1
- Locality × 1

To amplify the most important requirements, we multiply each score by its position in the scale. A solution that scores negatively on one of the higher priority non-functional requirements, like usability, will therefore take a larger hit than one that isn’t hugely scalable.

### Functional requirement multipliers

We can use a similar multiplier for functional requirements:

- Must have × 3
- Should have × 2
- Could have × 1

![](/images/blog/spreadsheet-multipliers.png)

### Cost and risk multipliers

Multiply the final scores for each solution by 2.

## The results

Adding up the totals from the four requirements section should give you a score for each possible solution. Sort the solutions in a descending order, where the highest score is the most appropriate option.

If some of the results seem wildly off, double-check your multipliers, it may be for your project that costs should be multiplied by 4, rather than 2. There's no one-size-fits-all approach here.

We then wrote a few paragraphs for the following sections:

1. The main contenders (top 3-4)
2. The middle of the pack
3. The inappropriate options (bottom 3-4)

Explaining **why** the solutions were more or less appropriate is incredibly important for when you present these findings back to less technical stakeholders. Don't skip this step, we found the act of synthesising and writing up the results to be a hugely useful part of the process.

## Next steps

Discuss!

The results should by no means be viewed as conclusive, but should help frame a discussion about the various options, and might just pull a few surprise options into consideration - it certainly did for us.

---

{{< button "https://docs.google.com/spreadsheets/d/1lOs8EjQR1TCWtAob03NrILQlv7jMqAdudxOiGl3teEo/template/preview" >}}Download the prioritisation template{{</ button >}}
