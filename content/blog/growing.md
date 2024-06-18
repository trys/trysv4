---
title: Growing
date: 2024-06-06
categories: Web
---

On the back of Zach's post on the journey to make [11ty fully independent](https://www.zachleat.com/web/independent-sustainable-11ty/), I've been thinking about the routes to scaling a project. I work on two side projects alongside my [9-5](/blog/a-year-at-motorway): [Utopia](https://utopia.fyi), and an as yet unreleased piece of software my wife and I have created for her workplace.

Utopia is open-source-kinda - we've opened up a good number of repositories but there's still a few kept under wraps. There's no desire to be secret; it's purely a logistical decision. The [generators](https://github.com/trys/utopia-core) are good candidates to be open-source. For one, they're installable through `npm`, so it's good to be explicit about what's being sent into your `node_modules` black hole. Secondly, they're smaller, more discrete systems that are easier to contribute to. This keeps the number of contributions to a manageable level. At this stage, I'm doing all the reviewing, and am already time-poor—adding a bunch PR's to the pile won't be sustainable.

With Utopia free to use, we minimise the burden of responsibility for uptime, feature requests, and speedy bug fixes (though we strive for those things). There are ways we _could_ build out a premium feature-set, but this isn't currently part of the plan.

But when the progression of the project is directly tied to the free-time of the time-poor contributors, how does the project grow and sustain?

I guess the first question is whether a project _should_ grow? Not everything [should scale](https://www.growbyginkgo.com/2023/05/01/against-scale/). Growth for the sake of growth isn't sustainable, as so many VC-backed open source projects can attest. And even if the cadence of progression is irregular, it's perfectly natural to have times of fallow, and times of accelerated growth.

Conversely, it's frustrating sitting on a project with so much potential but so little time to give to it.

Investment brings enough capital where working full-time on a project becomes possible/required. Might sound cozy, but get ready to squash the project into the most profitable shape possible, alienating many users in the process. This requires _total_ commitment to make the most of your runway, and the indebtment to the valuation easily becomes a millstone. No, this is not the way.

Platforms like Patreon and OpenCollective democratise this funding, usually in return for perks/early access etc. This takes the VC-model pressure off, and feels considerably more sustainable once you're up and running. The challenge is that first leap. If you already have a full-time job + a family/mortgage/lifestyle that works, dropping that to work full time on a side project is massive step. Not only is there the financial risk, there's the paperwork and life admin that's going to come with starting a business, going freelance, completing personal tax returns, hiring an accountant etc. Even switching from 5 days employed to 4:1 employed/self-employed comes with a bunch of headaches (or so I'm led to understand, let me know if I'm wrong on this).

The threshold for funding will be different for everyone, but up till that point is hit and you can make the leap, you're either working a tonne of overtime to justify the funding, or sitting on a growing pile o' cash, making it hard to show how the money will be used when you hit said threshold.

I've been pondering whether there's a middle ground for those where time is the challenge, rather than capital. Utopia, for example, doesn't have any huge overheads. So the challenge here is how to buy/create time. Is there a world where a platform could fund _time_? What I mean is, could donations pay your employer for the hours you _don't_ work, so they're not out of pocket, but it frees you up to try a day a week/fortnight working on the side project more formally. They take on the paperwork so you keep your paycheck & pension consistent, knowing you have the security to fallback to the job if it doesn't work/donations dry up.

If donations continue to rise, it either buys more time (to a point the employer is comfortable), or the money enters the pot, which could directly fund the project in the future, should you wish to go full-time on it. Details could be ironed out.

- **Employer upsides:** they don't lose you to open source work, and they're covered for the hours your not working
- **Employer downsides:** more accounting, fewer worked hours (though I truly believe we fill the time we have)
- **Employee upsides:** lowers the risk in jumping into open source work, no paperwork/tax implications on day one
- **Employee downsides:** probably puts you in the firing line if redundancies come onto the table

Anyway, I'm not sure if it's a good idea or not, but it's an idea. Shame I don't have time to build it!
