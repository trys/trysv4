---
title: "Making the static dynamic: Random to a point"
description: "I've been thinking about ways to inject an element of 'random' to a static website. This is part one: making things random at the time of writing..."
year: 2018
date: 2018-04-11
categories: Web
---

I've been thinking about ways to inject an element of 'random' to a static website. This is part one: making things random at the time of writing...

## Random at post time

By hashing the title of the page, you can generate a string of letters and numbers that'll be totally different from post to post.

But the interesting thing is it's **random to a point**. If you pass in the same string, you'll get the **same result**. But by changing even a single letter, the hash will look **completely unique**.

And this gave me an idea.

> Use hashes to give every page a unique style, but keep it consistent between refreshes and site builds.

Using Steve Schoger's brilliant [Hero patterns](https://www.heropatterns.com/) and some lovely hex codes from [FlatUIColors](https://flatuicolors.com/palette/us), we're going to create some pseudo-random styling on a Hugo blog, and host it on Netlify.

{{< button "https://random-to-a-point.netlify.com/posts/the-first-post/" >}}See the end result{{</ button >}}

### The code

First we need a data object of [colours](https://flatuicolors.com/palette/us) and [repeatable SVG patterns](https://www.heropatterns.com/):

```json
{
  "colours": [
    "#dfe6e9",
    "#00b894"
  ],
  "patterns": [
    "data:image/svg+xml..."
  ]
}
```

I'll admit, the code is pretty <del>knarly</del> shoddy, as it's written in a Hugo template, but I'll run through it line by line:

```go
// The markup
<header class="post__header">
    <h1>{{ .Title }}</h1>
</header>

// Hash the title with MD5 into an array
{{ $hash := split (md5 .Title) "" }}

// Count the colours in our data array
{{ $totalColours := len .Site.Data.bg.colours }}

// Select the first letter of the hash
{{ $primaryIndex := index $hash 1 }}

// Base16 it to ensure the character is an integer
{{ $basedPrimaryIndex := printf "%x" $primaryIndex }}

// Modulus it against the total number of colours
{{ $modIndex := mod $basedPrimaryIndex $totalColours }}

// Select it from the colours
{{ $primary := index .Site.Data.bg.colours $modIndex }}

// Perform the same operation on the second letter
{{ $secondaryIndex := index $hash 2 }}
{{ $basedSecondaryIndex := printf "%x" $secondaryIndex }}
{{ $modIndex := mod $basedSecondaryIndex $totalColours }}
{{ $secondary := index .Site.Data.bg.colours $modIndex }}

// Get the index for the SVG pattern in the same way
{{ $bgIndex := mod (printf "%x" (index $hash 0)) (len .Site.Data.bg.patterns) }}

// Go doesn't like HTML being tampered with so we have
// to be sneaky, replacing URLEncoded characters with HTML
// It's nasty but it works...
// Also, if Hugo/Go swapped 'replace' arguments around,
// it would be far far cleaner! 
{{ $bg := replace (replace (replace (replace (index .Site.Data.bg.patterns $bgIndex) "%3C" "<") "%3E" ">") "%23" "" | safeHTML) "data:image/svg+xml," "" }}

// Swap the default HeroPatterns colour with our $secondary
{{ $colouredBg := replace $bg "9C92AC" $secondary }}

<style>
    .post__header {
        background-color: {{ $primary }};
        background-image: url("data:image/svg+xml;charset=utf-8;base64,{{ base64Encode $bg }}");
    }
</style>
```

### The result

[![Randomly generated blog post styles](/images/blog/random.jpg)](http://random-to-a-point.netlify.com/posts/the-first-post/)

Sure, it can create some gaudy combinations. But I think the idea has potential if it was in the hands of a design team with some set patterns and guidelines.

It's worth noting that this concept isn't limited to static websites, but it's encouraging to know it's possible without a traditional server.

Next time out, randomisation at build time.

<small>_obligatory gif time..._</small>
![](https://media.giphy.com/media/BrBlCwtDgrxks/giphy.gif)
