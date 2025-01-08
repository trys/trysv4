---
title: Next.js Server Actions
subtitle: The good, the bad, and the plain undocumented
description: The good, the bad, and the plain undocumented
date: 2024-02-20
categories: Web
className: talk
image: '/images/blog/next-server-actions/Section 1 - Slide 1.jpg'
tags: 
  - next.js
  - speaking
  - hooks
  - react
---

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 1.jpg"
		alt="Title slide of the talk: Lessons from using Next.js Server Actions: The good, the bad, and the plain undocumented"
		loading="lazy"
	/>
	<figcaption>
		<p>This is a (rough) transcript of a talk I gave at work at the end of last year, entitled: "Lessons from using Next.js Server Actions: The good, the bad, and the plain undocumented".</p>
		<p>We'd just launched a greenfield product that used Server Actions and this talk was an opportunity to share the approach, top tips, and gotchas that I'd learned along the way.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 3.jpg"
		alt="What are server actions: Stable in Next 14"
		loading="lazy"
	/>
	<figcaption>
		<p>Server Actions were recently released to stable in Next.js 14.0.0, although they've been developed behind an experimental feature flag for a number of months.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 4.jpg"
		alt="Built into React Canary"
		loading="lazy"
	/>
	<figcaption>
		<p>Although released as part of Next.js, they are built into React Canary and utilise several 'core' hooks. Although, as you might've read recently, the gap between React Canary and Vercel is hazy at best.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 6.jpg"
		alt="Server actions only ever run on the server"
		loading="lazy"
	/>
	<figcaption>
		<p>But what <em>exactly</em> are they? They are asynchronous functions that <strong>only</strong> ever run on the server. Whereas you may currently write what <em>looks</em> like a server function to get some initial page state, you'll find they're regularly called by the client-side as the SPA mode of Next.js takes over.</p>
		<p>Server Actions will <strong>only</strong> run on the server, which brings a tonne of security, performance and accessibility benefits. Next.js provides the tooling to make your application continue to <em>feel</em> like it's making client-side requests, but under the hood, there's a load more native, web-standard plumbing going on.</p>
		<p>Think of them as the perfect backend-for-frontend starting point.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 7.jpg"
		alt="Typically receive a FormData class"
		loading="lazy"
	/>
	<figcaption>
		<p>They typically receive a <code>FormData</code> class as an input parameter&hellip;</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 8.jpg"
		alt="Return object/redirects"
		loading="lazy"
	/>
	<figcaption>
		<p>&hellip;and they usually return serializable objects or redirects.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 9.jpg"
		alt="The three methods to invoke server actions:"
		loading="lazy"
	/>
	<figcaption>
		<p>They can be invoked in three ways:</p>
		<ul>
			<li>An <code>action</code> attribute on a <code>form</code></li>
			<li>A <code>formAction</code> attribute on a <code>button</code></li>
			<li>Within a <code>startTransition</code> method, returned by the new <code>useTransition</code> hook</li>
		</ul>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 1 - Slide 10.jpg"
		alt="Server Components + Server Actions"
		loading="lazy"
	/>
	<figcaption>
		<p>They play really nicely with Server Components. When understood and used correctly, they beautifully separate the concerns of your HTML rendering path, client-side interactivity, and API requests. They encourage the mindset of responsible server-side rendering.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 2.jpg"
		alt="Example no. 1 - the cookie bar"
		loading="lazy"
	/>
	<figcaption>
		<p>Let's use an example of a common pattern to explore how Server Actions work. Everyone's favourite feature of the web, the humble cookie bar.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 3.jpg"
		alt="A code snippet of a client-side component that shows/hides a cookie bar"
		loading="lazy"
	/>
	<figcaption>
		<p>Here's a pseudo-code snippet of a pretty normal implementation of a Cookie bar. Let's walk through it. We pull in <code>useState</code> and a third-party client-side cookie library because it's 2023 and we still need a decent interface for reading/setting cookies. We set up some state for whether the cookie has been set or not by reading in the cookie. Now we have two sources of truth&hellip;</p>
		<p>Then we create a method to update our state <strong>and</strong> update the cookie. If the bar has been accepted, we return nothing and if not, we return some markup that renders the bar and calls our method.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 4.jpg"
		alt="A flow diagram of the client-side cookie bar implementation"
		loading="lazy"
	/>
	<figcaption>
		<p>Let's plot this rendering timeline onto a flow-chart.</p>
		<p>The thing about React components is it's easy to forget where they start; rendered on a server. So the request comes into the server and because we're using a client-side cookie library, we don't know whether the cookie has been set or not, so we return nothing. The response gets to the browser and we hit <abbr title="Time to first byte">(TTFB)</abbr>.</p>
		<p>As the page loads, we also get our <abbr title="Largest contentful paint">(LCP)</abbr> before the JS is parsed, hydrated and some time later, is interactive. This marks <abbr title="Time to interactive">(TTI)</abbr>. Only now we can re-check whether the cookie is set, which may or may not show the cookie bar. If it does, we're in danger of triggering a <abbr title="Cumulative layout shift">(CLS)</abbr>. Not good.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 5.jpg"
		alt="Another flow diagram of the client-side cookie bar implementation"
		loading="lazy"
	/>
	<figcaption>
		<p>When the "Accept cookies" button is clicked, everything now happens on the client side. We set our cookie and state, and React re-renders the component, showing/hiding accordingly.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 6.jpg"
		alt="Code snippet of a server action implementation of a cookie bar"
		loading="lazy"
	/>
	<figcaption>
		<p>Here's the equivalent using Server Actions. We pull in the <code>cookies</code> helper from within Next.js, and import a server action that we'll look at in a second. Next, we read directly from the helper, returning <code>null</code> if the cookie is set. Now we return a <code>form</code> with the <code>action</code> attribute set to our imported action. Traditionally, you'd put a string in an <code>action</code> attribute, but under the hood, Next resolves and routes this action so it works without JS. Rather than <code>type="button"</code>, we can use <code>type="submit"</code>. Note, we've not written any client-side code, nor a single <code>event.preventDefault()</code> despite the form.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 7.jpg"
		alt="Code snippet of the cookie bar server action"
		loading="lazy"
	/>
	<figcaption>
		<p>And here's the first Server Action of the day. It's in a file with a <code>'use&nbsp;server'</code> directive. This is crucial, and one of the hallmarks of a Server Action. It tells Next to <strong>never</strong> send this file to the client-side or bundle it into a script so we're safe to work with API secrets and import weightier libraries without penalising our users.</p>
		<p>We import the very same <code>cookies</code> helper as we did in our component and do one thing in the action: set the cookie. Nice and simple.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 8.jpg"
		alt="Rendering flow chart of the server action cookie example"
		loading="lazy"
	/>
	<figcaption>
		<p>The rendering flow chart for this is a dream. The request comes in, with all the lovely headers including any cookies currently set. We either return the markup for the cookie bar, or we don't, but this is all happening on the server. When the response is sent to the client, there's no risk of <abbr title="Cumulative layout shift">(CLS)</abbr>.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 9.jpg"
		alt="Interaction flow chart of the server action cookie example"
		loading="lazy"
	/>
	<figcaption>
		<p>This time, when the button is clicked, a request is sent to the server (via an internal <code>fetch</code> call that Next handles for us). The cookie is checked on the server and the new cookie state is determined. Next then re-renders the component showing/hiding the bar accordingly. From a user's perspective, it's the same outcome, but we've moved the work up to the server. This is a key theme of Server Actions.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 10.jpg"
		alt="Example no. 1.1 - Cookie bar withough Javascript. What happens when JS fails?"
		loading="lazy"
	/>
	<figcaption>
		<p>Now you may be thinking, why does this matter? Well, let's explore the same component with JS disabled for the inevitable moment when JS fails on your site.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 11.jpg"
		alt="Flow chart of the client-side cookie bar with no JS"
		loading="lazy"
	/>
	<figcaption>
		<p>Here's the client-side version again, let's click the button&hellip;</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 12.jpg"
		alt="Everything is broken after the button is clicked."
		loading="lazy"
	/>
	<figcaption>
		<p>&hellip;sad times. It ded.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 13.jpg"
		alt="Flow chart for the Server Action version"
		loading="lazy"
	/>
	<figcaption>
		<p>Now, let's compare it to the Server Action version. You click "accept" and perform a traditional <code>POST</code> request to the server. The cookie is set and the new markup is shown without the cookie bar!</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 14.jpg"
		alt="Benefit no. 1 - No client-side JS required"
		loading="lazy"
	/>
	<figcaption>
		<p>You might not <em>think</em> you care about user's without JS, but <q>All your users are non-JS while they're downloading your JS</q> - <cite>Jake Archibald</cite>.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 15.jpg"
		alt="Benefit no. 2 - Interactive before and during hydration"
		loading="lazy"
	/>
	<figcaption>
		<p>We've all been on pages where the page <em>looks</em> interactive but you're still waiting for the behemoth bundle to parse and hydrate. If your users interact with a Server Action <em>before</em> JS is ready, they'll just follow the non-JS path, and be able to get on with their task quicker than ever.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 16.jpg"
		alt="Gotcha no. 1 - Cookies can only be set in Server Actions & Route handlers"
		loading="lazy"
	/>
	<figcaption>
		<p>Gotcha #1 - as you're interacting with actual request headers, cookies can only be set within Server Actions and route handlers. Once the HTML is sent to the browser, the setting stops.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 17.jpg"
		alt="Gotcha no. 2 - setting cookies in middleware requires cloning headers"
		loading="lazy"
	/>
	<figcaption>
		<p>Gotcha #2 - you can also <em>technically</em> set cookies in Next.js middleware but it requires you to copy headers from the response back to the request or you'll end up in a state where your cookies are a page behind you. This is one of those undocumented features that is only found at the end of a long GitHub issue.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 2 - Slide 18.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Tip #1 - <code>&lt;noscript&gt;</code> and <code>type="hidden"</code> inputs are surprisingly useful with Server Actions.</p>
		<p>Only non-JS users will send the <code>no-js</code> parameter, allowing us handle the two user groups independently.<p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 1.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Onto the next example, a login form. I'll use a simpler "magic link" form to keep things simple.<p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 2.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>This is your common or garden React form. Gosh it's something to behold. Let's work through it. After importing various components, it's time to create some reactive state to hold our email address. Then we create a method to handle the form submission. We send the email to an API and if it's successful, route the user on the client side. We'll ignore error handling for now, but that's another load of complexity to add in.<p>
		<p>Then, <em>on every key press</em>, we set the entered text into state and re-render the whole component to pass the value back to the input you just typed in. This is the two-way data binding we've all come to accept, but it's actually bonkers when you stop and think about it.</p>
		<p>This component covers rendering, API requests and user interactions in the space of 80 lines.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 3.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Let's look at a Server Action equivalent form. The difference is staggering.</p>
		<p>To begin with, it's so focused. It's only concern is providing the markup to render the form. There's no state management per field, no key press events, and no inline functions. Just HTML (well, JSX, but close enough in this case). It uses web standards that have been around for decades: the <code>name</code> attribute, the form <code>action</code>. These things are battle-tested and <em>just work</em> without a tonne of extra complexity.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 4.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>The Server Action doesn't need to be complicated either. Next passes in the <code>FormData</code> instance, so we can easily extract the email using the same <code>name</code> attribute, and pass that to our handler. When that's resolved, we redirect the user to the success page.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 5.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Here's the flow for the Server Action with JS enabled. The form submits, Next sends the data to the Server Action via a POST request with <code>fetch</code>, and on success, it redirects the users through the client-side router.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 6.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Turn off JS and the result is <em>exactly</em> the same. Instead of an AJAX call, a classic POST request happens in the browser, the Server Action handles the login flow, and redirects the user. I would bet money that users would be none the wiser if JS was removed from this page.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 8.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>And for posterity's sake, here's the client-side version with JS turned off. The cookie bar example may have been contrived, but a login form is a primary action for many sites. Through progressive enhancement, Server Actions provide a way for <em>all</em> users to complete primary tasks on a site in all circumstances.</p>
		<p>And moreover, these components are simpler to write and smaller to serve than their client-side counterparts.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 9.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>The reason this all works so neatly, is because these API's follow the <a href="https://frankchimero.com/blog/2015/the-webs-grain/">grain of the web</a>. <code>FormData</code>, for example, is a wonderful web native interface that handles forms incredibly elegantly. It doesn't cost the user anything to import, it's well documented and most importantly, it isn't yet another NPM library negatively effecting your project's maintainability.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 10.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Another weird gotcha - Redirects and <code>try/catch</code> don't work well together in Server Actions&hellip;</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 11.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>If you redirect within the <code>try</code> block, it will throw an error. Use <code>try/catch</code> around asynchronous or volatile calls, then redirect afterwards.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 3 - Slide 12.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Server Actions make it trivial to use API keys/secrets in a responsible manner. Next already requires environment variables you intent to ship to the client-side to be prefixed with <code>NEXT_PUBLIC_</code>, which means any other variable is <em>only</em> usable in a Server Action file.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 1.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Let's carry on from the previous login form example and add some error handling.</p>
		<p>It's important to sanitize our inputs and validate data on the server, not just on the client. With all the data automatically send to the server, this becomes the default pattern using Server Actions.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 2.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Up until now, all our Server Action forms have been server components, and haven't required any client-side state or hooks. That's going to change in this example. Although it's possible to handle error checking with server components, we're going to use the new <code>useFormState</code> hook imported not from Next, but from <code>react-dom</code>. You need to mark the file with a <code>'use&nbsp;client'</code> directive.</p>
		<p>This hook takes in the Server Action import, and some default state in the shape of an object. It returns an array with a the reactive state, and a new embellished Server Action. These can then be applied to the form and used to render error messages.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 3.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Looking at the updated Server Action, you'll see we now return a JSON object if there's an error generated in the <code>try/catch</code> block. This object will be returned to the client and the form updated to show the error message.</p>
		<p>The <code>try/catch</code> pattern works really nicely here, allowing us to liberally throw errors in validation libraries, or within the login flow, and handle them in a consistent way.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 4.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Here's the flow chart of what's going on, showing the early JSON response if the error is present, and the redirect on success&hellip;</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 5.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>&hellip;and without JS, it works very similarly&hellip;</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 6.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>&hellip;but there is a gotcha here. You'll probably remember this classic error message. It appears if you try and refresh a page that has been rendered directly from a POST request. Depending on the task, it could be pretty bad news if a user can resubmit the same form multiple times.</p>
		<p>Non-js users can get into this state when we return an error response message. That's not a big deal, but could be if we used <code>useFormState</code> to handle a success state, rather than redirecting the user onto another page.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 7.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>We can keep things idempotent with the POST → Redirect → GET pattern. This approach ensures that redirects are <a href="https://www.w3.org/TR/design-principles/#safe-to-browse">safe</a> and without side-effects.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 8.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Time for another gotcha. The Edge runtime might sound like a U2 effects pedal, but it's the name given to the flavour of limited JS used on CDN servers. At build-time, Next breaks down an application into a bunch of smaller functions that can be distributed to 'Edge' servers and run from there, rather than on a single, central server. This is all very clever and helps with performance, but it's also required to opt-into for Server Actions, specifically if you want to support non-JS requests.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 9.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>These two, barely documented exports need to be set within the page importing the server action. You won't notice an issue when running the application in development mode, but without <code>export const runtime = 'edge';</code>, non-JS POST requests will just hang indefinently.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 10.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>A popular JS validation library is Zod. It's very good. It's also recommended on the Next.js Server Actions documentation. It has a <code>FormData</code> plugin designed to take in a POST request and validate accordingly. Unfortunately, that plugin doesn't work with the Edge runtime and thus can't be used with Server Actions if you want to support non-JS users. I'm not sure if anyone at Vercel has noticed.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 11.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>We use DataDog for logging, monitoring and alerting. But again, there's a gotchat here. I was finding our nice, tidy logs were being desecrated by nasty multi-line logs, but only on some requests. You guessed it, it's our friend the Edge runtime again.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 4 - Slide 12.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Within our Pino logger, I had to take charge of the logging, but only for requests currently using the Edge runtime in production.</p>
		<p>This has formatted logs to a single line, but some events continue to appear as <code>info</code>, despite being classified as <code>error</code>.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 5 - Slide 1.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>The final update to the login form example involves adding a loading state.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 5 - Slide 2.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p><code>useFormStatus</code> from <code>react-dom</code> is the hook needed for this feature. It returns an object with a <code>pending</code> property, which updates when the form is being submitted. We can use this to show a loading/disabled state on the submit button.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 5 - Slide 3.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>Big gotcha for this - <code>useFormStatus</code> must be used in a child component to the form. It <strong>cannot</strong> be used directly in the parent component.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 6 - Slide 1.jpg"
		alt=""
		loading="lazy"
	/>
	<figcaption>
		<p>To finish, I'll run through a few quickfire tips.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 6 - Slide 2.jpg"
		alt="useOptimistic can update the UI before the server action completes - perfect for event driven architectures"
		loading="lazy"
	/>
	<figcaption>
		<p><code>useOptimistic</code> is a hook provided to update the UI before the Server Action has completed. The classic example for this is an instant messaging application. <a href="https://lawsofux.com/jakobs-law/">Jakob's law</a> suggests that you expect to be able to hit enter on a message and it will appear in the message list instantly, rather than waiting for the server to respond positively that the message has been sent. This hook provides some plumbing to make this pattern simpler to implement.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 6 - Slide 3.jpg"
		alt="Server Actions can GET data on page load in a server component"
		loading="lazy"
	/>
	<figcaption>
		<p>Server Actions can be used to fetch data on page/layout load. This is a instance where an action won't receive a FormData object, and can be supplied with whatever parameters you'd like. You're also likely to return an object, rather than a redirect in these instances.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 6 - Slide 4.jpg"
		alt="Server actions only every POST data from forms"
		loading="lazy"
	/>
	<figcaption>
		<p>However, you cannot run a Server Action from a form as a GET request, only a POST. In fact, Next will just steamroll your <code>method</code> parameter and force a POST on there.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 6 - Slide 5.jpg"
		alt="revalidatePath - bust the cache on a route before redirecting"
		loading="lazy"
	/>
	<figcaption>
		<p><abbr title="Create. Read. Update. Delete.">CRUD</abbr> updates are a pretty common usecase for Server Actions. So when you create/update/delete your todo/comment/post etc, you're probably going to want to refresh the list of todos/comments/posts to reflect the change.</p>
		<p><code>revalidatePath</code> accepts a relative URL string where it will flush the cache for any data persisted on that route. When you next visit the route, it will refetch the latest copy of the data, rather than respond with an earlier cached copy.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 6 - Slide 6.jpg"
		alt="revalidateTag - mark up your fetch calls with tags and call this in a server action to bust the cache"
		loading="lazy"
	/>
	<figcaption>
		<p>If you're using the monkey-patched <code>fetch</code> implementation within Next, you're going to want to swat up on <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating">caching</a> within the framework. Next now caches <em>everything</em>. If you're dealing with user-specific data, you're going to want to tag up your <code>fetch</code> calls to avoid the risk of cross-pollinating another user's data. I like to include a user ID within the tag to ensure they're unique per user.</p>
		<p><code>revalidateTag</code> accepts one of those tags and busts the cache for it.</p>
	</figcaption>
</figure>

<figure>
	<img
		width="1152 "
		height="648"
		src="/images/blog/next-server-actions/Section 7 - Slide 1.jpg"
		alt="Thanks for listening"
		loading="lazy"
	/>
	<figcaption>
		<p>Thanks for <del>listening</del> reading!</p>
	</figcaption>
</figure>

