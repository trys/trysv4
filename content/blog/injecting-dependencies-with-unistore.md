---
title: Injecting Dependencies with unistore
date: 2019-01-18
categories: Web
description: "What I've been up to this week with JournalBook"
---

I've spent a few train journeys refactoring some underlying JournalBook code. It doesn't make for exciting feature release notes, but it's good work to do, and sets the project up for future expansion. The main updates were:

- Upgrade [IDB](https://github.com/jakearchibald/idb) to v3
- Add global state management in the shape of [unistore](https://github.com/developit/unistore)
- Create a new settings table
- Migrate the theme picker
- Refactor the database logic
- Add an option for reduced animation

IDB is now a module, so we now `import { openDb } from 'idb'`, instead of calling methods directly on `idb`, which is rather nice.

Unistore is a redux-like state management system that plays real nice with Preact - it's also tiny! ✨ There's a tendency to leap towards global state too quickly in JS projects. JournalBook got quite far without it, but as the future plans started to unfold, it became quickly apparent that local state alone wouldn't be enough.

For now, there are two things in global state: settings, and the database.

## Injecting a dependency

On my work project, global state is very much 'data-based', if you'll pardon the pun, it's a store of shared API responses used across components, and makes optimistic updates considerably easier. But with JournalBook, I decided to try something a little different with the database.

Up till now, there's been a handy `DB` class that connects to IndexedDB with `idb`. This made it easier to share the DB methods, but it did mean an instantiation on each page. Unistore to the rescue!

Instead of booting up the DB on each page, we boot it once on launch, place it in the state, and inject it into all pages requiring data. Here's a snippet from `app.js`:

```js
import { openDb } from 'idb';

class App extends Component {
  async componentDidMount() {
    const version = 1;
    const dbPromise = openDb('journalbook', version, udb => {
      switch (udb.oldVersion) {
        case 0:
          udb.createObjectStore('questions');
      }
    });

    await dbPromise;
    await this.props.boot(dbPromise);
  }
}

export default connect(
  'settings',
  actions
)(App);
```

In `componentDidMount`, we boot up the DB and run any new migrations. Then we `await` the promise (this is just a nice to have to ensure the DB arrives ready to the store), and pass it to the `boot` method. This method is defined in our unistore actions, and gets injected to this file (more on that later).

Here's the actions file:

```js
import { DB } from '../utils/db';

export const actions = () => ({
  boot: async (state, dbPromise) => {
    const db = new DB(dbPromise);
    const settings = await db.getObject('settings');
    return { db, settings };
  }
});
```

In the `boot` method, we instantiate the database with the promise sent from `app`, and fetch the settings. By returning both, unistore sets them to state.

Now we have the database available in our global state. Let's compare a before and after of a simple page:

#### Before

```js
import { h, Component } from 'preact';

export default class Year extends Component {
  state = {
    db: new DB()
  };

  getQuestions = () => {
    this.state.db.get('questions');
  };
}
```

#### After

```js
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

class Year extends Component {
  getQuestions = () => {
    this.props.db.get('questions');
  };
}

export default connect('db')(Year);
```

Instead of each page having it's own DB class stored in local state, we inject the database in with the `connect` higher order component, making it available on `this.props.db`.

It's not wildly different, nor much shorter, but it is more efficient, and provides a good standard for all pages.
