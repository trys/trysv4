---
title: Avatar stacking with Quantity Queries
date: 2019-01-10
categories: Web
---

After [tweeting about this](https://twitter.com/trysmudford/status/1082966516277096448) yesterday, I thought it best to write a quick blog post in the interest of detail & syndication.

I was working on some notification UI elemements, and there was an interesting 'avatar stacking' design. <small>_Sadly I can't show much more of the design than this at this stage._</small>

![Avatars stacked atop one another](/images/blog/avatar-stacking.jpg)

As I thought about how to tackle it, I considered a few options:

- A single avatar component, and a separate multi-avatar component
- Counting the images before rendering and adding a 'count' class to the parent element
- Server generated images

Some of these seemed like reasonable options, but then I remembered [Quantity Queries](https://www.tomango.co.uk/thinks/using-quantity-queries-to-write-content-aware-css/). We can write content-aware CSS to self manage in situations like this.

## HTML

Let's start with the markup. We're Reacting™, but this how the browser will see a one-avatar notification:

```html
<figure class="avatars">
  <a href="/janedoe">
    <img src="..." alt="Jane Doe's profile" />
  </a>
</figure>
```

And a two-avatar notification:

```html
<figure class="avatars">
  <a href="/janedoe">
    <img src="..." alt="Jane Doe's profile" />
  </a>
  <a href="/janedoesnt">
    <img src="..." alt="Jane Doesnt's profile" />
  </a>
</figure>
```

To avoid rendering the them differently, we'll use an array and assume there's multiple avatars.

```jsx
const { user, follower } = this.props;
const avatars = follower ? [user, follower] : [user];

return (
  <figure className="avatars">
    {avatars.map(avatar => (
      <Link key={avatar.id} to={`/${avatar.username}`}>
        <img src={avatar.thumbnail} alt={`${avatar.name}'s profile`} />
      </Link>
    ))}
  </figure>
);
```

## CSS

Avatars can be rendered at different widths, so we're going to use `em`'s for sizing. It has the added bonus of helping the faux-border scale with the width.

```scss
.avatars {
  font-size: 48px;
  width: 1em;

  a {
    box-shadow: 0 0 0 0.03em #fff;
    display: block;
  }
}
```

This code is enough to render the first avatar, but currently the second one stacks below it. Let's change that with a quantity query:

```scss
.avatars {
  // ...

  a:first-child:nth-last-child(2) {
    &,
    & ~ * {
      width: 75%;
    }

    & ~ * {
      margin: -50% 0 0 25%;
    }
  }
}
```

This quantity query (`a:first-child:nth-last-child(2)`) asks the question:

> "Is the first anchor, also the 2nd-to-last anchor?"

`nth-last-child` is a wonderfully underused selector, and when paired with `~ *` to target all subsequent siblings, your CSS can become (somewhat) self-aware!

For this use-case, if that above question is true, both images shrink to 75% of their width, and the second image gets pulled back up 50%, and across 25%. And with that, we've achieved the design!

![Avatars stacked atop one another](/images/blog/avatar-stacking.jpg)
