---
title: Mac OS Dark Mode
categories: Web
date: 2019-01-09
---

I've been using the commute to add [JournalBook](https://journalbook.co.uk) features. Yesterday saw the addition of the prize feature everyone loves but very few need: [**Dark Mode!**](https://twitter.com/trysmudford/status/1082547315146133505) Here's how it works:

### Getting the CSS in order

First on the task list was to prepare the CSS for the changeover. As someone who absolutely loves CSS, I'm a little ashamed by the state of it on this project. It's due a major refactor, but let's not dwell on that too much!

All colours were hard-coded up to this point, which would've meant for a difficult time switching themes. I usually run `scss` but this project is still set up with humble ol' CSS. No matter, it's 2019, we have Custom Properties!

To start with, I moved all the colours up to a single `:root` declaration and set them up as variables.

```css
:root {
  --bg: #fff;
  --color: #444;
  --line: #ddd;
  --heading: #1e2357;
  /* ... */
}
```

Then I swapped out all references in the remainder of the file.

```css
#app {
  background: var(--bg);
  color: var(--color);
}
```

Finally, I copied the `:root` variable rules, and created a 'theme'.

```css
[data-theme='dark'] {
  --bg: #131420;
  --color: #efefef;
  --line: #555;
  --heading: #c5c5c5;
}
```

Thanks to the 🔥 wonderful nature of the cascade 🔥 (I'm a big fan if you couldn't tell), these variables are updated for any child under an element with the `[data-theme='dark']` attribute.

So from a HTML point of view, theme switching is a case of changing **one data attribute** on **one element**. Nice.

### JS theme switching

[JournalBook](https://journalbook.co.uk) is written in Preact, so this code will be a bit ES6'y.

Here's the base App class. We call `getDefaultTheme()` (which we'll stub out in a mo'), to set our initial state, then render the app with the afformentioned data attribute.

```js
class App extends Component {
  state = {
    theme: getDefaultTheme()
  };

  render(props, { theme }) {
    return (
      <div id="app" data-theme={theme}>
        {/* The rest of the app */}
      </div>
    );
  }
}
```

In `getDefaultTheme()`, we first check to see if the theme has been explicitly set by the user. If so, we return early. Next, we run a `matchMedia` call to see if they've set their OS to have the dark colour scheme. This is part of CSS Media Queries level 5, and can be [read up on here](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme).

```js
const getDefaultTheme = () => {
  const userTheme = localStorage.getItem('journalbook_theme');

  if (userTheme !== null) {
    return userTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return '';
};
```

This all works really nicely now! If you've set a theme, you get your theme. If not, you get the most appropriate theme for your system preferences.

#### Sidenote

This can all be achieved in CSS, with the media query:

```css
@media (prefers-color-scheme: dark) {
  /*  */
}
```

But for this use case, we need to first check to see if a user has explicitly set their own theme first.

## Live switching

The one issue with the current code, is that it doesn't react live to systen contrast mode changes. How is that even possible, I hear you cry! (I asked the very same question till Jason Miller came to the rescue). I had no idea you could `addListener` to `matchMedia` calls!

With that, we can add a listener when the component mounts and respond to system preference changes live in the browser!

```js
componentDidMount() {
  if (localStorage.getItem('journalbook_theme') === null) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
      this.setState({ theme: matches ? 'dark' : '' });
    });
  }
}
```

{{< twitter 1082728392699580422 >}}

### Summary

I haven't gone into the manual theme switching here, but all the code is open-source and available on [GitHub](https://github.com/trys/JournalBook/). Check out [this file](https://github.com/trys/JournalBook/blob/master/src/routes/settings/index.js#L27) for more info, and feel free to [tweet](https://twitter.com/trysmudford) any questions.

In closing, I just wanted to extend a massive thanks to [Jason Miller](https://twitter.com/_developit/) for demonstrating `matchMedia` listeners so aptly!
