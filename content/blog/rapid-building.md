---
title: 'Tiny lesson: rapid builds, email signatures and Airtable'
description: 'How to spike problems and build fun web things fast'
date: 2019-08-28
categories: Web
tags:
  - side project
---

We're fortunate enough to have some rather snazzy email signatures, kindly created by [Benjamin](https://clearleft.com/about/team/benjamin-parry). He's been lovingly crafting these by hand; diligently updating them each time an event concludes or a new Clearleftie joins. This seemed like a fun and helpful task to automate. After a morning of hackery, I had a working version of the [signature generator](https://clearleft-signatures.netlify.com/) deployed and ready for an internal test.

<div style="position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden;">
  <video src="https://www.trysmudford.com/images/blog/signature.mp4" poster="https://www.trysmudford.com/images/blog/signature.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" preload="none" controls></video>
</div>

---

There are a couple of interesting technical decisions which we'll delve into, but before that, let's talk about building at pace more generally.

## Quick web things, quick web wins

One of my passions is rapidly testing ideas on the web. Development pace is one of the biggest things the web has going for it over native applications. A HTML file, domain, server space and a couple of hours is all you need to get _something_ online.

It's worth saying upfront that rapid builds are **definitely not** for everything. In fact, they should be used sparingly for prototypes or side projects that aren't business-critical. Like the [good, fast, cheap](https://fastgood.cheap/) venn diagram, quick builds are inherently flawed, but they do still have merit.

I really love a thorough plan and technical spec, but there's something wonderful about rapidly spiking a problem and not worrying too much about the details. It's how [Sergey](https://sergey.trysmudford.com), [JS Pedalboard](https://pedalboard.netlify.app/), [Javasnack](https://javasnack.cool/) and several marginally popular [F1 parody websites](https://wtf1.com/post/someones-made-a-has-mclaren-broken-down-today-website/) came about.

> The stack choice isn't really important.

Spikes are a great way to try a new technology and learn by making mistakes. The only pre-requisite I'd suggest is to **use a stack that you can deploy easily**. There's nothing worse than getting something working locally, then finding you can't host it without an AWS degree or pricey hosting infrastructure.

In the past, PHP was my jam. It's still _so_ much easier to host than Node.js, and you can build quickly without getting too bogged down in implementation details. These days I'm tending to lean on static site generators like [Hugo](https://gohugo.io) and [Sergey](https://sergey.trysmudford.com) (shameless plug), before deploying to Netlify.

For this project, I opted for [Preact](https://preactjs.com/) and a small vanilla Node build script. [Preact CLI](https://github.com/preactjs/preact-cli) boilerplated the site very quickly, and after a few minutes of stripping back the extra cruft, I had an ES6, reactive and hot-loaded development environment ready. I then ran a quick 'hello, world' deploy to confirm it would all build on Netlify.

With that in place, it was time to actually build the darn thing.

From the [very rough plan](/blog/rapid-building/#come-up-with-a-bit-of-a-plan) in my head, it appeared there were two main parts to this project:

1. The template generator - Preact
2. The data source - JSON & Airtable

## Generating code with code

Email signatures are notoriously awful to code, but fortunately Benjamin had done the hard work already! I grabbed an existing signature and converted it into a little method that squirted the parts of a 'person' in, mixed it with some sensible defaults, and returned some HTML (well, JSX).

```jsx
const person = {
  forename: 'Trys',
  surname: 'Mudford',
  team_name: 'trys-mudford',
  avatar_name: 'trys-mudford-small',
  role: 'Front end developer'
};

renderSignature = person => (
  <div style="min-height:50px;line-height:17px;color:#505050;min-width:350px;font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.5;">
    <p>{person.forename}</p>
    <p>---</p>
    <a href={data.defaults.team_url + person.team_name}>
      <img
        style="float:left;margin:2px 6px 32px 0;width:90px"
        src={data.defaults.avatar_url + person.avatar_name + '.png'}
        alt={person.forename + ' Profile Pic'}
      />
    </a>
    <p>
      <strong>{person.forename + ' ' + person.surname}</strong>
      <br />
      {person.role} |{' '}
      <a
        style="color:#006ff5;text-decoration:none;font-weight:700;border-bottom:1px"
        href="https://clearleft.com/"
      >
        Clearleft
      </a>
      <br />
      <a
        style="color:#505050;text-decoration:none"
        href={data.defaults.phone_url}
      >
        {data.defaults.phone_text}
      </a>
    </p>
  </div>
);
```

The next step was to import the list of staff from a JSON file, pick out a selected team member and render the above template. Thanks to JS imports, this was nice and clean to achieve:

```jsx
import { h, Component } from 'preact';
import data from './data';

class App extends Component {
  render() {
    const person = data.team.find(x => x.team_name === 'trys-mudford');

    return (
      <div>
        {person && (
          <section class="person">{this.renderSignature(person)}</section>
        )}
      </div>
    );
  }
}
```

Next I moved the hard-coded user identifier up into state, and added a `<select>` field to control it.

```jsx
state = {
  teamName: ''
};

setTeamName = event => {
  this.setState({ teamName: event.target.value });
};

render() {
  return (
    <form>
      <label for="who" class="screen-reader-only">
        Pick a team member
      </label>
      <select
        id="who"
        value={this.state.teamName}
        onChange={this.setTeamName}
      >
        <option value="">Who are you?</option>
        {data.team.map(person => (
          <option value={person.team_name}>
            {person.forename} {person.surname}
          </option>
        ))}
      </select>
    </form>
  )
}
```

Finally, I added a touch of state restoration with the help of `localStorage`. When a user returns to the site for a second time, their previous staff choice gets prefilled, saving one click. The goal of this site is to save us time so this feature is; although by no means essential, surprisingly useful.

```jsx
const STORAGE_NAME = 'signatureTeamName';

state = {
  teamName: localStorage.getItem(STORAGE_NAME) || ''
};

setTeamName = event => {
  this.setState({ teamName: event.target.value }, () => {
    localStorage.setItem(STORAGE_NAME, this.state.teamName);
  });
};
```

With that, plus a bit of styling, the frontend was complete.

## Airtable API

The above was achieved with a static JSON file, which was super rapid to build with. As an MVP, this all works and could genuinely be used in production - there's no shame in avoiding databases altogether. But part of the fun in rapid building is trying new things out.

Airtable is like Excel on steroids - and a spreadsheet seemed like the most straightforward way to get data into this system without getting tied up in databases and servers. I considered Google Sheets, but their API authentication was too cumbersome, so Airtable won the day. As I said, pick tools that deploy easily!

Once I had an API key, I created a file called `fetch.js` and ran `node fetch.js` in the terminal. This runs whatever JS is in the file - like a Bash script for those of us who don't know Bash. Data fetching in Node is still less than ideal, but I've got a handy little method that converts the in built `https` library into a promise:

```js
const https = require('https');

/**
 * Generic HTTP Get request promisified
 * @param {string} url - the API endpoint
 * @returns {Promise<Object>} - the response
 */
function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', err => reject(err));
  });
}
```

The response from Airtable is an object with a `records` array. Each record is a row in the spreadsheet which in turn has a `fields` property. Each item in this object is keyed to the name of the column, and represents a cell.

I started out writing some fairly _dodgy but working™_ code to take the rows, loop them and add them to a new array. That array was then converted into a new JSON file ready to be consumed by the Preact application. Once I'd confirmed that was all working, I refactored a bit and ended up with this:

```js
/**
 * Parse Airtable response, running through a transform callback function
 * @param {string} url - the Airtable endpoint
 * @param {transform} transform - the transform function to run through
 * @returns {Promise<AirtableRecord[]>} - an array of records
 */
function fetchFromAirTable(url, transform) {
  return get(url)
    .then(res => res.records
      .filter(x => Object.keys(x.fields).length)
      .map(transform)
    );
}

function fetchStaff() {
  return fetchFromAirTable(
    `https://api.airtable.com/v0/${SPREADSHEET}/Staff?maxRecords=40&view=Grid%20view&api_key=${KEY}`,
    record => ({
      forename: record.fields['First Name'],
      surname: record.fields.Surname,
      team_name: record.fields['Team Name'],
      avatar_name: record.fields['Avatar Name'],
      role: record.fields.Role
    })
  );
}

(() => {
  console.log('Fetching data from Airtable...');

  return Promise.all([fetchStaff()])
    .then(([team]) => {
      let data = JSON.stringify({
        team,
        defaults
      });
      console.log('Writing results...');
      fs.writeFileSync('src/data/index.json', data);
      console.log('Build complete');
    })
    .catch(err => {
      throw new Error('Fetching failed', err);
    });
})();
```

Instead of pushing the transformed data into a new array, I relied on the wonderful Array methods we have available in JS. Using `.map()` with a callback worked as a really neat way to extract the data transformation out into the calling function, simultaneously keeping the data fetching code nice and generic.

Scaling this to work with 'events' as well as 'staff' was a case of creating a new method, adding the appropriate API URL, and writing a new transform function.

## Build time fetching

One option would've been to hit the Airtable API directly on the client-side. This has the advantage of always being up to date, but has a few downsides:

- Additional point of failure on the live site
- Dependant on Airtable keeping their API format consistent
- Rate limiting & pricing considerations
- 'Dangers' of exposing all the spreadsheet data
- Definite dangers of exposing API keys
- CORS hell

The approach I took was to fetch the data once at build time, create a new JSON file and read that in to Preact. It's the same technique I used on the 2018 incarnation of [Paul the Octopus](https://www.tomango.co.uk/thinks/paul-the-octopus-2018/#build-time-api).

The biggest benefit of this approach is [how well it fails](https://adactio.com/articles/12839#howwelldoesitfail). If: Airtable change their API design/auth, someone updates the spreadsheet format drastically, or the sky falls in, new releases will simply not build and the current release will continue to stay live. I'll get an email alerting me to the failed build, and I can investigate in my own time.

## Hiding secrets

With any quick build, you need to decide what's worth optimising and what'll 'do' for the MVP. If you get bogged down optimising prematurely, you'll never ship anything. If you cut too many corners, the product will be unsalvageable. The trick is to avoid painting oneself into a corner.

Environment variables are one of those things that are worth setting up early doors. They're not exactly exciting, but retrospectively adding them is even less fun. Plus, the very act of adding them to a project forces you to consider how the site will be deployed.

Hard coding secrets into a repository isn't a hugely clever idea, so it's good practice to create an `.env` file, pull in the [dotenv](https://www.npmjs.com/package/dotenv) module, and rely on environment variables from the start.

## Come up with a (bit of a) plan

You don't have to fly totally blind with projects like this. It's worth coming up with a small plan, even if it's only in your head. For this project, the plan looked a bit like:

- Decide on a stack
- Bootstrap the site
- Render a plain HTML signature
- Make a template to render a signature from an object
- Extract user details & defaults into a JSON file
- Fetch something from Airtable
- Save that thing as JSON
- Trigger the fetch at build time

If you have a reasonably big idea in mind, it's worth breaking it down into smaller features first. This 'backlog prioritisation' exercise might sound pretty formal for a single day build, but I find it helps me stay focused. I quite like GitHub projects & Trello for this task - I'll make 'MVP, nice to have, backlog, in progress, done' columns and divide the features accordingly. The [MoSCoW method](https://en.wikipedia.org/wiki/MoSCoW_method) is a decent alternative approach.

## Guessed requirements

The final thing I wanted to touch on was guessed requirements. It's an inevitability that the thing you build will have some rough edges and won't work perfectly first time out. But that's okay, you're not building a business-critical system, you're building a ✨ _fun web thing_ ✨

With this project, I got a bit carried away and added a 'copy the code' feature. It ran the `renderSignature` method through Preact's [render to string](https://github.com/preactjs/preact-render-to-string) library, before copying it to your clipboard with `execCommand`. There were some interesting success/error states to consider and I had to use `refs` to select DOM nodes within the application.

The only problem was, the feature wasn't needed.

Gmail and Apple mail both work from the default browser selection and clipboard, and don't allow you to paste HTML. So the feature was swiftly removed. It could've been avoided with some basic specifications, but it also wasn't a big deal. The feature took about 30 minutes to add, and was a nice problem to solve.

The fact that it didn't make it to launch matters little, it was still useful to learn and code, even if I was the only beneficiary.
